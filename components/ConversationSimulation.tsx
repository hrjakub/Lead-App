"use client";

import { useState } from "react";

import { conversationSimulationScenarios } from "@/lib/conversation-simulation-data";

export function ConversationSimulation() {
  const [activeScenarioId, setActiveScenarioId] = useState(conversationSimulationScenarios[0]?.id ?? "");

  const activeScenario =
    conversationSimulationScenarios.find((scenario) => scenario.id === activeScenarioId) ??
    conversationSimulationScenarios[0];

  if (!activeScenario) {
    return null;
  }

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <span className="eyebrow">Conversation simulation</span>
          <h2>Example patient conversations and extracted insight</h2>
        </div>
        <span className="pill pill-soft">Lead-app style example flow</span>
      </div>

      <p className="muted">
        This section shows realistic examples of how a patient might speak with Monika and what the system would capture
        from that conversation for surveys, doctor review, and later anonymized learning.
      </p>

      <div className="survey-mode-switch">
        {conversationSimulationScenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            className={`toggle-chip ${scenario.id === activeScenario.id ? "toggle-chip--active" : ""}`}
            onClick={() => setActiveScenarioId(scenario.id)}
          >
            {scenario.title}
          </button>
        ))}
      </div>

      <div className="simulation-layout">
        <article className="simulation-column">
          <div className="case-head">
            <strong>{activeScenario.title}</strong>
            <span className="pill">{activeScenario.focus}</span>
          </div>
          <p className="muted">{activeScenario.summary}</p>

          <div className="chat-surface" aria-live="polite">
            {activeScenario.conversation.map((message, index) => (
              <div
                key={`${activeScenario.id}-${message.sender}-${index}`}
                className={
                  message.sender === "assistant"
                    ? "chat-bubble chat-bubble--assistant"
                    : "chat-bubble chat-bubble--patient"
                }
              >
                <span className="chat-label">{message.sender === "assistant" ? "Monika" : "Patient"}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="simulation-column">
          <div className="stack-md">
            <div className="note-card">
              <span className="eyebrow">What Monika understands</span>
              <div className="stack-sm">
                {activeScenario.extracted.understanding.map((item) => (
                  <div key={item.label}>
                    <strong>{item.label}</strong>
                    <p className="muted">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="note-card">
              <span className="eyebrow">What gets saved to the system</span>
              <div className="structured-field-grid">
                {activeScenario.extracted.structuredData.map((item) => (
                  <div key={item.label} className="structured-field">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="note-card">
              <span className="eyebrow">What the doctor would see next</span>
              <div className="stack-sm">
                {activeScenario.extracted.doctorView.map((item) => (
                  <div key={item.label}>
                    <strong>{item.label}</strong>
                    <p className="muted">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="note-card">
              <span className="eyebrow">Human insight</span>
              <p>{activeScenario.extracted.humanInsight}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
