const express = require("express");

const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const Device = require("../models/Device");

const cryptoService = require("../services/cryptoService");

const meshService = require("../services/meshService");

const bridgeIngestionService = require("../services/bridgeIngestionService");

const idempotencyService = require("../services/idempotencyService");

router.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.find({});

    res.json(accounts);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch accounts",
    });
  }
});

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ settledAt: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch transactions",
    });
  }
});

router.get("/mesh/state", async (req, res) => {
  try {
    const devices = await Device.find({});

    res.json(devices);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch mesh state",
    });
  }
});

router.post("/demo/send", async (req, res) => {
  try {
    const { sender, receiver, amount } = req.body;

    const instruction = {
      sender,
      receiver,
      amount: Number(amount),

      nonce: uuidv4(),

      signedAt: Date.now(),
    };

    const ciphertext = cryptoService.encrypt(instruction);

    const meshPacket = {
      packetId: uuidv4(),

      ttl: 5,

      createdAt: Date.now(),

      ciphertext,

      hops: [],
    };

    await meshService.injectPacket(meshPacket, sender);

    const devices = await Device.find({});

    res.json({
      message: "Packet injected",
      devices,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to inject packet",
    });
  }
});

router.post("/mesh/gossip", async (req, res) => {
  try {
    const devices = await meshService.runGossipRound();

    res.json({
      message: "Gossip round complete",
      devices,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to run gossip round",
    });
  }
});

router.post("/mesh/flush", async (req, res) => {
  try {
    const results = await bridgeIngestionService.flushBridgeNode();

    const accounts = await Account.find({});

    const transactions = await Transaction.find({}).sort({ settledAt: -1 });

    res.json({
      results,
      accounts,
      transactions,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to flush bridge node",
    });
  }
});

router.post("/mesh/reset", async (req, res) => {
  try {
    await meshService.resetMesh();

    idempotencyService.reset();

    res.json({
      message: "Mesh and idempotency cache cleared",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to reset mesh",
    });
  }
});

module.exports = router;
