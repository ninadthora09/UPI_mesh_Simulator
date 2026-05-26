const Device = require("../models/Device");

const cryptoService = require("./cryptoService");

const idempotencyService =
  require("./idempotencyService");

const settlementService =
  require("./settlementService");



async function flushBridgeNode() {

  const bridge =
    await Device.findOne({
      deviceId: "phone-bridge"
    });

  if (!bridge) {
    throw new Error("Bridge node not found");
  }

  const results = [];

  const remainingPackets = [];


  for (const packet of bridge.packets) {

    const claim =
      await idempotencyService
        .claimPacket(packet.ciphertext);


    if (!claim.claimed) {

      results.push({
        packetId: packet.packetId,
        outcome: "DUPLICATE_DROPPED"
      });

      continue;
    }


    try {

      const instruction =
        cryptoService.decrypt(
          packet.ciphertext
        );

      const settlement =
        await settlementService
          .settlePayment(
            instruction,
            claim.hash,
            bridge.deviceId
          );


      if (settlement.success) {

        results.push({
          packetId: packet.packetId,
          outcome: "SETTLED"
        });

      } else {

        results.push({
          packetId: packet.packetId,
          outcome: settlement.error || "SETTLEMENT_FAILED"
        });

        remainingPackets.push(packet);
      }

    } catch (err) {

      results.push({
        packetId: packet.packetId,
        outcome: "INVALID_PACKET"
      });
    }
  }


  // remove settled packets from bridge
  bridge.packets = remainingPackets;

  await bridge.save();

  return results;
}



module.exports = {
  flushBridgeNode
};