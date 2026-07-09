import type { Metadata } from "next";
import type { Project } from "#velite";
import { getAllWork } from "@/lib/content";
import ProjectCard from "@/components/work/ProjectCard";
import ProjectFilters from "@/components/work/ProjectFilters";

export const metadata: Metadata = {
  title: "Work - JosBong",
  description: "Research, AI, data, and academic projects delivered by JosBong.",
};

const validCategories: Project["category"][] = ["research", "ai", "data", "academic"];

type WorkPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category } = await searchParams;
  const activeCategory = validCategories.find((value) => value === category);
  const projects = getAllWork(activeCategory);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">Work</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          A sample of research, AI, data, and academic projects we&apos;ve
          delivered.
        </p>

        <div className="mt-10">
          <ProjectFilters active={activeCategory} />
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-gray-600">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
