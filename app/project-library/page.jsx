import GlassCard from "../../components/GlassCard"

export default function ProjectLibrary() {
  const groups = [
    {title: 'Beginner', items: [1,2,3]},
    {title: 'Intermediate', items: [1,2,3]},
    {title: 'Advanced', items: [1,2,3]},
  ]
  return (
    <div className="space-y-8">
      <h1 className="font-orbitron text-3xl">Project Library</h1>
      {groups.map(g => (
        <div key={g.title} className="space-y-3">
          <h2 className="font-orbitron text-xl">{g.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map(i => (
              <GlassCard key={i}>
                <div className="h-36 rounded-md bg-white/5" />
                <div className="mt-3 font-semibold">{g.title} Project {i}</div>
                <div className="text-sm text-textWhite/70">Parts + Steps + Code + Video</div>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
