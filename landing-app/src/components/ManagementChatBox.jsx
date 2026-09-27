// src/components/ManagementChatBox.jsx - POLISHED NO-SCROLL
import { useState } from 'react';

export default function ManagementChatBox() {
  const [newMsg, setNewMsg] = useState('');
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

  const sendText = (textOverride = null) => {
    const text = textOverride || newMsg;
    if (!text.trim()) return;
    setMessages([...messages, { from: 'user', text, time: 'Now' }]);
    setNewMsg('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'management',
        text: `Thanks! Your request about "${text}" is received. Team will reply within 30 mins.`,
        time: 'Now'
      }]);
    }, 800);
  };

  return (
    <>
      {/* Chat History - COMPACT NO SCROLL */}
      <div className="p-2.5 space-y-2 h-[280px] overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user'? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-2.5 py-2 rounded-2xl text-[12px] leading-[1.35] shadow-sm
              ${m.from === 'user'
              ? 'bg-[#3c0f6e] text-white rounded-br-sm'
                : 'bg-white border border-gray-200 text-[#0f172a] rounded-tl-sm'
              }`}>
              <p className="leading-[1.35]">{m.text}</p>
              <p className={`text-[8px] mt-0.5 leading-none ${m.from === 'user'? 'text-purple-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {/* Quick Replies - LIGHT PURPLE/GREY HOVER */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendText(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[#3c0f6e] hover:bg-[#f3f0ff] hover:border-[#e9d5ff] hover:text-[#3c0f6e] transition-colors leading-tight"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input - COMPACT */}
      <div className="p-2.5 bg-white shrink-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-2 py-1 focus-within:bg-white focus-within:border-purple-200 focus-within:ring-1 focus-within:ring-purple-100 transition-all">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder="Type your inquiry..."
            className="flex-1 bg-transparent px-2.5 py-1 text-[13px] leading-tight outline-none placeholder-gray-400"
          />
          <button
            onClick={() => sendText()}
            className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 hover:bg-black transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1.5 leading-none">
          Avg response: 30 mins • Mon-Sat 8am-8pm
        </p>
      </div>
    </>
  );
}