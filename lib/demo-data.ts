export type Role = "patient" | "doctor" | "trrf";

export type SurveyField = {
  id: string;
  label: string;
  type: "range" | "select" | "text";
  options?: string[];
  helper?: string;
};

export type SurveyResponse = {
  question: string;
  answer: string;
};

export type SurveyRecord = {
  title: string;
  submittedAt: string;
  status: "Pending" | "Submitted" | "Completed";
  responses: SurveyResponse[];
};

export type SurveyPair = {
  phase: "Entry survey" | "Follow-up treatment survey";
  patientSurvey: SurveyRecord;
  doctorSurvey: SurveyRecord;
  pairedReviewStatus: string;
  comparisonSummary: string;
  anonymousUploadStatus: string;
};

export type ProgressLink = {
  label: string;
  targetId: string;
  description: string;
};

export type SurveyWorkflow = {
  cadenceLabel: string;
  assignedDoctor: string;
  entryPair: SurveyPair;
  followUpPair: SurveyPair;
  progressLinks: ProgressLink[];
};

export type Patient = {
  id: string;
  displayName: string;
  studyId: string;
  region: string;
  cancerType: string;
  stage: string;
  sex: string;
  age: number;
  treatmentUsed: string[];
  programPhase: "Before LungFit" | "In LungFit" | "After LungFit" | "Not in LungFit cohort";
  lastCheckIn: string;
  riskLevel: "Improving" | "Stable" | "Needs follow-up";
  keyNeed: string;
  supportPreference: string;
  nextAction: string;
  patientSummary: string;
  donorSafeStory: string;
  latestDoctorComment: string;
  assignedDoctorIds: string[];
  metrics: {
    symptomLoad: number;
    mood: number;
    energy: number;
    adherence: number;
  };
  weeklyTrend: Array<{
    label: string;
    mood: number;
    energy: number;
    symptomLoad: number;
  }>;
  doctorComments: Array<{
    author: string;
    date: string;
    text: string;
  }>;
  patientQuotes: string[];
  conversationHighlights: string[];
  surveySnapshots: Array<{
    title: string;
    updatedAt: string;
    status: string;
    highlights: string[];
  }>;
  contact: {
    phone: string;
    email: string;
  };
  surveyWorkflow: SurveyWorkflow;
};

export type Doctor = {
  id: string;
  displayName: string;
  specialty: string;
  organization: string;
  region: string;
  assignedPatientIds: string[];
};

export type DeidentifiedCase = {
  caseId: string;
  patientId: string;
  cancerType: string;
  stage: string;
  sex: string;
  ageRange: string;
  treatmentUsed: string;
  programPhase: string;
  outcomeSignal: string;
  summary: string;
  pairingStatus: string;
  anonymousUploadStatus: string;
  comparisonInsight: string;
};

export type SurveyJourneyStep = {
  label: string;
  date: string;
  status: "Completed" | "Pending" | "Locked";
  detail: string;
};

export type MisunderstandingFlag = {
  title: string;
  severity: "Low" | "Moderate" | "High";
  status: "Aligned" | "Needs clarification" | "Awaiting paired review";
  detail: string;
};

export type DoctorActionItem = {
  title: string;
  owner: string;
  status: string;
  detail: string;
};

export type ConsentItem = {
  label: string;
  status: "Granted" | "Conditional" | "Not granted" | "Operational only";
  detail: string;
};

export type TreatmentTimelineItem = {
  date: string;
  title: string;
  detail: string;
  emphasis: "patient" | "doctor" | "program";
};

export type ImpactTheme = {
  title: string;
  detail: string;
  count: number;
};

