import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { getServiceListing } from "@/lib/services";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Request a Quote", href: "/quote" },
];

// Every service now has a detail page, but a curated handful keeps this
// column's length in line with "Quick Links" instead of listing all ten.
// See /services for the full, category-grouped list.
const footerServiceSlugs = ["research", "ai-solutions", "data-analysis", "academic-support"];
const serviceLinks = footerServiceSlugs.map((slug) => {
  const service = getServiceListing(slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return { label: service.title, href: `/services/${service.slug}` };
});

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Image
            src="/logo/dark.jpeg"
            alt="JosBong"
            width={192}
            height={126}
            className="h-24 w-auto"
          />
          <p className="mt-4 text-sm text-gray-400">
            Research, AI, and data services for businesses and academics.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Services
          </h3>
          <ul className="mt-4 space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-orange transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:hello@josbong.com"
                className="flex items-center gap-2 text-sm hover:text-orange transition-colors"
              >
                <Mail size={16} />
                hello@josbong.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-400">
          © {new Date().getFullYear()} JosBong. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
