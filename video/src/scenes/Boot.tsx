import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {agents} from '../data/agents';
import {clamp, ease, rise} from '../lib/anim';
import {C, FONT, MONO} from '../theme';
import {Sfx} from '../components/Sfx';
import {Terminal} from '../components/Terminal';
import {StatusBadge} from '../components/ui';

const NET_START = 165;

export const Boot: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // phase 1: clock + boot log + lines
  const secs = 5 * 3600 + 30 * 60 + Math.floor(frame / fps);
  const hh = String(Math.floor(secs / 3600)).padStart(2, '0');
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  const p1Out = interpolate(frame, [NET_START - 20, NET_START], [1, 0], clamp);
  const l1 = rise(frame, fps, 40);
  const l2 = rise(frame, fps, 95);

  // phase 2: network + brand
  const nf = frame - NET_START;
  const cx = 960;
  const cy = 470;
  const brand = rise(frame, fps, NET_START + 55, 14);
  const out = interpolate(frame, [dur - 15, dur], [1, 0], clamp);

  return (
    <AbsoluteFill style={{opacity: out}}>
      {/* PHASE 1 */}
      <AbsoluteFill style={{opacity: p1Out}}>
        <div style={{position: 'absolute', top: 180, left: 0, right: 0, textAlign: 'center', fontFamily: MONO, direction: 'ltr'}}>
          <div style={{fontSize: 170, color: C.text, letterSpacing: 6, textShadow: `0 0 40px ${C.mint}55`, opacity: ease(frame, 0, 12)}}>
            {hh}:{mm}
            <span style={{color: C.mint, fontSize: 90}}>:{ss}</span>
          </div>
          <div style={{display: 'flex', gap: 18, justifyContent: 'center', marginTop: 10, opacity: ease(frame, 10, 25)}}>
            <StatusBadge label="MARKETS: CLOSED" color={C.red} size={22} />
            <StatusBadge label="TEAM: ONLINE" color={C.mint} size={22} />
          </div>
        </div>
        <div style={{position: 'absolute', top: 500, left: 0, right: 0, textAlign: 'center', fontFamily: FONT}}>
          <div style={{fontSize: 76, fontWeight: 300, color: C.muted, opacity: l1, transform: `translateY(${(1 - l1) * 30}px)`}}>השווקים עוד סגורים.</div>
          <div style={{fontSize: 92, fontWeight: 800, color: C.text, opacity: l2, transform: `translateY(${(1 - l2) * 30}px)`}}>
            אבל <span style={{color: C.mint}}>הצוות שלי</span> כבר עובד.
          </div>
        </div>
        <div style={{position: 'absolute', left: 70, bottom: 60, width: 480, opacity: ease(frame, 5, 20)}}>
          <Terminal
            title="boot.sh"
            fontSize={19}
            cps={2.2}
            gap={4}
            lines={[
              {t: '$ system boot --night-shift', kind: 'cmd'},
              {t: `> loading agents [${agents.length}/${agents.length}]`},
              {t: '> memory: synced'},
              {t: '> web research: ON'},
              {t: '✓ all systems ONLINE', kind: 'ok'},
            ]}
          />
        </div>
      </AbsoluteFill>

      {/* PHASE 2: network nodes */}
      {nf > 0 ? (
        <AbsoluteFill>
          <svg width={1920} height={1080} style={{position: 'absolute'}}>
            {agents.map((a, i) => {
              const ang = (i / agents.length) * Math.PI * 2 - Math.PI / 2 + nf / 260;
              const R = 330;
              const x = cx + Math.cos(ang) * R * 1.35;
              const y = cy + Math.sin(ang) * R * 0.75;
              const draw = ease(nf, 5 + i * 5, 30 + i * 5);
              const pulseT = ((nf + i * 13) % 50) / 50;
              return (
                <g key={a.nameEn}>
                  <line x1={cx} y1={cy} x2={cx + (x - cx) * draw} y2={cy + (y - cy) * draw} stroke={C.mint} strokeOpacity={0.45} strokeWidth={2} />
                  {draw >= 1 ? <circle cx={cx + (x - cx) * pulseT} cy={cy + (y - cy) * pulseT} r={5} fill={C.gold} /> : null}
                  <circle cx={x} cy={y} r={46 * draw} fill={C.panelSolid} stroke={a.color} strokeWidth={3} />
                  <circle cx={x} cy={y} r={60 * draw} fill="none" stroke={a.color} strokeOpacity={0.25} strokeWidth={2} />
                  <text x={x} y={y + 9} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={26} fill={C.text} opacity={draw}>
                    {a.name}
                  </text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r={110 * ease(nf, 0, 20)} fill={C.bg} stroke={C.gold} strokeWidth={4} />
            <circle cx={cx} cy={cy} r={130 + Math.sin(nf / 8) * 6} fill="none" stroke={C.gold} strokeOpacity={0.3 * ease(nf, 0, 20)} strokeWidth={2} />
            <text x={cx} y={cy + 26} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={C.gold} opacity={ease(nf, 10, 25)}>
              TZ
            </text>
          </svg>
          <div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, opacity: brand, transform: `translateY(${(1 - brand) * 40}px)`}}>
            <div style={{fontSize: 96, fontWeight: 900, color: C.text, direction: 'ltr'}}>Tom Ziv</div>
            <div style={{fontSize: 44, color: C.mint, fontWeight: 500}}>תכנון פיננסי והשקעות</div>
          </div>
        </AbsoluteFill>
      ) : null}

      <Sfx name="riser" at={0} volume={0.35} />
      <Sfx name="type" at={8} volume={0.3} />
      <Sfx name="click" at={40} />
      <Sfx name="click" at={95} />
      <Sfx name="whoosh" at={NET_START - 10} />
      {agents.map((_, i) => (
        <Sfx key={i} name="ping" at={NET_START + 25 + i * 5} volume={0.25} />
      ))}
      <Sfx name="impact" at={NET_START + 55} volume={0.7} />
    </AbsoluteFill>
  );
};
