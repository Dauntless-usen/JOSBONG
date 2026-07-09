import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllInsights, getInsightBySlug } from "@/lib/content";
import Button from "@/components/ui/Button";
import MDXContent from "@/components/mdx/MDXContent";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllInsights().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — JosBong`,
    description: article.excerpt,
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="font-medium uppercase tracking-wide text-orange">
              {article.category}
            </span>
            <span>{formattedDate}</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-navy">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-gray-600">{article.excerpt}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- coverImage is a placeholder SVG; next/image blocks SVGs by default */}
        <img
          src={article.coverImage}
          alt={article.title}
          className="mt-12 w-full rounded-lg border border-gray-100"
        />
      </div>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <MDXContent code={article.content} />
        </div>
      </section>

      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Have a project in mind?</h2>
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
