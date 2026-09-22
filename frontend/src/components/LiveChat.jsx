import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState("")
  const [recording, setRecording] = useState(false)
  const mediaRecorder = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', {ascending:true})
      setMessages(data||[])
    }
    load()
    const ch = supabase.channel('live-chat').on('postgres_changes',
      {event:'INSERT', schema:'public', table:'messages'},
      p=> setMessages(m=>[...m, p.new])
    ).subscribe()
    return () => supabase.removeChannel(ch)
  }, [])

  useEffect(()=> bottomRef.current?.scrollIntoView({behavior:'smooth'}), [messages])

  const sendText = async () => {
    if(!newMsg.trim()) return
    await supabase.from('messages').insert([{content:newMsg, sender:'user', message_type:'text'}])
    setNewMsg("")
  }

  const startRec = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({audio:true})
    mediaRecorder.current = new MediaRecorder(stream)
    const chunks=[]
    mediaRecorder.current.ondataavailable=e=>chunks.push(e.data)
    mediaRecorder.current.onstop=async()=>{
      const blob = new Blob(chunks, {type:'audio/webm'})
      const name = `voice_${Date.now()}.webm`
      await supabase.storage.from('VOICE-MESSAGES').upload(name, blob)
      const {data} = supabase.storage.from('VOICE-MESSAGES').getPublicUrl(name)
      await supabase.from('messages').insert([{content:'🎤 Voice', sender:'user', message_type:'audio', audio_url:data.publicUrl}])
    }
    mediaRecorder.current.start()
    setRecording(true)
  }
  const stopRec = () => { mediaRecorder.current?.stop(); setRecording(false) }

  const scrollbarStyle = `
  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: #fcf5ff; }
  .custom-scroll::-webkit-scrollbar-thumb { background: #e9d5ff; border-radius: 20px; }
  .custom-scroll::-webkit-scrollbar-thumb:hover { background: #c084fc; }
  `

  return (
    <>
      <style>{scrollbarStyle}</style>
      <button onClick={()=>setOpen(!open)} className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3c0f6e] text-white text-2xl z-[999] shadow-lg"> {open?'✕':'🎧'} </button>
      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-[#fcf5ff] rounded-[20px] shadow-2xl flex flex-col z-[999] overflow-hidden border border-[#e9d5ff]">
          <div className="bg-[#3c0f6e] text-white p-4 font-bold shrink-0">Deliver Uganda - Live Chat</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcf5ff] custom-scroll" style={{scrollbarWidth:'thin', scrollbarColor:'#e9d5ff #fcf5ff'}}>
            {messages.map(m=>(
              <div key={m.id} className={`flex ${m.sender==='user'?'justify-end':'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${m.sender==='user'?'bg-[#e9d5ff]':'bg-white shadow-sm'}`}>
                  {m.message_type==='audio'? <audio controls src={m.audio_url} className="w-[190px]" /> : <p>{m.content}</p>}
                  <p className="text-[9px] opacity-50 text-right mt-1">{new Date(m.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef}/>
          </div>
          <div className="p-3 bg-white flex gap-2 items-center shrink-0 border-t border-[#f3e8ff]">
            <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendText()} placeholder="Type..." className="flex-1 border border-[#e9d5ff] rounded-full px-4 py-2 text-sm outline-none focus:border-[#c084fc] bg-white" />
            <button onMouseDown={startRec} onMouseUp={stopRec} onTouchStart={startRec} onTouchEnd={stopRec} className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${recording?'bg-red-500 animate-pulse text-white':'bg-gray-100'}`}>🎤</button>
            <button onClick={sendText} className="bg-[#3c0f6e] text-white px-5 py-2 rounded-full text-sm font-medium">Send</button>
          </div>
        </div>
      )}
    </>
  )
}