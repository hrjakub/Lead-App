"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  getDoctorActionItems,
  getMisunderstandingFlags,
  getSurveyJourney,
  type Patient,
  type SurveyPair,
  type SurveyResponse
} from "@/lib/demo-data";

type Props = {
  patient: Patient;
};

type PhaseKey = "entryPair" | "followUpPair";

const doctorSurveyQuestions: Record<
  PhaseKey,
  Array<{
    id: string;
    label: string;
    type: "select" | "text";
    options?: string[];
    placeholder?: string;
  }>
> = {
  entryPair: [
    {
      id: "confirmed_cancer",
      label: "What cancer has been clinically confirmed?",
      type: "text",
      placeholder: "Example: Lung cancer"
    },
    {
      id: "confirmed_stage",
      label: "What stage has been clinically confirmed?",
      type: "text",
      placeholder: "Example: Stage II"
    },
    {
      id: "confirmed_treatment",
      label: "What treatment plan is actually underway?",
      type: "text",
      placeholder: "Example: chemotherapy plus breathing rehab"
    },
    {
      id: "patient_understanding",
      label: "How accurate is the patient's understanding of diagnosis and treatment?",
      type: "select",
      options: ["Very inaccurate", "Partly inaccurate", "Mostly accurate", "Very accurate"]
    },
    {
      id: "entry_priority",
      label: "What should be clarified or supported first?",
      type: "text",
      placeholder: "Example: side effects, treatment sequence, daily routine expectations."
    }
  ],
  followUpPair: [
    {
      id: "functioning",
      label: "How would you rate overall patient functioning this week?",
      type: "select",
      options: ["Very limited", "Needs close support", "Manageable with support", "Good", "Strong and independent"]
    },
    {
      id: "symptom_concern",
      label: "How concerning were observed symptoms?",
      type: "select",
      options: ["Very high concern", "High concern", "Moderate concern", "Low concern"]
    },
    {
      id: "adherence",
      label: "How strong was adherence this week?",
      type: "select",
      options: ["Very weak", "Inconsistent", "Moderate", "Strong", "Very strong"]
    },
    {
      id: "progress_alignment",
      label: "How well does the patient's view of progress match your clinical view?",
      type: "select",
      options: ["Very misaligned", "Partly misaligned", "Mostly aligned", "Strongly aligned"]
    },
    {
      id: "next_tracking",
      label: "What should be tracked next?",
      type: "text",
      placeholder: "Example: symptom spikes after treatment, adherence drops, energy recovery window."
    }
  ]
};

