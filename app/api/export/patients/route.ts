import { trrfFocusPatients } from "@/lib/demo-data";

function escapeCsvValue(value: string | number) {
  const text = String(value);
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}

export async function GET() {
  const header = [
    "display_name",
    "study_id",
    "region",
    "cancer_type",
    "stage",
    "program_phase",
    "risk_level",
    "last_check_in",
    "mood_score",
    "energy_score",
    "symptom_load",
    "adherence_score"
  ];

  const rows = trrfFocusPatients.map((patient) =>
    [
      patient.displayName,
      patient.studyId,
      patient.region,
      patient.cancerType,
      patient.stage,
      patient.programPhase,
      patient.riskLevel,
      patient.lastCheckIn,
      patient.metrics.mood,
      patient.metrics.energy,
      patient.metrics.symptomLoad,
      patient.metrics.adherence
    ]
      .map(escapeCsvValue)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="trrf-patient-export.csv"'
    }
  });
}
