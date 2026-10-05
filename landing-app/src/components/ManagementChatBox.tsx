// src/components/ManagementChatBox.tsx - SHOPIFY FULLSCREEN FINAL
import { useState } from 'react';

export default function ManagementChatBox({ onBack, onClose }: { onBack?: () => void; onClose?: () => void }) {
  const [messages, setMessages] = useState([
    { from: 'management', text: 'Welcome to Deliver Uganda Management. How can we help you today?', time: 'Now' }
  ]);
  const [text, setText] = useState("");

  const quickReplies = ['💰 Pricing & Rates', '🤝 Partnership', '📦 Complaint / Issue', '📄 General Inquiry'];

  const sendText = (t: string) => {
    if (!t.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: t, time: 'Now' }]);
    setText("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'management',
        text: `Thanks! Your request about "${t}" is received. Team will reply within 30 mins.`,
        time: 'Now'
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* SHOPIFY HEADER - Like screenshot with X */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0 bg-white">
        <div className="flex items-center gap-2">
          {onBack && <button onClick={onBack} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">←</button>}
          <div>
            <p className="text-[13px] font-bold leading-tight">Management & Support</p>
            <p className="text-[11px] text-gray-500 leading-none mt-0.5">Online • Avg reply 30 mins</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-[#fafafa]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user'? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-[12.5px] leading-[1.35] shadow-sm break-words
              ${m.from === 'user'? 'bg-[#3c0f6e] text-white rounded-br-sm' : 'bg-white border border-gray-200 text-[#0f172a] rounded-tl-sm'}`}>
              <p>{m.text}</p>
              <p className={`text-[9px] mt-1 ${m.from === 'user'? 'text-purple-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {quickReplies.map((q) => (
              <button key={q} onClick={() => sendText(q)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#3c0f6e] hover:bg-[#f3f0ff] font-medium">
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SHOPIFY INPUT - Bottom bar like screenshot "Work with Sidekick" */}
      <div className="p-3 bg-white border-t border-gray-100 shrink-0 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="relative flex items-center">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText(text)}
            placeholder="Type your inquiry..."
            className="w-full h-[46px] rounded-full bg-white border border-gray-200 pl-4 pr-12 text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm"
          />
          <button onClick={() => sendText(text)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-[38px] h-[38px] rounded-full bg-[#3c0f6e] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}