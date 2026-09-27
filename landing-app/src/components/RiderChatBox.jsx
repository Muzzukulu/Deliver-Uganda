// src/components/RiderChatBox.jsx
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

  return (
    <div className="flex flex-col h-[420px]">
      {/* Header - Compact */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full text-[13px]">←</button>
        <div className="flex-1">
          <p className="text-[13px] font-semibold leading-tight">Our Rider Network</p>
          <p className="text-[11px] text-gray-500 leading-snug">Online • Voice enabled</p>
        </div>
      </div>

      {/* Messages - Compact no-scroll */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/50">
        {messages.length === 0 && (
          <p className="text-[11px] text-gray-400 text-center mt-8 leading-snug">
            No messages yet. Say hi to a rider 👋
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.me? 'justify-end' : 'justify-start'}`}>
            {m.type === 'text'? (
              <div className="max-w-[78%] px-2.5 py-2 rounded-2xl bg-black text-white text-[13px] leading-[1.35]">
                {m.content}
              </div>
            ) : (
              <audio controls src={m.content} className="h-8 max-w-[78%]" />
            )}
          </div>
        ))}
      </div>

      {/* Input + CAPSULE MIC RESTORED */}
      <div className="p-2.5 border-t border-gray-100 flex items-center gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendText()}
          placeholder="Message a rider..."
          className="flex-1 px-3 py-2 rounded-full bg-gray-100 text-[13px] leading-tight focus:outline-none focus:bg-white focus:ring-1 focus:ring-black"
        />

        {/* CAPSULE MIC - RESTORED */}
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0
            ${recording
             ? 'bg-red-500 animate-pulse scale-110'
              : 'bg-black hover:bg-gray-800'}`}
          title="Hold to record"
        >
          <span className="text-white text-[14px]">{recording? '●' : '🎙️'}</span>
        </button>

        {text.trim() && (
          <button onClick={sendText} className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[13px] hover:bg-gray-800">
            ↑
          </button>
        )}
      </div>
      {recording && <p className="text-[10px] text-red-500 text-center pb-1 leading-none animate-pulse">Recording... release to send</p>}
    </div>
  );
}