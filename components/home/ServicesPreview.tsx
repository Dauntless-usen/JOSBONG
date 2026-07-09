import Link from "next/link";
import { FlaskConical, BrainCircuit, BarChart3, GraduationCap, type LucideIcon } from "lucide-react";
import { getAllServices } from "@/lib/content";

const iconBySlug: Record<string, LucideIcon> = {
  research: FlaskConical,
  "ai-solutions": BrainCircuit,
  "data-analysis": BarChart3,
  "academic-support": GraduationCap,
};

export default function ServicesPreview() {
  const services = getAllServices();

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-navy">What we do</h2>
          <Link
            href="/services"
            className="text-sm font-medium text-navy hover:text-orange transition-colors"
          >
            View all services →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconBySlug[service.slug] ?? FlaskConical;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg border border-gray-100 p-6 hover:border-navy transition-colors"
              >
                <Icon className="text-orange" size={28} />
                <h3 className="mt-4 font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.summary}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
