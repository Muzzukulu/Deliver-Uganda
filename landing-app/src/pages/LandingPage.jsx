import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import truck from '../images/truck.jpg'

export default function LandingPage() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) setShowNav(false);
      else setShowNav(true);
      setLastScroll(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <div className="w-full bg-[#faf7ff] font-['Poppins'] overflow-x-hidden">
      <nav className={`w-full h-[72px] bg-white flex items-center justify-between px-6 lg:px-12 shadow-sm fixed top-0 z-50 transition-transform duration-300 ${showNav? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="h-9 w-auto" />
          <span className="font-extrabold text-[18px] text-[#3C1F6B]">DELIVER UGANDA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-gray-700">
          <a href="#" className="hover:text-[#5B21B6]">Home</a>
          <a href="#why">Why Choose Us</a>
          <a href="#services">Services</a>
          <a href="#track">Track Parcel</a>
          <a href="#contact">Contact</a>
        </div>
        <button onClick={() => navigate('/login')} className="bg-[#3C0F6E] text-white px-7 py-2.5 rounded-full text-[13px] font-bold">Login</button>
      </nav>
      <div className="h-[72px]"></div>

      <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[460px]">
        <div className="bg-gradient-to-br from-[#4a1a7a] via-[#5e2ca5] to-[#8a5bd6] px-8 lg:px-14 py-16 flex flex-col justify-center">
          <h1 className="font-extrabold text-white text-[36px] lg:text-[44px] leading-[1.1]">Fast, Secure &<br/>Reliable Deliveries<br/>Across Uganda.</h1>
          <p className="text-white/90 text-[16px] mt-5 max-w-[460px] leading-[1.7]">Deliver Uganda provides seamless nationwide parcel movement using modern fleet technology and trusted professional couriers.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={() => navigate('/register')} className="bg-white text-[#3C1F6B] px-6 py-3 rounded-lg text-[14px] font-bold">Send a Parcel</button>
            <button className="border border-white text-white px-6 py-3 rounded-lg text-[14px] font-bold">Become a Driver</button>
          </div>
        </div>
        <div className="w-full h-[340px] lg:h-auto bg-gray-100">
          <img src={truck} alt="van" className="w-full h-full object-cover" />
        </div>
      </section>

      <section id="why" className="py-16 px-6 lg:px-12 bg-[#faf7ff]">
        <h2 className="font-bold text-[24px] text-center text-[#2D0F5A]">Why Choose Deliver Uganda</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto mt-12">
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">💰</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Affordable Rates</h4><p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Transparent, competitive pricing that delivers real value.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">👨‍✈️</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Professional Drivers</h4><p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Verified and trained drivers committed to safety.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center text-[12px] font-black text-[#5B21B6]">UG</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Nationwide Coverage</h4><p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Extensive delivery network reaching cities and towns.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">🎧</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">24/7 Support</h4><p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Always-available support teams providing timely assistance.</p></div>
        </div>
      </section>

      <section id="services" className="py-16 px-6 lg:px-12 bg-white">
        <h2 className="font-bold text-[24px] text-center text-[#2D0F5A]">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1200px] mx-auto mt-12">
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">⚡</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Same-Day Delivery</h4><p className="text-[11px] text-gray-500 mt-2">Quickly place a delivery request by entering pickup and destination.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">📦</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Business Parcel</h4><p className="text-[11px] text-gray-500 mt-2">Reliable parcel solutions for businesses.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">📍</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Real-Time Tracking</h4><p className="text-[11px] text-gray-500 mt-2">Track your parcel live with accurate updates.</p></div>
          <div className="text-center"><div className="w-[52px] h-[52px] bg-[#f3e8ff] rounded-full mx-auto flex items-center justify-center">🔒</div><h4 className="font-bold text-[13px] mt-4 text-[#2D0F5A]">Secure Handling</h4><p className="text-[11px] text-gray-500 mt-2">Secure procedures to ensure safety.</p></div>
        </div>
      </section>

      <section id="track" className="py-16 px-6 bg-[#FAF7FF] border-y border-[#ede6ff]">
        <h2 className="font-bold text-[24px] text-center text-[#3C1F6B]">Track Your Parcel</h2>
        <p className="text-center text-[13px] text-gray-500 mt-2">Enter your tracking code below to see current status and location.</p>
        <div className="max-w-[680px] mx-auto flex gap-3 mt-8">
          <input placeholder="Enter Tracking Code, e.g. DU123456789" className="flex-1 h-[48px] px-5 rounded-xl bg-white border-2 border-[#e9d5ff] text-[13px] outline-none" />
          <button className="bg-[#3d1560] text-white px-8 h-[48px] rounded-xl font-bold text-[14px]">Track</button>
        </div>
      </section>

      <section className="py-10 px-6 bg-[#3d1560]">
        <h2 className="font-bold text-[18px] text-center text-white">Get the Deliver Uganda App</h2>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-black text-white flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20">
            <span className="text-[22px]">▶</span><div className="leading-none text-left"><div className="text-[9px] uppercase">GET IT ON</div><div className="text-[13px] font-bold">Google Play</div></div></div>
          <div className="bg-black text-white flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20">
            <span className="text-[20px]"></span><div className="leading-none text-left"><div className="text-[9px]">Download on the</div><div className="text-[13px] font-bold">App Store</div></div></div>
        </div>
      </section>

      <footer className="bg-[#f3f0f7] px-6 py-5 flex justify-between items-center text-[13px]">
        <div className="font-extrabold text-[#3C1F6B]">DELIVER UGANDA<p className="font-normal text-[11px]">© 2025 Deliver Uganda. All rights reserved</p></div>
        <div className="font-medium text-[#3C1F6B] cursor-pointer">Terms and Conditions</div>
      </footer>

      <div className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#3c0f6e] text-white text-2xl flex items-center justify-center shadow-lg z-50">
        {showChat? <span onClick={()=>setShowChat(false)} className="cursor-pointer">✕</span> : <span onClick={()=>setShowChat(true)} className="cursor-pointer">🎧</span>}
      </div>

      {showChat && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[420px] bg-white rounded-[16px] shadow-2xl border border-gray-200 overflow-hidden flex flex-col z-50">
          <div className="h-[52px] bg-[#3C1F6B] flex items-center px-5 text-white font-bold text-[14px]">Deliver Uganda - Live Chat</div>
          <div className="flex-1 bg-white p-4 text-[12px] text-gray-400">Hello! How can we help you today? 🇺🇬</div>
          <div className="h-[72px] bg-[#f9f7ff] border-t p-3 flex items-center gap-2">
            <input placeholder="Type..." className="flex-1 h-[40px] bg-white rounded-full px-4 text-[13px] border border-gray-200 outline-none" />
            <button onClick={()=>setIsRecording(!isRecording)} className={`w-[40px] h-[40px] rounded-full border flex items-center justify-center ${isRecording? 'bg-red-500 border-red-500 animate-pulse' : 'bg-white border-gray-200'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill={isRecording? 'white' : '#3C1F6B'}/><path d="M19 10v1a7 7 0 0 1-14 0v-1" stroke={isRecording? 'white' : '#3C1F6B'} strokeWidth="1.6" fill="none" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="21" stroke={isRecording? 'white' : '#3C1F6B'} strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button>
            <button className="px-6 h-[38px] bg-[#3C1F6B] text-white rounded-full text-[13px] font-bold">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}