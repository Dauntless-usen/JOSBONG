import { NextResponse } from "next/server";
import { sendQuoteNotification } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, services, projectDetails, budget } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  if (
    !Array.isArray(services) ||
    services.length === 0 ||
    !services.every((service) => typeof service === "string")
  ) {
    return NextResponse.json({ error: "Select at least one service" }, { status: 400 });
  }

  if (typeof projectDetails !== "string" || projectDetails.trim().length === 0) {
    return NextResponse.json({ error: "Project details are required" }, { status: 400 });
  }

  if (budget !== undefined && typeof budget !== "string") {
    return NextResponse.json({ error: "Invalid budget" }, { status: 400 });
  }

  try {
    await sendQuoteNotification({
      name: name.trim(),
      email: email.trim(),
      services,
      projectDetails: projectDetails.trim(),
      budget: budget?.trim() || undefined,
    });
  } catch (error) {
    console.error("Failed to send quote notification email:", error);
    return NextResponse.json(
      { error: "Failed to submit request. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
