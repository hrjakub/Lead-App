# Privacy and Consent Notes

## Prototype stance

This prototype deals with health-related and emotionally sensitive information.
Even though it is a prototype, it should be designed as if privacy and controlled access already matter.

## Non-medical positioning

The chatbot must:

- clearly state that it is supportive and reflective
- not present itself as a doctor
- not diagnose
- not recommend treatment
- not replace medical advice

## Consent requirements

The system should explicitly ask for consent before:

- collecting sensitive health data
- storing longitudinal progress information
- using anonymized quotes in reports
- using story-like excerpts for donor communication
- enabling future voice features

Each consent event should be stored with:

- patient identifier
- consent type
- grant / deny outcome
- timestamp
- collection source

## Data minimization

Prefer:

- study IDs
- pseudonymized records
- region-level context

Avoid asking the chatbot to collect:

- full home address
- national ID
- unnecessary personal identifiers

unless there is a clear, separately governed reason.

## Role-based access

### Patient

- sees own data only

### Doctor / medical staff

- sees assigned patients with full allowed detail
- can add notes and surveys
- cannot alter original patient submissions
- may search non-assigned hospital cases only in de-identified form
- should not see non-assigned patient names, IDs, dates of birth, or other direct identifiers

### TRRF staff

- should be allowed to see patient names so support can be directed to the correct person
- should still default to the minimum additional data needed beyond the patient name
- should limit access to other direct identifiers unless justified by operational policy
- should review donor-facing outputs before use

## Donor-story safeguards

Any donor-facing story should:

- be draft-only by default
- use anonymized or pseudonymized information
- depend on explicit consent
- be reviewed by TRRF staff before sharing

## Auditability

The prototype should log:

- who viewed sensitive records
- who generated a draft story
- who approved or rejected a draft
- who exported data

## AI handling principles

- keep AI prompts server-side only
- do not store API keys in client code
- avoid passing unnecessary identifying details into prompts
- separate identifiable patient data from story generation whenever possible
- do not position the system as an automated treatment recommendation engine

## Future compliance direction

The prototype should be designed with future GDPR and health-data compliance in mind, even if it is not production-ready yet.

That means:

- explicit consent
- clear role boundaries
- limited-access design
- audit logs
- human approval for sensitive outward communication
