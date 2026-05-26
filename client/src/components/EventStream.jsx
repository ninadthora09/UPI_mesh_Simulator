import { AnimatePresence, motion } from 'framer-motion'

export default function EventStream({
  events
}) {

  function styles(type) {

    switch (type) {

      case 'injected':
        return 'border-blue-500 text-blue-400'

      case 'settled':
        return 'border-emerald-500 text-emerald-400'

      case 'dup':
        return 'border-amber-500 text-amber-400'

      case 'reset':
        return 'border-red-500 text-red-400'

      default:
        return 'border-zinc-600 text-zinc-500'
    }
  }

  return (
    <div className="h-full flex flex-col">

      <div className="font-mono text-xs tracking-widest text-zinc-500 mb-4">
        EVENT STREAM
      </div>

      <div className="overflow-y-auto h-full">

        {events.length === 0 && (
          <div className="text-zinc-600 font-mono text-xs">
            waiting for events...
          </div>
        )}

        <AnimatePresence>

          {events.map(event => (

            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`
                border-l-2 pl-2 py-1 mb-1
                font-mono text-[10px] leading-relaxed
                ${styles(event.type)}
              `}
            >

              <div className="text-zinc-600">
                {event.ts}
              </div>

              <div>
                {event.msg}
              </div>

            </motion.div>

          ))}

        </AnimatePresence>

      </div>

    </div>
  )
}