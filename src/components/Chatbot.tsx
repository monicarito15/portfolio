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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Chatbot({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Carolina's AI assistant. Ask me anything about her skills, projects, or background." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
    <>
      {/* backdrop blur on mobile */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, zIndex: 98, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
          className="md:hidden"
        />
      )}

      {/* floating panel */}
      <div style={{
        position: "fixed",
        top: "80px",
        right: open ? "24px" : "-420px",
        width: "min(390px, calc(100vw - 32px))",
        height: "calc(100vh - 104px)",
        zIndex: 99,
        transition: "right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        background: "rgba(10, 10, 20, 0.92)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        backdropFilter: "blur(24px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.1)",
        overflow: "hidden",
      }}>
        {/* header */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} className="pulse-dot" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
              carolina-assistant
            </span>
          </div>
          <button onClick={onClose}
            style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "background 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
          >
            ✕
          </button>
        </div>

        {/* suggestions (only when just the initial message) */}
        {messages.length === 1 && (
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", flexWrap: "wrap", gap: "6px", flexShrink: 0 }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={loading}
                style={{ padding: "6px 12px", borderRadius: "100px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontSize: "11px", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "14px", scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(0,212,255,0.3))"
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
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "10px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", flexShrink: 0 }}>
          <input
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
              padding: "10px 14px",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.45)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          />
          <button onClick={() => send(input)} disabled={loading || !input.trim()}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: input.trim() && !loading ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${input.trim() && !loading ? "rgba(16,185,129,0.45)" : "rgba(255,255,255,0.08)"}`,
              color: input.trim() && !loading ? "#10b981" : "rgba(255,255,255,0.2)",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
              fontSize: "16px",
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </>
  );
}
