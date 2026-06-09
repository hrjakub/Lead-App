# Monika AI Prototype

This workspace now contains both:

- the planning foundation for the TRRF LungFit concept
- a first deployable `Next.js` prototype with mock data and simulated AI responses

Important product rule:

- `LungFit` is treated as a program for `lung cancer patients only`
- the `TRRF` dashboard and donor-story layer focus on that lung-cancer cohort
- the `doctor` experience can still review and compare other cancer types through the broader clinical dataset

The system is intended to:

- collect patient-reported data through a supportive AI chatbot and structured surveys
- collect separate doctor / medical-staff assessments and comments
- store the data in a secure database with role-based access
- generate dashboards, exports, AI summaries, and donor-safe draft stories for TRRF staff review

## Core principles

- The database is the system of record.
- Excel / CSV are export layers, not the source of truth.
- The chatbot is supportive and reflective, not a clinician.
- The system must not provide diagnosis, treatment advice, or medical recommendations.
- Donor-facing stories must stay draft-only until reviewed and approved by TRRF staff.
- Privacy, consent, anonymization, and access control are first-class requirements.

## What is already built

The prototype app now includes:

- a landing page and mock role-based access page
- a `Patient` portal with:
  - supportive chatbot
  - non-medical disclaimer
  - consent gate before sensitive collection
  - weekly structured check-in
  - no dashboard in v1
- a `Doctor` portal with:
  - assigned-patient list
  - clickable patient detail views
  - de-identified hospital-wide case search
- a `TRRF` portal with:
  - patient list and drill-down views
  - simple dashboard cards
  - donor-story review queue
  - CSV export route
- future-ready scaffolding for:
  - Supabase schema
  - environment variables
  - later real AI integration

## Prototype routes

- `/`
- `/login`
- `/patient`
- `/doctor`
- `/doctor/patients/michael-scott`
- `/trrf`
- `/trrf/patients/michael-scott`
- `/api/export/patients`

## Local run

1. Install dependencies with `npm install`
2. Start the app with `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

For now the project runs in `mock` mode. Real authentication, database reads/writes, and live AI calls are still the next layer.

## Documentation

- [PROJECT_OVERVIEW.md](/Users/jakub/Documents/TRRF Website/PROJECT_OVERVIEW.md)
- [SYSTEM_ARCHITECTURE.md](/Users/jakub/Documents/TRRF Website/SYSTEM_ARCHITECTURE.md)
- [DATABASE_SCHEMA.md](/Users/jakub/Documents/TRRF Website/DATABASE_SCHEMA.md)
- [MVP_ROADMAP.md](/Users/jakub/Documents/TRRF Website/MVP_ROADMAP.md)
- [PRIVACY_AND_CONSENT_NOTES.md](/Users/jakub/Documents/TRRF Website/PRIVACY_AND_CONSENT_NOTES.md)
- [docs/trrf-prototype-blueprint.md](/Users/jakub/Documents/TRRF Website/docs/trrf-prototype-blueprint.md)

## Confirmed survey sources

Patient surveys:

- [General Cancer Patient Self-Report Survey](https://forms.gle/4KHu9Lr8E98GjUNL9)
- [TRRF Patient Programme Experience & Impact Survey](https://forms.gle/rwg1AyC5Y1SXwCG27)

Doctor / medical-staff surveys:

- [Medical Staff General Cancer Patient Evaluation Survey](https://forms.gle/L81VNh6ds66jifnK9)
- [TRRF Medical Staff Programme Impact Survey](https://forms.gle/xNwaW9Ye2yYc2AUKA)

## Current recommended first build

The current codebase now implements that first presentable version with mock data. The next recommended step is to replace the mock layer with:

1. Supabase Auth
2. Supabase Postgres
3. persisted chat and survey submissions
4. real role-based access control
5. later, a live OpenAI integration
