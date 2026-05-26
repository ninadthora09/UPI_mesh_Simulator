export default function MeshControls({
  onGossip,
  onFlush,
  onReset,
  loading
}) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">

      <div className="font-mono text-xs tracking-widest text-zinc-500">
        MESH CONTROLS
      </div>

      <button
        onClick={onGossip}
        disabled={loading.gossip}
        className="w-full font-mono text-xs py-2 rounded-md bg-transparent border border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50"
      >
        run gossip round
      </button>

      <button
        onClick={onFlush}
        disabled={loading.flush}
        className="w-full font-mono text-xs py-2 rounded-md bg-transparent border border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50"
      >
        flush bridge nodes
      </button>

      <button
        onClick={onReset}
        disabled={loading.reset}
        className="w-full font-mono text-xs py-2 rounded-md bg-transparent border border-red-900 text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
      >
        reset mesh
      </button>

    </div>
  )
}