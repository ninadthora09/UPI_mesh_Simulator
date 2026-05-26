import { motion } from 'framer-motion';
import { Users, IndianRupee } from 'lucide-react';

export default function AccountBalances({ accounts }) {

  return (
    <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 mb-5">
        <Users className="text-cyan-400" size={18} />
        <div className="font-mono text-xs tracking-[2px] text-cyan-400">
          ACCOUNTS
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="text-zinc-600 font-mono text-sm py-8 text-center">
          loading balances...
        </div>
      ) : (
        <div className="space-y-1">
          {accounts.map((acc, index) => (
            <motion.div
              key={acc.accountId || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group flex justify-between items-center px-4 py-3 rounded-xl 
                         hover:bg-zinc-800/70 transition-all border border-transparent 
                         hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Users size={16} className="text-cyan-400" />
                </div>
                <div>
                  <div className="font-mono text-sm text-zinc-100 capitalize">
                    {acc.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono">Account</div>
                </div>
              </div>

              <div className="flex items-center gap-1 font-mono">
                <IndianRupee size={14} className="text-emerald-400" />
                <span className="text-emerald-400 text-lg font-light tracking-tight">
                  {acc.balance}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}