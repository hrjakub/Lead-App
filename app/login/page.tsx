import Link from "next/link";

import { demoDoctors, demoRoleAccess } from "@/lib/demo-data";

export default function LoginPage() {
  return (
    <main className="stack-xl">
      <section className="card panel-empathy">
        <span className="eyebrow">Demo access</span>
        <h1>Three separate role entry points</h1>
        <p className="hero-copy">
          This first version is intentionally simple. Authentication is mocked so the structure can be presented now and
          replaced later with Supabase Auth.
        </p>
      </section>

      <section className="grid-3">
        {demoRoleAccess.map((entry) => (
          <article key={entry.role} className="card">
            <span className="eyebrow">{entry.label}</span>
            <h2>{entry.role === "patient" ? "Patient login" : entry.role === "doctor" ? "Doctor login" : "TRRF login"}</h2>
            <p>{entry.subtitle}</p>
            <Link href={entry.route} className="button-primary">
              Continue as {entry.role}
            </Link>
          </article>
        ))}
      </section>

      <section className="grid-2">
        <article className="card">
          <span className="eyebrow">Doctor demo account</span>
          <h2>{demoDoctors[0].displayName}</h2>
          <p>
            {demoDoctors[0].specialty} • {demoDoctors[0].organization}
          </p>
          <p className="muted">Assigned patients in demo: Michael Scott, Ana Torres</p>
        </article>

        <article className="card">
          <span className="eyebrow">Prototype note</span>
          <h2>What gets swapped later</h2>
          <ul className="flat-list">
            <li>Mock login becomes real role-based auth.</li>
            <li>Mock data becomes Supabase-backed records.</li>
            <li>Simulated replies become a real AI orchestration layer.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

