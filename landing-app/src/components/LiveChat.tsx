// src/components/LiveChat.tsx - PRO RESPONSIVE 560px TALL - FIXED WIDTH
import { useState } from 'react';
import LiveChatEntrance from './LiveChatEntrance.tsx';
import TransporterChatBox from './TransporterChatBox.tsx';
import ManagementChatBox from './ManagementChatBox.tsx';

type View = 'entrance' | 'transporter' | 'management';

export default function LiveChat() {
  const [view, setView] = useState<View>('entrance');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button - toggles to X */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#3c0f6e] text-white shadow-2xl flex items-center justify-center z-[60] hover:bg-[#4c1f8e] transition-all"
      >
        {isOpen? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

       {/* Chat Window - PERFECT MOBILE WIDTH FIX - NO OVERFLOW */}
      {isOpen && (
        <div className="
          fixed bottom-[88px] left-2 right-2
          sm:left-auto sm:right-5
          w-auto sm:w-[380px] max-w-[calc(100vw-16px)] sm:max-w-[380px]
          h-[70vh] sm:h-[560px] max-h-[560px]
          bg-white rounded-2xl shadow-2xl border border-gray-100
          flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-2
          box-border
        ">
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