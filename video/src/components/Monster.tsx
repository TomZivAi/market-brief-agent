import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

type Props = {color: string; eyes: 1 | 2 | 3; outfit: string; size?: number; seed?: number};

/**
 * Stand-in cute monster drawn in SVG, wearing a hint of its role.
 * Replaced automatically once a generated clip exists in public/agents/.
 */
export const Monster: React.FC<Props> = ({color, eyes, outfit, size = 420, seed = 0}) => {
  const frame = useCurrentFrame() + seed * 17;
  const bob = Math.sin(frame / 12) * 8;
  const squash = 1 + Math.sin(frame / 12) * 0.02;
  const blink = frame % 90 > 84 ? 0.1 : 1;
  const look = Math.sin(frame / 40) * 6;

  const eyeXs = eyes === 1 ? [200] : eyes === 2 ? [160, 240] : [140, 200, 260];
  const eyeR = eyes === 1 ? 46 : eyes === 2 ? 30 : 24;

  return (
    <svg viewBox="0 0 400 420" width={size} height={size * 1.05} style={{overflow: 'visible'}}>
      <ellipse cx={200} cy={400} rx={120 - bob} ry={14} fill="#000" opacity={0.35} />
      <g transform={`translate(0 ${bob}) translate(200 380) scale(${1 / squash} ${squash}) translate(-200 -380)`}>
        {/* feet */}
        <ellipse cx={150} cy={378} rx={34} ry={18} fill={color} style={{filter: "brightness(0.8)"}} />
        <ellipse cx={250} cy={378} rx={34} ry={18} fill={color} style={{filter: "brightness(0.8)"}} />
        {/* horns */}
        <path d="M120 120 L100 60 L150 105 Z" fill={C.gold} opacity={outfit === 'LUNA' || outfit === 'GRETA' || outfit === 'RICO' || outfit === 'OSCAR' ? 0 : 1} />
        <path d="M280 120 L300 60 L250 105 Z" fill={C.gold} opacity={outfit === 'LUNA' || outfit === 'GRETA' || outfit === 'RICO' || outfit === 'OSCAR' ? 0 : 1} />
        {/* body */}
        <path d="M200 90 C300 90 330 170 330 250 C330 330 285 375 200 375 C115 375 70 330 70 250 C70 170 100 90 200 90 Z" fill={color} />
        <path d="M200 90 C300 90 330 170 330 250 C330 330 285 375 200 375" fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={6} />
        {/* belly */}
        <ellipse cx={200} cy={300} rx={78} ry={56} fill="#fff" opacity={0.16} />
        {/* arms */}
        <path d={`M78 240 Q30 ${270 + bob} 52 ${310 + bob}`} stroke={color} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d={`M322 240 Q370 ${250 - bob} 360 ${200 - bob}`} stroke={color} strokeWidth={26} strokeLinecap="round" fill="none" />
        {/* eyes */}
        {eyeXs.map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={180} rx={eyeR} ry={eyeR * blink} fill="#fff" />
            <circle cx={x + look} cy={182} r={eyeR * 0.45 * (blink > 0.5 ? 1 : 0)} fill={C.bg} />
            <circle cx={x + look + eyeR * 0.15} cy={176} r={eyeR * 0.14 * (blink > 0.5 ? 1 : 0)} fill="#fff" />
          </g>
        ))}
        {/* mouth with two teeth */}
        <path d="M160 245 Q200 280 240 245" fill={C.bg} stroke={C.bg} strokeWidth={4} />
        <rect x={180} y={246} width={12} height={12} rx={2} fill="#fff" />
        <rect x={208} y={246} width={12} height={12} rx={2} fill="#fff" />
        <Outfit who={outfit} color={color} frame={frame} />
      </g>
    </svg>
  );
};

