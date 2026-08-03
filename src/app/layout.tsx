import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_ABBREVIATION, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

/*
 * Font setup — three typefaces, each exposed as a CSS variable.
 *
 * - Inter:              Default body / fallback font
 * - Playfair Display:   Serif headings (h1, h2) via .font-heading
 * - Montserrat:         Navigation, labels, body prose via .font-body / .font-label / .font-nav
 *
 * Variables are applied to <body> so every descendant can reference them.
 * See globals.css for the utility classes that consume these variables.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

/* ---------- SEO metadata ---------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_ABBREVIATION}`,
    template: `%s | ${SITE_ABBREVIATION}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/images/gonig-logo.webp",
    apple: "/images/gonig-logo.webp",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_ABBREVIATION}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/gonig-logo.webp", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | ${SITE_ABBREVIATION}`,
    description: SITE_DESCRIPTION,
    images: ["/images/gonig-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#3D0C0C",
};

/* ---------- Root layout ---------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
