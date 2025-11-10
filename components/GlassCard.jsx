export default function GlassCard({ children, className = '' }) {
  return (
    <div className={`glass rounded-xl border border-white/10 p-5 ${className}`}>
      {children}
    </div>
  )
}
