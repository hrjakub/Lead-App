import Link from "next/link";

import { demoRoleAccess, donorDrafts, prototypeStats } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <main className="stack-xl">
      <section className="hero-panel">
        <div className="hero-grid hero-grid--landing">
          <div className="stack-md">
            <span className="eyebrow">TRRF • LungFit • lung-cancer cohort prototype</span>
            <h1 className="hero-title--landing">One prototype for patient support, doctor insight, and TRRF coordination.</h1>
            <p className="hero-copy">
              This first build turns the strategy work into a working website: a patient chatbot flow, role-specific
              dashboards, clickable patient drill-down pages, de-identified doctor search, and donor-story drafts that stay
              behind TRRF review. In this version, TRRF views focus on lung-cancer patients in LungFit, while doctors can
              still compare broader oncology cases.
            </p>

            <div className="button-row">
              <Link href="/login" className="button-primary">
                Enter demo roles
              </Link>
              <Link href="/trrf" className="button-secondary">
                Open TRRF dashboard
              </Link>
            </div>
          </div>

          <div className="spotlight-card">
            <span className="eyebrow">What is live in this prototype</span>
            <div className="spotlight-metrics">
              <div>
                <strong>{prototypeStats.trackedPatients}</strong>
                <span>Named patient records</span>
              </div>
              <div>
                <strong>{prototypeStats.anonymousCases}</strong>
                <span>Anonymous comparison cases</span>
              </div>
              <div>
                <strong>{donorDrafts.length}</strong>
                <span>Draft donor stories</span>
              </div>
            </div>
            <p className="muted">
              The patient view avoids a dashboard on purpose. Doctor and TRRF users can open richer dashboards, paired
              survey reviews, timeline views, and anonymous comparison search.
            </p>
          </div>
        </div>
      </section>

      <section className="grid-3">
        {demoRoleAccess.map((entry) => (
          <article key={entry.role} className="card card-role">
            <span className="eyebrow">{entry.label}</span>
            <h2>{entry.route === "/patient" ? "Supportive patient flow" : entry.route === "/doctor" ? "Clinical context layer" : "Program intelligence layer"}</h2>
            <p>{entry.subtitle}</p>
            <Link href={entry.route} className="text-link">
              Open portal
            </Link>
          </article>
        ))}
      </section>

      <section className="grid-3">
        <article className="card">
          <span className="eyebrow">Patient input</span>
          <h2>Support first</h2>
          <p>
            The chatbot captures emotional and practical context, requests consent before sensitive health questions, and
            feeds a weekly structured check-in without showing discouraging charts back to the patient.
          </p>
        </article>

        <article className="card">
          <span className="eyebrow">Doctor input</span>
          <h2>Assigned detail, wider learning</h2>
          <p>
            Doctors see full detail for assigned patients and can search similar de-identified cases across the hospital by
            cancer type, stage, sex, age range, and treatment used.
          </p>
        </article>

        <article className="card">
          <span className="eyebrow">TRRF output</span>
          <h2>Dashboards plus story drafts</h2>
          <p>
            TRRF staff can review names for support coordination, inspect LungFit lung-cancer dashboards, and prepare
            donor-facing narratives only after review and editing.
          </p>
        </article>
      </section>
    </main>
  );
}
