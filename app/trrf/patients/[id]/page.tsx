import Link from "next/link";
import { notFound } from "next/navigation";

import { PatientRecord } from "@/components/PatientRecord";
import { getPatientById, isLungFitCohortPatient } from "@/lib/demo-data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TrrfPatientPage({ params }: Props) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient || !isLungFitCohortPatient(patient)) {
    notFound();
  }

  return (
    <main className="stack-xl">
      <Link href="/trrf" className="text-link">
        Back to TRRF portal
      </Link>
      <PatientRecord patient={patient} role="trrf" />
    </main>
  );
}
