import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/* ── tiny hook for scroll-in animations ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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

/* ── Score ring SVG ── */
function ScoreRing({ score = 8.5 }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const pct = score / 10;
  const dash = pct * circ;
  return (
    <div className="score-ring">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <div className="score-ring__value">
        {score}
        <span>/10</span>
      </div>
    </div>
  );
}

/* ── DATA ── */
const HERO_CHECKS = [
  { label: "Professional Format" },
  { label: "Technical Skills" },
  { label: "Action Verbs" },
  { label: "Contact Details" },
  { label: "GitHub Profile" },
];

const STATS = [
  { value: "27+", label: "Validation Checks" },
  { value: "AI", label: "LLM Analysis" },
  { value: "100%", label: "Free to Use" },
  { value: "168+", label: "CVs Analyzed" },
];

const HOW_STEPS = [
  {
    num: "01",
    icon: "📄",
    title: "Upload Your CV",
    desc: "Upload your CV as a PDF. Our system accepts any standard format and processes it securely — deleted after analysis.",
    color: "#4f46e5",
  },
  {
    num: "02",
    icon: "🤖",
    title: "AI + Rule Analysis",
    desc: "A hybrid engine runs 13+ rule-based checks and an LLM validation across 9 quality criteria simultaneously.",
    color: "#7c3aed",
  },
  {
    num: "03",
    icon: "📊",
    title: "Get Your Score",
    desc: "Receive a weighted score across Impact, Brevity, Style, and Skills dimensions with personalized improvement tips.",
    color: "#0ea5e9",
  },
  {
    num: "04",
    icon: "💼",
    title: "Find Matching Jobs",
    desc: "Our TF-IDF engine matches your profile against live Sri Lankan IT jobs from TopJobs.lk and recommends the best fits.",
    color: "#10b981",
  },
];

const FEATURES_QUICK = [
  {
    icon: "🎯",
    title: "Dimension Scoring",
    desc: "Impact · Brevity · Style · Skills",
    color: "#4f46e5",
  },
  {
    icon: "🔒",
    title: "Blind Mode",
    desc: "Bias-free fair evaluation",
    color: "#7c3aed",
  },
  {
    icon: "🔗",
    title: "GitHub Validator",
    desc: "HTTP verification of repo links",
    color: "#0ea5e9",
  },
  {
    icon: "📍",
    title: "Local Job Market",
    desc: "TopJobs.lk & Ikman.lk data",
    color: "#10b981",
  },
  {
    icon: "💡",
    title: "Actionable Feedback",
    desc: "Evidence-based specific tips",
    color: "#f59e0b",
  },
  {
    icon: "📈",
    title: "Analytics Dashboard",
    desc: "Track usage & score trends",
    color: "#ef4444",
  },
];

const SURVEY_BARS = [
  { label: "Technical Skills Section", pct: 100, color: "#4f46e5" },
  { label: "Education Qualifications", pct: 100, color: "#4f46e5" },
  { label: "Professional Photo", pct: 80, color: "#7c3aed" },
  { label: "Portfolio / GitHub", pct: 80, color: "#7c3aed" },
  { label: "Languages Section", pct: 40, color: "#0ea5e9" },
];

