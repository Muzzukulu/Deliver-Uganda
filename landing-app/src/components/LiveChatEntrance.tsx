// src/components/LiveChatEntrance.tsx - BIGGER FONTS + FILLS HEIGHT
export default function LiveChatEntrance({ onSelectTransporters, onSelectManagement }: {
  onSelectTransporters: () => void;
  onSelectManagement: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] border-t-[3px] border-purple-600 flex flex-col justify-center h-full p-7">
      <div className="text-center mb-7">
        <h2 className="text-[19px] font-bold text-[#0f172a] leading-tight">Welcome to Deliver Uganda</h2>
        <p className="text-[14px] text-gray-500 mt-2.5 leading-snug">Who would you like to contact?</p>
      </div>

      <div className="space-y-4">
        {/* TRANSPORTER NETWORK */}
        <button
          onClick={onSelectTransporters}
          className="w-full text-left p-4.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start gap-3.5">
            <span className="text-[22px] leading-none">🚚</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[16px] text-[#0f172a] leading-tight">Our Transporter Network</h3>
              <p className="text-[13.5px] text-gray-600 mt-1.5 leading-[1.5]">
                I need to send a parcel. Connect me to available transporters within my 5km area.
              </p>
              <span className="inline-block mt-3 text-[11px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                Voice + Text • Fastest
              </span>
            </div>
          </div>
        </button>

        {/* MANAGEMENT */}
        <button
          onClick={onSelectManagement}
          className="w-full text-left p-4.5 rounded-xl border border-gray-200 bg-white hover:bg-[#f3f0ff] transition-colors"
        >
          <div className="flex items-start gap-3.5">
            <span className="text-[22px] leading-none">🏢</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[16px] text-[#0f172a] leading-tight">Management & Support</h3>
              <p className="text-[13.5px] text-gray-600 mt-1.5 leading-[1.5]">
                For general inquiries, partnerships, or support.
              </p>
              <span className="inline-block mt-3 text-[11px] bg-[#f3f0ff] text-[#6d5bd0] px-3 py-1 rounded-full font-medium">
                Text Only
              </span>
            </div>
          </div>
        </button>
      </div>

      <p className="text-[11.5px] text-center text-gray-500 mt-7 leading-snug">
        Tip: Only registered clients can send voice notes to transporters.
      </p>
    </div>
  );
}