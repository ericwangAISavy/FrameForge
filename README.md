# WORLDSMITH

An editorial gameplay-engineering portfolio with original SVG environments, five engineering studies, three working systems experiments, and an interactive narrative archive.

## Run

Use Node 24 and npm 11 (validated versions: Node 24.19.0, npm 11.9.0).

```sh
cd /workspace/FrameForge
npm ci --cache /workspace/.npm-cache
npm run dev
```

For production: `npm run build`, then `npm run start`. Both servers use port 3000. No database, API key, proprietary assets, external fonts, or game engine installation is required.

## Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Browser checks use the system Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` to an installed Chromium executable elsewhere. Playwright starts the production server automatically, so build first. Desktop and touch-mobile projects cover every route, overflow, navigation, state transitions, quest persistence, memory reconstruction, server authority, and reduced motion. Retained failure traces are ignored by Git.

See `VALIDATION.md` for executed checks and their limits.

## Content and identity

**The supplied experience profile is fictional.** No employer credits, work dates, years of experience or production results are presented as personal facts. Review `CONTENT_VERIFICATION.md` before publication.

- `src/content/profile.ts`: name, email, availability, editable draft biography, public origin.
- `src/content/experience.ts`: private editorial records; only `Verified` records may display employer/date/title.
- `src/content/projects.ts`: typed project features and classifications.
- `src/content/case-studies.ts`: five substantive illustrative engineering analyses.
- `src/content/experiments.ts`: lab descriptions.
- `src/content/assets.ts`: authorized assets, résumé, social links and repositories.
- `src/content/verification.ts`: verification vocabulary and source notice.
- `src/lib/systems.ts`: pure deterministic state logic used by the client demos and tests.

Set `NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.example` **at build time**, using your actual deployment origin. Without an origin the sitemap is empty and robots disallows indexing, avoiding a fabricated canonical domain. With the origin, sitemap and social metadata use it. Set a real name and confirmed email in profile.ts; add an authorized résumé PDF through assets.ts. Missing slots are deliberately omitted, never broken images or fake links.

The traversal lab is a discrete teaching model, not Unreal physics. NPC behavior is a manually stepped finite-state machine, not ML. Quest progress persists in sessionStorage with validation and a memory-only fallback if storage is unavailable. Memory reconstruction stays in component state. The network timeline simulates deterministic arrival ordering, not real transport. Combat and profiling pages are analyses, not claims of executable engine integrations.

## Structure

Next App Router + React + TypeScript; Tailwind v4 tooling with custom editorial CSS. Server components render content, with small client boundaries around navigation and interactions. CSS handles motion and reduced-motion fallbacks. No WebGL, animation library, analytics, tracking, or external content service.

## Deployment

Deploy with a Node-compatible Next.js host. Build and start commands above. Never commit secret values. Add approved content and assets before public launch; see `ASSET_GUIDE.md` and `DESIGN_DECISIONS.md`. Local onboarding does not publish a website or push commits.
