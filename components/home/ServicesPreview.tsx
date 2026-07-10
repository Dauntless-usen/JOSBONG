import Link from "next/link";
import { services } from "@/lib/services";
import ServiceCard from "@/components/services/ServiceCard";

export default function ServicesPreview() {
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

        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} className="w-64 flex-shrink-0" />
            ))}
            {services.map((service) => (
              <ServiceCard
                key={`${service.title}-repeat`}
                service={service}
                className="w-64 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
