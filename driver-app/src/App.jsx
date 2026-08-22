import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Landing() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{fontSize: '40px'}}>Deliver Uganda 🇺🇬</h1>
      <h2>Fast Boda Delivery in Kampala</h2>
      <p style={{color:'#666'}}>Deliver parcels in 30 minutes. Join as a Driver today!</p>
      <br />
      <Link to="/register" style={{ padding: '16px 30px', background: '#5b21b6', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight:'bold', fontSize:'18px' }}>
        Register as Driver
      </Link>
      <br /><br />
      <p><Link to="/login" style={{ color: '#555' }}>Already have an account? Login</Link></p>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/driver/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({ phone, password })
      })
      const data = await res.json()
      if(res.ok){ localStorage.setItem('driver_token', data.token); navigate('/dashboard') }
      else { alert(data.message || 'Login failed') }
    } catch(err){ alert('Backend not running! Start php artisan serve') }
  }
  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '60px auto', padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <Link to="/">← Back</Link><h2>Driver Login</h2>
      <input required placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} style={{padding:'12px', width:'100%', marginBottom:'10px'}} />
      <input required placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{padding:'12px', width:'100%', marginBottom:'15px'}} />
      <button type="submit" style={{padding:'14px', width:'100%', background:'#4a1d96', color:'white', border:'none', borderRadius:'8px'}}>Login</button>
    </form>
  )
}

function Dashboard(){ return <div style={{padding:'40px', textAlign:'center', fontFamily:'sans-serif'}}><h2>Driver Dashboard ✅</h2><p>You are logged in.</p><Link to="/">Logout</Link></div> }

function Register() {
  const [form, setForm] = useState({ first_name: '', name: '', phone: '', national_id: '', driving_permit: '', password: '', password_confirmation: '' })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/driver/register', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if(res.ok){ alert(data.message); navigate('/login') }
      else { alert(data.message || JSON.stringify(data.errors)) }
    } catch(err){ alert('System error - please try again') }
  }
  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Link to="/">← Back to Home</Link>
      <h2>Driver Registration - NIRA Verified 🇺🇬</h2>
      <p style={{fontSize:'13px', color:'#065f46', background:'#d1fae5', padding:'8px', borderRadius:'6px'}}>✓ NIRA & UCC Verified Registration</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop:'15px' }}>
        <input required placeholder="First Name (as on National ID)" value={form.first_name} onChange={e=>setForm({...form, first_name: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input required placeholder="Last Name / Surname (as on ID)" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input required placeholder="Phone 07XXXXXXXX - must be registered under your NIN" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input required placeholder="National ID No. CM12345678901234" value={form.national_id} onChange={e=>setForm({...form, national_id: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input placeholder="Driving Permit No. (optional)" value={form.driving_permit} onChange={e=>setForm({...form, driving_permit: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input required type="password" placeholder="Password (min 8 chars)" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <input required type="password" placeholder="Confirm Password" value={form.password_confirmation} onChange={e=>setForm({...form, password_confirmation: e.target.value})} style={{padding: '12px', borderRadius:'6px', border:'1px solid #ccc'}} />
        <button type="submit" style={{padding: '14px', background: '#4a1d96', color: 'white', border: 'none', borderRadius:'8px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}>Register & Verify with NIRA</button>
      </form>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter><Routes>
        <Route path="/" element={<Landing />} /><Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /><Route path="/dashboard" element={<Dashboard />} />
    </Routes></BrowserRouter>
  )
}