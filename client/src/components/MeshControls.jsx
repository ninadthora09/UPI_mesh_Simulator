import { RefreshCw, Zap, Trash2 } from 'lucide-react';

export default function MeshControls({
  onGossip,
  onFlush,
  onReset,
  loading
}) {

  return (
    <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
      <div className="font-mono text-xs tracking-[2px] text-cyan-400 mb-5">
        MESH CONTROLS
      </div>

      <div className="space-y-3">
        {/* Run Gossip Round */}
        <button
          onClick={onGossip}
          disabled={loading.gossip}
          className="w-full flex items-center justify-between group font-mono text-sm py-3.5 px-4 rounded-2xl 
                     border border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/30 
                     hover:bg-emerald-950/50 text-emerald-300 hover:text-emerald-200 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <Zap className="group-hover:rotate-12 transition-transform" size={18} />
            <span>RUN GOSSIP ROUND</span>
          </div>
          {loading.gossip && <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />}
        </button>

        {/* Flush Bridge Nodes */}
        <button
          onClick={onFlush}
          disabled={loading.flush}
          className="w-full flex items-center justify-between group font-mono text-sm py-3.5 px-4 rounded-2xl 
                     border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/30 
                     hover:bg-cyan-950/50 text-cyan-300 hover:text-cyan-200 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="group-hover:rotate-45 transition-transform" size={18} />
            <span>FLUSH BRIDGE NODES</span>
          </div>
          {loading.flush && <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />}
        </button>

        {/* Reset Mesh */}
        <button
          onClick={onReset}
          disabled={loading.reset}
          className="w-full flex items-center justify-between group font-mono text-sm py-3.5 px-4 rounded-2xl 
                     border border-red-500/30 hover:border-red-400 bg-red-950/30 
                     hover:bg-red-950/50 text-red-400 hover:text-red-300 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="group-hover:scale-110 transition-transform" size={18} />
            <span>RESET MESH</span>
          </div>
          {loading.reset && <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />}
        </button>
      </div>
    </div>
  );
}