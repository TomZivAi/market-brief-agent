import React from 'react';
import {Audio, Sequence} from 'remotion';
import {findAudio} from '../lib/assets';

export type SfxName = 'click' | 'whoosh' | 'beep' | 'riser' | 'impact' | 'type' | 'ping' | 'deny';

/** Plays public/sfx/<name>.wav at frame `at` (relative to the parent sequence). */
export const Sfx: React.FC<{name: SfxName; at: number; volume?: number}> = ({name, at, volume = 0.6}) => {
  const src = findAudio(`sfx/${name}`);
  if (!src) return null;
  return (
    <Sequence from={at} durationInFrames={90} layout="none">
      <Audio src={src} volume={volume} />
    </Sequence>
  );
};
