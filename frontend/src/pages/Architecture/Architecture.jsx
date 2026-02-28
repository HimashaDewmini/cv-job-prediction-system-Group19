import { useRef, useEffect, useState } from "react";
import "./Architecture.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

/* ── Scroll-in animation hook ── */
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
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

/* ══════════════════════════════════
   SCORING FORMULA DATA
══════════════════════════════════ */
const SCORING_FORMULA = [
  { label: "TF-IDF",        pct: 50, color: "#4f46e5", desc: "Text cosine similarity" },
  { label: "Skill Overlap", pct: 30, color: "#10b981", desc: "Tech skill intersection" },
  { label: "Soft Skills",   pct: 10, color: "#f59e0b", desc: "Personality fit" },
  { label: "Seniority",     pct: 10, color: "#ef4444", desc: "Level match" },
];

/* ══════════════════════════════════
   JOB REC STEPS DATA
══════════════════════════════════ */
const JOB_REC_STEPS = [
  {
    step: "01",
    label: "Uploaded CV",
    sub: "PDF processed · bundle extracted",
    icon: "📄",
    color: "#4f46e5",
    fn: "extract_pdf_bundle()",
    detail: "Text · links · images · page count · EasyOCR fallback for image-based CVs",
    type: "start",
  },
  {
    step: "02",
    label: "Extract Skills from CV",
    sub: "Keywords + Skills Scan",
    icon: "🔑",
    color: "#4f46e5",
    fn: "build_user_skills_from_cv()",
    detail: "82 canonical tech skills via TECH_KEYWORD_VARIANTS · synonym normalisation · soft skills section + fulltext scan",
  },
  {
    step: "03",
    label: "Load Job Database",
    sub: "TopJobs CSV File",
    icon: "📂",
    color: "#7c3aed",
    fn: "load_job_data()",
    detail: "topjobs_it_jobs_enriched.csv · scraper + LLM enrichment · description cache via CACHE_CSV",
  },
  {
    step: "04",
    label: "Filter Active Jobs",
    sub: "Remove Expired Jobs",
    icon: "📅",
    color: "#7c3aed",
    fn: "filter_active_jobs()",
    detail: "closing_dt parsed · jobs with blank closing_date kept (never-expire policy) · today's date comparison",
  },
  {
    step: "05",
    label: "AI Skill Matching Engine",
    sub: "TF-IDF + Cosine Similarity",
    icon: "🧠",
    color: "#0ea5e9",
    fn: "TfidfVectorizer + cosine_similarity()",
    detail: "3000 features · bigrams · sublinear_tf=True · level_hint prepended to query · job_text = title + company + desc + skills",
    highlight: true,
  },
  {
    step: "06",
    label: "Apply Weighted Scoring",
    sub: "final_score formula",
    icon: "⚖️",
    color: "#0ea5e9",
    fn: "get_job_recommendations()",
    detail: "TF-IDF ×0.50 · Skill Overlap ×0.30 · Soft Skills ×0.10 · Seniority ×0.10",
    formula: true,
  },
  {
    step: "07",
    label: "Detect CV Seniority Level",
    sub: "Junior / Mid / Senior",
    icon: "🏗️",
    color: "#10b981",
    fn: "estimate_cv_level()",
    detail: "Regex: intern / junior / senior keywords · years extraction via _RE_YEARS · maps to intern_junior / mid / senior",
  },
  {
    step: "08",
    label: "Filter & Rank Job Matches",
    sub: "Sorted by final_score desc",
    icon: "🔢",
    color: "#f59e0b",
    fn: "apply_seniority_handling()",
    detail: "Dedup by title+company · top_n=5 default · seniority_mode: filter / loose · _SENIORITY_ALLOWED map",
  },
  {
    step: "09",
    label: "Generate Final Job Recommendations",
    sub: "Match %, Skills, Missing",
    icon: "🎯",
    color: "#ef4444",
    fn: "_REC_CACHE[rec_key]",
    detail: "matched_skills · missing_skills · soft_skills_matched · soft_score_display · match_level: Excellent / Good / Potential",
    type: "end",
  },
];

