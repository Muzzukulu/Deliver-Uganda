import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([
    {id: "D-1024", driver: "Musa B.", route: "Nansana → Mukono", status: "In Transit", amount: 25000},
    {id: "D-1025", driver: "John K.", route: "Ntinda → Kololo", status: "Delivered", amount: 18000},
    {id: "D-1026", driver: "Sarah N.", route: "Wandegeya → Bugolobi", status: "Accepted", amount: 32000},
  ]);
  const [rate, setRate] = useState(3850);
  const [editingRate, setEditingRate] = useState(false);
  const [tempRate, setTempRate] = useState(3850);

  // Fetch live USD rate from exchangerate-api (free)
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
     .then(r => r.json())
     .then(d => { if(d.rates?.UGX){ setRate(Math.round(d.rates.UGX)); setTempRate(Math.round(d.rates.UGX)); }})
     .catch(()=>{});
    // TODO later: fetch("http://localhost:8000/api/orders").then...
  }, []);

  const totalUGX = orders.reduce((s,o)=>s+o.amount,0);
  const totalUSD = totalUGX / rate;

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white flex">
      <div className="w-64 bg-[#1A1033] p-6 border-r border-white/10 hidden md:block">
        <h1 className="text-xl font-bold text-[#A78BFA]">Deliver.ug Admin</h1>
        <nav className="mt-10 space-y-2 text-sm text-gray-400">
          <p className="bg-[#5B1E9A] text-white px-4 py-2.5 rounded-xl">📊 Dashboard</p>
          <p className="px-4 py-2.5">👥 Drivers</p><p className="px-4 py-2.5">📦 Orders</p><p className="px-4 py-2.5">💰 Finance</p>
        </nav>
        <div className="mt-10 bg-black/30 p-4 rounded-xl border border-white/10">
          <p className="text-xs text-gray-400">USD → UGX Rate</p>
          {!editingRate? (
            <div className="flex justify-between items-center mt-1">
              <b className="text-lg">1$ = {rate.toLocaleString()} UGX</b>
              <button onClick={()=>setEditingRate(true)} className="text-xs bg-white/10 px-2 py-1 rounded">Edit</button>
            </div>
          ) : (
            <div className="flex gap-2 mt-2">
              <input type="number" value={tempRate} onChange={e=>setTempRate(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm" />
              <button onClick={()=>{setRate(Number(tempRate)); setEditingRate(false)}} className="bg-[#5B1E9A] px-3 rounded text-sm">Save</button>
            </div>
          )}
          <p className="text-[10px] text-gray-500 mt-2">Live from open.er-api.com</p>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Overview</h2>
          <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">Admin: Ivan</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1033] p-5 rounded-2xl border border-white/10">
            <p className="text-xs text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">{totalUGX.toLocaleString()} UGX</p>
            <p className="text-sm text-[#A78BFA] mt-1">${totalUSD.toFixed(2)} USD</p>
            <p className="text-xs text-green-400 mt-1">Rate: {rate}</p>
          </div>
          <div className="bg-[#1A1033] p-5 rounded-2xl border border-white/10"><p className="text-xs text-gray-400">Active Orders</p><p className="text-2xl font-bold mt-1">{orders.length}</p></div>
          <div className="bg-[#1A1033] p-5 rounded-2xl border border-white/10"><p className="text-xs text-gray-400">Drivers Online</p><p className="text-2xl font-bold mt-1">43</p></div>
          <div className="bg-[#1A1033] p-5 rounded-2xl border border-white/10"><p className="text-xs text-gray-400">Avg Order USD</p><p className="text-2xl font-bold mt-1">${(totalUSD/orders.length).toFixed(2)}</p></div>
        </div>

        <div className="bg-[#1A1033] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-5 flex justify-between"><h3 className="font-bold">Live Deliveries</h3><button className="text-xs bg-[#5B1E9A] px-3 py-1.5 rounded-full">View All</button></div>
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="bg-black/20 text-xs"><tr><th className="p-4">Order ID</th><th>Driver</th><th>Route</th><th>UGX</th><th>USD</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id} className="border-t border-white/5">
                  <td className="p-4">#{o.id}</td><td>{o.driver}</td><td>{o.route}</td>
                  <td>{o.amount.toLocaleString()} UGX</td>
                  <td className="text-[#A78BFA]">${(o.amount/rate).toFixed(2)}</td>
                  <td className={o.status==="Delivered"?"text-green-400":o.status==="In Transit"?"text-yellow-400":"text-blue-400"}>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}