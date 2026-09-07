export const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

export const PROJECTS = [
  {
    id: 1,
    title: "BomKalkulator",
    subtitle: "iOS · Mobile",
    description:
      "iOS app for route calculation and toll estimation, published on the App Store. Fetches live road data from the Norwegian Public Road Administration (NVDB) API and visualizes it with MapKit.",
    tags: ["Swift", "MapKit", "NVDB API", "App Store"],
    accent: "#00d4ff",
    year: "2025",
  },
  {
    id: 2,
    title: "Sensor Dashboard",
    subtitle: "Frontend · React",
    description:
      "Real-time sensor monitoring dashboard built for Elivate Group as a bachelor project. Focused on performance optimization and REST API integration.",
    tags: ["React", "TypeScript", "REST API", "Charts"],
    accent: "#8b5cf6",
    year: "2026",
  },
  {
    id: 3,
    title: "Video Portal",
    subtitle: "Full-Stack · Azure",
    description:
      "B2C video streaming portal with Google OAuth, Stripe payments and Azure Blob Storage. Automated deployment via GitHub Actions CI/CD.",
    tags: ["React", "TypeScript", "Azure", "Supabase", "Stripe"],
    accent: "#f43f5e",
    year: "2026",
  },
  {
    id: 4,
    title: "AI Chatbot",
    subtitle: "AI · Full-Stack",
    description:
      "Conversational AI chatbot built with the Claude API, secured via Azure Functions to protect API keys. Designed as a demo for internal organizational use cases.",
    tags: ["React", "Claude API", "Azure Functions", "TypeScript"],
    accent: "#10b981",
    year: "2026",
  },
];

export const SKILLS = [
  { name: "React / TypeScript", level: 88, color: "#00d4ff" },
  { name: "JavaScript / HTML / CSS", level: 90, color: "#8b5cf6" },
  { name: "Swift / iOS", level: 78, color: "#f43f5e" },
  { name: "Kotlin / Android", level: 72, color: "#10b981" },
  { name: "Azure / CI/CD", level: 75, color: "#8b5cf6" },
  { name: "Microsoft Power Platform", level: 76, color: "#00d4ff" },
  { name: "UX / Figma", level: 80, color: "#f43f5e" },
  { name: "SQL (MySQL / Postgres)", level: 74, color: "#10b981" },
];

export const STACK = [
  "React", "TypeScript", "Swift", "Kotlin", "JavaScript",
  "HTML", "CSS", "Azure", "GitHub Actions", "Supabase",
  "Figma", "Java", "C#", "MySQL", "Postgres",
  "Power Automate", "Power Apps", "Power Platform",
];

export const EXPERIENCE = [
  { role: "Full-Stack & Mobile Developer", company: "Freelance / Projects", period: "2024—present", color: "#8b5cf6" },
  { role: "Bachelor Project — Elivate Group", company: "Høyskolen Kristiania", period: "2026", color: "#00d4ff" },
  { role: "Medical Secretary", company: "Fokus Legesenter", period: "2020—2023", color: "#f43f5e" },
];

export const STATS = [
  { value: "3+", label: "Projects published", color: "#8b5cf6" },
  { value: "13+", label: "Years of professional experience", color: "#00d4ff" },
  { value: "3", label: "Languages spoken", color: "#f43f5e" },
  { value: "2026", label: "Bachelor degree", color: "#10b981" },
];
