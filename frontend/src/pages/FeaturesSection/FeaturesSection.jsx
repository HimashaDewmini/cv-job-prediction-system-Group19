import { useRef, useEffect, useState } from "react";
import "./FeaturesSection.css";

/* ── Scroll-in animation hook ── */
function useInView(threshold = 0.12) {
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

const FEATURE_GROUPS = [
  {
    tag: "CV Enhancement",
    title: "Smart CV validation with stable scoring",
    desc:
      "Hybrid validation combines rule-based checks with AI evaluation, producing consistent feedback and an overall grade aligned with Sri Lankan recruiter expectations.",
    accent: "#2563eb",
    cards: [
      {
        icon: "📄",
        title: "Secure PDF Upload",
        points: [
          "File signature validation (%PDF- header check)",
          "Size limit and safe handling",
          "Preview generation for user review",
        ],
      },
      {
        icon: "👁️",
        title: "OCR Support (Scanned CVs)",
        points: [
          "Detects image-based CVs",
          "OCR fallback for readable text extraction",
          "Improves validation coverage",
        ],
      },
      {
        icon: "✅",
        title: "Rule-Based Checks (13+)",
        points: [
          "Page count, formatting, contact info",
          "Email professionalism + achievements",
          "GitHub link verification + keywords",
        ],
      },
      {
        icon: "🤖",
        title: "AI Validation Layer",
        points: [
          "Structured criteria evaluation",
          "Strict JSON output for reliability",
          "Prompt injection using rule results",
        ],
      },
    ],
  },
  {
    tag: "Fairness & Quality",
    title: "Bias-aware evaluation and better guidance",
    desc:
      "The platform encourages fairness through Blind Mode and gives actionable guidance to help students improve CV quality and hiring relevance.",
    accent: "#4f46e5",
    cards: [
      {
        icon: "🙈",
        title: "Blind Mode",
        points: [
          "Neutralizes profile photos in evaluation",
          "Ignores O/L & A/L school results",
          "Supports unbiased recommendations",
        ],
      },
      {
        icon: "⚖️",
        title: "Weighted Scoring Engine",
        points: [
          "Weights based on recruiter priorities",
          "Grade mapping (Excellent → Needs Improvement)",
          "Stability safeguard for AI variance",
        ],
      },
      {
        icon: "🧾",
        title: "Detailed Feedback",
        points: [
          "Clear improvement suggestions",
          "Highlights missing sections and weak areas",
          "Supports professional writing style",
        ],
      },
      {
        icon: "🗄️",
        title: "History & Storage",
        points: [
          "Stores scores & runs in SQLite",
          "Repeatability via file-hash caching",
          "Faster results for re-uploads",
        ],
      },
    ],
  },
  {
    tag: "Job Recommendations",
    title: "Relevant jobs based on CV content",
    desc:
      "Matches user CVs with real IT job posts using a ranking formula combining TF-IDF similarity, skill overlap, soft skills, and seniority alignment.",
    accent: "#0ea5e9",
    cards: [
      {
        icon: "🔍",
        title: "TF-IDF Matching",
        points: [
          "CV text vs job description similarity",
          "Cosine similarity ranking",
          "Stronger matches for real job context",
        ],
      },
      {
        icon: "🎯",
        title: "Skill Overlap",
        points: [
          "Matches extracted technical skills",
          "Normalizes synonyms and variations",
          "Highlights skill gaps vs job needs",
        ],
      },
      {
        icon: "🤝",
        title: "Soft Skill Matching",
        points: [
          "Detects teamwork/leadership/etc.",
          "Balances hard + soft skills",
          "Better fit recommendations",
        ],
      },
      {
        icon: "🏗️",
        title: "Seniority Alignment",
        points: [
          "Intern/Junior/Mid/Senior detection",
          "Filters unrealistic roles",
          "Improves relevance for students",
        ],
      },
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section className="featSection" id="features">
      <div className="featBlob featBlob--1" />
      <div className="featBlob featBlob--2" />
      <div className="featDots" />

      <div className="featInner">
        <FadeIn>
          <p className="featTag">— Key Features</p>
          <h2 className="featTitle">
            What our platform <span>offers</span>
          </h2>
          <p className="featLead">
            CVPro helps students validate CV quality, receive structured feedback, and get job
            recommendations using real Sri Lankan IT job posts.
          </p>
        </FadeIn>

        <div className="featGroups">
          {FEATURE_GROUPS.map((g, gi) => (
            <FadeIn key={g.tag} delay={gi * 0.08}>
              <div className="featGroup" style={{ "--accent": g.accent }}>
                <div className="featGroup__head">
                  <div className="featGroup__badge">{g.tag}</div>
                  <div className="featGroup__titles">
                    <h3 className="featGroup__title">{g.title}</h3>
                    <p className="featGroup__desc">{g.desc}</p>
                  </div>
                </div>

                <div className="featGrid">
                  {g.cards.map((c) => (
                    <article key={c.title} className="featCard">
                      <div className="featCard__icon">{c.icon}</div>
                      <div className="featCard__title">{c.title}</div>
                      <ul className="featCard__list">
                        {c.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}