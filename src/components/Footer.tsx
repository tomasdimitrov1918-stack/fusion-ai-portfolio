export function Footer() {
  return (
    <footer
      className="flex justify-between items-center px-12 py-8 border-t"
      style={{ background: '#060608', borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <img src="/logo.webp" alt="Fusion Creative" className="h-7 w-auto opacity-40" />
      <span className="text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.15)' }}>
        © 2026 Monika &amp; Tomas — Fusion AI Creative
      </span>
    </footer>
  )
}
