---
name: domain-hunt
description: Domain hunt — find, check, grade and register a product domain. Use when the user wants to name a product, find an available domain, check domain combos or prices, or buy a domain.
---

A domain hunt runs as widening rounds: generate a batch, check it, curate what's open, and let the user steer the next round. The user usually discovers what they want by reacting to real, available options, so put open domains in front of them early and often.

To check availability, run `check.mjs <domains…>` from this skill's directory (it needs Node 18+). It dedupes the list, sends batches of 20 to Cloudflare Registrar, and prints `OPEN name $price/yr` or `taken name reason`. Prices are Cloudflare's at-cost registration price. If it reports no output or an auth error, ask the user to run `! npx -y cf@latest auth login`; it needs a Cloudflare account, which is free to create.

## Steps

1. **Pin the real use.** Before generating anything, find out where the domain will actually appear: an email address people print (`slug@domain`), a URL said aloud, a consent screen, or a handle. Also note naming rules the project already has (for example PRODUCT.md or a brand doc). Done when you can write one concrete example of the domain in use, such as `brecksvilledental@example.ai`.

2. **Run rounds.** Each round is one idea direction, checked in bulk:
   - **Real words and obvious compounds** first. Expect these to be nearly all taken on .com, .ai and .co. One round is enough to show that.
   - **Thesaurus combos**: take the user's favorite word, expand it with real synonyms, and cross them with the prefixes and suffixes that fit the product (`get`, `try`, `hq`, a category word like `agent` or `studio`, …). Generate combos with a shell loop rather than by hand; 100–200 domains a round is normal.
   - **Swap the anchor word**: keep the suffix the user likes and replace the prefix (or the reverse).
   - **Exact name variants**: `the…`, `get…`, plural `…s…`, and other TLDs (.ai, .co, .io) when the .com is taken.

   After each round, show only what's open, grouped by what the name *means*, with a short pick and a reason. Drop forced or too-cute names, names that mean something else to the audience, and obvious collisions with known companies (for example Deputy or Envoy), and say why. Done when the user names a direction or a finalist.

3. **Grade finalists in real use.** Put each finalist into the step-1 example and score it in a table:
   - **Self-identifying**: does the reader the address is for (for example an AI agent) know it's meant for them from the words alone?
   - **Counter test**: can someone say it aloud once, across a counter or on the phone, and be understood without spelling it out?
   - **Spelling**: is there only one obvious way to type it? Watch for words that run together (`agentsentrance`) and plurals that get lost when spoken.
   - **Trust**: does the TLD fit the audience? .com is safest for small businesses; .ai is normal for AI products. TLD matters less than the name.

   Give a letter grade and one recommendation. Done when every finalist has a row.

4. **Compare prices** if the user asks: `vercel domains price <domain…>` against the Cloudflare price from `check.sh`. Note term minimums: .ai is a 2-year minimum, so the first charge is double the yearly price.

5. **Register only on an explicit go.** Registration is billable and non-refundable.
   1. Run `npx -y cf@latest registrar registrations create <domain> --dry-run` and tell the user the term and total cost.
   2. Then run it with `--force`.
   3. If it fails with "No registrant contact provided", Cloudflare has no default contact. Send the user to `https://dash.cloudflare.com/<account-id>/domains/registrations` (the account ID is in the dry-run URL) to add one, or to buy the domain in the dashboard. Never invent contact details.
   4. Confirm with `npx -y cf@latest registrar registrations get <domain>`.

   Done when status is `active`; report the expiry date and auto-renew setting.

## Traps

- Searching for a name before step 1 produces names graded on sound alone. The real use is what separates finalists.
- Don't present the full list of taken domains. Say which directions are exhausted in one line, then move on.
- Availability isn't trademark clearance. Say so when recommending, and offer a separate check.
