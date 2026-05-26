import { AlertTriangle } from "lucide-react";

export default function PacketInspector({ selectedPacket }) {
  if (!selectedPacket) {
    return (
      <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-5 flex flex-col">
        <div className="font-mono text-xs tracking-[2px] text-zinc-500 mb-4">
          PACKET INSPECTOR
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-zinc-500 text-sm">No packet selected</div>
            <div className="text-zinc-600 text-xs mt-1">Click encrypted packet in mesh</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-zinc-900/95 border border-red-500/40 rounded-2xl overflow-hidden">
      {/* Compact Header */}
      <div className="px-5 pt-4 pb-2 border-b border-red-500/20 bg-black/50 flex items-center justify-between">
        <div className="font-mono text-xs tracking-[2px] text-red-400">PACKET INSPECTOR</div>
        <div className="px-3 py-0.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-400 text-[10px] font-mono tracking-widest">
          ACCESS DENIED
        </div>
      </div>

      {/* Small Warning Box */}
      <div className="mx-5 mt-4 mb-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5">
        <div className="flex items-center gap-2.5 text-red-400 mb-1.5">
          <AlertTriangle size={18} />
          <span className="font-semibold text-xs">ENCRYPTED PAYLOAD BLOCKED</span>
        </div>
        <div className="text-zinc-400 text-xs">
          Protected using <span className="text-emerald-400 font-mono">AES-256-GCM</span>
        </div>
      </div>

      {/* Very Compact Details */}
      <div className="flex-1 px-5 pb-5 space-y-3 text-xs font-mono overflow-hidden">
        <DetailField label="Packet ID" value={selectedPacket.packetId} />
        <DetailField label="Algorithm" value={selectedPacket.algorithm} highlight />
        <DetailField label="Status" value={selectedPacket.status} />
        <DetailField label="TTL" value={selectedPacket.ttl} />
        <DetailField label="Hop Count" value={selectedPacket.hopCount} />
        <DetailField label="Hop Path" value={selectedPacket.hopPath} />
        <DetailField label="Created At" value={selectedPacket.createdAt} />
        <DetailField label="IV" value={selectedPacket.iv} />
        <DetailField label="Auth Tag" value={selectedPacket.authTag} />
        <DetailField label="Ciphertext" value={selectedPacket.ciphertext} />
      </div>
    </div>
  );
}

function DetailField({ label, value, highlight = false }) {
  return (
    <div>
      <div className="text-[9px] text-zinc-500 tracking-widest mb-0.5">{label}</div>
      <div
        className={`break-all border-l-2 pl-3 py-0.5 leading-tight text-[12.5px]
          ${highlight 
            ? "text-emerald-400 border-emerald-500" 
            : "text-zinc-200 border-zinc-700"
          }`}
      >
        {value || "—"}
      </div>
    </div>
  );
}