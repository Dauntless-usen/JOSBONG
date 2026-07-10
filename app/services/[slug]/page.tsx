import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug as getContentServiceBySlug } from "@/lib/content";
import { services as serviceListings, getServiceListing } from "@/lib/services";
import ServiceTemplate from "@/components/services/ServiceTemplate";
import SimpleServiceTemplate from "@/components/services/SimpleServiceTemplate";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceListings.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const contentService = getContentServiceBySlug(slug);
  if (contentService) {
    return {
      title: `${contentService.title} - JosBong`,
      description: contentService.summary,
    };
  }

  const listing = getServiceListing(slug);
  if (!listing) return {};
  return {
    title: `${listing.title} - JosBong`,
    description: listing.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Content-backed services (with full MDX: deliverables, process steps,
  // body) get the rich template. Everything else in the canonical service
  // list still gets a real page, generated from its title + description.
  const contentService = getContentServiceBySlug(slug);
  if (contentService) {
    return <ServiceTemplate service={contentService} />;
  }

  const listing = getServiceListing(slug);
  if (!listing) notFound();

  return <SimpleServiceTemplate service={listing} />;
}
