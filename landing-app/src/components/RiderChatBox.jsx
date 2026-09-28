// src/components/RiderChatBox.jsx - CAPSULIZED WHATSAPP STYLE
import { useState, useRef } from "react";

export default function RiderChatBox({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const sendText = () => {
    if (!text.trim()) return;
    setMessages([...messages, { type: 'text', content: text, me: true }]);
    setText("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = e => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMessages(prev => [...prev, { type: 'voice', content: url, me: true }]);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      alert("Mic permission needed");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleMicClick = () => {
    if(recording) stopRecording();
    else startRecording();
  };

  return (
    <div className="flex flex-col h-[420px]">
      {/* Header - Compact */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        {onBack && <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full text-[13px]">←</button>}
        <div className="flex-1">
          <p className="text-[13px] font-semibold leading-tight">Our Rider Network</p>
          <p className="text-[11px] text-gray-500 leading-snug">{recording? '🔴 Recording...' : 'Online • Voice enabled'}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/50">
        {messages.length === 0 && (
          <p className="text-[11px] text-gray-400 text-center mt-8 leading-snug">
            No messages yet. Say hi to a rider 👋
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.me? 'justify-end' : 'justify-start'}`}>
            {m.type === 'text'? (
              <div className="max-w-[78%] px-2.5 py-2 rounded-2xl bg-[#3c0f6e] text-white text-[13px] leading-[1.35] shadow-sm">
                {m.content}
              </div>
            ) : (
              <div className="max-w-[78%] px-2 py-1 rounded-2xl bg-white border border-[#e9d5ff] shadow-sm">
                <audio controls src={m.content} className="h-8 w-[180px]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CAPSULIZED INPUT - WHATSAPP STYLE - SAME AS MANAGEMENT */}
      <div className="p-2.5 bg-white shrink-0 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder={recording? '🔴 Recording... tap to stop' : 'Message a rider...'}
            className="w-full h-[46px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[88px] text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm placeholder-gray-400"
          />
          {/* Send */}
          <button
            onClick={sendText}
            className="absolute right-[48px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3c0f6e] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
          {/* CAPSULE MIC - COORDINATE SVG - SAME OUTFIT */}
          <button
            onClick={handleMicClick}
            onTouchStart={(e) => { e.preventDefault(); handleMicClick(); }}
            className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all ${recording? 'bg-red-500 animate-pulse scale-110' : 'bg-[#3c0f6e] hover:bg-[#4c1f8e]'}`}
            title="Tap to record"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1.5 leading-none">
          {recording? '🔴 Tap mic to stop & send' : 'Riders within 5km • Voice enabled'}
        </p>
      </div>
    </div>
  );
}