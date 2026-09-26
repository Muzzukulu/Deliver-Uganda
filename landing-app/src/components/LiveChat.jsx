import { useState } from 'react';

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false); // <-- starts CLOSED, no auto-open
  const [newMsg, setNewMsg] = useState('');
  const [recording, setRecording] = useState(false);

  const sendText = () => {
    if (!newMsg.trim()) return;
    console.log('Sending:', newMsg);
    setNewMsg('');
  };

  const startRec = () => setRecording(true);
  const stopRec = () => setRecording(false);

  // CLOSED STATE -> Only beautiful bubble
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3c0f6e] text-white flex items-center justify-center shadow-2xl hover:bg-[#4c1f8e] hover:scale-110 transition-all z-50"
        title="Chat with us"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
    );
  }

  // OPEN STATE -> Your beautiful capsule chat
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-[#f3e8ff] overflow-hidden z-50 animate-in slide-in-from-bottom-2">

      {/* Header with close */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#3c0f6e] text-white">
        <p className="text-sm font-semibold">Deliver Uganda</p>
        <button onClick={() => setIsOpen(false)} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">✕</button>
      </div>

      <div className="h-64 p-4 overflow-y-auto bg-[#fcf9ff]">
        <p className="text-sm text-gray-500 text-center mt-20">👋 How can we help you today?</p>
      </div>

      <div className="p-3 bg-white shrink-0 border-t border-[#f3e8ff]">
        <div className="flex items-center gap-2 bg-[#f9f5ff] border border-[#e9d5ff] rounded-full px-2 py-1.5 focus-within:border-[#c084fc] focus-within:ring-1 focus-within:ring-[#e9d5ff] transition-all">

          <input
            value={newMsg}
            onChange={e=>setNewMsg(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&sendText()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none"
          />

          <button
            onMouseDown={startRec}
            onMouseUp={stopRec}
            onTouchStart={startRec}
            onTouchEnd={stopRec}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${recording?'bg-red-500 text-white animate-pulse scale-110 shadow-lg shadow-red-200':'bg-white text-[#3c0f6e] hover:bg-[#3c0f6e] hover:text-white shadow-sm'}`}
            title="Hold to record"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2a1 1 0 0 1 2 0v2a5 5 0 0 0 10 0v-2a1 1 0 0 1 2 0z"/>
              <path d="M12 19a1 1 0 0 1-1-1 1 1 0 0 1 2 0 1 1 0 0 1-1 1z"/>
            </svg>
          </button>

          <button onClick={sendText} className="w-8 h-8 rounded-full bg-[#3c0f6e] text-white flex items-center justify-center shrink-0 hover:bg-[#4c1f8e] hover:scale-105 transition-all shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>

        </div>
        {recording && <p className="text-[11px] font-bold text-green-600 text-center mt-1.5 animate-pulse tracking-wide">● Recording... release to send</p>}
      </div>
    </div>
  );
}

export default LiveChat;