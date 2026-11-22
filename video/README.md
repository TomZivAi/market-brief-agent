# Tom Ziv · Control Room — Remotion promo

1920×1080 · 30fps · ~117s. Hebrew RTL, Heebo + JetBrains Mono bundled locally in `public/fonts`.

```bash
npm install
npm run dev        # Remotion Studio preview (http://localhost:3000)
npm run render     # -> out/tom-ziv-promo.mp4
npm run sfx        # regenerate UI sound effects into public/sfx
```

## What to edit
| What | Where |
|---|---|
| Agents (names, roles, looks, "important moment", terminal log) | `src/data/agents.ts` |
| Projects in the showcase | `src/data/projects.ts` |
| Numbers on the metrics screen | `src/data/metrics.ts` |
| Scene lengths | `src/timeline.ts` |
| Narration script with timecodes | `NARRATION.md` |

## Drop-in media (auto-detected, no code changes)
| File | Replaces |
|---|---|
| `public/agents/agent-01.mp4` … `agent-06.mp4` (or .webm/.png/.jpg) | the SVG monster placeholder on each agent card |
| `public/screens/project-01-website.png` … `project-04-youtube.png` | the animated mock inside the desktop frame |
| `public/voice/01_boot.mp3` … `06_outro.mp3` | narration per scene |
| `public/music/bed.mp3` | background music (plays at 18% volume, looped) |

Agent clips play muted and fill a 700×620 frame (cover). Generate them ~7s long so they cover the 6s card.

### Character prompt base (Kling / Veo / Higgsfield)
`Cute furry 3D cartoon monster character, Pixar-style, glossy, soft rim light, dark navy #0f172a background with faint mint grid, idle loop, friendly, centered, 16:9, no text —` + the agent's `look` from `agents.ts`.

## Privacy
The client-report mock uses a fictional client ("לקוח לדוגמה") and made-up figures. Do not drop real report screenshots into `public/screens/project-03-reports.*` unless every name and identifying detail is removed.
