// src/components/LiveChat.tsx - SHOPIFY FULLSCREEN - COPY THIS
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#3c0f6e] text-white shadow-2xl flex items-center justify-center z-[60] hover:bg-[#4c1f8e]"
      >
        {isOpen? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed z-50 bg-white flex flex-col overflow-hidden inset-0 w-full h-[100dvh] rounded-none sm:inset-auto sm:bottom-[88px] sm:right-5 sm:w-[380px] sm:h-[560px] sm:rounded-2xl sm:border sm:shadow-2xl">
          {view === 'entrance' && <LiveChatEntrance onSelectTransporters={() => setView('transporter')} onSelectManagement={() => setView('management')} />}
          {view === 'transporter' && <TransporterChatBox onBack={() => setView('entrance')} onClose={() => setIsOpen(false)} />}
          {view === 'management' && <ManagementChatBox onBack={() => setView('entrance')} onClose={() => setIsOpen(false)} />}
        </div>
      )}
    </>
  );
}