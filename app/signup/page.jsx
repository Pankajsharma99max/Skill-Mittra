export default function Signup() {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <h1 className="font-orbitron text-3xl text-center">Create Account</h1>
      <form className="glass rounded-xl p-6 space-y-4">
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Name" />
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Email" />
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="School (optional)" />
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Grade (optional)" />
        <input type="password" className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Password" />
        <button type="button" className="w-full rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow">Sign Up</button>
      </form>
    </div>
  )
}
