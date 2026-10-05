// src/components/LiveChatEntrance.tsx - SHOPIFY CLEAN LIKE SCREENSHOT
export default function LiveChatEntrance({ onSelectTransporters, onSelectManagement }: {
  onSelectTransporters: () => void;
  onSelectManagement: () => void;
}) {
  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* HEADER - Like Shopify "New conversation" */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <button className="text-[13px] font-semibold text-gray-700 flex items-center gap-1">
          New conversation <span className="text-[10px]">▼</span>
        </button>
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-[16px]">⚙</span>
        </div>
      </div>

      {/* CENTER - Like Shopify "Where should we begin?" */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-[340px]">
          <div className="text-center mb-8">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#3c0f6e] flex items-center justify-center text-white text-[18px]">🇺🇬</div>
            <h2 className="text-[18px] font-bold text-[#0f172a]">Welcome to Deliver Uganda</h2>
            <p className="text-[13.5px] text-gray-500 mt-1.5">Where should we begin?</p>
          </div>

          <div className="space-y-3">
            {/* TRANSPORTER */}
            <button
              onClick={onSelectTransporters}
              className="w-full text-left p-4 rounded-[14px] border border-gray-200 hover:border-[#3c0f6e] hover:bg-[#faf8ff] transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-[20px]">🚚</span>
                <div className="flex-1">
                  <h3 className="font-bold text-[15px] text-[#0f172a] group-hover:text-[#3c0f6e]">Our Transporter Network</h3>
                  <p className="text-[12.5px] text-gray-500 mt-1 leading-[1.5]">
                    I need to send a parcel. Connect to transporters within 5km.
                  </p>
                </div>
              </div>
            </button>

            {/* MANAGEMENT */}
            <button
              onClick={onSelectManagement}
              className="w-full text-left p-4 rounded-[14px] border border-gray-200 hover:border-[#3c0f6e] hover:bg-[#faf8ff] transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-[20px]">🏢</span>
                <div className="flex-1">
                  <h3 className="font-bold text-[15px] text-[#0f172a] group-hover:text-[#3c0f6e]">Management & Support</h3>
                  <p className="text-[12.5px] text-gray-500 mt-1 leading-[1.5]">
                    General inquiries, partnerships, or support.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-8">
            Tip: Only registered clients can send voice notes
          </p>
        </div>
      </div>

      {/* FOOTER INPUT FAKE - Like Shopify "Work with Sidekick" to show it's chat */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <div className="w-full bg-gray-100 rounded-full px-4 py-3 text-[13px] text-gray-400 text-center">
          Select an option to start
        </div>
      </div>
    </div>
  );
}