const Outfit: React.FC<{who: string; color: string; frame: number}> = ({who, frame}) => {
  switch (who) {
    case 'ADAM': // tie + headset + clipboard
      return (
        <g>
          <path d="M70 175 Q70 95 200 95 Q330 95 330 175" fill="none" stroke="#1e293b" strokeWidth={10} />
          <rect x={52} y={160} width={30} height={46} rx={10} fill="#1e293b" />
          <path d="M66 205 Q90 260 150 262" stroke="#1e293b" strokeWidth={5} fill="none" />
          <circle cx={152} cy={262} r={7} fill="#1e293b" />
          <path d="M188 285 L212 285 L220 300 L200 360 L180 300 Z" fill="#1e293b" />
          <rect x={186} y={278} width={28} height={12} rx={3} fill="#334155" />
          <g transform={`rotate(${Math.sin(frame / 20) * 4} 360 200)`}>
            <rect x={330} y={150} width={60} height={80} rx={6} fill="#f8fafc" />
            <rect x={348} y={144} width={24} height={12} rx={3} fill="#64748b" />
            {[170, 185, 200, 215].map((y) => (
              <rect key={y} x={340} y={y} width={40} height={4} rx={2} fill="#94a3b8" />
            ))}
          </g>
        </g>
      );
    case 'LUNA': // sleeping cap + head lamp + coffee
      return (
        <g>
          <path d="M115 115 Q200 40 290 110 Q340 60 360 30" fill="#4c1d95" stroke="#4c1d95" strokeWidth={8} />
          <circle cx={362} cy={30} r={16} fill="#f8fafc" />
          <rect x={170} y={112} width={60} height={20} rx={8} fill="#1e293b" />
          <circle cx={200} cy={122} r={9} fill={C.gold} />
          <path d={`M200 122 L${150 + Math.sin(frame / 15) * 20} 20 L${250 + Math.sin(frame / 15) * 20} 20 Z`} fill={C.gold} opacity={0.12} />
          <rect x={330} y={180} width={44} height={52} rx={6} fill="#f8fafc" />
          <path d="M374 192 Q394 206 374 220" stroke="#f8fafc" strokeWidth={6} fill="none" />
          <path d={`M342 172 Q346 ${160 + Math.sin(frame / 8) * 4} 342 150`} stroke="#fff" strokeOpacity={0.5} strokeWidth={3} fill="none" />
        </g>
      );
    case 'OSCAR': // beret + scarf + quill
      return (
        <g>
          <ellipse cx={190} cy={100} rx={100} ry={30} fill="#1e293b" transform="rotate(-8 190 100)" />
          <circle cx={190} cy={70} r={8} fill="#1e293b" />
          <path d="M95 280 Q200 320 305 280 L300 300 Q200 340 100 300 Z" fill={C.gold} />
          <path d="M260 300 L280 370 L250 365 Z" fill={C.gold} />
          <path d={`M300 130 Q340 ${70 + Math.sin(frame / 10) * 6} 370 40`} stroke="#f8fafc" strokeWidth={10} strokeLinecap="round" fill="none" />
        </g>
      );
    case 'GRETA': // guard cap + magnifier + badge
      return (
        <g>
          <path d="M110 120 Q200 60 290 120 L290 135 L110 135 Z" fill="#1e293b" />
          <path d="M150 135 L250 135 L270 150 L130 150 Z" fill="#0f172a" />
          <circle cx={200} cy={105} r={10} fill={C.gold} />
          <path d="M120 300 L160 300 L160 336 L140 346 L120 336 Z" fill={C.gold} />
          <g transform={`rotate(${Math.sin(frame / 18) * 8} 360 200)`}>
            <circle cx={360} cy={190} r={34} fill="#bae6fd" fillOpacity={0.35} stroke="#1e293b" strokeWidth={10} />
            <rect x={350} y={222} width={14} height={50} rx={6} fill="#1e293b" transform="rotate(-20 357 247)" />
          </g>
        </g>
      );
    case 'MATILDA': // glasses + cardigan + card drawers
      return (
        <g>
          <circle cx={160} cy={180} r={38} fill="none" stroke="#1e293b" strokeWidth={7} />
          <circle cx={240} cy={180} r={38} fill="none" stroke="#1e293b" strokeWidth={7} />
          <path d="M198 180 L202 180" stroke="#1e293b" strokeWidth={7} />
          <path d="M122 190 Q110 260 140 300" stroke={C.gold} strokeWidth={3} fill="none" strokeDasharray="4 5" />
          <path d="M80 230 Q120 360 200 372 Q280 360 320 230 L300 360 L100 360 Z" fill="#e2e8f0" opacity={0.35} />
          <rect x={160} y={284} width={80} height={52} rx={6} fill="#1e293b" />
          <rect x={168} y={292} width={64} height={16} rx={3} fill="#334155" />
          <rect x={168} y={312} width={64} height={16} rx={3} fill="#334155" />
          <circle cx={200} cy={300} r={3} fill={C.gold} />
          <circle cx={200} cy={320} r={3} fill={C.gold} />
        </g>
      );
    case 'RICO': // postman cap + bag + paper plane
      return (
        <g>
          <path d="M110 125 Q200 70 290 125 Z" fill="#1e3a8a" />
          <path d="M200 125 L320 130 L300 145 L200 140 Z" fill="#0f172a" />
          <rect x={186} y={92} width={28} height={16} rx={4} fill={C.gold} />
          <path d="M100 160 L300 330" stroke="#78350f" strokeWidth={12} />
          <rect x={250} y={300} width={90} height={64} rx={10} fill="#92400e" />
          <g transform={`translate(${Math.sin(frame / 14) * 10} ${Math.cos(frame / 14) * 8})`}>
            <path d="M330 170 L400 140 L360 210 L352 184 Z" fill="#f8fafc" />
            <path d="M352 184 L400 140" stroke="#cbd5e1" strokeWidth={2} />
          </g>
        </g>
      );
    default:
      return null;
  }
};
