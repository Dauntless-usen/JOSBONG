import { NextResponse } from "next/server";
import { sendQuoteNotification } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

  const { name, email, services, projectDetails, budget, attachmentUrl } =
    body as Record<string, unknown>;

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

  if (attachmentUrl !== undefined && typeof attachmentUrl !== "string") {
    return NextResponse.json({ error: "Invalid attachment" }, { status: 400 });
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    services,
    projectDetails: projectDetails.trim(),
    budget: budget?.trim() || undefined,
    attachmentUrl: attachmentUrl || undefined,
  };

  // Best-effort lead record: a failed insert here shouldn't stop the quote
  // notification email from going out - we'd rather have the email land
  // with no DB row than lose the lead entirely.
  const { error: insertError } = await supabaseAdmin.from("leads").insert({
    name: submission.name,
    email: submission.email,
    services: submission.services,
    project_details: submission.projectDetails,
    budget: submission.budget ?? null,
    attachment_url: submission.attachmentUrl ?? null,
  });

  if (insertError) {
    console.error("Failed to insert lead into Supabase:", insertError);
  }

  try {
    await sendQuoteNotification(submission);
  } catch (error) {
    console.error("Failed to send quote notification email:", error);
    return NextResponse.json(
      { error: "Failed to submit request. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
