import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllEventSlugs } from "@/sanity/lib/queries";

/**
 * Static routes that exist today. Add a new entry here when a new page
 * ships — the /studio Sanity Studio route is intentionally excluded, it
 * has no reason to be indexed.
 */
const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/executives", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/advisers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/trustees", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/zones", changeFrequency: "monthly", priority: 0.6 },
  { path: "/membership", changeFrequency: "monthly", priority: 0.8 },
  { path: "/membership/apply", changeFrequency: "monthly", priority: 0.7 },
  { path: "/membership/renew", changeFrequency: "monthly", priority: 0.5 },
  { path: "/membership/directory", changeFrequency: "weekly", priority: 0.6 },
  { path: "/education/programmes", changeFrequency: "monthly", priority: 0.6 },
  { path: "/education/mentorship", changeFrequency: "monthly", priority: 0.6 },
  { path: "/education/training", changeFrequency: "monthly", priority: 0.6 },
  { path: "/education/certification", changeFrequency: "monthly", priority: 0.6 },
  { path: "/education/workshops", changeFrequency: "monthly", priority: 0.6 },
  { path: "/events/forthcoming", changeFrequency: "weekly", priority: 0.8 },
  { path: "/events/past", changeFrequency: "monthly", priority: 0.5 },
  { path: "/events/calendar", changeFrequency: "monthly", priority: 0.5 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const events = await getAllEventSlugs();
  const eventEntries: MetadataRoute.Sitemap = events
    .filter((event) => event.slug)
    .map((event) => ({
      url: `${SITE_URL}/events/${event.slug}`,
      lastModified: event.date ? new Date(event.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...staticEntries, ...eventEntries];
}
