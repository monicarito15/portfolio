import { useState } from "react";
import { PROJECTS, type Project } from "../data/portfolio";

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="bento-card glow-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: "36px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "default", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "-50%", right: "-30%", width: "60%", height: "80%", borderRadius: "50%", background: `radial-gradient(ellipse, ${project.accent}18 0%, transparent 70%)`, filter: "blur(30px)", opacity: hovered ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: "none" }} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: project.accent, opacity: 0.8 }}>
            {project.subtitle.toUpperCase()}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
            {project.year}
          </span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#eeeef8", marginBottom: "16px" }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>
          {project.description}
        </p>
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
        {project.url && (
          <a href={project.url} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "20px", fontFamily: "var(--font-mono)", fontSize: "11px", color: project.accent, opacity: 0.8, textDecoration: "none", letterSpacing: "0.06em", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.8"; }}
          >
            ↗ {project.urlLabel}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "120px max(48px, calc((100vw - 1152px)/2))", position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "64px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(0,212,255,0.7)", marginBottom: "20px" }}>
          002 / PROJECTS
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#eeeef8" }}>
          Work that
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 100 }}>speaks for itself</span>
        </h2>
      </div>

      <div className="grid-projects">
        <div style={{ gridColumn: "1 / 8", gridRow: "1" }}><ProjectCard project={PROJECTS[0]} /></div>
        <div style={{ gridColumn: "8 / 13", gridRow: "1" }}><ProjectCard project={PROJECTS[1]} /></div>
        <div style={{ gridColumn: "1 / 5", gridRow: "2" }}><ProjectCard project={PROJECTS[2]} /></div>
        <div style={{ gridColumn: "5 / 13", gridRow: "2" }}><ProjectCard project={PROJECTS[3]} /></div>
      </div>
    </section>
  );
}
