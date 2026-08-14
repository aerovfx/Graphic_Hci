# GitHub Education Pages Template

Use this source as a reusable starting point for a static education website hosted on GitHub Pages.

## Required outcome

The generated project must include:

1. A public course catalog that reads Markdown content.
2. A course reader organized as Lesson → Presentation → Exercise → Code → Project.
3. A classroom Portal for selecting course, class, session, and student.
4. A student survey saved by student and session.
5. Peer assessment using configurable criteria and a 1–5 scale.
6. A teacher dashboard for individual scoring, comments, CSV export, and JSON backup.
7. A result dashboard combining survey, peer, and teacher data.
8. Optional centralized synchronization through Google Apps Script and Google Sheets.
9. A shared responsive theme and top navigation across every classroom page.
10. A GitHub Actions workflow that deploys the static site to GitHub Pages.

## Adaptation checklist

- Replace repository owner/name in README, Google Apps Script roster URL, and Pages URLs.
- Replace sample classes, students, sessions, courses, and criteria in `tools/khao-sat/data/`.
- Keep stable student IDs; do not use names as database keys.
- Update course Markdown under `courses/<course>/lessons/`.
- Run `python3 scripts/build_course_materials.py` and `python3 scripts/build_course_catalog.py`.
- Test all classroom pages without cloud configuration first.
- Treat student records as private data and do not commit real assessment results.
- Configure a Sheets backend only after local workflows pass.
- Verify mobile layout, keyboard navigation, active menu state, and reduced motion.
- Deploy through `.github/workflows/jekyll-gh-pages.yml` and verify public URLs return HTTP 200.

## Data model

- `classes`: id, name, teacher, room, schedule
- `students`: id, name, classId, avatar
- `sessions`: id, title, phase
- `criteria`: id, label, icon, description
- survey record: studentId, classId, sessionId, answers, submittedAt
- peer record: raterId, targetId, sessionId, scores, note
- teacher grade: studentId, classId, scores, note, updatedAt

## Safety defaults

- GitHub Pages is static; use localStorage as an offline-first fallback.
- Never store API tokens, private keys, or real student exports in the repository.
- Keep Google Sheets private to authorized teachers.
- Provide CSV/JSON export and clear privacy notices.
- Use a server-side token or authenticated backend before accepting sensitive data publicly.
