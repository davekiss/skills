# Domain debate

Before you recommend a purchase, argue your pick against a different model and refine it until the two of you reach **consensus**. The opponent catches what a single agent misses: a metaphor the buyer won't get, an analogy that's wrong underneath, a TLD that costs trust.

## Setup

Run the debate in herdr with Codex as the opponent.

1. Make a `debate/` folder in the scratchpad.
2. If `HERDR_ENV=1`, split the current pane: `herdr pane split --current --direction right --cwd <debate> --no-focus`. Otherwise you're outside herdr, so make an unfocused workspace and leave the user's focused pane alone: `herdr workspace create --cwd <debate> --label domain-debate --no-focus`. Take the pane ID from the JSON response.
3. Run `herdr agent start namer --kind codex --pane <pane-id> --timeout 90000`.
4. Read the pane (`herdr pane read <pane-id> --source visible`) before you prompt it. Codex can stop at startup for two reasons:
   - It updated itself and exited. Run `agent start` again.
   - It's asking whether to trust changed hooks. Choose "Continue without trusting" (`send-keys namer 3` then `enter`). Trusting hooks is the user's decision.

   Prompt it once the visible screen shows `Ask Codex`.

Done when Codex is at its prompt.

## Brief

Write `debate/brief.md`. The opponent sees only this file, so it carries everything:

- **The business**, in the user's words.
- **The buyer**, and the step-1 example of the domain in real use.
- **Every candidate** from every list the user shared, with grades, prices and how availability was verified.
- **The step-3 grading criteria.**
- **Your opening argument**: your pick, why it beats the strongest rival, and your honest concessions.
- **What to attack**: the two or three points where you are least sure.

## Rounds

Each round is one file each way. You write `claudeN.md`, then prompt:

```
herdr agent prompt namer "Read claudeN.md. Write roundN.md: <ask>. Verify any new name's availability first. 300 words max. Reply only: DONE roundN.md" --wait --timeout 500000
```

Then `cat debate/roundN.md`.

In each reply:

- **Concede** every point that lands, by name. A conceded name is out.
- **Push back with evidence** on the rest: the buyer's real context, how the term actually works, availability you re-verified.
- Bring a new name only after you've checked it yourself (`check.mjs`, or `whois-check.sh` for TLDs Cloudflare doesn't sell).

Stop at **consensus**: both sides name the same primary domain and the same secondaries, each with a role (main site, typo redirect, TLD hedge). That usually takes 3–5 rounds. When the user brings new evidence (research, a new list, a changed goal), run another round before you update the recommendation.

## Close

Report the result to the user in four parts:

- The consensus buy list, as a table with domain, role, cost per year and registrar.
- The key concessions on each side, one line each.
- What the debate leaves unresolved.
- Where the transcript lives.

Then park the agent: `herdr-park namer "<status>" "<next action>"`. If parking fails, leave the pane idle and tell the user where it is.
