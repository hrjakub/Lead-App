# MVP Roadmap

## Goal

Build a realistic, presentable prototype for TRRF without trying to solve the full product at once.

## Phase 1: Website shell with three logins

Deliver:

- patient login
- doctor / medical-staff login
- TRRF staff login
- mock dashboards and protected routes
- patient-facing area without a dashboard

Why first:

- proves the 3-role concept quickly
- creates the navigation structure for the whole prototype

## Phase 2: Patient chatbot with stored conversations

Deliver:

- supportive chatbot UI
- disclaimer that it is not a doctor
- consent prompt before sensitive collection
- saved message history
- one short check-in flow
- one weekly structured patient survey with visible survey date and configurable cadence support
- simulated AI responses to validate workflow and safety without live model calls

Why next:

- this is the most visible and distinctive part of the prototype

## Phase 3: Doctor dashboard and survey input

Deliver:

- assigned-patient list
- patient read-only history
- clickable patient detail page
- paired survey workflow: patient survey first, doctor survey second, doctor-only comparison after both exist
- doctor general evaluation survey
- doctor LungFit impact survey
- comments / notes
- de-identified hospital-wide case search

Why next:

- adds the professional layer that makes the system credible

## Phase 4: TRRF dashboard with basic analytics

Deliver:

- patient timeline view
- simple before/during/after LungFit dashboard
- cohort summary cards
- TRRF patient drill-down page
- visibility by role/privacy

Why next:

- turns raw records into a usable internal tool

## Phase 5: AI analysis and donor story draft generation

Deliver:

- patient summaries
- cohort impact summary
- one donor-story draft workflow
- TRRF approval state

Why next:

- this is where donor communication becomes useful without bypassing review

## Phase 6: Excel / CSV export

Deliver:

- export patient-level data
- export survey data
- export dashboard metrics

Why next:

- helps TRRF inspect and present data in familiar formats

## Phase 7: Privacy, consent, anonymization, audit improvements

Deliver:

- stronger consent flows
- story anonymization rules
- audit log coverage
- role refinement

Why next:

- important for trust and future scaling

## Phase 8: Future voice input and external data integration

Deliver later:

- voice check-ins
- external study data
- hospital system integrations
- richer donor output formats

## Recommended first GitHub version

The best first GitHub build is:

1. Next.js app shell
2. Supabase auth and core schema
3. one working patient chatbot check-in with simulated AI responses
4. one doctor survey flow
5. one TRRF dashboard page
6. one CSV export

This is enough to demonstrate:

- the three-role structure
- the data model
- the AI concept
- the reporting concept

without overbuilding.

Real OpenAI integration should come only after the workflow, safety language, access rules, and survey structure feel stable.
