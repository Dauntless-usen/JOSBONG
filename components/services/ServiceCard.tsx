import Link from "next/link";
import type { Service } from "@/lib/services";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export default function ServiceCard({ service, className = "" }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`rounded-lg border border-gray-100 p-6 hover:border-navy transition-colors ${className}`}
    >
      <service.icon className="text-orange" size={28} />
      <h3 className="mt-4 font-semibold text-navy">{service.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{service.description}</p>
    </Link>
  );
}
