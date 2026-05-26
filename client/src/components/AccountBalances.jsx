import { motion } from 'framer-motion'

export default function AccountBalances({
  accounts
}) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">

      <div className="font-mono text-xs tracking-widest text-zinc-500">
        ACCOUNTS
      </div>

      {accounts.length === 0 && (
        <div className="text-zinc-600 font-mono text-xs">
          loading...
        </div>
      )}

      {accounts.map(acc => (

        <motion.div
          key={acc.accountId}
          animate={{
            color: ['#4ade80', '#e8e8f0']
          }}
          transition={{ duration: 1 }}
          className="flex justify-between items-center py-1.5 border-b border-zinc-800 last:border-0"
        >

          <div className="font-mono text-xs text-zinc-300">
            {acc.name}
          </div>

          <div className="font-mono text-xs text-emerald-400">
            ₹{acc.balance}
          </div>

        </motion.div>

      ))}

    </div>
  )
}