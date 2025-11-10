import GlassCard from "../../components/GlassCard"

export default function LearningHub() {
  const items = [
    {title: 'Arduino Basics', href: '#'},
    {title: 'Robotics Projects', href: '#'},
    {title: 'IoT Projects', href: '#'},
    {title: 'Troubleshooting Guides', href: '#'},
  ]
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <aside className="md:col-span-1">
        <div className="glass sticky top-24 rounded-xl p-4 circuit-bg">
          <div className="font-orbitron mb-2 glow-text">Categories</div>
          <ul className="font-orbitron grid grid-cols-2 gap-2 text-xs sm:text-sm md:block md:space-y-1 md:text-sm">
            {items.map(i => (
              <li
                key={i.title}
                className="rounded border border-white/10 px-3 py-2 text-center hover:bg-white/5 hover:text-white md:border-0 md:px-0 md:py-0 md:text-left md:hover:bg-transparent"
              >
                <a className="block w-full" href={i.href}>{i.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <section className="md:col-span-3 space-y-4">
        <h1 className="font-orbitron text-3xl">Resources</h1>
        {[1,2,3].map(i => (
          <GlassCard key={i}>
            <div className="font-semibold">Getting started guide {i}</div>
            <div className="text-sm text-textWhite/70">Steps + Code + Circuit + Video</div>
          </GlassCard>
        ))}
      </section>
    </div>
  )
}
