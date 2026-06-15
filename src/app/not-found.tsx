import InDevelopment from "@/components/shared/InDevelopment";

/**
 * Custom 404 handler for the App Router.
 *
 * Since all unmatched routes on this site are planned pages that are
 * simply not yet built, we show the InDevelopment screen rather than
 * a generic error page. When a specific page is ready, its own
 * page.tsx file will take over and this will no longer be reached.
 */

export default function NotFound() {
  return <InDevelopment />;
}
