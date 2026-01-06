# Tasks: Simple PWA — Login & Dashboards

This `tasks.md` organizes work by phases and user stories. Follow the checklist format strictly; each task includes an ID, optional [P] (parallelizable) and a [USx] story label when applicable.

---

## Phase 1 — Setup (project initialization)

- [X] T001 [P] Initialize Vite React + TypeScript project and add `package.json`, `vite.config.ts`, `tsconfig.json` at project root / Vite + React + TypeScript プロジェクトを初期化し、ルートに `package.json`, `vite.config.ts`, `tsconfig.json` を追加する
- [X] T002 [P] Add repository-level `.gitignore` with `node_modules/`, `dist/`, `.env`, editor files (`.vscode/`, `.idea/`) — file: `/.gitignore` / リポジトリルートに `node_modules/`, `dist/`, `.env`, エディタファイルなどを除外する `.gitignore` を追加する
- [X] T003 [P] Create basic `public/manifest.webmanifest` and placeholder icons under `public/icons/` / `public/manifest.webmanifest` と `public/icons/` にプレースホルダアイコンを作成する
- [X] T004 [P] Add initial PWA plugin configuration sample to `vite.config.ts` (e.g., `vite-plugin-pwa`) — file: `vite.config.ts` / `vite.config.ts` に `vite-plugin-pwa` 等の初期 PWA プラグイン設定サンプルを追加する
- [X] T005 [P] Add basic DevContainer and docs: `.devcontainer/devcontainer.json` and `specs/001-pwa-login-dashboards/quickstart.md` / `.devcontainer/devcontainer.json` と `specs/001-pwa-login-dashboards/quickstart.md` を追加して DevContainer とドキュメントを整備する
- [X] T006 Add initial README update documenting feature and development steps — file: `README.md` / `README.md` を更新して機能と開発手順を記載する

## Phase 2 — Foundational (blocking prerequisites)

- [X] T007 Configure TypeScript `strict: true` in `tsconfig.json` and add `tsc --noEmit` CI script — file: `tsconfig.json` / `tsconfig.json` で `strict: true` を設定し、CI スクリプトに `tsc --noEmit` を追加する
- [X] T008 [P] Add ESLint + Prettier + TypeScript ESLint config and scripts — files: `.eslintrc.js`, `.prettierrc` and `package.json` scripts / ESLint、Prettier、TypeScript ESLint の設定とスクリプトを追加する（`.eslintrc.js`, `.prettierrc`, package.json スクリプト）
- [X] T009 Setup testing frameworks: Vitest + @testing-library/react config — files: `vitest.config.ts`, `tests/unit/setup.ts` / Vitest と @testing-library/react の設定を追加する（`vitest.config.ts`, `tests/unit/setup.ts`）
- [X] T010 Setup E2E test runner (Playwright) and add basic config — files: `playwright.config.ts`, `tests/e2e/playwright/` / E2E テストランナー（Playwright）を設定し基本設定を追加する（`playwright.config.ts`, `tests/e2e/playwright/`）
- [X] T011 [P] Add `i18n` plumbing using `i18next` with base JA translations and keys — files: `src/i18n/index.ts`, `src/i18n/locales/ja.json` / `i18next` を用いた i18n 基盤を追加し、JA の翻訳ファイルとキーを配置する（`src/i18n/index.ts`, `src/i18n/locales/ja.json`）
- [X] T012 [P] Add license-check job/tool and CI skeleton (GitHub Actions) with jobs for type-check, lint, unit tests — files: `.github/workflows/ci.yml` / ライセンスチェックツールと CI の骨組みを追加する（`.github/workflows/ci.yml`）
- [X] T013 [P] Add a `specs/001-pwa-login-dashboards/checklists/requirements.md` (should already exist) and ensure it is up-to-date — file: `specs/001-pwa-login-dashboards/checklists/requirements.md` / `specs/001-pwa-login-dashboards/checklists/requirements.md` を追加または更新して要件チェックリストを整備する

## Phase 3 — User Stories (priority order)

### User Story 1 (P1): Login → Dashboard transition

Goal: Provide a Login page where user selects a role (radio/dropdown) and navigates to `/admin`, `/nurse`, or `/caregiver`.

