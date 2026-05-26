require("dotenv").config();

const express = require("express");
const cors = require("cors");

const cryptoService = require("./services/cryptoService");
const connectDB = require("./db");

const Account = require("./models/Account");
const Device = require("./models/Device");

const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("UPI Mesh Backend Running");
});

async function seedData() {

  const accounts = [
    { accountId: "alice", name: "Alice", balance: 1000 },
    { accountId: "bob", name: "Bob", balance: 1000 },
    { accountId: "carol", name: "Carol", balance: 1000 },
    { accountId: "dave", name: "Dave", balance: 1000 },
    { accountId: "eve", name: "Eve", balance: 1000 },
  ];

  for (const acc of accounts) {

    await Account.findOneAndUpdate(
      { accountId: acc.accountId },
      acc,
      {
        upsert: true,
        new: true,
      }
    );
  }

  const devices = [
    { deviceId: "phone-alice", hasInternet: false },
    { deviceId: "phone-bob", hasInternet: false },
    { deviceId: "phone-carol", hasInternet: false },
    { deviceId: "phone-dave", hasInternet: false },
    { deviceId: "phone-bridge", hasInternet: true },
  ];

  for (const dev of devices) {

    await Device.findOneAndUpdate(
      { deviceId: dev.deviceId },
      {
        deviceId: dev.deviceId,
        hasInternet: dev.hasInternet,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  console.log("Seed data inserted");
}

async function start() {

  try {

    await connectDB();

    cryptoService.generateKeyPair();

    await seedData();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {

    console.error("Startup Error:", err);
  }
}

start();