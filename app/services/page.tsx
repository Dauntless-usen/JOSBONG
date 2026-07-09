import Link from "next/link";
import type { Metadata } from "next";
import { getAllServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services - JosBong",
  description:
    "Research, AI solutions, data analysis, and academic support for businesses and academics.",
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">Services</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Whether you&apos;re a business or a researcher, our services are
          built around the same principle: rigorous work, delivered on time.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-lg border border-gray-100 p-8 hover:border-navy transition-colors"
            >
              <h2 className="text-xl font-semibold text-navy">{service.title}</h2>
              <p className="mt-3 text-gray-600">{service.summary}</p>
              <span className="mt-6 inline-block text-sm font-medium text-orange">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
