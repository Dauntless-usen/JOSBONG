import type { Metadata } from "next";
import { getServicesByCategory, type ServiceCategory } from "@/lib/services";
import ServiceCard from "@/components/services/ServiceCard";

export const metadata: Metadata = {
  title: "Services - JosBong",
  description:
    "Research, AI solutions, data analysis, and academic support for businesses and academics.",
};

const sections: { category: ServiceCategory; heading: string }[] = [
  { category: "general", heading: "General Services" },
  { category: "business", heading: "For Businesses" },
  { category: "academic", heading: "For Academics & Students" },
];

export default function ServicesPage() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">Services</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Whether you&apos;re a business or a researcher, our services are
          built around the same principle: rigorous work, delivered on time.
        </p>

        {sections.map(({ category, heading }) => {
          const categoryServices = getServicesByCategory(category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} className="mt-16 first:mt-12">
              <h2 className="text-2xl font-semibold text-navy">{heading}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
