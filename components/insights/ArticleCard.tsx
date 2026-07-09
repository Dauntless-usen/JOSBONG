import Link from "next/link";
import type { Article } from "#velite";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="rounded-lg border border-gray-100 overflow-hidden hover:border-navy transition-colors"
    >
      <div className="h-40 bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- coverImage is a placeholder SVG; next/image blocks SVGs by default */}
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="font-medium uppercase tracking-wide text-orange">
            {article.category}
          </span>
          <span>{formattedDate}</span>
        </div>
        <h3 className="mt-2 font-semibold text-navy">{article.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>
      </div>
    </Link>
  );
}
