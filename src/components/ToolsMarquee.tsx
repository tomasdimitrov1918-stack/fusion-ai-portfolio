import { MARQUEE_DURATION_S } from '../lib/animations'

const TOOLS = ['Kling 3.0', 'VEO 3.1', 'Sora Pro', 'Nano Banana Pro', 'ElevenLabs', 'CapCut']

export function ToolsMarquee() {
  const items = [...TOOLS, ...TOOLS]

  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{
        background: '#191B26',
        borderColor: 'rgba(176,16,32,0.15)',
      }}
    >
      <div
        className="flex gap-8 items-center animate-marquee w-max"
        style={{ '--marquee-duration': `${MARQUEE_DURATION_S}s` } as React.CSSProperties}
      >
        {items.map((tool, i) => (
          <span key={`${tool}-${i}`} className="flex items-center gap-8 shrink-0">
            <span
              className="text-[11px] tracking-wide"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {tool}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: 'rgba(176,16,32,0.4)' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
