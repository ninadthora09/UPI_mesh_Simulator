import { motion } from "framer-motion";
import { Mail, Lock, User, Radio, Wifi } from "lucide-react";

const nodeConfig = {
  alice: { x: "20%", y: "25%", label: "Alice" },
  bob:   { x: "70%", y: "25%", label: "Bob" },
  bridge:{ x: "45%", y: "50%", label: "Bridge", isBridge: true },
  carol: { x: "20%", y: "72%", label: "Carol" },
  dave:  { x: "70%", y: "72%", label: "Dave" },
};

export default function LiveMeshNetwork({ activePacket, setSelectedPacket }) {
  const sender = activePacket?.sender?.toLowerCase();
  // const receiver = activePacket?.receiver?.toLowerCase();
  const isGossiping = activePacket?.moving;

  // Dynamic starting position
  const startPos = nodeConfig[sender] || nodeConfig.alice;

  return (
    <div className="h-full w-full relative bg-[#05070f] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#22d3ee18_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(103,232,249,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.1) 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Wifi className="text-emerald-400" size={22} />
          <span className="font-mono text-lg tracking-[3px] text-cyan-300">LIVE MESH NETWORK</span>
        </div>
      </div>

      <div className="relative h-full pt-16">
        {/* Nodes */}
        {Object.entries(nodeConfig).map(([key, node]) => (
          <motion.div
            key={key}
            className="absolute cursor-pointer z-10"
            style={{ left: node.x, top: node.y }}
            whileHover={{ scale: 1.08 }}
          >
            <div className={`w-[158px] rounded-2xl p-4 border backdrop-blur-xl transition-all
              ${node.isBridge 
                ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_55px_#10b981]" 
                : "border-cyan-400 bg-zinc-950/80 shadow-[0_0_45px_#22d3ee]"
              }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${node.isBridge ? "bg-emerald-500/20" : "bg-cyan-500/20"}`}>
                  {node.isBridge ? <Radio size={28} className="text-emerald-300" /> : <User size={28} className="text-cyan-300" />}
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-white">{node.label}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
                    <span className="font-mono text-xs text-emerald-400">ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Enhanced Packet Animation */}
        {activePacket && (
          <motion.div
            initial={{ 
              left: startPos.x, 
              top: startPos.y,
              scale: 0.8 
            }}
            animate={{
              left: isGossiping ? ["20%", "45%", "70%", "70%", "45%", "20%"] : startPos.x,
              top:  isGossiping ? ["25%", "50%", "25%", "72%", "50%", "72%"] : startPos.y,
              scale: isGossiping ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: isGossiping ? 7 : 2.8,
              ease: "easeInOut",
              repeat: isGossiping ? Infinity : 0,
              times: [0, 0.25, 0.45, 0.65, 0.85, 1]
            }}
            className="absolute z-50 cursor-pointer"
            onClick={() => {
              setSelectedPacket({
                packetId: "pk_" + Date.now().toString().slice(-8),
                algorithm: "AES-256-GCM",
                status: "ACCESS DENIED",
                ttl: 4,
                hopCount: 4,
                hopPath: `${activePacket.sender} → bridge → ${activePacket.receiver}`,
                iv: "a3c9f2e7b6d9841e...",
                authTag: "5f8d31a2b7c9a1e3...",
                ciphertext: "d129f8b7e6c5a4d3...",
                createdAt: new Date().toLocaleTimeString(),
              });
            }}
          >
            <div className="relative">
              {/* Glow Trail */}
              <div className="absolute -inset-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 opacity-40 blur-3xl rounded-full" />
              
              {/* Main Packet */}
              <div className="relative flex items-center justify-center w-20 h-16 rounded-2xl border-2 border-cyan-400 bg-black/80 backdrop-blur-md shadow-[0_0_60px_#22d3ee]">
                <Mail size={36} className="text-cyan-300" />
                <Lock size={16} className="absolute -bottom-1 -right-1 text-yellow-400" />
              </div>

              {/* Ping Effect */}
              {isGossiping && (
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-ping opacity-30" />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}