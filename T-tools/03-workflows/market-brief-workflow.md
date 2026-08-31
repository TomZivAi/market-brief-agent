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

**Changed 2026-08-31, decided with Tom:** delivery is Telegram, not email. The Gmail-draft gap below is kept for history; it is no longer how this workflow ships the brief.

Every run, step 5:
1. Send the brief as a single Telegram message via a direct HTTPS POST (Bash + curl, no library needed):
   ```
   curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
     --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
     --data-urlencode "text@-" <<< "$BRIEF_TEXT"
   ```
   The bot token and chat ID are given directly in this session's own instructions (the routine prompt), never read from this repo or committed anywhere - this repo is public. If they are missing from the prompt, stop and flag it in the run report rather than guessing or skipping delivery silently.
2. Check the curl response for `"ok":true`. If it comes back `false` (e.g. bad token, bad chat id), flag the exact error in the run report - do not report "sent" on a failed call.
3. Brief is well under Telegram's 4096-char single-message limit per the length checklist item below, so no chunking logic is needed here (unlike the interactive bot at `T-tools/04-connections/telegram-bot/bot.py`, which does chunk for arbitrary-length replies).

**Historical note (superseded above):** the original target was Gmail auto-send. That never shipped: the connected Gmail tool schema (checked 2026-07-30) only exposed draft creation/update/search/labels, no send action. The workflow ran in Gmail-draft-only mode from 2026-07-30 to 2026-08-31 as a result. Telegram's `sendMessage` has no such gap - it is a genuine send, which is part of why Tom asked for the switch.

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
- [ ] Telegram `sendMessage` called and its response checked for `"ok":true`; a failure is flagged in the run report, never silently reported as sent

---

## REPORT

Keep it short, every run:
1. One line: what mattered most in tonight's brief.
2. The saved path.
3. Delivery status: sent via Telegram, or failed (with the exact error from the API response).

---

## OPEN ITEMS

- Recipient scope is Tom-only by decision (2026-07-30). Expanding to clients is a separate decision, not a default expansion of this workflow.
- **LIVE as of 2026-07-30**: routine `trig_01K9GuqitobZXscbUbS5qaiR` ("Nightly Market Brief") runs this workflow daily via `github.com/TomZivAi/market-brief-agent` (a scoped mirror repo, see `M-memory/learning-log.md`). That repo is public, not private, this was required to get the GitHub connector working and is a permanent state, not a temporary one.
- `cron_expression` is fixed UTC and does not track Israel's DST. It will drift an hour after the next DST change (late Oct 2026) unless manually updated via `RemoteTrigger update`. Not yet scheduled.

---

> **© Tom Even** · [getagents.today](https://www.getagents.today) · [agentsandme.com](https://www.agentsandme.com)
