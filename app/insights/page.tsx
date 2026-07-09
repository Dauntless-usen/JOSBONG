import type { Metadata } from "next";
import { getAllInsights } from "@/lib/content";
import ArticleCard from "@/components/insights/ArticleCard";

export const metadata: Metadata = {
  title: "Insights — JosBong",
  description: "Notes on research, AI, data, and academic work from JosBong.",
};

export default function InsightsPage() {
  const articles = getAllInsights();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">Insights</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Notes on research, AI, data, and academic work from the JosBong team.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
