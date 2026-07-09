import Button from "@/components/ui/Button";

const audiences = [
  {
    title: "For Businesses",
    description:
      "AI solutions and data analysis to help you make faster, better-informed decisions - from model prototyping to production pipelines.",
    items: ["AI product development", "Data pipelines & analysis", "Custom dashboards"],
    cta: { label: "See AI & Data Services", href: "/services/ai-solutions" },
  },
  {
    title: "For Academics & Students",
    description:
      "Research support and academic assistance across data collection, analysis, and writing - built for rigor and deadlines.",
    items: ["Literature reviews", "Statistical analysis", "Thesis & paper support"],
    cta: { label: "See Academic Support", href: "/services/academic-support" },
  },
];

export default function AudienceSplit() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-8 md:grid-cols-2">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="rounded-lg border border-gray-100 p-8 flex flex-col"
          >
            <h2 className="text-2xl font-semibold text-navy">{audience.title}</h2>
            <p className="mt-3 text-gray-600 flex-1">{audience.description}</p>
            <ul className="mt-6 space-y-2">
              {audience.items.map((item) => (
                <li key={item} className="text-sm text-navy flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={audience.cta.href} variant="secondary">
                {audience.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
