import { Resend } from "resend";

export type QuoteSubmission = {
  name: string;
  email: string;
  services: string[];
  projectDetails: string;
  budget?: string;
  attachmentUrl?: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendQuoteNotification(submission: QuoteSubmission) {
  const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    throw new Error("QUOTE_NOTIFICATION_EMAIL is not set");
  }

  const resend = getResendClient();

  const html = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Services:</strong> ${escapeHtml(submission.services.join(", "))}</p>
    <p><strong>Budget:</strong> ${escapeHtml(submission.budget || "Not specified")}</p>
    <p><strong>Project details:</strong></p>
    <p>${escapeHtml(submission.projectDetails).replace(/\n/g, "<br />")}</p>
    ${
      submission.attachmentUrl
        ? `<p><strong>Attachment:</strong> <a href="${escapeHtml(submission.attachmentUrl)}">View attachment</a> (link expires in 7 days)</p>`
        : ""
    }
  `;

  return resend.emails.send({
    // Resend's shared testing sender — swap for a verified domain sender
    // (e.g. quotes@josbong.com) once a domain is verified in Resend.
    from: "JosBong Website <onboarding@resend.dev>",
    to: notificationEmail,
    replyTo: submission.email,
    subject: `New quote request from ${submission.name}`,
    html,
  });
}