export function DoctorSurveyWorkflow({ patient }: Props) {
  const [activePhase, setActivePhase] = useState<PhaseKey>("followUpPair");
  const [doctorSurveyCompletedByPhase, setDoctorSurveyCompletedByPhase] = useState<Record<PhaseKey, boolean>>({
    entryPair: patient.surveyWorkflow.entryPair.doctorSurvey.status === "Completed",
    followUpPair: patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
  });
  const [doctorSubmittedAtByPhase, setDoctorSubmittedAtByPhase] = useState<Record<PhaseKey, string>>({
    entryPair: patient.surveyWorkflow.entryPair.doctorSurvey.submittedAt || "2026-05-16",
    followUpPair: patient.surveyWorkflow.followUpPair.doctorSurvey.submittedAt || "2026-06-08"
  });
  const [savedComment, setSavedComment] = useState("");
  const [commentDraft, setCommentDraft] = useState("");
  const [doctorValuesByPhase, setDoctorValuesByPhase] = useState<Record<PhaseKey, Record<string, string>>>({
    entryPair: {
      confirmed_cancer: patient.cancerType,
      confirmed_stage: patient.stage,
      confirmed_treatment: patient.treatmentUsed.join(", "),
      patient_understanding: "Mostly accurate",
      entry_priority: ""
    },
    followUpPair: {
      functioning: "Manageable with support",
      symptom_concern: "Moderate concern",
      adherence: "Strong",
      progress_alignment: "Mostly aligned",
      next_tracking: ""
    }
  });

  const activePair: SurveyPair = patient.surveyWorkflow[activePhase];
  const doctorSurveyCompleted = doctorSurveyCompletedByPhase[activePhase];
  const doctorSubmittedAt = doctorSubmittedAtByPhase[activePhase];
  const activeDoctorValues = doctorValuesByPhase[activePhase];
  const surveyJourney = getSurveyJourney(patient, activePhase);
  const misunderstandingFlags = getMisunderstandingFlags(patient, activePhase);
  const doctorActionItems = getDoctorActionItems(patient, activePhase);

  const doctorResponses = useMemo<SurveyResponse[]>(() => {
    if (doctorSurveyCompleted && activePair.doctorSurvey.responses.length > 0) {
      return activePair.doctorSurvey.responses;
    }

    return doctorSurveyQuestions[activePhase].map((question) => ({
      question: question.label,
      answer: activeDoctorValues[question.id] || "Awaiting doctor survey completion"
    }));
  }, [activeDoctorValues, activePair.doctorSurvey.responses, activePhase, doctorSurveyCompleted]);

  const reviewStatusLabel = doctorSurveyCompleted
    ? "Paired review unlocked for doctor"
    : "Awaiting doctor survey before paired review unlocks";

  function handleDoctorSurveySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDoctorSubmittedAtByPhase((current) => ({
      ...current,
      [activePhase]: activePhase === "entryPair" ? "2026-05-16" : "2026-06-08"
    }));
    setDoctorSurveyCompletedByPhase((current) => ({
      ...current,
      [activePhase]: true
    }));
  }

  function handleCommentSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!commentDraft.trim()) {
      return;
    }

    setSavedComment(commentDraft.trim());
    setCommentDraft("");
  }

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <span className="eyebrow">Doctor-only survey workflow</span>
          <h2>Entry and follow-up surveys compared in parallel</h2>
        </div>
        <span className="pill pill-soft">{reviewStatusLabel}</span>
      </div>

      <div className="survey-mode-switch">
        <button
          type="button"
          className={`toggle-chip ${activePhase === "entryPair" ? "toggle-chip--active" : ""}`}
          onClick={() => setActivePhase("entryPair")}
        >
          Entry survey pair
        </button>
        <button
          type="button"
          className={`toggle-chip ${activePhase === "followUpPair" ? "toggle-chip--active" : ""}`}
          onClick={() => setActivePhase("followUpPair")}
        >
          Follow-up survey pair
        </button>
      </div>

      <div className="workflow-steps">
        {surveyJourney.map((step) => (
          <div
            key={`${activePhase}-${step.label}`}
            className={`workflow-step ${
              step.status === "Completed"
                ? "workflow-step--done"
                : step.status === "Pending"
                  ? "workflow-step--pending"
                  : "workflow-step--locked"
            }`}
          >
            <strong>{step.label}</strong>
            <p className="muted">
              {step.date} • {step.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <article className="card workflow-card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Patient submission</span>
              <h2>Survey receipt</h2>
            </div>
          </div>

          <div className="stack-sm">
            <p>
              <strong>Stage:</strong> {activePair.phase}
            </p>
            <p>
              <strong>Date received:</strong> {activePair.patientSurvey.submittedAt}
            </p>
            <p>
              <strong>Status:</strong> {activePair.patientSurvey.status}
            </p>
            <p>
              <strong>Questions answered:</strong> {activePair.patientSurvey.responses.length}
            </p>
            <p className="muted">
              Detailed side-by-side answers unlock after the doctor survey is also completed.
            </p>
          </div>
        </article>

        <article className="card workflow-card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Doctor submission</span>
              <h2>Clinical weekly survey</h2>
            </div>
          </div>

          {doctorSurveyCompleted ? (
            <div className="stack-sm">
              <p>
                <strong>Date completed:</strong> {doctorSubmittedAt}
              </p>
              <p>
                <strong>Status:</strong> Completed
              </p>
              <p className="muted">Paired review is now unlocked below.</p>
            </div>
          ) : (
            <form className="checkin-grid" onSubmit={handleDoctorSurveySubmit}>
              {doctorSurveyQuestions[activePhase].map((question) => (
                <label key={question.id} className="field">
                  <span>{question.label}</span>
                  {question.type === "select" ? (
                    <select
                      value={activeDoctorValues[question.id]}
                      onChange={(event) =>
                        setDoctorValuesByPhase((current) => ({
                          ...current,
                          [activePhase]: {
                            ...current[activePhase],
                            [question.id]: event.target.value
                          }
                        }))
                      }
                    >
                      {question.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <textarea
                      rows={4}
                      value={activeDoctorValues[question.id]}
                      onChange={(event) =>
                        setDoctorValuesByPhase((current) => ({
                          ...current,
                          [activePhase]: {
                            ...current[activePhase],
                            [question.id]: event.target.value
                          }
                        }))
                      }
                      placeholder={question.placeholder}
                    />
                  )}
                </label>
              ))}

              <button type="submit" className="button-secondary">
                Submit doctor survey
              </button>
            </form>
          )}
        </article>
      </div>

      {doctorSurveyCompleted ? (
        <div className="stack-lg">
          <div className="card-head">
            <div>
              <span className="eyebrow">Unlocked paired review</span>
              <h2>Compare both surveys and track progress</h2>
            </div>
          </div>

          <div className="response-grid">
            <article className="response-card">
              <span className="eyebrow">Patient survey</span>
              <p className="muted">{activePair.patientSurvey.submittedAt}</p>
              <div className="stack-sm">
                {activePair.patientSurvey.responses.map((response) => (
                  <div key={response.question} className="note-card">
                    <strong>{response.question}</strong>
                    <p>{response.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="response-card">
              <span className="eyebrow">Doctor survey</span>
              <p className="muted">{doctorSubmittedAt}</p>
              <div className="stack-sm">
                {doctorResponses.map((response) => (
                  <div key={response.question} className="note-card">
                    <strong>{response.question}</strong>
                    <p>{response.answer}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="grid-2">
            <article className="card workflow-card">
              <div className="card-head">
                <div>
                  <span className="eyebrow">Misunderstanding flags</span>
                  <h2>Where review should focus</h2>
                </div>
              </div>

              <div className="stack-sm">
                {misunderstandingFlags.map((flag) => (
                  <div key={flag.title} className="note-card">
                    <div className="case-head">
                      <strong>{flag.title}</strong>
                      <span className={`pill ${flag.status === "Aligned" ? "pill-soft" : "pill-warning"}`}>
                        {flag.severity} • {flag.status}
                      </span>
                    </div>
                    <p>{flag.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card workflow-card">
              <div className="card-head">
                <div>
                  <span className="eyebrow">Doctor action queue</span>
                  <h2>What to do after comparison</h2>
                </div>
              </div>

              <div className="stack-sm">
                {doctorActionItems.map((item) => (
                  <div key={item.title} className="note-card">
                    <div className="case-head">
                      <strong>{item.title}</strong>
                      <span className="pill pill-soft">{item.status}</span>
                    </div>
                    <p className="muted">{item.owner}</p>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="tracking-links">
            {patient.surveyWorkflow.progressLinks.map((link) => (
              <a key={link.label} href={`#${link.targetId}`} className="tracking-link-card">
                <strong>{link.label}</strong>
                <span>{link.description}</span>
              </a>
            ))}
          </div>

          <div className="grid-2">
            <div className="note-card">
              <strong>Comparison summary</strong>
              <p>{activePair.comparisonSummary}</p>
              <p className="muted">{activePair.pairedReviewStatus}</p>
            </div>

            <div className="note-card">
              <strong>Anonymous library release</strong>
              <p>{activePair.anonymousUploadStatus}</p>
              <p className="muted">
                Once comments are finished, other doctors will only see a de-identified version of this case in search.
              </p>
            </div>
          </div>

          <form className="checkin-grid" onSubmit={handleCommentSave}>
            <label className="field">
              <span>Doctor paired-review comment</span>
              <textarea
                rows={4}
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                placeholder="Write the clinical comment that should sit beside the paired patient and doctor surveys."
              />
            </label>
            <button type="submit" className="button-secondary">
              Save doctor comment
            </button>
          </form>

          {savedComment ? (
            <div className="note-card">
              <strong>Saved doctor review note</strong>
              <p>{savedComment}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
