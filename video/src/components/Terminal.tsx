import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {LogLine} from '../data/agents';
import {C, MONO} from '../theme';

const colorFor = (k?: LogLine['kind']) =>
  k === 'cmd' ? C.gold : k === 'ok' ? C.mint : k === 'warn' ? '#fbbf24' : k === 'err' ? C.red : '#b6c3d6';

/** Terminal box that types out lines one after another (cps = chars per frame). */
export const Terminal: React.FC<{
  lines: LogLine[];
  title?: string;
  start?: number;
  cps?: number;
  gap?: number;
  width?: number | string;
  height?: number;
  fontSize?: number;
}> = ({lines, title = 'agent.log', start = 0, cps = 1.4, gap = 6, width = '100%', height, fontSize = 24}) => {
  const frame = useCurrentFrame() - start;
  let cursor = 0;
  const rendered = lines.map((l) => {
    const begin = cursor;
    cursor += Math.ceil(l.t.length / cps) + gap;
    const n = Math.max(0, Math.floor((frame - begin) * cps));
    return {...l, shown: l.t.slice(0, n), active: frame >= begin && n < l.t.length, started: frame >= begin};
  });
  const blink = Math.floor(frame / 15) % 2 === 0;
  const lastStarted = rendered.filter((r) => r.started).length - 1;

  return (
    <div style={{width, height, background: 'rgba(5, 10, 22, 0.92)', border: `1.5px solid ${C.mint}40`, borderRadius: 14, overflow: 'hidden', direction: 'ltr', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${C.mint}22`, background: 'rgba(126,200,122,0.05)'}}>
        {['#f87171', '#fbbf24', C.mint].map((c) => (
          <span key={c} style={{width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.85}} />
        ))}
        <span style={{fontFamily: MONO, fontSize: 16, color: C.muted, marginLeft: 12}}>{title}</span>
      </div>
      <div style={{padding: '16px 20px', fontFamily: MONO, fontSize, lineHeight: 1.6}}>
        {rendered.map((r, i) =>
          r.started ? (
            <div key={i} style={{color: colorFor(r.kind), whiteSpace: 'pre', unicodeBidi: 'plaintext'}}>
              {r.shown}
              {(r.active || (i === lastStarted && blink)) && i === lastStarted ? <span style={{background: C.mint, color: C.mint}}>▌</span> : null}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
