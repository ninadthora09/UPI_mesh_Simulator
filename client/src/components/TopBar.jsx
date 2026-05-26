import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function TopBar() {

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  )

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="h-12 shrink-0 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-5">

      <div className="flex items-center gap-3">

        <motion.div
          className="w-2 h-2 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
        />

        <div className="font-mono text-emerald-400 text-xs tracking-widest">
          upi-mesh-simulator
        </div>

      </div>

      <div className="font-mono text-xs text-zinc-500 flex items-center gap-3">

        <span>5 nodes</span>

        <span>•</span>

        <span>AES-256-GCM</span>

        <span>•</span>

        <span>{time}</span>

      </div>

    </div>
  )
}