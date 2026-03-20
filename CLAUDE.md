@AGENTS.md

# RulesForge

AI coding rules generator — pick framework, style, team size, get instant CLAUDE.md / .cursorrules / AGENTS.md.

## Stack
- Next.js 16 + React 19 + TypeScript + Tailwind v4
- Payment: x402-next (USDC on Base)
- Animations: Framer Motion
- Wallet: 0xCc97e4579eeE0281947F15B027f8Cad022933d7e

## Commands
```bash
npm run dev     # Development (localhost:4008)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

## Key Files
- `app/page.tsx` — Landing + generator (client component, form + live preview)
- `app/api/pro-pack/route.ts` — x402 payment endpoint ($29 USDC)
- `app/success/page.tsx` — Post-purchase page
- `lib/rules-data.ts` — Rule generation logic (frameworkOptions, styleOptions, teamSizeOptions, generateRules, proPackFiles)
- `components/x402/` — Shared checkout UI (X402Checkout, PaymentSuccess)
- `app/globals.css` — Tailwind v4 theme

## Port Assignment
Production port: 4008 (fleet-manager.sh)

## Architecture
- Single-page app with inline generator
- User selects: Framework (Next.js, etc.), Style (Strict TypeScript, etc.), Team Size (Solo, etc.)
- Free: generates basic rules file, copy-paste
- Pro Pack ($29): complete rules bundle for all frameworks + advanced configs

## Payment Flow
1. User configures rules (framework + style + team size)
2. Free rules generated inline — can copy
3. Clicks "Get Pro Pack" → X402Checkout modal
4. Shows wallet + $29 USDC on Base
5. Verify payment → returns full pro-pack files → redirect to /success

## Conventions
- Dark theme (bg-zinc-950)
- No icon libraries — use SVG/emoji
- Framer Motion for all animations
- x402 for payments (never Stripe)
- Cross-sell footer links to ecosystem products
