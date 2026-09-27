import { useState } from 'react';

export default function ManagementChatBox() {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'management',
      text: 'Welcome to Deliver Uganda Management. How can we help you today? Please select a topic or type your inquiry below.',
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

    // Simulate auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'management',
        text: `Thank you! Your request about "${text}" has been received. Our team will respond within 30 minutes. For urgent matters, call +256 XXX XXX XXX.`,
        time: 'Now'
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat History */}
      <div className="p-4 space-y-3 h-full overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user'? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm
              ${m.from === 'user'
               ? 'bg-[#3c0f6e] text-white rounded-br-sm'
                : 'bg-white border border-purple-100 text-[#0f172a] rounded-tl-sm'
              }`}>
              <p>{m.text}</p>
              <p className={`text-[9px] mt-1 ${m.from === 'user'? 'text-purple-200' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}

        {/* Quick Replies - Only show at start */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendText(q)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-[#e9d5ff] text-[#3c0f6e] hover:bg-[#3c0f6e] hover:text-white hover:border-[#3c0f6e] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input - Text Only */}
      <div className="p-3 bg-white shrink-0 border-t border-[#f3e8ff]">
        <div className="flex items-center gap-2 bg-[#f9f5ff] border border-[#e9d5ff] rounded-full px-2 py-1.5 focus-within:border-[#c084fc] focus-within:ring-1 focus-within:ring-[#e9d5ff] transition-all">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendText()}
            placeholder="Type your inquiry..."
            className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder-gray-400"
          />
          <button
            onClick={() => sendText()}
            className="w-9 h-9 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 hover:bg-[#3c0f6e] hover:scale-105 transition-all shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          🕒 Avg response time: 30 mins • Mon-Sat 8am-8pm
        </p>
      </div>
    </>
  );
}