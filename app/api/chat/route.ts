import { NextResponse } from "next/server";

type ChatPayload = {
  message?: string;
  consentGiven?: boolean;
};

function buildSimulatedReply(message: string, consentGiven: boolean) {
  const normalized = message.toLowerCase();

  if (!consentGiven) {
    return "Thank you for sharing that. I can keep supporting you in a general way, and if you choose to give consent later, I can also help structure a weekly health check-in for your care team.";
  }

  if (normalized.includes("tired") || normalized.includes("fatigue") || normalized.includes("exhausted")) {
    return "That sounds like a heavy week. I can note that fatigue felt especially present and help capture whether it affected your daily routine, sleep, or motivation for the weekly check-in.";
  }

  if (normalized.includes("anxious") || normalized.includes("worried") || normalized.includes("scared")) {
    return "I’m glad you said that out loud. I can help record that this week carried more emotional weight, and we can also note what kind of support would feel most reassuring before the next appointment.";
  }

  if (normalized.includes("pain") || normalized.includes("symptom")) {
    return "I can help you structure that experience for your care team. If you want, the weekly check-in below is the best place in this demo to capture how disruptive the symptoms felt overall.";
  }

  return "Thank you for sharing that. I would reflect it back in a supportive way and connect it to the weekly check-in so your doctor and TRRF team can see the trend without turning your experience into just numbers.";
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatPayload;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ reply: "I’m here when you’re ready to share how the week has been." }, { status: 400 });
  }

  return NextResponse.json({
    reply: buildSimulatedReply(message, Boolean(body.consentGiven))
  });
}

