/**
 * Project data for the portfolio.
 *
 * Rules for links:
 * - Only link `source` to PUBLIC repositories. Private repos 404 for visitors,
 *   so use `privateNote` instead and offer a walkthrough.
 * - Keep `live` (a running product) separate from `source` (the code).
 */

export type LinkKind = "live" | "source" | "store" | "docs";

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line: what it is and who it is for. */
  tagline: string;
  /** Short status chip, e.g. "In production". */
  status: string;
  /** 2–4 bullets about engineering decisions and results. */
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  /** How a visitor can try it themselves. */
  tryIt?: { text: string; code?: string };
  /** Shown when the code is private. */
  privateNote?: string;
  /** Path under /public to an architecture diagram. */
  diagram?: string;
  /** Screenshot or demo GIF shown at the top of the card. */
  media?: { src: string; alt: string };
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "ardena",
    name: "Ardena: car rental marketplace & B2B SaaS",
    tagline:
      "Peer-to-peer car rental platform in Kenya, plus Ardena Business for fleet operators.",
    status: "In production · 200+ users",
    highlights: [
      "Lead the FastAPI/PostgreSQL backend: bookings, host payouts, chauffeurs and Dojah KYC with HMAC-verified webhooks.",
      "M-Pesa Daraja as the primary payment rail, with Paystack and PayHero as automatic fallbacks (STK Push for M-Pesa and Airtel Money).",
      "Moved background jobs into a standalone ARQ/Redis worker; CI/CD with a staging environment and automatic rollback.",
      "Ardena Business: invoicing, staff invites, a 30-day trial with payment wall, and marketplace visibility.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "ARQ", "Alembic", "M-Pesa Daraja", "Paystack"],
    links: [
      { kind: "live", label: "ardena.co.ke", href: "https://ardena.co.ke" },
      {
        kind: "store",
        label: "Android app",
        href: "https://play.google.com/store/apps/details?id=com.ardena.client",
      },
    ],
    privateNote: "Company code is private. Happy to walk through the architecture on a call.",
    featured: true,
  },
  {
    slug: "ardena-go",
    name: "Ardena API rewrite in Go",
    tagline:
      "Incremental rewrite of the Python API in Go, checked route by route against the live Python responses.",
    status: "In progress · 54 test files",
    highlights: [
      "Standard-library net/http with graceful shutdown, structured logging, CORS, gzip and Host validation middleware.",
      "pgx connection pooling with sqlc-generated queries; JWT login/refresh for client, host and B2B accounts, plus Google/Apple sign-in.",
      "Prometheus metrics and readiness probes; 54 test files, race-enabled tests in CI, Postgres integration tests via Testcontainers.",
      "Wrote the rewrite design doc and shipped it in reviewable chunks: auth, the public car catalogue, profiles, wishlists and notification settings.",
    ],
    stack: ["Go", "PostgreSQL", "pgx", "sqlc", "JWT", "Prometheus", "Testcontainers"],
    links: [],
    privateNote: "Private repository. Code samples available on request.",
    featured: true,
  },
  {
    slug: "deposit-escrow",
    name: "Ardena Deposit Escrow (Stellar)",
    tagline:
      "Soroban smart contracts that hold rental security deposits and damage-waiver funds in USDC on Stellar.",
    status: "Open source · Live on testnet",
    highlights: [
      "Escrow state machine (lock → release / refund / dispute → resolve) where locked money can only go back to the renter or, after a dispute decision, to the business.",
      "Anyone can trigger the release once the window passes, so renters get refunds without depending on Ardena's backend.",
      "Single-use escrow ids block replayed locks; every state change emits an event that the backend reconciles.",
      "Built under the Stellar Instawards programme, with CI and smoke tests that run every path with real testnet USDC.",
    ],
    stack: ["Rust", "Soroban", "Stellar", "USDC", "GitHub Actions"],
    links: [
      {
        kind: "source",
        label: "Source",
        href: "https://github.com/opa-production/ardena-deposit-escrow",
      },
      {
        kind: "live",
        label: "Contract on testnet",
        href: "https://stellar.expert/explorer/testnet/contract/CA2INW4KOK3JF3S6UYDFIUWJQ677SEQM2WFAFSHZYS3YPKULYWVJ6BD6",
      },
    ],
    tryIt: {
      text: "Clone the repo and run the full escrow flow against testnet:",
      code: "scripts/deploy.sh testnet && scripts/smoke_testnet.sh",
    },
    featured: true,
  },
  {
    slug: "isp-billing",
    name: "ISP Billing & Hotspot Platform",
    tagline:
      "Billing and access control for a small ISP: PPPoE subscribers and pay-as-you-go Wi-Fi on MikroTik routers.",
    status: "Freelance · In production · 30+ subscribers",
    highlights: [
      "FreeRADIUS reads plans and expiry straight from the billing database, so suspensions are enforced at the router.",
      "Captive portal where customers pay by M-Pesa and get connected automatically; printable hotspot vouchers.",
      "M-Pesa callback reconciliation to stop double-crediting; nightly off-server backups with restore drills.",
      "Whole stack runs on one VPS with Docker Compose behind Nginx, with closed ports and rotated secrets.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "MySQL", "FreeRADIUS", "MikroTik", "React", "Docker"],
    links: [],
    privateNote: "Client project, so the code is private. A live demo of the admin console is available on request.",
    featured: true,
  },
  {
    slug: "vendas",
    name: "Vendas: campus marketplace",
    tagline:
      "A marketplace where verified university students buy and sell to each other, launched at Egerton University.",
    status: "Live on Android · 40+ students",
    highlights: [
      "Node.js/Express API with Prisma and PostgreSQL; real-time buyer–seller chat with Socket.IO.",
      "Paystack seller payouts and buyer refunds, Firebase push notifications and Google sign-in.",
      "React admin dashboard with moderation, real-time support tickets and AI safety checks on listings.",
      "Jest test suite and semantic-release versioning in CI.",
    ],
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "Socket.IO", "React Native", "Paystack"],
    links: [
      { kind: "live", label: "vendas.co.ke", href: "https://vendas.co.ke" },
      {
        kind: "store",
        label: "Get it on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.chapchap.vendas",
      },
    ],
    privateNote: "The API and admin dashboard code is private.",
    diagram: "/diagrams/Unimarket2.png",
    featured: true,
  },

  // ---- More projects (compact cards) ----
  {
    slug: "swift-deliver",
    name: "Swift Deliver API",
    tagline: "Backend for a delivery app, built with NestJS and TypeScript.",
    status: "Open source · In progress",
    highlights: [
      "JWT + Passport auth with DTO validation and role guards; Prisma data layer.",
      "Notifications service that sends email and pushes real-time updates over a Socket.IO gateway.",
    ],
    stack: ["TypeScript", "NestJS", "Prisma", "Socket.IO", "JWT"],
    links: [{ kind: "source", label: "Source", href: "https://github.com/Swift-Deliver/swift-deliver-backend" }],
    featured: false,
  },
  {
    slug: "passtui",
    name: "PassTUI",
    tagline: "A keyboard-driven terminal UI for the pass password store, written in Rust.",
    status: "Open source",
    highlights: [
      "Works on top of the standard GPG-encrypted pass store: no new vault format, no cloud account, nothing to migrate.",
      "Master password stored only as a salted Argon2id hash, auto-lock when idle, and a clipboard that clears itself.",
      "TOTP codes, website recovery codes, a password generator, and history that can restore deleted entries from Git.",
      "Browser autofill through Browserpass; CI with CodeQL scanning and attested release builds.",
    ],
    stack: ["Rust", "Ratatui", "GnuPG", "Argon2id"],
    links: [{ kind: "source", label: "Source", href: "https://github.com/Ericode254/PasswordManager" }],
    tryIt: {
      text: "Install it with Cargo:",
      code: "cargo install --locked --git https://github.com/Ericode254/PasswordManager passtui",
    },
    media: {
      src: "/demos/passtui.gif",
      alt: "PassTUI demo: unlocking, searching, revealing a password, TOTP code, recovery codes, adding an entry, history and the quick picker",
    },
    featured: true,
  },
  {
    slug: "fluxnote",
    name: "FluxNote",
    tagline: "Real-time collaborative markdown editor with live cursors and presence.",
    status: "Open source · Live",
    highlights: ["Convex for real-time sync and auth; block-based editing with BlockNote."],
    stack: ["TypeScript", "React", "Convex"],
    links: [
      { kind: "live", label: "Live demo", href: "https://fluxnot3.netlify.app/" },
      { kind: "source", label: "Source", href: "https://github.com/Ericode254/FluxNote" },
    ],
    featured: false,
  },
  {
    slug: "terminal-blog",
    name: "Terminal & Coffee blog",
    tagline: "A blog I publish to from the terminal: Markdown files pushed by a Bash script to Convex over HTTP.",
    status: "Live",
    highlights: ["Write a .md file, run one command, and the post is live in production."],
    stack: ["Bash", "Convex", "React"],
    links: [{ kind: "live", label: "Read the blog", href: "https://terminalandcoffee.netlify.app/" }],
    diagram: "/diagrams/terminalandcoffee.png",
    featured: false,
  },
  {
    slug: "chama360",
    name: "Chama360",
    tagline: "Contribution and investment tracking for chamas (savings groups common in East Africa).",
    status: "Live",
    highlights: ["Manages contributions and investments, with PayHero for mobile-money payments."],
    stack: ["TypeScript", "React", "Convex", "PayHero"],
    links: [{ kind: "live", label: "Live demo", href: "https://chama360.netlify.app/" }],
    diagram: "/diagrams/chama360.png",
    featured: false,
  },
  {
    slug: "pydown",
    name: "PyDown",
    tagline: "Search, stream and download YouTube videos from the terminal.",
    status: "Open source",
    highlights: [
      "Fuzzy-pick YouTube results with fzf, then download video or audio, or stream in mpv or VLC.",
      "Built on yt-dlp; remembers past downloads and falls back cleanly when subtitles fail.",
    ],
    stack: ["Python", "yt-dlp", "fzf", "mpv"],
    links: [{ kind: "source", label: "Source", href: "https://github.com/Ericode254/PyDown" }],
    tryIt: { text: "Run it:", code: "uv sync && uv run pyplayer.py" },
    media: {
      src: "/demos/pydown.gif",
      alt: "PyDown demo: searching YouTube, picking a result with fzf, downloading a video, then downloading audio from a pasted link",
    },
    diagram: "/diagrams/pydown.png",
    featured: false,
  },
  {
    slug: "code-constellation",
    name: "Code Constellation",
    tagline: "VS Code extension that shows your project as an interactive, Obsidian-style graph: files are stars, imports are the links between them.",
    status: "Published on VS Code Marketplace · 33 installs",
    highlights: [
      "Force-directed graph built with D3: drag, zoom, search, and click a node to open the file.",
      "Hover a file to highlight its neighbours and preview its first lines; respects .gitignore.",
      "Understands TypeScript, JavaScript, Python, Go, Java, Rust, PHP and more.",
    ],
    stack: ["TypeScript", "VS Code API", "D3", "force-graph"],
    links: [
      {
        kind: "store",
        label: "VS Code Marketplace",
        href: "https://marketplace.visualstudio.com/items?itemName=code-constellation.code-constellation",
      },
      { kind: "source", label: "Source", href: "https://github.com/Ericode254/CodeConstellation" },
    ],
    tryIt: { text: "Install from the terminal:", code: "code --install-extension code-constellation.code-constellation" },
    media: { src: "/demos/code-constellation.png", alt: "Code Constellation banner: files drawn as connected stars" },
    featured: false,
  },
  {
    slug: "express-scaffold",
    name: "Express API scaffold",
    tagline: "A Bash script that generates a production-ready Express.js project structure.",
    status: "Open source",
    highlights: ["One command sets up the folder layout for a new API."],
    stack: ["Bash", "Express.js"],
    links: [{ kind: "source", label: "Source", href: "https://github.com/Ericode254/BashScripts" }],
    diagram: "/diagrams/expressjsProjectStructure.png",
    featured: false,
  },
];
