# data-model.md

This feature is primarily frontend-only; minimal domain model is required for in-browser state management and documentation.

## Entities

### User
- Purpose: Represent the current user's selected role for client-side routing and UI.
- Fields:
  - `role`: `"admin" | "nurse" | "caregiver"` (required)
  - `displayName`: `string` (optional)
- Validation:
  - `role` must be one of the three allowed values.
  - `displayName` optional and limited to 100 chars.

### Dashboard (view)
- Purpose: Route destinations and feature modules loaded per role.
- Fields:
  - `type`: `"admin" | "nurse" | "caregiver"`
  - `routes`: list of client-side routes belonging to the dashboard
  - `featureModules`: list of feature identifiers loaded for the dashboard

## State & Transitions
- Initial state: unauthenticated/role-unselected — app shows `LoginPage`.
- Action: `selectRole(role)` → sets `User.role` in local state (or sessionStorage) and navigates to the role-specific dashboard route.
- Deep link to `/admin` or `/nurse` when role not set should redirect to `/login` or show a placeholder with guidance (behavior documented in acceptance scenarios).

## Notes
- No server-side persistence in Phase 1 — all state is client-side.
- If a backend is added later, the `User` entity's `role` could be returned from `/api/me` or similar.
