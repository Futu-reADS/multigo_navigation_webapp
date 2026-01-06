# research.md — Phase 0 Research

This document captures research tasks to resolve NEEDS CLARIFICATION items from `plan.md`.

このドキュメントは `plan.md` の未確定項目（NEEDS CLARIFICATION）を解決するための調査タスクとその結果をまとめたものです。

## Tasks & Findings

### 1) i18n scope for Phase 1 (EN/JA/ZH)
- Task: "Research whether P1 requires full EN/ZH translations or if EN+JA for P1 flows suffices for constitution compliance."
- Decision: Provide **EN + JA translations for P1 user journeys** (Login → Dashboard), and **prepare placeholder ZH** files with keys and TODOs for full translation in a later phase.
- Rationale: The constitution mandates EN/JA support for docs and P1 flows. Implementing EN+JA for P1 satisfies the constitution while deferring full ZH translations to a follow-up.
- Alternatives considered: JA-only (rejected as constitution requires EN support), full EN/JA/ZH now (more effort; deferred).

### 1) i18n の範囲（Phase 1、EN/JA/ZH）
- タスク: "P1 で EN/ZH の完全翻訳が必要か、EN+JA のみで憲法要件を満たすか調査する。"
- 決定: P1 の主要ユーザーフロー（ログイン→ダッシュボード）には **EN と JA の翻訳を提供**し、ZH はキーのみのプレースホルダと TODO を置いて将来対応する計画とする。
- 根拠: 憲法はドキュメントと P1 フローに対する EN/JA サポートを要求しているため、まず EN/JA を満たし ZH はフォローアップする方針がバランスが良い。

### 2) Build tooling & PWA plugin choice
- Task: "Evaluate Vite vs Next.js vs CRA for a small PWA frontend baseline. Choose PWA plugin strategy (vite-plugin-pwa vs Workbox directly)."
- Decision: Use **Vite** + **vite-plugin-pwa**.
- Rationale: Vite offers fast dev feedback, is lightweight, and integrates with `vite-plugin-pwa` which simplifies generating manifest and service worker (workbox runtime available). Next.js is heavier and optimized for SSR; not needed for this baseline. CRA is deprecated and slower.
- Alternatives considered: Next.js (too heavy), CRA (not recommended), custom Workbox (more config; we prefer the plugin convenience).

### 2) ビルドツールと PWA プラグインの選定
- タスク: "小規模な PWA フロントエンドに対して Vite、Next.js、CRA のどれを使うかと、PWA プラグイン戦略（vite-plugin-pwa か直接 Workbox か）を評価する。"
- 決定: **Vite + vite-plugin-pwa** を採用します。
- 根拠: Vite は高速な開発フィードバックと軽量さを提供し、`vite-plugin-pwa` により manifest と service worker の生成が容易になります。Next.js は SSR に最適化されており重いため現段階では過剰です。CRA は推奨されません。

### 3) E2E runner for PWA installability and offline tests
- Task: "Determine best E2E tool for PWA installability/offline testing: Playwright vs Cypress vs Lighthouse CLI."
- Decision: Use **Playwright** for E2E (cross-browser: Chromium, Firefox, WebKit). Use Lighthouse (via `lighthouse-ci`) as an optional audit step to check PWA score in CI.
- Rationale: Playwright supports WebKit (Safari-like) and offline/network emulation; it can automate install flow checks and offline behavior. Lighthouse is useful for auditing PWA metrics but less suited for scripted install flows.

### 3) PWA のインストール性とオフライン検証の E2E ランナー
- タスク: "PWA のインストール性やオフライン検証に最適な E2E ツールを選定する（Playwright, Cypress, Lighthouse CLI 等）。"
- 決定: **Playwright** を E2E に採用（Chromium/Firefox/WebKit のクロスブラウザ対応）。PWA のスコア監査には `lighthouse-ci` を補助的に使うことを検討します。
- 根拠: Playwright は WebKit（Safari に類似）をサポートし、ネットワークのエミュレーションやオフライン動作の自動化に適しています。Lighthouse は監査向けで、スクリプト化されたインストールフローの検証には向いていません。

