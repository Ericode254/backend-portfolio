import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

/**
 * Metadata configuration for the portfolio.
 * Defines the title, description, and social media branding.
 * Includes SEO optimizations like canonical URLs and OpenGraph images.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://erickjillo.ardena.co.ke"),
  title: {
    default: "Erick Jillo | Backend Software Engineer",
    template: "%s | Erick Jillo",
  },
  description: "Backend engineer and startup CTO in Kenya building FinTech and marketplace backends in Python (FastAPI) and Go, with M-Pesa, Paystack and Stellar payment integrations.",
  keywords: [
    "Erick Jillo",
    "Backend Engineer",
    "Software Engineer",
    "Go Developer",
    "Python Developer",
    "Javascript Developer",
    "Typescript Developer",
    "FastAPI",
    "M-Pesa Integration",
    "Paystack",
    "Stellar Soroban",
    "Kenya",
    "API Design",
    "System Architecture"
  ],
  authors: [{ name: "Erick Jillo", url: "https://erickjillo.ardena.co.ke" }],
  creator: "Erick Jillo",
  publisher: "Erick Jillo",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Erick Jillo | Backend Engineer",
    description: "CTO at Ardena. I build payment, marketplace and ISP billing backends in Python, Go and Node.js/TypeScript, with M-Pesa, Paystack and PayHero.",
    url: "https://erickjillo.ardena.co.ke",
    siteName: "Erick Jillo Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Erick Jillo, Backend Engineer: I build backends that move real money."
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Jillo | Backend Engineer",
    description: "CTO at Ardena. I build payment, marketplace and ISP billing backends in Python, Go and Node.js/TypeScript.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * JSON-LD Structured Data for a Person.
 * This helps search engines understand who you are, your job title, and your social links.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Erick Jillo",
  "url": "https://erickjillo.ardena.co.ke",
  "jobTitle": "Backend Software Engineer",
  "knowsAbout": ["Python", "FastAPI", "Go", "Node.js", "TypeScript", "Rust", "PostgreSQL", "M-Pesa", "Stellar", "API Design"],
  "sameAs": [
    "https://github.com/Ericode254",
    "https://www.linkedin.com/in/ericode254/"
  ],
  "description": "Backend engineer and startup CTO building FinTech and marketplace backends."
};

/**
 * Root Layout Component.
 * 
 * This is the top-level layout that wraps all pages.
 * - Injects Google Fonts (Geist, Patrick Hand).
 * - Handles theme initialization (preventing FOUC).
 * - Sets global body styles.
 * - Injects SEO Structured Data.
 * 
 * @param {Readonly<{children: React.ReactNode}>} props - Component props.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${patrickHand.variable} antialiased min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        {/* Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* SEO: JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
