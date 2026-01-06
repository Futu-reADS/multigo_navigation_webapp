# data-model.md

This feature is primarily frontend-only; minimal domain model is required for in-browser state management and documentation.

この機能は主にフロントエンド向けであり、ブラウザ内の状態管理とドキュメンテーションのために最小限のドメインモデルを定義します。

## Entities

### User
- Purpose: Represent the current user's selected role for client-side routing and UI.
- Fields:
  - `role`: `"admin" | "nurse" | "caregiver"` (required)
  - `displayName`: `string` (optional)
- Validation:
  - `role` must be one of the three allowed values.
  - `displayName` optional and limited to 100 chars.
- Role label mapping (for documentation / UI): `admin` = Admin, `nurse` = Nurse, `caregiver` = Caregiver

### ユーザー
- 目的: クライアント側のルーティングや UI のために、現在選択されたユーザーのロールを表現します。
- フィールド:
  - `role`: `"admin" | "nurse" | "caregiver"`（必須）
  - `displayName`: `string`（任意）
- 検証:
  - `role` は上記 3 種類のいずれかであること。
  - `displayName` は任意で最大 100 文字程度を想定します。
- ロール表記対応 (for documentation / UI): `admin` = 管理者, `nurse` = 看護士, `caregiver` = 介護士

### Dashboard (view)
- Purpose: Route destinations and feature modules loaded per role.
- Fields:
  - `type`: `"admin" | "nurse" | "caregiver"`
  - `routes`: list of client-side routes belonging to the dashboard
  - `featureModules`: list of feature identifiers loaded for the dashboard

### ダッシュボード（ビュー）
- 目的: ロールごとに表示するルートや読み込む機能モジュールを定義します。
- フィールド:
  - `type`: `"admin" | "nurse" | "caregiver"`
  - `routes`: ダッシュボードに属するクライアント側ルートのリスト
  - `featureModules`: ダッシュボードで使用する機能識別子のリスト

## State & Transitions
- Initial state: unauthenticated/role-unselected — app shows `LoginPage`.
- Action: `selectRole(role)` → sets `User.role` in local state (or sessionStorage) and navigates to the role-specific dashboard route.
- Deep link to `/admin` or `/nurse` when role not set should redirect to `/login` or show a placeholder with guidance (behavior documented in acceptance scenarios).

## 状態と遷移
- 初期状態: 未認証／ロール未選択 — アプリは `LoginPage` を表示します。
- アクション: `selectRole(role)` → `User.role` をローカル状態（または sessionStorage）に保存し、対応するダッシュボードへ遷移します。
- 深いリンク（例: `/admin`）でロール未設定の場合は `/login` にリダイレクトするか、案内を表示します（受け入れシナリオに準拠）。

## Notes
- No server-side persistence in Phase 1 — all state is client-side.
- If a backend is added later, the `User` entity's `role` could be returned from `/api/me` or similar.

## 補足
- Phase 1 ではサーバー側の永続化は行わず、全てクライアント側の状態として扱います。
- 将来的にバックエンドを追加する場合、`User` の `role` は `/api/me` 等で返される想定にできます。
