# Validation record

Validated locally in the cloud environment on 2026-10-27.

- Clean frozen install: `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed without lint diagnostics.
- `npm test`: 8 tests passed, 0 failed, 0 skipped.
- `npm run build`: passed; application routes and PNG social preview generated.
- `npm run test:e2e`: 20 tests passed across desktop (1440 × 1000) and touch-mobile (390 × 844), 0 failed, 0 skipped.
- Browser tests exercise all twelve content routes, 404 handling, real internal-link responses, social PNG, navigation, inspector, traversal, quest persistence and reset, unavailable storage, NPC transitions, memory reconstruction, deterministic collection, keyboard commands, reduced motion, breakpoint changes and disabled controls before client activation.
- Axe scans on home, work, traversal study, playground, about, contact and the concept archive found no automated WCAG 2 A/AA or 2.1 A/AA violations on either viewport. Automated checks are not a substitute for a complete assistive-technology audit.
- Development server (`npm run dev -- --port 3001`) serves home and playground; a browser input changes traversal to Running. Next.js dev origins explicitly include 127.0.0.1, permitting local HMR and client activation.
- Desktop and mobile screenshots were inspected. All scene art is original SVG/CSS.
- Read-only review identified ledge eligibility loss and menu visibility after resizing; both now have passing regression tests.

Toolchain: Node 24.19.0, npm 11.9.0, Next 16.4.3, React 19.3.1, system Chromium 154.0.8037.57. Exact dependency resolutions are in package-lock.json. Package installation reports ESLint 9 upstream deprecation; lint executes successfully. No TLS, checksum or signature verification was disabled. Playwright browser download was policy-blocked; installed Chromium supplied browser validation without network changes.

No live Core Web Vitals measurement, real engine build, commercial feature validation, website deployment, remote Git push or fresh-task snapshot restoration is claimed. The supplied career is fictional. Owner identity, contact, résumé, evidence, domain and public launch approval remain outstanding.

Environment install_script and start_skill were saved as a configuration draft. Publishing the environment is a user action separate from deploying the website; running processes must be restarted after snapshot restoration.

## Windows development compatibility update

A user reported `next dev` (Turbopack) exiting silently after Ready in Windows PowerShell. The screenshot does not identify the native exit cause; a Windows reproduction and exit code were not available locally.

- Default `npm run dev` now selects supported Webpack mode; `npm run dev:turbo` retains explicit access to Turbopack.
- The new `npm run test:dev` launches the actual development command, compiles all twelve content routes, exercises hydrated traversal/quest controls, follows client navigation and confirms the server remains reachable. Passed on Linux with Chromium (1 test).
- After these changes, typecheck, lint, all 8 unit tests and the production build passed.
- Playwright uses a configured browser, available system Chromium, or its managed browser rather than assuming a Linux path on Windows.
- Added GitHub Actions smoke coverage for Windows and Ubuntu on Node 24. Workflow definition is not itself proof of a passing Windows run.
- The smoke configuration deliberately runs one desktop project; production desktop/mobile coverage remains in the separate `test:e2e` suite. An initial inherited mobile smoke project was interrupted because its desktop-only navigation locator could not match; the configuration was corrected and the dedicated smoke test passed.

This update is a tested compiler-path workaround, not a claim that the exact Windows crash was reproduced or its root cause established. If Windows still exits, obtain Node version, terminal output and immediate PowerShell `$LASTEXITCODE` before further diagnosis.
