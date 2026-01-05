<!--
Sync Impact Report
- Version change: 1.0.1 → 1.0.2
- Modified / Added principles:
  - Simplicity & Readability → シンプルさと可読性
  - Type Safety (TypeScript Strict) → 型安全性（TypeScript必須）
  - Bilingual Documentation & Localization (EN/JA/ZH) → 二言語/多言語対応
  - PWA & Offline Resilience → PWAおよび不安定ネットワーク対応
  - Permissive Licensing & China Deployment → ライセンスと中国向けデプロイ要件
- Added sections: Additional Constraints & Operational Requirements; Development Workflow & Quality Gates; Operational Target: `.targets/multigo` MultiGo (repo folder). Corrected prior `.target` misreference to `.targets/multigo` (repository folder).
- Removed sections: none
- Templates updated: ✅ .specify/templates/plan-template.md (Constitution gates added)
                   ✅ .specify/templates/spec-template.md (Constitution alignment section added)
                   ✅ .specify/templates/tasks-template.md (Mandatory Phase 1 tasks added)
- Templates requiring updates for this change: ⚠ .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md (add operator/runbook/RBAC/backup checks - pending)
- Follow-up TODOs: Add operator runbook and RBAC/backup verification checks to templates (TODO(OPERATOR_CHECKS))
-->

# Multigo Navigation Webapp Constitution / Multigo ナビゲーション Webアプリ 憲法

## Core Principles / 中核原則

### 1. Simplicity & Readability / シンプルさと可読性
Code and documentation MUST prioritize simplicity, clarity, and maintainability. Complex solutions require explicit justification and approval. Documentation and public API surfaces MUST be concise and well structured.

コードとドキュメントはシンプルさ、明確さ、保守性を最優先とする必要があります。複雑なソリューションには明確な正当化と承認が必要であり、ドキュメントや公開APIは簡潔かつ整然とした構成を保つべきです。

- Rules / ルール:
  - Code MUST be written in a clear, idiomatic style and broken into small, testable units.
  - Comments and docs MUST explain intent and rationale — not just mechanics.
  - Wherever possible, prefer straightforward implementations over micro-optimizations.

### 2. Type Safety (TypeScript Strict) / 型安全性（TypeScript必須）
TypeScript is mandatory for all source code. The project MUST enforce strict typing and CI type-check gates to ensure long-term maintainability.

TypeScriptは全てのソースコードで必須です。プロジェクトは厳格な型付けを強制し、CIでの型チェックが通らない場合はマージをブロックするなど、長期的な保守性を確保する必要があります。

- Rules / ルール:
  - All new code MUST be authored in TypeScript. `tsconfig.json` MUST have `strict: true` enabled.
  - The repository MUST include type tests or compile-time checks in CI; type-check failures MUST block merges.
  - Transient JavaScript is allowed only by explicit exception documented in the PR.

### 3. Bilingual Documentation & Localization (EN/JA/ZH) / ドキュメントとローカリゼーション（英・日・中）
User-facing UI and developer documentation MUST support English and Japanese; the UI MUST be prepared to support Chinese (Simplified) and allow language selection.

ユーザー向けのUIおよび開発者向けドキュメントは英語と日本語をサポートする必要があります。UIは中国語（簡体字）のサポートを容易にする設計で、利用者が言語を選択できる機能を備えるべきです。

- Rules / ルール:
  - All development documentation and public code comments MUST include English and Japanese (EN/JA). Important user-facing strings MUST be available in EN/JA/ZH or have a plan to provide translations.
  - Feature specs MUST include a "Constitution alignment" section documenting i18n scope and validation steps.
  - Localization artifacts MUST be included in the repository and covered by CI checks for P1 user journeys.

### 4. PWA & Offline Resilience / PWAおよび不安定ネットワークへの対応
The application MUST be designed for resilience under unstable network conditions; Progressive Web App (PWA) support is strongly recommended for core user journeys.

アプリケーションはネットワークが不安定な環境でも動作を維持できるように設計される必要があります。重要なユーザージャーニーにはPWA（サービスワーカー、マニフェストなど）の利用を強く推奨します。

- Rules / ルール:
  - Core user journeys MUST consider offline behavior and graceful degradation; PWA tooling (service worker, manifest) SHOULD be employed where it benefits reliability.
  - The application MUST be tested on target platforms (PC and tablet) under varying network conditions.

### 5. Permissive Licensing & China Deployment / 許容ライセンスと中国国内デプロイ
Dependencies and deployment choices MUST allow operation within China and use permissive open-source licenses.

依存関係やデプロイの選択は中国国内での運用に適している必要があり、許容的なオープンソースライセンスを使用することが前提です。中国でブロックされるサービスは避けるか代替手段を用意してください。

