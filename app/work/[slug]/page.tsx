import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import ProjectDetail from "@/components/work/ProjectDetail";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWork().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — JosBong`,
    description: project.outcome,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
