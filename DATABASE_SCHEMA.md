# Database Schema

## Schema design principles

- separate patient-submitted data from doctor-submitted data
- store consent explicitly
- keep donor-story drafts separate from raw patient records
- allow time-based tracking before, during, and after LungFit
- support auditability and exportability

## Core tables

### `users`

Purpose:

- central authentication-linked user table

Important fields:

- `id`
- `email`
- `role`
- `status`
- `created_at`

Relationships:

- one-to-one with `patients`, `doctors`, or `trrf_staff`

### `patients`

Purpose:

- patient profile and patient-specific settings

Important fields:

- `id`
- `user_id`
- `study_id`
- `display_name`
- `region`
- `program_status`
- `privacy_level`

Relationships:

- one-to-many with `patient_conversations`
- one-to-many with `patient_health_entries`
- one-to-many with `consent_records`
- one-to-many with `doctor_surveys`
- one-to-many with `doctor_comments`

### `doctors`

Purpose:

- doctor / staff profile

Important fields:

- `id`
- `user_id`
- `organization`
- `role_title`
- `region`

Relationships:

- one-to-many with `patient_assignments`
- one-to-many with `doctor_surveys`
- one-to-many with `doctor_comments`

### `trrf_staff`

Purpose:

- TRRF internal user profile and permission tier

Important fields:

- `id`
- `user_id`
- `team_name`
- `permission_level`

Relationships:

- one-to-many with `donor_story_drafts`
- one-to-many with `audit_logs`

### `patient_assignments`

Purpose:

- links patients with allowed doctors / staff

Important fields:

- `id`
- `patient_id`
- `doctor_id`
- `assignment_start`
- `assignment_end`
- `is_active`

Relationships:

- many-to-one to `patients`
- many-to-one to `doctors`

### `hospital_case_search_index`

Purpose:

- supports de-identified hospital-wide case search for doctors outside their assigned patient list

Important fields:

- `id`
- `patient_id`
- `hospital_id`
- `cancer_type`
- `cancer_stage`
- `sex`
- `age_range`
- `treatment_types_json`
- `program_phase`
- `deidentified_summary_json`

Relationships:

- many-to-one to `patients`

Notes:

- this table or view should expose only de-identified searchable fields
- it should not include name, direct patient ID, full date of birth, or direct contact information

## Patient conversation and consent tables

### `patient_conversations`

Purpose:

- stores patient chat threads / sessions

Important fields:

- `id`
- `patient_id`
- `conversation_type`
- `started_at`
- `ended_at`
- `summary_text`

Relationships:

- one-to-many with `chatbot_messages`

### `chatbot_messages`

Purpose:

- stores message-by-message conversation history

Important fields:

- `id`
- `conversation_id`
- `sender_type`
- `message_text`
- `contains_sensitive_health_data`
- `created_at`

Relationships:

- many-to-one to `patient_conversations`
- optional source link to `patient_health_entries`

### `consent_records`

Purpose:

- stores explicit consent history

Important fields:

- `id`
- `patient_id`
- `consent_type`
- `granted`
- `granted_at`
- `source`
- `notes`

Relationships:

- many-to-one to `patients`

Suggested consent types:

- `health_data_collection`
- `longitudinal_tracking`
- `anonymized_quote_use`
- `story_review_contact`
- `future_voice_input`

## Structured health and survey tables

### `patient_health_entries`

Purpose:

- stores structured patient-reported check-in data

Important fields:

- `id`
- `patient_id`
- `entry_date`
- `entry_type`
- `survey_type`
- `phase`
- `metrics_json`
- `free_text_summary`

Relationships:

- many-to-one to `patients`
- optional link to `chatbot_messages`
- optional link to `lungfit_program_periods`

Use this table for:

- emotional wellbeing
- fatigue
- pain / discomfort
- physical activity
- quality of life
- support preferences
- programme experience
- donor-story opt-in answers

### `doctor_surveys`

