"use client";

import { useMemo, useState } from "react";

import type { DeidentifiedCase } from "@/lib/demo-data";

type Props = {
  cases: DeidentifiedCase[];
};

export function CaseSearch({ cases }: Props) {
  const [cancerType, setCancerType] = useState("All");
  const [stage, setStage] = useState("All");
  const [sex, setSex] = useState("All");
  const [ageRange, setAgeRange] = useState("All");
  const [treatment, setTreatment] = useState("");

  const uniqueValues = useMemo(
    () => ({
      cancerTypes: ["All", ...new Set(cases.map((entry) => entry.cancerType))],
      stages: ["All", ...new Set(cases.map((entry) => entry.stage))],
      sexes: ["All", ...new Set(cases.map((entry) => entry.sex))],
      ageRanges: ["All", ...new Set(cases.map((entry) => entry.ageRange))]
    }),
    [cases]
  );

  const filteredCases = useMemo(() => {
    return cases.filter((entry) => {
      if (cancerType !== "All" && entry.cancerType !== cancerType) {
        return false;
      }
      if (stage !== "All" && entry.stage !== stage) {
        return false;
      }
      if (sex !== "All" && entry.sex !== sex) {
        return false;
      }
      if (ageRange !== "All" && entry.ageRange !== ageRange) {
        return false;
      }
      if (treatment && !entry.treatmentUsed.toLowerCase().includes(treatment.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [ageRange, cancerType, cases, sex, stage, treatment]);

  return (
    <section className="card">
      <div className="card-head">
        <div>
          <span className="eyebrow">Doctor comparison mode</span>
          <h2>De-identified hospital-wide case search</h2>
        </div>
        <span className="pill pill-warning">{filteredCases.length} matching anonymous cases</span>
      </div>

      <p className="muted">
        This search is intended for comparison and learning across similar cases. It is not an automated treatment
        recommendation engine. In the intended workflow, cases become visible here only after patient and doctor surveys
        are paired, reviewed, commented on, and stripped of direct identifiers.
      </p>

      <p className="muted">
        Search by cancer type, stage, sex, age range, and treatment keyword to show how different cases can still become
        useful comparison points once they are anonymized.
      </p>

      <div className="filter-grid">
        <label className="field">
          <span>Cancer type</span>
          <select value={cancerType} onChange={(event) => setCancerType(event.target.value)}>
            {uniqueValues.cancerTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Stage</span>
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            {uniqueValues.stages.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Sex</span>
          <select value={sex} onChange={(event) => setSex(event.target.value)}>
            {uniqueValues.sexes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Age range</span>
          <select value={ageRange} onChange={(event) => setAgeRange(event.target.value)}>
            {uniqueValues.ageRanges.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="field field-span-2">
          <span>Treatment used</span>
          <input
            value={treatment}
            onChange={(event) => setTreatment(event.target.value)}
            placeholder="Search by treatment keyword"
          />
        </label>
      </div>

      <div className="case-results">
        {filteredCases.map((entry) => (
          <article key={entry.caseId} className="case-card">
            <div className="case-head">
              <strong>{entry.caseId}</strong>
              <span className="pill pill-soft">{entry.outcomeSignal}</span>
            </div>
            <p className="muted">
              {entry.cancerType} • {entry.stage} • {entry.sex} • {entry.ageRange}
            </p>
            <p className="muted">{entry.treatmentUsed}</p>
            <p>{entry.summary}</p>
            <p className="muted">
              <strong>Pair status:</strong> {entry.pairingStatus}
            </p>
            <p className="muted">
              <strong>Library status:</strong> {entry.anonymousUploadStatus}
            </p>
            <p>
              <strong>Comparison insight:</strong> {entry.comparisonInsight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
