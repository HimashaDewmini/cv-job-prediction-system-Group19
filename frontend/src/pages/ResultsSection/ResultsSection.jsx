import { useRef, useEffect, useMemo, useState } from "react";
import "./ResultsSection.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

// ✅ Update these image paths to match your project
import img1 from "../../assets/results/job-recommendations.png";
import img2 from "../../assets/results/upload-page.png";
import img3 from "../../assets/results/results-page.png";
import img4 from "../../assets/results/feedback-page.png";

/* ── Scroll-in animation hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold,
    });
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

/* ── DATA ── */
const RESULTS_STATS = [
  { value: "168+", label: "CVs Analyzed", sub: "Tested using real student CV samples" },
  { value: "27+", label: "Validation Checks", sub: "Rule-based + AI criteria combined" },
  { value: "25", label: "HR Companies Surveyed", sub: "Local recruiter expectations captured" },
  { value: "9", label: "LLM Criteria", sub: "Structured scoring for professionalism & clarity" },
];

const RESULTS_HIGHLIGHTS = [
  {
    icon: "✅",
    title: "Actionable CV improvements",
    desc: "Structured suggestions for missing sections, formatting, GitHub/projects, and stronger evidence (achievements).",
  },
  {
    icon: "⚖️",
    title: "Stable scoring with safeguards",
    desc: "Weighted scoring keeps results consistent; AI influence can reduce automatically when variability is detected.",
  },
  {
    icon: "🙈",
    title: "Fair screening with Blind Mode",
    desc: "Neutralizes photo + school exam emphasis (O/L, A/L) so evaluation focuses on job-relevant content.",
  },
  {
    icon: "🎯",
    title: "More relevant job matches",
    desc: "Ranking combines TF-IDF similarity, skill overlap, soft skills, and seniority alignment (not only keywords).",
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
  // ✅ UI showcase data (images + captions)
  const SHOTS = useMemo(
    () => [
      {
        title: "Job Recommendations UI",
        sub: "Matched & missing skills + match % + apply flow",
        img: img1,
      },
      {
        title: "Upload & Validate Screen",
        sub: "Clean upload experience + Blind Mode option",
        img: img2,
      },
      {
        title: "Score Dashboard",
        sub: "Overall + dimensions (Impact / Brevity / Style / Skills)",
        img: img3,
      },
      {
        title: "Detailed Checks & Feedback",
        sub: "Specific improvements students can apply immediately",
        img: img4,
      },
    ],
    []
  );

  const [openShot, setOpenShot] = useState(null);

  // ESC to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenShot(null);
    };
    if (openShot) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openShot]);

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
              We evaluated the platform using real student CV samples and Sri Lankan IT job listings.
              The results show clearer CV improvement guidance and more relevant job recommendations.
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

          {/* UI SHOWCASE */}
          <FadeIn delay={0.06}>
            <div className="resShowcase">
              <div className="resShowcase__head">
                <div className="resPanel__badge">UI Showcase</div>
                <div>
                  <div className="resPanel__title">Screens from the working system</div>
                  <div className="resPanel__sub">
                    Tap a card to view a larger preview (mobile-friendly).
                  </div>
                </div>
              </div>

              <div className="shotGrid">
                {SHOTS.map((s) => (
                  <button
                    key={s.title}
                    className="shotCard"
                    onClick={() => setOpenShot(s)}
                    type="button"
                    aria-label={`Open preview: ${s.title}`}
                  >
                    <div className="shotMedia">
                      <img src={s.img} alt={s.title} loading="lazy" />
                    </div>
                    <div className="shotMeta">
                      <div className="shotTitle">{s.title}</div>
                      <div className="shotSub">{s.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* HIGHLIGHTS */}
          <FadeIn delay={0.08}>
            <div className="resPanel">
              <div className="resPanel__head">
                <div className="resPanel__badge">Key Outcomes</div>
                <div>
                  <div className="resPanel__title">System improvements observed</div>
                  <div className="resPanel__sub">
                    Summary of CV validation + job recommendation evaluation
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
            <FadeIn delay={0.10}>
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
                  Weighted scoring reflects Sri Lankan recruiter priorities. Blind Mode can neutralize
                  sensitive factors (photo, O/L & A/L) to support fairness.
                </div>
              </div>
            </FadeIn>

            {/* Job recommendation formula */}
            <FadeIn delay={0.14}>
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
                        <div
                          className="fRow__fill"
                          style={{ width: `${c.pct}%`, background: c.color }}
                        />
                      </div>
                      <div className="fRow__note">{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ✅ Modal */}
        {openShot && (
          <div className="shotModal" role="dialog" aria-modal="true">
            <button
              className="shotModal__backdrop"
              onClick={() => setOpenShot(null)}
              aria-label="Close preview"
              type="button"
            />
            <div className="shotModal__card">
              <div className="shotModal__top">
                <div>
                  <div className="shotModal__title">{openShot.title}</div>
                  <div className="shotModal__sub">{openShot.sub}</div>
                </div>
                <button
                  className="shotModal__close"
                  onClick={() => setOpenShot(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>
              <div className="shotModal__imgWrap">
                <img src={openShot.img} alt={openShot.title} />
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}