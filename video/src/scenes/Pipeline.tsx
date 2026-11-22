import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, ease, rise} from '../lib/anim';
import {C, FONT, MONO} from '../theme';
import {Sfx} from '../components/Sfx';
import {Panel} from '../components/ui';

const Y = 470;
const stations = [
  {x: 1620, title: 'איסוף נתונים', who: 'נועה', icon: '⌕', note: 'מקורות חיים, 24-48 שעות'},
  {x: 1310, title: 'ניתוח פיננסי', who: 'נועה', icon: '∿', note: 'מדדים, ריבית, שקל'},
  {x: 1000, title: 'כתיבה ועריכה', who: 'יואב', icon: '✎', note: 'בקול של תום'},
  {x: 690, title: 'בקרת איכות', who: 'רינה', icon: '◎', note: 'כל מספר מול המקור'},
  {x: 380, title: 'יוצא לדרך', who: 'דני', icon: '➤', note: 'טלגרם / מייל / PDF'},
];
const QA = 3;

export const Pipeline: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = interpolate(frame, [dur - 15, dur], [1, 0], clamp);

  // packet path: 0 -> QA (reject) -> back to writing -> QA (approve) -> output
  const xs = stations.map((s) => s.x);
  const t = [140, 250, 275, 305, 335, 375];
  const px = interpolate(frame, t, [xs[0], xs[QA], xs[QA] + 40, xs[2], xs[QA], xs[4]], clamp);
  const rejected = frame >= 250 && frame < 305;
  const approved = frame >= 335;
  const packetColor = rejected ? C.red : approved ? C.mint : C.gold;
  const showPacket = frame >= 140 && frame < 395;

  const checks = ['כל מספר נבדק מול המקור', 'אין מקור? אין שורה', 'אפס ניסוחים של ייעוץ', 'קריאה מלאה לפני שליחה'];
  const finale = rise(frame, fps, 440, 14);

  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FONT}}>
      <div style={{position: 'absolute', top: 110, right: 110, opacity: ease(frame, 0, 20)}}>
        <div style={{fontFamily: MONO, color: C.gold, fontSize: 24, letterSpacing: 6, direction: 'ltr', textAlign: 'right'}}>03_PIPELINE</div>
        <div style={{fontSize: 70, fontWeight: 800, color: C.text}}>מאחורי הקלעים</div>
      </div>

      {/* Adam router bar */}
      <div style={{position: 'absolute', top: 140, left: 110, opacity: ease(frame, 20, 40)}}>
        <Panel style={{padding: '14px 26px', display: 'flex', alignItems: 'center', gap: 16}} glow={C.gold}>
          <span style={{width: 16, height: 16, borderRadius: '50%', background: C.gold}} />
          <span style={{fontSize: 30, color: C.text, fontWeight: 700}}>אדם</span>
          <span style={{fontSize: 24, color: C.muted}}>מנתב ומפקח על כל שלב</span>
        </Panel>
      </div>

      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        {/* main rail */}
        <line x1={xs[0]} y1={Y} x2={xs[0] - (xs[0] - xs[4]) * ease(frame, 25, 110)} y2={Y} stroke={C.mint} strokeOpacity={0.35} strokeWidth={4} strokeDasharray="12 10" strokeDashoffset={-frame * 2} />
        {/* rework loop QA -> writing */}
        <path d={`M ${xs[QA]} ${Y + 90} Q ${(xs[QA] + xs[2]) / 2} ${Y + 200} ${xs[2]} ${Y + 90}`} fill="none" stroke={C.red} strokeOpacity={rejected ? 0.9 : 0.2 * ease(frame, 100, 130)} strokeWidth={3} strokeDasharray="8 8" />
        {/* memory loop to Michal */}
        <path d={`M ${xs[QA]} ${Y + 90} Q ${xs[QA] - 60} ${Y + 300} ${xs[2] + 155} ${Y + 330}`} fill="none" stroke="#67e8f9" strokeOpacity={0.4 * ease(frame, 330, 360)} strokeWidth={3} strokeDasharray="6 8" />
        {showPacket ? (
          <g>
            <circle cx={px} cy={Y} r={30} fill={packetColor} opacity={0.18} />
            <circle cx={px} cy={Y} r={14} fill={packetColor} />
          </g>
        ) : null}
      </svg>

      {stations.map((s, i) => {
        const p = rise(frame, fps, 30 + i * 14, 14);
        const lit = (frame >= 140 && px <= s.x + 5) || frame > 375;
        const isQA = i === QA;
        const border = isQA && rejected ? C.red : isQA && approved ? C.mint : lit ? C.mint : `${C.mint}44`;
        return (
          <div key={s.title} style={{position: 'absolute', left: s.x - 130, top: Y - 90, width: 260, transform: `scale(${p})`, opacity: p}}>
            <div style={{height: 180, background: C.panel, border: `2.5px solid ${border}`, borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: lit ? `0 0 40px ${border}44` : 'none'}}>
              <div style={{fontSize: 52, color: lit ? C.mint : C.muted, lineHeight: 1}}>{s.icon}</div>
              <div style={{fontSize: 32, fontWeight: 800, color: C.text}}>{s.title}</div>
              <div style={{fontSize: 22, color: C.gold}}>{s.who}</div>
            </div>
            <div style={{textAlign: 'center', fontSize: 21, color: C.muted, marginTop: 12}}>{s.note}</div>
            {isQA ? (
              <div style={{position: 'absolute', top: -64, left: -80, right: -80, textAlign: 'center'}}>
                {rejected ? <span style={{whiteSpace: 'nowrap', background: C.red, color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 24, fontWeight: 800}}>✗ חסר מקור. חוזר לעריכה</span> : null}
                {approved ? <span style={{background: C.mint, color: C.bg, padding: '8px 18px', borderRadius: 10, fontSize: 24, fontWeight: 800}}>✓ מאושר</span> : null}
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Michal memory chip */}
      <div style={{position: 'absolute', top: Y + 300, left: xs[2] - 150, opacity: ease(frame, 340, 365)}}>
        <Panel style={{padding: '10px 20px', fontSize: 24, color: C.text}} glow="#67e8f9">
          <span style={{color: '#67e8f9', fontWeight: 700}}>מיכל</span> · התיקון נשמר בזיכרון
        </Panel>
      </div>

      {/* checklist */}
      <div style={{position: 'absolute', right: 110, bottom: 90, display: 'flex', gap: 16}}>
        {checks.map((c, i) => (
          <div key={c} style={{fontSize: 26, color: C.mint, background: 'rgba(126,200,122,0.08)', border: `1.5px solid ${C.mint}55`, borderRadius: 12, padding: '10px 20px', opacity: ease(frame, 390 + i * 10, 405 + i * 10)}}>
            ✓ {c}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 110, bottom: 84, fontSize: 52, fontWeight: 900, color: C.text, opacity: finale, transform: `translateY(${(1 - finale) * 20}px)`}}>
        שום דבר לא יוצא <span style={{color: C.gold}}>בלי בדיקה.</span>
      </div>

      {stations.map((_, i) => (
        <Sfx key={i} name="click" at={30 + i * 14} volume={0.4} />
      ))}
      <Sfx name="whoosh" at={140} volume={0.35} />
      <Sfx name="deny" at={250} volume={0.55} />
      <Sfx name="whoosh" at={275} volume={0.3} />
      <Sfx name="ping" at={335} volume={0.6} />
      {checks.map((_, i) => (
        <Sfx key={`c${i}`} name="beep" at={390 + i * 10} volume={0.3} />
      ))}
      <Sfx name="impact" at={440} volume={0.55} />
    </AbsoluteFill>
  );
};
