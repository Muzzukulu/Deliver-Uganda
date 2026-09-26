import { useState, useEffect } from "react";

const restaurants = [
  { id: 1, name: "Javas House", time: "20-30 min", rating: "4.8", priceUSD: 5.5 },
  { id: 2, name: "KFC Kampala", time: "15-25 min", rating: "4.6", priceUSD: 3.2 },
  { id: 3, name: "Cafe Javas", time: "25-35 min", rating: "4.9", priceUSD: 7 },
];

export default function Dashboard() {
  const [cart, setCart] = useState([]);
  const [rate, setRate] = useState(3850);
  const [showCheckout, setShowCheckout] = useState(false);
  const [distanceKm, setDistanceKm] = useState(3);
  const [address, setAddress] = useState("");

  const BASE_DELIVERY_USD = 6.50;
  const COMMISSION_RATE = 70;
  const driverCutUsd = +(BASE_DELIVERY_USD * (COMMISSION_RATE/100)).toFixed(2);
  const platformCutUsd = +(BASE_DELIVERY_USD - driverCutUsd).toFixed(2);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
   .then(r=>r.json())
   .then(d=>{ if(d?.rates?.UGX) setRate(Math.round(d.rates.UGX)) })
   .catch(()=>{})
  }, []);

  const toUGX = (usd) => Math.round(Number(usd) * rate);
  const totalFoodUSD = cart.reduce((sum, item) => sum + Number(item.priceUSD), 0);
  const totalFoodUGX = toUGX(totalFoodUSD);
  const deliveryFeeUGX = toUGX(BASE_DELIVERY_USD);
  const grandTotalUGX = totalFoodUGX + deliveryFeeUGX;
  const grandTotalUSD = +(totalFoodUSD + BASE_DELIVERY_USD).toFixed(2);

  const addToCart = (item) => { setCart([...cart, item]); };

  const handleOrder = async () => {
    if(!address) return alert("Enter delivery address");
    const orderData = {
      package_description: cart.map(c=>c.name).join(', '),
      pickup_address: cart[0]?.name || "Restaurant",
      dropoff_address: address,
      distance_km: distanceKm,

      // NEW USD ENGINE - Backend will auto-calc commissions
      delivery_fee_usd: BASE_DELIVERY_USD,
      price_usd: grandTotalUSD,
      price_ugx: grandTotalUGX,
      exchange_rate: rate,
    };
    try {
      const res = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if(res.ok){
        alert(`Order Placed! $${grandTotalUSD} USD (${grandTotalUGX.toLocaleString()} UGX)\nRider earns $${data.order.driver_commission_usd} USD`);
        setCart([]); setShowCheckout(false); setAddress("");
      } else { alert("Error: " + JSON.stringify(data)); }
    } catch(e){ alert("Backend not running"); }
  };

  return (
    <div style={{fontFamily:'system-ui', background:'#fffaf5', minHeight:'100vh'}}>
      <header style={{display:'flex', justifyContent:'space-between', padding:'15px 30px', background:'white', position:'sticky', top:0, borderBottom:'1px solid #eee'}}>
        <b style={{color:'#FF6B00', fontSize:22}}>Deliver Uganda</b>
        <div style={{display:'flex', gap:12}}>
          <span style={{fontSize:12, background:'#f1f5f9', padding:'6px 10px', borderRadius:20}}>1$ = {rate.toLocaleString()} UGX • Delivery ${BASE_DELIVERY_USD}</span>
          <button onClick={()=> cart.length && setShowCheckout(true)} style={{background:'#0f172a', color:'white', padding:'10px 16px', borderRadius:99, fontWeight:700, cursor:'pointer'}}>
            Cart: {cart.length} • ${grandTotalUSD} USD
          </button>
        </div>
      </header>
      <div style={{padding:30, maxWidth:1100, margin:'0 auto'}}>
        <h2>Restaurants Near You</h2>
        <p style={{color:'#64748b'}}>Prices: Food in USD + Fixed Delivery ${BASE_DELIVERY_USD} USD (Rider gets ${driverCutUsd} / {COMMISSION_RATE}%)</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20, marginTop:20}}>
          {restaurants.map(r => (
            <div key={r.id} style={{border:'1px solid #eee', padding:20, borderRadius:16, background:'white'}}>
              <div style={{height:120, background:'#ffedd5', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40}}>🍔</div>
              <h3>{r.name}</h3>
              <p style={{color:'#888', fontSize:14}}>{r.time} • {r.rating}</p>
              <div style={{fontSize:18, fontWeight:800}}>${r.priceUSD} USD <span style={{fontSize:12, color:'#888'}}>({toUGX(r.priceUSD).toLocaleString()} UGX)</span></div>
              <button onClick={() => addToCart(r)} style={{width:'100%', background:'black', color:'white', padding:12, borderRadius:99, marginTop:10, cursor:'pointer', fontWeight:700}}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      {showCheckout && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:99}}>
          <div style={{background:'white', padding:25, borderRadius:20, width:400}}>
            <h3>Confirm Order</h3>
            <p style={{fontSize:13, color:'#64748b'}}>Rate frozen at 1$ = {rate.toLocaleString()} UGX</p>
            <label style={{fontSize:13, fontWeight:600}}>Delivery Address</label>
            <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="e.g. Ntinda, Kampala" style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ddd', margin:'5px 0 15px'}} />
            <label style={{fontSize:13, fontWeight:600}}>Distance (KM)</label>
            <input type="number" value={distanceKm} onChange={e=>setDistanceKm(Number(e.target.value))} style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ddd', margin:'5px 0 15px'}} />
            <div style={{background:'#f8fafc', padding:12, borderRadius:10, fontSize:14, lineHeight:'22px', marginBottom:15}}>
              Food: ${totalFoodUSD} ({totalFoodUGX.toLocaleString()} UGX)<br/>
              Delivery: <b>${BASE_DELIVERY_USD} USD ({deliveryFeeUGX.toLocaleString()} UGX)</b><br/>
              <span style={{fontSize:11, color:'#16a34a'}}>Rider earns ${driverCutUsd} ({COMMISSION_RATE}%) • You keep ${platformCutUsd}</span><br/>
              <div style={{borderTop:'1px dashed #ddd', marginTop:8, paddingTop:8, fontWeight:800}}>Total: ${grandTotalUSD} USD ({grandTotalUGX.toLocaleString()} UGX)</div>
            </div>
            <div style={{display:'flex', gap:10}}>
              <button onClick={()=>setShowCheckout(false)} style={{flex:1, padding:12, borderRadius:99, border:'1px solid #ddd', background:'white', cursor:'pointer'}}>Cancel</button>
              <button onClick={handleOrder} style={{flex:2, padding:12, borderRadius:99, background:'#FF6B00', color:'white', border:'none', fontWeight:700, cursor:'pointer'}}>Place ${grandTotalUSD} Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}