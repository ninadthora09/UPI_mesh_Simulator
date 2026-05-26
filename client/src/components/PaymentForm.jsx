import { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';

export default function PaymentForm({ onSend, loading }) {
  const [sender, setSender] = useState('alice');
  const [receiver, setReceiver] = useState('bob');
  const [amount, setAmount] = useState(100);

  function handleSubmit(e) {
    e.preventDefault();
    onSend({
      sender,
      receiver,
      amount: Number(amount)
    });
  }

  return (
    <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
      <div className="font-mono text-xs tracking-[2px] text-cyan-400 mb-5">
        COMPOSE PAYMENT
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sender → Receiver */}
        <div className="flex items-center gap-3">
          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 hover:border-cyan-500 focus:border-cyan-400 text-zinc-100 font-mono text-sm rounded-xl px-4 py-3 outline-none transition-all w-full cursor-pointer"
          >
            <option value="alice">alice</option>
            <option value="bob">bob</option>
            <option value="carol">carol</option>
            <option value="dave">dave</option>
            <option value="eve">eve</option>
          </select>

          <ArrowRight className="text-cyan-500 flex-shrink-0" size={20} />

          <select
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 hover:border-cyan-500 focus:border-cyan-400 text-zinc-100 font-mono text-sm rounded-xl px-4 py-3 outline-none transition-all w-full cursor-pointer"
          >
            <option value="alice">alice</option>
            <option value="bob">bob</option>
            <option value="carol">carol</option>
            <option value="dave">dave</option>
            <option value="eve">eve</option>
          </select>
        </div>

        {/* Amount */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-mono">₹</div>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 hover:border-cyan-500 focus:border-cyan-400 text-zinc-100 font-mono text-lg rounded-xl pl-9 pr-4 py-3 outline-none transition-all"
            placeholder="Amount"
          />
        </div>

        {/* Inject Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 
                     disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-400
                     text-white font-mono tracking-wider text-sm py-3.5 rounded-2xl 
                     transition-all duration-200 shadow-lg shadow-cyan-500/30 
                     flex items-center justify-center gap-2 active:scale-[0.985]"
        >
          {loading ? (
            "INJECTING..."
          ) : (
            <>
              INJECT INTO MESH
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}