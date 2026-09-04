import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What tech stack do you use?",
  "Tell me about your projects",
  "Are you open to work?",
  "What's your background?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Carolina's AI assistant. Ask me anything about her skills, projects, or background." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" style={{ padding: "120px max(48px, calc((100vw - 1152px)/2))", position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: "64px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", color: "rgba(16,185,129,0.7)", marginBottom: "20px" }}>
          004 / AI DEMO
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#eeeef8" }}>
          Ask my
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 100 }}>AI assistant</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
        {/* Left: info */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: "40px" }}>
            This chatbot is powered by the <span style={{ color: "rgba(16,185,129,0.9)" }}>Claude API</span>, secured via an{" "}
            <span style={{ color: "rgba(139,92,246,0.9)" }}>Azure Functions</span> proxy so API keys never touch the browser.
            Ask it anything about my experience, stack, or projects.
          </p>

          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>
              TRY ASKING
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} disabled={loading}
                  style={{ textAlign: "left", padding: "12px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", fontSize: "13px", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s, border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { if (!loading) { const el = e.currentTarget; el.style.background = "rgba(16,185,129,0.08)"; el.style.borderColor = "rgba(16,185,129,0.25)"; el.style.color = "rgba(255,255,255,0.85)"; } }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "48px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["Claude API", "Azure Functions", "React", "TypeScript"].map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>

        {/* Right: chat window */}
        <div className="bento-card" style={{ display: "flex", flexDirection: "column", height: "480px", overflow: "hidden" }}>
          {/* header */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} className="pulse-dot" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
              carolina-assistant · online
            </span>
          </div>

          {/* messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", scrollbarWidth: "none" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(0,212,255,0.25))"
                    : "rgba(255,255,255,0.05)",
                  border: msg.role === "user" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
                  fontWeight: 300,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "12px 18px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* input */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask something..."
              disabled={loading}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "10px 16px",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: input.trim() && !loading ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${input.trim() && !loading ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: input.trim() && !loading ? "#10b981" : "rgba(255,255,255,0.2)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
                fontSize: "16px",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
