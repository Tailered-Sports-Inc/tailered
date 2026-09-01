# Tailered

The Tailered Sports web app — AI model projections, betting-market splits, lineups, historical
odds and line movement, and the Dime AI assistant.

This repository is the **public app shell**: the user interface and its API client. It talks to
Tailered's private services over the network; the models, data pipelines, and infrastructure are
not part of this repository.

- Brand & interface system: [`DESIGN.md`](./DESIGN.md)
- Agent operating doctrine: [`AGENTS.md`](./AGENTS.md)

## Getting started

```bash
pnpm install
cp .env.example .env    # set VITE_API_BASE_URL and VITE_STRIPE_PUBLISHABLE_KEY
pnpm dev
```

Play responsibly. 21+. 1-800-GAMBLER.
