# Feature Specification: Simple PWA: Login & Dashboard Flow / シンプルPWA：ログインとダッシュボード導線

**Feature Branch**: `001-pwa-login-dashboards`  
**Created**: 2026-01-05  
**Status**: Draft  
**Input / 入力**: Create a simple PWA baseline web app using React + TypeScript. Provide a login page (no backend auth yet) that lets users navigate to one of three dashboard pages: Admin, Nurse, Caregiver. Dashboards have no features yet. Common or role-specific features may be added later. Decide folder structure for adding dashboard features. Create a suitable .gitignore.

このWebアプリのベースとなるシンプルなPWAアプリを React/Typescript で作成します。まだ認証機能のないログインページが必要です。ログインページから、次の3種類のダッシュボードページに遷移できる必要があります：管理者、看護士、介護士。各ダッシュボードの機能はまだありません。全ダッシュボードに共通の機能を追加する可能性があります。各ダッシュボードに専用の機能を追加する可能性があります。ダッシュボードに機能を追加するときのフォルダ構成等を決める必要があります。必要な .gitignore を作成する必要があります.

## User Scenarios & Testing *(mandatory)* / ユーザシナリオ & テスト（必須）

### User Story 1 - Login to Dashboard transition (Priority: P1) / ログインからダッシュボード遷移 (Priority: P1)

**User Story 1**: A user (Admin / Nurse / Caregiver) opens the app and navigates from the login page to their role-specific dashboard.

ユーザー（管理者／看護士／介護士のいずれか）がアプリを開き、ログインページから自分のダッシュボードへ遷移できる。

**Importance / 重要性**: Core user flow and required minimal UX. アプリの主要フローであり、最小限のUXを提供するために必須。

**Validation / 検証方法**: Run locally and verify selecting a role on the login page navigates to the correct dashboard. ローカルでアプリを起動し、ログインページから該当ロールを選択して対応するダッシュボードページに遷移できるかを確認する。

**Acceptance Scenarios / 受け入れシナリオ**:

1. Given the login page is shown, when the user selects "Admin" and proceeds, then the Admin dashboard is displayed.  
   初期状態でログインページを表示している場合、ユーザーが「管理者」を選択して進むと管理者ダッシュボードページが表示される。
2. Given the login page is shown, when the user selects "Nurse" and proceeds, then the Nurse dashboard is displayed.  
   初期状態でログインページを表示している場合、ユーザーが「看護士」を選択して進むと看護士ダッシュボードページが表示される。
3. Given the login page is shown, when the user selects "Caregiver" and proceeds, then the Caregiver dashboard is displayed.  
   初期状態でログインページを表示している場合、ユーザーが「介護士」を選択して進むと介護士ダッシュボードページが表示される.
---

### User Story 2 - PWA installability (Priority: P2) / PWA インストール可能 (Priority: P2)

**User Story 2**: Users can install the app to their home screen on supported browsers (installable as a PWA).

ユーザーが対応ブラウザでアプリをホーム画面に追加できる（PWA としてインストール可能である）。

**Importance / 重要性**: Satisfy baseline PWA expectations and enable future offline improvements. PWA としての基本要件を満たし、将来のオフライン体験や離脱率改善に資するため。

**Validation / 検証方法**: Use browser devtools to confirm a valid Web App Manifest and Service Worker; verify install prompt or installability indicator. Offline target: cache key static pages so Login and Dashboard static views can render offline. ブラウザのデベロッパーツールで PWA 要件（manifest, service worker）を確認し、インストールプロンプトが出ることを確認する。 (選択: 主要ページの基本表示をオフラインで可能にする — ログインとダッシュボードの静的表示をキャッシュしてオフライン表示できるレベル)

**Acceptance Scenarios / 受け入れシナリオ**:

1. Given the app is loaded, when the browser meets PWA conditions, then the app is installable (manifest and service worker present) and Login/Dashboard static pages can be shown from cache when offline.  
   アプリがロードされている場合、ブラウザがPWA条件を満たしているとき、manifest と service worker が存在し、ログイン/ダッシュボードの静的ページがオフライン時にキャッシュから表示されること.


---

### User Story 3 - Developer folder structure & extensibility (Priority: P3) / 開発者向けフォルダ構成と拡張性 (Priority: P3)

**User Story 3**: Developers can easily add shared or role-specific features by following a documented folder structure.

