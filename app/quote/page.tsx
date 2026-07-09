import type { Metadata } from "next";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote — JosBong",
  description: "Tell us about your project and we'll follow up with next steps.",
};

export default function QuotePage() {
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-navy text-center">
          Request a Quote
        </h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Tell us about your project and we&apos;ll follow up by email with
          next steps.
        </p>

        <div className="mt-12">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
