// src/components/TransporterChatBox.tsx - WHATSAPP SLIDE TO LOCK + PAUSE
import { useState, useRef, useEffect } from "react";

export default function TransporterChatBox({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [slideY, setSlideY] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startYRef = useRef<number>(0);
  const timerRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const sendText = () => {
    if (!text.trim()) return;
    setMessages([...messages, { type: 'text', content: text, me: true }]);
    setText("");
  };

  // TIMER
  useEffect(() => {
    if (recording &&!paused) {
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = e => { if(e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = () => {
        if (audioChunksRef.current.length === 0) return;
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMessages(prev => [...prev, { type: 'voice', content: url, me: true }]);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setRecording(true);
      setElapsed(0);
      setPaused(false);
      setLocked(false);
      setSlideY(0);
    } catch {
      alert("Mic permission needed");
    }
  };

  const stopAndSend = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state!== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    setLocked(false);
    setPaused(false);
    setSlideY(0);
    setElapsed(0);
    clearInterval(timerRef.current);
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null; // don't save
      if(mediaRecorderRef.current.state!== 'inactive') mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach(t => t.stop());
    setRecording(false);
    setLocked(false);
    setPaused(false);
    setSlideY(0);
    setElapsed(0);
    clearInterval(timerRef.current);
    audioChunksRef.current = [];
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);
    } else {
      mediaRecorderRef.current.pause();
      setPaused(true);
    }
  };

  // TOUCH / MOUSE HANDLERS FOR SLIDE TO LOCK
  const onPointerDown = (e: any) => {
    const y = e.touches? e.touches[0].clientY : e.clientY;
    startYRef.current = y;
    if (!recording) startRecording();
  };

  const onPointerMove = (e: any) => {
    if (!recording || locked) return;
    const y = e.touches? e.touches[0].clientY : e.clientY;
    const diff = startYRef.current - y; // positive when sliding up
    if (diff > 0) setSlideY(diff);
    if (diff > 70) {
      setLocked(true);
      setSlideY(0);
    }
  };

  const onPointerUp = () => {
    if (!recording) return;
    if (!locked) {
      // if not locked, was tap-to-stop behavior: keep recording? For WhatsApp style, if not locked and release, we cancel? Let's make it stay recording, user taps mic to stop
      setSlideY(0);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex items-center gap-2 p-3 border-b border-gray-100">
        {onBack && <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full text-[13px]">←</button>}
        <div className="flex-1">
          <p className="text-[13px] font-semibold leading-tight">Our Transporter Network</p>
          <p className="text-[11px] text-gray-500 leading-snug">
            {recording? `🔴 ${formatTime(elapsed)} ${paused? '(Paused)' : locked? '• Locked' : '• Slide up to lock'}` : 'Online • Voice enabled'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50/50">
        {messages.length === 0 && (
          <p className="text-[11px] text-gray-400 text-center mt-10 leading-snug">
            No messages yet. Say hi to a transporter 👋<br/>
            <span className="text-[10px]">Transporters within 5km will respond</span>
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.me? 'justify-end' : 'justify-start'}`}>
            {m.type === 'text'? (
              <div className="max-w-[78%] px-3 py-2.5 rounded-2xl bg-[#3c0f6e] text-white text-[13px] leading-[1.35] shadow-sm">{m.content}</div>
            ) : (
              <div className="max-w-[78%] px-2 py-1 rounded-2xl bg-white border border-[#e9d5ff] shadow-sm">
                <audio controls src={m.content} className="h-8 w-[180px]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="p-2.5 bg-white shrink-0 border-t border-gray-100 relative">

        {/* SLIDE TO LOCK HINT - FLOATS ABOVE MIC */}
        {recording &&!locked && slideY > 0 && (
          <div
            className="absolute bottom-[68px] right-3 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-lg flex items-center gap-2 transition-all"
            style={{ transform: `translateY(${-slideY * 0.5}px)`, opacity: Math.min(1, slideY / 30) }}
          >
            <span className="text-[16px]">🔒</span>
            <span className="text-[11px] font-medium text-gray-700">Slide up to lock</span>
          </div>
        )}

        {locked && recording && (
          <div className="mb-2.5 flex items-center justify-between bg-[#f3f0ff] rounded-full px-3 py-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${paused? 'bg-gray-400' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-[13px] font-mono font-medium">{formatTime(elapsed)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={togglePause} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-[14px]">
                {paused? '▶️' : '⏸️'}
              </button>
              <button onClick={cancelRecording} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center text-red-500">✕</button>
              <button onClick={stopAndSend} className="h-8 px-4 rounded-full bg-[#3c0f6e] text-white text-[11px] font-bold">SEND</button>
            </div>
          </div>
        )}

        <div className="relative flex items-center">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder={recording? (locked? 'Locked • Tap SEND' : '🔴 Recording... slide up to lock') : 'Message a transporter...'}
            disabled={recording && locked}
            className="w-full h-[46px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[88px] text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm placeholder-gray-400 disabled:bg-gray-50"
          />
          <button onClick={sendText} className="absolute right-[48px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3c0f6e]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>

          {/* MAGIC MIC WITH SLIDE */}
          <button
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
            onClick={() => { if(recording &&!locked) stopAndSend(); }}
            className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all select-none touch-none ${recording? 'bg-red-500 animate-pulse scale-110' : 'bg-[#3c0f6e] hover:bg-[#4c1f8e]'}`}
            title="Hold & slide up to lock"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1.5 leading-none">
          {recording? (locked? '🔒 Locked • Pause / Send' : '⬆️ Slide up to lock • Tap to stop') : 'Transporters within 5km • Voice enabled • Hold mic & slide up'}
        </p>
      </div>
    </div>
  );
}