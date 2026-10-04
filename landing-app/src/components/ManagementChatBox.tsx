// src/components/ManagementChatBox.jsx - TALL + TEXT ONLY + CAPSULE - FIXED ALIGNED
import { useState } from 'react';
import ChatInputCapsule from './ChatInputCapsule';

export default function ManagementChatBox({ onBack }) {
  const [messages, setMessages] = useState([
    {
      from: 'management',
      text: 'Welcome to Deliver Uganda Management. How can we help you today?',
      time: 'Now'
    }
  ]);

  const quickReplies = [
    '💰 Pricing & Rates',
    '🤝 Partnership',
    '📦 Complaint / Issue',
    '📄 General Inquiry'
  ];

  const sendText = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text, time: 'Now' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'management',
        text: `Thanks! Your request about "${text}" is received. Team will reply within 30 mins.`,
        time: 'Now'
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full flex-1 w-full max-w-full box-border overflow-hidden">
      {/* Header - Fixed width */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-100 shrink-0 w-full max-w-full box-border">
        {onBack && <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full text-[13px] shrink-0">←</button>}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-tight truncate">Management & Support</p>
          <p className="text-[11px] text-gray-500 leading-snug truncate">Online • Avg reply 30 mins</p>
        </div>
      </div>

      {/* Chat History - Now 100% aligned */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 bg-gray-50/50 w-full max-w-full box-border">
        {messages.map((m, i) => (
          <div key={i} className={`flex w-full max-w-full ${m.from === 'user'? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] sm:max-w-[85%] px-3 py-2.5 rounded-2xl text-[12px] leading-[1.35] shadow-sm break-words box-border
              ${m.from === 'user'
              ? 'bg-[#3c0f6e] text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-[#0f172a] rounded-tl-sm'
              }`}>
              <p className="leading-[1.35] break-words">{m.text}</p>
              <p className={`text-[8px] mt-1 leading-none ${m.from === 'user'? 'text-purple-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 mt-3 w-full max-w-full">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendText(q)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#3c0f6e] hover:bg-[#f3f0ff] hover:border-[#e9d5ff] transition-colors font-medium max-w-full truncate"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* USE THE PRO CAPSULE - TEXT ONLY - Already fixed */}
      <div className="w-full max-w-full box-border overflow-hidden shrink-0">
        <ChatInputCapsule
          voiceEnabled={false}
          placeholder="Type your inquiry..."
          onSendText={sendText}
        />
      </div>
    </div>
  );
}