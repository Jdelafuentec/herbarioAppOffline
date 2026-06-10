---
name: Herbario photo source (OASIS)
description: Where the botanical species photos for the Herbario Digital app are hosted and how they're structured.
---

# OASIS herbario photo hosting

The real species photos for the Herbario Digital app are NOT in the project repo and are NOT attached by the user — they live on the OASIS GitHub Pages site.

- Host: `https://oasisudd.github.io/herbario/` (repo `oasisudd/herbario`, NOT `oasisudd/herbarioapp` — the latter is the old web app).
- Per-genus photos: `flores/<genus-lowercase>/<Genus>_<category>/<FILENAME>.jpg`, e.g. `flores/arenaria/Arenaria_principal/DSC_7570.jpg`.
- Categories observed: `_principal`, `_flor`, `_tallo`.
- The repo's `index.html` lists the full filenames for every category (grep it for a genus name to get the exact file list per category — the GitHub contents API also lists each folder).

**Why this matters:** the user repeatedly said "here's the photo" / "they're already there" but no image ever arrived in chat and the files were never uploaded. Don't keep asking — check the OASIS site first. Camera-style filenames the user quotes ("ends in 7570") map to files like `DSC_7570.jpg`.

**Status:** as of this work, only **Arenaria** (`arenaria-rivularis`) has a complete photo set wired up. The other 15 species have no `photos` and fall back to placeholder boxes. To add photos for another species, mirror the `photos: PhotoCategory[]` shape in `constants/species.ts` (first image in each category array is treated as the main/representative one).

Photos are referenced as remote `{ uri }` URLs (no bundling). Trade-off: needs network; fine for now, revisit if offline field use is requested.

**Ecosystem transect panorama (intro page):** sourced from the sibling `observatorio` GitHub Pages site, page `https://oasisudd.github.io/observatorio/transectoMirador2.html`. The drone panorama is `https://oasisudd.github.io/observatorio/img/transecto6_Panorama_part1.jpg` — despite the `_part1` name, **only part1 exists** (part2/part3 return 404). It is a tall vertical image (**1876 × 14999**, ~16MB), so display it full-width with `aspectRatio: 1876/14999` inside a vertical ScrollView and scroll down through it (don't expect a wide/horizontal pano). Heavy file → show a loading state while it fetches.
