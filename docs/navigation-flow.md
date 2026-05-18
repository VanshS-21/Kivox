# Navigation Flow

## Main Site Spine

The global Kivox shell appears on every non-showcase route.

- Home: `/`
- Services: `/#services`
- Work: `/work`
- About: `/#team`
- Blog: `/blog`
- Contact: `/contact`
- Primary CTA: `/contact`

The footer repeats the main spine, adds process and FAQ paths, and exposes legal routes:

- FAQ: `/faq`
- Privacy: `/privacy`
- Terms: `/terms`

## Home Flow

Home should move visitors from orientation to proof to action:

1. Hero: start a project via `/contact` or inspect proof via `/work`.
2. Project band: signals the kinds of businesses Kivox builds for.
3. Featured work: each showcased project offers a live website path and a case-study path.
4. Services, process, team, FAQ: answer fit and trust questions.
5. Contact band: sends qualified visitors to `/contact`.

## Work Flow

Work is the proof hub. Every project card should expose both paths when available:

- Live Website: opens the live demo or external project URL.
- Case Study: opens `/work/{slug}` for the thinking, process, and decisions.

Current project routes:

- MedQueue: `/work/hospital` -> `/showcase/medqueue`
- The Roastery: `/work/cafe` -> `/showcase/cafe`
- Aurelia Grand: `/work/hotel` -> `https://aurum-palace.vercel.app/`
- Greenfield Academy: `/work/school` -> `/showcase/school`
- Vortex Fitness: `/work/fitness` -> `/showcase/fitness`

Case-study pages should keep three exits visible:

- Back to all work: `/work`
- Live website: project `liveUrl`
- Next project: the next `/work/{slug}` in the project list

## Showcase Flow

Showcase routes intentionally hide the normal Kivox navigation so each demo can feel like its own property. The fixed demo frame provides the Kivox return paths:

- Case Study: `/work/{slug}`
- All Work: `/work`

Current showcase routes:

- MedQueue: `/showcase/medqueue`, `/showcase/medqueue/search`, `/showcase/medqueue/doctor/{id}`, `/showcase/medqueue/book/{id}`, `/showcase/medqueue/portal`, `/showcase/medqueue/design-system`
- The Roastery: `/showcase/cafe`
- Greenfield Academy: `/showcase/school`
- Vortex Fitness: `/showcase/fitness`

The cafe, school, and fitness demos currently use in-page anchors for their sub-navigation. Deeper routes from the showcase scope document should only be linked once those pages exist.
