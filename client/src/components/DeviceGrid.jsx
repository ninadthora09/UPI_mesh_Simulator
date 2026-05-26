import DeviceCard from './DeviceCard'

export default function DeviceGrid({ devices }) {

  const bridge = devices.find(d => d.hasInternet)
  const others = devices.filter(d => !d.hasInternet)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">

      <div className="font-mono text-xs tracking-widest text-zinc-500">
        MESH NODES
      </div>

      <div className="grid grid-cols-2 gap-2">

        {others.map(device => (
          <DeviceCard
            key={device.deviceId}
            device={device}
          />
        ))}

        {bridge && (
          <div className="col-span-2">
            <DeviceCard device={bridge} />
          </div>
        )}

      </div>

    </div>
  )
}