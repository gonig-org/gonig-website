import Link from "next/link";

/**
 * Breadcrumb navigation used on interior pages.
 *
 * @example
 *   <Breadcrumb items={[{ label: "About", href: "/about" }, { label: "Overview" }]} />
 *
 * - Items WITH an `href` render as clickable links (muted opacity).
 * - The LAST item is treated as the current page (no link, full opacity).
 * - Accepts a `variant` prop to switch between dark-on-light and light-on-dark
 *   colour schemes without duplicating the component.
 */

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "dark" = light text on dark bg (about page). "light" = dark text on light bg (legal pages). */
  variant?: "dark" | "light";
};

export default function Breadcrumb({ items, variant = "dark" }: BreadcrumbProps) {
  const color = variant === "dark" ? "var(--color-nav-text)" : "var(--color-text-dark)";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-3" style={{ marginBottom: "40px" }}>
      {/* Always start with "Home" */}
      <Link
        href="/"
        className="font-label"
        style={{ color, opacity: 0.4, fontSize: "11px" }}
      >
        Home
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-3">
            {/* Separator slash */}
            <span style={{ color, opacity: 0.2, fontSize: "11px" }}>/</span>

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="font-label"
                style={{ color, opacity: 0.4, fontSize: "11px" }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="font-label"
                style={{ color, opacity: isLast ? 0.85 : 0.4, fontSize: "11px" }}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
