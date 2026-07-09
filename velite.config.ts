import { defineConfig, defineCollection, s } from "velite";

const categoryEnum = s.enum(["research", "ai", "data", "academic"]);

const services = defineCollection({
  name: "Service",
  pattern: "services/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("services"),
      summary: s.string(),
      deliverables: s.array(s.string()),
      processSteps: s.array(s.string()),
      relatedWorkCategory: categoryEnum,
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/services/${data.slug}` })),
});

const work = defineCollection({
  name: "Project",
  pattern: "work/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("work"),
      category: categoryEnum,
      tools: s.array(s.string()),
      client: s.string().optional(),
      outcome: s.string(),
      date: s.isodate(),
      coverImage: s.string(),
      featured: s.boolean().default(false),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/work/${data.slug}` })),
});

const insights = defineCollection({
  name: "Article",
  pattern: "insights/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("insights"),
      category: s.string(),
      date: s.isodate(),
      excerpt: s.string(),
      coverImage: s.string(),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, permalink: `/insights/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { services, work, insights },
});
