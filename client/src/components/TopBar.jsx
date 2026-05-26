import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Wifi, Shield, Clock } from 'lucide-react';

export default function TopBar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-14 shrink-0 bg-black/80 border-b border-cyan-500/30 backdrop-blur-xl flex items-center justify-between px-6 z-50">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <div className="font-mono text-emerald-400 text-sm tracking-[3px] font-semibold">
            UPI-MESH-SIMULATOR
          </div>
        </div>

        <div className="h-5 w-px bg-cyan-500/30" />

        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400/80">
          <Wifi size={15} />
          <span>LIVE</span>
        </div>
      </div>

      {/* Right Side - Status */}
      <div className="flex items-center gap-6 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span>5 nodes</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Shield size={14} className="text-cyan-400" />
          <span>AES-256-GCM</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}