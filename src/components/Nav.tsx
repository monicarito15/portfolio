import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/portfolio";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (label: string) => {
    const map: Record<string, string> = {
      About: "about", Projects: "projects", Skills: "skills", Demo: "demo", Contact: "contact",
    };
    document.getElementById(map[label])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-glass" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
          &lt;carolina-mera /&gt;
        </span>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
