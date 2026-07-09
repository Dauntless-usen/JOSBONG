import Link from "next/link";
import { getFeaturedWork } from "@/lib/content";
import ProjectCard from "@/components/work/ProjectCard";

export default function FeaturedWork() {
  const projects = getFeaturedWork();

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-navy">Featured work</h2>
          <Link
            href="/work"
            className="text-sm font-medium text-navy hover:text-orange transition-colors"
          >
            View all work →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
