// src/components/LiveChat.tsx - OLD GITHUB ICON RESTORED
import { useState } from 'react';
import LiveChatEntrance from './LiveChatEntrance';
import TransporterChatBox from './TransporterChatBox';
import ManagementChatBox from './ManagementChatBox';

type View = 'entrance' | 'transporter' | 'management';

export default function LiveChat() {
  const [view, setView] = useState<View>('entrance');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
            {/* Floating Button - BEAUTIFUL OLD OUTLINE ICON RESTORED */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#3c0f6e] text-white shadow-2xl flex items-center justify-center z-50 hover:bg-[#4c1f8e] transition-colors"
      >
        {/* The beautiful outline bubble from GitHub */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Window - 560px TALL */}
      {isOpen && (
        <div className="fixed bottom-[90px] right-5 w-[360px] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-2">
          {view === 'entrance' && (
            <LiveChatEntrance
              onSelectTransporters={() => setView('transporter')}
              onSelectManagement={() => setView('management')}
            />
          )}
          {view === 'transporter' && (
            <TransporterChatBox onBack={() => setView('entrance')} />
          )}
          {view === 'management' && (
            <ManagementChatBox onBack={() => setView('entrance')} />
          )}
        </div>
      )}
    </>
  );
}