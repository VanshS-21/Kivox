# Kivox Theme Toggle (User-Facing) — Design

## Goal
Add a user-facing theme toggle to the Kivox website so visitors can choose **System / Light / Dark**. The choice must persist across visits and integrate with the existing CSS variable theme system (`:root[data-theme="light"]` / `:root[data-theme="dark"]`) already defined in `web/src/app/globals.css`.

## Non-Goals
- No full mobile navigation/menu redesign in this change.
- No account-based preference syncing.
- No analytics tracking for theme changes (unless explicitly requested later).

## Current State (Relevant)
- `web/src/app/globals.css` defines theme tokens:
  - Default uses `prefers-color-scheme` (system theme).
  - Overrides exist for `:root[data-theme="light"]` and `:root[data-theme="dark"]`.
- `web/src/components/dev/DevThemeOverride.tsx` supports **dev-only** `?theme=light|dark`.

## UX / Behavior
### Toggle states
Three-state control:
1. **System** (default): follow OS via `prefers-color-scheme`  
   - Implementation: remove `document.documentElement.dataset.theme`
2. **Light**: force light theme  
   - Implementation: `document.documentElement.dataset.theme = "light"`
3. **Dark**: force dark theme  
   - Implementation: `document.documentElement.dataset.theme = "dark"`

### Interaction
- The toggle cycles: **System → Light → Dark → System**.
- Placement: right side of the header (desktop layout) as a compact icon/button (e.g., monitor/sun/moon icon).
- Accessibility:
  - `aria-label` reflects current state (e.g., “Theme: System. Click to switch to Light.”).
  - Visible focus state via existing global `:focus-visible` styling.

### Persistence
- Store preference in `localStorage` under a stable key:
  - Key: `kivox-theme`
  - Values: `"system" | "light" | "dark"`

### Avoiding “flash of wrong theme”
To avoid rendering light then flipping to dark (or vice versa), add a small inline script in `web/src/app/layout.tsx` (or a dedicated helper in `web/src/lib/themeScript.ts`) that runs **before hydration**:
- Read `localStorage.getItem("kivox-theme")`
- If `"light"` or `"dark"`, set `document.documentElement.dataset.theme` accordingly
- If `"system"` or missing, ensure dataset is removed

## Technical Design
### New modules/components
- `web/src/lib/theme.ts`
  - `type ThemePreference = "system" | "light" | "dark"`
  - `const THEME_STORAGE_KEY = "kivox-theme"`
  - `getStoredThemePreference(): ThemePreference | null`
  - `setStoredThemePreference(v: ThemePreference): void`
  - `applyThemePreference(v: ThemePreference): void` (updates `document.documentElement.dataset.theme`)
  - `nextThemePreference(v: ThemePreference): ThemePreference` (for cycling)
- `web/src/components/site/ThemeToggle.tsx` (**client component**)
  - Reads stored preference on mount (default `"system"`)
  - Applies preference immediately when changed
  - Persists updated preference to localStorage
  - Renders a button with icon + `aria-label`

### Header integration
- Update `web/src/components/site/Header.tsx` to render `<ThemeToggle />` next to the primary nav (desktop).

### DevThemeOverride precedence (development only)
Keep existing dev override behavior:
- If `?theme=light|dark` is present in development, it should override the stored preference.
- This can be achieved by keeping `DevThemeOverride` as-is; it will set `data-theme` after navigation changes.

## Testing / Verification
- Manual:
  - Toggle cycles through System/Light/Dark and updates UI styling.
  - Refresh page: preference persists.
  - System mode: switching OS theme changes site theme.
  - Keyboard: toggle is focusable and usable with Enter/Space.
- Build safety:
  - `npm run lint`
  - `npm run build`

## Rollout Notes
- Default remains System (no stored preference) so behavior doesn’t change for new visitors.

