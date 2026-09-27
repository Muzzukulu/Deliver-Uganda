// src/components/LiveChatEntrance.jsx - POLISHED NO-SCROLL
export default function LiveChatEntrance({ onSelectRiders, onSelectManagement }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 w-full max-w-[360px] border-t-[3px] border-purple-600">
      <div className="text-center mb-3.5">
        <h2 className="text-[15px] font-bold text-[#0f172a] leading-tight">Welcome to Deliver Uganda</h2>
        <p className="text-[11px] text-gray-500 mt-1 leading-snug">Who would you like to contact?</p>
      </div>

      <div className="space-y-2.5">
        {/* RIDER NETWORK - LIGHT GREY HOVER */}
        <button
          onClick={onSelectRiders}
          className="w-full text-left p-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start gap-2.5">
            <span className="text-[18px] leading-none">🛵</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[13px] text-[#0f172a] leading-tight">Our Rider Network</h3>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-[1.35]">
                I need to send a parcel. Connect me to available riders within my 5km area.
              </p>
              <span className="inline-block mt-1.5 text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                Voice + Text • Fastest
              </span>
            </div>
          </div>
        </button>

        {/* MANAGEMENT - LIGHT PURPLE/GREY HOVER */}
        <button
          onClick={onSelectManagement}
          className="w-full text-left p-3 rounded-xl border border-gray-200 bg-white hover:bg-[#f3f0ff] transition-colors"
        >
          <div className="flex items-start gap-2.5">
            <span className="text-[18px] leading-none">🏢</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[13px] text-[#0f172a] leading-tight">Management & Support</h3>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-[1.35]">
                For general inquiries, partnerships, or support.
              </p>
              <span className="inline-block mt-1.5 text-[9px] bg-[#f3f0ff] text-[#6d5bd0] px-2 py-0.5 rounded-full font-medium">
                Text Only
              </span>
            </div>
          </div>
        </button>
      </div>

      <p className="text-[9px] text-center text-gray-400 mt-3 leading-none">
        Tip: Only registered clients can send voice notes to riders.
      </p>
    </div>
  );
}