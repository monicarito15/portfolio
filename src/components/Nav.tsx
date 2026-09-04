import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/portfolio";

type Props = {
  onAskAI: () => void;
  chatOpen: boolean;
};

export default function Nav({ onAskAI, chatOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (label: string) => {
    const map: Record<string, string> = {
      About: "about", Projects: "projects", Skills: "skills", Contact: "contact",
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

          {/* Ask AI button */}
          <button onClick={onAskAI}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 14px",
              borderRadius: "100px",
              background: chatOpen ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.08)",
              border: `1px solid ${chatOpen ? "rgba(16,185,129,0.5)" : "rgba(16,185,129,0.25)"}`,
              color: chatOpen ? "#10b981" : "rgba(16,185,129,0.8)",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.18)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)"; e.currentTarget.style.color = "#10b981"; }}
            onMouseLeave={(e) => { if (!chatOpen) { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; e.currentTarget.style.color = "rgba(16,185,129,0.8)"; } }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} className="pulse-dot" />
            Ask AI
          </button>
        </div>
      </div>
    </nav>
  );
}
