# Multigo Navigation Webapp / マルチゴ ナビゲーション Webapp

A minimal Vite + React + TypeScript scaffold for the **001-pwa-login-dashboards** feature (PWA-enabled login → role dashboards). / PWA 対応のログイン → ロール別ダッシュボード機能の土台です。

---

## Quick start / クイックスタート ✅

- Install dependencies / 依存関係をインストール
  ```bash
  npm install
  ```

- Run development server / 開発サーバーを起動
  ```bash
  npm run dev
  # open http://localhost:5173/login
  ```

- Build for production / 本番ビルド
  ```bash
  npm run build
  npm run preview
  ```

- Type check / 型チェック
  ```bash
  npm run typecheck
  ```

---

## Tests / テスト 🧪

- Unit tests (Vitest + RTL)
  ```bash
  npm run test:unit
  ```
  Coverage (CI command):
  ```bash
  npm run test:unit -- --coverage
  ```
  Note: CI expects a coverage provider; this repo uses `@vitest/coverage-v8` and `coverage.provider = 'v8'` in `vitest.config.ts`.

- End-to-end tests (Playwright)
  ```bash
  npx playwright install --with-deps
  npm run test:e2e
  ```

- Lint & format
  ```bash
  npm run lint
  npm run lint:fix
  npm run format
  ```

---

## Development verification / 開発時の確認手順 🔧

1. Start dev server: `npm run dev` and open `http://localhost:5173/login`.
2. Confirm language switcher changes UI language (日本語 / English).
3. Select a role (Admin / 看護士 / 介護士) and click Proceed — you should be navigated to the role dashboard (`/admin`, `/nurse`, `/caregiver`).
4. For PWA behaviour: on dev server the service worker is enabled via `vite-plugin-pwa` devOptions — check for `<link rel="manifest">` on the page and confirm service worker registration in the browser devtools.

---

## Project layout & where to add future features / 推奨フォルダ構成 📁

Top-level:

```
/ (repo root)
├─ public/                    # static files, manifest.webmanifest, icons
├─ src/
│  ├─ components/             # reusable UI components (LanguageSwitcher, etc.)
│  ├─ pages/                  # route-level pages (LoginPage, AdminDashboard, ...)
│  ├─ hooks/                  # shared hooks (useUser)
│  ├─ services/               # API clients and business logic
│  ├─ i18n/                   # localization resources and init
│  ├─ assets/                 # images, styles
│  └─ main.tsx / App.tsx      # app bootstrap and router
├─ tests/
│  ├─ unit/                   # Vitest unit tests (React Testing Library)
│  └─ e2e/                    # Playwright E2E tests
├─ specs/                     # spec documents, tasks, checklists
├─ vitest.config.ts           # unit test config (coverage provider)
├─ vite.config.ts             # Vite + vite-plugin-pwa config
└─ package.json
```

- When adding new features, prefer to create a new folder under `src/pages/` and corresponding tests under `tests/unit/` and `tests/e2e/`.
- Add localization keys under `src/i18n/locales/{ja.json,en.json,zh.json...}`.

---

## PWA notes / PWA に関する注記 ⚙️

- The project uses `vite-plugin-pwa` configured in `vite.config.ts`. The manifest is in `public/manifest.webmanifest` and icons are under `public/icons/`.
- In development the plugin is configured with `devOptions.enabled = true` so E2E tests can validate manifest and service worker behaviour.
- E2E tests include manifest and offline/cache verification; see `tests/e2e/p2-pwa.spec.ts`.

---

## Contributing / 貢献の流れ ✍️

- Work from the tasks in `specs/001-pwa-login-dashboards/tasks.md` and update checklists.
- Make a branch per feature (e.g. `feat/<short-name>`), open a PR, run CI and request reviews.

---

If anything is unclear or you want me to add more sections (CI details, branch rules, changelog guidelines), tell me which part to expand. / 不明点や CI 詳細・ブランチルールを README に追加したい場合は指示してください。