開発者が将来、全ダッシュボード共通機能または各ダッシュボード固有の機能を容易に追加できるフォルダ構成が提供されている。

**Importance / 重要性**: Ensures maintainability and lowers cost of future feature additions. 継続的な拡張性を確保し、機能追加時の作業コストを低減するため。

**Validation / 検証方法**: Add a new feature under the recommended folder and confirm it is usable in target dashboards. 指定されたフォルダ構成に従って新しい機能を追加し、簡単にページやコンポーネントが追加できることを検証する。

**Acceptance Scenarios**:

1. **Given** 新しい共通機能を追加したい、 **When** `src/features/dashboard-common` に実装を追加する、 **Then** 管理者・看護士・介護士いずれのダッシュボードからも利用できる。
2. **Given** 新しい管理者専用機能を追加したい、 **When** `src/features/dashboard-admin` に実装を追加する、 **Then** 管理者ダッシュボードでのみ利用できる。

---

### Edge Cases / エッジケース

- Behavior when an invalid role is chosen on the login page (UI should limit choices to avoid this).  
  ログインページで無効なロールが選ばれた場合の挙動（UI側で選択肢を限定するのが基本）。
- Behavior for deep links to dashboards when unauthenticated (decide whether to redirect to login or show placeholder).  
  ダッシュボードへの直接リンク（深いリンク）を受け取った場合の挙動（未認証状態ではログインページにリダイレクトするかどうか）。
- Fallback strategy when the browser does not support service workers.  
  ブラウザが service worker をサポートしていない場合のフォールバック。
## Requirements *(mandatory)* / 要件

### Summary / 概要
- Build a simple PWA baseline using React + TypeScript.  
  React + TypeScript を使ったシンプルな PWA ベースアプリを作る。
- Login page uses role-selection placeholder (no backend auth yet) to navigate to dashboards.  
  認証（バックエンド）はまだ実装せず、ログインページはロール選択（またはプレースホルダ形式）でダッシュボードへ遷移できるようにする。
- Provide three dashboard pages (Admin / Nurse / Caregiver) with no features initially.  
  三種類のダッシュボード（管理者 / 看護士 / 介護士）をページ単位で用意する（現段階で機能は未実装）。
- Propose and document a folder structure to support future shared and role-specific features.  
  今後の拡張を見据えたフォルダ構成を提案し、ドキュメント化する。
- Add appropriate `.gitignore` entries (node_modules, build outputs, .env, editor files, etc.).  
  必要な `.gitignore` を追加する（Node, build 出力, 環境変数ファイル等）。


### Functional Requirements / 機能要件
- **FR-001**: Provide a login page where a user selects Admin/Nurse/Caregiver and navigates to the corresponding dashboard.  
  ログインページを提供し、ユーザーが管理者・看護士・介護士のいずれかを選択して対応ダッシュボードに遷移できること。
  - Testable: On local run, selecting each role navigates to correct page.  
    テスト可能: ローカル起動後、各ロール選択で正しいページに遷移すること。
  - Role selection method: Explicit selection control (radio or dropdown) to prevent mis-entry and simplify UX/testing.  
    ロール選択は **明示的な選択式（ラジオ/プルダウン）** を採用する（誤入力を防ぎ、テスト・UXを簡素化するため）。

- **FR-002**: Each dashboard must have an independent route (e.g., `/admin`, `/nurse`, `/caregiver`).  
  各ダッシュボードはそれぞれ独立したルート（例: `/admin`, `/nurse`, `/caregiver`）を持つこと。

- **FR-003**: The app must meet basic PWA requirements (Web App Manifest + Service Worker) and be installable.  
  アプリは PWA の基本要件（Web App Manifest と service worker）を満たし、ブラウザでインストール可能であること。
  - Offline target: Make Login and Dashboard static views available offline via caching strategy and well-defined update policy.  
    オフラインは **主要ページの基本表示をオフラインで可能にする（ログイン + ダッシュボードの静的表示）** レベルを目標とする（キャッシュ戦略と更新方針を設計すること）。

