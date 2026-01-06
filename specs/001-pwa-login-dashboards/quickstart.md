# quickstart.md

Quickstart for `001-pwa-login-dashboards` (Development & Validation)

## Prerequisites
- Node.js 18+ (LTS)
- npm or pnpm
- DevContainer support (VS Code Remote - Containers) available in repo (`.devcontainer/` exists)

## 前提条件
- Node.js 18+（LTS）
- npm または pnpm
- リポジトリに DevContainer 設定があること（`.devcontainer/`）

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

## ローカル開発（非 DevContainer）
1. フェーチャーブランチにチェックアウトします:
   ```bash
   git checkout -b 001-pwa-login-dashboards
   ```
2. プロジェクトをセットアップして起動します:
   ```bash
   npm install
   npm run dev
   ```
3. ブラウザで `http://localhost:5173/` を開き、ログイン→ダッシュボード遷移を確認します。

## DevContainer (recommended)
- Use the provided DevContainer to get a reproducible environment; open the repo in VS Code and reopen in container.
- After container starts, run the same commands (install, dev).
- **External browser validation**: After starting the dev server in the container, forward the port to the host and open it in a browser outside the DevContainer to validate external behavior and PWA install prompt.

## DevContainer（推奨）
- 提供されている DevContainer を使用して再現性のある開発環境を利用します。VS Code でリポジトリを開き、コンテナで再度開いてください。
- コンテナ起動後、通常通りインストールと開発サーバーを実行します。
- **外部ブラウザ検証**: コンテナ内で起動した開発サーバーのポートをホストにフォワードし、DevContainer 外のブラウザで PWA のインストール挙動を確認してください。

## Run tests
- Unit tests (Vitest): `npm run test:unit`
- E2E (Playwright): `npm run test:e2e` (will run playwright tests for login -> dashboard and PWA offline checks)

## テストの実行
- 単体テスト（Vitest）: `npm run test:unit`
- E2E（Playwright）: `npm run test:e2e`（ログイン→ダッシュボード遷移やオフライン検証を含む）

## PWA validation steps (manual)
1. Open the app in Chromium (or other supported browser).
2. Open DevTools > Application: verify `manifest.webmanifest` is present and service worker is registered.
3. Go offline (DevTools Network > Offline) and refresh to verify Login/Dashboard static pages load from cache.
4. Try install flow: check for install prompt or browser UI to add to home/screen (behavior varies by browser).

## PWA の検証手順（手動）
1. Chromium 等の対応ブラウザでアプリを開く。
2. DevTools の Application タブで `manifest.webmanifest` が存在し、service worker が登録されていることを確認する。
3. オフラインモードにしてリロードし、ログイン/ダッシュボードの静的ページがキャッシュから表示されることを確認する。
4. インストールフローを試し、インストールプロンプトやブラウザ UI による追加が可能か確認する（ブラウザにより挙動が異なります）。

## CI expectations
- Ensure `npm run build` succeeds and `npm run lint` and `npm run typecheck` pass.
- E2E tests (Playwright) run in CI on push/PR for the feature branch.
- A license check job runs to ensure permissive dependencies.

## CI に関する期待事項
- `npm run build`、`npm run lint`、`npm run typecheck` が成功すること。
- E2E（Playwright）はプッシュ/PR 時に CI で実行されること。
- 許容ライセンスのみを許可するライセンスチェックジョブが動作すること。

## Notes
- This quickstart assumes the project is scaffolded as a Vite React TypeScript app. If you prefer an alternative stack, see `research.md` for evaluated alternatives.

## 補足
- 本クイックスタートは Vite + React + TypeScript を前提としています。他のスタックを希望する場合は `research.md` を参照してください。
