# Nightly Market Brief — Entry Point

This repo is a scoped mirror of one workflow from Tom Even's larger agent system ("the-system"). It exists only so a cloud scheduled routine has something to clone: the full system lives in a separate local, non-hosted folder that is not pushed here (it holds client data and cannot leave the local machine).

## What to do, every run

1. Read `C-core/snapshot.md`, `M-memory/snapshot.md`, `M-memory/feedback-system.md` (apply entries tagged `[all]` and `[market-analyst]`).
2. Run `T-tools/03-workflows/market-brief-workflow.md` end to end, exactly as written. It is self-contained: LOAD ONCE list, RUN SEQUENCE, DELIVERY, CHECKLIST, REPORT.
3. This run requires WebSearch/WebFetch (the workflow needs live information from the last 24-48 hours) and the connected Gmail tools (the workflow creates a Gmail draft, it does not send — see the workflow's DELIVERY section for why, and do not attempt to send even if a send tool appears to be available, until a human has changed that section).
4. Save the brief to `O-output/daily-briefs/YYYY-MM-DD.md` as instructed in the workflow. This repo's git history is the only place this actually persists across runs (each cloud run gets a fresh checkout), so if committing back to this repo is possible, do it; if not, the Gmail draft is the durable copy.

## Keeping this in sync

This is a mirror, not the source of truth. When Tom or Adam (his COO agent) edits the agent, skill, or workflow file inside the real system, the matching file here needs a manual copy-over. If a run here ever looks stale or wrong, check the equivalent file in the main system before assuming the workflow itself is broken.
