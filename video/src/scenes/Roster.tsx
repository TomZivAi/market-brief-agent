import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Agent, agents} from '../data/agents';
import {clamp, ease, rise} from '../lib/anim';
import {ROSTER_INTRO, ROSTER_PER_AGENT} from '../timeline';
import {C, FONT, MONO} from '../theme';
import {MediaSlot} from '../components/MediaSlot';
import {Monster} from '../components/Monster';
import {Sfx} from '../components/Sfx';
import {Terminal} from '../components/Terminal';
import {Panel, SceneTitle, StatusBadge} from '../components/ui';

const AgentCard: React.FC<{agent: Agent; index: number}> = ({agent, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = ROSTER_PER_AGENT;
  const inP = rise(frame, fps, 0, 15);
  const outP = interpolate(frame, [dur - 14, dur], [0, 1], clamp);
  const x = (1 - inP) * 260 - outP * 260;
  const opacity = Math.min(inP, 1 - outP);
  const moment = rise(frame, fps, 38);

  return (
    <AbsoluteFill style={{opacity, transform: `translateX(${x}px)`}}>
      {/* RTL: media on the right */}
      <div style={{position: 'absolute', right: 110, top: 150}}>
        <Panel style={{padding: 18}} glow={agent.color}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, direction: 'ltr'}}>
            <div style={{fontFamily: MONO, fontSize: 22, color: C.muted, display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{width: 12, height: 12, borderRadius: '50%', background: C.red, opacity: Math.floor(frame / 10) % 2 ? 1 : 0.3}} />
              REC · {agent.cam}
            </div>
            <StatusBadge />
          </div>
          <MediaSlot base={agent.media} width={700} height={620} hint={agent.look} fallback={<Monster color={agent.color} eyes={agent.eyes} outfit={agent.nameEn} size={400} seed={index} />} />
        </Panel>
      </div>
      {/* info on the left */}
      <div style={{position: 'absolute', left: 110, top: 150, width: 860, fontFamily: FONT}}>
        <div style={{fontFamily: MONO, color: agent.color, fontSize: 24, letterSpacing: 6, direction: 'ltr', textAlign: 'right'}}>
          AGENT {String(index + 1).padStart(2, '0')} · {agent.nameEn}
        </div>
        <div style={{fontSize: 140, fontWeight: 900, color: C.text, lineHeight: 1.05}}>{agent.name}</div>
        <div style={{fontSize: 38, color: C.muted, fontWeight: 500, marginTop: 6}}>{agent.role}</div>
        <div style={{marginTop: 28, opacity: moment, transform: `translateY(${(1 - moment) * 24}px)`}}>
          <div style={{borderRight: `5px solid ${C.gold}`, background: 'rgba(223,208,74,0.07)', borderRadius: 10, padding: '16px 22px'}}>
            <div style={{fontSize: 22, color: C.gold, fontWeight: 700}}>
              ★ רגע חשוב {agent.momentDate ? <span style={{fontFamily: MONO, color: C.muted, fontWeight: 400}}>· {agent.momentDate}</span> : null}
            </div>
            <div style={{fontSize: 30, color: C.text, marginTop: 6, lineHeight: 1.35}}>{agent.moment}</div>
          </div>
        </div>
        <div style={{marginTop: 26, opacity: ease(frame, 10, 22)}}>
          <Terminal lines={agent.log} title={`${agent.nameEn.toLowerCase()}.log`} start={14} cps={1.8} gap={3} fontSize={21} />
        </div>
      </div>
      <Sfx name="whoosh" at={0} volume={0.45} />
      <Sfx name="beep" at={8} volume={0.35} />
      <Sfx name="type" at={14} volume={0.22} />
      <Sfx name="click" at={38} volume={0.5} />
    </AbsoluteFill>
  );
};

export const Roster: React.FC<{dur: number}> = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={ROSTER_INTRO}>
      <SceneTitle code="02_ROSTER" title="תכירו את הצוות" sub={`${agents.length} סוכנים · משמרת 24/7`} dur={ROSTER_INTRO} />
      <Sfx name="impact" at={0} volume={0.5} />
    </Sequence>
    {agents.map((a, i) => (
      <Sequence key={a.nameEn} from={ROSTER_INTRO + i * ROSTER_PER_AGENT} durationInFrames={ROSTER_PER_AGENT}>
        <AgentCard agent={a} index={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
