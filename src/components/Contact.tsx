import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "carolinamera@carolina-mera.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: "120px max(48px, calc((100vw - 1152px)/2)) 80px", position: "relative", zIndex: 1 }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(16,185,129,0.7)", marginBottom: "20px" }}>
        005 / CONTACT
      </p>

      <div className="bento-card" style={{ padding: "clamp(48px, 8vw, 96px)", textAlign: "center", background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 70%), rgba(13,13,26,0.7)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "80%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#eeeef8", marginBottom: "16px", position: "relative" }}>
          Let's work
          <br />
          <span className="gradient-name" style={{ fontStyle: "italic", fontWeight: 700 }}>together</span>
        </h2>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(255,255,255,0.38)", marginBottom: "48px", fontWeight: 300, position: "relative" }}>
          Open to new opportunities. Feel free to reach out.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", position: "relative" }}>
          <button onClick={copyEmail}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 28px", borderRadius: "100px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)", fontSize: "13px", cursor: "pointer", letterSpacing: "0.04em", transition: "background 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            {copied ? "✓ Copied!" : email}
          </button>

          {[
            { label: "GitHub", url: "https://github.com/monicarito15" },
            { label: "LinkedIn", url: "https://linkedin.com/in/carolina-mera-b43219243" },
          ].map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer"
              style={{ padding: "16px 24px", borderRadius: "100px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 400, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "64px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "32px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
          © 2026 · CAROLINA MERA
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
          REACT · TYPESCRIPT · AZURE
        </span>
      </div>
    </section>
  );
}
