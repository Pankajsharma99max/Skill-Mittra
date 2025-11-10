import Link from 'next/link'
import GlassCard from "../../components/GlassCard"

export default function Workshops() {
  return (
    <div className="space-y-6">
      <h1 className="font-orbitron text-3xl">Workshops</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard>
          <div className="font-semibold">Program Overview</div>
          <p className="text-sm text-textWhite/70">Hands-on robotics & IoT.
          </p>
        </GlassCard>
        <GlassCard>
          <div className="font-semibold">What Students Learn</div>
          <p className="text-sm text-textWhite/70">Electronics, Coding, Prototyping.</p>
        </GlassCard>
        <GlassCard>
          <div className="font-semibold">Kit Included</div>
          <p className="text-sm text-textWhite/70">Take-home kit for continued learning.</p>
        </GlassCard>
      </div>
      <div className="flex justify-end">
        <Link href="/workshops/request" className="rounded-md bg-neonBlue px-5 py-2 text-black font-semibold shadow-glow">Request a Workshop</Link>
      </div>
    </div>
  )
}
