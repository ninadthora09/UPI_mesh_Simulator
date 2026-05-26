import { useEffect, useState } from "react";
import {
  getAccounts,
  getTransactions,
  getMeshState,
  sendPayment,
  runGossip,
  flushBridge,
  resetMesh,
} from "./api";

import TopBar from "./components/TopBar";
import PaymentForm from "./components/PaymentForm";
import MeshControls from "./components/MeshControls";
import AccountBalances from "./components/AccountBalances";
import TransactionLedger from "./components/TransactionLedger";
import EventStream from "./components/EventStream";
import LiveMeshNetwork from "./components/LiveMeshNetwork";
import PacketInspector from "./components/PacketInspector";

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [events, setEvents] = useState([]);

  const [activePacket, setActivePacket] = useState(null);
  const [selectedPacket, setSelectedPacket] = useState(null);

  const [loading, setLoading] = useState({
    send: false,
    gossip: false,
    flush: false,
    reset: false,
  });

  async function refresh() {
    try {
      const [a, m, t] = await Promise.all([
        getAccounts(),
        getMeshState(),
        getTransactions(),
      ]);
      setAccounts(a.data);
      setDevices(m.data);
      setTransactions(t.data);
    } catch (err) {
      console.error(err);
    }
  }

  function addEvent(msg, type = "gossip") {
    const ts = new Date().toLocaleTimeString("en", { hour12: false });
    setEvents((prev) =>
      [{ id: crypto.randomUUID(), msg, type, ts }, ...prev].slice(0, 30),
    );
  }

  async function handleSend(form) {
    if (form.sender === form.receiver) return;
    try {
      setLoading((prev) => ({ ...prev, send: true }));
      await sendPayment(form);

      setActivePacket({
        sender: form.sender,
        receiver: form.receiver,
        amount: form.amount,
        moving: false,
      });

      addEvent(
        `${form.sender} injected ₹${form.amount} → ${form.receiver}`,
        "injected",
      );
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, send: false }));
    }
  }

  async function handleGossip() {
    try {
      setLoading((prev) => ({ ...prev, gossip: true }));
      await runGossip();
      setActivePacket((prev) => (prev ? { ...prev, moving: true } : null));
      addEvent("gossip round complete", "gossip");
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, gossip: false }));
    }
  }

  async function handleFlush() {
    try {
      setLoading((prev) => ({ ...prev, flush: true }));
      const res = await flushBridge();
      res.data.results.forEach((r) => {
        if (r.outcome === "SETTLED") addEvent(`packet settled`, "settled");
        else if (r.outcome === "DUPLICATE_DROPPED")
          addEvent(`duplicate packet dropped`, "dup");
        else addEvent(r.outcome || "bridge flush complete", "gossip");
      });
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, flush: false }));
    }
  }

  async function handleReset() {
    try {
      setLoading((prev) => ({ ...prev, reset: true }));
      await resetMesh();
      addEvent("mesh reset", "reset");
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, reset: false }));
    }
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0a0f] text-zinc-100 font-mono flex flex-col">
      <TopBar />

      <div className="flex-1 grid grid-cols-[320px_1fr_320px] gap-4 p-4 overflow-hidden">
        {/* LEFT PANEL - No White Scrollbar */}
        <div
          className="overflow-y-auto space-y-4 bg-zinc-950/70 border border-cyan-500/10 rounded-3xl p-6 
                scrollbar-hide"
        >
          <PaymentForm onSend={handleSend} loading={loading.send} />
          <MeshControls
            onGossip={handleGossip}
            onFlush={handleFlush}
            onReset={handleReset}
            loading={loading}
          />
          <AccountBalances accounts={accounts} />
        </div>

        {/* CENTER - LIVE MESH NETWORK */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex-1 rounded-3xl border border-cyan-500/20 bg-zinc-950/80 backdrop-blur-2xl overflow-hidden shadow-2xl relative">
            <LiveMeshNetwork
              devices={devices}
              activePacket={activePacket}
              setSelectedPacket={setSelectedPacket}
            />
          </div>

          {/* Bottom Panels - Better Height for Full Visibility */}
          <div className="grid grid-cols-2 gap-4 h-[42%] min-h-0">
            <div className="rounded-3xl border border-red-500/20 bg-zinc-950/80 backdrop-blur-2xl overflow-hidden flex flex-col">
              <PacketInspector selectedPacket={selectedPacket} />
            </div>
            {/* TRANSACTION LEDGER CONTAINER */}
            <div className="rounded-3xl border border-cyan-500/20 bg-zinc-950/80 backdrop-blur-2xl overflow-hidden flex flex-col ">
              <TransactionLedger transactions={transactions} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - EVENT STREAM */}
        <div className="overflow-y-auto bg-zinc-950/70 border border-cyan-500/10 rounded-3xl p-6 scrollbar-hide">
          <EventStream events={events} />
        </div>
      </div>
    </div>
  );
}
