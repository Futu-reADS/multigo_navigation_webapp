# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: React 18 + TypeScript (target TypeScript ^5.x), Node.js 18+ (LTS). `tsconfig.json` will enforce `strict: true` per constitution.

**Primary Dependencies**:
- React (v18)
- React Router (v6) — client routing for `/admin`, `/nurse`, `/caregiver`
- Build/tooling: Vite (decision) — fast dev feedback and good PWA plugin ecosystem. (Alternative: Next.js — heavier; CRA deprecated.)
- PWA: `vite-plugin-pwa` (workbox under the hood) for service worker generation and manifest.
- i18n: `i18next` + `react-i18next` (plumbing for EN/JA/ZH support; initial strings in JA, keys prepared for EN/ZH)
- Testing: Vitest + @testing-library/react for unit tests; Playwright for E2E (PWA installability + offline validation)
- Lint/Format: ESLint + Prettier + TypeScript ESLint rules
- CI checks: GitHub Actions (type-check, lint, unit, e2e, localization checks, license checks)

**Storage**: N/A (no backend in this phase). All state is in-browser (local state); future phases may add APIs.

**Testing**: Unit tests (Vitest + RTL) for P1 flows (Login → Dashboard routes). E2E tests (Playwright) to validate PWA installability, offline cache behavior, and role-based navigation.

**Target Platform**: Web (desktop and tablet prioritized; mobile optional). Supported browsers: Chromium-based, Firefox, and Safari (installability varies; document test matrix in `research.md`).

**Project Type**: Single web frontend (no backend in-scope for Phase 1). Repository will host a single frontend project (root `src/`) with clear `src/pages`, `src/features`, and `src/components` separation.

**Performance Goals**: Small app; prioritize correctness and fast load of core pages. Target: Login and dashboard initial render under 1s on modern desktop/tablet networks (to be validated in Phase 1). Marked as low priority for aggressive perf optimizations.

**Constraints**:
- Must be PWA-installable and provide offline-capable static views for Login and Dashboards.
- Must use TypeScript `strict: true` and pass type-checks in CI.
- Must avoid Google-hosted APIs (China compatibility requirement).
- Use only permissive OSS licenses (MIT/Apache-2.0/BSD).

**Scale/Scope**: Small initial baseline (3 dashboards, no server-side features). Designed for extensibility (feature modules under `src/features/*`).

**NEEDS CLARIFICATION**:
- Full EN/ZH translations for P1 flows: constitution requires i18n resources and tests for P1 user journeys — do we need completed EN/ZH translations in Phase 1, or is preparing keys and JA translations sufficient? (research task)
- Precise PWA test matrix and installability expectations per browser (research task).
- Preferred E2E test runner for PWA installability (Playwright vs alternatives) — Playwright is proposed but will be validated in Phase 0.


---

## Project Structure (proposed)

```
# Frontend-only project (single project)
.
├── .devcontainer/                # DevContainer already present
├── public/
│   ├── manifest.webmanifest
│   └── icons/
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── NurseDashboard.tsx
│   │   └── CaregiverDashboard.tsx
│   ├── features/
│   │   ├── dashboard-common/     # shared components/services for dashboards
│   │   ├── dashboard-admin/
│   │   ├── dashboard-nurse/
│   │   └── dashboard-caregiver/
│   ├── components/               # reusable UI components
│   ├── hooks/
│   ├── i18n/                     # translation keys and init
│   ├── styles/
│   └── sw/                       # custom service worker logic (if needed)
├── tests/
│   ├── unit/
│   └── e2e/                      # Playwright tests
├── vite.config.ts
├── package.json
└── README.md
```

**Structure Decision**: A single frontend project using Vite is chosen to keep the repository simple and easy to extend. Feature modules will be organized under `src/features/*` so role-specific features can be added without coupling. This matches the spec's requirement (FR-004) and the Constitution's principle to favor simplicity and maintainability.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The project MUST validate the following gates derived from the constitution before Phase 0 and re-check after Phase 1:

- **TypeScript Strict**: Project MUST use TypeScript with `tsconfig.json` `strict = true`. New packages MUST include type definitions where applicable.
- **Localization (i18n)**: UI and developer-facing docs MUST support **English (EN)**, **Japanese (JA)**, and **Chinese (ZH)** or include an explicit migration plan. Localization resources and tests MUST exist for P1 user journeys.
- **PWA & Offline**: Core user journeys MUST consider PWA/offline support for unstable networks and ensure PC/tablet support.
- **Licensing**: New dependencies MUST be permissively licensed (MIT, Apache-2.0, BSD). Copyleft (e.g., GPL, AGPL) is disallowed unless explicit governance approval is recorded.
- **China Deployment**: Plans MUST avoid services blocked in China (e.g., Google APIs) or provide China-compatible alternatives and deployment notes.
- **DevContainer + External Testing**: DevContainer development MUST be available and the plan MUST include steps to validate behavior in an external browser outside the DevContainer.
- **Operator / MultiGo Checks (when applicable)**: If the feature affects the repository's MultiGo installation (`.targets/multigo`), the plan MUST include an operator runbook, defined RBAC roles, backup/restore verification steps, audit log retention policy, and staging validation steps that exercise `.targets/multigo`.
- **CI Gates**: Continuous Integration MUST run type-check, lint, unit tests, localization checks, and license checks.

### Gate status (initial assessment)

- **TypeScript Strict**: PASS — Plan enforces `tsconfig.json` with `strict: true` and CI will run `tsc --noEmit` as a blocking gate.
- **Localization (i18n)**: PASS (EN + JA for P1 flows, ZH planned) — Per Phase 0 research, plan will include EN and JA translations for P1 user journeys and complete i18n plumbing (`react-i18next`). Placeholder ZH translation files will be added with TODOs for full translations in a follow-up phase.
- **PWA & Offline**: PASS (planned) — `vite-plugin-pwa` will provide manifest + service worker; Playwright E2E will validate installability and offline rendering of Login/Dashboards.
- **Licensing**: PASS — Use only permissively licensed dependencies (MIT/Apache/BSD). License check will run in CI; include tool (e.g., `license-checker` or OSS review tool) in research.md.
- **China Deployment**: PASS — No Google APIs planned; validate any external dependency for China-compatibility as part of Phase 0 research.
- **DevContainer + External Testing**: PASS (DevContainer exists) — Add quickstart steps to verify behavior in an external browser outside the DevContainer (to satisfy constitution rule).
- **Operator / MultiGo Checks**: N/A — This feature does not touch `.targets/multigo` and therefore Operator runbook/RBAC/backups are not applicable.
- **CI Gates (implementation status)**: IN PROGRESS — CI jobs will be added in Phase 1: type-check (`tsc --noEmit`), lint, unit tests (Vitest), E2E (Playwright), localization checks for P1 flows, and a license-checker job to enforce permissive licenses.

> Next actions: Phase 0 research will resolve the NEEDS CLARIFICATION items above (i18n scope, CI tooling for license checks, PWA test matrix and E2E runner choice, and China compatibility checks).


## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
