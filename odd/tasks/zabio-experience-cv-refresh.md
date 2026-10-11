# Feature: zabio-experience-cv-refresh

- **Locator:** `odd/tasks/zabio-experience-cv-refresh.md`
- **Engram mirror:** `odd/zabio-experience-cv-refresh/tasks` (project `portafolio`)
- **Branch:** `feat/zabio-experience-cv-refresh` (from `main` @ `114de9e`)

## Objective

Bring the landing's professional data in line with the current CV: Minteo was acquired by Zabio, and there is a new current role at Zabio.

## Problem / why

The landing still shows Minteo as the latest role and serves the previous CV PDFs. The CV source of truth (`../cv-builder/cv.{es,en}.yaml`, generated output in `../cv-builder/20261011-software-engineer/`) already reflects the acquisition and the Zabio role.

## Scope

- Experience data in `src/data/profile.ts`, both locales (ES/EN parity).
- Downloadable CV PDFs in `public/cv/`.
- Project-local install of the third-party `landing-page-design` skill (tooling for the upcoming redesign).

Out of scope: the visual redesign itself (proposal only, not authorized for implementation yet), hero/case-study copy, CV content.

## Constraints

- ES/EN parity: every change lands in both locales.
- Experience periods are year-only on the landing (`2022 – 2026`), matching the CV.
- Wording mirrors the CV YAML so landing and PDF tell the same story.
- Tense convention: first-person preterite action verbs for every bullet, including the current role (bullets are completed achievements).

## Configuration

- **TDD mode:** enabled (source: global `~/.claude/CLAUDE.md`, "Strict TDD Mode: enabled").
- **Test runner:** none exists in this repo (no test script, no test files). RED/GREEN cannot be observed; the functional check is `pnpm build` (type-checks `profile.ts` through the Astro build) plus a readback of the built HTML.
- **RDD:** on (decided by global).
- **Delivery strategy:** `ask-on-risk`. Forecast: ~45 authored changed lines (vendored skill file excluded). Under budget.

## Tasks

- [x] **T1 — Experience data.** Add the Zabio entry (AI/Product Engineer, 2026 – Present) at the top, mark Minteo as acquired by Zabio, normalize the one subordinate-clause tense outlier. Both locales.
  - Route: direct inline (one already-understood file, `src/data/profile.ts`).
  - Checks: `pnpm build`; built `dist/index.html` and `dist/es/index.html` contain Zabio and the acquisition label.
- [x] **T2 — CV PDFs.** Replace `public/cv/CV-Juan-Sebastian-Agudelo{,.es}.pdf` with the files from `../cv-builder/20261011-software-engineer/`.
  - Route: direct inline (mechanical copy, same filenames, no code change).
  - Checks: SHA-1 of `public/cv/*.pdf` equals the source files; `AboutSection.astro` hrefs unchanged.
- [x] **T3 — Install `landing-page-design` skill.** Vendor `SKILL.md` from `elayadesign/ai-design-skills` (MIT) at commit `1c1e97c` into `.claude/skills/landing-page-design/`.
  - Route: direct inline (single file copy, content reviewed before install).
  - Checks: file present, byte-identical to upstream (16528 bytes).

## Acceptance criteria

- The experience section lists Zabio first, then Minteo labelled as acquired by Zabio, in both languages.
- Leading verbs of all experience bullets are preterite in ES and past tense in EN.
- The "Download CV" button serves the 2026-10-11 PDFs in both languages.
- `pnpm build` passes.

## Progress / evidence

- **T1** — commit `7082a0d` (`feat(experience): add Zabio role and mark Minteo as acquired`). `pnpm build` passed (6 pages). Built `dist/index.html` contains `AI/Product Engineer`, `2026 – Present`, `Minteo (acquired by Zabio) – Fintech`; `dist/es/index.html` contains `AI/Product Engineer`, `2026 – Presente`, `Minteo (adquirida por Zabio) – Fintech`, `exponían`. Review assessment (base `114de9e`, untracked excluded): medium, `under_budget`, no review due.
- **T2** — commit `bc40c9b` (`chore(cv): update downloadable CVs with Zabio role`). SHA-1 match with source: EN `bc5d89d2…`, ES `310e90a1…`. Hrefs in `AboutSection.astro` untouched (same filenames).
- **T3** — commit `7d25424` (`chore(skills): add landing-page-design skill`). `cmp` against the upstream download: identical, 16528 bytes. Content reviewed before install: design guidance only, no commands or tool instructions.

Not run: no automated tests exist in this repo, so no RED/GREEN evidence. No visual check in a browser.

Notes carried to the user:

- Tense: leading verbs were already uniformly preterite/past in both locales; the only change was `exponen` → `exponían` (ES, Arvolution).
- The CV calls the event both an acquisition (company label) and a merger (Zabio bullet); the landing mirrors the CV wording as is.
- Zabio has no `sector` on the landing because the CV has none.

## Next step

Feature complete on the branch. Push / PR / merge are the user's decision. The visual redesign is a separate feature, pending a direction choice.