Purpose:

- stores structured doctor / medical-staff survey responses

Important fields:

- `id`
- `patient_id`
- `doctor_id`
- `survey_date`
- `survey_type`
- `assessment_moment`
- `responses_json`

Relationships:

- many-to-one to `patients`
- many-to-one to `doctors`
- optional link to `lungfit_program_periods`

Use this table for:

- clinical profile
- professional assessment
- progress comparison
- referral suitability
- programme impact observations

### `doctor_comments`

Purpose:

- stores narrative doctor comments without altering original patient data

Important fields:

- `id`
- `patient_id`
- `doctor_id`
- `comment_type`
- `comment_text`
- `visibility_level`
- `created_at`

Relationships:

- many-to-one to `patients`
- many-to-one to `doctors`

### `lungfit_program_periods`

Purpose:

- defines program timing for before / during / after analysis

Important fields:

- `id`
- `patient_id`
- `program_name`
- `start_date`
- `end_date`
- `phase`

Relationships:

- many-to-one to `patients`
- one-to-many with `patient_health_entries`
- one-to-many with `doctor_surveys`

## AI, analytics, and reporting tables

### `ai_analysis_reports`

Purpose:

- stores AI-generated summaries and analysis outputs

Important fields:

- `id`
- `patient_id`
- `analysis_type`
- `period_start`
- `period_end`
- `input_scope`
- `report_json`
- `generated_at`

Relationships:

- many-to-one to `patients`
- optional many-to-one to `lungfit_program_periods`

### `dashboard_metrics`

Purpose:

- precomputed metrics for dashboards and exports

Important fields:

- `id`
- `patient_id`
- `metric_name`
- `metric_value`
- `metric_period`
- `source_type`
- `generated_at`

Relationships:

- many-to-one to `patients`
- optional link to `lungfit_program_periods`

### `donor_story_drafts`

Purpose:

- stores AI-generated draft stories for TRRF review

Important fields:

- `id`
- `patient_id`
- `draft_type`
- `draft_text`
- `anonymized`
- `approval_status`
- `reviewed_by_trrf_staff_id`
- `reviewed_at`

Relationships:

- many-to-one to `patients`
- many-to-one to `trrf_staff`

### `audit_logs`

Purpose:

- tracks sensitive actions and data access

Important fields:

- `id`
- `actor_user_id`
- `action_type`
- `target_type`
- `target_id`
- `metadata_json`
- `created_at`

Relationships:

- can reference any user or record type indirectly

## Survey-to-schema mapping

### Patient general survey maps mainly to:

- `patients`
- `patient_health_entries`
- `consent_records`

Main categories captured:

- cancer context
- treatment context
- knowledge / understanding
- physical status
- emotional wellbeing
- support needs
- anonymized sharing preferences

### Patient LungFit survey maps mainly to:

- `patient_health_entries`
- `lungfit_program_periods`
- `consent_records`
- `donor_story_drafts`

Main categories captured:

- programme experience
- measurable before/after progress
- attendance
- improvement ideas
- story and donor-facing quote permissions

### Doctor general survey maps mainly to:

- `doctor_surveys`
- `doctor_comments`
- `lungfit_program_periods`

Main categories captured:

- professional status assessment
- evolution over time
- suitability for support programmes
- recommended support and tracking indicators

### Doctor LungFit survey maps mainly to:

- `doctor_surveys`
- `ai_analysis_reports`
- `dashboard_metrics`

Main categories captured:

- programme relevance
- observed outcomes
- recommended operational metrics
- credibility and improvement feedback

## Recommendation for prototype implementation

For v1, keep survey responses in structured JSON plus a few key top-level columns:

- `survey_type`
- `assessment_moment`
- `phase`
- `entry_date`
- `patient_id`

That will keep the schema flexible while you refine exact questions.

For doctor search in v1, implement a de-identified search view from `hospital_case_search_index` rather than exposing the main patient table directly.
