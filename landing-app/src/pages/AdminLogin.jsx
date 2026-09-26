export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#2D0F4D] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center">Admin Access</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Deliver Uganda Internal Only</p>
        <form className="space-y-4">
          <input type="email" placeholder="Admin Email" className="w-full border border-[#E9D5FF] rounded-xl px-4 py-3" />
          <input type="password" placeholder="Password" className="w-full border border-[#E9D5FF] rounded-xl px-4 py-3" />
          <button className="w-full bg-[#5B1E9A] text-white py-3 rounded-xl font-semibold">Secure Login</button>
        </form>
      </div>
    </div>
  )
}