import { useState, useEffect } from 'react'
import axios from 'axios'
import { filterNearbyOrders } from "../hooks/useNearbyOrders";

const API = "http://127.0.0.1:8000/api";

export default function RiderDashboard() {
  const [allOrders, setAllOrders] = useState([])
  const [connected, setConnected] = useState(false)
  const [rate, setRate] = useState(3850)
  
  // My rider location - Entebbe center
  const myRider = { lat: 0.3476, lng: 32.5825, name: "Rider 1" }

  // Fetch live rate - USD Engine
  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/USD")
    .then(r=>r.json())
    .then(d=>{ if(d.rates?.UGX) setRate(Math.round(d.rates.UGX)) })
    .catch(()=>{})
  },[])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`)
      const data = Array.isArray(res.data) ? res.data : res.data.data || res.data.orders || []
      const mapped = data.map(o=>{
        const usd = o.price_usd ? Number(o.price_usd) : (o.price ? Number(o.price)/rate : 6.5)
        return {
          ...o,
          price_usd: usd,
          price_ugx: o.price_ugx || Math.round(usd * rate)
        }
      })
      setAllOrders(mapped)
      setConnected(true)
    } catch {
      const local = JSON.parse(localStorage.getItem('deliver_orders') || '[]')
      const mapped = local.map(o=>{
        const usd = o.price_usd ? Number(o.price_usd) : 6.5
        return {
          ...o,
          price_usd: usd,
          price_ugx: Math.round(usd * rate)
        }
      })
      setAllOrders(mapped)
      setConnected(true)
    }
  }

  useEffect(() => {
    fetchOrders()
    const id = setInterval(fetchOrders, 3000)
    return () => clearInterval(id)
  }, [rate])

  const nearbyOrders = filterNearbyOrders(allOrders, myRider, 5)

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>🏍️ Rider Dashboard - 5KM Filter ACTIVE</h1>
      <div style={{ padding: '10px', background: connected ? '#22c55e' : '#ef4444', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>
        {connected ? `✅ LIVE - ${nearbyOrders.length} nearby / ${allOrders.length} total | Rate: 1$ = ${rate.toLocaleString()} UGX` : '❌ Offline'}
      </div>
      <p style={{fontSize:'12px', color:'#666'}}>Engine = USD | Rider & Client see = UGX</p>

      {nearbyOrders.length === 0 ? (
        <p>No orders within 5km - waiting...</p>
      ) : nearbyOrders.map(order => {
        const usd = order.price_usd || 6.5
        const ugx = order.price_ugx || Math.round(usd * rate)
        return (
        <div key={order.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '15px', borderLeft: '5px solid #22c55e' }}>
          <h3>{order.customer_name || order.customerName || 'Customer'} - {order.phone || order.customer_phone}</h3>
          <p><b>{order.pickup}</b> → <b>{order.dropoff}</b></p>
          <p><b>{order.area || 'Entebbe'}</b> - {order.distance || '2.3km'} away</p>
          <div style={{background:'#f8f8', padding:'8px', borderRadius:'6px', margin:'10px 0'}}>
            <p style={{margin:0, fontWeight:'bold'}}>{ugx.toLocaleString()} UGX <span style={{color:'#666', fontWeight:'normal'}}>client pays</span></p>
            <p style={{margin:0, fontSize:'12px', color:'#A78BFA'}}>${usd.toFixed(2)} USD - engine</p>
          </div>
          <button onClick={() => alert(`Accepted ${order.id}! ${ugx} UGX ($${usd})`)} style={{ padding: '10px 20px', background: 'black', color: 'white', border: 'none', borderRadius: '6px', width:'100%' }}>
            Accept - {ugx.toLocaleString()} UGX
          </button>
        </div>
      )})}
    </div>
  )
}