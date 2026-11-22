import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Fonts are bundled in public/fonts (variable weights), so rendering works offline.
const face = (family: string, file: string, unicodeRange?: string) =>
  loadFont({family, url: staticFile(`fonts/${file}`), weight: '100 900', format: 'woff2', unicodeRange});

face('Heebo', 'heebo-hebrew-wght-normal.woff2', 'U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F');
face('Heebo', 'heebo-latin-wght-normal.woff2');
face('JetBrains Mono', 'jetbrains-mono-latin-wght-normal.woff2');

export const FONT = 'Heebo, sans-serif';
export const MONO = "'JetBrains Mono', Heebo, monospace";

export const C = {
  bg: '#0f172a',
  bgDeep: '#0a1020',
  panel: 'rgba(17, 28, 51, 0.82)',
  panelSolid: '#111c33',
  line: 'rgba(126, 200, 122, 0.18)',
  mint: '#7ec87a',
  gold: '#dfd04a',
  text: '#e8eef7',
  muted: '#8fa0b8',
  dim: '#475569',
  red: '#f87171',
};

export const W = 1920;
export const H = 1080;
export const FPS = 30;
