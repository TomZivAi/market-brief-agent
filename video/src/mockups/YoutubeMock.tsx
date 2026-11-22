import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ease} from '../lib/anim';
import {C, MONO} from '../theme';

// Production pipeline for the Wall Street Break channel: script -> video -> upload.
const Stickman: React.FC<{x: number; frame: number}> = ({x, frame}) => {
  const s = Math.sin(frame / 6) * 18;
  return (
    <g transform={`translate(${x} 0)`} stroke="#fff" strokeWidth={6} strokeLinecap="round" fill="none">
      <circle cx={0} cy={60} r={20} />
      <line x1={0} y1={80} x2={0} y2={140} />
      <line x1={0} y1={100} x2={-30} y2={100 - s} />
      <line x1={0} y1={100} x2={34} y2={80 + s / 2} />
      <line x1={0} y1={140} x2={-22} y2={180} />
      <line x1={0} y1={140} x2={22} y2={180} />
    </g>
  );
};

export const YoutubeMock: React.FC = () => {
  const f = useCurrentFrame();
  const steps = ['תסריט', 'קריינות', 'אנימציה', 'עריכה', 'העלאה'];
  const active = Math.min(steps.length - 1, Math.floor(Math.max(0, f - 20) / 34));
  const script = ['HOOK: Is the market about to break?', 'Today: 3 charts every investor', 'should see before Monday...'];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#0b0f17', color: '#fff', display: 'flex', flexDirection: 'column'}}>
      {/* channel banner */}
      <div style={{height: 120, background: 'linear-gradient(90deg, #111827, #1f2937 50%, #111827)', display: 'flex', alignItems: 'center', padding: '0 34px', gap: 20, direction: 'ltr'}}>
        <div style={{width: 76, height: 76, borderRadius: '50%', background: C.gold, color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, fontFamily: MONO}}>WSB</div>
        <div>
          <div style={{fontSize: 32, fontWeight: 800}}>Wall Street Break</div>
          <div style={{fontSize: 16, color: '#9ca3af', fontFamily: MONO}}>@WallStreetBreak · US markets, explained simply</div>
        </div>
        <div style={{marginLeft: 'auto', background: '#ef4444', padding: '10px 22px', borderRadius: 999, fontWeight: 700, fontSize: 18}}>Subscribe</div>
      </div>
      <div style={{flex: 1, display: 'flex', gap: 22, padding: 24, direction: 'ltr'}}>
        {/* player */}
        <div style={{flex: 1.5, display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{flex: 1, background: '#111827', borderRadius: 14, position: 'relative', overflow: 'hidden'}}>
            <svg width="100%" height="100%" viewBox="0 0 640 340">
              <polyline points={new Array(12).fill(0).map((_, i) => `${40 + i * 50},${260 - i * 14 - Math.sin(i + f / 10) * 18}`).join(' ')} stroke={C.mint} strokeWidth={5} fill="none" strokeDasharray={1200} strokeDashoffset={1200 * (1 - ease(f, 10, 120))} />
              <g transform="translate(0 110)">
                <Stickman x={120} frame={f} />
              </g>
              <rect x={400} y={30} width={210} height={50} rx={8} fill={C.gold} />
              <text x={505} y={64} textAnchor="middle" fontSize={24} fontWeight={900} fill="#0b0f17" fontFamily="monospace">
                S&P 500 ATH?
              </text>
            </svg>
            <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: '#374151'}}>
              <div style={{width: `${ease(f, 0, 220) * 100}%`, height: '100%', background: '#ef4444'}} />
            </div>
          </div>
          <div style={{display: 'flex', gap: 8}}>
            {steps.map((s, i) => (
              <div key={s} style={{flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 8, fontSize: 16, direction: 'rtl', background: i <= active ? `${C.mint}22` : '#111827', color: i <= active ? C.mint : '#6b7280', border: `1px solid ${i === active ? C.mint : 'transparent'}`}}>
                {i < active ? '✓ ' : ''}
                {s}
              </div>
            ))}
          </div>
        </div>
        {/* script editor */}
        <div style={{flex: 1, background: '#111827', borderRadius: 14, padding: 18, fontFamily: MONO, fontSize: 17, lineHeight: 1.7}}>
          <div style={{color: '#9ca3af', marginBottom: 8}}>script_ep01.md</div>
          {script.map((l, i) => (
            <div key={i} style={{color: i === 0 ? C.gold : '#e5e7eb'}}>{l.slice(0, Math.max(0, Math.floor((f - 10 - i * 30) * 1.2)))}</div>
          ))}
          <div style={{marginTop: 14, color: C.mint}}>{f > 120 ? '✓ fact-check: 3/3 sources' : ''}</div>
          <div style={{color: C.mint}}>{f > 150 ? '✓ thumbnail ready' : ''}</div>
        </div>
      </div>
    </div>
  );
};
