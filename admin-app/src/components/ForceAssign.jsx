// Deliver Uganda - Admin Integrity Override - LOCKED
import { getDistanceKm } from "../../rider-app/src/utils/coverage";

export default function ForceAssign({ order, riders, onAssign }) {
  const sorted = riders
    .map(r => ({
      ...r,
      distance: getDistanceKm(r.lat, r.lng, order.lat, order.lng).toFixed(1),
    }))
    .sort((a,b) => a.distance - b.distance);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold">Order {order.id} - {order.area}</h3>
      <p className="text-xs text-gray-500 mb-3">60s no taker - Force assign:</p>

      {sorted.map(r => (
        <div key={r.id} className="flex justify-between border-b py-2">
          <div>
            <p>{r.name} - {r.distance}km {r.distance <= 5 ? "✅" : "⚠️"}</p>
            <p className="text-xs">{r.status} | {r.isFree ? "Free" : "Busy"}</p>
          </div>
          <button 
            onClick={() => onAssign(order.id, r.id)} 
            className="bg-black text-white px-3 py-1 rounded text-sm"
          >
            Force
          </button>
        </div>
      ))}

      <button className="mt-3 w-full bg-red-600 text-white py-2 rounded text-sm">
        Broadcast to 10km (Emergency)
      </button>
    </div>
  );
}