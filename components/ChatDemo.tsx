"use client";

import { FormEvent, useMemo, useState } from "react";

import { ConversationSimulation } from "@/components/ConversationSimulation";
import { entryPatientSurveyTemplate, followUpPatientSurveyTemplate } from "@/lib/demo-data";

type ChatMessage = {
  sender: "patient" | "assistant";
  text: string;
};

type SurveyMode = "entry" | "followUp";

const initialMessages: ChatMessage[] = [
  {
    sender: "assistant",
    text: "Hi, I’m Monika, an AI support bot for this TRRF prototype. I’m here to help you reflect on how the week feels and capture what you want your care team to understand. I’m not a doctor, and I am not a human care coordinator."
  }
];

export function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [savedCheckIn, setSavedCheckIn] = useState<string | null>(null);
  const [surveyMode, setSurveyMode] = useState<SurveyMode>("followUp");
  const [checkInValues, setCheckInValues] = useState<Record<string, string>>({
    cancer_understanding: "",
    stage_understanding: "",
    treatment_description: "",
    plan_clarity: "Mostly clearly",
    starting_support: "",
    mood: "3",
    energy: "3",
    symptoms: "2",
    daily_functioning: "Moderate difficulty",
    sleep_quality: "Mixed",
    treatment_understanding: "Mostly clearly",
    treatment_progress: "Mostly clearly",
    emotional_support: "",
    support: ""
  });

  const activeSurveyTemplate = surveyMode === "entry" ? entryPatientSurveyTemplate : followUpPatientSurveyTemplate;
  const surveyDate = surveyMode === "entry" ? "2026-05-15" : "2026-06-08";
  const surveyTitle = surveyMode === "entry" ? "Entry survey" : "Follow-up treatment survey";

  const promptHint = useMemo(() => {
    if (!consentGiven) {
      return "You can talk generally now. Health-specific prompts unlock after consent.";
    }

    return "Weekly check-in cadence: default weekly, configurable later by patient or program.";
  }, [consentGiven]);

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || isSending) {
      return;
    }

    const nextPatientMessage: ChatMessage = { sender: "patient", text: draft.trim() };
    setMessages((current) => [...current, nextPatientMessage]);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: nextPatientMessage.text,
          consentGiven
        })
      });

      const payload = (await response.json()) as { reply: string };
      setMessages((current) => [...current, { sender: "assistant", text: payload.reply }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          sender: "assistant",
          text: "I could not load the simulated response just now, but your message would still be recorded in the final product."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSaveCheckIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const summary = `${surveyTitle} dated ${surveyDate} submitted to the assigned doctor. The doctor will complete the parallel clinical survey, then compare both views, comment on mismatches, and unlock progress tracking.`;
    setSavedCheckIn(summary);
  }

  return (
    <div className="stack-lg">
      <section className="card panel-empathy">
        <div className="card-head">
          <div>
            <span className="eyebrow">Patient experience</span>
            <h2>Supportive chatbot with a clear boundary</h2>
          </div>
          <span className="pill pill-soft">Simulated AI responses</span>
        </div>

        <p className="muted">
          This demo keeps the patient view simple on purpose. No dashboard is shown here, only supportive
          conversation and structured reflection.
        </p>

        <div className="disclaimer">
          <strong>Important:</strong> Monika is an AI chatbot for supportive reflection. It is not a doctor, not a
          human support person, and does not diagnose, treat, or replace medical advice.
        </div>

        <div className="consent-card">
          <label className="consent-toggle">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(event) => setConsentGiven(event.target.checked)}
            />
            <span>I consent to sharing health-related reflections for this prototype check-in flow.</span>
          </label>

          <p className="helper-text">{promptHint}</p>
        </div>

        <div className="chat-surface" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={message.sender === "assistant" ? "chat-bubble chat-bubble--assistant" : "chat-bubble chat-bubble--patient"}
            >
              <span className="chat-label">{message.sender === "assistant" ? "Monika" : "You"}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleSend}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Share how the week has felt, what was difficult, or what kind of support would help."
            rows={4}
          />
          <button type="submit" className="button-primary" disabled={isSending}>
            {isSending ? "Thinking..." : "Send message"}
          </button>
        </form>
      </section>

      <ConversationSimulation />

      <section className={`card ${consentGiven ? "" : "card-disabled"}`}>
        <div className="card-head">
          <div>
            <span className="eyebrow">Weekly structure</span>
            <h2>Parallel patient survey workflow</h2>
          </div>
          <span className="pill">Default cadence: weekly</span>
        </div>

        <p className="muted">
          Patients do not see performance charts in v1. Instead, the system collects a dated patient survey that is sent to
          the assigned doctor. Doctors complete a parallel survey on the same stage, compare both views, comment on gaps in
          understanding, and then upload anonymized learnings for broader clinical comparison.
        </p>

        <div className="survey-mode-switch">
          <button
            type="button"
            className={`toggle-chip ${surveyMode === "entry" ? "toggle-chip--active" : ""}`}
            onClick={() => setSurveyMode("entry")}
          >
            Entry survey
          </button>
          <button
            type="button"
            className={`toggle-chip ${surveyMode === "followUp" ? "toggle-chip--active" : ""}`}
            onClick={() => setSurveyMode("followUp")}
          >
            Follow-up treatment survey
          </button>
        </div>

        <div className="survey-meta-grid">
          <div className="meta-card">
            <span>Survey date</span>
            <strong>{surveyDate}</strong>
          </div>
          <div className="meta-card">
            <span>Survey type</span>
            <strong>{surveyTitle}</strong>
          </div>
          <div className="meta-card">
            <span>Assigned doctor</span>
            <strong>Dr. Laura Benitez</strong>
          </div>
          <div className="meta-card">
            <span>Workflow after submission</span>
            <strong>Sent to doctor for parallel comparison</strong>
          </div>
        </div>

        <form className="checkin-grid" onSubmit={handleSaveCheckIn}>
          {activeSurveyTemplate.map((field) => (
            <label key={field.id} className="field">
              <span>{field.label}</span>
              {field.type === "range" ? (
                <select
                  value={checkInValues[field.id]}
                  disabled={!consentGiven}
                  onChange={(event) =>
                    setCheckInValues((current) => ({
                      ...current,
                      [field.id]: event.target.value
                    }))
                  }
                >
                  <option value="1">1 - Very low</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 - Very high</option>
                </select>
              ) : field.type === "select" ? (
                <select
                  value={checkInValues[field.id]}
                  disabled={!consentGiven}
                  onChange={(event) =>
                    setCheckInValues((current) => ({
                      ...current,
                      [field.id]: event.target.value
                    }))
                  }
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <textarea
                  rows={4}
                  disabled={!consentGiven}
                  value={checkInValues[field.id]}
                  onChange={(event) =>
                    setCheckInValues((current) => ({
                      ...current,
                      [field.id]: event.target.value
                    }))
                  }
                  placeholder={field.helper ?? "Write your answer here."}
                />
              )}
              {field.helper && field.type !== "text" ? <p className="field-helper">{field.helper}</p> : null}
            </label>
          ))}

          <button type="submit" className="button-secondary" disabled={!consentGiven}>
            Submit {surveyMode === "entry" ? "entry" : "follow-up"} survey to doctor
          </button>
        </form>

        {savedCheckIn ? <p className="success-note">{savedCheckIn}</p> : null}

        <div className="grid-2">
          <article className="card workflow-card">
            <div className="card-head">
              <div>
                <span className="eyebrow">What happens next</span>
                <h2>Survey journey after submission</h2>
              </div>
            </div>

            <div className="workflow-steps">
              <div className="workflow-step workflow-step--done">
                <strong>1. Patient survey is dated and stored</strong>
                <p className="muted">{surveyTitle} responses are timestamped and linked to the assigned doctor.</p>
              </div>
              <div
                className={`workflow-step ${
                  savedCheckIn ? "workflow-step--pending" : "workflow-step--locked"
                }`}
              >
                <strong>2. Doctor completes the parallel clinical survey</strong>
                <p className="muted">
                  The doctor fills in the matching stage survey so the two views can be compared safely.
                </p>
              </div>
              <div
                className={`workflow-step ${
                  savedCheckIn ? "workflow-step--pending" : "workflow-step--locked"
                }`}
              >
                <strong>3. Doctor reviews gaps and unlocks progress tracking</strong>
                <p className="muted">
                  Only the doctor sees the side-by-side comparison, adds comments, and prepares anonymous learning for other doctors.
                </p>
              </div>
            </div>
          </article>

          <article className="card workflow-card">
            <div className="card-head">
              <div>
                <span className="eyebrow">Permissions</span>
                <h2>What this patient view allows</h2>
              </div>
            </div>

            <div className="stack-sm">
              <div className="note-card">
                <strong>Health reflections</strong>
                <p className="muted">{consentGiven ? "Granted" : "Waiting for consent"}</p>
                <p>Needed before sensitive health-related reflections and structured surveys are collected.</p>
              </div>
              <div className="note-card">
                <strong>Doctor paired review</strong>
                <p className="muted">Operational after survey submission</p>
                <p>The assigned doctor can compare the patient survey with the clinical survey for the same stage.</p>
              </div>
              <div className="note-card">
                <strong>Anonymous doctor library</strong>
                <p className="muted">Only after doctor review</p>
                <p>Other doctors would only see de-identified case patterns, never names or direct identifiers.</p>
              </div>
              <div className="note-card">
                <strong>Donor storytelling</strong>
                <p className="muted">Separate approval later</p>
                <p>Any donor-safe story must stay reviewed and approved separately from clinical tracking.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
