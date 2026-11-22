import {getStaticFiles, staticFile} from 'remotion';

const VIDEO = ['mp4', 'webm', 'mov'];
const IMAGE = ['png', 'jpg', 'jpeg', 'webp'];
const AUDIO = ['mp3', 'wav', 'm4a'];

const find = (base: string, exts: string[]) => {
  const names = new Set(getStaticFiles().map((f) => f.name));
  for (const ext of exts) {
    const name = `${base}.${ext}`;
    if (names.has(name)) return {src: staticFile(name), name};
  }
  return null;
};

export type FoundMedia = {type: 'video' | 'image'; src: string; name: string} | null;

/** Looks for public/<base>.(mp4|webm|mov|png|jpg|webp). Returns null when missing. */
export const findMedia = (base: string): FoundMedia => {
  const v = find(base, VIDEO);
  if (v) return {type: 'video', ...v};
  const i = find(base, IMAGE);
  if (i) return {type: 'image', ...i};
  return null;
};

export const findAudio = (base: string) => find(base, AUDIO)?.src ?? null;
