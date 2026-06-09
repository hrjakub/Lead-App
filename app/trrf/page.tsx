import Link from "next/link";

import {
  donorDrafts,
  getDonorDraftPatientName,
  programSummary,
  prototypeStats,
  trrfImpactThemes,
  trrfFocusPatients
} from "@/lib/demo-data";

export default function TrrfPage() {
  return (
    <main className="stack-xl">
      <section className="card panel-empathy">
        <div className="card-head">
          <div>
            <span className="eyebrow">TRRF portal</span>
            <h1>Operational dashboard and story review</h1>
          </div>
          <span className="pill">Names visible for support coordination</span>
        </div>

        <p className="hero-copy">
          TRRF can see program-level dashboards, patient detail views, and donor-story drafts for the LungFit cohort. In
          this prototype, LungFit is treated as a lung-cancer-only program, while broader cancer comparison remains on the
          doctor side.
        </p>
      </section>

      <section className="grid-3">
        <article className="card stat-card">
          <span className="eyebrow">Patients tracked</span>
          <strong>{programSummary.activePatients}</strong>
          <p>Inside the current mock LungFit lung-cancer cohort</p>
        </article>

        <article className="card stat-card">
          <span className="eyebrow">In LungFit now</span>
          <strong>{programSummary.inLungFit}</strong>
          <p>Currently in the active program phase</p>
        </article>

        <article className="card stat-card">
          <span className="eyebrow">Story drafts ready</span>
          <strong>{programSummary.storyDraftsReady}</strong>
          <p>Drafted for internal review, not donor-ready yet</p>
        </article>
      </section>

      <section className="grid-3">
        <article className="card stat-card">
          <span className="eyebrow">Total prototype records</span>
          <strong>{prototypeStats.trackedPatients}</strong>
          <p>Named patient records inside the current role-based demo</p>
        </article>

        <article className="card stat-card">
          <span className="eyebrow">Anonymous comparison cases</span>
          <strong>{prototypeStats.anonymousCases}</strong>
          <p>Doctor-searchable cases across lung and non-lung oncology</p>
        </article>

        <article className="card stat-card">
          <span className="eyebrow">Follow-up needed</span>
          <strong>{programSummary.followUpNeeded}</strong>
          <p>LungFit patients currently flagged for closer support</p>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Patient list</span>
              <h2>Open a LungFit patient dashboard</h2>
            </div>
          </div>

          <div className="stack-sm">
            {trrfFocusPatients.map((patient) => (
              <Link key={patient.id} href={`/trrf/patients/${patient.id}`} className="patient-row">
                <div>
                  <strong>{patient.displayName}</strong>
                  <p className="muted">
                    {patient.region} • {patient.cancerType} • {patient.programPhase}
                  </p>
                </div>
                <div className="patient-row__meta">
                  <span>{patient.riskLevel}</span>
                  <span className="text-link">Open record</span>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Export and reporting</span>
              <h2>Prototype actions</h2>
            </div>
          </div>

          <ul className="flat-list">
            <li>
              <a href="/api/export/patients" className="text-link">
                Export LungFit cohort CSV
              </a>
            </li>
            <li>Review donor stories by audience segment</li>
            <li>Compare before, during, and after LungFit progress</li>
          </ul>
        </article>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <span className="eyebrow">Program themes</span>
            <h2>What the current LungFit cohort is surfacing</h2>
          </div>
        </div>

        <div className="grid-3">
          {trrfImpactThemes.map((theme) => (
            <article key={theme.title} className="note-card">
              <span className="eyebrow">Cohort signal</span>
              <strong>{theme.title}</strong>
              <p className="muted">{theme.count} patients in the current cohort</p>
              <p>{theme.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <div>
            <span className="eyebrow">Draft communication queue</span>
            <h2>Donor-safe stories awaiting review</h2>
          </div>
        </div>

        <div className="stack-sm">
          {donorDrafts.map((draft) => (
            <div key={draft.id} className="note-card">
              <div className="case-head">
                <strong>{getDonorDraftPatientName(draft.patientId)}</strong>
                <span className="pill pill-soft">{draft.audience}</span>
              </div>
              <p className="muted">{draft.approvalStatus}</p>
              <p>{draft.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
