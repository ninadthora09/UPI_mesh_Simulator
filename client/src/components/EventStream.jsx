import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Zap, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';

export default function EventStream({ events }) {

  function getEventStyle(type) {
    switch (type) {
      case 'injected':
        return {
          border: 'border-cyan-400',
          text: 'text-cyan-400',
          icon: Zap,
          bg: 'bg-cyan-950/30'
        };
      case 'settled':
        return {
          border: 'border-emerald-400',
          text: 'text-emerald-400',
          icon: CheckCircle,
          bg: 'bg-emerald-950/30'
        };
      case 'dup':
        return {
          border: 'border-amber-400',
          text: 'text-amber-400',
          icon: AlertTriangle,
          bg: 'bg-amber-950/30'
        };
      case 'reset':
        return {
          border: 'border-red-400',
          text: 'text-red-400',
          icon: RotateCcw,
          bg: 'bg-red-950/30'
        };
      default:
        return {
          border: 'border-zinc-600',
          text: 'text-zinc-400',
          icon: Clock,
          bg: 'bg-zinc-900/50'
        };
    }
  }

  return (
    <div className="h-full flex flex-col bg-zinc-900/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
      <div className="font-mono text-xs tracking-[2px] text-cyan-400 mb-5 flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        EVENT STREAM
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {events.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-500 font-mono text-sm text-center">
            waiting for events...
          </div>
        )}

        <AnimatePresence>
          {events.map((event) => {
            const style = getEventStyle(event.type);
            const Icon = style.icon;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`group border-l-4 pl-4 py-3 rounded-r-xl transition-all hover:bg-zinc-800/50 ${style.border} ${style.bg}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <Clock size={12} />
                    {event.ts}
                  </div>
                  <Icon size={14} className={style.text} />
                </div>

                <div className={`font-mono text-sm mt-1 leading-snug ${style.text}`}>
                  {event.msg}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}