- [X] T014 [US1] Create `src/pages/LoginPage.tsx` with role selection (radio or select) and a proceed button / ロール選択（ラジオ/セレクト）と進むボタンを持つ `src/pages/LoginPage.tsx` を作成する
- [X] T015 [US1] Create dashboard pages: `src/pages/AdminDashboard.tsx`, `src/pages/NurseDashboard.tsx`, `src/pages/CaregiverDashboard.tsx` / `src/pages/AdminDashboard.tsx`, `src/pages/NurseDashboard.tsx`, `src/pages/CaregiverDashboard.tsx` を作成する
- [X] T016 [US1] Add routing in `src/App.tsx` to include routes `/login`, `/admin`, `/nurse`, `/caregiver` and default redirect to `/login` / `src/App.tsx` に `/login`, `/admin`, `/nurse`, `/caregiver` のルートとデフォルトリダイレクトを追加する
- [X] T017 [US1] Implement a simple in-memory `User` model and `selectRole(role)` action using `src/models/user.ts` (or `src/hooks/useUser.ts`) that persists role to `sessionStorage` / `src/models/user.ts` または `src/hooks/useUser.ts` に簡易な `User` モデルと `selectRole(role)` を実装し、`sessionStorage` にロールを保持する
- [X] T018 [US1] Add unit tests (Vitest + RTL) for `LoginPage` verifying selecting each role navigates to the correct route — files: `tests/unit/LoginPage.spec.tsx` / `LoginPage` の単体テスト（Vitest + RTL）を追加し、各ロール選択が正しいルートに遷移することを検証する（`tests/unit/LoginPage.spec.tsx`）
- [X] T019 [US1] Add Playwright E2E test to verify role selection navigates to correct dashboard — file: `tests/e2e/p1-login-to-dashboard.spec.ts` / 役割選択が適切なダッシュボードに遷移することを検証する Playwright E2E テストを追加する（`tests/e2e/p1-login-to-dashboard.spec.ts`）
- [X] T020 [US1] Add UI safeguards to prevent invalid role selection (form validation) — file: `src/pages/LoginPage.tsx` / 無効なロール選択を防ぐフォームバリデーションを `src/pages/LoginPage.tsx` に追加する

### User Story 2 (P2): PWA installability

Goal: App is installable (manifest + service worker) and Login/Dashboard static views render from cache when offline.

- [X] T021 [US2] Finalize `public/manifest.webmanifest` fields (name, short_name, icons, start_url, display) / `public/manifest.webmanifest` の必須フィールド（name, short_name, icons, start_url, display）を完成させる
- [X] T022 [US2] Configure `vite-plugin-pwa` in `vite.config.ts` with caching strategy to precache Login and dashboard routes / `vite.config.ts` に `vite-plugin-pwa` を設定し、ログインとダッシュボードルートを事前キャッシュするキャッシュ戦略を構成する
- [X] T023 [US2] Add service worker customizations (if needed) under `src/sw/` — file: `src/sw/custom-sw.ts` / 必要に応じて `src/sw/` に Service Worker のカスタマイズを追加する（`src/sw/custom-sw.ts`）
- [X] T024 [US2] Add Playwright E2E test verifying manifest presence and ability to load Login/Dashboard from cache when offline — file: `tests/e2e/p2-pwa.spec.ts` / manifest の存在とオフライン時に Login/Dashboard をキャッシュから読み込めることを検証する Playwright E2E テストを追加する（`tests/e2e/p2-pwa.spec.ts`）
- [ ] T025 [US2] Add a browser compatibility & test matrix doc in `specs/001-pwa-login-dashboards/research.md` describing which browsers are considered for installability tests / インストール可能性テスト対象ブラウザを記載した互換性・テストマトリクスを `specs/001-pwa-login-dashboards/research.md` に追加する

### User Story 3 (P3): Developer folder structure & extensibility

Goal: Document and implement a folder structure that makes adding shared and role-specific features straightforward.

