export type SimulationTurn = {
  sender: "assistant" | "patient";
  text: string;
};

export type SimulationItem = {
  label: string;
  value: string;
};

export type ConversationSimulationScenario = {
  id: string;
  title: string;
  summary: string;
  focus: string;
  conversation: SimulationTurn[];
  extracted: {
    understanding: SimulationItem[];
    structuredData: SimulationItem[];
    doctorView: SimulationItem[];
    humanInsight: string;
  };
};

export const conversationSimulationScenarios: ConversationSimulationScenario[] = [
  {
    id: "fatigue-after-infusion",
    title: "Fatigue and symptom burden after treatment",
    summary:
      "This example shows how a patient might talk naturally about energy, sleep, symptoms, and uncertainty before the next infusion.",
    focus: "Weekly follow-up",
    conversation: [
      {
        sender: "assistant",
        text: "Would it help to tell me how the last treatment week felt, especially what was hardest between appointments?"
      },
      {
        sender: "patient",
        text: "Two days after chemotherapy I felt exhausted, slept badly, and even walking up the stairs made me short of breath."
      },
      {
        sender: "assistant",
        text: "Thank you for saying that clearly. Do you feel you understand whether that pattern is expected, and what support would help most before the next treatment?"
      },
      {
        sender: "patient",
        text: "Not really. I know I am supposed to keep doing the breathing exercises, but I am not sure what is normal anymore and I am anxious about Friday's infusion."
      }
    ],
    extracted: {
      understanding: [
        { label: "Main theme", value: "Post-treatment fatigue with shortness of breath and poor sleep" },
        { label: "Treatment understanding", value: "Patient is unsure whether current symptoms are expected" },
        { label: "Support need", value: "Reassurance and clearer guidance before the next infusion" }
      ],
      structuredData: [
        { label: "Mood", value: "2 / 5" },
        { label: "Energy", value: "1 / 5" },
        { label: "Symptoms", value: "4 / 5" },
        { label: "Sleep quality", value: "Mostly poor" },
        { label: "Treatment progress clarity", value: "Still not very clear" }
      ],
      doctorView: [
        { label: "Review flag", value: "Clarify side-effect expectations before Friday infusion" },
        { label: "Progress note", value: "Symptoms cluster after chemotherapy and are affecting daily functioning" },
        { label: "Anonymous library value", value: "Useful comparison case for lung-cancer fatigue management" }
      ],
      humanInsight:
        "The patient is not only tired. He is also losing confidence in what is normal, which is exactly the kind of emotional and clinical gap the paired survey workflow is meant to surface."
    }
  },
  {
    id: "treatment-confusion",
    title: "Confusion about diagnosis and treatment plan",
    summary:
      "This example focuses on the entry-survey use case, where the patient has partial understanding but feels embarrassed to ask again.",
    focus: "Entry survey",
    conversation: [
      {
        sender: "assistant",
        text: "What feels least clear to you about your care plan right now?"
      },
      {
        sender: "patient",
        text: "I know it is lung cancer, but I still mix up whether this phase is chemotherapy or targeted therapy, and I feel embarrassed asking the same question again."
      },
      {
        sender: "assistant",
        text: "It is okay to say that here. What would help you feel more confident before the next appointment?"
      },
      {
        sender: "patient",
        text: "A short explanation in plain language and maybe something my wife can read with me afterwards."
      }
    ],
    extracted: {
      understanding: [
        { label: "Main theme", value: "Diagnosis is broadly understood, but treatment type is not fully clear" },
        { label: "Emotional signal", value: "Patient feels embarrassed asking repeated clarification questions" },
        { label: "Support need", value: "Plain-language explanation plus family-inclusive guidance" }
      ],
      structuredData: [
        { label: "Diagnosis understanding", value: "Partly clear" },
        { label: "Stage understanding", value: "Not discussed in this exchange" },
        { label: "Treatment-plan clarity", value: "Somewhat clearly" },
        { label: "Starting support need", value: "Simpler explanation with family support" }
      ],
      doctorView: [
        { label: "Review flag", value: "Re-explain current treatment mode in plain language" },
        { label: "Comment opportunity", value: "Mismatch may be caused by communication overload, not disengagement" },
        { label: "Anonymous library value", value: "Useful case for understanding treatment confusion early in care" }
      ],
      humanInsight:
        "This kind of conversation matters because the patient may appear compliant while still feeling unclear about what is actually happening, which can affect trust and adherence later."
    }
  },
  {
    id: "logistics-and-routine",
    title: "Practical barriers and routine support",
    summary:
      "This example shows how the chatbot can capture non-clinical obstacles that still affect treatment experience and progress.",
    focus: "Weekly follow-up",
    conversation: [
      {
        sender: "assistant",
        text: "How has daily life been going between treatment sessions?"
      },
      {
        sender: "patient",
        text: "The treatment itself is manageable, but getting to appointments is hard and on tired days I forget the breathing routine."
      },
      {
        sender: "assistant",
        text: "What kind of support would make that feel more manageable next week?"
      },
      {
        sender: "patient",
        text: "Transport help once a week and a gentle reminder in the evening would probably make the biggest difference."
      }
    ],
    extracted: {
      understanding: [
        { label: "Main theme", value: "Practical logistics are disrupting follow-through more than symptoms themselves" },
        { label: "Adherence signal", value: "Routine drops on low-energy days" },
        { label: "Support need", value: "Transport coordination and gentle reminders" }
      ],
      structuredData: [
        { label: "Energy", value: "3 / 5" },
        { label: "Symptoms", value: "2 / 5" },
        { label: "Daily functioning", value: "Moderate difficulty" },
        { label: "Support next week", value: "Transport help and reminder prompts" }
      ],
      doctorView: [
        { label: "Review flag", value: "Operational support may improve adherence more than treatment changes" },
        { label: "TRRF coordination", value: "Good candidate for transport and routine-support intervention" },
        { label: "Anonymous library value", value: "Useful comparison for support-driven adherence barriers" }
      ],
      humanInsight:
        "Not every important signal is medical. Sometimes the most useful intervention is practical coordination, and the chatbot is a strong place to surface that early."
    }
  }
];
