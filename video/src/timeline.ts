// All scene lengths in frames (30fps). Narration timings in NARRATION.md follow these.
export const ROSTER_INTRO = 60;
export const ROSTER_PER_AGENT = 180; // 6s per agent
export const SHOWCASE_INTRO = 60;
export const SHOWCASE_PER_PROJECT = 240; // 8s per project

export const sceneLengths = (agentCount: number, projectCount: number) => ({
  boot: 360,
  roster: ROSTER_INTRO + ROSTER_PER_AGENT * agentCount,
  pipeline: 540,
  showcase: SHOWCASE_INTRO + SHOWCASE_PER_PROJECT * projectCount,
  metrics: 270,
  outro: 180,
});
