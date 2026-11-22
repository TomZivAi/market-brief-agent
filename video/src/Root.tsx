import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {TomZivPromo, TOTAL_FRAMES} from './Video';
import {FPS, H, W} from './theme';

export const RemotionRoot: React.FC = () => (
  <Folder name="TomZiv">
    <Composition id="TomZivPromo" component={TomZivPromo} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="Thumbnail" component={TomZivPromo} width={W} height={H} />
  </Folder>
);
