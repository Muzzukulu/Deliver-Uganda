import { useState } from 'react';

export default function LiveChatEntrance({ onSelectRiders, onSelectManagement }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border-t-4 border-purple-600">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#0f172a]">Welcome to Deliver Uganda</h2>
        <p className="text-sm text-gray-500 mt-2">Who would you like to contact?</p>
      </div>

      <div className="space-y-4">
        {/* RIDER NETWORK */}
        <button
          onClick={onSelectRiders}
          className="w-full text-left p-4 rounded-xl border-2 border-purple-600 bg-purple-50 hover:bg-purple-600 group transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛵</span>
            <div>
              <h3 className="font-bold text-[#0f172a] group-hover:text-white">Our Rider Network</h3>
              <p className="text-xs text-gray-600 group-hover:text-purple-100 mt-1 leading-relaxed">
                I need to send a parcel. Connect me to available riders within my 5km area.
              </p>
              <span className="inline-block mt-2 text-[10px] bg-white text-purple-700 px-2 py-1 rounded-full font-semibold group-hover:bg-[#0f172a] group-hover:text-white">
                Voice + Text • Fastest
              </span>
            </div>
          </div>
        </button>

        {/* MANAGEMENT */}
        <button
          onClick={onSelectManagement}
          className="w-full text-left p-4 rounded-xl border border-slate-200 bg-white hover:bg-[#0f172a] group transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <h3 className="font-bold text-[#0f172a] group-hover:text-white">Management & Support</h3>
              <p className="text-xs text-gray-500 group-hover:text-slate-300 mt-1 leading-relaxed">
                For general inquiries, partnerships, or support.
              </p>
              <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold group-hover:bg-white group-hover:text-[#0f172a]">
                Text Only
              </span>
            </div>
          </div>
        </button>
      </div>

      <p className="text-[10px] text-center text-gray-400 mt-5">
        Tip: Only registered clients can send voice notes to riders.
      </p>
    </div>
  );
}