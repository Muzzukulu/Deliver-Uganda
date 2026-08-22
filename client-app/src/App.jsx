import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Login(){
 return (
  <div style={{padding:'40px',fontFamily:'sans-serif'}}>
    <h1 style={{color:'green',fontSize:'32px'}}>✅ TRUTH REVEALED - CLIENT APP v2</h1>
    <h3>If you see GREEN, new code is working!</h3>
    <input placeholder="Client Email" style={{padding:12,width:'100%',marginBottom:10,border:'2px solid green'}}/><br/>
    <input placeholder="Password" type="password" style={{padding:12,width:'100%',marginBottom:10,border:'2px solid green'}}/><br/>
    <button style={{padding:14,background:'green',color:'white',border:'none',width:'100%',fontSize:'18px',fontWeight:'bold'}}>CLIENT LOGIN - SUCCESS</button>
    <p style={{marginTop:20}}><Link to="/dashboard">Go to Dashboard</Link></p>
  </div>
 )
}
function Dashboard(){ return <div style={{padding:40}}><h1 style={{color:'green'}}>✅ DASHBOARD WORKS! TRUTH IS GREEN!</h1><Link to="/">Back</Link></div>}

export default function App(){
 return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
 )
}