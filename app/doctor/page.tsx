import Link from "next/link";

import { CaseSearch } from "@/components/CaseSearch";
import { demoCaseIndex, demoDoctors, getAssignedPatientsForDoctor, prototypeStats } from "@/lib/demo-data";

const demoDoctor = demoDoctors[0];
const assignedPatients = getAssignedPatientsForDoctor(demoDoctor.id);

export default function DoctorPage() {
  return (
    <main className="stack-xl">
      <section className="card panel-empathy">
        <div className="card-head">
          <div>
            <span className="eyebrow">Doctor portal</span>
            <h1>{demoDoctor.displayName}</h1>
          </div>
          <span className="pill">{demoDoctor.organization}</span>
        </div>

        <p className="hero-copy">
          Full access is limited to assigned patients. De-identified hospital-wide case search remains available for
          comparison across similar cases without exposing sensitive identity details.
        </p>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Assigned patients</span>
              <h2>Direct care view</h2>
            </div>
            <span className="pill pill-soft">{assignedPatients.length} patients</span>
          </div>

          <div className="stack-sm">
            {assignedPatients.map((patient) => (
              <Link key={patient.id} href={`/doctor/patients/${patient.id}`} className="patient-row">
                <div>
                  <strong>{patient.displayName}</strong>
                  <p className="muted">
                    {patient.cancerType} • {patient.stage}
                  </p>
                  <p className="muted">
                    Entry pair: {patient.surveyWorkflow.entryPair.doctorSurvey.status} • Follow-up pair:{" "}
                    {patient.surveyWorkflow.followUpPair.doctorSurvey.status}
                  </p>
                </div>
                <div className="patient-row__meta">
                  <span>
                    {patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
                      ? "Follow-up pair ready"
                      : "Follow-up doctor survey pending"}
                  </span>
                  <span className="text-link">Open record</span>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Survey workflow</span>
              <h2>Current doctor inputs</h2>
            </div>
          </div>

          <ul className="flat-list">
            <li>Entry survey pair: patient understanding vs clinical reality</li>
            <li>Follow-up treatment survey pair: patient progress vs clinical progress</li>
            <li>Doctor-only comments, misunderstanding flags, and progress links</li>
            <li>{prototypeStats.anonymousCases} anonymous comparison cases currently searchable</li>
          </ul>
        </article>
      </section>

      <CaseSearch cases={demoCaseIndex} />
    </main>
  );
}
