import { useRef, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

/* ─── Scroll-in animation hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`fadein ${visible ? "fadein--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ─── Data ─── */
const TECH_LAYERS = [
  {
    layer: "Frontend",
    tag: "User Interface",
    accent: "#2563eb",
    icon: "🖥️",
    desc: "Modern UI built with component-driven architecture, responsive design, and smooth animations for a seamless user experience.",
    techs: [
       { name: "HTML5", icon: "🌐", role: "Page Structure & Semantics", badge: "Core"    },
      
      { name: "CSS3", icon: "🎨", role: "Styling & Animations", badge: "Core" },
      { name: "JavaScript", icon: "🟨", role: "Language", badge: "Core" },
      
    ],
  },
  {
    layer: "Backend",
    tag: "Server & API",
    accent: "#0ea5e9",
    icon: "⚙️",
    desc: "Python-powered REST API handling CV parsing, validation logic, job scraping, and LLM orchestration with robust error handling.",
    techs: [
      { name: "Flask", icon: "🌶️", role: "Web Framework", badge: "Core" },
      { name: "Python 3.11", icon: "🐍", role: "Language", badge: "Core" },
      { name: "PyMuPDF", icon: "📄", role: "PDF Parsing", badge: "Library" },
      { name: "EasyOCR", icon: "🔍", role: "Image Text Extraction", badge: "AI" },
      { name: "BeautifulSoup", icon: "🌐", role: "Web Scraping", badge: "Library" },
      { name: "Requests", icon: "📡", role: "HTTP Client", badge: "Library" },
    ],
  },
  {
    layer: "AI & NLP",
    tag: "Intelligent Core",
    accent: "#7c3aed",
    icon: "🤖",
    desc: "Hybrid AI pipeline combining deterministic rule-based scoring with LLM reasoning for stable, explainable CV evaluation.",
    techs: [
      { name: "Groq LLaMA 3.3", icon: "🦙", role: "LLM Evaluation", badge: "AI" },
      { name: "scikit-learn TF-IDF", icon: "📊", role: "Job Matching", badge: "ML" },
      { name: "Cosine Similarity", icon: "📐", role: "Ranking", badge: "ML" },
      { name: "Regex Engine", icon: "🔎", role: "Skill Extraction", badge: "NLP" },
      { name: "SHA-256 Caching", icon: "🔒", role: "Score Stability", badge: "Infra" },
      { name: "OpenAI SDK", icon: "🔌", role: "LLM Client", badge: "Library" },
    ],
  },
  {
    layer: "Data & Storage",
    tag: "Persistence",
    accent: "#059669",
    icon: "🗄️",
    desc: "Lightweight, file-based data layer optimised for fast reads and atomic CSV writes — no heavy database infrastructure required.",
    techs: [
      { name: "SQLite", icon: "💾", role: "Score History DB", badge: "Database" },
      { name: "Pandas", icon: "🐼", role: "CSV Processing", badge: "Library" },
      { name: "CSV + JSON Cache", icon: "📁", role: "Description Cache", badge: "Storage" },
      { name: "In-Memory Cache", icon: "⚡", role: "LLM + GitHub Cache", badge: "Infra" },
      { name: "Atomic File Writes", icon: "🛡️", role: "Data Integrity", badge: "Infra" },
      { name: "UUID Sessions", icon: "🔑", role: "Server-Side Sessions", badge: "Security" },
    ],
  },
];

const BADGE_COLORS = {
  Core:     { bg: "rgba(37,99,235,0.10)",   border: "rgba(37,99,235,0.22)",   text: "#1d4ed8" },
  AI:       { bg: "rgba(124,58,237,0.10)",  border: "rgba(124,58,237,0.22)",  text: "#6d28d9" },
  ML:       { bg: "rgba(14,165,233,0.10)",  border: "rgba(14,165,233,0.22)",  text: "#0369a1" },
  NLP:      { bg: "rgba(14,165,233,0.10)",  border: "rgba(14,165,233,0.22)",  text: "#0369a1" },
  Library:  { bg: "rgba(5,150,105,0.10)",   border: "rgba(5,150,105,0.22)",   text: "#047857" },
  Tooling:  { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.22)",  text: "#b45309" },
  API:      { bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.22)",   text: "#b91c1c" },
  Database: { bg: "rgba(15,23,42,0.06)",    border: "rgba(15,23,42,0.14)",    text: "#334155" },
  Storage:  { bg: "rgba(15,23,42,0.06)",    border: "rgba(15,23,42,0.14)",    text: "#334155" },
  Infra:    { bg: "rgba(15,23,42,0.06)",    border: "rgba(15,23,42,0.14)",    text: "#334155" },
  Security: { bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.18)",   text: "#b91c1c" },
};

/* ─── Styles ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tsSection {
    position: relative;
    overflow: hidden;
    padding: 80px 0 96px;
    background: linear-gradient(180deg, #ffffff 0%, #f7faff 50%, #ffffff 100%);
    border-top: 1px solid rgba(15,23,42,0.06);
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  .tsBlob {
    position: absolute;
    border-radius: 999px;
    filter: blur(100px);
    pointer-events: none;
    z-index: 1;
  }
  .tsBlob--1 { width: 560px; height: 560px; top: -240px; left: -180px;
    background: radial-gradient(circle, rgba(37,99,235,0.13), transparent 70%); }
  .tsBlob--2 { width: 500px; height: 500px; bottom: -220px; right: -150px;
    background: radial-gradient(circle, rgba(124,58,237,0.11), transparent 70%); }
  .tsBlob--3 { width: 380px; height: 380px; top: 45%; left: 48%;
    background: radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%); }

  .tsDots {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: radial-gradient(rgba(37,99,235,0.13) 1px, transparent 1px);
    background-size: 34px 34px; opacity: 0.18;
  }

  .tsInner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 40px; position: relative; z-index: 2;
  }

  /* ── Fade in ── */
  .fadein { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fadein--visible { opacity: 1; transform: translateY(0); }

  /* ── Header ── */
  .tsTagline {
    font-size: 11.5px; font-weight: 900; letter-spacing: 2.8px;
    text-transform: uppercase; color: #2563eb; margin: 0 0 14px;
  }
  .tsTitle {
    font-size: clamp(28px, 3.6vw, 44px); font-weight: 900;
    letter-spacing: -1.2px; color: #0f172a; line-height: 1.07;
    margin: 0 0 14px;
  }
  .tsTitle span { color: #2563eb; text-decoration: underline;
    text-decoration-thickness: 6px; text-underline-offset: 10px; }
  .tsLead {
    max-width: 820px; color: rgba(15,23,42,0.58);
    font-size: 15.5px; line-height: 1.9; font-weight: 650; margin: 0 0 14px;
  }

  /* ── Summary chips ── */
  .tsSummaryBar {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin: 0 0 52px;
  }
  .tsSummaryChip {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 7px 14px; border-radius: 999px;
    background: rgba(37,99,235,0.07);
    border: 1px solid rgba(37,99,235,0.16);
    font-size: 12.5px; font-weight: 800; color: #1d4ed8; letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .tsSummaryChip span { font-size: 14px; }

  /* ── Stack layers ── */
  .tsLayers { display: flex; flex-direction: column; gap: 20px; }

  .tsLayer {
    border-radius: 28px; background: #fff;
    border: 1px solid rgba(15,23,42,0.08);
    box-shadow: 0 16px 36px rgba(2,6,23,0.07);
    overflow: hidden; position: relative;
  }
  .tsLayer::before {
    content: ""; position: absolute; inset: -2px; border-radius: 30px;
    background: radial-gradient(900px 280px at 50% 0%, rgba(37,99,235,0.12), transparent 70%);
    opacity: 0.85; pointer-events: none;
  }
  .tsLayer::after {
    content: ""; position: absolute; left: 20px; right: 20px; top: 0;
    height: 4px; border-radius: 999px;
    background: rgba(37,99,235,0.30); opacity: 0.75; pointer-events: none;
  }

  .tsLayerHead {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 24px 24px 14px; position: relative; z-index: 2;
  }

  .tsLayerIcon {
    width: 52px; height: 52px; border-radius: 18px; flex-shrink: 0;
    display: grid; place-items: center; font-size: 22px;
    background: rgba(37,99,235,0.09); border: 1px solid rgba(37,99,235,0.18);
  }

  .tsLayerMeta { flex: 1; min-width: 0; }

  .tsLayerBadge {
    display: inline-flex; align-items: center; padding: 5px 11px;
    border-radius: 999px; font-size: 10.5px; font-weight: 900;
    letter-spacing: 1.7px; text-transform: uppercase;
    background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.18);
    color: rgba(37,99,235,0.9); margin-bottom: 8px;
  }
  .tsLayerTitle {
    font-size: 20px; font-weight: 900; letter-spacing: -0.5px;
    color: #0f172a; line-height: 1.2; margin-bottom: 7px;
  }
  .tsLayerDesc {
    font-size: 13.5px; font-weight: 650; color: rgba(15,23,42,0.60);
    line-height: 1.75; max-width: 820px;
  }

  /* ── Tech cards grid ── */
  .tsTechGrid {
    display: grid; grid-template-columns: repeat(6, 1fr);
    gap: 12px; padding: 12px 24px 24px; position: relative; z-index: 2;
  }

  .tsTechCard {
    border-radius: 18px; padding: 16px 14px 14px;
    background: linear-gradient(160deg, rgba(243,247,255,0.70) 0%, #fff 70%);
    border: 1px solid rgba(15,23,42,0.08);
    box-shadow: 0 8px 20px rgba(2,6,23,0.055);
    display: flex; flex-direction: column; gap: 10px;
    transition: transform 0.24s ease, box-shadow 0.24s ease;
    cursor: default;
  }
  .tsTechCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(2,6,23,0.10);
  }

  .tsTechCard__top {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
  }

  .tsTechCard__emoji {
    width: 40px; height: 40px; border-radius: 14px; flex-shrink: 0;
    display: grid; place-items: center; font-size: 17px;
    background: rgba(37,99,235,0.09); border: 1px solid rgba(37,99,235,0.16);
  }

  .tsTechBadge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9.5px; font-weight: 600; letter-spacing: 0.8px;
    padding: 3px 8px; border-radius: 6px;
    white-space: nowrap;
  }

  .tsTechCard__name {
    font-weight: 900; font-size: 13px; letter-spacing: -0.3px;
    color: #0f172a; line-height: 1.25;
  }

  .tsTechCard__role {
    font-size: 11.5px; font-weight: 650; color: rgba(15,23,42,0.52);
    line-height: 1.5;
  }

  /* ── Architecture diagram strip ── */
  .tsArchStrip {
    margin-top: 52px; border-radius: 28px; overflow: hidden;
    border: 1px solid rgba(15,23,42,0.08);
    box-shadow: 0 16px 36px rgba(2,6,23,0.07);
    background: #0f172a; position: relative;
  }
  .tsArchStrip::before {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,0.22), transparent 70%);
  }

  .tsArchInner {
    padding: 36px 36px 38px; position: relative; z-index: 2;
  }

  .tsArchTitle {
    font-size: 11px; font-weight: 900; letter-spacing: 2.8px;
    text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 28px;
  }

  .tsArchFlow {
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
  }

  .tsArchNode {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.05);
  }
  .tsArchNode__icon { font-size: 20px; }
  .tsArchNode__text {}
  .tsArchNode__label {
    font-size: 12px; font-weight: 900; letter-spacing: -0.2px;
    color: rgba(255,255,255,0.90); line-height: 1.2;
  }
  .tsArchNode__sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; font-weight: 500;
    color: rgba(255,255,255,0.40); margin-top: 2px;
  }

  .tsArchArrow {
    flex-shrink: 0; padding: 0 4px;
    font-size: 18px; color: rgba(37,99,235,0.60);
    font-family: 'IBM Plex Mono', monospace;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .tsTechGrid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 1024px) {
    .tsInner { padding: 0 24px; }
  }
  @media (max-width: 800px) {
    .tsTechGrid { grid-template-columns: repeat(2, 1fr); }
    .tsArchFlow { gap: 6px; }
    .tsArchArrow { display: none; }
  }
  @media (max-width: 640px) {
    .tsInner { padding: 0 18px; }
    .tsTechGrid { grid-template-columns: 1fr 1fr; }
    .tsLayerHead { padding: 20px 18px 12px; flex-direction: column; }
    .tsTechGrid { padding: 10px 18px 18px; }
    .tsArchInner { padding: 24px 20px 26px; }
    .tsTechGrid { grid-template-columns: 1fr; }
    .tsArchFlow { flex-direction: column; align-items: flex-start; }
    .tsArchArrow { transform: rotate(90deg); display: block; margin-left: 20px; }
  }
