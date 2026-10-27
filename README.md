# WORLDSMITH

An editorial gameplay-engineering portfolio with original SVG environments, five engineering studies, three working systems experiments, and an interactive narrative archive.

## Run

Use Node 24 LTS. The original cloud validation used Node 24.19.0 and npm 11.9.0; updating npm globally is not required. Run these commands from your checkout directory on Windows, macOS or Linux.

```sh
npm ci
npm run dev
```

For production: `npm run build`, then `npm run start`. Both servers use port 3000. No database, API key, proprietary assets, external fonts, or game engine installation is required.

## Development server compatibility

`npm run dev` explicitly uses Webpack. A Windows report showed the default Turbopack process exiting silently immediately after startup; Webpack avoids that development compiler path. The screenshot alone does not establish the native exit cause, and Linux validation cannot prove that a Windows-specific crash is resolved. Turbopack remains available explicitly with `npm run dev:turbo`.

Open **http://localhost:3000** in Chrome. `0.0.0.0` is a listening address, not the address to browse. Keep the terminal running. After pulling this compatibility update, stop any old dev server and clear only Next's generated cache if needed:

```powershell
git pull --ff-only
npm ci
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
npm run dev
```

Only one dev server can use this checkout at a time, even on different ports. Stop your own server before running the development smoke test. If it still exits, capture `node --version`, the terminal output, and `$LASTEXITCODE` immediately after the failure. An exit code is important when native code terminates without a JavaScript stack trace. Do not disable antivirus or TLS verification as a workaround.

## Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run test:dev
```

Browser checks use `CHROMIUM_PATH` when set, an installed system Chromium on Linux when available, or Playwright’s managed Chromium on other systems. Install the managed browser with `npx playwright install chromium` on Windows/macOS or `npx playwright install --with-deps chromium` on Linux. Playwright starts the production server automatically, so build first. Desktop and touch-mobile projects cover every route, overflow, navigation, state transitions, quest persistence, memory reconstruction, server authority, and reduced motion. Retained failure traces are ignored by Git.

`test:dev` starts the actual development command on port 3100 and exercises every content route, hydrated gameplay controls and client navigation. GitHub Actions runs this smoke test on Windows and Ubuntu with Node 24. The production browser suite and the dev smoke suite are separate.

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
