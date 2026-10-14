# Design and Navigation Update

This addendum records the latest direct design feedback and takes precedence over the earlier light/purple palette described in the attached build brief.

## Visual direction applied

- Use a near-black graphite base with warm ivory, champagne gold, bronze, and silver: `#050403`, `#F4E0CD`, `#F1D6B1`, `#5C5247`, `#A3A3A9`, `#D1AE5D`, `#B09043`, `#9C703C`.
- Use larger, higher-contrast text. Body copy and card descriptions should remain comfortably readable; avoid tiny labels except inside decorative UI mockups.
- `public/tellamind-mark.svg` is the TellaMind geometric cube symbol.
- `public/tellamind-hero.svg` is original metallic, 3D-style cube artwork for the homepage hero. It is an editable vector illustration, not a raster render or a copied Dribbble asset.
- Keep the design references as inspiration; do not reuse their artwork, logos, or client marks.

## Navigation behavior applied

- Main navigation items use separate routes (`/services`, `/work`, `/about`, `/team`, `/how-we-work`, `/contact`).
- “Services” navigates to the services overview; its caret stays inline and opens service-page links.
- Each service card opens `/services/:slug`; each concept card opens `/work/:slug`. Snap Star creator support has its own dedicated service page.
- The home hero exploration cue now opens the Services page. The only same-page link is the accessibility skip-to-content link.
- React Router changes the URL and page content in the same browser tab. It does not create a new browser tab for each internal page.

## New feedback updates

- Added a Team page with role-based profiles and an explicit note to add real names/photos when provided; no people are invented.
- Added stronger CSS 3D motion for the cube, page entrances, team illustration motion, and a reduced-motion override.
- Added per-route canonical URL and Organization schema support, configured by `VITE_SITE_URL`. The real domain must be added before deployment; SEO never guarantees instant ranking.
- Snap Star guidance links directly to Snapchat support. Snapchat controls verification and monetization decisions; TellaMind cannot promise approval or earnings.