export const demoPatients: Patient[] = [
  {
    id: "michael-scott",
    displayName: "Michael Scott",
    studyId: "TRRF-1042",
    region: "Barcelona",
    cancerType: "Lung cancer",
    stage: "Stage II",
    sex: "Male",
    age: 47,
    treatmentUsed: ["Chemotherapy", "Breathing rehab", "LungFit"],
    programPhase: "In LungFit",
    lastCheckIn: "2026-06-06",
    riskLevel: "Stable",
    keyNeed: "More predictable fatigue support on treatment days",
    supportPreference: "Short guided breathing sessions and family reminders",
    nextAction: "TRRF coordinator to confirm transport support before next appointment",
    patientSummary:
      "Michael reports that the LungFit routine helps him regain calm after treatment days, but fatigue still spikes when sleep is poor.",
    donorSafeStory:
      "Michael describes the program as the first time his recovery routine felt personal instead of generic, especially when breathing exercises were timed around treatment fatigue.",
    latestDoctorComment:
      "Emotional regulation has improved. Physical stamina remains variable, especially after chemotherapy sessions.",
    assignedDoctorIds: ["dr-laura-benitez"],
    metrics: {
      symptomLoad: 54,
      mood: 72,
      energy: 49,
      adherence: 83
    },
    weeklyTrend: [
      { label: "Week 1", mood: 58, energy: 42, symptomLoad: 67 },
      { label: "Week 2", mood: 62, energy: 45, symptomLoad: 63 },
      { label: "Week 3", mood: 69, energy: 51, symptomLoad: 58 },
      { label: "Week 4", mood: 72, energy: 49, symptomLoad: 54 }
    ],
    doctorComments: [
      {
        author: "Dr. Laura Benitez",
        date: "2026-06-05",
        text: "Better insight into his own triggers. I would like one more week of monitoring before any care-plan adjustment."
      },
      {
        author: "Dr. Laura Benitez",
        date: "2026-05-28",
        text: "Reports improved adherence when the routine is tied to a fixed evening reminder."
      }
    ],
    patientQuotes: [
      "When I know what to do after a difficult day, I panic less.",
      "I still get tired, but now it feels manageable instead of random."
    ],
    conversationHighlights: [
      "Asked for gentler check-ins on infusion days.",
      "Opted into anonymized quote use but wants final story approval contact."
    ],
    surveySnapshots: [
      {
        title: "General Cancer Patient Self-Report Survey",
        updatedAt: "2026-06-02",
        status: "Submitted",
        highlights: ["High self-awareness", "Moderate fatigue", "Strong family support"]
      },
      {
        title: "Medical Staff General Cancer Patient Evaluation Survey",
        updatedAt: "2026-06-05",
        status: "Submitted",
        highlights: ["Improved coping", "Stable symptoms", "Needs transport support"]
      }
    ],
    contact: {
      phone: "+34 600 100 204",
      email: "michael.scott@example.org"
    },
    surveyWorkflow: {
      cadenceLabel: "Entry survey plus weekly follow-up treatment survey",
      assignedDoctor: "Dr. Laura Benitez",
      entryPair: {
        phase: "Entry survey",
        patientSurvey: {
          title: "Patient Entry Survey",
          submittedAt: "2026-05-15",
          status: "Submitted",
          responses: [
            { question: "What is your current understanding of your cancer diagnosis?", answer: "Lung cancer" },
            { question: "What is your current understanding of your cancer stage?", answer: "I believe it is stage II" },
            { question: "What is your current understanding of the treatment you are receiving?", answer: "Chemotherapy and LungFit support" },
            { question: "How clear does your treatment plan feel to you right now?", answer: "Mostly clear, but side effects still confuse me" },
            { question: "What support do you most need at the start?", answer: "Simple explanations and calmer routines after treatment" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Entry Clinical Survey",
          submittedAt: "2026-05-16",
          status: "Completed",
          responses: [
            { question: "Confirmed cancer type", answer: "Lung cancer" },
            { question: "Confirmed stage", answer: "Stage II" },
            { question: "Current treatment plan", answer: "Chemotherapy, breathing rehab, and LungFit" },
            { question: "Observed patient understanding", answer: "Reasonable understanding with gaps around fatigue expectations" },
            { question: "Initial clinical priorities", answer: "Expectation-setting, fatigue tracking, and adherence support" }
          ]
        },
        pairedReviewStatus: "Entry pair completed and compared by doctor",
        comparisonSummary:
          "Patient and doctor aligned on cancer type and stage, but the patient showed partial confusion around side-effect expectations and fatigue recovery.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      followUpPair: {
        phase: "Follow-up treatment survey",
        patientSurvey: {
          title: "Patient Follow-up Treatment Survey",
          submittedAt: "2026-06-06",
          status: "Submitted",
          responses: [
            { question: "How has your mood felt this week?", answer: "3 out of 5" },
            { question: "How would you rate your energy this week?", answer: "3 out of 5" },
            { question: "How disruptive were your symptoms?", answer: "2 out of 5" },
            { question: "How difficult was daily functioning this week?", answer: "Moderate difficulty" },
            { question: "How well do you understand your current progress?", answer: "Mostly clear, but fatigue management still feels unclear" },
            { question: "What support would help most next week?", answer: "Short breathing guidance and a predictable evening reminder" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Follow-up Clinical Survey",
          submittedAt: "",
          status: "Pending",
          responses: []
        },
        pairedReviewStatus: "Awaiting doctor follow-up survey before comparison unlocks",
        comparisonSummary:
          "The follow-up comparison will focus on whether the patient's understanding of treatment progress matches the doctor's clinical view.",
        anonymousUploadStatus: "Not uploaded yet"
      },
      progressLinks: [
        {
          label: "Open dashboard snapshot",
          targetId: "dashboard-snapshot",
          description: "See the latest patient metrics after both surveys are paired"
        },
        {
          label: "Open weekly trend",
          targetId: "weekly-trend",
          description: "Compare emotional and symptom trends over time"
        },
        {
          label: "Open recorded assessments",
          targetId: "assessment-history",
          description: "Cross-check survey conclusions against prior assessments"
        }
      ]
    }
  },
  {
    id: "ana-torres",
    displayName: "Ana Torres",
    studyId: "TRRF-1057",
    region: "Madrid",
    cancerType: "Breast cancer",
    stage: "Stage III",
    sex: "Female",
    age: 38,
    treatmentUsed: ["Immunotherapy", "Radiation"],
    programPhase: "Not in LungFit cohort",
    lastCheckIn: "2026-06-07",
    riskLevel: "Improving",
    keyNeed: "Maintaining confidence between appointments",
    supportPreference: "Brief voice-style encouragement and weekly reflections",
    nextAction: "Doctor to review side-effect trend and compare similar de-identified non-lung cases when useful",
    patientSummary:
      "Ana is not part of the LungFit cohort, but she remains valuable in the broader doctor-facing dataset for comparison across oncology cases.",
    donorSafeStory:
      "Ana should stay outside the TRRF LungFit storytelling layer and be treated as part of the wider clinical comparison dataset only.",
    latestDoctorComment:
      "Adherence is excellent and emotional recovery is clearly stronger than baseline. Physical symptoms need watching but trend is favorable.",
    assignedDoctorIds: ["dr-laura-benitez"],
    metrics: {
      symptomLoad: 38,
      mood: 78,
      energy: 63,
      adherence: 91
    },
    weeklyTrend: [
      { label: "Week 1", mood: 66, energy: 52, symptomLoad: 51 },
      { label: "Week 2", mood: 71, energy: 57, symptomLoad: 46 },
      { label: "Week 3", mood: 76, energy: 60, symptomLoad: 42 },
      { label: "Week 4", mood: 78, energy: 63, symptomLoad: 38 }
    ],
    doctorComments: [
      {
        author: "Dr. Laura Benitez",
        date: "2026-06-06",
        text: "The patient is increasingly proactive in reporting mood and symptom shifts before they become disruptive."
      }
    ],
    patientQuotes: [
      "The chat helps me keep going without feeling like I am filling another form.",
      "I can tell someone how the week felt, not just what hurt."
    ],
    conversationHighlights: [
      "Requested more check-ins after radiation days.",
      "Interested in sharing experience with donors if anonymized first."
    ],
    surveySnapshots: [
      {
        title: "TRRF Patient Programme Experience & Impact Survey",
        updatedAt: "2026-06-03",
        status: "Submitted",
        highlights: ["Feels supported", "Strong self-reflection", "Not a LungFit cohort patient"]
      },
      {
        title: "TRRF Medical Staff Programme Impact Survey",
        updatedAt: "2026-06-04",
        status: "Submitted",
        highlights: ["Observed confidence gains", "Improved adherence", "Useful as a comparison case"]
      }
    ],
    contact: {
      phone: "+34 600 123 777",
      email: "ana.torres@example.org"
    },
    surveyWorkflow: {
      cadenceLabel: "Entry survey plus weekly follow-up treatment survey",
      assignedDoctor: "Dr. Laura Benitez",
      entryPair: {
        phase: "Entry survey",
        patientSurvey: {
          title: "Patient Entry Survey",
          submittedAt: "2026-05-20",
          status: "Submitted",
          responses: [
            { question: "What is your current understanding of your cancer diagnosis?", answer: "Breast cancer" },
            { question: "What is your current understanding of your cancer stage?", answer: "Stage III" },
            { question: "What is your current understanding of the treatment you are receiving?", answer: "Immunotherapy and radiation" },
            { question: "How clear does your treatment plan feel to you right now?", answer: "Very clearly" },
            { question: "What support do you most need at the start?", answer: "Encouragement between appointments" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Entry Clinical Survey",
          submittedAt: "2026-05-21",
          status: "Completed",
          responses: [
            { question: "Confirmed cancer type", answer: "Breast cancer" },
            { question: "Confirmed stage", answer: "Stage III" },
            { question: "Current treatment plan", answer: "Immunotherapy and radiation" },
            { question: "Observed patient understanding", answer: "Strong treatment understanding" },
            { question: "Initial clinical priorities", answer: "Side-effect tracking and confidence retention" }
          ]
        },
        pairedReviewStatus: "Entry pair completed and compared by doctor",
        comparisonSummary:
          "Patient and doctor understanding were strongly aligned at entry, making this case useful as a high-clarity benchmark in the anonymous library.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      followUpPair: {
        phase: "Follow-up treatment survey",
        patientSurvey: {
          title: "Patient Follow-up Treatment Survey",
          submittedAt: "2026-06-07",
          status: "Submitted",
          responses: [
            { question: "How has your mood felt this week?", answer: "4 out of 5" },
            { question: "How would you rate your energy this week?", answer: "4 out of 5" },
            { question: "How disruptive were your symptoms?", answer: "2 out of 5" },
            { question: "How difficult was daily functioning this week?", answer: "Mild difficulty" },
            { question: "How well do you understand your current progress?", answer: "Very clearly" },
            { question: "What support would help most next week?", answer: "Brief reflective check-ins and nutrition guidance" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Follow-up Clinical Survey",
          submittedAt: "2026-06-08",
          status: "Completed",
          responses: [
            { question: "How would you rate overall patient functioning this week?", answer: "Good with manageable fatigue" },
            { question: "How concerning were observed symptoms?", answer: "Low to moderate concern" },
            { question: "How strong was adherence this week?", answer: "Very strong" },
            { question: "How much emotional strain was visible?", answer: "Moderate but improving" },
            { question: "What should be tracked next?", answer: "Side-effect pattern after radiation and nutrition stability" }
          ]
        },
        pairedReviewStatus: "Paired patient and doctor follow-up surveys are complete",
        comparisonSummary:
          "Patient and doctor remain aligned on overall progress, which makes this case particularly useful in the anonymous comparison library for similar stage III patients.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      progressLinks: [
        {
          label: "Open dashboard snapshot",
          targetId: "dashboard-snapshot",
          description: "See the latest patient metrics after both surveys are paired"
        },
        {
          label: "Open weekly trend",
          targetId: "weekly-trend",
          description: "Compare emotional and symptom trends over time"
        },
        {
          label: "Open recorded assessments",
          targetId: "assessment-history",
          description: "Cross-check survey conclusions against prior assessments"
        }
      ]
    }
  },
  {
    id: "luis-martin",
    displayName: "Luis Martin",
    studyId: "TRRF-1083",
    region: "Valencia",
    cancerType: "Colorectal cancer",
    stage: "Stage II",
    sex: "Male",
    age: 59,
    treatmentUsed: ["Surgery", "Recovery rehab"],
    programPhase: "Not in LungFit cohort",
    lastCheckIn: "2026-05-30",
    riskLevel: "Needs follow-up",
    keyNeed: "More confidence starting a structured recovery routine",
    supportPreference: "Simple written guidance and family-inclusive explanations",
    nextAction: "Doctor to use this record for broader oncology comparison rather than LungFit enrolment",
    patientSummary:
      "Luis is not a LungFit candidate because the program is limited to lung cancer patients, but his case is still useful in the broader clinical comparison layer.",
    donorSafeStory:
      "Luis should remain outside the TRRF LungFit donor-story layer and be used only for doctor-side comparison and learning.",
    latestDoctorComment:
      "Referral may be useful, but he needs a simpler starting plan and clearer expectations.",
    assignedDoctorIds: ["dr-omar-ribas"],
    metrics: {
      symptomLoad: 62,
      mood: 55,
      energy: 41,
      adherence: 46
    },
    weeklyTrend: [
      { label: "Week 1", mood: 57, energy: 44, symptomLoad: 66 },
      { label: "Week 2", mood: 56, energy: 42, symptomLoad: 65 },
      { label: "Week 3", mood: 55, energy: 42, symptomLoad: 64 },
      { label: "Week 4", mood: 55, energy: 41, symptomLoad: 62 }
    ],
    doctorComments: [
      {
        author: "Dr. Omar Ribas",
        date: "2026-05-31",
        text: "Would benefit from a softer onboarding flow. Too much information at once reduces engagement."
      }
    ],
    patientQuotes: [
      "I do better when someone explains the routine slowly.",
      "I want to participate, but I need to know what success looks like first."
    ],
    conversationHighlights: [
      "No donor-story consent yet.",
      "Needs practical explanation of what weekly participation involves."
    ],
    surveySnapshots: [
      {
        title: "General Cancer Patient Self-Report Survey",
        updatedAt: "2026-05-29",
        status: "Submitted",
        highlights: ["Moderate confusion about next steps", "Low energy", "Wants practical guidance"]
      }
    ],
    contact: {
      phone: "+34 600 888 451",
      email: "luis.martin@example.org"
    },
    surveyWorkflow: {
      cadenceLabel: "Entry survey plus weekly follow-up treatment survey",
      assignedDoctor: "Dr. Omar Ribas",
      entryPair: {
        phase: "Entry survey",
        patientSurvey: {
          title: "Patient Entry Survey",
          submittedAt: "2026-05-10",
          status: "Submitted",
          responses: [
            { question: "What is your current understanding of your cancer diagnosis?", answer: "Colorectal cancer" },
            { question: "What is your current understanding of your cancer stage?", answer: "I think stage II" },
            { question: "What is your current understanding of the treatment you are receiving?", answer: "Surgery and recovery rehab" },
            { question: "How clear does your treatment plan feel to you right now?", answer: "Partly clear but still overwhelming" },
            { question: "What support do you most need at the start?", answer: "Slower explanations and simpler next steps" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Entry Clinical Survey",
          submittedAt: "2026-05-11",
          status: "Completed",
          responses: [
            { question: "Confirmed cancer type", answer: "Colorectal cancer" },
            { question: "Confirmed stage", answer: "Stage II" },
            { question: "Current treatment plan", answer: "Surgery followed by recovery rehabilitation" },
            { question: "Observed patient understanding", answer: "Partial understanding with onboarding confusion" },
            { question: "Initial clinical priorities", answer: "Clearer education and reduced cognitive overload" }
          ]
        },
        pairedReviewStatus: "Entry pair completed and compared by doctor",
        comparisonSummary:
          "The patient and doctor agreed on diagnosis, but the patient's treatment understanding was weaker than the doctor's clinical expectation, highlighting an education gap.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      followUpPair: {
        phase: "Follow-up treatment survey",
        patientSurvey: {
          title: "Patient Follow-up Treatment Survey",
          submittedAt: "2026-05-30",
          status: "Submitted",
          responses: [
            { question: "How has your mood felt this week?", answer: "2 out of 5" },
            { question: "How would you rate your energy this week?", answer: "2 out of 5" },
            { question: "How disruptive were your symptoms?", answer: "4 out of 5" },
            { question: "How difficult was daily functioning this week?", answer: "High difficulty" },
            { question: "How well do you understand your current progress?", answer: "Still not very clear" },
            { question: "What support would help most next week?", answer: "Simple written guidance for the next steps" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Follow-up Clinical Survey",
          submittedAt: "",
          status: "Pending",
          responses: []
        },
        pairedReviewStatus: "Awaiting doctor follow-up survey before comparison unlocks",
        comparisonSummary:
          "This follow-up pair is intended to surface mismatches between patient understanding of treatment progress and the doctor's clinical interpretation.",
        anonymousUploadStatus: "Not uploaded yet"
      },
      progressLinks: [
        {
          label: "Open dashboard snapshot",
          targetId: "dashboard-snapshot",
          description: "See the latest patient metrics after both surveys are paired"
        },
        {
          label: "Open weekly trend",
          targetId: "weekly-trend",
          description: "Compare emotional and symptom trends over time"
        },
        {
          label: "Open recorded assessments",
          targetId: "assessment-history",
          description: "Cross-check survey conclusions against prior assessments"
        }
      ]
    }
  },
  {
    id: "sara-khan",
    displayName: "Sara Khan",
    studyId: "TRRF-1099",
    region: "Seville",
    cancerType: "Lung cancer",
    stage: "Stage IV",
    sex: "Female",
    age: 51,
    treatmentUsed: ["Targeted therapy", "LungFit", "Psychological support"],
    programPhase: "After LungFit",
    lastCheckIn: "2026-06-01",
    riskLevel: "Stable",
    keyNeed: "Maintaining habits after intensive support ends",
    supportPreference: "Monthly encouragement and relapse-prevention prompts",
    nextAction: "TRRF to test alumni support flow in next prototype round",
    patientSummary:
      "Sara completed the core LungFit phase and remains emotionally stable, but she wants lighter-touch follow-up so the progress does not fade over time.",
    donorSafeStory:
      "Sara represents the long-tail value of the program: the need for steady, human follow-up even after the most intensive phase has finished.",
    latestDoctorComment:
      "The patient is clinically stable and emotionally engaged. Future support should focus on retention rather than rescue.",
    assignedDoctorIds: ["dr-omar-ribas"],
    metrics: {
      symptomLoad: 31,
      mood: 81,
      energy: 66,
      adherence: 88
    },
    weeklyTrend: [
      { label: "Week 1", mood: 76, energy: 61, symptomLoad: 39 },
      { label: "Week 2", mood: 77, energy: 62, symptomLoad: 36 },
      { label: "Week 3", mood: 80, energy: 65, symptomLoad: 33 },
      { label: "Week 4", mood: 81, energy: 66, symptomLoad: 31 }
    ],
    doctorComments: [
      {
        author: "Dr. Omar Ribas",
        date: "2026-06-01",
        text: "Good candidate for an alumni follow-up module with a much lower intervention frequency."
      }
    ],
    patientQuotes: [
      "I do not need intense support every week now, but I do not want to lose the routine either."
    ],
    conversationHighlights: [
      "Actively opted into anonymized donor-facing storytelling.",
      "Wants a gentle monthly version of the chatbot flow later."
    ],
    surveySnapshots: [
      {
        title: "TRRF Patient Programme Experience & Impact Survey",
        updatedAt: "2026-05-30",
        status: "Submitted",
        highlights: ["Feels more in control", "Strong LungFit outcome story", "Wants alumni check-ins"]
      }
    ],
    contact: {
      phone: "+34 600 020 909",
      email: "sara.khan@example.org"
    },
    surveyWorkflow: {
      cadenceLabel: "Entry survey plus weekly follow-up treatment survey",
      assignedDoctor: "Dr. Omar Ribas",
      entryPair: {
        phase: "Entry survey",
        patientSurvey: {
          title: "Patient Entry Survey",
          submittedAt: "2026-04-28",
          status: "Submitted",
          responses: [
            { question: "What is your current understanding of your cancer diagnosis?", answer: "Lung cancer" },
            { question: "What is your current understanding of your cancer stage?", answer: "Stage IV" },
            { question: "What is your current understanding of the treatment you are receiving?", answer: "Targeted therapy, psychological support, and LungFit" },
            { question: "How clear does your treatment plan feel to you right now?", answer: "Very clear" },
            { question: "What support do you most need at the start?", answer: "Emotional stability and clear follow-through" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Entry Clinical Survey",
          submittedAt: "2026-04-29",
          status: "Completed",
          responses: [
            { question: "Confirmed cancer type", answer: "Lung cancer" },
            { question: "Confirmed stage", answer: "Stage IV" },
            { question: "Current treatment plan", answer: "Targeted therapy, psychological support, and LungFit" },
            { question: "Observed patient understanding", answer: "Clear and engaged from the beginning" },
            { question: "Initial clinical priorities", answer: "Stability, habit formation, and sustained support" }
          ]
        },
        pairedReviewStatus: "Entry pair completed and compared by doctor",
        comparisonSummary:
          "Patient and doctor were strongly aligned at entry, creating a clean baseline for later progress tracking and anonymous comparison.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      followUpPair: {
        phase: "Follow-up treatment survey",
        patientSurvey: {
          title: "Patient Follow-up Treatment Survey",
          submittedAt: "2026-06-01",
          status: "Submitted",
          responses: [
            { question: "How has your mood felt this week?", answer: "4 out of 5" },
            { question: "How would you rate your energy this week?", answer: "4 out of 5" },
            { question: "How disruptive were your symptoms?", answer: "2 out of 5" },
            { question: "How difficult was daily functioning this week?", answer: "Mild difficulty" },
            { question: "How well do you understand your current progress?", answer: "Very clear" },
            { question: "What support would help most next week?", answer: "A lighter alumni version of the weekly rhythm" }
          ]
        },
        doctorSurvey: {
          title: "Doctor Follow-up Clinical Survey",
          submittedAt: "2026-06-02",
          status: "Completed",
          responses: [
            { question: "How would you rate overall patient functioning this week?", answer: "Stable and independent" },
            { question: "How concerning were observed symptoms?", answer: "Low concern" },
            { question: "How strong was adherence this week?", answer: "High adherence" },
            { question: "How much emotional strain was visible?", answer: "Low but worth monitoring after program completion" },
            { question: "What should be tracked next?", answer: "Retention of routines and signs of disengagement" }
          ]
        },
        pairedReviewStatus: "Paired patient and doctor follow-up surveys are complete",
        comparisonSummary:
          "The follow-up pair confirms that patient and doctor remain aligned on progress, which strengthens the value of this case in the anonymous comparison library.",
        anonymousUploadStatus: "Uploaded to anonymous doctor comparison library"
      },
      progressLinks: [
        {
          label: "Open dashboard snapshot",
          targetId: "dashboard-snapshot",
          description: "See the latest patient metrics after both surveys are paired"
        },
        {
          label: "Open weekly trend",
          targetId: "weekly-trend",
          description: "Compare emotional and symptom trends over time"
        },
        {
          label: "Open recorded assessments",
          targetId: "assessment-history",
          description: "Cross-check survey conclusions against prior assessments"
        }
      ]
    }
  }
];

export const demoDoctors: Doctor[] = [
  {
    id: "dr-laura-benitez",
    displayName: "Dr. Laura Benitez",
    specialty: "Oncology",
    organization: "Hospital Clinic Barcelona",
    region: "Catalonia",
    assignedPatientIds: ["michael-scott", "ana-torres"]
  },
  {
    id: "dr-omar-ribas",
    displayName: "Dr. Omar Ribas",
    specialty: "Medical Oncology",
    organization: "Hospital General Valencia",
    region: "Valencia",
    assignedPatientIds: ["luis-martin", "sara-khan"]
  }
];

export const donorDrafts = [
  {
    id: "draft-001",
    patientId: "michael-scott",
    audience: "Private donors",
    approvalStatus: "Needs TRRF review",
    summary:
      "Human-centered recovery story focused on emotional regulation and practical support timing."
  },
  {
    id: "draft-003",
    patientId: "sara-khan",
    audience: "Large corporates",
    approvalStatus: "Needs anonymization check",
    summary:
      "Retention-focused story showing why support after the main program phase still matters."
  }
];

export const entryPatientSurveyTemplate: SurveyField[] = [
  {
    id: "cancer_understanding",
    label: "What is your current understanding of your cancer diagnosis?",
    type: "text",
    helper: "Please describe the diagnosis as you currently understand it."
  },
  {
    id: "stage_understanding",
    label: "What is your current understanding of your cancer stage?",
    type: "text",
    helper: "Please describe the stage as it has been explained to you, even if you are unsure."
  },
  {
    id: "treatment_description",
    label: "What is your current understanding of the treatment you are receiving right now?",
    type: "text",
    helper: "Examples: chemotherapy, immunotherapy, surgery, breathing rehabilitation."
  },
  {
    id: "plan_clarity",
    label: "How clear does your treatment plan feel to you right now?",
    type: "select",
    options: ["Very clearly", "Mostly clearly", "Somewhat clearly", "Not very clearly"]
  },
  {
    id: "starting_support",
    label: "What support would help most at the start of treatment?",
    type: "text",
    helper: "Example: simpler explanations, emotional support, family guidance."
  }
];

export const followUpPatientSurveyTemplate: SurveyField[] = [
  { id: "mood", label: "How has your mood felt this week?", type: "range" },
  { id: "energy", label: "How would you rate your energy this week?", type: "range" },
  { id: "symptoms", label: "How disruptive were your symptoms?", type: "range" },
  {
    id: "daily_functioning",
    label: "How difficult was daily functioning this week?",
    type: "select",
    options: ["Very easy", "Mostly manageable", "Moderate difficulty", "High difficulty", "Very difficult"]
  },
  {
    id: "sleep_quality",
    label: "How would you describe your sleep this week?",
    type: "select",
    options: ["Very good", "Mostly good", "Mixed", "Mostly poor", "Very poor"]
  },
  {
    id: "treatment_understanding",
    label: "How clearly do you understand your current treatment plan?",
    type: "select",
    options: ["Very clearly", "Mostly clearly", "Somewhat clearly", "Not very clearly"]
  },
  {
    id: "treatment_progress",
    label: "How clearly do you understand your current progress?",
    type: "select",
    options: ["Very clearly", "Mostly clearly", "Somewhat clearly", "Still not very clear"]
  },
  {
    id: "emotional_support",
    label: "What kind of emotional support would help most right now?",
    type: "text",
    helper: "Example: reassurance after treatment days or more family guidance."
  },
  {
    id: "support",
    label: "What support would help most next week?",
    type: "text",
    helper: "Example: softer reminders after treatment days."
  }
];

const searchOnlyCaseLibrary: DeidentifiedCase[] = [
  {
    caseId: "Case LIB-201",
    patientId: "library-lung-201",
    cancerType: "Lung cancer",
    stage: "Stage I",
    sex: "Female",
    ageRange: "30-39",
    treatmentUsed: "Surgery, breathing rehab, LungFit onboarding",
    programPhase: "Before LungFit",
    outcomeSignal: "Positive trend",
    summary:
      "Early-stage lung-cancer case with strong understanding at entry and fast recovery after a lighter treatment path.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Useful comparator for younger lung-cancer patients with lower symptom burden."
  },
  {
    caseId: "Case LIB-202",
    patientId: "library-lung-202",
    cancerType: "Lung cancer",
    stage: "Stage III",
    sex: "Male",
    ageRange: "60+",
    treatmentUsed: "Chemotherapy, radiation, LungFit",
    programPhase: "In LungFit",
    outcomeSignal: "Needs review",
    summary:
      "Higher-intensity lung-cancer case where the patient underestimated fatigue and treatment duration during follow-up.",
    pairingStatus: "Entry pair complete, follow-up pair under doctor review",
    anonymousUploadStatus: "Awaiting final paired-review comment",
    comparisonInsight: "Strong example of misunderstanding risk around progress expectations."
  },
  {
    caseId: "Case LIB-203",
    patientId: "library-breast-203",
    cancerType: "Breast cancer",
    stage: "Stage I",
    sex: "Female",
    ageRange: "Under 40",
    treatmentUsed: "Surgery, radiation, emotional-support check-ins",
    programPhase: "Not in LungFit cohort",
    outcomeSignal: "Positive trend",
    summary:
      "Low-stage comparison case with high adherence and strong alignment between patient and doctor understanding.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Useful benchmark for high-clarity treatment communication."
  },
  {
    caseId: "Case LIB-204",
    patientId: "library-lymphoma-204",
    cancerType: "Lymphoma",
    stage: "Stage II",
    sex: "Female",
    ageRange: "40-49",
    treatmentUsed: "Immunotherapy, fatigue coaching",
    programPhase: "Not in LungFit cohort",
    outcomeSignal: "Stable trend",
    summary:
      "Moderate symptom case where emotional reporting was strong but treatment sequencing still needed clarification.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Good comparison case for partial understanding despite good engagement."
  },
  {
    caseId: "Case LIB-205",
    patientId: "library-pancreatic-205",
    cancerType: "Pancreatic cancer",
    stage: "Stage III",
    sex: "Male",
    ageRange: "50-59",
    treatmentUsed: "Chemotherapy, pain management, family guidance",
    programPhase: "Not in LungFit cohort",
    outcomeSignal: "Needs review",
    summary:
      "Case with high symptom burden and noticeable gaps between patient-perceived progress and doctor assessment.",
    pairingStatus: "Entry pair complete, follow-up doctor survey pending",
    anonymousUploadStatus: "Not uploaded yet",
    comparisonInsight: "Illustrates why paired follow-up surveys matter before sharing the case library broadly."
  },
  {
    caseId: "Case LIB-206",
    patientId: "library-prostate-206",
    cancerType: "Prostate cancer",
    stage: "Stage II",
    sex: "Male",
    ageRange: "60+",
    treatmentUsed: "Hormone therapy, rehabilitation coaching",
    programPhase: "Not in LungFit cohort",
    outcomeSignal: "Stable trend",
    summary:
      "Steady case with moderate energy drops but strong trust in the care team and consistent follow-through.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Useful for age- and stage-based comparison when treatment adherence is strong."
  },
  {
    caseId: "Case LIB-207",
    patientId: "library-lung-207",
    cancerType: "Lung cancer",
    stage: "Stage IV",
    sex: "Female",
    ageRange: "40-49",
    treatmentUsed: "Targeted therapy, breathing rehab, psychological support",
    programPhase: "After LungFit",
    outcomeSignal: "Stable trend",
    summary:
      "Advanced lung-cancer case where the patient remained emotionally steady but needed continued routine-retention support.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Helpful comparator for post-program retention planning."
  },
  {
    caseId: "Case LIB-208",
    patientId: "library-ovarian-208",
    cancerType: "Ovarian cancer",
    stage: "Stage IV",
    sex: "Female",
    ageRange: "50-59",
    treatmentUsed: "Targeted therapy, symptom monitoring, family support",
    programPhase: "Not in LungFit cohort",
    outcomeSignal: "Stable trend",
    summary:
      "Case with strong caregiver involvement and good symptom reporting, but a slower pace of emotional recovery.",
    pairingStatus: "Entry and follow-up survey pair completed",
    anonymousUploadStatus: "Uploaded to anonymous doctor comparison library",
    comparisonInsight: "Adds a non-lung advanced-stage case for broader cross-cancer comparison."
  }
];

export const demoCaseIndex: DeidentifiedCase[] = [
  ...demoPatients.map((patient) => ({
    caseId: `Case ${patient.studyId}`,
    patientId: patient.id,
    cancerType: patient.cancerType,
    stage: patient.stage,
    sex: patient.sex,
    ageRange:
      patient.age < 40 ? "Under 40" : patient.age < 50 ? "40-49" : patient.age < 60 ? "50-59" : "60+",
    treatmentUsed: patient.treatmentUsed.join(", "),
    programPhase: patient.programPhase,
    outcomeSignal:
      patient.riskLevel === "Improving"
        ? "Positive trend"
        : patient.riskLevel === "Stable"
          ? "Stable trend"
          : "Needs review",
    summary: patient.patientSummary,
    pairingStatus:
      patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
        ? "Entry and follow-up survey pair completed"
        : "Entry pair complete, follow-up pair under doctor review",
    anonymousUploadStatus:
      patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
        ? patient.surveyWorkflow.followUpPair.anonymousUploadStatus
        : patient.surveyWorkflow.entryPair.anonymousUploadStatus,
    comparisonInsight: patient.surveyWorkflow.followUpPair.comparisonSummary
  })),
  ...searchOnlyCaseLibrary
];

export const demoRoleAccess = [
  {
    role: "patient" as Role,
    label: "Patient Portal",
    route: "/patient",
    subtitle: "Supportive chatbot, weekly check-in, no dashboard in v1"
  },
  {
    role: "doctor" as Role,
    label: "Doctor Portal",
    route: "/doctor",
    subtitle: "Assigned patients, survey review, and broader cancer comparison search"
  },
  {
    role: "trrf" as Role,
    label: "TRRF Portal",
    route: "/trrf",
    subtitle: "LungFit lung-cancer dashboard, patient drill-downs, donor story drafts"
  }
];

export function isLungFitCohortPatient(patient: Patient) {
  return patient.cancerType === "Lung cancer";
}

export const trrfFocusPatients = demoPatients.filter(isLungFitCohortPatient);

export const programSummary = {
  activePatients: trrfFocusPatients.length,
  inLungFit: trrfFocusPatients.filter((patient) => patient.programPhase === "In LungFit").length,
  improving: trrfFocusPatients.filter((patient) => patient.riskLevel === "Improving").length,
  stable: trrfFocusPatients.filter((patient) => patient.riskLevel === "Stable").length,
  followUpNeeded: trrfFocusPatients.filter((patient) => patient.riskLevel === "Needs follow-up").length,
  storyDraftsReady: donorDrafts.length
};

export const prototypeStats = {
  trackedPatients: demoPatients.length,
  anonymousCases: demoCaseIndex.length,
  lungFitCohort: trrfFocusPatients.length
};

export const trrfImpactThemes: ImpactTheme[] = [
  {
    title: "Emotional stability after treatment days",
    count: trrfFocusPatients.filter((patient) => patient.metrics.mood >= 70).length,
    detail:
      "Patients in the current LungFit cohort are using the routine to stay calmer and more predictable between appointments."
  },
  {
    title: "Practical support coordination",
    count: trrfFocusPatients.filter((patient) => patient.nextAction.toLowerCase().includes("support")).length,
    detail:
      "TRRF can spot where transport, reminders, or family-facing coordination can make treatment feel more manageable."
  },
  {
    title: "Retention after the main program phase",
    count: trrfFocusPatients.filter((patient) => patient.programPhase === "After LungFit").length,
    detail:
      "The prototype now shows that some value comes after LungFit too, especially through lighter alumni follow-up."
  }
];

export function getPatientById(patientId: string) {
  return demoPatients.find((patient) => patient.id === patientId);
}

export function getDoctorById(doctorId: string) {
  return demoDoctors.find((doctor) => doctor.id === doctorId);
}

export function getAssignedPatientsForDoctor(doctorId: string) {
  return demoPatients.filter((patient) => patient.assignedDoctorIds.includes(doctorId));
}

export function getDonorDraftPatientName(patientId: string) {
  return getPatientById(patientId)?.displayName ?? "Unknown patient";
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function getSurveyJourney(patient: Patient, phaseKey: "entryPair" | "followUpPair"): SurveyJourneyStep[] {
  const pair = patient.surveyWorkflow[phaseKey];
  const doctorCompleted = pair.doctorSurvey.status === "Completed";

  return [
    {
      label: `${pair.phase} submitted by patient`,
      date: pair.patientSurvey.submittedAt,
      status: "Completed",
      detail: `${pair.patientSurvey.responses.length} patient answers were routed to ${patient.surveyWorkflow.assignedDoctor}.`
    },
    {
      label: `${pair.phase} completed by doctor`,
      date: doctorCompleted ? pair.doctorSurvey.submittedAt : "Pending",
      status: doctorCompleted ? "Completed" : "Pending",
      detail: doctorCompleted
        ? "The clinical survey is complete and the paired comparison is unlocked."
        : "This step is still waiting for the doctor-side survey."
    },
    {
      label: "Paired comparison and comment",
      date: doctorCompleted ? pair.doctorSurvey.submittedAt : "Locked",
      status: doctorCompleted ? "Completed" : "Locked",
      detail: doctorCompleted
        ? pair.comparisonSummary
        : "Only the doctor can unlock this after both surveys for the same stage are uploaded."
    },
    {
      label: "Anonymous doctor library status",
      date: doctorCompleted ? pair.doctorSurvey.submittedAt : "Pending review",
      status: pair.anonymousUploadStatus.includes("Uploaded")
        ? "Completed"
        : doctorCompleted
          ? "Pending"
          : "Locked",
      detail: pair.anonymousUploadStatus
    }
  ];
}

export function getMisunderstandingFlags(
  patient: Patient,
  phaseKey: "entryPair" | "followUpPair"
): MisunderstandingFlag[] {
  const pair = patient.surveyWorkflow[phaseKey];

  if (phaseKey === "followUpPair" && pair.doctorSurvey.status !== "Completed") {
    return [
      {
        title: "Progress alignment",
        severity: "Moderate",
        status: "Awaiting paired review",
        detail:
          "The patient follow-up survey is in, but the doctor follow-up survey is still needed before progress understanding can be compared."
      }
    ];
  }

  const patientText = normalizeText(pair.patientSurvey.responses.map((response) => response.answer).join(" "));
  const doctorText = normalizeText(pair.doctorSurvey.responses.map((response) => response.answer).join(" "));

  if (phaseKey === "entryPair") {
    const cancerAligned = patientText.includes(normalizeText(patient.cancerType));
    const stageAligned = patientText.includes(normalizeText(patient.stage));
    const clarityNeedsHelp =
      patientText.includes("somewhat") || patientText.includes("not very") || doctorText.includes("gap");

    return [
      {
        title: "Cancer type understanding",
        severity: cancerAligned ? "Low" : "High",
        status: cancerAligned ? "Aligned" : "Needs clarification",
        detail: cancerAligned
          ? "The patient description matches the clinically confirmed cancer type."
          : "The patient description does not clearly match the confirmed cancer type and should be clarified."
      },
      {
        title: "Stage understanding",
        severity: stageAligned ? "Low" : "Moderate",
        status: stageAligned ? "Aligned" : "Needs clarification",
        detail: stageAligned
          ? "The patient appears to understand the current stage."
          : "Stage understanding looks incomplete or uncertain compared with the doctor entry survey."
      },
      {
        title: "Treatment-plan clarity",
        severity: clarityNeedsHelp ? "Moderate" : "Low",
        status: clarityNeedsHelp ? "Needs clarification" : "Aligned",
        detail: clarityNeedsHelp
          ? "The patient is engaged, but the paired entry survey suggests some treatment-plan explanation is still needed."
          : "The patient and doctor entry surveys suggest strong treatment-plan understanding."
      }
    ];
  }

  return [
    {
      title: "Current progress understanding",
      severity:
        patientText.includes("still not very clear") || patientText.includes("not very clear")
          ? "High"
          : patientText.includes("mostly clear")
            ? "Moderate"
            : "Low",
      status:
        patientText.includes("still not very clear") || patientText.includes("not very clear")
          ? "Needs clarification"
          : "Aligned",
      detail:
        patientText.includes("still not very clear") || patientText.includes("not very clear")
          ? "The patient follow-up answers suggest ongoing uncertainty about treatment progress."
          : "The patient appears to understand their current progress reasonably well."
    },
    {
      title: "Observed symptom burden",
      severity: patient.metrics.symptomLoad > 60 ? "High" : patient.metrics.symptomLoad > 45 ? "Moderate" : "Low",
      status: patient.metrics.symptomLoad > 60 ? "Needs clarification" : "Aligned",
      detail:
        patient.metrics.symptomLoad > 60
          ? "Symptoms are still disruptive enough that doctor explanation and expectation-setting should stay active."
          : "Symptom reporting and clinical observation are within a manageable range for this stage."
    },
    {
      title: "Patient vs doctor progress view",
      severity: doctorText.includes("misaligned") || doctorText.includes("concern") ? "Moderate" : "Low",
      status: doctorText.includes("misaligned") || doctorText.includes("concern") ? "Needs clarification" : "Aligned",
      detail:
        doctorText.includes("misaligned") || doctorText.includes("concern")
          ? "The doctor follow-up survey suggests at least some mismatch between the patient's progress narrative and the clinical picture."
          : "The doctor follow-up survey suggests the patient's interpretation of progress is broadly aligned."
    }
  ];
}

export function getDoctorActionItems(
  patient: Patient,
  phaseKey: "entryPair" | "followUpPair"
): DoctorActionItem[] {
  const pair = patient.surveyWorkflow[phaseKey];
  const flags = getMisunderstandingFlags(patient, phaseKey);
  const needsClarification = flags.some((flag) => flag.status === "Needs clarification");

  return [
    {
      title: "Complete paired survey review",
      owner: patient.surveyWorkflow.assignedDoctor,
      status: pair.doctorSurvey.status === "Completed" ? "Done" : "Pending",
      detail:
        pair.doctorSurvey.status === "Completed"
          ? "Both surveys for this stage are already available for side-by-side comparison."
          : "The patient survey is already in. The doctor survey is the next step before review can happen."
    },
    {
      title: needsClarification ? "Clarify understanding gap" : "Confirm continued alignment",
      owner: "Doctor and patient",
      status: needsClarification ? "Open" : "Monitor",
      detail: needsClarification
        ? "Use the paired survey view to explain the diagnosis, stage, treatment plan, or progress more clearly."
        : "The paired surveys look aligned overall, so the next conversation can focus on maintaining clarity."
    },
    {
      title: "Operational next step",
      owner: "Doctor / TRRF coordination",
      status: patient.riskLevel === "Needs follow-up" ? "Priority" : "Planned",
      detail: patient.nextAction
    },
    {
      title: "Anonymous case-library release",
      owner: "Doctor",
      status: pair.anonymousUploadStatus.includes("Uploaded") ? "Done" : "Pending",
      detail: pair.anonymousUploadStatus
    }
  ];
}

export function getPatientConsentItems(patient: Patient): ConsentItem[] {
  const donorHighlight = patient.conversationHighlights.join(" ").toLowerCase();

  return [
    {
      label: "Health reflections and surveys",
      status: "Granted",
      detail: "The patient has already participated in health-related surveys and chatbot-based reflection."
    },
    {
      label: "Doctor paired review",
      status: "Granted",
      detail: "Patient and doctor responses can be compared together for the treating doctor."
    },
    {
      label: "Anonymous doctor comparison library",
      status:
        patient.surveyWorkflow.entryPair.anonymousUploadStatus.includes("Uploaded") ||
        patient.surveyWorkflow.followUpPair.anonymousUploadStatus.includes("Uploaded")
          ? "Conditional"
          : "Operational only",
      detail:
        "Only de-identified case patterns should move into the broader doctor library, and only after review comments are complete."
    },
    {
      label: "Donor storytelling and communication",
      status: donorHighlight.includes("no donor-story consent")
        ? "Not granted"
        : donorHighlight.includes("opted into") || donorHighlight.includes("interested in sharing")
          ? "Conditional"
          : "Operational only",
      detail: donorHighlight.includes("no donor-story consent")
        ? "No donor-story permission is recorded yet for this patient."
        : "Any story use stays draft-only and reviewed before external sharing."
    }
  ];
}

export function getTreatmentTimeline(patient: Patient): TreatmentTimelineItem[] {
  return [
    {
      date: patient.surveyWorkflow.entryPair.patientSurvey.submittedAt,
      title: "Entry survey submitted",
      detail: "The patient recorded their own understanding of diagnosis, stage, treatment, and support needs.",
      emphasis: "patient"
    },
    {
      date: patient.surveyWorkflow.entryPair.doctorSurvey.submittedAt,
      title: "Doctor entry survey completed",
      detail: patient.surveyWorkflow.entryPair.comparisonSummary,
      emphasis: "doctor"
    },
    {
      date: patient.surveyWorkflow.followUpPair.patientSurvey.submittedAt,
      title: "Follow-up treatment survey submitted",
      detail: "The patient reported current symptoms, functioning, and treatment-progress understanding.",
      emphasis: "patient"
    },
    {
      date: patient.surveyWorkflow.followUpPair.doctorSurvey.submittedAt || "Pending",
      title:
        patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
          ? "Doctor follow-up survey completed"
          : "Doctor follow-up survey pending",
      detail:
        patient.surveyWorkflow.followUpPair.doctorSurvey.status === "Completed"
          ? patient.surveyWorkflow.followUpPair.comparisonSummary
          : "The doctor survey is the next step before the paired progress view is fully unlocked.",
      emphasis: "doctor"
    },
    {
      date: patient.lastCheckIn,
      title: "Current program phase",
      detail: `${patient.programPhase}. ${patient.nextAction}`,
      emphasis: "program"
    }
  ];
}
