import Link from "next/link";
import { notFound } from "next/navigation";

import { DoctorSurveyWorkflow } from "@/components/DoctorSurveyWorkflow";
import { PatientRecord } from "@/components/PatientRecord";
import { demoDoctors, getPatientById } from "@/lib/demo-data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const demoDoctor = demoDoctors[0];

export default async function DoctorPatientPage({ params }: Props) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient || !patient.assignedDoctorIds.includes(demoDoctor.id)) {
    notFound();
  }

  return (
    <main className="stack-xl">
      <Link href="/doctor" className="text-link">
        Back to doctor portal
      </Link>
      <DoctorSurveyWorkflow patient={patient} />
      <PatientRecord patient={patient} role="doctor" />
    </main>
  );
}
