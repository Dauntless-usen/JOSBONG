import Link from "next/link";
import type { Project } from "#velite";

const categories: { label: string; value: Project["category"] | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Research", value: "research" },
  { label: "AI", value: "ai" },
  { label: "Data", value: "data" },
  { label: "Academic", value: "academic" },
];

type ProjectFiltersProps = {
  active?: Project["category"];
};

export default function ProjectFilters({ active }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = active === category.value;
        const href = category.value ? `/work?category=${category.value}` : "/work";

        return (
          <Link
            key={category.label}
            href={href}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-navy bg-navy text-white"
                : "border-gray-100 text-navy hover:border-navy"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}
