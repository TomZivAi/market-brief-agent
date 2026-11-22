import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {metrics} from '../data/metrics';
import {clamp, ease, rise} from '../lib/anim';
import {C, FONT, MONO} from '../theme';
import {Sfx} from '../components/Sfx';
import {Panel} from '../components/ui';

export const Metrics: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = interpolate(frame, [dur - 15, dur], [1, 0], clamp);
  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FONT, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 150, textAlign: 'center', opacity: ease(frame, 0, 20)}}>
        <div style={{fontFamily: MONO, color: C.gold, fontSize: 26, letterSpacing: 8, direction: 'ltr'}}>05_METRICS</div>
        <div style={{fontSize: 72, fontWeight: 800, color: C.text}}>במספרים</div>
      </div>
      <div style={{display: 'flex', gap: 36, marginTop: 60}}>
        {metrics.map((m, i) => {
          const delay = 15 + i * 18;
          const p = rise(frame, fps, delay, 15);
          const count = Math.round(m.value * interpolate(frame, [delay, delay + 45], [0, 1], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)}));
          const col = m.color === 'mint' ? C.mint : C.gold;
          return (
            <Panel key={m.label} glow={col} style={{width: 400, height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - p) * 80}px)`, opacity: p}}>
              <div style={{fontFamily: MONO, fontSize: 124, fontWeight: 700, color: col, lineHeight: 1, textShadow: `0 0 40px ${col}66`, direction: 'ltr'}}>
                {count}
                {m.suffix ?? ''}
              </div>
              <div style={{fontSize: 36, color: C.text, marginTop: 18, fontWeight: 600}}>{m.label}</div>
            </Panel>
          );
        })}
      </div>
      {metrics.map((_, i) => (
        <Sfx key={i} name="beep" at={15 + i * 18} volume={0.4} />
      ))}
      <Sfx name="type" at={15} volume={0.2} />
    </AbsoluteFill>
  );
};
