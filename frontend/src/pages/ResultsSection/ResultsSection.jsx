import { useRef, useEffect, useState } from "react";
import "./ResultsSection.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

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

/* ── DATA (you can change values anytime) ── */
const RESULTS_STATS = [
  { value: "168+", label: "CVs Analyzed", sub: "Tested using real student CV samples" },
  { value: "27+", label: "Validation Checks", sub: "Rule-based + AI criteria combined" },
  { value: "5", label: "HR Companies Surveyed", sub: "Local recruiter expectations captured" },
  { value: "9", label: "LLM Criteria", sub: "Structured scoring for professionalism & clarity" },
];

const RESULTS_HIGHLIGHTS = [
  {
    icon: "✅",
    title: "More actionable feedback",
    desc:
      "Users received structured suggestions on missing sections, formatting, and stronger evidence (projects, GitHub, achievements).",
  },
  {
    icon: "⚖️",
    title: "Stable scoring with safeguards",
    desc:
      "Weighted scoring keeps results consistent, and AI influence can be reduced when variability is detected.",
  },
  {
    icon: "🙈",
    title: "Fairness via Blind Mode",
    desc:
      "Photo and school exam details (O/L, A/L) can be neutralized to reduce bias and keep evaluation focused on job-relevant factors.",
  },
  {
    icon: "🎯",
    title: "More relevant job matches",
    desc:
      "Recommendations combine TF-IDF similarity, skill overlap, soft skills, and seniority alignment instead of only keyword matching.",
  },
];

const SCORE_BANDS = [
  { label: "Excellent", range: "8.5 – 10", color: "#10b981" },
  { label: "Good", range: "7.0 – 8.4", color: "#2563eb" },
  { label: "Fair", range: "5.5 – 6.9", color: "#f59e0b" },
  { label: "Needs Improvement", range: "< 5.5", color: "#ef4444" },
];

const JOB_FORMULA = [
  { label: "TF-IDF Similarity", pct: 50, color: "#2563eb", note: "CV text vs job description" },
  { label: "Skill Overlap", pct: 30, color: "#10b981", note: "Tech skills intersection" },
  { label: "Soft Skills", pct: 10, color: "#f59e0b", note: "Communication / teamwork signals" },
  { label: "Seniority Match", pct: 10, color: "#ef4444", note: "Intern/Junior/Mid alignment" },
];

export default function ResultsSection() {
  return (
    <>
    <Navbar />
    <section className="resSection" id="results">
      <div className="resBlob resBlob--1" />
      <div className="resBlob resBlob--2" />
      <div className="resDots" />

      <div className="resInner">
        <FadeIn>
          <p className="resTag">— Results & Evaluation</p>
          <h2 className="resTitle">
            What we achieved <span>so far</span>
          </h2>
          <p className="resLead">
            We evaluated the platform using real CV samples and Sri Lankan job listings.
            The results show improved CV quality feedback and more relevant job recommendations.
          </p>
        </FadeIn>

        {/* STATS */}
        <div className="resStats">
          {RESULTS_STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="resStatCard">
                <div className="resStatCard__value">{s.value}</div>
                <div className="resStatCard__label">{s.label}</div>
                <div className="resStatCard__sub">{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <FadeIn delay={0.05}>
          <div className="resPanel">
            <div className="resPanel__head">
              <div className="resPanel__badge">Key Outcomes</div>
              <div>
                <div className="resPanel__title">System improvements observed</div>
                <div className="resPanel__sub">
                  CV validation + job recommendation evaluation summary
                </div>
              </div>
            </div>

            <div className="resHighlights">
              {RESULTS_HIGHLIGHTS.map((h) => (
                <div className="resHiCard" key={h.title}>
                  <div className="resHiCard__icon">{h.icon}</div>
                  <div className="resHiCard__title">{h.title}</div>
                  <div className="resHiCard__desc">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* TWO COLUMN: Grades + Job Formula */}
        <div className="resTwoCol">
          {/* Grade mapping */}
          <FadeIn delay={0.08}>
            <div className="resCard">
              <div className="resCard__head">
                <div className="resCard__title">
                  <span className="resCard__emoji">🏅</span> Grade Mapping
                </div>
                <div className="resCard__sub">Overall score → grade assignment</div>
              </div>

              <div className="gradeList">
                {SCORE_BANDS.map((g) => (
                  <div key={g.label} className="gradeRow">
                    <div className="gradeRow__left">
                      <span className="gradeDot" style={{ background: g.color }} />
                      <span className="gradeName">{g.label}</span>
                    </div>
                    <span className="gradeRange">{g.range}</span>
                  </div>
                ))}
              </div>

              <div className="resNote">
                Weighted scoring reflects recruiter priorities. Blind Mode can neutralize sensitive
                factors (photo, O/L & A/L) to support fairness.
              </div>
            </div>
          </FadeIn>

          {/* Job recommendation formula */}
          <FadeIn delay={0.12}>
            <div className="resCard">
              <div className="resCard__head">
                <div className="resCard__title">
                  <span className="resCard__emoji">🎯</span> Job Recommendation Ranking
                </div>
                <div className="resCard__sub">Final score breakdown</div>
              </div>

              <div className="resFormula">
                <code>
                  final_score = (tfidf × 0.50) + (overlap × 0.30) + (soft × 0.10) + (seniority × 0.10)
                </code>
              </div>

              <div className="formulaBars">
                {JOB_FORMULA.map((c) => (
                  <div key={c.label} className="fRow">
                    <div className="fRow__top">
                      <span className="fRow__label">{c.label}</span>
                      <span className="fRow__pct" style={{ color: c.color }}>
                        {c.pct}%
                      </span>
                    </div>
                    <div className="fRow__track">
                      <div className="fRow__fill" style={{ width: `${c.pct}%`, background: c.color }} />
                    </div>
                    <div className="fRow__note">{c.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        
      </div>
    </section>
    <Footer/>
    </>
  );
}