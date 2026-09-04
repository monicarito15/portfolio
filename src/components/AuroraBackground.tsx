export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)", filter: "blur(60px)", animation: "aurora-1 12s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "30%", right: "-15%", width: "65%", height: "65%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,212,255,0.14) 0%, transparent 70%)", filter: "blur(70px)", animation: "aurora-2 15s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "20%", width: "55%", height: "55%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(244,63,94,0.1) 0%, transparent 70%)", filter: "blur(80px)", animation: "aurora-3 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)" }} />
    </div>
  );
}