- [ ] T026 [US3] Create feature directories: `src/features/dashboard-common/`, `src/features/dashboard-admin/`, `src/features/dashboard-nurse/`, `src/features/dashboard-caregiver/` with README placeholders / `src/features/dashboard-common/`, `src/features/dashboard-admin/`, `src/features/dashboard-nurse/`, `src/features/dashboard-caregiver/` に README プレースホルダを含むディレクトリを作成する
- [ ] T027 [US3] Add example shared component (e.g., `src/features/dashboard-common/Header.tsx`) and example admin-only component (`src/features/dashboard-admin/AdminPanel.tsx`) / 例として共有コンポーネント（`src/features/dashboard-common/Header.tsx`）と管理者専用コンポーネント（`src/features/dashboard-admin/AdminPanel.tsx`）を追加する
- [ ] T028 [US3] Document recommended folder structure and contribution notes in `specs/001-pwa-login-dashboards/structure.md` and update `README.md` / 推奨フォルダ構成と貢献ノートを `specs/001-pwa-login-dashboards/structure.md` と `README.md` にドキュメント化する
- [ ] T029 [US3] Add a validation task: add a simple feature under `src/features/dashboard-common/` and import it into all dashboards to verify structure works — file(s): `src/features/...` and `src/pages/*` / `src/features/dashboard-common/` に簡単な機能を追加し、全ダッシュボードでインポートして構成が機能することを検証する（ファイル: `src/features/...`, `src/pages/*`）

## Final Phase — Polish & Cross-cutting Concerns

- [ ] T030 [P] Add full CI: type-check, lint, unit, e2e (playwright) and localization checks — file: `.github/workflows/ci.yml` / type-check, lint, unit, e2e, localization チェックを含むフル CI を `.github/workflows/ci.yml` に追加する
- [ ] T031 [P] Add localization: populate `src/i18n/locales/en.json` & `src/i18n/locales/ja.json` with P1 strings; add TODO placeholder for ZH — files: `src/i18n/locales/*.json` / `src/i18n/locales/en.json` と `src/i18n/locales/ja.json` に P1 用の文字列を用意し、ZH は TODO プレースホルダを追加する
- [ ] T032 [P] Add license-check job to CI and run license-checker locally — file: `.github/workflows/license.yml` and `package.json` scripts / ライセンスチェックジョブを CI に追加し、ローカルで `license-checker` を実行する（`.github/workflows/license.yml` と package.json スクリプト）
- [ ] T033 [P] Add quickstart instructions for running locally and running Playwright E2E in `specs/001-pwa-login-dashboards/quickstart.md` / `specs/001-pwa-login-dashboards/quickstart.md` にローカル起動方法と Playwright E2E の実行手順を記載する
- [ ] T034 [P] Final verification: run the full CI locally (or via GH Actions) and fix any blocking issues; ensure all tests pass — (no single file) / フル CI を実行してブロッキングな問題を解消し、すべてのテストが通ることを確認する

---

## Dependencies & Story Completion Order

- Phase 1 (Setup) tasks should be completed before Foundational tasks that depend on tooling. (e.g., T001 → T007)
- Foundational tasks (Phase 2) should be completed before User Stories (e.g., T007..T013 → T014..T029)
- User Story order (priority): **US1 (P1)** → **US2 (P2)** → **US3 (P3)**; however some US tasks are parallelizable once foundational tasks are complete.

## Parallel execution examples

- T001, T002, T003, T004 can run in parallel (independent files and config changes) — marked with [P].
- Within US1, creating `LoginPage` (T014), dashboards (T015) and routing in `App.tsx` (T016) can be split among team members but must be integrated and tested together; tests (T018/T019) depend on these being merged.

## Implementation strategy (MVP & incremental delivery)

- MVP scope: Deliver **only User Story 1 (Login → Dashboard)** with routing and tests (T014..T019). This is the minimum shippable product for Phase 1.
- After MVP, implement US2 (PWA installability) and US3 (folder docs) in sequence, while keeping cross-cutting tasks (i18n, CI) in parallel as blockers are resolved.

---

## Notes

- All tasks must reference an exact file path when possible.
- Tests are included for P1 and P2 E2E flows. Add more tests if requested.
- If you want, I can now open a PR with this `tasks.md` and/or scaffold filesystem artifacts for the first few tasks (MVP files)."