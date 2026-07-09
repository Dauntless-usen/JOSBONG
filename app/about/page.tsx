import type { Metadata } from "next";
import { ShieldCheck, Users, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import TrustStrip from "@/components/home/TrustStrip";

export const metadata: Metadata = {
  title: "About - JosBong",
  description:
    "JosBong is a research, AI, and data services company serving businesses and academics.",
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Rigor first",
    description:
      "Every deliverable is built to hold up to scrutiny - sourced, tested, and documented.",
  },
  {
    icon: Users,
    title: "Two audiences, one standard",
    description:
      "Businesses and academics get the same level of care, just applied to different problems.",
  },
  {
    icon: Clock,
    title: "Deadlines are real",
    description:
      "We scope work around your timeline from the start, not as an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy">About JosBong</h1>
          <p className="mt-6 text-lg text-gray-600">
            JosBong is a research, AI, and data services company. We work
            with businesses building AI and data capabilities, and with
            academics and students who need rigorous research and analysis
            support - often against a real deadline.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-navy text-center">How we work</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="text-center">
                <principle.icon className="mx-auto text-orange" size={32} />
                <h3 className="mt-4 font-semibold text-navy">{principle.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-navy">Want to work with us?</h2>
          <p className="mt-3 text-gray-600">
            Tell us about your project and we&apos;ll follow up with next steps.
          </p>
          <div className="mt-8">
            <Button href="/quote">Request a Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
