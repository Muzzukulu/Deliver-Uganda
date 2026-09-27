import { useState, useRef, useEffect } from 'react';

export default function RiderChatBox() {
  const [newMsg, setNewMsg] = useState('');
  const [recording, setRecording] = useState(false);
  const [recTime, setRecTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setRecTime(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setRecTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  const sendText = () => {
    if (!newMsg.trim()) return;
    console.log('[RIDER] Parcel request:', newMsg);
    setNewMsg('');
  };

  const formatTime = (s) => `0:${s.toString().padStart(2,'0')}`;

  return (
    <>
      {/* CHAT HISTORY */}
      <div className="p-4 space-y-3">
        <div className="bg-white border border-purple-100 p-3 rounded-xl rounded-tl-sm shadow-sm">
          <p className="text-xs font-bold text-[#3c0f6e]">🛵 Deliver Uganda Riders (5km)</p>
          <p className="text-xs text-gray-600 mt-1">
            Hello! You are connected to riders near you. Send a voice note with your pickup & drop-off location. We respond in ~2 mins.
          </p>
        </div>
      </div>

      {/* INPUT */}
      <div className="p-3 bg-white border-t border-[#f3e8ff]">
        {!recording? (
          <div className="flex items-center gap-2 bg-[#f9f5ff] border border-[#e9d5ff] rounded-full px-2 py-1.5">
            <input
              value={newMsg}
              onChange={e=>setNewMsg(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&sendText()}
              placeholder="Ex: Pick Kireka to Wandegeya..."
              className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none"
            />
            <button
              onMouseDown={() => setRecording(true)}
              onTouchStart={() => setRecording(true)}
              className="w-9 h-9 rounded-full bg-white text-[#3c0f6e] border border-purple-200 flex items-center justify-center hover:bg-[#3c0f6e] hover:text-white transition-all"
            >
              🎙️
            </button>
            <button onClick={sendText} className="w-9 h-9 rounded-full bg-[#3c0f6e] text-white flex items-center justify-center hover:bg-[#4c1f8e]">
              ➤
            </button>
          </div>
        ) : (
          // RECORDING MODE
          <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-full px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-red-600">Recording {formatTime(recTime)}</span>
              <span className="text-xs text-gray-400">— slide to cancel</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRecording(false)}
                className="w-8 h-8 rounded-full bg-white border text-xs">✕</button>
              <button
                onMouseUp={() => setRecording(false)}
                onTouchEnd={() => setRecording(false)}
                className="px-4 py-1.5 rounded-full bg-[#3c0f6e] text-white text-xs font-bold">
                Send
              </button>
            </div>
          </div>
        )}
        <p className="text-[10px] text-center text-gray-400 mt-2">📍 Your location will be shared with nearby riders</p>
      </div>
    </>
  );
}