export default function HomePage({ onGetStarted }) {
  return (
    <main className="home">
      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <section className="hero">
        {/* soft gradient blobs */}
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />

        <div className="hero__content">
          <FadeIn className="hero__left">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              University of Sri Jayewardenepura · Group 19
            </div>

            <h1 className="hero__title">
              Get your CV{" "}
              <span className="hero__title-highlight">validated</span> for the
              Sri Lankan IT market
            </h1>

            <p className="hero__sub">
              AI-powered CV analysis based on real HR surveys and local industry
              standards. Get instant feedback, dimension scores, and matched job
              recommendations — completely free.
            </p>

            <div className="hero__actions">
              <button className="btn btn--primary" onClick={onGetStarted}>
                Analyse My CV →
              </button>
              <button
                className="btn btn--ghost"
                onClick={() =>
                  document
                    .getElementById("methodology")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See Methodology
              </button>
            </div>

            {/* Stats row */}
            <div className="hero__stats">
              {STATS.map((s) => (
                <div key={s.label} className="hero__stat">
                  <span className="hero__stat-value">{s.value}</span>
                  <span className="hero__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Score card */}
          <FadeIn delay={0.15} className="hero__right">
            <div className="score-card">
              <div className="score-card__header">
                <ScoreRing score={8.5} />
                <div className="score-card__header-text">
                  <div className="score-card__title">Resume Score Preview</div>
                  <div className="score-card__grade">
                    Grade: <span>Good</span>
                  </div>
                </div>
              </div>

              <div className="score-card__checks">
                {HERO_CHECKS.map((c) => (
                  <div key={c.label} className="score-card__check">
                    <span className="score-card__check-icon">✓</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>

              <div className="score-card__dims">
                {[
                  { label: "Impact", val: 54, color: "#ef4444" },
                  { label: "Brevity", val: 100, color: "#10b981" },
                  { label: "Style", val: 72, color: "#0ea5e9" },
                  { label: "Skills", val: 98, color: "#4f46e5" },
                ].map((d) => (
                  <div key={d.label} className="score-card__dim">
                    <div className="score-card__dim-top">
                      <span>{d.label}</span>
                      <span style={{ color: d.color, fontWeight: 700 }}>
                        {d.val}
                      </span>
                    </div>
                    <div className="score-card__dim-bar">
                      <div
                        className="score-card__dim-fill"
                        style={{ width: `${d.val}%`, background: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="score-card__footer">
                Powered by Groq LLM · Rule-Based Hybrid Engine
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="how" id="how">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— How It Works</p>
            <h2 className="section-title">
              Four steps to a better CV
              <br />
              <span>and the right job</span>
            </h2>
          </FadeIn>

          <div className="how__grid">
            {HOW_STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div className="how-card" style={{ "--accent": s.color }}>
                  <div className="how-card__num">{s.num}</div>
                  <div className="how-card__icon">{s.icon}</div>
                  <h3 className="how-card__title">{s.title}</h3>
                  <p className="how-card__desc">{s.desc}</p>
                  <div className="how-card__line" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES QUICK ════════════ */}
      <section className="quick-features" id="features">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Key Features</p>
            <h2 className="section-title">
              Everything you need
              <br />
              <span>to stand out</span>
            </h2>
          </FadeIn>

          <div className="qf__grid">
            {FEATURES_QUICK.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="qf-card" style={{ "--accent": f.color }}>
                  <div className="qf-card__icon">{f.icon}</div>
                  <div className="qf-card__title">{f.title}</div>
                  <div className="qf-card__desc">{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ RESEARCH HIGHLIGHT ════════════ */}
      <section className="research-highlight" id="methodology">
        <div className="section-inner">
          <div className="rh__grid">
            <FadeIn className="rh__left">
              <p className="section-tag">— Based on Real Research</p>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
              >
                HR-validated criteria
                <br />
                <span>from Sri Lankan companies</span>
              </h2>
              <p className="rh__desc">
                We surveyed HR professionals at Dialog Axiata, Virtusa, IFS,
                WSO2, and CodeGen International to identify exactly what
                recruiters look for — then encoded those expectations directly
                into the validation engine.
              </p>
              <div className="rh__pills">
                {["Dialog Axiata", "Virtusa", "IFS", "WSO2", "CodeGen"].map(
                  (c) => (
                    <span key={c} className="pill">
                      {c}
                    </span>
                  ),
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="rh__right">
              <div className="survey-card">
                <div className="survey-card__title">
                  📊 Essential CV Elements — Recruiter Survey
                </div>
                <div className="survey-card__subtitle">
                  5 responses · Leading Sri Lankan IT firms
                </div>
                <div className="survey-bars">
                  {SURVEY_BARS.map((b) => (
                    <div key={b.label} className="sbar">
                      <div className="sbar__top">
                        <span>{b.label}</span>
                        <span style={{ color: b.color, fontWeight: 700 }}>
                          {b.pct}%
                        </span>
                      </div>
                      <div className="sbar__track">
                        <div
                          className="sbar__fill"
                          style={{
                            width: `${b.pct}%`,
                            background: `linear-gradient(90deg, ${b.color}, ${b.color}aa)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════ SCORING SYSTEM ════════════ */}
      <section className="scoring-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Scoring System</p>
            <h2 className="section-title">
              Weighted multi-dimensional
              <br />
              <span>evaluation engine</span>
            </h2>
          </FadeIn>

          <div className="scoring__grid">
            {[
              {
                dim: "Impact",
                score: "54/100",
                icon: "⚡",
                sub: "Action verbs, achievements, professional summary",
                color: "#ef4444",
                border: "#fecaca",
              },
              {
                dim: "Brevity",
                score: "100/100",
                icon: "✂️",
                sub: "Page count, no unnecessary school exam results",
                color: "#10b981",
                border: "#bbf7d0",
              },
              {
                dim: "Style",
                score: "72/100",
                icon: "🎨",
                sub: "Formatting consistency, email, photo presence",
                color: "#0ea5e9",
                border: "#bae6fd",
              },
              {
                dim: "Skills",
                score: "98/100",
                icon: "🛠️",
                sub: "Technical keywords, skills section, GitHub links",
                color: "#4f46e5",
                border: "#c7d2fe",
              },
            ].map((d, i) => (
              <FadeIn key={d.dim} delay={i * 0.1}>
                <div
                  className="dim-card"
                  style={{ "--accent": d.color, "--border": d.border }}
                >
                  <div className="dim-card__icon">{d.icon}</div>
                  <div className="dim-card__score" style={{ color: d.color }}>
                    {d.score}
                  </div>
                  <div className="dim-card__name">{d.dim}</div>
                  <div className="dim-card__sub">{d.sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Grade band */}
          <FadeIn delay={0.2}>
            <div className="grade-band">
              {[
                {
                  label: "Excellent",
                  range: "≥ 8.5",
                  color: "#10b981",
                  bg: "#f0fdf4",
                },
                {
                  label: "Good",
                  range: "≥ 7.0",
                  color: "#4f46e5",
                  bg: "#eef2ff",
                },
                {
                  label: "Fair",
                  range: "≥ 5.5",
                  color: "#f59e0b",
                  bg: "#fffbeb",
                },
                {
                  label: "Needs Improvement",
                  range: "< 5.5",
                  color: "#ef4444",
                  bg: "#fef2f2",
                },
              ].map((g) => (
                <div
                  key={g.label}
                  className="grade-chip"
                  style={{ background: g.bg, borderColor: `${g.color}33` }}
                >
                  <span style={{ color: g.color, fontWeight: 700 }}>
                    {g.label}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "12px" }}>
                    {g.range}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
