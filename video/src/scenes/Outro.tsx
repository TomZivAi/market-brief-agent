import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, ease, rise} from '../lib/anim';
import {C, FONT, MONO} from '../theme';
import {Sfx} from '../components/Sfx';
import {StatusBadge} from '../components/ui';

export const Outro: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = rise(frame, fps, 5, 12);
  const ring = ease(frame, 0, 40);
  const fadeOut = interpolate(frame, [dur - 20, dur], [1, 0], clamp);
  const r = 150;
  const circ = 2 * Math.PI * r;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT, opacity: fadeOut}}>
      <svg width={420} height={420} viewBox="0 0 420 420" style={{transform: `scale(${0.6 + logo * 0.4}) rotate(${(1 - ring) * -90}deg)`}}>
        <circle cx={210} cy={210} r={r} fill={C.bg} stroke={C.gold} strokeWidth={6} strokeDasharray={`${circ * ring} ${circ}`} transform="rotate(-90 210 210)" />
        <circle cx={210} cy={210} r={r + 26} fill="none" stroke={C.mint} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 10" transform={`rotate(${frame} 210 210)`} />
        <text x={210} y={246} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={120} fill={C.gold} opacity={logo}>
          TZ
        </text>
      </svg>
      <div style={{fontSize: 110, fontWeight: 900, color: C.text, marginTop: -10, direction: 'ltr', opacity: ease(frame, 20, 40)}}>Tom Ziv</div>
      <div style={{fontSize: 46, color: C.mint, fontWeight: 500, opacity: ease(frame, 30, 50)}}>תכנון פיננסי והשקעות</div>
      <div style={{fontSize: 34, color: C.muted, marginTop: 24, opacity: ease(frame, 50, 70)}}>טכנולוגיה מתקדמת. ליווי אישי.</div>
      <div style={{display: 'flex', gap: 20, alignItems: 'center', marginTop: 34, opacity: ease(frame, 65, 85)}}>
        <div style={{fontFamily: MONO, fontSize: 30, color: C.gold, direction: 'ltr'}}>ziv-finance.co.il</div>
        <StatusBadge label="LIVE" size={20} />
      </div>
      <Sfx name="impact" at={5} volume={0.8} />
      <Sfx name="ping" at={50} volume={0.4} />
    </AbsoluteFill>
  );
};
