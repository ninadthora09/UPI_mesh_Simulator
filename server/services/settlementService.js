const Account = require("../models/Account");

const Transaction = require("../models/Transaction");



async function settlePayment(
  instruction,
  packetHash,
  bridgeNodeId
) {

  try {

    const {
      sender,
      receiver,
      amount
    } = instruction;


    const senderAcc =
      await Account.findOne({
        accountId: sender
      });

    const receiverAcc =
      await Account.findOne({
        accountId: receiver
      });


    if (!senderAcc || !receiverAcc) {

      return {
        success: false,
        error: "ACCOUNT_NOT_FOUND"
      };
    }


    if (senderAcc.balance < amount) {

      return {
        success: false,
        error: "INSUFFICIENT_FUNDS"
      };
    }


    senderAcc.balance -= amount;

    receiverAcc.balance += amount;


    await senderAcc.save();

    await receiverAcc.save();


    await Transaction.create({
      sender,
      receiver,
      amount,

      packetHash,

      bridgeNodeId,

      settledAt: new Date()
    });


    return {
      success: true
    };

  } catch (err) {

    console.error(err);

    return {
      success: false,
      error: "SETTLEMENT_FAILED"
    };
  }
}



module.exports = {
  settlePayment
};