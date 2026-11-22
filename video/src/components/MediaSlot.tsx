import React from 'react';
import {Img, OffthreadVideo} from 'remotion';
import {findMedia} from '../lib/assets';
import {C, FONT, MONO} from '../theme';
import {Brackets} from './ui';

/**
 * Shows public/<base>.(mp4|webm|png|jpg) if it exists.
 * Otherwise renders `fallback` plus a label naming the file to drop in.
 */
export const MediaSlot: React.FC<{base: string; fallback: React.ReactNode; hint?: string; width: number; height: number; radius?: number}> = ({base, fallback, hint, width, height, radius = 16}) => {
  const media = findMedia(base);
  const fill: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover'};
  return (
    <div style={{position: 'relative', width, height, borderRadius: radius, overflow: 'hidden', background: 'radial-gradient(circle at 50% 40%, #1b2a4a 0%, #0b1224 75%)'}}>
      {media?.type === 'video' ? (
        <OffthreadVideo src={media.src} style={fill} muted />
      ) : media?.type === 'image' ? (
        <Img src={media.src} style={fill} />
      ) : (
        <>
          <div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.5}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{fallback}</div>
          <div style={{position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', direction: 'ltr'}}>
            <div style={{fontFamily: MONO, fontSize: 15, color: C.gold, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 6, border: `1px dashed ${C.gold}88`}}>
              PLACEHOLDER · public/{base}.mp4
            </div>
            {hint ? (
              <div style={{fontFamily: FONT, fontSize: 15, color: C.muted, background: 'rgba(0,0,0,0.55)', padding: '4px 10px', borderRadius: 6, direction: 'rtl', maxWidth: '100%'}}>{hint}</div>
            ) : null}
          </div>
        </>
      )}
      <Brackets color={`${C.mint}aa`} size={30} inset={12} />
    </div>
  );
};
