// Generates original UI sound effects as WAV files into public/sfx (no external assets, no licensing).
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const SR = 44100;
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sfx');
mkdirSync(out, {recursive: true});

const wav = (samples) => {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + samples.length * 2, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(samples.length * 2, 40);
  samples.forEach((s, i) => buf.writeInt16LE(Math.max(-1, Math.min(1, s)) * 32767, 44 + i * 2));
  return buf;
};
const gen = (sec, fn) => Array.from({length: Math.floor(sec * SR)}, (_, i) => fn(i / SR, i));
let seed = 7;
const noise = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const sin = (f, t) => Math.sin(2 * Math.PI * f * t);

const sounds = {
  click: gen(0.06, (t) => (noise() * 0.5 + sin(2400, t) * 0.5) * Math.exp(-t * 90)),
  beep: gen(0.14, (t) => sin(1320, t) * 0.4 * Math.min(1, t * 400) * Math.exp(-t * 18)),
  ping: gen(0.6, (t) => (sin(1760, t) * 0.35 + sin(2640, t) * 0.15) * Math.exp(-t * 7)),
  deny: gen(0.35, (t) => (sin(220, t) > 0 ? 0.25 : -0.25) * (t < 0.15 || t > 0.2 ? 1 : 0) * Math.exp(-t * 5)),
  type: gen(1.2, (t) => {
    const k = (t * 22) % 1;
    return noise() * 0.35 * Math.exp(-k * 40) * (Math.floor(t * 22) % 5 === 3 ? 0 : 1);
  }),
  impact: gen(1.4, (t) => (sin(55 * Math.exp(-t * 3), t) * 0.8 + noise() * 0.25 * Math.exp(-t * 25)) * Math.exp(-t * 3.2)),
  riser: gen(3, (t) => (noise() * 0.12 + sin(80 + t * 120, t) * 0.2) * (t / 3) * Math.min(1, (3 - t) * 6)),
};
// whoosh: low-passed noise with a swelling envelope
{
  let lp = 0;
  sounds.whoosh = gen(0.7, (t) => {
    const a = 0.02 + 0.25 * Math.sin(Math.PI * (t / 0.7));
    lp += a * (noise() - lp);
    return lp * 1.6 * Math.sin(Math.PI * (t / 0.7));
  });
}

for (const [name, s] of Object.entries(sounds)) writeFileSync(join(out, `${name}.wav`), wav(s));
console.log('sfx written:', Object.keys(sounds).join(', '));
