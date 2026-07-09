import Link from "next/link";
import type { Project } from "#velite";

const categoryLabel: Record<Project["category"], string> = {
  research: "Research",
  ai: "AI",
  data: "Data",
  academic: "Academic",
};

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="rounded-lg border border-gray-100 overflow-hidden hover:border-navy transition-colors"
    >
      <div className="h-40 bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- coverImage is a placeholder SVG; next/image blocks SVGs by default */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-orange">
          {categoryLabel[project.category]}
        </span>
        <h3 className="mt-2 font-semibold text-navy">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{project.outcome}</p>
      </div>
    </Link>
  );
}
