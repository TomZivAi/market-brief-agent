import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, ease, rise} from '../lib/anim';
import {C, FONT, MONO} from '../theme';

export const StatusBadge: React.FC<{label?: string; color?: string; size?: number}> = ({label = 'ONLINE', color = C.mint, size = 18}) => {
  const frame = useCurrentFrame();
  const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(frame / 6));
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: `${size * 0.35}px ${size * 0.8}px`, border: `1.5px solid ${color}66`, borderRadius: 999, background: `${color}14`, fontFamily: MONO, fontSize: size, color, letterSpacing: 2, direction: 'ltr'}}>
      <span style={{width: size * 0.55, height: size * 0.55, borderRadius: '50%', background: color, opacity: pulse, boxShadow: `0 0 ${size}px ${color}`}} />
      {label}
    </div>
  );
};

export const Panel: React.FC<{children: React.ReactNode; style?: React.CSSProperties; glow?: string}> = ({children, style, glow = C.mint}) => (
  <div
    style={{
      background: C.panel,
      border: `1.5px solid ${glow}33`,
      borderRadius: 18,
      boxShadow: `0 0 0 1px rgba(255,255,255,0.03) inset, 0 30px 80px rgba(0,0,0,0.45), 0 0 60px ${glow}14`,
      backdropFilter: 'blur(6px)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Corner brackets like a camera viewfinder */
export const Brackets: React.FC<{color?: string; size?: number; inset?: number}> = ({color = C.mint, size = 26, inset = 0}) => {
  const s: React.CSSProperties = {position: 'absolute', width: size, height: size, borderColor: color, borderStyle: 'solid', borderWidth: 0};
  return (
    <>
      <div style={{...s, top: inset, left: inset, borderTopWidth: 3, borderLeftWidth: 3}} />
      <div style={{...s, top: inset, right: inset, borderTopWidth: 3, borderRightWidth: 3}} />
      <div style={{...s, bottom: inset, left: inset, borderBottomWidth: 3, borderLeftWidth: 3}} />
      <div style={{...s, bottom: inset, right: inset, borderBottomWidth: 3, borderRightWidth: 3}} />
    </>
  );
};

/** "02_ROSTER · הצוות" style section title */
export const SceneTitle: React.FC<{code: string; title: string; sub?: string; dur: number}> = ({code, title, sub, dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = rise(frame, fps, 0, 14);
  const out = interpolate(frame, [dur - 12, dur], [1, 0], clamp);
  const bar = ease(frame, 4, 30);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: out}}>
      <div style={{fontFamily: MONO, color: C.gold, fontSize: 30, letterSpacing: 8, opacity: p, direction: 'ltr'}}>{code}</div>
      <div style={{width: 520 * bar, height: 3, background: `linear-gradient(90deg, transparent, ${C.mint}, transparent)`, margin: '22px 0'}} />
      <div style={{fontFamily: FONT, fontWeight: 800, color: C.text, fontSize: 104, transform: `translateY(${(1 - p) * 40}px)`, opacity: p}}>{title}</div>
      {sub ? <div style={{fontFamily: FONT, color: C.muted, fontSize: 38, marginTop: 10, opacity: ease(frame, 14, 34)}}>{sub}</div> : null}
    </div>
  );
};

/** Lower-third caption for showcase */
export const LowerThird: React.FC<{title: string; subtitle: string; tags: string[]; team?: string[]; index: number; total: number}> = ({title, subtitle, tags, team, index, total}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = rise(frame, fps, 14, 18);
  return (
    <div style={{position: 'absolute', bottom: 56, right: 90, left: 90, transform: `translateY(${(1 - p) * 120}px)`, opacity: p}}>
      <Panel style={{padding: '24px 36px', display: 'flex', alignItems: 'center', gap: 32}} glow={C.gold}>
        <div style={{fontFamily: MONO, color: C.gold, fontSize: 26, direction: 'ltr', whiteSpace: 'nowrap'}}>
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>
        <div style={{width: 3, alignSelf: 'stretch', background: C.gold}} />
        <div style={{flex: 1}}>
          <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 50, color: C.text}}>{title}</div>
          <div style={{fontFamily: FONT, fontSize: 28, color: C.muted, marginTop: 4}}>{subtitle}</div>
          {team ? <div style={{fontFamily: FONT, fontSize: 20, color: C.gold, marginTop: 6, opacity: 0.85}}>צוות: {team.join(' · ')}</div> : null}
        </div>
        <div style={{display: 'flex', gap: 10}}>
          {tags.map((t, i) => (
            <div key={t} style={{fontFamily: FONT, fontSize: 22, color: C.mint, border: `1.5px solid ${C.mint}55`, borderRadius: 999, padding: '6px 16px', opacity: ease(frame, 26 + i * 5, 40 + i * 5)}}>
              {t}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};
