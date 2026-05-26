const Device = require("../models/Device");



async function injectPacket(meshPacket, sender) {

  const senderDevice = await Device.findOne({
    deviceId: `phone-${sender}`,
  });

  if (!senderDevice) {
    throw new Error("Sender device not found");
  }

  senderDevice.packets.push({
    ...meshPacket,

    hops: [senderDevice.deviceId],
  });

  await senderDevice.save();
}



async function runGossipRound() {

  const devices = await Device.find({});

  const snapshot = devices.map(device => ({
    deviceId: device.deviceId,
    packets: [...device.packets],
  }));


  for (const senderSnapshot of snapshot) {

    for (const packet of senderSnapshot.packets) {

      if (packet.ttl <= 0) {
        continue;
      }

      // choose ONLY ONE random receiver
      const possibleReceivers = devices.filter(
        d => d.deviceId !== senderSnapshot.deviceId
      );

      if (possibleReceivers.length === 0) {
        continue;
      }

      const receiver =
        possibleReceivers[
          Math.floor(Math.random() * possibleReceivers.length)
        ];

      // duplicate protection
      const alreadyExists = receiver.packets.some(
        p => p.packetId === packet.packetId
      );

      if (alreadyExists) {
        continue;
      }

      receiver.packets.push({
        packetId: packet.packetId,

        ttl: packet.ttl - 1,

        createdAt: packet.createdAt,

        ciphertext: packet.ciphertext,

        hops: [...packet.hops, receiver.deviceId],
      });
    }
  }


  for (const device of devices) {
    await device.save();
  }

  return devices;
}



async function resetMesh() {

  await Device.updateMany(
    {},
    {
      $set: {
        packets: []
      }
    }
  );
}



module.exports = {
  injectPacket,
  runGossipRound,
  resetMesh
};