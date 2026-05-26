import { motion } from 'framer-motion'

export default function DeviceCard({ device }) {

  const packets = device.packets || []

  const avgTTL = packets.length
    ? packets.reduce((sum, p) => sum + p.ttl, 0) / packets.length
    : 0

  const pct = (avgTTL / 5) * 100

  const isBridge = device.hasInternet

  return (
    <div
      className={`
        rounded-lg p-3 border transition-colors duration-300 space-y-1.5
        ${
          isBridge
            ? 'border-emerald-900 bg-emerald-950/20'
            : packets.length
            ? 'border-blue-900 bg-blue-950/10'
            : 'border-zinc-800 bg-zinc-900'
        }
      `}
    >

      <div className="flex items-center justify-between">

        <div className="font-mono text-xs text-zinc-100">
          {device.deviceId.replace('phone-', '')}
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono">

          <div
            className={`
              w-1.5 h-1.5 rounded-full
              ${isBridge ? 'bg-emerald-400' : 'bg-zinc-500'}
            `}
          />

          <span className="text-zinc-500">
            {isBridge ? 'bridge · online' : 'offline'}
          </span>

        </div>

      </div>

      {packets.length > 0 && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.3 }}
          className="font-mono text-[10px] text-blue-400"
        >
          {packets.length} packets
        </motion.div>
      )}

      <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden mt-1">

        <motion.div
          className="h-full bg-blue-500 rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />

      </div>

      <div className="flex flex-wrap gap-1 pt-1">

        {packets.slice(0, 3).map((p) => (
          <div
            key={p.packetId}
            className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300"
          >
            ttl:{p.ttl}
          </div>
        ))}

        {packets.length > 3 && (
          <div className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-500">
            +{packets.length - 3}
          </div>
        )}

      </div>

    </div>
  )
}