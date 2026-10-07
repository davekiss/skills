# skills

Agent skills I use with Claude Code.

Each skill lives in its own directory with a `SKILL.md`. To use one, copy or symlink its folder into `~/.claude/skills/`.

## Skills

- [domain-hunt](domain-hunt/): find, check, grade, debate and register a domain for a product. It checks availability and prices in bulk on Cloudflare Registrar (and through the registry's WHOIS for TLDs Cloudflare doesn't sell), runs several search rounds before reporting, and grades finalists by how they hold up in real use (said aloud, typed, printed in an email address). Before recommending a purchase, it argues its pick against Codex in [herdr](https://herdr.dev) until both agree on a buy list. Needs Node 18+ and a Cloudflare account; the debate needs herdr and Codex.
