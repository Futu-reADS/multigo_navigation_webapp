<!--
Sync Impact Report
- Version change: 1.0.0 → 1.0.1
- Modified / Added principles:
  - Simplicity & Readability → シンプルさと可読性
  - Type Safety (TypeScript Strict) → 型安全性（TypeScript必須）
  - Bilingual Documentation & Localization (EN/JA/ZH) → 二言語/多言語対応
  - PWA & Offline Resilience → PWAおよび不安定ネットワーク対応
  - Permissive Licensing & China Deployment → ライセンスと中国向けデプロイ要件
- Added sections: Additional Constraints & Operational Requirements; Development Workflow & Quality Gates; Operational Target: `.target` MultiGo
- Removed sections: none
- Templates updated: ✅ .specify/templates/plan-template.md (Constitution gates added)
                   ✅ .specify/templates/spec-template.md (Constitution alignment section added)
                   ✅ .specify/templates/tasks-template.md (Mandatory Phase 1 tasks added)
- Templates requiring updates for this change: ⚠ .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md (add operator/runbook/RBAC/backup checks - pending)
- Follow-up TODOs: Add operator runbook and RBAC/backup verification checks to templates (TODO(OPERATOR_CHECKS))
-->

# Multigo Navigation Webapp Constitution

## Core Principles

### 1. Simplicity & Readability / シンプルさと可読性
Code and documentation MUST prioritize simplicity, clarity, and maintainability. Complex solutions require explicit justification and approval. Documentation and public API surfaces MUST be concise and well structured.

- Rules / ルール:
  - Code MUST be written in a clear, idiomatic style and broken into small, testable units.
  - Comments and docs MUST explain intent and rationale — not just mechanics.
  - Wherever possible, prefer straightforward implementations over micro-optimizations.

### 2. Type Safety (TypeScript Strict) / 型安全性（TypeScript必須）
TypeScript is mandatory for all source code. The project MUST enforce strict typing and CI type-check gates to ensure long-term maintainability.

- Rules / ルール:
  - All new code MUST be authored in TypeScript. `tsconfig.json` MUST have `strict: true` enabled.
  - The repository MUST include type tests or compile-time checks in CI; type-check failures MUST block merges.
  - Transient JavaScript is allowed only by explicit exception documented in the PR.

### 3. Bilingual Documentation & Localization (EN/JA/ZH) / ドキュメントとローカリゼーション（英・日・中）
User-facing UI and developer documentation MUST support English and Japanese; the UI MUST be prepared to support Chinese (Simplified) and allow language selection.

- Rules / ルール:
  - All development documentation and public code comments MUST include English and Japanese (EN/JA). Important user-facing strings MUST be available in EN/JA/ZH or have a plan to provide translations.
  - Feature specs MUST include a "Constitution alignment" section documenting i18n scope and validation steps.
  - Localization artifacts MUST be included in the repository and covered by CI checks for P1 user journeys.

### 4. PWA & Offline Resilience / PWAおよび不安定ネットワークへの対応
The application MUST be designed for resilience under unstable network conditions; Progressive Web App (PWA) support is strongly recommended for core user journeys.

- Rules / ルール:
  - Core user journeys MUST consider offline behavior and graceful degradation; PWA tooling (service worker, manifest) SHOULD be employed where it benefits reliability.
  - The application MUST be tested on target platforms (PC and tablet) under varying network conditions.

### 5. Permissive Licensing & China Deployment / 許容ライセンスと中国国内デプロイ
Dependencies and deployment choices MUST allow operation within China and use permissive open-source licenses.

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

### Operational Target: MultiGo at `.target` / 運用対象: `.target` の MultiGo
This web application is explicitly intended to be used to operate and manage **MultiGo** instances deployed at the repository path `.target`. When a feature or change affects `.target` operations, the following non-negotiable requirements MUST be met:

- **Operational Scope / 運用範囲**:
  - The application supports operational actions including **deployment**, **configuration**, **monitoring**, **backup/restore**, and **operator workflows** for MultiGo instances in `.target`.

- **Security & Access Control / セキュリティとアクセス制御**:
  - All operator actions affecting `.target` MUST be protected by Role-Based Access Control (RBAC). RBAC policies and the expected roles MUST be documented in the feature spec.
  - Audit logging MUST capture operator actions with timestamps, actor identifiers, and change summaries. Audit logs retention policy MUST be documented.

- **Operational Runbooks & Backups / 運用手順とバックアップ**:
  - Features that impact `.target` MUST include an operator runbook describing step-by-step procedures for common operations, rollbacks, and emergency recovery.
  - A backup and restore verification plan for any `.target` stateful resources MUST be included and tested as part of integration testing.

- **China Deployment & Network Constraints / 中国向け配置とネットワーク制約**:
  - Any `.target` integration MUST document China compatibility and network constraints; dependencies blocked in China must be replaced or mitigated.

- **Validation & Testing / 検証とテスト**:
  - Changes affecting `.target` MUST include end-to-end validation steps executed against a staging `.target` environment (or a faithful emulation) and documented in the spec and PR.
  - Operator flows MUST be verifiable both inside the DevContainer and from an external browser outside the DevContainer.

- **Documentation / ドキュメント**:
  - The spec MUST include a short "Operator Considerations" subsection describing RBAC, runbook location, backup plan, audit log retention, and staging `.target` validation steps.

## Development Workflow & Quality Gates / 開発ワークフローと品質ゲート
- Pull requests MUST include: description of changes, tests, type-check results, and localization changes (if applicable).
- CI gates MUST include: type-check, lint, unit tests for covered code, localization checks for P1 flows, and a license compliance check that detects disallowed copyleft dependencies.
- Tests: Unit and integration tests are required for critical features and P1 user journeys; tests MUST be included in the same repository and run in CI.
- DevContainer: A working DevContainer configuration MUST be provided; documentation MUST include steps to verify behavior in an external browser outside the DevContainer.
- Constitution Check: Every plan/spec MUST include a short section describing how it satisfies the constitution (see: `.specify/templates/spec-template.md` ``Constitution alignment``).

## Governance / ガバナンス
- This constitution supersedes informal practices; it is the source of truth for non-negotiable principles.
- Amendments:
  - Changes to the constitution MUST be proposed as a documented Pull Request that includes: rationale, affected sections, example code or migration steps, tests or validation plan, and the recommended semantic version bump (MAJOR/MINOR/PATCH) with rationale.
  - Approval requires review and merge by at least one repository maintainer with explicit sign-off recorded in the PR.
- Versioning policy:
  - **MAJOR**: Breaking governance changes (removal or redefinition of principles) — increment MAJOR.
  - **MINOR**: Addition of a new principle or material expansion of scope — increment MINOR.
  - **PATCH**: Clarifications, wording fixes, and non-substantive edits — increment PATCH.
- Compliance & Review: The project SHOULD run a governance compliance review at least annually and after any MAJOR/MINOR amendment.

**Version**: 1.0.1 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05

