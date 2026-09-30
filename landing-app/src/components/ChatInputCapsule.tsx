// src/components/ChatInputCapsule.jsx - WHATSAPP PRO + SLIDE TO LOCK + PAUSE
import { useState, useRef, useEffect } from 'react';

export default function ChatInputCapsule({
  onSendText,
  onSendVoice,
  voiceEnabled = true, // false for Management
  placeholder = "Message a transporter..."
}) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [slideY, setSlideY] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startYRef = useRef(0);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording &&!paused) {
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, paused]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const handleSendText = () => {
    if (!text.trim()) return;
    onSendText?.(text);
    setText('');
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;
      audioChunksRef.current = [];
      rec.ondataavailable = e => { if(e.data.size>0) audioChunksRef.current.push(e.data); };
      rec.onstop = () => {
        if(!audioChunksRef.current.length) return;
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onSendVoice?.(blob, URL.createObjectURL(blob));
        stream.getTracks().forEach(t=>t.stop());
      };
      rec.start();
      setIsRecording(true); setElapsed(0); setPaused(false); setLocked(false); setSlideY(0);
    } catch { alert("Mic permission needed"); }
  };

  const stopAndSend = () => {
    if(mediaRecorderRef.current?.state!== 'inactive') mediaRecorderRef.current?.stop();
    setIsRecording(false); setLocked(false); setPaused(false); setSlideY(0); setElapsed(0);
    clearInterval(timerRef.current);
  };

  const cancelRec = () => {
    if(mediaRecorderRef.current){
      mediaRecorderRef.current.onstop = null;
      if(mediaRecorderRef.current.state!== 'inactive') mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach(t=>t.stop());
    setIsRecording(false); setLocked(false); setPaused(false); setSlideY(0); setElapsed(0);
    clearInterval(timerRef.current); audioChunksRef.current = [];
  };

  const togglePause = () => {
    if(!mediaRecorderRef.current) return;
    if(paused){ mediaRecorderRef.current.resume(); setPaused(false); }
    else { mediaRecorderRef.current.pause(); setPaused(true); }
  };

  // Slide logic
  const onDown = (e) => {
    if(!voiceEnabled) return;
    const y = e.touches? e.touches[0].clientY : e.clientY;
    startYRef.current = y;
    if(!isRecording) startRec();
  };
  const onMove = (e) => {
    if(!isRecording || locked ||!voiceEnabled) return;
    const y = e.touches? e.touches[0].clientY : e.clientY;
    const diff = startYRef.current - y;
    if(diff>0) setSlideY(diff);
    if(diff>70){ setLocked(true); setSlideY(0); }
  };
  const onUp = () => { if(isRecording &&!locked) setSlideY(0); };

  return (
    <div className="p-3 bg-white border-t border-[#f3e8ff] shrink-0 relative">

      {/* Slide hint */}
      {isRecording &&!locked && slideY > 0 && (
        <div className="absolute bottom-[68px] right-3 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-lg flex items-center gap-2"
             style={{ transform: `translateY(${-slideY*0.5}px)`, opacity: Math.min(1, slideY/30) }}>
          <span>🔒</span><span className="text-[11px] font-medium">Slide up to lock</span>
        </div>
      )}

      {/* Locked bar */}
      {locked && isRecording && (
        <div className="mb-2.5 flex items-center justify-between bg-[#f3f0ff] rounded-full px-3 py-2 animate-in slide-in-from-bottom-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${paused? 'bg-gray-400' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-[13px] font-mono font-bold">{fmt(elapsed)}</span>
            <span className="text-[10px] text-gray-500">{paused? 'Paused' : 'Recording'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={togglePause} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center">{paused? '▶️' : '⏸️'}</button>
            <button onClick={cancelRec} className="w-8 h-8 rounded-full bg-white border text-red-500 flex items-center justify-center">✕</button>
            <button onClick={stopAndSend} className="h-8 px-4 rounded-full bg-[#3c0f6e] text-white text-[11px] font-bold">SEND</button>
          </div>
        </div>
      )}

      <div className="relative flex items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={e=>e.key==='Enter' && handleSendText()}
          placeholder={isRecording? (locked? 'Locked • Tap SEND' : `🔴 ${fmt(elapsed)} • Slide up to lock`) : placeholder}
          disabled={isRecording && locked}
          className="w-full h-[48px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[90px] text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm placeholder-gray-400 disabled:bg-gray-50"
        />
        {/* Send */}
        <button onClick={handleSendText} className="absolute right-[46px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3c0f6e] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>

        {/* MAGIC MIC */}
        {voiceEnabled? (
          <button
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
            onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            onClick={() => { if(isRecording &&!locked) stopAndSend(); }}
            className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all touch-none select-none ${isRecording? 'bg-red-500 animate-pulse scale-110' : 'bg-[#3c0f6e] hover:bg-[#4c1f8e]'}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        ) : (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center opacity-50">🔇</div>
        )}
      </div>

      <p className="text-[9px] text-center text-gray-400 mt-1.5">
        {isRecording? (locked? '🔒 Locked • Pause / Send' : '⬆️ Slide up to lock • Tap mic to send') : voiceEnabled? 'Transporters within 5km • Hold mic & slide up to lock' : 'Text only • Management support'}
      </p>
    </div>
  );
}