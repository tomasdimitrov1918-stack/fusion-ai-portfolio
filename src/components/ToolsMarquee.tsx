import { MARQUEE_DURATION_S } from '../lib/animations'

const TOOLS = ['Kling 3.0', 'VEO 3.1', 'Sora Pro', 'Nano Banana Pro', 'ElevenLabs', 'CapCut', 'Seedance 2.0', 'ChatGPT Image 2.0']

export function ToolsMarquee() {
  const items = [...TOOLS, ...TOOLS, ...TOOLS]

  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{ background: '#191B26', borderColor: 'rgba(176,16,32,0.15)' }}
    >
      <div
        className="flex items-center animate-marquee w-max"
        style={{ '--marquee-duration': `${MARQUEE_DURATION_S}s`, gap: '2.5rem' } as React.CSSProperties}
      >
        {items.map((tool, i) => (
          <span key={`${tool}-${i}`} className="flex items-center shrink-0" style={{ gap: '2.5rem' }}>
            <span
              className="text-[13px] font-medium tracking-widest uppercase whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {tool}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: 'rgba(176,16,32,0.5)' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
