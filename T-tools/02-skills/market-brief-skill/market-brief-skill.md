---
name: market-brief-skill
description: Format spec for the nightly market/macro/geopolitics brief. Use when running the market-analyst-agent or the market-brief-workflow. Not for client-facing content.
---

# Market Brief Skill

The shape of the daily brief the Market Analyst produces. A working document for Tom, not a publishable piece. No voice-dna, no ICP framing, no persuasion. Just: what happened, sourced, fast to read.

---

## Length

300-450 words total, excluding sources. Target read time: 3 minutes. If it runs long, cut the weakest section before trimming sentences inside a strong one.

---

## Structure

```markdown
# תקציר בוקר: [יום, DD.MM.YYYY]

## שווקים בעולם ובישראל
- [Move] — [number, e.g. "עלה 0.4%"] — [source, HH:MM/date]
- ...

## מאקרו
- [Data point or Fed/BoI signal] — [what it means in one clause] — [source, date]
- ...

## גיאופוליטיקה
- [Development] — [market/macro read-through in one clause] — [source, date]
- ...

## מה לעקוב היום
- [1-3 scheduled events/releases today that could move markets, with expected time]

---
**מקורות:** [list of sources used, with links]
```

Any section with nothing genuinely new in the last 24h gets a single line: "אין עדכון מהותי מהיממה האחרונה" — not padded to look full.

---

## Hard Rules

1. **Every factual line carries a source and a timestamp or date.** No exceptions. "לפי דיווחים" is not a source; a named outlet or data release is.
2. **No advice language.** Never "כדאי," "מומלץ," "should," or a directed action. Report what happened and the read-through, not what the reader should do about it.
3. **No vague quantifiers.** Not "השוק עלה משמעותית" — the actual number, or nothing.
4. **Two sources for anything presented as settled fact.** One source gets flagged as a single-source claim in the line itself (e.g., "לפי [מקור] בלבד").
5. **Zero em dashes (—) or en dashes (–).** Periods or commas.
6. **Hebrew**, matching how Tom reads his own working documents. Numbers and tickers can stay in their native form (S&P 500, USD/ILS).

---

## Common Mistakes to Avoid

- Padding a quiet night to look thorough. A short brief on a quiet night is correct, not incomplete.
- Burying the one thing that actually matters under three things that do not.
- Copying a headline without the number behind it.
- Letting "מה לעקוב היום" become a generic economic calendar dump instead of the 1-3 things that could actually move things today.

---

> **© Tom Even** · [getagents.today](https://www.getagents.today) · [agentsandme.com](https://www.agentsandme.com)
