export default function Contact() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="font-orbitron text-3xl">Contact</h1>
      <form className="glass rounded-xl p-6 space-y-4">
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Name" />
        <input className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Email" />
        <textarea rows="4" className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-neonBlue" placeholder="Message" />
        <button type="button" className="w-full rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow">Send</button>
      </form>
    </div>
  )
}
