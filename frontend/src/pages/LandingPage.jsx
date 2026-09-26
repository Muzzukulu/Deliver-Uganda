import truckImg from '../images/truck.jpg'
import logo from '../images/logo.png'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#faf7ff] font-['Nunito'] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="w-full h-[72px] bg-white flex items-center justify-between px-6 lg:px-12 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <span className="font-['Poppins'] font-extrabold text-[19px] text-[#2d1654] tracking-wide">DELIVER UGANDA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#3a2a5a]">
          <a href="#" className="hover:text-[#6c3ce0]">Home</a>
          <a href="#why" className="hover:text-[#6c3ce0]">Why Choose Us</a>
          <a href="#services" className="hover:text-[#6c3ce0]">Services</a>
          <a href="#track" className="hover:text-[#6c3ce0]">Track Parcel</a>
          <a href="#contact" className="hover:text-[#6c3ce0]">Contact</a>
        </div>
        <button onClick={() => navigate('/login')} className="bg-[#3d2468] text-white px-7 py-2.5 rounded-[10px] text-[14px] font-bold hover:bg-[#2d1654] shadow-md cursor-pointer active:scale-95 transition">Login</button>
      </nav>

      {/* HERO */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[460px]">
        <div className="bg-gradient-to-br from-[#4a1a7a] via-[#5e2ca5] to-[#8a5bd6] px-8 lg:px-14 py-16 flex flex-col justify-center">
          <h1 className="font-['Poppins'] font-extrabold text-white text-[36px] lg:text-[44px] leading-[1.1]">Fast, Secure & Reliable<br/>Deliveries Across<br/>Uganda.</h1>
          <p className="text-white/90 text-[16px] mt-5 max-w-[460px] leading-[1.7]">Deliver Uganda provides seamless nationwide parcel movement using modern fleet technology and trusted professional couriers.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={() => navigate('/register')} className="bg-white text-[#2d1654] px-7 py-3 rounded-[10px] text-[15px] font-bold shadow-lg hover:bg-gray-50 cursor-pointer">Send a Parcel</button>
            <button onClick={() => navigate('/driver/register')} className="border-2 border-white/90 text-white px-7 py-3 rounded-[10px] text-[15px] font-semibold hover:bg-white/10 cursor-pointer">Become a Driver</button>
          </div>
        </div>
        <div className="w-full h-[340px] lg:h-auto">
          <img src={truckImg} alt="delivery van" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why" className="py-16 px-6 lg:px-12 bg-[#faf7ff]">
        <h2 className="font-['Poppins'] font-bold text-[30px] text-[#4a2d7a] text-center mb-12">Why Choose Deliver Uganda</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-[1200px] mx-auto">
          {[
            {icon:'💰', title:'Affordable Rates', desc:'Transparent, competitive pricing that delivers real value for individuals and businesses without compromising service quality.'},
            {icon:'👨‍✈️', title:'Professional Drivers', desc:'Verified and trained drivers committed to safety, reliability, and professional customer service at every delivery stage.'},
            {icon:'🇺🇬', title:'Nationwide Coverage', desc:'Extensive delivery network reaching cities and towns across Uganda, ensuring dependable service wherever you operate.'},
            {icon:'🎧', title:'24/7 Support', desc:'Always-available support teams providing timely assistance, tracking updates, and resolution whenever you need help.'},
          ].map((f,i)=>(
            <div key={i} className="text-center">
              <div className="w-[64px] h-[64px] mx-auto rounded-full bg-[#f1e8ff] flex items-center justify-center text-[#4a2d7a] text-[24px] font-bold mb-5 shadow-sm">{f.icon}</div>
              <h4 className="font-['Poppins'] font-bold text-[16px] text-[#2d1654] mb-3">{f.title}</h4>
              <p className="text-[14px] text-[#5a4a78] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 px-6 lg:px-12 bg-white">
        <h2 className="font-['Poppins'] font-bold text-[30px] text-[#4a2d7a] text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-[1200px] mx-auto">
          {[
            {icon:'⚡', title:'Same-Day Delivery', desc:'Quickly place a delivery request by entering pickup and destination details through our simple, intuitive platform.'},
            {icon:'📦', title:'Business Parcel Delivery', desc:'Reliable parcel solutions designed to support business operations with consistent pickups and timely deliveries.'},
            {icon:'📍', title:'Real-Time Tracking', desc:'Track your parcel live with accurate updates from pickup through every stage of delivery.'},
            {icon:'🔒', title:'Secure Package Handling', desc:'Packages are handled carefully using secure procedures to ensure safety, protection, and damage-free delivery.'},
          ].map((s,i)=>(
            <div key={i} className="text-center">
              <div className="w-[64px] h-[64px] mx-auto rounded-full bg-[#f1e8ff] flex items-center justify-center text-[#4a2d7a] text-[24px] font-bold mb-5 shadow-sm">{s.icon}</div>
              <h4 className="font-['Poppins'] font-bold text-[16px] text-[#2d1654] mb-3">{s.title}</h4>
              <p className="text-[14px] text-[#5a4a78] leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRACK */}
      <section id="track" className="py-16 px-6 bg-[#FAF7FF] border-y border-[#ede6ff]">
        <h2 className="font-['Poppins'] font-bold text-[28px] text-[#4a2d7a] text-center">Track Your Parcel</h2>
        <p className="text-center text-[14px] text-[#6b5a8a] mt-3 mb-8">Enter your tracking code below to see current status and location.</p>
        <div className="max-w-[720px] mx-auto flex gap-4">
          <input placeholder="Enter Tracking Code, e.g. DU123456789" className="flex-1 h-[50px] border-2 border-[#d9c8ff] rounded-[12px] px-5 text-[14px] outline-none focus:border-[#6c3ce0] bg-white shadow-sm" />
          <button className="bg-[#3d2468] text-white px-8 rounded-[12px] text-[14px] font-bold h-[50px] hover:bg-[#2d1654] shadow-md">Track Parcel</button>
        </div>
        <p className="text-center text-[13px] text-[#8a7bb5] mt-4">Example: <span className="text-[#2d1654] font-bold">DU123456789</span></p>
      </section>

      {/* APP DOWNLOAD */}
      <section className="bg-[#3d1560] py-20 px-6 text-center">
        <h2 className="font-['Poppins'] font-bold text-white text-[28px] mb-10">Get the Deliver Uganda App</h2>
        <div className="flex justify-center gap-5 flex-wrap">
          <a href="#" className="bg-black text-white rounded-[12px] px-5 py-3 flex items-center gap-3 border border-white/10 hover:bg-[#111] transition min-w-[170px]">
            <svg viewBox="0 0 512 512" className="w-[28px] h-[28px]"><path fill="white" d="M23 33l220 220-220 220V33zM34 14l288 162c17 10 17 36 0 46L34 484c-5 3-11-1-11-7V21c0-6 6-10 11-7zM489 258c0-8-5-14-11-17L191 61l205 205-205 205 287-180c6-3 11-9 11-17v-16z"/></svg>
            <div className="text-left leading-none">
              <div className="text-[10px] opacity-80">GET IT ON</div><div className="text-[15px] font-bold">Google Play</div>
            </div>
          </a>
          <a href="#" className="bg-black text-white rounded-[12px] px-5 py-3 flex items-center gap-3 border border-white/10 hover:bg-[#111] transition min-w-[170px]">
            <svg viewBox="0 0 384 512" className="w-[24px] h-[24px]"><path fill="white" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C59.3 141.2 0 184.8 0 255.9c0 31.1 11.4 64.1 23.5 92.3 12.6 29.6 52.7 104.5 95.3 104.5 22.4 0 40.6-14.7 77.2-14.7 36 0 44.2 14.7 76.7 14.7 41.1 0 79.3-57.3 91.2-105.6-20.8-9.2-34.9-31.1-38.2-58.5zM210.4 87.4c9.3-11.3 15.5-27.1 13.8-42.8-13.4 1-29.6 9-39.3 20-8.6 10-16 26.5-14 42 14.9 1.2 30.2-7.5 39.5-19.2z"/></svg>
            <div className="text-left leading-none">
              <div className="text-[10px] opacity-80">Download on the</div><div className="text-[15px] font-bold">App Store</div>
            </div>
          </a>
        </div>
      </section>

      {/* FOOTER - CLEAN CENTERED */}
      <footer className="bg-[#f3f0f7] px-6 py-5 grid grid-cols-1 md:grid-cols-3 items-center text-[13px]">
        <div>
          <div className="font-['Poppins'] font-extrabold text-[#2d1654] text-[15px]">DELIVER UGANDA</div>
          <div className="text-[#8a7bb5] mt-1">© 2025 Deliver Uganda. All rights reserved</div>
        </div>
        <div className="font-semibold text-[#2d1654] text-center mt-2 md:mt-0">
          Terms and Conditions
        </div>
        <div className="hidden md:block"></div>
      </footer>
    </div>
  )
}