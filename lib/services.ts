import {
  Lightbulb,
  FlaskConical,
  BarChart3,
  Handshake,
  BrainCircuit,
  LineChart,
  GraduationCap,
  UserSearch,
  FileCheck2,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "general" | "business" | "academic";

export type Service = {
  /** Unique key, also used as the URL slug at /services/[slug]. */
  slug: string;
  title: string;
  /** Shorter alias for space-constrained contexts (e.g. the hero typewriter). */
  shortLabel?: string;
  description: string;
  icon: LucideIcon;
  categories: ServiceCategory[];
};

/**
 * Single canonical list of every service JosBong offers. Every surface that
 * displays services (Hero, homepage "What we do", the Services page,
 * AudienceSplit, Footer, the quote form) reads from this array instead of
 * hardcoding its own copy, so a service only needs to be added/edited in one
 * place. Every entry has a slug and resolves to a detail page at
 * /services/[slug] - content-backed services (see content/services/*.mdx)
 * render their full MDX page; the rest render a simpler page generated
 * directly from this data (see app/services/[slug]/page.tsx).
 */
export const services: Service[] = [
  {
    slug: "ideation",
    title: "Ideation",
    description:
      "Structured brainstorming and concept development to turn a rough idea into something you can act on.",
    icon: Lightbulb,
    categories: ["general", "business"],
  },
  {
    slug: "research",
    title: "Research",
    description:
      "Structured, well-sourced research delivered on your timeline - from literature reviews to market and policy analysis.",
    icon: FlaskConical,
    categories: ["general"],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    shortLabel: "Analysis",
    description:
      "Turn raw data into decisions - cleaning, analysis, and dashboards that hold up to scrutiny.",
    icon: BarChart3,
    categories: ["general"],
  },
  {
    slug: "consultancy",
    title: "Consultancy",
    description:
      "Expert guidance and hands-on advice to help you make the right call, faster.",
    icon: Handshake,
    categories: ["general", "business"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortLabel: "AI",
    description:
      "From prototype to production - AI features and applications built around your data and workflow.",
    icon: BrainCircuit,
    categories: ["general"],
  },
  {
    slug: "market-research-and-business-research",
    title: "Market Research and Business Research",
    description:
      "In-depth market and business research to validate opportunities and de-risk decisions before you commit resources.",
    icon: LineChart,
    categories: ["business"],
  },
  {
    slug: "academic-support",
    title: "Academic Support",
    description:
      "Hands-on help with papers, theses, and coursework - from data analysis to structuring an argument.",
    icon: GraduationCap,
    categories: ["academic"],
  },
  {
    slug: "research-assistant-sourcing",
    title: "Research Assistant Sourcing",
    description:
      "Connecting you with vetted research assistants to help move your project forward.",
    icon: UserSearch,
    categories: ["academic"],
  },
  {
    slug: "thesis-proofreading",
    title: "Thesis Proofreading",
    description:
      "Careful proofreading and structural feedback on your thesis - without rewriting your argument for you.",
    icon: FileCheck2,
    categories: ["academic"],
  },
  {
    slug: "data-collection",
    title: "Data Collection",
    description:
      "Fieldwork and data collection support so you spend less time gathering data and more time analyzing it.",
    icon: ClipboardList,
    categories: ["academic"],
  },
];

export function getServicesByCategory(category: ServiceCategory) {
  return services.filter((service) => service.categories.includes(category));
}

export function getServiceListing(slug: string) {
  return services.find((service) => service.slug === slug);
}
