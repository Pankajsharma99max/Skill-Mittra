export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-textWhite/70">
        <div className="mb-2 font-orbitron text-textWhite">
          Skill <span className="text-neonBlue">Mittra</span>
        </div>
        <p>
          © {new Date().getFullYear()} Skill Mittra. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
