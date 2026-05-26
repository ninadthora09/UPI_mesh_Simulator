import { useState } from 'react'

export default function PaymentForm({
  onSend,
  loading
}) {

  const [sender, setSender] = useState('alice')
  const [receiver, setReceiver] = useState('bob')
  const [amount, setAmount] = useState(100)

  function handleSubmit(e) {
    e.preventDefault()

    onSend({
      sender,
      receiver,
      amount: Number(amount)
    })
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">

      <div className="font-mono text-xs tracking-widest text-zinc-500">
        COMPOSE PAYMENT
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        <div className="flex items-center gap-2">

          <select
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 text-zinc-100 font-mono text-xs rounded-md px-2 py-1.5 outline-none focus:border-blue-500 w-full"
          >
            <option value="alice">alice</option>
            <option value="bob">bob</option>
            <option value="carol">carol</option>
            <option value="dave">dave</option>
            <option value="eve">eve</option>
          </select>

          <div className="text-zinc-600 font-mono">
            →
          </div>

          <select
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="bg-zinc-950 border border-zinc-700 text-zinc-100 font-mono text-xs rounded-md px-2 py-1.5 outline-none focus:border-blue-500 w-full"
          >
            <option value="alice">alice</option>
            <option value="bob">bob</option>
            <option value="carol">carol</option>
            <option value="dave">dave</option>
            <option value="eve">eve</option>
          </select>

        </div>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-zinc-950 border border-zinc-700 text-zinc-100 font-mono text-xs rounded-md px-2 py-1.5 outline-none focus:border-blue-500 w-full"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs py-2 rounded-md transition-opacity disabled:opacity-50"
        >
          inject into mesh
        </button>

      </form>

    </div>
  )
}