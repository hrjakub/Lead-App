# Project Overview

## Purpose

`Monika AI Prototype` is a healthcare-adjacent TRRF prototype for LungFit.

Important scope rule:

- `LungFit` is only for `lung cancer patients`
- `TRRF staff` are mainly interested in that LungFit lung-cancer cohort
- `Doctors` can still use the platform to review and compare broader cancer cases outside the LungFit cohort

Its purpose is to help TRRF collect, organize, and understand patient and medical-staff data over time, then turn that into:

- patient progress tracking
- doctor-informed longitudinal records
- program dashboards
- exportable tables
- AI-generated summaries
- donor-safe draft stories after TRRF review

## What the project is trying to achieve

The system should connect three main parties:

- `Patients`
- `Doctors / medical staff`
- `TRRF staff`

The patient side focuses on supportive conversation and structured reflection.
The doctor side focuses on clinical context and independent assessment.
The TRRF side focuses on dashboards, program understanding, exports, and reviewed communication outputs.

## Main user views

### Patient

The patient logs in and sees:

- a supportive AI chatbot
- a clear non-medical disclaimer
- a consent flow before sensitive health collection
- short conversational check-ins
- an `entry survey` at the beginning of care
- a `follow-up treatment survey` on a recurring cadence, weekly by default and configurable by patient or program
- no dashboard in v1, to avoid demotivating patients when performance temporarily declines

### Doctor / medical staff

The doctor logs in and sees:

- assigned patients only
- patient-submitted records in read-only form
- structured survey forms
- comment and note fields
- progress history over time
- a clickable patient detail view that opens the full patient record, timeline, surveys, notes, and dashboard
- a hospital-wide de-identified case search filtered by cancer type, stage, sex, age range, and treatment used

### TRRF staff

TRRF staff log in and see:

- program dashboards focused on the LungFit lung-cancer cohort
- patient and doctor data according to privacy rules
- patient names, so support can be directed to the correct person
- export tools
- AI summaries
- donor-story drafts that require human review and approval
- a clickable patient detail view for reviewing individual cases and dashboards

## Confirmed survey inventory

### Patient survey 1

- Title: `General Cancer Patient Self-Report Survey`
- Link: [forms.gle/4KHu9Lr8E98GjUNL9](https://forms.gle/4KHu9Lr8E98GjUNL9)
- Main sections:
  - consent and anonymous tracking
  - patient profile
  - cancer and treatment context
  - knowledge and understanding
  - physical condition and daily functioning
  - emotional wellbeing and support needs
  - support preferences and unmet needs
  - data sharing

### Patient survey 2

- Title: `TRRF Patient Programme Experience & Impact Survey`
- Link: [forms.gle/rwg1AyC5Y1SXwCG27](https://forms.gle/rwg1AyC5Y1SXwCG27)
- Main sections:
  - consent and background
  - experience with the programme
  - measurable progress
  - programme improvement
  - patient story and donor communication

### Doctor survey 1

- Title: `Medical Staff General Cancer Patient Evaluation Survey`
- Link: [forms.gle/L81VNh6ds66jifnK9](https://forms.gle/L81VNh6ds66jifnK9)
- Main sections:
  - consent, role, and anonymous tracking
  - patient clinical profile
  - professional assessment of patient status
  - progress since previous assessment
  - support needs and referral potential
  - data useful for impact tracking

### Doctor survey 2

- Title: `TRRF Medical Staff Programme Impact Survey`
- Link: [forms.gle/xNwaW9Ye2yYc2AUKA](https://forms.gle/xNwaW9Ye2yYc2AUKA)
- Main sections:
  - professional background
  - programme relevance
  - patient outcomes observed
  - operational and reporting metrics
  - credibility and improvement

## Key workflows

### 1. Patient support and data capture

- patient logs in
- chatbot greets warmly
- chatbot asks general emotional / diary-style questions
- chatbot asks permission before sensitive questions
- structured patient surveys are dated and stored
- the patient completes an entry survey and then recurring follow-up treatment surveys
- each patient survey is sent to the assigned doctor for matching clinical review

### 2. Medical-staff assessment

- doctor logs in
- doctor views assigned patient data
- doctor can search similar de-identified hospital cases for comparison and learning
- doctor completes a parallel entry survey and a parallel follow-up survey
- once both patient and doctor surveys exist for the same stage, the doctor can compare both, add comments, and use tracking links
- after review, anonymized learnings can be uploaded to the broader doctor comparison layer
- doctor adds comments without changing patient-submitted data

### 3. TRRF analysis and communication

- TRRF staff view dashboards and exports
- AI generates summaries and draft stories
- TRRF reviews, edits, and approves anything donor-facing

## Main product modules

- authentication and role-based access
- patient chatbot module
- patient structured check-in module
- doctor survey module
- doctor comment module
- TRRF dashboard module
- AI summary and story-draft module
- export module
- consent and audit module

## Current working decisions

- structured patient check-ins should run `weekly` by default
- check-in cadence should remain configurable by patient or program
- patients should not see dashboards in v1
- patient-level dashboards should be visible only to doctors and TRRF staff
- doctor and TRRF views should support clickable patient drill-down pages
- doctors should see full identifiable detail only for assigned patients
- doctors should also have access to de-identified hospital-wide case search using non-sensitive filters only
- TRRF staff should see patient names for support coordination
- TRRF staff should still limit other direct identifiers to operational need
- the first demo should use simulated AI responses rather than a live OpenAI integration
- the TRRF-facing cohort in v1 should be limited to lung cancer patients because LungFit is lung-cancer-specific
- the doctor-facing comparison layer can include broader cancer types outside the LungFit cohort

## Biggest open questions

- whether the first build should use mock data or real DB integration immediately
