import { useState, useEffect } from 'react'
import CreateDriverAccount from './CreateDriver.jsx'

const API = 'http://127.0.0.1:8000/api'

export default function App() {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({ total: 0, revenueUGX: 0, pending: 0 })
  const [activeTab, setActiveTab] = useState('orders')
  const [rate, setRate] = useState(3850)
  const [editingRate, setEditingRate] = useState(false)
  const [tempRate, setTempRate] = useState('3850')

  useEffect(() => {
    fetchOrders()
    const id = setInterval(fetchOrders, 3000)
    fetch('https://open.er-api.com/v6/latest/USD').then(r=>r.json()).then(d=>{
      if(d?.rates?.UGX){ const r=Math.round(d.rates.UGX); setRate(r); setTempRate(String(r)) }
    }).catch(()=>{})
    return () => clearInterval(id)
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setOrders(data)
        const revenueUSD = data.filter(o=>o.status==='delivered').reduce((s,o)=>s+Number(o.price||o.total||0),0)
        setStats({ total: data.length, revenueUGX: revenueUSD * rate, pending: data.filter(o=>o.status!=='delivered').length })
      }
    } catch (e) { console.log('API not running') }
  }

  useEffect(()=>{ fetchOrders() }, [rate])

  const updateStatus = async (id, status) => {
    await fetch(`${API}/orders/${id}/status`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ status })
    })
    fetchOrders()
  }

  const toUGX = (usd) => Math.round(Number(usd||0) * rate)

  return (
    <div style={{fontFamily:'system-ui', display:'flex', minHeight:'100vh', background:'#f8fafc'}}>
      <aside style={{width:240, background:'#0f172a', color:'white', padding:20}}>
        <h1 style={{fontSize:20, fontWeight:800, marginBottom:30, color:'white'}}>🚚 <span style={{color:'#FF8A29'}}>Deliver</span> Uganda</h1>
        <p style={{fontSize:12, opacity:0.6, marginBottom:20}}>ADMIN PANEL v1.0</p>
        {[
          ['orders','📦 Orders'],
          ['drivers','🏍️ Drivers'],
          ['create-driver','✨ Create Driver'], // <-- NEW BUTTON
          ['map','🗺️ Live Map'],
          ['finance','💰 Finance']
        ].map(([k,l])=>(
          <div key={k} onClick={()=>setActiveTab(k)} style={{padding:'12px', marginBottom:8, borderRadius:8, cursor:'pointer', background: activeTab===k ? '#FF6B00' : 'transparent', fontWeight:600}}>{l}</div>
        ))}
        <div style={{marginTop:20, padding:12, background:'#1e293b', borderRadius:8, border:'1px solid #334155'}}>
          <div style={{fontSize:12, opacity:0.7, marginBottom:6}}>Current Exchange</div>
          {!editingRate ? (
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontWeight:700, fontSize:14}}>1$ = {rate.toLocaleString()} UGX</div>
              <button onClick={()=>setEditingRate(true)} style={{background:'#334155', color:'white', border:0, padding:'4px 8px', borderRadius:6, cursor:'pointer', fontSize:12}}>Edit</button>
            </div>
          ) : (
            <div style={{display:'flex', gap:6}}>
              <input value={tempRate} onChange={e=>setTempRate(e.target.value)} style={{width:'100%', padding:6, borderRadius:6, border:0}} />
              <button onClick={()=>{ const v=Number(tempRate); if(v>0){setRate(v); setEditingRate(false)} }} style={{background:'#22c55e', color:'white', border:0, padding:'6px 10px', borderRadius:6, cursor:'pointer', fontWeight:700}}>Save</button>
            </div>
          )}
        </div>
      </aside>
      <main style={{flex:1, padding:24}}>
        {activeTab==='create-driver' && <CreateDriverAccount />}
        
        {activeTab!=='create-driver' && (
          <>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:24}}>
              <div style={{background:'white', padding:20, borderRadius:12}}><div style={{opacity:0.6}}>Total Orders</div><div style={{fontSize:32, fontWeight:800}}>{stats.total}</div></div>
              <div style={{background:'white', padding:20, borderRadius:12}}><div style={{opacity:0.6}}>Revenue (UGX)</div><div style={{fontSize:28, fontWeight:800, color:'#FF6B00'}}>{stats.revenueUGX.toLocaleString()} UGX</div></div>
              <div style={{background:'white', padding:20, borderRadius:12}}><div style={{opacity:0.6}}>Pending</div><div style={{fontSize:32, fontWeight:800, color:'#ef4444'}}>{stats.pending}</div></div>
            </div>
            {activeTab==='orders' && (
              <div style={{background:'white', borderRadius:12, overflow:'hidden'}}>
                <div style={{padding:16, fontWeight:700, borderBottom:'1px solid #eee'}}>Live Orders</div>
                <table style={{width:'100%', borderCollapse:'collapse'}}>
                  <thead><tr style={{background:'#f8fafc', textAlign:'left'}}><th style={{padding:12}}>ID</th><th>Customer</th><th>Pickup - Dropoff</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {orders.map(o=>{
                      const ugx = toUGX(Number(o.price||o.total||0))
                      return (
                      <tr key={o.id || o._id} style={{borderTop:'1px solid #f1f5f9'}}>
                        <td style={{padding:12, fontFamily:'monospace'}}>{String(o.id || o._id).slice(-6)}</td>
                        <td>{o.customer_name || 'Customer'}</td>
                        <td style={{fontSize:13}}>{o.pickup_address} → {o.dropoff_address}</td>
                        <td style={{fontWeight:700}}>{ugx.toLocaleString()} UGX</td>
                        <td><span style={{padding:'4px 8px', borderRadius:99, fontSize:12, background: o.status==='delivered'?'#dcfce7':'#fef3c7'}}>{o.status}</span></td>
                        <td><select value={o.status} onChange={e=>updateStatus(o.id || o._id, e.target.value)} style={{padding:6, borderRadius:6}}><option>pending</option><option>accepted</option><option>picked</option><option>on_the_way</option><option>delivered</option></select></td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab==='drivers' && <div style={{padding:40, textAlign:'center', background:'white', borderRadius:12}}>Drivers list coming soon... Use ✨ Create Driver tab</div>}
            {activeTab==='map' && <div style={{padding:40, textAlign:'center', background:'white', borderRadius:12}}>Live Map coming...</div>}
            {activeTab==='finance' && <div style={{padding:40, textAlign:'center', background:'white', borderRadius:12}}>Finance dashboard...</div>}
          </>
        )}
      </main>
    </div>
  )
}