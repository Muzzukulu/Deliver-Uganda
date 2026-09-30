import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "Deliver2026!"

export default function AdminChat() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('admin_authed') === 'true')
  const [passInput, setPassInput] = useState("")
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    if(!authed) return
    const load = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', {ascending:true})
      setMessages(data||[])
    }
    load()
    const ch = supabase.channel('admin-chat').on('postgres_changes',
      {event:'INSERT', schema:'public', table:'messages'}, p=> setMessages(m=>[...m, p.new])
    ).subscribe()
    return () => supabase.removeChannel(ch)
  }, [authed])

  useEffect(()=> bottomRef.current?.scrollIntoView({behavior:'smooth'}), [messages])

  const login = () => {
    if(passInput === ADMIN_PASSWORD){
      sessionStorage.setItem('admin_authed','true')
      setAuthed(true)
    } else {
      alert("Wrong password Comrade!")
    }
  }

  const sendReply = async () => {
    if(!reply.trim()) return
    await supabase.from('messages').insert([{content:reply, sender:'admin', message_type:'text'}])
    setReply("")
  }

  if(!authed){
    return (
      <div className="min-h-screen bg-[#fcf5ff] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-[#e9d5ff]">
          <h1 className="text-xl font-bold text-[#3c0f6e] mb-4 text-center">Admin Login</h1>
          <input
            type="password"
            value={passInput}
            onChange={e=>setPassInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&login()}
            placeholder="Enter admin password"
            className="w-full border border-[#e9d5ff] rounded-full px-4 py-3 mb-4 outline-none focus:border-[#3c0f6e]"
          />
          <button onClick={login} className="w-full bg-[#3c0f6e] text-white py-3 rounded-full font-bold">Enter Control Panel</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcf5ff] p-6">
      <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
        <h1 className="text-2xl font-bold text-[#3c0f6e]">Deliver Uganda - Admin Panel</h1>
        <button onClick={()=>{sessionStorage.removeItem('admin_authed'); setAuthed(false)}} className="text-sm text-red-500">Logout</button>
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m=>(
            <div key={m.id} className={`flex ${m.sender==='user'?'justify-start':'justify-end'}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${m.sender==='user'?'bg-gray-100':'bg-[#3c0f6e] text-white'}`}>
                <p className="text-[10px] opacity-60 mb-1">{m.sender} • {new Date(m.created_at).toLocaleTimeString()}</p>
                {m.message_type==='audio'? <audio controls src={m.audio_url} className="w-[190px]" /> : <p>{m.content}</p>}
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div className="p-3 border-t flex gap-2">
          <input value={reply} onChange={e=>setReply(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendReply()} placeholder="Reply as Admin..." className="flex-1 border rounded-full px-4 py-2 outline-none" />
          <button onClick={sendReply} className="bg-[#3c0f6e] text-white px-6 rounded-full">Reply</button>
        </div>
      </div>
    </div>
  )
}