import { useState, useEffect } from 'react'
import axios from 'axios'

const API = "http://127.0.0.1:8000/api"

export default function Checkout() {
  const [rate, setRate] = useState(3850)
  const [loading, setLoading] = useState(false)

  // ENGINE PRICES IN USD - STABLE
  const deliveryFeesUSD = {
    "Nansana-Mukono": 6.5,
    "Ntinda-Kololo": 4.7,
    "Wandegeya-Bugolobi": 8.3,
    "Entebbe-Kampala": 9.5,
    "Default": 6.0
  }

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    pickup: "Nansana",
    dropoff: "Mukono",
    area: "Entebbe"
  })

  // Live rate
  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/USD")
   .then(r=>r.json())
   .then(d=>{ if(d.rates?.UGX) setRate(Math.round(d.rates.UGX)) })
   .catch(()=>{})
  },[])

  const routeKey = `${form.pickup}-${form.dropoff}`
  const priceUSD = deliveryFeesUSD[routeKey] || deliveryFeesUSD["Default"]
  const priceUGX = Math.round(priceUSD * rate)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // USD ENGINE OBJECT
    const orderPayload = {
      customer_name: form.customer_name,
      phone: form.phone,
      pickup: form.pickup,
      dropoff: form.dropoff,
      area: form.area,
      // ENGINE
      price_usd: priceUSD,
      price_ugx: priceUGX,
      price: priceUGX, // backward compat for old riders
      rate_used: rate,
      // extra
      lat: 0.3476,
      lng: 32.5825,
      status: "Pending"
    }

    try {
      // Try Laravel API
      await axios.post(`${API}/orders`, orderPayload)
      alert(`Order Sent! Client sees ${priceUGX.toLocaleString()} UGX | Engine ${priceUSD} USD`)
    } catch (err) {
      // Fallback localStorage
      const old = JSON.parse(localStorage.getItem('deliver_orders')||'[]')
      localStorage.setItem('deliver_orders', JSON.stringify([...old, {...orderPayload, id: `D-${Date.now()}`}]))
      alert(`Order Saved Local! ${priceUGX.toLocaleString()} UGX | Engine $${priceUSD}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#1A1033] p-6 rounded-2xl border border-white/10 space-y-4">
        <h1 className="text-xl font-bold">Checkout - Deliver Uganda</h1>
        <p className="text-xs text-gray-400">Engine: USD ($) | Client sees: UGX</p>

        <input required placeholder="Customer Name" className="w-full p-3 rounded-xl bg-black/30 border border-white/10" value={form.customer_name} onChange={e=>setForm({...form, customer_name: e.target.value})} />
        <input required placeholder="Phone 07..." className="w-full p-3 rounded-xl bg-black/30 border border-white/10" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
        <input placeholder="Pickup" className="w-full p-3 rounded-xl bg-black/30 border border-white/10" value={form.pickup} onChange={e=>setForm({...form, pickup: e.target.value})} />
        <input placeholder="Dropoff" className="w-full p-3 rounded-xl bg-black/30 border border-white/10" value={form.dropoff} onChange={e=>setForm({...form, dropoff: e.target.value})} />

        <div className="bg-black/30 p-4 rounded-xl border border-white/10">
          <p className="text-xs text-gray-400">You will be charged</p>
          <p className="text-2xl font-bold mt-1">{priceUGX.toLocaleString()} UGX</p>
          <p className="text-sm text-[#A78BFA]">${priceUSD.toFixed(2)} USD - engine price</p>
          <p className="text-[10px] text-gray-500 mt-1">Rate: 1$ = {rate.toLocaleString()} UGX</p>
        </div>

        <button disabled={loading} className="w-full bg-[#5B1E9A] py-3.5 rounded-xl font-bold">
          {loading? "Sending..." : `Pay ${priceUGX.toLocaleString()} UGX`}
        </button>
      </form>
    </div>
  )
}