/* ══════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════ */
export default function ArchitectureSection() {
  const [expandedStep, setExpandedStep] = useState(null);

  return (
    <>
    <Navbar />
    <section className="arch-section" id="architecture">
      
      <div className="arch-bg-blob arch-bg-blob--1" />
      <div className="arch-bg-blob arch-bg-blob--2" />

      <div className="arch-inner">

        {/* ── Section header ── */}
        <FadeIn>
          <p className="section-tag">— System Architecture</p>
          <h2 className="section-title">
            Two engines, one seamless<br />
            <span>experience</span>
          </h2>
          <p className="arch-intro">
            The platform is split into two independent but connected pipelines —
            CV Validation and Job Recommendation. Each has its own data flow,
            scoring logic, and output format, working together to improve employability.
          </p>
        </FadeIn>

        {/* ════════════════════════════════════════
            DIAGRAM 1 — CV VALIDATION USE-CASE
        ════════════════════════════════════════ */}
        <FadeIn delay={0.06}>
          <div className="diagram-block">
            {/* header */}
            <div className="diagram-block__header">
              <span className="diag-badge diag-badge--blue">Diagram 01</span>
              <h3 className="diagram-block__title">CV Validation — Use Case Flow</h3>
              <p className="diagram-block__sub">CV Validator Pro (Flask Web Application)</p>
            </div>

            {/* ── Use-Case canvas ── */}
            <div className="usecase-canvas">

              {/* Actor */}
              <div className="actor-col">
                <div className="actor-box">
                  <div className="actor-avatar">👤</div>
                  <div className="actor-name">User / Candidate</div>
                </div>
                <div className="actor-line" />
              </div>

              {/* System boundary */}
              <div className="system-boundary">
                <div className="system-boundary__label">Flask Web Application</div>

                {/* ─── FLOW A: Upload + Validate ─── */}
                <div className="uc-flow-a">
                  {/* Trigger */}
                  <div className="uc-trigger-row">
                    <div className="uc-horiz-line" />
                    <div className="uc-pill uc-pill--upload">
                      <span>📤</span> Upload CV (PDF)
                      <span className="uc-pill__fn">is_probably_pdf() · extract_pdf_bundle()</span>
                    </div>
                  </div>

                  {/* Fork lines + parallel nodes */}
                  <div className="uc-fork">
                    <div className="uc-fork__stem" />
                    <div className="uc-fork__branches">
                      <div className="uc-fork__branch uc-fork__branch--top">
                        <div className="uc-fork__arm" />
                        <div className="uc-node" style={{ "--nc": "#4f46e5", borderColor: "#4f46e5" }}>
                          <div className="uc-node__icon">✅</div>
                          <div className="uc-node__name">Run Rule-based Validations</div>
                          <div className="uc-node__detail">13+ checks: page count · email · GitHub · skills · formatting · action verbs · achievements</div>
                          <code className="uc-node__fn" style={{ color: "#4f46e5" }}>_run_analysis()</code>
                        </div>
                      </div>
                      <div className="uc-fork__branch uc-fork__branch--bot">
                        <div className="uc-fork__arm" />
                        <div className="uc-node" style={{ "--nc": "#7c3aed", borderColor: "#7c3aed" }}>
                          <div className="uc-node__icon">🤖</div>
                          <div className="uc-node__name">Run AI / LLM Validation</div>
                          <div className="uc-node__detail">Groq llama-3.3-70b · 9 criteria · temp=0.0 · seed=42 · SHA-256 cache</div>
                          <code className="uc-node__fn" style={{ color: "#7c3aed" }}>validate_with_llm()</code>
                        </div>
                      </div>
                    </div>
                    {/* Merge back */}
                    <div className="uc-fork__merge">
                      <div className="uc-fork__merge-lines">
                        <div className="uc-fork__merge-arm" />
                        <div className="uc-fork__merge-arm" />
                      </div>
                      <div className="uc-fork__merge-stem" />
                    </div>
                  </div>

                  {/* Converge node */}
                  <div className="uc-converge-node" style={{ borderColor: "#0ea5e9" }}>
                    <div className="uc-converge-node__icon">📊</div>
                    <div className="uc-converge-node__name">Calculate Overall &amp; Dimension Scores</div>
                    <div className="uc-converge-node__detail">Weighted avg · Impact / Brevity / Style / Skills · Grade: Excellent / Good / Fair / Needs Improvement</div>
                    <code className="uc-converge-node__fn" style={{ color: "#0ea5e9" }}>calculate_overall_score() · calculate_dimension_scores()</code>
                  </div>

                  {/* Output fork */}
                  <div className="uc-output-fork">
                    <div className="uc-output-fork__stem" />
                    <div className="uc-output-fork__row">
                      <div className="uc-output-node" style={{ borderColor: "#10b981" }}>
                        <span>🗄️</span>
                        <div>
                          <div className="uc-output-node__name">Record Evaluation Results (SQLite)</div>
                          <code className="uc-output-node__fn" style={{ color: "#10b981" }}>save_resume_run()</code>
                        </div>
                      </div>
                      <div className="uc-output-node uc-output-node--result" style={{ borderColor: "#f59e0b" }}>
                        <span>🎯</span>
                        <div>
                          <div className="uc-output-node__name">View CV Evaluation Results</div>
                          <code className="uc-output-node__fn" style={{ color: "#f59e0b" }}>render_template("index.html")</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── FLOW B: Blind Mode ─── */}
                <div className="uc-flow-secondary">
                  <div className="uc-horiz-line uc-horiz-line--short" />
                  <div className="uc-pill uc-pill--blind">
                    <span>🙈</span> Enable Blind Mode (Optional)
                    <span className="uc-pill__fn">apply_blind_mode()</span>
                  </div>
                  <div className="uc-secondary-arrow">→</div>
                  <div className="uc-output-node uc-output-node--inline" style={{ borderColor: "#f59e0b" }}>
                    <span>🎯</span>
                    <div>
                      <div className="uc-output-node__name">View CV Evaluation Results</div>
                      <div className="uc-output-node__detail">Photo &amp; O/L A/L scores neutralised for fairness</div>
                    </div>
                  </div>
                </div>

                {/* ─── FLOW C: Preview ─── */}
                <div className="uc-flow-secondary">
                  <div className="uc-horiz-line uc-horiz-line--short" />
                  <div className="uc-pill uc-pill--preview">
                    <span>👁️</span> Preview Uploaded CV PDF
                    <span className="uc-pill__fn">preview_file()</span>
                  </div>
                  <div className="uc-secondary-arrow">→</div>
                  <div className="uc-output-node uc-output-node--inline" style={{ borderColor: "#f59e0b" }}>
                    <span>🎯</span>
                    <div>
                      <div className="uc-output-node__name">View CV Evaluation Results</div>
                      <div className="uc-output-node__detail">UUID-keyed temp copy · 30-min TTL cleanup</div>
                    </div>
                  </div>
                </div>

              </div>{/* /system-boundary */}
            </div>{/* /usecase-canvas */}
          </div>
        </FadeIn>

        {/* ════════════════════════════════════════
            DIAGRAM 2 — JOB RECOMMENDATION
        ════════════════════════════════════════ */}
        <FadeIn delay={0.06}>
          <div className="diagram-block">
            <div className="diagram-block__header">
              <span className="diag-badge diag-badge--red">Diagram 02</span>
              <h3 className="diagram-block__title">Job Recommendation — Flow Chart</h3>
              <p className="diagram-block__sub">get_job_recommendations() · TF-IDF + Soft Skill + Seniority pipeline</p>
            </div>

            <div className="jobrec-layout">

              {/* ── Left: Vertical flowchart ── */}
              <div className="jobrec-flow">
                {JOB_REC_STEPS.map((step, i) => (
                  <div key={step.step} className="jobrec-step-wrap">
                    <div
                      className={[
                        "jobrec-step",
                        step.highlight ? "jobrec-step--highlight" : "",
                        step.type === "start" ? "jobrec-step--start" : "",
                        step.type === "end"   ? "jobrec-step--end"   : "",
                        expandedStep === step.step ? "jobrec-step--open" : "",
                      ].join(" ")}
                      style={{ "--accent": step.color }}
                      onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                    >
                      <div className="jobrec-step__num" style={{ background: step.color }}>{step.step}</div>
                      <div className="jobrec-step__icon">{step.icon}</div>
                      <div className="jobrec-step__text">
                        <div className="jobrec-step__label">{step.label}</div>
                        <div className="jobrec-step__sub">{step.sub}</div>
                        {expandedStep === step.step && (
                          <div className="jobrec-step__detail-wrap">
                            <p className="jobrec-step__detail">{step.detail}</p>
                            <code className="jobrec-step__fn" style={{ color: step.color, background: `${step.color}14` }}>{step.fn}</code>
                            {step.formula && (
                              <div className="jobrec-inline-formula">
                                {SCORING_FORMULA.map((f) => (
                                  <div key={f.label} className="jobrec-inline-formula__row">
                                    <span style={{ color: f.color, fontWeight: 700, width: "100px", flexShrink: 0 }}>{f.label}</span>
                                    <div className="jobrec-inline-formula__bar">
                                      <div style={{ width: `${f.pct * 2}%`, height: "100%", background: f.color, borderRadius: "3px" }} />
                                    </div>
                                    <span style={{ color: f.color, fontWeight: 700, fontSize: "12px" }}>×{f.pct / 100}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="jobrec-step__chevron">{expandedStep === step.step ? "▲" : "▼"}</div>
                    </div>

                    {i < JOB_REC_STEPS.length - 1 && (
                      <div className="jobrec-connector">
                        <div className="jobrec-connector__line"
                          style={{ background: `linear-gradient(180deg, ${step.color}80, ${JOB_REC_STEPS[i + 1].color}80)` }}
                        />
                        <div className="jobrec-connector__dot" style={{ background: JOB_REC_STEPS[i + 1].color }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── Right: Sidebar with formula + levels + grades ── */}
              <div className="jobrec-sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-card__title">⚖️ Scoring Formula</div>
                  <div className="sidebar-formula-code">
                    <span style={{ color: "#a5f3fc" }}>final_score</span>
                    <span style={{ color: "#94a3b8" }}> = </span>
                    {SCORING_FORMULA.map((f, i) => (
                      <span key={f.label}>
                        <span style={{ color: f.color }}>{f.label.toLowerCase().replace(" ", "_")}</span>
                        <span style={{ color: "#64748b" }}>×{f.pct / 100}</span>
                        {i < SCORING_FORMULA.length - 1 && <span style={{ color: "#94a3b8" }}> + </span>}
                      </span>
                    ))}
                  </div>
                  <div className="sidebar-weights">
                    {SCORING_FORMULA.map((f) => (
                      <div key={f.label} className="sw-row">
                        <div className="sw-row__meta">
                          <span className="sw-row__name">{f.label}</span>
                          <span className="sw-row__desc">{f.desc}</span>
                        </div>
                        <div className="sw-row__bar-wrap">
                          <div className="sw-row__bar">
                            <div className="sw-row__fill" style={{ width: `${f.pct * 2}%`, background: f.color }} />
                          </div>
                          <span className="sw-row__pct" style={{ color: f.color }}>{f.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-card">
                  <div className="sidebar-card__title">📏 Seniority Levels</div>
                  {[
                    { level: "intern_junior", color: "#4f46e5", kw: "intern · trainee · graduate · fresher · junior" },
                    { level: "mid",           color: "#f59e0b", kw: "2–4 years experience" },
                    { level: "senior",         color: "#ef4444", kw: "senior · lead · architect · 5+ yrs" },
                  ].map((lv) => (
                    <div key={lv.level} className="sl-row" style={{ borderLeft: `3px solid ${lv.color}` }}>
                      <div className="sl-row__level" style={{ color: lv.color }}>{lv.level}</div>
                      <div className="sl-row__kw">{lv.kw}</div>
                    </div>
                  ))}
                </div>

                <div className="sidebar-card">
                  <div className="sidebar-card__title">🎯 Match Levels</div>
                  {[
                    { grade: "Excellent", range: "≥ 70%", color: "#10b981" },
                    { grade: "Good",      range: "≥ 50%", color: "#f59e0b" },
                    { grade: "Potential", range: "< 50%", color: "#6b7280" },
                  ].map((g) => (
                    <div key={g.grade} className="ml-chip" style={{ borderColor: `${g.color}40`, background: `${g.color}0f` }}>
                      <span style={{ color: g.color, fontWeight: 700 }}>{g.grade}</span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{g.range}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* /jobrec-layout */}
          </div>
        </FadeIn>

      </div>
     
      
    </section>
     <Footer />
    </>
  );
}