- **FR-004**: Document the recommended folder structure. Example:  
  推奨フォルダ構成をドキュメント化すること。提案例:
  - `src/pages/` — ルートページ（`Login`, `AdminDashboard`, `NurseDashboard`, `CaregiverDashboard`）
  - `src/features/dashboard-common/` — ダッシュボード共通の機能／コンポーネント
  - `src/features/dashboard-admin/`等 — 各ダッシュボード固有の機能
  - `src/components/` — 再利用可能 UI コンポーネント
  - `src/hooks/`, `src/styles/`, `src/utils/`

- **FR-005**: Add a repository-level `.gitignore` excluding `node_modules/`, `build/` or `dist/`, `.env`, editor files, etc.  
  リポジトリルートに適切な `.gitignore` を追加する（`node_modules/`, `dist/` または `build/`, `.env`, エディタ固有ファイルなどを除外）。

### Key Entities / 主要エンティティ

- **User (with role)**: attributes: `role` (admin|nurse|caregiver), `displayName` (optional)  
  属性: `role` (admin|nurse|caregiver), `displayName`（任意）
- **Dashboard**: attributes: `type` (admin|nurse|caregiver), `routes`, `featureModules`  
  属性: `type` (admin|nurse|caregiver), `routes`, `featureModules`

## 憲章との整合性 / Constitution alignment (mandatory)

- Project uses TypeScript; `tsconfig.json` should recommend `strict: true`.  
  本プロジェクトは TypeScript を使用し、`tsconfig.json` は `strict: true` を推奨する。
- Initial scope: Japanese prioritized; English planned for next phase. Prepare translatable strings.  
  初期対応は日本語を優先し、英語は次フェーズで対応予定。UI 文言は翻訳可能な形（キーを使った実装）で準備する。
- Must be installable as a PWA; offline behavior per FR-003 (static views cached).  
  PWA としてインストール可能であることを満たす。オフライン挙動については上記の FR-003 を参照。
- New dependencies must be permissive (MIT/Apache-2.0/BSD) unless approved.  
  新規依存は許容ライセンス（MIT/Apache-2.0/BSD）に限定すること。
- Desktop and tablet UI targeted; mobile optional.  
  デスクトップ（PC）およびタブレット UI を想定する。モバイルは必要に応じて対応。
- No changes to `.targets/multigo` expected for this feature.  
  本フェーチャーはオペレーション用設定や `.targets/multigo` に直接影響しないため現段階では不要。
### Functional Requirements

- **FR-001**: (上記) ログイン／ロール選択 → ダッシュボード遷移
- **FR-002**: 各ダッシュボードは独立ルートを持つ
- **FR-003**: PWA の基本を満たす（manifest + service worker）
- **FR-004**: 拡張性を考慮したフォルダ構成を提供・文書化する
- **FR-005**: `.gitignore` を追加する

## Success Criteria *(mandatory)* / 成功基準

### Measurable Outcomes / 計測可能な成果

- **SC-001**: From app start, a user can navigate to any dashboard within **2 actions or clicks** from the login page.  
  ローカルでアプリを起動後、ログインページから任意のダッシュボードへ**2 操作以内**で遷移できること（クリック数で検証）。
- **SC-002**: App is installable on supported browsers and shows manifest/service worker; Login/Dashboard static views render when offline.  
  対応ブラウザでアプリが PWA としてインストール可能であること（manifest と service worker を確認）。
- **SC-003**: Repository baseline static checks/type checks do not report blocking errors (verifiable in CI).  
  リポジトリがベースラインの静的解析/型チェックで重大なエラーがないこと（CIで検証可能）。
- **SC-004**: `specs/001-pwa-login-dashboards/spec.md` and `specs/001-pwa-login-dashboards/checklists/requirements.md` exist in the repo.  
  リポジトリに `specs/001-pwa-login-dashboards/spec.md` と `specs/001-pwa-login-dashboards/checklists/requirements.md` が存在すること。

### Assumptions / 想定

- No backend auth in this phase; login uses role selection to navigate. Full auth will be scoped separately.  
  本段階ではバックエンド認証は不要で、ログインページはロール選択により画面遷移を行う。認証が必要になった場合は別仕様で対応する。
- Initial localization focuses on Japanese.  
  初期ローカライズは日本語中心とする。

---

**Next step / 次のステップ**: Spec has been updated to reflect the user's choices for role input method and offline target. If you'd like, I can now scaffold the project files (initial PWA template, `src/` layout, and `.gitignore`) and open a PR, or proceed to planning (`/speckit.plan`).
