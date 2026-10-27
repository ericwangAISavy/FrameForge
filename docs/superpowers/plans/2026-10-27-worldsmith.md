# WORLDSMITH Implementation Plan

Goal: build the supplied portfolio brief in the existing empty checkout.
Architecture: server-rendered Next App Router pages, structured typed content, isolated client experiments with pure tested state transitions. Original SVG art and CSS; no WebGL or external imagery required.
Spec: user-supplied PROJECT WORLDSMITH brief. Experience attachment is fictional reference material only.

Global constraints: no unverified employment claims, fabricated identity, links, metrics, or game screenshots. All navigation and controls functional. Responsive, keyboard usable, reduced motion supported. Keep missing assets null.

Review focus: exclusive quest outcomes; invalid persisted data; competing network requests; invalid traversal; mobile overflow and keyboard focus.

- [x] Content and models: src/content/{profile,experience,projects,case-studies,experiments,verification,assets}.ts. Keep source employer metadata private and filter by verified before presentation.
- [x] Logic: tests/systems.test.ts fails before src/lib/systems.ts exists. Implement traversal commands, quest decisions, NPC transitions, and deterministic authoritative collection; verify rejection and recovery paths.
- [x] Main experience: src/app/page.tsx and shared components. Art-directed SVG hero, work features, engineering index, playground preview, editorial about, contact. Responsive CSS.
- [x] Detail routes: work, engineering/[slug], playground, about, contact, work/echoes-of-the-divide. Include diagrams, tradeoffs, edge cases, validation, code, memory concept interaction.
- [x] Metadata and states: sitemap, robots, PNG social preview, not-found, error, loading. Configurable deployment origin.
- [x] Validation: unit tests, typecheck, lint, production build, actual HTTP and browser interaction/mobile/keyboard checks. Document assets, verification, design and startup. Save environment installation/startup instructions.
