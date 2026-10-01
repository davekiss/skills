# skills

Agent skills I use with Claude Code.

Each skill lives in its own directory with a `SKILL.md`. To use one, copy or symlink its folder into `~/.claude/skills/`.

## Skills

- [domain-hunt](domain-hunt/): find, check, grade and register a domain for a product. It checks availability and prices in bulk on Cloudflare Registrar, then grades finalists by how they hold up in real use (said aloud, typed, printed in an email address). Needs Node 18+ and a Cloudflare account.
