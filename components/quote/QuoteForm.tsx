"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { services } from "@/lib/services";
import { supabaseBrowser } from "@/lib/supabase/client";

const serviceOptions = services.map((service) => ({
  value: service.slug,
  label: service.title,
}));

const budgetOptions = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $20,000",
  "$20,000+",
  "Not sure yet",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ATTACHMENTS_BUCKET = "quote-attachments";
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

type Status = "idle" | "uploading" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleService(value: string) {
    setSelectedServices((current) =>
      current.includes(value)
        ? current.filter((service) => service !== value)
        : [...current, value],
    );
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setAttachment(null);
      setFileError(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setFileError("Attachments must be a PDF file.");
      setAttachment(null);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError("Attachments must be 10MB or smaller.");
      setAttachment(null);
      event.target.value = "";
      return;
    }

    setFileError(null);
    setAttachment(file);
  }

  async function uploadAttachment(file: File): Promise<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabaseBrowser.storage
      .from(ATTACHMENTS_BUCKET)
      .upload(path, file);

    if (uploadError) {
      throw new Error("Failed to upload attachment. Please try again.");
    }

    const { data: signedData, error: signedError } = await supabaseBrowser.storage
      .from(ATTACHMENTS_BUCKET)
      .createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);

    if (signedError || !signedData) {
      throw new Error("Failed to prepare attachment link. Please try again.");
    }

    return signedData.signedUrl;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    let attachmentUrl: string | undefined;

    if (attachment) {
      setStatus("uploading");
      try {
        attachmentUrl = await uploadAttachment(attachment);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to upload attachment.");
        setStatus("error");
        return;
      }
    }

    setStatus("submitting");

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      services: selectedServices,
      projectDetails: formData.get("projectDetails"),
      budget: formData.get("budget") || undefined,
      attachmentUrl,
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-semibold text-navy">Request received</h2>
        <p className="mt-3 text-gray-600">
          Thanks for reaching out - we&apos;ll follow up by email within one
          business day.
        </p>
      </div>
    );
  }

  const isBusy = status === "uploading" || status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-navy">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-navy">
          Service interest
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {serviceOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(option.value)}
                onChange={() => toggleService(option.value)}
                className="accent-orange"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="projectDetails" className="block text-sm font-medium text-navy">
          Project details
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-navy">
          Budget range <span className="text-gray-400">(optional)</span>
        </label>
        <select
          id="budget"
          name="budget"
          className="mt-2 w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a range
          </option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="attachment" className="block text-sm font-medium text-navy">
          Attachment <span className="text-gray-400">(optional, PDF, max 10MB)</span>
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-2 w-full rounded-lg border border-gray-100 px-4 py-3 text-sm text-navy file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-medium file:text-white focus:border-navy focus:outline-none"
        />
        {fileError && <p className="mt-2 text-sm text-orange">{fileError}</p>}
        {attachment && !fileError && (
          <p className="mt-2 text-sm text-gray-600">Selected: {attachment.name}</p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-orange">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isBusy || selectedServices.length === 0}
        className="inline-flex w-full items-center justify-center rounded-lg bg-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
      >
        {status === "uploading"
          ? "Uploading attachment..."
          : status === "submitting"
            ? "Submitting..."
            : "Request a Quote"}
      </button>
      {selectedServices.length === 0 && (
        <p className="text-xs text-gray-400">Select at least one service to continue.</p>
      )}
    </form>
  );
}
