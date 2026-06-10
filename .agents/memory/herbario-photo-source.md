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
