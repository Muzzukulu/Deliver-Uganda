import { useState, useEffect } from "react";

type Restaurant = {
  id: number;
  name: string;
  time: string;
  rating: string;
  priceUSD: number;
}

const restaurants: Restaurant[] = [
  { id: 1, name: "Javas House", time: "20-30 min", rating: "4.8", priceUSD: 5.5 },
  { id: 2, name: "KFC Kampala", time: "15-25 min", rating: "4.6", priceUSD: 3.2 },
  { id: 3, name: "Cafe Javas", time: "25-35 min", rating: "4.9", priceUSD: 7 },
];

export default function Dashboard() {
  const [cart, setCart] = useState<Restaurant[]>([]);
  const [rate, setRate] = useState<number>(3850);
  const [showCheckout, setShowCheckout] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number>(3);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
   .then(r=>r.json())
   .then(d=>{ if(d?.rates?.UGX) setRate(Math.round(d.rates.UGX)) })
   .catch(()=>{})
  }, []);

  const toUGX = (usd: number) => Math.round(Number(usd) * rate);
  const totalFoodUGX = cart.reduce((sum, item) => sum + toUGX(item.priceUSD), 0);

  // FIXED: cap at 30km to avoid 189km = 95k bug
  const safeDistance = Math.min(Math.max(distanceKm, 1), 30);
  const deliveryFee = 1000 + (safeDistance * 500);
  const transporterPayout = Math.round(deliveryFee * 0.8); // 80% to transporter
  const platformFee = Math.round(deliveryFee * 0.2); // 20% to you
  const grandTotal = totalFoodUGX + deliveryFee;

  const addToCart = (item: Restaurant) => { setCart([...cart, item]); };

  const handleOrder = async () => {
    if(!address) return alert("Enter delivery address");
    if(distanceKm > 30) return alert("Distance too long! Max 30km in Kampala. For upcountry, call us.");

    const orderData = {
      price: grandTotal,
      total: grandTotal,
      exchange_rate: rate,
      distance_km: safeDistance,
      delivery_fee: deliveryFee,
      transporter_payout: transporterPayout, // FIXED: was rider_payout
      platform_fee: platformFee,
      pickup: cart[0]?.name || "Restaurant",
      pickup_address: cart[0]?.name || "Restaurant",
      dropoff: address,
      dropoff_address: address,
      customer_name: "Guest Customer",
      customer_phone: "0700000000",
      phone: "0700000000",
      item: cart.map(c=>c.name).join(", ") || "Food Delivery",
      status: "pending"
    };
    try {
      const res = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if(res.ok){
        alert(`Order Placed! Total ${grandTotal.toLocaleString()} UGX. Transporter gets ${transporterPayout.toLocaleString()} UGX`);
        setCart([]); setShowCheckout(false); setAddress(""); setDistanceKm(3);
      } else { alert("Error: " + JSON.stringify(data)); }
    } catch(e){ alert("Backend not running. Run php artisan serve"); }
  };

  return (
    <div style={{fontFamily:'system-ui', background:'#fffaf5', minHeight:'100vh'}}>
      <header style={{display:'flex', justifyContent:'space-between', padding:'15px 30px', background:'white', position:'sticky', top:0, borderBottom:'1px solid #eee'}}>
        <b style={{color:'#FF6B00', fontSize:22}}>Deliver Uganda</b>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <span style={{fontSize:12, background:'#f1f5f9', padding:'6px 10px', borderRadius:20}}>1$ = {rate.toLocaleString()} UGX</span>
          <button onClick={()=> cart.length && setShowCheckout(true)} style={{background:'#0f172a', color:'white', padding:'10px 16px', borderRadius:99, fontWeight:700, cursor:'pointer'}}>
            Cart: {cart.length} • {totalFoodUGX.toLocaleString()} UGX
          </button>
        </div>
      </header>
      <div style={{padding:30, maxWidth:1100, margin:'0 auto'}}>
        <h2>Restaurants Near You</h2>
        <p style={{color:'#64748b'}}>All prices in UGX • Delivery 1000 + 500 per KM • Transporter gets 80%</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20, marginTop:20}}>
          {restaurants.map(r => (
            <div key={r.id} style={{border:'1px solid #eee', padding:20, borderRadius:16, background:'white'}}>
              <div style={{height:120, background:'#ffedd5', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40}}>🍔</div>
              <h3>{r.name}</h3>
              <p style={{color:'#888', fontSize:14}}>{r.time} • {r.rating}</p>
              <div style={{fontSize:20, fontWeight:800}}>{toUGX(r.priceUSD).toLocaleString()} UGX</div>
              <button onClick={() => addToCart(r)} style={{width:'100%', background:'black', color:'white', padding:12, borderRadius:99, marginTop:10, cursor:'pointer', fontWeight:700}}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      {showCheckout && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:99}}>
          <div style={{background:'white', padding:25, borderRadius:20, width:400}}>
            <h3>Confirm Order</h3>
            <p style={{fontSize:13, color:'#64748b'}}>Rate frozen at 1$ = {rate.toLocaleString()} UGX • Max 30km</p>
            <label style={{fontSize:13, fontWeight:600}}>Delivery Address</label>
            <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="e.g. Ntinda, Kampala" style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ddd', margin:'5px 0 15px'}} />
            <label style={{fontSize:13, fontWeight:600}}>Distance (KM)</label>
            <input type="number" min={1} max={30} value={distanceKm} onChange={e=>setDistanceKm(Number(e.target.value))} style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #ddd', margin:'5px 0 15px'}} />
            {distanceKm > 30 && <p style={{color:'red', fontSize:12}}>⚠️ Too far! Max 30km. Call for upcountry.</p>}
            <div style={{background:'#f8fafc', padding:12, borderRadius:10, fontSize:14, lineHeight:'22px', marginBottom:15}}>
              Food: {totalFoodUGX.toLocaleString()} UGX<br/>
              Delivery ({safeDistance}km): <b>{deliveryFee.toLocaleString()} UGX</b><br/>
              <span style={{fontSize:12, color:'#64748b'}}>Transporter: {transporterPayout.toLocaleString()} | Platform: {platformFee.toLocaleString()}</span>
              <div style={{borderTop:'1px dashed #ddd', marginTop:8, paddingTop:8, fontWeight:800}}>Total: {grandTotal.toLocaleString()} UGX</div>
            </div>
            <div style={{display:'flex', gap:10}}>
              <button onClick={()=>setShowCheckout(false)} style={{flex:1, padding:12, borderRadius:99, border:'1px solid #ddd', background:'white', cursor:'pointer'}}>Cancel</button>
              <button onClick={handleOrder} style={{flex:2, padding:12, borderRadius:99, background:'#FF6B00', color:'white', border:'none', fontWeight:700, cursor:'pointer'}}>Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}