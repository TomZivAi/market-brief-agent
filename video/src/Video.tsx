import React from 'react';
import {AbsoluteFill, Audio, Sequence} from 'remotion';
import {agents} from './data/agents';
import {projects} from './data/projects';
import {findAudio} from './lib/assets';
import {sceneLengths} from './timeline';
import {FONT} from './theme';
import {Background} from './components/Background';
import {HUD} from './components/HUD';
import {Boot} from './scenes/Boot';
import {Roster} from './scenes/Roster';
import {Pipeline} from './scenes/Pipeline';
import {Showcase} from './scenes/Showcase';
import {Metrics} from './scenes/Metrics';
import {Outro} from './scenes/Outro';

const L = sceneLengths(agents.length, projects.length);

// voice file per scene: public/voice/<file>.mp3 (optional, auto-detected)
const SCENES = [
  {code: '01_BOOT', len: L.boot, C: Boot, voice: 'voice/01_boot'},
  {code: '02_ROSTER', len: L.roster, C: Roster, voice: 'voice/02_roster'},
  {code: '03_PIPELINE', len: L.pipeline, C: Pipeline, voice: 'voice/03_pipeline'},
  {code: '04_SHOWCASE', len: L.showcase, C: Showcase, voice: 'voice/04_showcase'},
  {code: '05_METRICS', len: L.metrics, C: Metrics, voice: 'voice/05_metrics'},
  {code: '05_OUTRO', len: L.outro, C: Outro, voice: 'voice/06_outro'},
];

let acc = 0;
const timeline = SCENES.map((s) => {
  const from = acc;
  acc += s.len;
  return {...s, from};
});

export const TOTAL_FRAMES = acc;

export const TomZivPromo: React.FC = () => {
  const music = findAudio('music/bed');
  return (
    <AbsoluteFill style={{direction: 'rtl', fontFamily: FONT, backgroundColor: '#0f172a'}}>
      <Background />
      {timeline.map(({code, from, len, C, voice}) => {
        const vo = findAudio(voice);
        return (
          <Sequence key={code} from={from} durationInFrames={len} name={code}>
            <C dur={len} />
            {vo ? <Audio src={vo} volume={1} /> : null}
          </Sequence>
        );
      })}
      {music ? <Audio src={music} volume={0.18} loop /> : null}
      <HUD scenes={timeline.map((t) => ({code: t.code, from: t.from}))} />
    </AbsoluteFill>
  );
};
