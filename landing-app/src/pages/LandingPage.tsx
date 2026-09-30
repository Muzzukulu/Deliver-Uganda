import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import truck from '../images/truck.jpg'

export default function LandingPage() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [trackCode, setTrackCode] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackError, setTrackError] = useState("");

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

  const handleTrack = () => {
    setTrackError("");
    setTrackResult(null);
    const code = trackCode.trim().toUpperCase();
    if (!code) {
      setTrackError("Please enter tracking code, e.g. DU123456789");
      return;
    }
    if (code.startsWith("DU")) {
      setTrackResult({
        code: code,
        status: "In Transit",
        from: "Kampala Hub",
        to: "Mbarara",
        update: "Left Kampala Hub - Arriving today 4:00 PM",
      });
    } else {
      setTrackError(`No parcel found with code ${code}. Try DU123456789 for demo.`);
    }
  };

  const whyChoose = [
    { img: "/images/affordable.jpg", title: "Affordable Rates", desc: "Transparent pricing, no hidden fees. Pay for distance & weight only, with real value." },
    { img: "/images/transporter.jpg", title: "Professional Transporters", desc: "Verified NIN, licensed, trained and rated. Your parcel is safe with us." },
    { img: "/images/uganda-map.jpg", title: "Nationwide Coverage", desc: "From Arua to Kabale, Mbale to Mbarara. We reach cities and towns daily." },
    { img: "/images/247.jpg", title: "24/7 Support", desc: "Always on WhatsApp, call, and live chat. Human help, not robots." },
  ];

  const services = [
    { img: "/images/same-day.jpg", title: "Same-Day Delivery", desc: "Kampala, Wakiso, Entebbe in under 3 hours. Order before 3PM." },
    { img: "/images/business.jpg", title: "Business Parcel", desc: "For shops & SMEs — COD, bulk discounts, and free returns handling." },
    { img: "/images/tracking.jpg", title: "Real-Time Tracking", desc: "Track live on map with SMS updates at every hub. No guessing." },
    { img: "/images/secure.jpg", title: "Secure Handling", desc: "Tamper-proof bags, insurance option, and signature on delivery." },
  ];

  return (
    <div className="w-full bg-[#faf7ff] font-['Poppins'] overflow-x-hidden">
      {/* NAV */}
      <nav className={`w-full h-[72px] bg-white flex items-center justify-between px-6 lg:px-12 shadow-sm fixed top-0 z-50 transition-transform duration-300 ${showNav? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="h-9 w-auto" />
          <span className="font-extrabold text-[18px] text-[#3C1F6B]">DELIVER UGANDA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-gray-700">
          <a href="#" className="hover:text-[#5B21B6]">Home</a>
          <a href="#why" className="hover:text-[#5B21B6]">Why Choose Us</a>
          <a href="#about" className="hover:text-[#5B21B6]">About Us</a>
          <a href="#services" className="hover:text-[#5B21B6]">Services</a>
          <a href="#coverage" className="hover:text-[#5B21B6]">Coverage</a>
          <a href="#track" className="hover:text-[#5B21B6]">Track Parcel</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/login')} className="bg-[#3C0F6E] text-white px-7 py-2.5 rounded-full text-[13px] font-bold">Login</button>
          <button onClick={()=>setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 rounded-full bg-[#f3efff] flex items-center justify-center text-[#3C0F6E] font-bold text-[20px]">
            {mobileOpen? "✕" : "☰"}
          </button>
        </div>
      </nav>
      <div className="h-[72px]"></div>

      {mobileOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full bg-white border-t border-[#ede6ff] px-6 py-6 flex flex-col gap-5 text-[15px] font-medium text-[#2D0F5A] z-40 shadow-lg">
          <a onClick={()=>setMobileOpen(false)} href="#">Home</a>
          <a onClick={()=>setMobileOpen(false)} href="#why">Why Choose Us</a>
          <a onClick={()=>setMobileOpen(false)} href="#about">About Us</a>
          <a onClick={()=>setMobileOpen(false)} href="#services">Our Services</a>
          <a onClick={()=>setMobileOpen(false)} href="#coverage">Coverage Areas</a>
          <a onClick={()=>setMobileOpen(false)} href="#track">Track Parcel</a>
          <a onClick={()=>setMobileOpen(false)} href="#contact">Contact</a>
          <button onClick={()=>{setMobileOpen(false); navigate('/register')}} className="bg-[#3C0F6E] text-white py-3 rounded-full font-bold">Send a Parcel</button>
        </div>
      )}

      <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[460px]">
        <div className="bg-gradient-to-br from-[#4a1a7a] via-[#5e2ca5] to-[#8a5bd6] px-8 lg:px-14 py-16 flex flex-col justify-center">
          <h1 className="font-extrabold text-white text-[36px] lg:text-[44px] leading-[1.1]">Fast, Secure &<br/>Reliable Deliveries<br/>Across Uganda.</h1>
          <p className="text-white/90 text-[16px] mt-5 max-w-[460px] leading-[1.7]">Deliver Uganda provides seamless nationwide parcel movement using modern fleet technology and trusted professional couriers. From Kampala to your village — same day.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={() => navigate('/register')} className="bg-white text-[#3C1F6B] px-6 py-3 rounded-lg text-[14px] font-bold">Send a Parcel</button>
            <button onClick={() => navigate('/transport/register')} className="border border-white text-white px-6 py-3 rounded-lg text-[14px] font-bold">Become a Transporter</button>
          </div>
        </div>
        <div className="w-full h-[340px] lg:h-auto bg-gray-100">
          <img src={truck} alt="van" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* WHY CHOOSE - WITH BIG IMAGES */}
      <section id="why" className="py-16 px-6 lg:px-12 bg-[#faf7ff]">
        <h2 className="font-black text-[26px] text-center text-[#2D0F5A]">Why Choose Deliver Uganda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto mt-12">
          {whyChoose.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-[#ede6ff] overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <img src={item.img} alt={item.title} className="w-full h-[160px] object-cover" />
              <div className="p-5 text-center">
                <h4 className="font-bold text-[14px] text-[#2D0F5A]">{item.title}</h4>
                <p className="text-[11.5px] text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-16 px-6 lg:px-12 bg-white border-y border-[#ede6ff]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-bold text-[24px] text-center text-[#2D0F5A]">About Us</h2>
          <div className="mt-8 bg-[#faf7ff] border border-[#ede6ff] rounded-2xl p-6 lg:p-10">
            <p className="text-[14px] text-gray-700 leading-[1.8]">
              <span className="font-bold text-[#3C1F6B]">Deliver Uganda</span> is a homegrown logistics powerhouse built to connect every corner of Uganda — from Kampala to Arua, Mbarara to Mbale. We were born from a simple frustration: parcels delayed, overpriced, and untraceable. So we built a smarter fleet, trained professional transporters and drivers, and powered everything with real-time technology that gives you control.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mt-5">
              We serve everyday Ugandans, SMEs, and big businesses with same-day delivery, secure handling, and nationwide coverage that actually reaches your village. Every parcel is tracked live, every transporter is verified, and every delivery is handled as if it were our own. No stories, just results.
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.8] mt-5">
              Our mission is to be Uganda's most trusted delivery backbone — affordable, fast, and reliable 24/7. When you send with Deliver Uganda, you send with Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* OUR SERVICES - WITH BIG IMAGES */}
      <section id="services" className="py-16 px-6 lg:px-12 bg-[#faf7ff]">
        <h2 className="font-bold text-[24px] text-center text-[#2D0F5A]">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto mt-12">
          {services.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-[#ede6ff] overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="w-full h-[110px] bg-white flex items-center justify-center p-4">
                <img src={item.img} alt={item.title} className="h-[90px] w-auto object-contain" />
              </div>
              <div className="p-5 text-center border-t border-[#f3efff]">
                <h4 className="font-bold text-[13px] text-[#2D0F5A]">{item.title}</h4>
                <p className="text-[11.5px] text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="coverage" className="py-16 px-6 lg:px-12 bg-white border-y border-[#ede6ff]">
        <h2 className="font-bold text-[24px] text-center text-[#2D0F5A]">We Cover All Uganda</h2>
        <p className="text-center text-[13px] text-gray-500 mt-2 max-w-[600px] mx-auto">Daily departures from Kampala to all regions. Your village is our route.</p>
        <div className="max-w-[900px] mx-auto mt-8 flex flex-wrap justify-center gap-3">
          {["Kampala","Wakiso","Entebbe","Mukono","Jinja","Iganga","Mbale","Soroti","Lira","Gulu","Arua","Hoima","Fort Portal","Mbarara","Kabale","Masaka"].map(town=>(
            <span key={town} className="bg-[#f3efff] border border-[#e9d5ff] text-[#3C1F6B] text-[12px] font-bold px-4 py-2 rounded-full">{town}</span>
          ))}
        </div>
      </section>

      <section id="track" className="py-16 px-6 bg-[#FAF7FF] border-y border-[#ede6ff]">
        <h2 className="font-bold text-[24px] text-center text-[#3C1F6B]">Track Your Parcel</h2>
        <p className="text-center text-[13px] text-gray-500 mt-2">Enter your tracking code below to see current status and location.</p>
        <div className="max-w-[680px] mx-auto flex flex-col sm:flex-row gap-3 mt-8">
          <input value={trackCode} onChange={(e)=>setTrackCode(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && handleTrack()} placeholder="Enter Tracking Code, e.g. DU123456789" className="flex-1 h-[48px] px-5 rounded-xl bg-white border-2 border-[#e9d5ff] text-[13px] outline-none focus:border-[#3d1560]" />
          <button onClick={handleTrack} className="bg-[#3d1560] text-white px-8 h-[48px] rounded-xl font-bold text-[14px] hover:bg-[#2d0f47] w-full sm:w-auto">Track</button>
        </div>
        {trackError && <div className="max-w-[680px] mx-auto mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px] text-center">{trackError}</div>}
        {trackResult && (
          <div className="max-w-[680px] mx-auto mt-6 bg-white border-2 border-[#e9d5ff] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center"><h3 className="font-bold text-[#3C1F6B] text-[15px]">{trackResult.code}</h3><span className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full">{trackResult.status}</span></div>
            <div className="mt-4 flex items-center gap-2 text-[13px] text-gray-600"><span>{trackResult.from}</span><span>→</span><span className="font-bold text-[#3C1F6B]">{trackResult.to}</span></div>
            <p className="mt-3 text-[12px] text-gray-500">{trackResult.update}</p>
            <div className="mt-4 h-[4px] w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-[70%] bg-[#3d1560] rounded-full"></div></div>
          </div>
        )}
      </section>

      <section className="py-10 px-6 bg-[#3d1560]">
        <h2 className="font-bold text-[18px] text-center text-white">Get the Deliver Uganda App</h2>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-black text-white flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20"><span className="text-[22px]">▶</span><div className="leading-none text-left"><div className="text-[9px] uppercase">GET IT ON</div><div className="text-[13px] font-bold">Google Play</div></div></div>
          <div className="bg-black text-white flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20"><svg viewBox="0 0 384 512" className="w-[18px] h-[22px] fill-white shrink-0"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-159.6-26.2-12.8-26.2-62.9 0-75.7zM248.8 90.3c23-27.2 31.8-62.4 30.4-94.8-30.4 2.8-66.3 21.2-86.8 47.8-17.8 22.2-28.8 53.8-23.8 84.8 31.8 2.8 64.8-18.2 80.2-37.8z"/></svg><div className="leading-none text-left"><div className="text-[9px]">Download on the</div><div className="text-[13px] font-bold">App Store</div></div></div>
        </div>
      </section>

      <footer id="contact" className="bg-[#f3f0f7] px-6 py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-extrabold text-[#3C1F6B] text-center md:text-left">DELIVER UGANDA<p className="font-normal text-[11px] mt-1">© 2026 Deliver Uganda. All rights reserved • +256 700 000 000 • support@deliver.ug</p></div>
          <div className="font-medium text-[#3C1F6B] cursor-pointer text-[13px]">Terms and Conditions</div>
        </div>
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
            <button onClick={()=>setIsRecording(!isRecording)} className={`w-[40px] h-[40px] rounded-full border flex items-center justify-center ${isRecording? 'bg-red-500 border-red-500 animate-pulse' : 'bg-white border-gray-200'}`}><svg width="20" height="20" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill={isRecording? 'white' : '#3C1F6B'}/><path d="M19 10v1a7 7 0 0 1-14 0v-1" stroke={isRecording? 'white' : '#3C1F6B'} strokeWidth="1.6" fill="none" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="21" stroke={isRecording? 'white' : '#3C1F6B'} strokeWidth="1.6" strokeLinecap="round"/></svg></button>
            <button className="px-6 h-[38px] bg-[#3C1F6B] text-white rounded-full text-[13px] font-bold">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}