### 4) Caching strategy & update policy
- Task: "Define a caching strategy for Login and Dashboard static pages and update policy for service worker."
- Decision: Precache core assets and pages (Login + Dashboard shell) via plugin precache; use `StaleWhileRevalidate` for runtime assets and network-first for any API calls (if added later). Use update strategy with `skipWaiting`/`clientsClaim` on major updates and notify users when updates are available (UI toast).
- Rationale: Ensures Login and Dashboards are available offline, while allowing timely updates.

### 4) キャッシュ戦略と更新ポリシー
- タスク: "ログインとダッシュボードの静的ページをどのようにキャッシュし、service worker の更新ポリシーをどうするか定義する。"
- 決定: コアアセットとページ（ログインとダッシュボードのシェル）をプリキャッシュし、ランタイムアセットに対しては `StaleWhileRevalidate` を使い、API 呼び出しはネットワーク優先とする方針を採用します。主要な更新時は `skipWaiting` / `clientsClaim` を用いて更新を反映し、ユーザーにトースト等で通知します。

### 5) License/check tooling for CI
- Task: "Select a lightweight tool to detect copyleft or disallowed licenses in dependencies."
- Decision: Use `license-checker` (or `npm-license-checker`) in CI to scan production dependencies. Evaluate OSS review tooling if required.
- Rationale: `license-checker` is simple to integrate in GitHub Actions and can fail the build on disallowed licenses.

### 5) CI におけるライセンスチェックツール
- タスク: "依存関係にコピーレフトや禁止ライセンスがないか検出する軽量ツールを選定する。"
- 決定: `license-checker`（または `npm-license-checker`）を CI に導入して本番依存をスキャンします。必要に応じて OSS レビュー用のツール導入も検討します。
- 根拠: `license-checker` は GitHub Actions に組み込みやすく、禁止ライセンスが見つかった場合にビルドを失敗させることができます。

### 6) PWA test matrix & supported browsers
- Task: "Define a test matrix for PWA behavior (installability/offline) on target browsers and devices."
- Decision: Test on Chromium (latest), Firefox (latest), and WebKit (via Playwright) on desktop and tablet viewport sizes. Document quirks per browser in `research.md` and quickstart.

### 6) PWA テストマトリクスとサポートブラウザ
- タスク: "ターゲットブラウザ/デバイスでの PWA 挙動（インストール可能性/オフライン）についてテストマトリクスを定義する。"
- 決定: Chromium（最新）、Firefox（最新）、WebKit（Playwright 経由）をデスクトップとタブレットのビューポートでテストします。ブラウザごとの差分や注意点は `research.md` と `quickstart.md` に記載します。


## Output (next steps)
- Add EN + JA translation files for P1 flows and i18n plumbing in `src/i18n/`.
- Add Playwright E2E test scaffolding and a sample test for login -> admin dashboard route and offline rendering.
- Add `vite-plugin-pwa` configuration to `vite.config.ts` with precache of Login/Dashboard.
- Add `license-checker` job to GitHub Actions CI.


---

*If you want, I can now implement the above decisions into scaffolding and create PRs for each artifact (PWA setup, i18n plumbing, tests, CI).* 

## 出力（次のステップ）
- P1 フロー用の EN と JA の翻訳ファイルおよび `src/i18n/` の初期設定を追加します。
- Playwright の E2E テストのスキャフォールドを追加し、ログイン→管理ダッシュボードおよびオフライン表示のサンプルテストを作成します。
- `vite-plugin-pwa` の設定を `vite.config.ts` に追加し、ログインとダッシュボードをプリキャッシュします。
- GitHub Actions に `license-checker` ジョブを追加して許容ライセンスのみを通すチェックを導入します。

*必要なら、上記決定に基づきスキャフォールドと PR を作成します。*
