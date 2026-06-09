import { ChatDemo } from "@/components/ChatDemo";

export default function PatientPage() {
  return (
    <main className="stack-xl">
      <section className="card panel-empathy">
        <span className="eyebrow">Patient portal</span>
        <h1>Supportive check-ins without a dashboard</h1>
        <p className="hero-copy">
          The patient view stays intentionally calm. It supports conversation, consent, and structured weekly reflection,
          while keeping performance dashboards out of sight in v1.
        </p>
      </section>

      <ChatDemo />
    </main>
  );
}

