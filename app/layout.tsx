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
  metadataBase: new URL("https://ericobackend.netlify.app"),
  title: {
    default: "Erick Jillo | Backend Software Engineer",
    template: "%s | Erick Jillo",
  },
  description: "Senior Backend Engineer specializing in distributed systems, Go, Python, Javascript, Typescript and high-performance APIs. View my technical portfolio and architecture case studies.",
  keywords: [
    "Erick Jillo",
    "Backend Engineer",
    "Software Engineer",
    "Go Developer",
    "Python Developer",
    "Javascript Developer",
    "Typescript Developer",
    "Distributed Systems",
    "Microservices",
    "API Design",
    "System Architecture"
  ],
  authors: [{ name: "Erick Jillo", url: "https://ericobackend.netlify.app" }],
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
    title: "Erick Jillo | Backend Software Engineer",
    description: "Backend engineering portfolio featuring system architecture diagrams and technical case studies.",
    url: "https://ericobackend.netlify.app",
    siteName: "Erick Jillo Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // Ensure you add an og-image.png to your public folder for best results
        width: 1200,
        height: 630,
        alt: "Erick Jillo - Backend Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Jillo | Backend Software Engineer",
    description: "Backend engineering portfolio featuring system architecture diagrams and technical case studies.",
    creator: "@erick_jillo", // Update with your actual handle
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
  "url": "https://ericobackend.netlify.app",
  "jobTitle": "Backend Software Engineer",
  "knowsAbout": ["Go", "Python", "Javascript", "Typescript", "Distributed Systems", "Cloud Computing", "API Design"],
  "sameAs": [
    "https://github.com/Ericode254",
    "https://linkedin.com/in/erickjillo",
    "https://twitter.com/erick_jillo"
  ],
  "description": "Senior Backend Engineer building robust APIs and distributed systems."
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
