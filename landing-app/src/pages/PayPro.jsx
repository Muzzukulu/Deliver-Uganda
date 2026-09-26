import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PayPro() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const driverId = params.get('driverId');
  const phone = params.get('phone');

  const [status, setStatus] = useState('Ready to pay 250,000 UGX for Pro Activation');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setStatus('Requesting MTN MoMo... Check your phone to approve 250k');
    try {
      const res = await fetch('http://localhost:8000/api/drivers/pay-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ driver_id: driverId, phone: phone })
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Payment failed');

      setStatus('✅ Payment request sent! Approve on phone. You are now PRO!');
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch(err) {
      setStatus(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if(!driverId) return <div style={{padding:20}}>Missing driverId. Go back to register.</div>;

  return (
    <div style={{maxWidth:500, margin:'30px auto', padding:20, textAlign:'center', border:'2px solid #000', borderRadius:12}}>
      <h2 style={{background:'#FFCC00', padding:10}}>🔥 Activate PRO Driver</h2>
      <h1>250,000 UGX</h1>
      <p>Driver ID: {driverId}</p>
      <p>Phone: {phone}</p>
      <p style={{margin:'20px 0', fontWeight:'bold'}}>{status}</p>
      <button onClick={handlePay} disabled={loading} style={{width:'100%', padding:15, background:'#000', color:'#FFCC00', fontSize:18, fontWeight:'bold', cursor:'pointer'}}>
        {loading? 'Processing...' : 'PAY 250K WITH MTN MOMO'}
      </button>
      <p style={{marginTop:15, fontSize:12, color:'#666'}}>Sandbox Mode: Use 46733123453 to test approval</p>
    </div>
  );
}