- Rules / ルール:
  - New dependencies MUST be permissively licensed (MIT, Apache-2.0, BSD); copyleft licenses (GPL, AGPL, etc.) are disallowed without explicit governance approval.
  - Services and third-party providers used in production MUST be compatible with China deployment; avoid or provide alternatives to services known to be blocked in China (e.g., Google APIs) and document the choices.
  - The project MUST provide DevContainer configuration for local development and documented steps to validate behavior from a browser outside the DevContainer.

## Additional Constraints & Operational Requirements / 追加制約と運用要件
- Technology: **TypeScript** is mandatory for application code. Frameworks are chosen for simplicity, developer ergonomics, and maintainability.
- UI languages: English / 日本語 / 中文(简体) must be supported or selectable by users.
- Platforms: The app MUST work on **PC** and **tablet** form factors.
- Performance: Working, correct behavior is prioritized over aggressive performance optimizations; performance improvements SHOULD be guided by measurable goals.
- Accessibility: Basic accessibility best practices SHOULD be followed for primary user journeys.
- PWA: Progressive Web App behavior is recommended for resilience on unstable networks.
- Licenses: Use only permissive licenses for third-party OSS unless explicitly approved.

（日本語訳）
- 技術: **TypeScript** はアプリケーションコードに必須です。使用するフレームワークはシンプルさ、開発者の使いやすさ、保守性を重視して選定します。
- UI言語: ユーザー向けは英語 / 日本語 / 中文(简体) をサポートするか、ユーザーが選択できるようにしてください。
- プラットフォーム: アプリは **PC** と **タブレット** の両方で動作する必要があります。
- パフォーマンス: 正しく動作することを優先し、パフォーマンス改善は測定可能な目標に基づいて行ってください。
- アクセシビリティ: 主要なユーザージャーニーに対して基本的なアクセシビリティのベストプラクティスを順守してください。
- PWA: 不安定なネットワーク下での耐障害性のため、PWAの採用を推奨します。
- ライセンス: サードパーティのOSSは原則として許容的なライセンスのみを使用し、明示的な承認がある場合を除きます。

### Operational Target: MultiGo (repository: `.targets/multigo`) / 運用対象: リポジトリの `.targets/multigo` の MultiGo
This web application is explicitly intended to operate and manage the **MultiGo** installation located in the repository folder `.targets/multigo` (see `.targets/multigo/README.md` and the files under `.targets/multigo/`). When a feature or change affects MultiGo operations, the following non-negotiable requirements MUST be met:

このWebアプリケーションは、リポジトリ内のフォルダ `.targets/multigo` にある **MultiGo** の運用・管理を目的としています（参照: `.targets/multigo/README.md` および `.targets/multigo/` 下のファイル群）。機能や変更が MultiGo の運用に影響を与える場合、以下の必須要件を満たす必要があります。

- **Operational Scope / 運用範囲**:
  - The application supports operational actions including **deployment**, **configuration**, **monitoring**, **backup/restore**, and **operator workflows** for the MultiGo installation defined in the repository folder `.targets/multigo` (see `.targets/multigo/README.md`).
  - このアプリケーションは、リポジトリのフォルダ `.targets/multigo` に定義された MultiGo に対する **デプロイ、設定、監視、バックアップ/復元、オペレーターのワークフロー** といった運用操作をサポートします。

- **Security & Access Control / セキュリティとアクセス制御**:
  - All operator actions affecting the MultiGo resources under `.targets/multigo` MUST be protected by Role-Based Access Control (RBAC). RBAC policies and the expected roles MUST be documented in the feature spec.
  - `.targets/multigo` に影響するすべてのオペレーター操作はロールベースアクセス制御（RBAC）で保護されなければなりません。RBACポリシーと想定されるロールはスペックに記載してください。
  - Audit logging MUST capture operator actions with timestamps, actor identifiers, and change summaries. Audit logs retention policy MUST be documented.
  - 監査ログはオペレーター操作をタイムスタンプ、実行者識別子、変更の要約とともに記録する必要があります。監査ログの保持ポリシーをスペックで定義してください。

- **Operational Runbooks & Backups / 運用手順とバックアップ**:
  - Features that impact the files or configuration in `.targets/multigo` MUST include an operator runbook describing step-by-step procedures for common operations, rollbacks, and emergency recovery.
  - `.targets/multigo` に影響を与える機能は、一般的な操作、ロールバック、緊急時の復旧手順をステップごとに記載したオペレータランブックを含める必要があります。
  - A backup and restore verification plan for any stateful resources defined under `.targets/multigo` MUST be included and tested as part of integration testing.
  - `.targets/multigo` のステートフルなリソースに対するバックアップおよび復元の検証計画を含め、統合テストの一部として検証を行う必要があります。

- **China Deployment & Network Constraints / 中国向け配置とネットワーク制約**:
  - Any integration involving `.targets/multigo` MUST document China compatibility and network constraints; dependencies blocked in China must be replaced or mitigated.
  - `.targets/multigo` の統合は中国向けの互換性とネットワーク制約を文書化する必要があります。中国でブロックされる依存関係は置き換えるか、回避策を用意してください。

