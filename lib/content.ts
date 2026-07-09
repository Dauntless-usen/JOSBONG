import { services, work, insights } from "#velite";
import type { Project } from "#velite";

export function getAllServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export function getAllWork(category?: Project["category"]) {
  const projects = [...work].sort(byDateDesc);
  if (!category) return projects;
  return projects.filter((project) => project.category === category);
}

export function getWorkBySlug(slug: string) {
  return work.find((project) => project.slug === slug);
}

export function getFeaturedWork(limit = 3) {
  return [...work]
    .filter((project) => project.featured)
    .sort(byDateDesc)
    .slice(0, limit);
}

export function getAllInsights() {
  return [...insights].sort(byDateDesc);
}

export function getInsightBySlug(slug: string) {
  return insights.find((article) => article.slug === slug);
}
