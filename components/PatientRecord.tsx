import { getPatientConsentItems, getTreatmentTimeline, type Patient } from "@/lib/demo-data";

type Props = {
  patient: Patient;
  role: "doctor" | "trrf";
};

function MetricBar({ label, value, inverse = false }: { label: string; value: number; inverse?: boolean }) {
  const normalized = inverse ? 100 - value : value;

  return (
    <div className="metric-row">
      <div className="metric-row__label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="metric-row__track">
        <span className="metric-row__fill" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

export function PatientRecord({ patient, role }: Props) {
  const isLungFitCohort = patient.cancerType === "Lung cancer";
  const treatmentTimeline = getTreatmentTimeline(patient);
  const consentItems = getPatientConsentItems(patient);

  return (
    <div className="stack-lg">
      <section className="card panel-empathy">
        <div className="card-head">
          <div>
            <span className="eyebrow">{role === "doctor" ? "Assigned patient detail" : "TRRF patient detail"}</span>
            <h1>{patient.displayName}</h1>
          </div>
          <span className="pill">{patient.programPhase}</span>
        </div>

        <div className="hero-grid">
          <div>
            <p className="hero-copy">{patient.patientSummary}</p>
            <div className="meta-grid">
              <div className="meta-card">
                <span>Study ID</span>
                <strong>{patient.studyId}</strong>
              </div>
              <div className="meta-card">
                <span>Cancer profile</span>
                <strong>
                  {patient.cancerType} • {patient.stage}
                </strong>
              </div>
              <div className="meta-card">
                <span>Last check-in</span>
                <strong>{patient.lastCheckIn}</strong>
              </div>
              <div className="meta-card">
                <span>Current risk signal</span>
                <strong>{patient.riskLevel}</strong>
              </div>
            </div>
          </div>

          <div className="support-card">
            <span className="eyebrow">Operational follow-up</span>
            <h2>Next action</h2>
            <p>{patient.nextAction}</p>

            {role === "trrf" ? (
              <div className="stack-sm">
                <p className="muted">TRRF can see patient names for support coordination in this prototype.</p>
                <p>
                  <strong>Contact:</strong> {patient.contact.phone} • {patient.contact.email}
                </p>
              </div>
            ) : (
              <p className="muted">
                Doctors keep full identifiable access only for assigned patients. Non-assigned cases stay de-identified in
                the comparison view.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="grid-2">
        <article className="card" id="dashboard-snapshot">
          <div className="card-head">
            <div>
              <span className="eyebrow">Dashboard snapshot</span>
              <h2>Patient health view</h2>
            </div>
            <span className="pill pill-soft">Visible to doctors and TRRF only</span>
          </div>

          <MetricBar label="Mood stability" value={patient.metrics.mood} />
          <MetricBar label="Energy" value={patient.metrics.energy} />
          <MetricBar label="Adherence" value={patient.metrics.adherence} />
          <MetricBar label="Symptom load" value={patient.metrics.symptomLoad} inverse />
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Support insight</span>
              <h2>What would help next</h2>
            </div>
          </div>

          <div className="stack-sm">
            <p>
              <strong>Patient preference:</strong> {patient.supportPreference}
            </p>
            <p>
              <strong>Key need:</strong> {patient.keyNeed}
            </p>
            <p>
              <strong>Latest doctor note:</strong> {patient.latestDoctorComment}
            </p>
          </div>
        </article>
      </section>

      <section className="card" id="weekly-trend">
        <div className="card-head">
          <div>
            <span className="eyebrow">Weekly trend</span>
            <h2>{isLungFitCohort ? "Before and during LungFit tracking" : "Longitudinal patient tracking"}</h2>
          </div>
        </div>

        <div className="timeline-chart">
          {patient.weeklyTrend.map((entry) => (
            <div key={entry.label} className="timeline-column">
              <div className="timeline-bar-group">
                <span className="timeline-bar timeline-bar--mood" style={{ height: `${entry.mood}%` }} />
                <span className="timeline-bar timeline-bar--energy" style={{ height: `${entry.energy}%` }} />
                <span className="timeline-bar timeline-bar--symptom" style={{ height: `${entry.symptomLoad}%` }} />
              </div>
              <strong>{entry.label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Treatment timeline</span>
              <h2>How this case has progressed</h2>
            </div>
          </div>

          <div className="timeline-list">
            {treatmentTimeline.map((entry) => (
              <div key={`${entry.date}-${entry.title}`} className={`timeline-list__item timeline-list__item--${entry.emphasis}`}>
                <div className="timeline-list__date">{entry.date}</div>
                <div>
                  <strong>{entry.title}</strong>
                  <p className="muted">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Permissions overview</span>
              <h2>{role === "doctor" ? "Consent and sharing status" : "Operational permissions"}</h2>
            </div>
          </div>

          <div className="stack-sm">
            {consentItems.map((item) => (
              <div key={item.label} className="note-card">
                <div className="case-head">
                  <strong>{item.label}</strong>
                  <span
                    className={`pill ${
                      item.status === "Granted"
                        ? "pill-soft"
                        : item.status === "Not granted"
                          ? "pill-warning"
                          : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card" id="assessment-history">
          <div className="card-head">
            <div>
              <span className="eyebrow">Surveys and forms</span>
              <h2>Recorded assessments</h2>
            </div>
          </div>

          <div className="stack-sm">
            {patient.surveySnapshots.map((survey) => (
              <div key={`${survey.title}-${survey.updatedAt}`} className="note-card">
                <strong>{survey.title}</strong>
                <p className="muted">
                  {survey.status} • {survey.updatedAt}
                </p>
                <ul className="flat-list">
                  {survey.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Human context</span>
              <h2>Conversation highlights</h2>
            </div>
          </div>

          <div className="stack-sm">
            {patient.patientQuotes.map((quote) => (
              <blockquote key={quote} className="quote-card">
                “{quote}”
              </blockquote>
            ))}

            <ul className="flat-list">
              {patient.conversationHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Clinical notes</span>
              <h2>Doctor comments</h2>
            </div>
          </div>

          <div className="stack-sm">
            {patient.doctorComments.map((comment) => (
              <div key={`${comment.author}-${comment.date}`} className="note-card">
                <strong>{comment.author}</strong>
                <p className="muted">{comment.date}</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Draft communication</span>
              <h2>
                {role === "trrf"
                  ? "Donor-safe story view"
                  : isLungFitCohort
                    ? "What TRRF may later communicate"
                    : "Comparison-only narrative context"}
              </h2>
            </div>
          </div>

          <p>{patient.donorSafeStory}</p>
          <p className="muted">
            {role === "trrf"
              ? "Stories still require TRRF review and audience-specific editing before any donor use."
              : isLungFitCohort
                ? "This narrative layer is separate from clinical interpretation and stays reviewed before donor use."
                : "For non-lung comparison cases, this text is only contextual and should stay outside the TRRF LungFit donor layer."}
          </p>
        </article>
      </section>
    </div>
  );
}
