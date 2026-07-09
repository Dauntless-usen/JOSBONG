"use client";

import { useState, type FormEvent } from "react";

const serviceOptions = [
  { value: "research", label: "Research" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "academic-support", label: "Academic Support" },
];

const budgetOptions = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $20,000",
  "$20,000+",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleService(value: string) {
    setSelectedServices((current) =>
      current.includes(value)
        ? current.filter((service) => service !== value)
        : [...current, value],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      services: selectedServices,
      projectDetails: formData.get("projectDetails"),
      budget: formData.get("budget") || undefined,
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
          Thanks for reaching out — we&apos;ll follow up by email within one
          business day.
        </p>
      </div>
    );
  }

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

      {status === "error" && errorMessage && (
        <p className="text-sm text-orange">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || selectedServices.length === 0}
        className="inline-flex w-full items-center justify-center rounded-lg bg-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
      >
        {status === "submitting" ? "Submitting..." : "Request a Quote"}
      </button>
      {selectedServices.length === 0 && (
        <p className="text-xs text-gray-400">Select at least one service to continue.</p>
      )}
    </form>
  );
}
