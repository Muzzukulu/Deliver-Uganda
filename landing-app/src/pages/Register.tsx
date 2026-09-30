import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', first_name:'', phone:'', email:'', password:'', password_confirmation:'', national_id:'', vehicle_type:'boda', driving_permit:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    const API = import.meta.env.VITE_API_URL || 'http://10.199.18.117:8000/api';
    const url = role === 'customer'? `${API}/register` : `${API}/driver/register`;

    const payload = role === 'customer'?
      {name:form.name, email:form.email, phone:form.phone, password:form.password, password_confirmation:form.password_confirmation} :
      {
        first_name: form.first_name || form.name.split(' ')[0] || form.name,
        name: form.name,
        phone: form.phone,
        national_id: form.national_id,
        driving_permit: form.driving_permit,
        password: form.password,
        password_confirmation: form.password_confirmation
      };

    if(role==='driver' && (!form.national_id || form.national_id.length!==14)){
      setError('National ID 14 chars mandatory for Pro'); return;
    }
    if(form.password!== form.password_confirmation){
      setError('Passwords do not match'); return;
    }
    setLoading(true);
    try{
      const res = await fetch(url,{method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(payload)});
      const data = await res.json(); if(!res.ok) throw new Error(data.message || JSON.stringify(data.errors));
      role==='customer'? navigate('/login') : navigate(`/pay-pro?driverId=${data.driver?.id || ''}&phone=${form.phone}`);
    }catch(err){ setError(err.message); } finally{ setLoading(false); }
  };

  const inputStyle = {width:'100%', padding:'12px 14px', borderRadius:'12px', border:'1px solid #e2e8f0', outline:'none', fontSize:'14px', boxSizing:'border-box'};

  return (
    <div style={{minHeight:'100vh', background:'#f8f7ff', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{width:'100%', maxWidth:'520px', background:'white', borderRadius:'20px', padding:'28px', border:'1px solid #ede9ff', boxShadow:'0 10px 40px rgba(45,22,84,0.08)'}}>

        <div style={{display:'flex', gap:'10px', marginBottom:'20px', background:'#f1f0ff', padding:'6px', borderRadius:'12px'}}>
          <button type="button" onClick={()=>setRole('customer')} style={{flex:1, padding:'10px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:700, background: role==='customer'? 'white' : 'transparent', boxShadow: role==='customer'? '0 2px 8px rgba(0,0,0,0.1)' : 'none'}}>🛒 Customer</button>
          <button type="button" onClick={()=>setRole('driver')} style={{flex:1, padding:'10px', borderRadius:'8px', border:'none', cursor:'pointer', fontWeight:700, background: role==='driver'? 'white' : 'transparent', boxShadow: role==='driver'? '0 2px 8px rgba(0,0,0,0.1)' : 'none'}}>🏍️ Pro Driver</button>
        </div>

        <h2 style={{fontFamily:'Poppins', fontSize:'24px', fontWeight:800, color:'#2d1654', margin:0}}>
          {role==='customer'? 'Create Customer Account' : 'Become a Pro Driver'}
        </h2>
        <p style={{fontSize:'12px', color: role==='driver'? '#d93838' : '#8a7bb5', background: role==='driver'?'#fff0f0':'transparent', border: role==='driver'?'1px solid #ffd2d2':'none', padding: role==='driver'?'6px 10px':'0', borderRadius:'8px', marginTop:'8px'}}>
          {role==='customer'? 'Order in minutes around Kampala' : 'NIN Mandatory - Earn 80% - Pay 250K to activate'}
        </p>

        {error && <div style={{background:'#ffe0e0', padding:'10px', borderRadius:'10px', color:'#c00', fontWeight:700, fontSize:'13px', marginTop:'12px'}}>{error}</div>}

        <form onSubmit={handleSubmit} style={{marginTop:'18px', display:'flex', flexDirection:'column', gap:'14px'}}>
          <div><label>Full Name</label><input style={inputStyle} required onChange={e=>setForm({...form, name:e.target.value, first_name:e.target.value.split(' ')[0]})}/></div>
          <div><label>Phone</label><input style={inputStyle} required placeholder="0774..." onChange={e=>setForm({...form, phone:e.target.value})}/></div>

          {role==='customer'? (
            <>
              <div><label>Email</label><input style={inputStyle} type="email" required onChange={e=>setForm({...form, email:e.target.value})}/></div>
            </>
          ) : (
            <>
              <div><label>National ID * 14 Chars</label><input style={inputStyle} required maxLength={14} onChange={e=>setForm({...form, national_id:e.target.value.toUpperCase()})}/></div>
              <div><label>Driving Permit (optional)</label><input style={inputStyle} onChange={e=>setForm({...form, driving_permit:e.target.value})}/></div>
              <div><label>Vehicle Type</label><select style={inputStyle} onChange={e=>setForm({...form, vehicle_type:e.target.value})}><option value="boda">Boda</option><option value="car">Car</option><option value="truck">Truck</option></select></div>
            </>
          )}

          <div><label>Password</label>
            <div style={{position:'relative'}}>
              <input style={{...inputStyle, paddingRight:'42px'}} type={showPass? "text" : "password"} required onChange={e=>setForm({...form, password:e.target.value})}/>
              <span onClick={()=>setShowPass(!showPass)} style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer'}}>{showPass? '🙈' : '👁️'}</span>
            </div>
          </div>
          <div><label>Confirm Password</label>
            <div style={{position:'relative'}}>
              <input style={{...inputStyle, paddingRight:'42px'}} type={showConfirm? "text" : "password"} required onChange={e=>setForm({...form, password_confirmation:e.target.value})}/>
              <span onClick={()=>setShowConfirm(!showConfirm)} style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', cursor:'pointer'}}>{showConfirm? '🙈' : '👁️'}</span>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{background:'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', color:'white', padding:'14px', borderRadius:'12px', border:'none', fontWeight:700, cursor:'pointer'}}>{loading? 'Please wait...' : role==='customer'? 'CREATE ACCOUNT' : 'REGISTER & PAY 250K'}</button>
        </form>
      </div>
    </div>
  );
}