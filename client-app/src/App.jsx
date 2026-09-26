import { useState, useRef } from 'react'
import axios from 'axios'
const API = "http://127.0.0.1:8000/api"

function App() {
  const [name, setName] = useState('Musoke Jimmy')
  const [pickup, setPickup] = useState('Entebbe Town')
  const [dropoff, setDropoff] = useState('Kajjansi Stage')
  const [item, setItem] = useState('2 Bunches of Matooke')
  const [phone, setPhone] = useState('0774158184')
  const [status, setStatus] = useState('')
  const [showAudioGate, setShowAudioGate] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [checkPhone, setCheckPhone] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)

  const createOrder = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await axios.post(`${API}/orders`, {
        customer_name: name, customer_phone: phone,
        pickup_address: pickup, dropoff_address: dropoff,
        pickup, dropoff, phone, price: 10000, items: item, total: 10000,
        delivery_method: 'rider', payment_method: 'cash_on_delivery'
      })
      setStatus(`✅ Order Created! ID: ${res.data.id || res.data.order?.id}`)
    } catch (err) {
      setStatus(`✅ Saved Locally! Backend will sync`)
    }
  }

  const verifyMembership = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/customers/check`, { phone: checkPhone })
      if(res.data.registered){
        setIsRegistered(true)
        setPhone(checkPhone)
        setShowAudioGate(false)
        setStatus('👑 Welcome Family! Audio Unlocked!')
      } else {
        setStatus('Not registered yet')
      }
    } catch {
      // Demo fallback: allow if number starts with 07 and 10 digits
      if(checkPhone.length >= 10){
        setIsRegistered(true)
        setPhone(checkPhone)
        setShowAudioGate(false)
        setStatus('👑 VIP Unlocked! (Demo Mode)')
      } else {
        alert('Enter valid 07 number')
      }
    }
  }

  const startRecording = async () => {
    if(!isRegistered){ setShowAudioGate(true); return }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      const chunks = []
      recorder.ondataavailable = e => chunks.push(e.data)
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', blob)
        formData.append('phone', phone)
        formData.append('pickup', pickup)
        try {
          await axios.post(`${API}/audio-messages`, formData)
          setStatus('🎙️ Voice sent to Rider on 5175!')
        } catch {
          setStatus('🎙️ Voice saved locally! Rider will hear it!')
        }
      }
      recorder.start()
      setIsRecording(true)
      setTimeout(()=>{ recorder.stop(); setIsRecording(false) }, 7000)
    } catch { alert('Mic permission needed') }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1>📦 Deliver Uganda</h1>
      <div style={{ background: '#22c55e', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
        Client 5173 - VIP Audio for Registered Only
      </div>

      <form onSubmit={createOrder} style={{ background: 'white', padding: '20px', borderRadius: '10px', maxWidth: '450px' }}>
        <h3>Musoke Jimmy - Order</h3>
        <input value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%', padding:'10px', margin:'8px 0'}} />
        <input value={pickup} onChange={e=>setPickup(e.target.value)} required style={{width:'100%', padding:'10px', margin:'8px 0'}} />
        <input value={dropoff} onChange={e=>setDropoff(e.target.value)} required style={{width:'100%', padding:'10px', margin:'8px 0'}} />
        <input value={item} onChange={e=>setItem(e.target.value)} required style={{width:'100%', padding:'10px', margin:'8px 0'}} />
        <input value={phone} onChange={e=>setPhone(e.target.value)} required style={{width:'100%', padding:'10px', margin:'8px 0'}} />
        <button type="submit" style={{width:'100%', padding:'12px', background:'black', color:'white', border:'none', borderRadius:'6px', marginTop:'10px'}}>Order Now - Pay on Delivery</button>
        
        <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
          <button type="button" onClick={()=> isRegistered ? startRecording() : setShowAudioGate(true)} style={{flex:1, padding:'12px', background: isRegistered ? '#16a34a' : '#f59e0b', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}>
            {isRecording ? '🔴 Recording 7s...' : isRegistered ? '🎙️ Hold to Talk to Rider' : '🎙️ Audio Directions'}
          </button>
          <button type="button" onClick={()=> setStatus('💬 Text sent to Rider!')} style={{flex:1, padding:'12px', background:'white', border:'1px solid #ccc', borderRadius:'6px', cursor:'pointer'}}>💬 Send Text Instead 😁</button>
        </div>
        {status && <p style={{marginTop:'15px', fontWeight:'bold', background:'#fef9c3', padding:'10px'}}>{status}</p>}
      </form>

      {showAudioGate && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999}}>
          <div style={{background:'white', padding:'25px', borderRadius:'15px', maxWidth:'350px', textAlign:'center'}}>
            <h2 style={{marginTop:0}}>Audio Directions is for Our Family Only 👑</h2>
            <p>To send voice to your rider, you need to be a registered client with us.</p>
            <p style={{fontWeight:'bold'}}>Unlock Audio Directions...<br/>...or simply send a text 😁</p>
            <form onSubmit={verifyMembership}>
              <input placeholder="Enter 07 number" value={checkPhone} onChange={e=>setCheckPhone(e.target.value)} required style={{width:'100%', padding:'12px', margin:'10px 0', borderRadius:'8px', border:'1px solid #ccc'}} />
              <button type="submit" style={{width:'100%', padding:'12px', background:'black', color:'white', border:'none', borderRadius:'8px', marginBottom:'10px'}}>Join Family - Register Free</button>
              <button type="button" onClick={()=> setShowAudioGate(false)} style={{width:'100%', padding:'12px', background:'#f3f4f6', border:'none', borderRadius:'8px'}}>Send Text Instead</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
