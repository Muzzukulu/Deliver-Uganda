return (
    <div className="p-2.5 sm:p-3 bg-white border-t border-[#f3e8ff] shrink-0 relative w-full max-w-full box-border overflow-hidden">

      {/* Slide hint - adjusted */}
      {isRecording &&!locked && slideY > 0 && (
        <div className="absolute bottom-[62px] right-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-lg flex items-center gap-2 z-10"
             style={{ transform: `translateY(${-slideY*0.5}px)`, opacity: Math.min(1, slideY/30) }}>
          <span>🔒</span><span className="text-[11px] font-medium">Slide up to lock</span>
        </div>
      )}

      {/* Locked bar */}
      {locked && isRecording && (
        <div className="mb-2.5 flex items-center justify-between bg-[#f3f0ff] rounded-full px-3 py-2 w-full max-w-full box-border">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${paused? 'bg-gray-400' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-[13px] font-mono font-bold">{fmt(elapsed)}</span>
            <span className="text-[10px] text-gray-500">{paused? 'Paused' : 'Recording'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={togglePause} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shrink-0">{paused? '▶️' : '⏸️'}</button>
            <button onClick={cancelRec} className="w-8 h-8 rounded-full bg-white border text-red-500 flex items-center justify-center shrink-0">✕</button>
            <button onClick={stopAndSend} className="h-8 px-3.5 rounded-full bg-[#3c0f6e] text-white text-[11px] font-bold shrink-0">SEND</button>
          </div>
        </div>
      )}

      <div className="relative flex items-center w-full max-w-full">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={e=>e.key==='Enter' && handleSendText()}
          placeholder={isRecording? (locked? 'Locked • Tap SEND' : `🔴 ${fmt(elapsed)}`) : placeholder}
          disabled={isRecording && locked}
          className="w-full max-w-full h-[46px] rounded-full bg-white border border-[#e9d5ff] pl-4 pr-[84px] text-[13px] outline-none focus:border-[#3c0f6e] shadow-sm placeholder-gray-400 disabled:bg-gray-50 box-border"
        />
        {/* Send */}
        <button onClick={handleSendText} className="absolute right-[44px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#3c0f6e] shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>

        {/* MAGIC MIC - Now inside bounds */}
        {voiceEnabled? (
          <button
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
            onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            onClick={() => { if(isRecording &&!locked) stopAndSend(); }}
            className={`absolute right-1 top-1/2 -translate-y-1/2 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all touch-none select-none shrink-0 ${isRecording? 'bg-red-500 animate-pulse scale-105' : 'bg-[#3c0f6e] hover:bg-[#4c1f8e]'}`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </button>
        ) : (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-[38px] h-[38px] rounded-full bg-gray-200 flex items-center justify-center opacity-50 shrink-0">🔇</div>
        )}
      </div>

      <p className="text-[9px] text-center text-gray-400 mt-1.5 truncate">
        {isRecording? (locked? '🔒 Locked • Pause / Send' : '⬆️ Slide up to lock') : voiceEnabled? 'Within 5km • Hold mic & slide to lock' : 'Text only • Management'}
      </p>
    </div>
  );