import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, MONO} from '../theme';
import {StatusBadge} from './ui';

/** Persistent control-room frame: top bar with scene code + clock, bottom ticker. */
export const HUD: React.FC<{scenes: {code: string; from: number}[]}> = ({scenes}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const current = [...scenes].reverse().find((s) => frame >= s.from) ?? scenes[0];
  const tc = (f: number) => {
    const s = Math.floor(f / fps);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(f % fps).padStart(2, '0')}`;
  };
  return (
    <>
      <div style={{position: 'absolute', top: 30, left: 50, right: 50, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: MONO, fontSize: 18, color: C.muted, direction: 'ltr'}}>
        <div style={{display: 'flex', gap: 22, alignItems: 'center'}}>
          <span style={{color: C.gold, fontWeight: 700, letterSpacing: 3}}>TOM ZIV · CONTROL ROOM</span>
          <span style={{color: C.mint}}>{current.code}</span>
        </div>
        <div style={{display: 'flex', gap: 22, alignItems: 'center'}}>
          <span>TC {tc(frame)}</span>
          <StatusBadge label="LIVE" color={C.red} size={16} />
        </div>
      </div>
      <div style={{position: 'absolute', top: 84, left: 50, right: 50, height: 1, background: `linear-gradient(90deg, ${C.mint}55, transparent 40%, transparent 60%, ${C.mint}55)`}} />
      <div style={{position: 'absolute', bottom: 22, left: 50, right: 50, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2}}>
        <div style={{width: `${(frame / durationInFrames) * 100}%`, height: '100%', background: C.mint, borderRadius: 2}} />
      </div>
      <div style={{position: 'absolute', bottom: 30, right: 50, fontFamily: FONT, fontSize: 16, color: C.dim}}>תום זיו · תכנון פיננסי והשקעות</div>
    </>
  );
};