`;



export default function TechStackSection() {
    
  return (
    <>
    <Navbar />
      <style>{styles}</style>
      <section className="tsSection" id="tech-stack">
        <div className="tsBlob tsBlob--1" />
        <div className="tsBlob tsBlob--2" />
        <div className="tsBlob tsBlob--3" />
        <div className="tsDots" />

        <div className="tsInner">
          {/* ── Header ── */}
          <FadeIn>
            <p className="tsTagline">— Tech Stack</p>
            <h2 className="tsTitle">
              Built on a <span>modern</span> foundation
            </h2>
            <p className="tsLead">
              CVPro is a full-stack application spanning a React frontend, Python/Flask API,
              AI-powered evaluation pipeline, and a lightweight data layer — designed for
              performance and maintainability.
            </p>
            <div className="tsSummaryBar">
              {[
                { emoji: "🧑‍💻",  label: "HTML/CSS/JS"},
                { emoji: "🐍",  label: "Python / Flask" },
                { emoji: "🦙",  label: "LLaMA 3.3 via Groq" },
                { emoji: "🔍",  label: "EasyOCR" },
                { emoji: "📊",  label: "TF-IDF Matching" },
                { emoji: "💾",  label: "SQLite + CSV" },
              ].map((c) => (
                <div key={c.label} className="tsSummaryChip">
                  <span>{c.emoji}</span> {c.label}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ── Layer groups ── */}
          <div className="tsLayers">
            {TECH_LAYERS.map((layer, li) => (
              <FadeIn key={layer.layer} delay={li * 0.08}>
                <div
                  className="tsLayer"
                  style={{
                    "--accent": layer.accent,
                  }}
                >
                  {/* Head */}
                  <div className="tsLayerHead">
                    <div className="tsLayerIcon">{layer.icon}</div>
                    <div className="tsLayerMeta">
                      <div className="tsLayerBadge">{layer.tag}</div>
                      <div className="tsLayerTitle">{layer.layer} Layer</div>
                      <p className="tsLayerDesc">{layer.desc}</p>
                    </div>
                  </div>

                  {/* Tech cards */}
                  <div className="tsTechGrid">
                    {layer.techs.map((t, ti) => {
                      const badgeStyle = BADGE_COLORS[t.badge] || BADGE_COLORS.Library;
                      return (
                        <FadeIn key={t.name} delay={li * 0.06 + ti * 0.04}>
                          <div className="tsTechCard">
                            <div className="tsTechCard__top">
                              <div className="tsTechCard__emoji">{t.icon}</div>
                              <div
                                className="tsTechBadge"
                                style={{
                                  background: badgeStyle.bg,
                                  border: `1px solid ${badgeStyle.border}`,
                                  color: badgeStyle.text,
                                }}
                              >
                                {t.badge}
                              </div>
                            </div>
                            <div>
                              <div className="tsTechCard__name">{t.name}</div>
                              <div className="tsTechCard__role">{t.role}</div>
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

         
        </div>
      </section>
      <Footer />    
    </>
  );
}