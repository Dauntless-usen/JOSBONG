import type { Project } from "#velite";
import Button from "@/components/ui/Button";
import MDXContent from "@/components/mdx/MDXContent";

const categoryLabel: Record<Project["category"], string> = {
  research: "Research",
  ai: "AI",
  data: "Data",
  academic: "Academic",
};

type ProjectDetailProps = {
  project: Project;
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <span className="text-xs font-medium uppercase tracking-wide text-orange">
            {categoryLabel[project.category]}
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-navy">
            {project.title}
          </h1>
          <p className="mt-6 text-lg text-gray-600">{project.outcome}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 border-t border-gray-100 pt-8">
            {project.client && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-400">Client</dt>
                <dd className="mt-1 text-sm text-navy">{project.client}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Date</dt>
              <dd className="mt-1 text-sm text-navy">{formattedDate}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-gray-400">Tools</dt>
              <dd className="mt-1 text-sm text-navy">{project.tools.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- coverImage is a placeholder SVG; next/image blocks SVGs by default */}
        <img
          src={project.coverImage}
          alt={project.title}
          className="mt-12 w-full rounded-lg border border-gray-100"
        />
      </div>

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <MDXContent code={project.content} />
        </div>
      </section>

      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Have a similar project?</h2>
          <p className="mt-3 text-gray-400">
            Tell us about it and we&apos;ll follow up with next steps.
          </p>
          <div className="mt-8">
            <Button href="/quote">Request a Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
