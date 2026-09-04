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

function RobotIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="3" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 18h6" />
      <path d="M12 3v1" />
    </svg>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Carolina's AI assistant. Ask me anything about her skills, projects, or background." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

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
    <>
      {/* floating robot button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 100,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(0,180,140,0.9))",
          border: open ? "1px solid rgba(255,255,255,0.2)" : "none",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open ? "none" : "0 8px 32px rgba(16,185,129,0.4)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: open ? "rotate(90deg) scale(0.9)" : "rotate(0deg) scale(1)",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.boxShadow = "0 12px 40px rgba(16,185,129,0.6)"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.boxShadow = "0 8px 32px rgba(16,185,129,0.4)"; }}
        aria-label={open ? "Close chat" : "Open AI assistant"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <RobotIcon />
        )}
      </button>

      {/* chat panel */}
      <div style={{
        position: "fixed",
        bottom: "96px",
        right: open ? "28px" : "-420px",
        width: "min(380px, calc(100vw - 32px))",
        height: "min(520px, calc(100vh - 130px))",
        zIndex: 99,
        transition: "right 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        opacity: open ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        background: "rgba(10, 10, 20, 0.94)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        backdropFilter: "blur(24px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.08)",
        overflow: "hidden",
        pointerEvents: open ? "all" : "none",
      }}>
        {/* header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} className="pulse-dot" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
            carolina-assistant · online
          </span>
        </div>

        {/* suggestions */}
        {messages.length === 1 && (
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", gap: "6px", flexShrink: 0 }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={loading}
                style={{ padding: "5px 11px", borderRadius: "100px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontSize: "11px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 14px", display: "flex", flexDirection: "column", gap: "12px", scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(0,212,255,0.28))"
                  : "rgba(255,255,255,0.05)",
                border: msg.role === "user" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.07)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                lineHeight: 1.6,
                color: msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)",
                fontWeight: 300,
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex" }}>
              <div style={{ padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", flexShrink: 0 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask something..."
            disabled={loading}
            style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "9px 14px", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)", fontSize: "13px", outline: "none", transition: "border-color 0.2s" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.45)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          />
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            style={{ width: "38px", height: "38px", borderRadius: "10px", background: input.trim() && !loading ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${input.trim() && !loading ? "rgba(16,185,129,0.45)" : "rgba(255,255,255,0.08)"}`, color: input.trim() && !loading ? "#10b981" : "rgba(255,255,255,0.2)", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", fontSize: "16px" }}
          >
            ↑
          </button>
        </div>
      </div>
    </>
  );
}
