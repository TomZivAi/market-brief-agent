# Market Brief Workflow

This file is the runtime source of truth for the nightly market/macro/geopolitics brief. It is a STANDING workflow, not an on-demand build: it is meant to be triggered by a scheduled task every night, not typed by Tom in a live conversation, though it can also be run manually for testing.

Produces: one email-ready brief in Tom's inbox every morning, replacing his own reading of the financial press.

Recipient (current phase): Tom only. Not client-facing, do not add recipients without an explicit decision logged here.

---

## HOW THIS RUNS (the contract)

- **One role, one pass.** Unlike the Content/Communication/Decision tracks, there is no Copywriter/Gatekeeper chain here. The Market Analyst (`A-agents/market-analyst-agent.md`) gathers, drafts, and self-checks against its own Quality Bar in one pass. Speed and unattended reliability matter more than a second reviewing pair of eyes that does not exist at 5 AM.
- **Web is ALWAYS ON.** This is the one workflow in the system where WebSearch/WebFetch are mandatory every run. See the agent file for sourcing discipline (web-research-skill Rule 0-6).
- **Read once.** Load the LOAD ONCE set a single time per run.

---

## LOAD ONCE

- `C-core/snapshot.md` (Quick Facts only)
- `M-memory/feedback-system.md` (apply `[all]` + `[market-analyst]`)
- `T-tools/02-skills/market-brief-skill/market-brief-skill.md`
- `T-tools/02-skills/web-research-skill/web-research-skill.md` (Rule 0-6)
- `A-agents/market-analyst-agent.md` (the role's judgment and scope)

---

## RUN SEQUENCE

1. **Gather.** Per the agent file's Scope section: Israeli market, US/global overnight, macro data, geopolitics with a market read-through. Last 24-48h only.
2. **Draft.** Per `market-brief-skill.md` structure exactly. Every line sourced and timestamped.
3. **Self-check.** Run the Quality Bar in `market-analyst-agent.md` before moving to save/deliver. If it fails 2+ checks, cut and rebuild the weak section before proceeding, do not ship a failing draft.
4. **Save.** `O-output/daily-briefs/YYYY-MM-DD.md` (separate from client project folders in `O-output/NN-slug/`, this is not a numbered client project).
5. **Deliver.** See DELIVERY below.

---

## DELIVERY (current state, read before assuming this is automatic)

End-state target, as decided with Tom: auto-send by email, every morning, no manual step.

**Confirmed gap (checked directly against the connected Gmail tool schema, 2026-07-30):** the Gmail connection has draft creation/update, search, and labels. There is no send action at all, not a permissions issue, the capability is not present in this connection.

**Launch mode, decided with Tom (2026-07-30):** start now with drafts, do not wait for send to be wired. Every run:
1. Creates a Gmail draft with the brief as the body, subject `תקציר בוקר: DD.MM.YYYY`, waiting in Tom's drafts by 06:30.
2. Flags in its run report that delivery is draft-only pending real send capability, so this is never silently mistaken for the auto-send Tom actually wants.

When a send-capable connection is confirmed (see `M-memory/learning-log.md` open item), remove this note and switch step 5 to send directly, no draft step, no code change needed elsewhere in this workflow.

---

## SCHEDULING (outside this repo)

Run time, decided with Tom: **06:30 Israel time, every day.**

This workflow does not trigger itself. It runs via a scheduled task configured with:
- Fixed run time 06:30 daily.
- Web access granted for that run (WebSearch/WebFetch), which is off by default everywhere else in this system.
- The Gmail connection, for the draft-mode delivery per DELIVERY above.

This is infrastructure setup, not a file in `T-tools/`. See `M-memory/learning-log.md` for confirmation once the scheduled task itself exists.

---

## CHECKLIST (pre-send gate)

- [ ] Every factual line sourced and timestamped
- [ ] Zero advice language
- [ ] Zero vague quantifiers
- [ ] Zero em/en dashes
- [ ] Under ~450 words / 3-minute read
- [ ] Saved to `O-output/daily-briefs/YYYY-MM-DD.md`
- [ ] Delivery attempted; fallback-to-draft flagged in the run report if send was unavailable

---

## REPORT

Keep it short, every run:
1. One line: what mattered most in tonight's brief.
2. The saved path.
3. Delivery status: sent, or fell back to draft (and why).

---

## OPEN ITEMS

- Send capability for the connected Gmail account is unconfirmed. Resolve before this workflow can deliver the way Tom actually asked for.
- Recipient scope is Tom-only by decision (2026-07-30). Expanding to clients is a separate decision, not a default expansion of this workflow.

---

> **© Tom Even** · [getagents.today](https://www.getagents.today) · [agentsandme.com](https://www.agentsandme.com)
