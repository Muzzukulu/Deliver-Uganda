// src/components/ManagementChatBox.jsx - CAPSULIZED WHATSAPP STYLE
import { useState, useRef } from 'react';

export default function ManagementChatBox() {
  const [newMsg, setNewMsg] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'management',
      text: 'Welcome to Deliver Uganda Management. How can we help you today?',
      time: 'Now'
    }
  ]);

  const mediaRecorderRef = useRef(null);

  const quickReplies = [
    '💰 Pricing & Rates',
    '🤝 Partnership',
    '📦 Complaint / Issue',
    '📄 General Inquiry'
  ];

  const sendText = (textOverride = null) => {
    const text = textOverride || newMsg;
    if (!text.trim()) return;
    setMessages([...messages, { from: 'user', text, time: 'Now' }]);
    setNewMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'management',
        text: `Thanks! Your request about "${text}" is received. Team will reply within 30 mins.`,
        time: 'Now'
      }]);
    }, 800);
  };

  // CAPSULE MIC LOGIC
  const handleMic = async () => {
    if(isRecording){
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    try{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true});
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, {type:'audio/webm'});
        const url = URL.createObjectURL(blob);
        setMessages(prev => [...prev, { from: 'user', text: '🎙️ Voice note', audio: url, time: 'Now' }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { from: 'management', text: 'Voice note received! We will listen and reply shortly.', time: 'Now' }]);
        }, 800);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch{
      alert('Mic permission needed');
    }
  };

  return (
    <>
      {/* Chat History */}
      <div className="p-2.5 space-y-2 h-[280px] overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user'? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-2.5 py-2 rounded-2xl text-[12px] leading-[1.35] shadow-sm
              ${m.from === 'user'
             ? 'bg-[#3c0f6e] text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-[#0f172a] rounded-tl-sm'
              }`}>
              {m.audio? <audio controls src={m.audio} className="w-[180px] h-8" /> : <p className="leading-[1.35]">{m.text}</p>}
              <p className={`text-[8px] mt-0.5 leading-none ${m.from === 'user'? 'text-purple-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendText(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[#3c0f6e] hover:bg-[#f3f0ff] hover:border-[#e9d5ff] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CAPSULIZED INPUT - EXACT LIKE DELIVER BAR SCREENSHOT */}
      <div className="p-2.5 bg-white shrink-0 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder={isRecording? '🔴 Recording... tap mic to stop' : 'Type your inquiry...'}
            className="w-full h-[46px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[88px] text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm placeholder-gray-400"
          />
          {/* Send */}
          <button
            onClick={() => sendText()}
            className="absolute right-[48px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3c0f6e] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
          {/* CAPSULE MIC - THE WHATSAPP MIC */}
          <button
            onClick={handleMic}
            className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isRecording? 'bg-red-500 animate-pulse' : 'bg-[#3c0f6e] hover:bg-[#4c1f8e]'}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1.5 leading-none">
          {isRecording? '🔴 Tap mic to stop & send' : 'Avg response: 30 mins • Mon-Sat 8am-8pm'}
        </p>
      </div>
    </>
  );
}