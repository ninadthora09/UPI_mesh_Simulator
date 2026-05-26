import { AnimatePresence, motion } from 'framer-motion'

export default function TransactionLedger({
  transactions
}) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">

      <div className="font-mono text-xs tracking-widest text-zinc-500">
        TRANSACTION LEDGER
      </div>

      <div className="overflow-y-auto max-h-64">

        {transactions.length === 0 && (
          <div className="text-zinc-600 font-mono text-xs p-2">
            no settlements yet
          </div>
        )}

        <AnimatePresence>

          {transactions
            .slice()
            .reverse()
            .slice(0, 20)
            .map(tx => (

              <motion.div
                key={tx._id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center px-3 py-2.5 border-b border-zinc-800 last:border-0"
              >

                <div>

                  <div className="font-mono text-xs">

                    <span className="text-zinc-500">
                      {tx.sender}
                    </span>

                    <span className="text-zinc-700 px-1">
                      →
                    </span>

                    <span className="text-zinc-200">
                      {tx.receiver}
                    </span>

                  </div>

                  <div className="font-mono text-[10px] text-zinc-600 mt-0.5">

                    {new Date(tx.settledAt).toLocaleString()}

                  </div>

                </div>

                <div className="font-mono text-xs text-emerald-400 font-medium">
                  ₹{tx.amount}
                </div>

              </motion.div>

            ))}

        </AnimatePresence>

      </div>

    </div>
  )
}