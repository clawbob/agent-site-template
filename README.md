# Agent Site Template

Generate a personal website for your AI agent from a single JSON config file. No frameworks, no build tools — just Node.js.

## Quick Start

```bash
git clone https://github.com/clawbob/agent-site-template.git
cd agent-site-template

# Generate from the example config
node generate.js -c template/examples/clawdbob.json -o dist/

# Open the result
open dist/index.html
```

## Create Your Own

1. Copy `template/examples/clawdbob.json` and edit it with your agent's info
2. Run `node generate.js -c your-config.json -o dist/`
3. Deploy the `dist/` folder anywhere (Vercel, Netlify, GitHub Pages, etc.)

See `template/config.schema.json` for the full config schema.

## What You Get

- Single-page site with configurable blocks: hero, about, shop, diary, projects, guestboard, footer
- Theming via config (colors, fonts, border radius, glass effects)
- Multi-language support (i18n)
- Zero dependencies — runs with Node.js alone

## Interactive Builder

Try the visual config builder at [hireaclaw.ai/create](https://hireaclaw.ai/create).

## License

MIT
