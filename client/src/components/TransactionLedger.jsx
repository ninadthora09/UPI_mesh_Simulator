import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function TransactionLedger({ transactions }) {

  return (
    <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl h-full flex flex-col">
      <div className="font-mono text-xs tracking-[2px] text-cyan-400 mb-5 flex items-center gap-2">
        <CheckCircle size={16} className="text-emerald-400" />
        TRANSACTION LEDGER
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500 font-mono text-sm">
            no settlements yet
          </div>
        ) : (
          <AnimatePresence>
            {transactions
              .slice()
              .reverse()
              .slice(0, 20)
              .map((tx, index) => (
                <motion.div
                  key={tx._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group flex justify-between items-center px-4 py-4 rounded-2xl 
                             border border-transparent hover:border-emerald-500/30 
                             hover:bg-zinc-800/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={18} className="text-emerald-400" />
                    </div>

                    <div>
                      <div className="font-mono text-sm">
                        <span className="text-zinc-400">{tx.sender}</span>
                        <span className="text-emerald-500 mx-1.5">→</span>
                        <span className="text-zinc-100">{tx.receiver}</span>
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 mt-0.5">
                        {new Date(tx.settledAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono text-right">
                    <div className="text-emerald-400 text-lg font-light">
                      ₹{tx.amount}
                    </div>
                    <div className="text-[10px] text-emerald-500/70">SETTLED</div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}