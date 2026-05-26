# UPI Offline Mesh Simulator — Production-Grade MERN Blueprint

🚀 Live Demo: https:https://upi-mesh-simulator.vercel.app/

A complete, corrected, and improved blueprint for building an Offline UPI Mesh Payment Simulator using the MERN stack.

This version fixes:
- broken folder formatting
- invalid JSX
- incorrect template strings
- missing packet hop tracking
- MongoDB transaction issues
- gossip duplication problems
- scalability concerns
- architecture inconsistencies

This README is now structured like a real engineering implementation document.

---

# What You Are Building

A distributed offline payment simulator where:

- phones exchange encrypted payment packets offline
- packets spread using a gossip protocol
- one bridge node eventually gets internet
- the bridge uploads packets to backend
- backend validates and settles payments exactly once

The system demonstrates:
- distributed systems
- eventual consistency
- end-to-end encryption
- replay protection
- idempotency
- optimistic concurrency
- offline-first networking

---

# Final System Architecture

```text
┌──────────────────────────────┐
│        React Dashboard       │
│  (5 Virtual Phones UI)       │
└──────────────┬───────────────┘
               │ REST APIs
               ▼
┌──────────────────────────────┐
│      Express + Node.js       │
│                              │
│  ┌────────────────────────┐  │
│  │ Mesh Gossip Service    │  │
│  ├────────────────────────┤  │
│  │ Encryption Service     │  │
│  ├────────────────────────┤  │
│  │ Idempotency Service    │  │
│  ├────────────────────────┤  │
│  │ Settlement Service     │  │
│  └────────────────────────┘  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          MongoDB             │
│ Accounts • Devices • Ledger  │
└──────────────────────────────┘
```

---

# Folder Structure

```text
upi-mesh-simulator/
│
├── server/
│   ├── package.json
│   ├── .env
│   ├── index.js
│   ├── db.js
│   │
│   ├── models/
│   │   ├── Account.js
│   │   ├── Transaction.js
│   │   ├── MeshPacket.js
│   │   └── Device.js
│   │
│   ├── routes/
│   │   └── api.js
│   │
│   ├── services/
│   │   ├── cryptoService.js
│   │   ├── meshService.js
│   │   ├── settlementService.js
│   │   ├── idempotencyService.js
│   │   └── bridgeIngestionService.js
│   │
│   └── utils/
│       └── logger.js
│
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── styles.css
│       │
│       └── components/
│           ├── PaymentForm.jsx
│           ├── DeviceGrid.jsx
│           ├── Controls.jsx
│           ├── AccountTable.jsx
│           ├── LedgerTable.jsx
│           ├── EventLog.jsx
│           └── PacketInspector.jsx
│
└── README.md
```

---

# Tech Stack

## Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Frontend
- React
- Vite
- Axios

## Security
- RSA-2048
- AES-256-GCM
- SHA-256

---

# Core Concepts Used

| Concept | Why Used |
|---|---|
| Gossip Protocol | Packet propagation |
| AES-GCM | Authenticated encryption |
| RSA-OAEP | Secure key exchange |
| SHA-256 | Idempotency key |
| MongoDB Transactions | Atomic settlements |
| UUID Nonces | Replay prevention |
| TTL | Packet expiry |
| Eventual Consistency | Distributed delivery |

---

# Prerequisites

Install:
- Node.js v18+
- MongoDB Community Edition
- Git
- VS Code

Check versions:

```bash
node -v
npm -v
mongod --version
```

---

# Backend Setup

## Create Project

```bash
mkdir upi-mesh-simulator
cd upi-mesh-simulator
```

## Setup Backend

```bash
mkdir server
cd server
npm init -y
npm install express mongoose dotenv cors uuid
```

DO NOT install crypto separately.

Node.js already includes:
```js
const crypto = require('crypto')
```

## Create .env

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/upi_mesh
```

## MongoDB Replica Set

Run MongoDB using:

```bash
mongod --replSet rs0
```

Then initialize:

```bash
mongosh
```

Inside shell:

```js
rs.initiate()
```

---

# Frontend Setup

```bash
cd ..
npm create vite@latest client -- --template react
cd client
npm install axios
```

---

# APIs

| Method | Route | Purpose |
|---|---|---|
| GET | /api/accounts | fetch balances |
| GET | /api/transactions | fetch ledger |
| GET | /api/mesh/state | mesh state |
| POST | /api/demo/send | inject payment |
| POST | /api/mesh/gossip | run gossip |
| POST | /api/mesh/flush | flush bridges |
| POST | /api/mesh/reset | clear mesh |

---

# Full Payment Flow

```text
Compose Payment
      ↓
Encrypt Payload
      ↓
Inject Into Mesh
      ↓
Gossip Between Devices
      ↓
Bridge Node Receives Packet
      ↓
Upload To Backend
      ↓
Hash + Idempotency Check
      ↓
Decrypt
      ↓
Validate Timestamp
      ↓
MongoDB Transaction Settlement
      ↓
Ledger Entry Created
```

---

# Security Features

## AES-256-GCM
Provides:
- encryption
- integrity
- tamper detection

## RSA-2048
Encrypts AES session keys securely.

## SHA-256
Used for idempotency key generation.

## UUID Nonce
Prevents replay fingerprinting.

## TTL
Prevents infinite propagation loops.

---

# Important Improvements Over Original Blueprint

- Fixed malformed JSX
- Fixed broken template literals
- Added proper hop tracking
- Prevented exponential packet duplication
- Added MongoDB replica set setup
- Improved architecture consistency
- Added extensibility structure
- Added advanced visualization support

---

# Advanced Features To Add Later

- Packet animations
- Threat heatmap
- WebSocket live sync
- Redis idempotency
- Packet path visualization
- Digital signatures
- Device proximity simulation
- Auto packet expiry cleanup

---

# Resume Description

Built an offline mesh payment simulator using MERN stack implementing gossip-based packet propagation, RSA-2048 + AES-256-GCM authenticated encryption, SHA-256 idempotent settlement protection, MongoDB transactional ledgering, and replay-resistant bridge-based payment synchronization.

---

# Recommended Build Order

```text
1. Backend server
2. MongoDB connection
3. Models
4. Seed data
5. APIs
6. Crypto service
7. Gossip service
8. Settlement service
9. Bridge ingestion
10. Frontend
11. UI polish
12. Advanced features
```

---

# Final Notes

This project demonstrates:
- distributed systems
- networking
- backend engineering
- security engineering
- system design
- offline-first architecture

This is a systems engineering project — not just a CRUD app.