- **Validation & Testing / 検証とテスト**:
  - Changes affecting `.targets/multigo` MUST include end-to-end validation steps that exercise the `.targets/multigo` configuration (either against a staging environment or a faithful emulation) and be documented in the spec and PR.
  - `.targets/multigo` に影響を与える変更は、`.targets/multigo` の構成を検証するエンドツーエンドの手順（ステージング環境または忠実なエミュレーション）を含め、スペックとPRに文書化する必要があります。
  - Operator flows MUST be verifiable both inside the DevContainer and from an external browser outside the DevContainer.
  - オペレーター操作フローはDevContainer内だけでなく、DevContainer外のブラウザからも検証可能である必要があります。

- **Documentation / ドキュメント**:
  - The spec MUST include a short "Operator Considerations" subsection describing RBAC, runbook location (point to `.targets/multigo/README.md` when applicable), backup plan, audit log retention, and staging validation steps that exercise `.targets/multigo`.
  - スペックにはRBAC、ランブックの所在（該当する場合は `.targets/multigo/README.md` を指すこと）、バックアップ計画、監査ログの保持方針、そして `.targets/multigo` の検証手順を記載した「Operator Considerations」サブセクションを必ず含めてください。

## Development Workflow & Quality Gates / 開発ワークフローと品質ゲート
- Pull requests MUST include: description of changes, tests, type-check results, and localization changes (if applicable).
- Pull requestには、変更の説明、テスト、型チェック結果、ローカリゼーションの変更（該当する場合）を含める必要があります。
- CI gates MUST include: type-check, lint, unit tests for covered code, localization checks for P1 flows, and a license compliance check that detects disallowed copyleft dependencies.
- CIゲートは、型チェック、リンティング、対象コードのユニットテスト、P1フローのローカリゼーションチェック、及び許可されていないコピーレフト依存を検出するライセンス遵守チェックを含む必要があります。
- Tests: Unit and integration tests are required for critical features and P1 user journeys; tests MUST be included in the same repository and run in CI.
- テスト: 重要な機能およびP1ユーザージャーニーにはユニットテストと統合テストが要求されます。テストは同一リポジトリに含め、CIで実行してください。
- DevContainer: A working DevContainer configuration MUST be provided; documentation MUST include steps to verify behavior in an external browser outside the DevContainer.
- DevContainer: 動作するDevContainerの設定を提供する必要があります。ドキュメントにはDevContainer外のブラウザでの挙動を検証する手順を記載してください。
- Constitution Check: Every plan/spec MUST include a short section describing how it satisfies the constitution (see: `.specify/templates/spec-template.md` ``Constitution alignment``).
- Constitution Check: すべてのplan/specには、憲法をどのように満たすかを記述した短いセクションを含める必要があります（参照: `.specify/templates/spec-template.md` の ``Constitution alignment``）。

## Governance / ガバナンス
- This constitution supersedes informal practices; it is the source of truth for non-negotiable principles.
- この憲法は非公式な慣行に優先し、譲れない原則の真実の根拠となります。
- Amendments:
  - Changes to the constitution MUST be proposed as a documented Pull Request that includes: rationale, affected sections, example code or migration steps, tests or validation plan, and the recommended semantic version bump (MAJOR/MINOR/PATCH) with rationale.
  - 憲法の変更は、理由、影響を受けるセクション、サンプルコードまたは移行手順、テストまたは検証計画、および推奨されるセマンティックバージョンのバンプ（MAJOR/MINOR/PATCH）とその理由を含む文書化されたPull Requestとして提案されなければなりません。
  - Approval requires review and merge by at least one repository maintainer with explicit sign-off recorded in the PR.
  - 承認には最低1名のリポジトリメンテナーによるレビューとマージ、PRに記録された明示的なサインオフが必要です。
- Versioning policy:
  - **MAJOR**: Breaking governance changes (removal or redefinition of principles) — increment MAJOR.
  - **MAJOR**: ガバナンスに関する重大な変更（原則の削除または再定義）— MAJORを増やします。
  - **MINOR**: Addition of a new principle or material expansion of scope — increment MINOR.
  - **MINOR**: 新しい原則の追加または範囲の実質的な拡大 — MINORを増やします。
  - **PATCH**: Clarifications, wording fixes, and non-substantive edits — increment PATCH.
  - **PATCH**: 明確化、文言修正、非本質的な編集 — PATCHを増やします。
- Compliance & Review: The project SHOULD run a governance compliance review at least annually and after any MAJOR/MINOR amendment.
- コンプライアンスとレビュー: プロジェクトは少なくとも年1回、およびMAJOR/MINORの修正後にガバナンスの遵守レビューを実行することを推奨します。

**Version**: 1.0.2 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05

