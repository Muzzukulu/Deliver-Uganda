import { useState } from 'react';
import LiveChatEntrance from './LiveChatEntrance';
import RiderChatBox from './RiderChatBox';
import ManagementChatBox from './ManagementChatBox';

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(null); // null | 'riders' | 'management'

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setChatMode(null), 300);
  };

  // CLOSED - Bubble only
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3c0f6e] text-white flex items-center justify-center shadow-2xl hover:bg-[#4c1f8e] hover:scale-110 transition-all z-50"
        title="Chat with Deliver Uganda"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
    );
  }

  // OPEN
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-[#f3e8ff] overflow-hidden z-50 animate-in slide-in-from-bottom-2 flex flex-col h-[420px]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#3c0f6e] text-white shrink-0">
        <div>
          <p className="text-sm font-bold">Deliver Uganda</p>
          {chatMode && (
            <p className="text-[10px] text-purple-200">
              {chatMode === 'riders'? '🛵 Rider Network • 5km radius' : '🏢 Management & Support'}
            </p>
          )}
        </div>
        <button onClick={handleClose} className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">✕</button>
      </div>

      {/* BODY - THIS IS WHAT YOU ASKED FOR */}
      <div className="flex-1 bg-[#fcf9ff] overflow-y-auto flex flex-col">
        {!chatMode && (
          <div className="p-3 my-auto">
            <LiveChatEntrance
              onSelectRiders={() => setChatMode('riders')}
              onSelectManagement={() => setChatMode('management')}
            />
          </div>
        )}
        {chatMode === 'riders' && <RiderChatBox />}
        {chatMode === 'management' && <ManagementChatBox />}
      </div>

      {/* Back button only when inside a chat */}
      {chatMode && (
        <div className="bg-white px-3 pb-1">
          <button
            onClick={() => setChatMode(null)}
            className="text-[10px] text-gray-400 hover:text-[#3c0f6e] w-full text-center py-1"
          >
            ← Back to menu
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveChat;