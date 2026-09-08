# Theme toggle (light / dark)

- Icons: Lucide (`sun.svg`, `moon.svg`) in `docs/a/assets/media/icons/` — monochrome line icons, MIT.
- Preference key: `localStorage["ee-theme"]` = `light` | `dark`.
- Early boot is inlined in each page `<head>` (with trailing-slash fix) to avoid flash.
- Toggle button lives in the site header (`main.js`); shows moon in light mode and sun in dark mode.
- CSS themes via `html[data-theme="dark"]` (not `prefers-color-scheme` alone).
