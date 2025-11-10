import ParticleBg from "../components/ParticleBg"
import GlassCard from "../components/GlassCard"
import Link from "next/link"
import ThreeMiniModels from "../components/ThreeMiniModels"
import RecentMemories from "../components/RecentMemories"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 circuit-bg">
        <ParticleBg className="h-[280px]" />
        <ThreeMiniModels className="z-0" height={280} />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold">
            Learn Robotics & IoT
          </h1>
          <p className="mt-4 max-w-2xl text-textWhite/80">
            Kits, Projects, and Workshops with a futuristic learning experience.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/shop" className="rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow">Explore Shop</Link>
            <Link href="/learning-hub" className="rounded-md border border-white/20 px-5 py-2 text-white hover:bg-white/5">Learning Hub</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <GlassCard>
          <div className="text-3xl font-bold">10K+</div>
          <div className="text-textWhite/70">Students Impacted</div>
        </GlassCard>
        <GlassCard>
          <div className="text-3xl font-bold">250+</div>
          <div className="text-textWhite/70">Schools & Clubs</div>
        </GlassCard>
        <GlassCard>
          <div className="text-3xl font-bold">500+</div>
          <div className="text-textWhite/70">Projects Built</div>
        </GlassCard>
      </section>

      <div className="trace-divider" />

      <section className="space-y-4">
        <h2 className="font-orbitron text-2xl">Featured Kits</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map(i => (
            <GlassCard key={i}>
              <div className="h-36 rounded-md bg-white/5" />
              <div className="mt-3 font-semibold">Starter Robotics Kit {i}</div>
              <div className="text-sm text-textWhite/70">Everything to begin your robotics journey.</div>
            </GlassCard>
          ))}
        </div>
      </section>

      <div className="trace-divider" />

      <section className="space-y-4">
        <h2 className="font-orbitron text-2xl">Learning Roadmap</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {["Arduino","Robotics","IoT","Automation"].map((t) => (
            <GlassCard key={t}>
              <div className="font-semibold">{t}</div>
              <div className="text-sm text-textWhite/70">Curated resources to level up.</div>
            </GlassCard>
          ))}
        </div>
      </section>

      <RecentMemories />
    </div>
  )
}
