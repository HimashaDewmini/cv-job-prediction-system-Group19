import { useRef, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Methodology.css";

/* ── Scroll-in animation hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
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

const STEPS = [
  {
    step: "01",
    title: "Problem Identification",
    desc: "Identified Sri Lankan IT students’ CV quality issues and job search overload on local portals.",
    icon: "🧩",
    color: "#2563eb",
  },
  {
    step: "02",
    title: "HR Survey & Requirement Gathering",
    desc: "Collected recruiter expectations (format, skills evidence, GitHub, keywords) to define scoring rules.",
    icon: "📋",
    color: "#4f46e5",
  },
  {
    step: "03",
    title: "System Design",
    desc: "Designed hybrid validation architecture: rule-based checks + AI evaluation layer + scoring engine.",
    icon: "🏗️",
    color: "#7c3aed",
  },
  {
    step: "04",
    title: "Implementation",
    desc: "Built Flask API + UI, CV extraction with PyMuPDF, OCR fallback, and TF-IDF job matching.",
    icon: "⚙️",
    color: "#0ea5e9",
  },
  {
    step: "05",
    title: "Evaluation & Testing",
    desc: "Tested with real CVs and live job posts; checked scoring stability, relevance, and feedback quality.",
    icon: "✅",
    color: "#10b981",
  },
];

const METHODS = [
  {
    title: "Research Approach",
    points: [
      "Applied research with a practical prototype",
      "Mixed approach: qualitative (HR feedback) + quantitative (scores & matching)",
      "Focus on Sri Lankan IT recruitment context",
    ],
    icon: "🧠",
    accent: "#2563eb",
  },
  {
    title: "Data Sources",
    points: [
      "CV samples (PDF/Word) uploaded by users",
      "Live IT job data from TopJobs.lk ",
      "Survey results from HR/recruiters (local industry expectations)",
    ],
    icon: "🗂️",
    accent: "#4f46e5",
  },
  {
    title: "Ethics & Fairness",
    points: [
      "Blind Mode neutralizes photo and school results (O/L, A/L) to reduce bias",
      "No sharing of CV content publicly; only analysis results displayed",
      "Validation uses deterministic settings to reduce random AI variance",
    ],
    icon: "🛡️",
    accent: "#7c3aed",
  },
];

const PIPELINE = [
  {
    title: "CV Ingestion & Extraction",
    items: [
      "File signature validation (%PDF- header check)",
      "Text extraction using PyMuPDF",
      "OCR fallback (EasyOCR) for scanned/image CVs",
      "Bundle extracted: text, links, images, page count",
    ],
    icon: "📄",
    color: "#2563eb",
  },
  {
    title: "Rule-Based Validation",
    items: [
      "Page count, formatting quality, contact information",
      "Professional email check, action verbs, achievements",
      "GitHub link validation (live check)",
      "Technical keyword coverage and skill section quality",
    ],
    icon: "✅",
    color: "#0ea5e9",
  },
  {
    title: "AI Validation Layer",
    items: [
      "Groq LLM evaluation using 9 structured criteria",
      "Strict JSON output and low temperature for stability",
      "Rule results injected into prompt to reduce hallucination",
      "Cache by file hash for repeatable results",
    ],
    icon: "🤖",
    color: "#10b981",
  },
  {
    title: "Scoring & Grading",
    items: [
      "Weighted overall score based on recruiter expectations",
      "Per-dimension scoring (skills, style, impact, etc.)",
      "Grade mapping: Excellent / Good / Fair / Needs Improvement",
      "Auto weight adjustment if AI variability is high",
    ],
    icon: "📊",
    color: "#f59e0b",
  },
  {
    title: "Job Recommendation Engine",
    items: [
      "TF-IDF similarity between CV text and job descriptions",
      "Skill overlap ratio and soft-skill matching",
      "Seniority detection (intern/junior/mid/senior) using heuristics",
      "Final ranking using weighted formula",
    ],
    icon: "💼",
    color: "#ef4444",
  },
];

export default function MethodologyPage() {
  return (
    <main className="methPage">
      <Navbar />

      {/* HERO */}
      <section className="methHero">
        <div className="methHero__blob methHero__blob--1" />
        <div className="methHero__blob methHero__blob--2" />
        <div className="methHero__dots" />
        <div className="methHero__inner">
          <div className="methHero__badge">
            <span className="methHero__badgeDot" />
            Research Methodology · Group 19
          </div>

          <h1 className="methHero__title">
            Methodology <span>Overview</span>
          </h1>

          <p className="methHero__sub">
            This section explains how we collected requirements, built the hybrid CV validation system,
            and evaluated job recommendations using Sri Lankan IT market data.
          </p>

          <div className="methHero__miniLine" />
        </div>
      </section>

      {/* FLOW STEPS */}
      <section className="methSection">
        <div className="methInner">
          <FadeIn>
            <p className="methTag">— Research Process</p>
            <h2 className="methTitle">Step-by-step methodology</h2>
            <p className="methLead">
              Our workflow starts from identifying the problem, then gathering HR requirements,
              building the system, and validating it with real CVs and job postings.
            </p>
          </FadeIn>

          <div className="methSteps">
            {STEPS.map((s, idx) => (
              <FadeIn key={s.step} delay={idx * 0.07}>
                <div className="stepCard" style={{ "--accent": s.color }}>
                  <div className="stepCard__top">
                    <div className="stepCard__num" style={{ background: s.color }}>
                      {s.step}
                    </div>
                    <div className="stepCard__icon">{s.icon}</div>
                    <div className="stepCard__title">{s.title}</div>
                  </div>
                  <p className="stepCard__desc">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* METHODS CARDS */}
      <section className="methSection methSection--alt">
        <div className="methInner">
          <FadeIn>
            <p className="methTag">— Research Design</p>
            <h2 className="methTitle">Approach, data sources, and fairness</h2>
          </FadeIn>

          <div className="methodGrid">
            {METHODS.map((m, i) => (
              <FadeIn key={m.title} delay={i * 0.08}>
                <div className="methodCard" style={{ "--accent": m.accent }}>
                  <div className="methodCard__head">
                    <div className="methodCard__icon">{m.icon}</div>
                    <div className="methodCard__title">{m.title}</div>
                  </div>
                  <ul className="methodCard__list">
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="methSection">
        <div className="methInner">
          <FadeIn>
            <p className="methTag">— System Pipeline</p>
            <h2 className="methTitle">How the system processes a CV</h2>
            <p className="methLead">
              The platform uses a hybrid pipeline (rules + AI) to generate stable scores and job recommendations.
            </p>
          </FadeIn>

          <div className="pipeGrid">
            {PIPELINE.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.07}>
                <div className="pipeCard" style={{ "--accent": p.color }}>
                  <div className="pipeCard__head">
                    <div className="pipeCard__icon">{p.icon}</div>
                    <div>
                      <div className="pipeCard__title">{p.title}</div>
                      <div className="pipeCard__sub">Core activities</div>
                    </div>
                  </div>

                  <ul className="pipeCard__list">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.12}>
            <div className="methNote">
              <div className="methNote__icon">💡</div>
              <div>
                <div className="methNote__title">Why hybrid validation?</div>
                <div className="methNote__text">
                  Rule-based checks ensure consistency, while the AI layer evaluates quality aspects
                  that are hard to measure with simple rules (clarity, professionalism, and relevance).
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}