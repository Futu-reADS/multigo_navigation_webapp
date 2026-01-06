# quickstart.md

Quickstart for `001-pwa-login-dashboards` (Development & Validation)

## Prerequisites
- Node.js 18+ (LTS)
- npm or pnpm
- DevContainer support (VS Code Remote - Containers) available in repo (`.devcontainer/` exists)

## Local development (non-DevContainer)
1. Clone the feature branch:
   ```bash
   git checkout -b 001-pwa-login-dashboards
   ```
2. Bootstrap project (scaffolded by feature):
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173/` (default Vite port) and validate login -> dashboard navigation.

## DevContainer (recommended)
- Use the provided DevContainer to get a reproducible environment; open the repo in VS Code and reopen in container.
- After container starts, run the same commands (install, dev).
- **External browser validation**: After starting the dev server in the container, forward the port to the host and open it in a browser outside the DevContainer to validate external behavior and PWA install prompt.

## Run tests
- Unit tests (Vitest): `npm run test:unit`
- E2E (Playwright): `npm run test:e2e` (will run playwright tests for login -> dashboard and PWA offline checks)

## PWA validation steps (manual)
1. Open the app in Chromium (or other supported browser).
2. Open DevTools > Application: verify `manifest.webmanifest` is present and service worker is registered.
3. Go offline (DevTools Network > Offline) and refresh to verify Login/Dashboard static pages load from cache.
4. Try install flow: check for install prompt or browser UI to add to home/screen (behavior varies by browser).

## CI expectations
- Ensure `npm run build` succeeds and `npm run lint` and `npm run typecheck` pass.
- E2E tests (Playwright) run in CI on push/PR for the feature branch.
- A license check job runs to ensure permissive dependencies.

## Notes
- This quickstart assumes the project is scaffolded as a Vite React TypeScript app. If you prefer an alternative stack, see `research.md` for evaluated alternatives.
