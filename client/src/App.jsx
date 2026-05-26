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
import DeviceGrid from "./components/DeviceGrid";
import AccountBalances from "./components/AccountBalances";
import TransactionLedger from "./components/TransactionLedger";
import EventStream from "./components/EventStream";

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [events, setEvents] = useState([]);

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
    const ts = new Date().toLocaleTimeString("en", {
      hour12: false,
    });

    setEvents((prev) =>
      [
        {
          id: crypto.randomUUID(),
          msg,
          type,
          ts,
        },
        ...prev,
      ].slice(0, 30),
    );
  }

  async function handleSend(form) {
    if (form.sender === form.receiver) return;

    try {
      setLoading((prev) => ({ ...prev, send: true }));

      await sendPayment(form);

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
        if (r.outcome === "SETTLED") {
          addEvent(`packet settled`, "settled");
        } else if (r.outcome === "DUPLICATE_DROPPED") {
          addEvent(`duplicate packet dropped`, "dup");
        } else {
          addEvent(r.outcome || "bridge flush complete", "gossip");
        }
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
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans flex flex-col">
      <TopBar />

      <div className="flex-1 grid grid-cols-[280px_1fr_220px] overflow-hidden min-h-0">
        <div className="overflow-y-auto border-r border-zinc-800 p-4 space-y-4">
          <PaymentForm onSend={handleSend} loading={loading.send} />

          <MeshControls
            onGossip={handleGossip}
            onFlush={handleFlush}
            onReset={handleReset}
            loading={loading}
          />

          <AccountBalances accounts={accounts} />
        </div>

        <div className="overflow-y-auto p-4 space-y-4">
          <DeviceGrid devices={devices} />

          <TransactionLedger transactions={transactions} />
        </div>

        <div className="border-l border-zinc-800 overflow-y-auto p-4">
          <EventStream events={events} />
        </div>
      </div>
    </div>
  );
}
