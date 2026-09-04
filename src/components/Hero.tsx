export default function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 max(48px, calc((100vw - 1152px)/2))", position: "relative", zIndex: 1 }}>
      <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px", animationDelay: "0.1s" }}>
        <span className="pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          OPEN TO WORK · TRONDHEIM, NORWAY
        </span>
      </div>

      <div className="fade-up" style={{ animationDelay: "0.2s", marginBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 128px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.9)", display: "block", fontStyle: "italic" }}>
          Hi, I'm
        </span>
      </div>

      <div className="fade-up" style={{ animationDelay: "0.35s", marginBottom: "32px" }}>
        <h1 className="gradient-name" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 128px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.04em", cursor: "default", display: "block" }}>
          Carolina Mera
        </h1>
      </div>

      <div className="fade-up" style={{ animationDelay: "0.5s", display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(139,92,246,0.8)", letterSpacing: "0.1em" }}>FRONTEND</span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "18px" }}>×</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(0,212,255,0.8)", letterSpacing: "0.1em" }}>MOBILE</span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "18px" }}>×</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(244,63,94,0.8)", letterSpacing: "0.1em" }}>DEVELOPER</span>
      </div>

      <p className="fade-up" style={{ animationDelay: "0.6s", fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.42)", maxWidth: "480px", marginBottom: "56px", fontWeight: 300 }}>
        I build digital solutions that bridge technology and human needs — from iOS apps to web platforms and AI integrations.
      </p>

      <div className="fade-up" style={{ animationDelay: "0.7s", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 32px", borderRadius: "100px", background: "linear-gradient(135deg, #8b5cf6, #00d4ff)", border: "none", color: "#fff", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s, transform 0.2s" }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
        >
          View projects
        </button>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 32px", borderRadius: "100px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 400, cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s, transform 0.2s" }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,1)"; (e.target as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}
        >
          Contact me
        </button>
      </div>

      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.3, animation: "float 3s ease-in-out infinite" }}>
        <div style={{ width: "24px", height: "40px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "100px", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
          <div style={{ width: "3px", height: "8px", background: "rgba(255,255,255,0.6)", borderRadius: "100px", animation: "float 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
