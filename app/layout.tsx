import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_AE",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.png`,
  areaServed: "Dubai, United Arab Emirates",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  founder: { "@type": "Person", name: "Rahul", jobTitle: "Performance & Rehabilitation Coach" },
  knowsAbout: ["Rehabilitation", "Strength & Conditioning", "Movement Assessment", "Sports Science"],
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <a href="#method" className="skip">Skip to content</a>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
