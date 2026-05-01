export function Footer() {
  return (
    <footer
      className="flex justify-between items-center px-12 py-8 border-t"
      style={{ background: '#060608', borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <span
        className="text-sm font-black tracking-[6px] uppercase"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        FUSION
      </span>
      <span className="text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.15)' }}>
        © 2026 Monika &amp; Tomas — Fusion AI Creative
      </span>
    </footer>
  )
}
