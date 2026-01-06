# research.md — Phase 0 Research

This document captures research tasks to resolve NEEDS CLARIFICATION items from `plan.md`.

## Tasks & Findings

### 1) i18n scope for Phase 1 (EN/JA/ZH)
- Task: "Research whether P1 requires full EN/ZH translations or if EN+JA for P1 flows suffices for constitution compliance."
- Decision: Provide **EN + JA translations for P1 user journeys** (Login → Dashboard), and **prepare placeholder ZH** files with keys and TODOs for full translation in a later phase.
- Rationale: The constitution mandates EN/JA support for docs and P1 flows. Implementing EN+JA for P1 satisfies the constitution while deferring full ZH translations to a follow-up.
- Alternatives considered: JA-only (rejected as constitution requires EN support), full EN/JA/ZH now (more effort; deferred).

### 2) Build tooling & PWA plugin choice
- Task: "Evaluate Vite vs Next.js vs CRA for a small PWA frontend baseline. Choose PWA plugin strategy (vite-plugin-pwa vs Workbox directly)."
- Decision: Use **Vite** + **vite-plugin-pwa**.
- Rationale: Vite offers fast dev feedback, is lightweight, and integrates with `vite-plugin-pwa` which simplifies generating manifest and service worker (workbox runtime available). Next.js is heavier and optimized for SSR; not needed for this baseline. CRA is deprecated and slower.
- Alternatives considered: Next.js (too heavy), CRA (not recommended), custom Workbox (more config; we prefer the plugin convenience).

### 3) E2E runner for PWA installability and offline tests
- Task: "Determine best E2E tool for PWA installability/offline testing: Playwright vs Cypress vs Lighthouse CLI."
- Decision: Use **Playwright** for E2E (cross-browser: Chromium, Firefox, WebKit). Use Lighthouse (via `lighthouse-ci`) as an optional audit step to check PWA score in CI.
- Rationale: Playwright supports WebKit (Safari-like) and offline/network emulation; it can automate install flow checks and offline behavior. Lighthouse is useful for auditing PWA metrics but less suited for scripted install flows.

### 4) Caching strategy & update policy
- Task: "Define a caching strategy for Login and Dashboard static pages and update policy for service worker."
- Decision: Precache core assets and pages (Login + Dashboard shell) via plugin precache; use `StaleWhileRevalidate` for runtime assets and network-first for any API calls (if added later). Use update strategy with `skipWaiting`/`clientsClaim` on major updates and notify users when updates are available (UI toast).
- Rationale: Ensures Login and Dashboards are available offline, while allowing timely updates.

### 5) License/check tooling for CI
- Task: "Select a lightweight tool to detect copyleft or disallowed licenses in dependencies."
- Decision: Use `license-checker` (or `npm-license-checker`) in CI to scan production dependencies. Evaluate OSS review tooling if required.
- Rationale: `license-checker` is simple to integrate in GitHub Actions and can fail the build on disallowed licenses.

### 6) PWA test matrix & supported browsers
- Task: "Define a test matrix for PWA behavior (installability/offline) on target browsers and devices."
- Decision: Test on Chromium (latest), Firefox (latest), and WebKit (via Playwright) on desktop and tablet viewport sizes. Document quirks per browser in `research.md` and quickstart.


## Output (next steps)
- Add EN + JA translation files for P1 flows and i18n plumbing in `src/i18n/`.
- Add Playwright E2E test scaffolding and a sample test for login -> admin dashboard route and offline rendering.
- Add `vite-plugin-pwa` configuration to `vite.config.ts` with precache of Login/Dashboard.
- Add `license-checker` job to GitHub Actions CI.


---

*If you want, I can now implement the above decisions into scaffolding and create PRs for each artifact (PWA setup, i18n plumbing, tests, CI).*
