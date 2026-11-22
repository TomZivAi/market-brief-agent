import {Easing, interpolate, spring} from 'remotion';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 0 -> 1 -> 0 envelope over a scene of `dur` frames */
export const fadeInOut = (frame: number, dur: number, inLen = 15, outLen = 15) =>
  interpolate(frame, [0, inLen, dur - outLen, dur], [0, 1, 1, 0], clamp);

export const rise = (frame: number, fps: number, delay = 0, damping = 16) =>
  spring({frame: frame - delay, fps, config: {damping, mass: 0.7}});

export const ease = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1)});

/** number of characters visible for a typewriter effect */
export const typed = (frame: number, start: number, text: string, cps = 1.6) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) * cps)));
