---
name: Herbario photo source (OASIS)
description: Where the botanical species photos for the Herbario Digital app are hosted and how they're structured.
---

# OASIS herbario photo hosting

The real species photos for the Herbario Digital app are NOT in the project repo and are NOT attached by the user — they live on the OASIS GitHub Pages site.

- Host: `https://oasisudd.github.io/herbario/` (repo `oasisudd/herbario`, NOT `oasisudd/herbarioapp` — the latter is the old web app).
- Current URL shape (the one linked from the Herbario Digital PDF fichas and used in `species.ts`): `https://oasisudd.github.io/herbario/<Genus_species>/<category>/<file>`, e.g. `.../Arenaria_rivularis/flor/DSC_XXXX.jpg`. The folder is `Genus_species` (capitalized genus, underscore) — note the Gamocarpha folder is the oddball `Gamocarpha_compactaR`.
- Categories seen: `principal`, `flor`, `tallo`, plus taxon-specific ones — Oxychloe uses `flor_masculina`/`flor_femenina`/`hoja`; Lobelia & Phylloscirpus use `flor`/`cancosa`. Some files are uppercase `.JPG` (Lobelia, Phylloscirpus, Carex) — match the exact case or the URL 404s on GitHub Pages.
- Older/alternate shape also exists in the repo: `flores/<genus-lowercase>/<Genus>_<category>/<FILENAME>.jpg`. The repo `index.html` + GitHub contents API list exact filenames per folder.

**Why this matters:** the user repeatedly said "here's the photo" / "they're already there" but no image ever arrived in chat and the files were never uploaded. Don't keep asking — check the OASIS site first. Always verify a sample of URLs return 200 before wiring many in (case-sensitive filenames bite here).

**Status:** as of the full PDF rewrite, 15 of 16 species have `photos` wired up (1 image per category). Only **`triglochin-palustris` has NO photos** — the PDF links none; it omits `photos` and falls back to the `photoLabels` placeholder boxes ("Foto flor"/"Foto tallo"). To add photos, mirror the `photos: PhotoCategory[]` shape in `constants/species.ts` (first image in each category array is the main/representative one; key `principal` renders as the hero).

**Fichas & references:** `species.ts` now carries `sourceUrl` (the Herbario Digital ficha) and `references: string[]` per species; the detail screen's Ecología tab renders them (tappable "Ver ficha en Herbario Digital" via `Linking.openURL`). Gotcha: the Halerpestes ficha is `https://www.herbariodigital.cl/234970/` (the `/catalog/details/` variant 500s).

Photos are referenced as remote `{ uri }` URLs (no bundling). Trade-off: needs network; fine for now, revisit if offline field use is requested.

**Ecosystem transect panorama (intro page):** sourced from the sibling `observatorio` GitHub Pages site, page `https://oasisudd.github.io/observatorio/transectoMirador2.html`. The drone panorama is `https://oasisudd.github.io/observatorio/img/transecto6_Panorama_part1.jpg` — despite the `_part1` name, **only part1 exists** (part2/part3 return 404). It is a tall vertical image (**1876 × 14999**, ~16MB), so display it full-width with `aspectRatio: 1876/14999` inside a vertical ScrollView and scroll down through it (don't expect a wide/horizontal pano). Heavy file → show a loading state while it fetches.
