import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/** Dark control-room backdrop: perspective 3D grid floor + drifting nodes + vignette + scanlines */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = (frame * 1.2) % 80;

  const nodes = new Array(28).fill(0).map((_, i) => {
    const x = random(`x${i}`) * 1920;
    const y = random(`y${i}`) * 620;
    const r = 1.5 + random(`r${i}`) * 2.5;
    const drift = Math.sin(frame / 60 + i) * 12;
    const tw = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(frame / 25 + i * 1.7));
    return {x: x + drift, y: y + Math.cos(frame / 80 + i) * 8, r, tw, i};
  });

  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 30%, #16223d 0%, ${C.bg} 55%, ${C.bgDeep} 100%)`}}>
      {/* 3D grid floor */}
      <AbsoluteFill style={{perspective: 900, perspectiveOrigin: '50% 35%', overflow: 'hidden'}}>
        <div
          style={{
            position: 'absolute',
            left: '-50%',
            width: '200%',
            top: '45%',
            height: '140%',
            transform: 'rotateX(74deg)',
            transformOrigin: '50% 0%',
            backgroundImage: `linear-gradient(${C.line} 1.5px, transparent 1.5px), linear-gradient(90deg, ${C.line} 1.5px, transparent 1.5px)`,
            backgroundSize: '80px 80px',
            backgroundPosition: `0px ${scroll}px`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 60%, transparent 100%)',
          }}
        />
      </AbsoluteFill>
      {/* horizon glow */}
      <div style={{position: 'absolute', top: '44%', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.mint}55, transparent)`, boxShadow: `0 0 40px ${C.mint}44`}} />
      {/* network nodes */}
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        {nodes.map((n, idx) => {
          const m = nodes[(idx + 3) % nodes.length];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          return d < 420 ? <line key={`l${idx}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={C.mint} strokeOpacity={0.07} /> : null;
        })}
        {nodes.map((n) => (
          <circle key={n.i} cx={n.x} cy={n.y} r={n.r} fill={n.i % 4 === 0 ? C.gold : C.mint} opacity={n.tw} />
        ))}
      </svg>
      {/* scanlines + vignette */}
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};
