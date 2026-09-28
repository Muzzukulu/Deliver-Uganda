import { useState } from 'react';

export default function ChatInputCapsule({ onSendText, onSendVoice }) {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="p-3 bg-white border-t border-[#f3e8ff] shrink-0">
      <div className="relative flex items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="w-full h-[48px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[90px] text-sm outline-none focus:border-[#3c0f6e] shadow-sm"
        />
        {/* Send */}
        <button onClick={() => onSendText(text)} className="absolute right-[46px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#3c0f6e]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
        {/* CAPSULE MIC - SAME AS DELIVER BAR */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center ${isRecording? 'bg-red-500 animate-pulse' : 'bg-[#3c0f6e]'}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        </button>
      </div>
    </div>
  );
}