import { STATS } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" style={{ padding: "120px max(48px, calc((100vw - 1152px)/2))", position: "relative", zIndex: 1 }}>
      <div className="grid-about">
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(139,92,246,0.7)", marginBottom: "20px" }}>
            001 / ABOUT ME
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#eeeef8", marginBottom: "32px" }}>
            Where healthcare
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 100 }}>meets technology</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontWeight: 300 }}>
            I'm a full-stack and mobile developer based in Trondheim, Norway. After years working as a medical secretary, I made a deliberate career shift into IT — earning a bachelor's degree in frontend and mobile development from Høyskolen Kristiania.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontWeight: 300 }}>
            My background in healthcare gives me a unique perspective: I understand what it means to work with systems that don't work well enough — and the real difference it makes when they do.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
            I'm especially drawn to <span style={{ color: "rgba(139,92,246,0.9)" }}>digitalisation</span> and <span style={{ color: "rgba(0,212,255,0.9)" }}>automation</span> — using tools like Microsoft Power Platform to eliminate repetitive work and build smarter processes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="bento-card glow-card" style={{ padding: "32px 28px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 700, lineHeight: 1, color: stat.color, marginBottom: "8px" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
