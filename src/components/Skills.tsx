import { useState, useEffect, useRef } from "react";
import { SKILLS, STACK, EXPERIENCE } from "../data/portfolio";

type Skill = (typeof SKILLS)[0];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>{skill.name}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: skill.color, opacity: 0.8 }}>{skill.level}%</span>
      </div>
      <div style={{ height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden" }}>
        {visible && (
          <div className="skill-bar-fill"
            style={{ height: "100%", background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`, borderRadius: "100px", animationDelay: `${index * 0.08}s`, "--target-w": `${skill.level}%` } as React.CSSProperties}
          />
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px max(48px, calc((100vw - 1152px)/2))", position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "64px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(244,63,94,0.7)", marginBottom: "20px" }}>
          003 / SKILLS
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#eeeef8" }}>
          Tools of
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 100 }}>my craft</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
        <div>
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: "28px" }}>
            FULL STACK
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {STACK.map((tech, i) => (
              <span key={tech} className="tag-chip"
                style={{ fontSize: "11px", padding: "6px 14px", cursor: "default", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { const el = e.target as HTMLElement; const colors = ["#8b5cf6", "#00d4ff", "#f43f5e", "#10b981"]; el.style.borderColor = colors[i % 4]; el.style.color = colors[i % 4]; }}
                onMouseLeave={(e) => { const el = e.target as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "rgba(255,255,255,0.5)"; }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ marginTop: "56px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: "28px" }}>
              EXPERIENCE
            </p>
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "3px", height: "48px", background: exp.color, borderRadius: "100px", opacity: 0.6, flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(255,255,255,0.85)", fontWeight: 500, marginBottom: "2px" }}>{exp.role}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{exp.company} · {exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
