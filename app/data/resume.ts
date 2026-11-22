/**
 * Content for the "Resume" folder modal and the Experience section.
 * Keep this in sync with resume/resume.html (the source of the PDF).
 */

export const RESUME_PDF = "/Erick_Jillo_Resume.pdf";

export const PROFILE = {
  name: "Erick Jillo",
  title: "Backend Engineer · Python · Go · Node.js/TypeScript",
  location: "Kenya · EAT (UTC+3)",
  availability: "Open to full-time roles and freelance projects, remote or on-site",
  email: "jilloerick6@gmail.com",
  github: "https://github.com/Ericode254",
  linkedin: "https://www.linkedin.com/in/ericode254/",
};

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  stack: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Chief Technology Officer",
    company: "Ardena (Car Rental Marketplace & Ardena Business)",
    duration: "Feb 2026 – Present",
    stack: "Python, FastAPI, Go, PostgreSQL, Redis, Soroban",
    points: [
      "Lead the backend of a peer-to-peer car rental marketplace with 200+ users: bookings, host payouts, chauffeurs and KYC.",
      "Made M-Pesa Daraja the primary payment rail with Paystack and PayHero as automatic fallbacks.",
      "Shipped Ardena Business, a B2B SaaS for fleet operators, and a Soroban escrow contract for rental deposits in USDC.",
      "Building a Go rewrite of the API with race-enabled CI and Postgres integration tests.",
      "Secured the servers: SSH only over a self-hosted Headscale/Tailscale network with key-only login, and CI/CD deploys that join with short-lived keys and roll back on failure.",
    ],
  },
  {
    role: "Backend Software Engineer",
    company: "Korva Ventures (formerly Bunifu Capital)",
    duration: "Feb 2026 – Present",
    stack: "Python, FastAPI, gRPC/Protobuf, Paystack, Mailgun, Docker",
    points: [
      "Built an M-Pesa statement ingestion service: statements arrive by Mailgun inbound email from approved senders, and their transaction tables are extracted from the PDFs.",
      "Migrated the payment service to Paystack: fixed a critical HMAC webhook-signature bug, added transaction verification, custom payment plans and automatic customer creation.",
      "Laid the gRPC/Protobuf foundation for the services and built a shared gRPC logging service with a request-logging interceptor and log streaming.",
      "Moved service-to-service JWTs from HS256 to RS256 so each service verifies tokens with a public key.",
    ],
  },
];

export const SKILLS: { label: string; items: string }[] = [
  { label: "Languages", items: "Python, Go, TypeScript, JavaScript (Node.js), Rust, C, Bash" },
  {
    label: "Backend",
    items: "FastAPI, Express, NestJS, Flask, gRPC/Protobuf, REST, Socket.IO, SQLAlchemy, Prisma, ARQ/Celery",
  },
  { label: "Data", items: "PostgreSQL, MySQL, Redis, Convex" },
  { label: "Payments & Web3", items: "M-Pesa Daraja (STK Push), Paystack, PayHero, Stellar, Soroban, USDC" },
  {
    label: "Infra",
    items: "Docker, Nginx, GitHub Actions, Headscale/Tailscale, Prometheus, Linux/VPS admin, FreeRADIUS, MikroTik",
  },
];

export const SUMMARY =
  "Self-taught backend engineer and startup CTO who builds and runs production FinTech and marketplace platforms end to end. " +
  "I build in Python (FastAPI), Go and Node.js/TypeScript (Express, NestJS), integrate East African payment rails (M-Pesa Daraja, Paystack, PayHero), " +
  "write Soroban smart contracts on Stellar, and run the Linux servers everything lives on.";
