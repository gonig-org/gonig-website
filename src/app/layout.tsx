import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  title: "Guild of Organists Nigeria | GONiG",
  description: "The collective voice of organists across Nigeria.",
  icons: {
    icon: "/images/gonig-logo.webp",
    apple: "/images/gonig-logo.webp",
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
