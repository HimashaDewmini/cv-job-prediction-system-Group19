import { useState, useEffect, useRef } from "react";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/* ── Reusable scroll-in animation hook ── */
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

export default function AboutPage() {
  return (
    <main className="about">
      <Navbar />

      {/* ════════ INTRODUCTION & BACKGROUND ════════ */}
      <section className="research-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Introduction & Background</p>
            <h2 className="section-title">
              Why this research matters in<br />
              <span>Sri Lanka’s IT recruitment</span>
            </h2>

            <p className="research-lead">
              Recruitment is rapidly shifting toward Applicant Tracking Systems (ATS), online job portals,
              and automated recommendation platforms. As a result, job seekers must present their qualifications
              in well-structured, machine-readable CVs. In Sri Lanka’s IT sector, many students struggle with
              professional CV writing, missing technical keywords, limited project evidence, and weak portfolios
              such as GitHub — which reduces their chances during automated screening.
            </p>
          </FadeIn>

          <div className="research-grid">
            <FadeIn delay={0.05}>
              <div className="research-card">
                <div className="research-card__head">
                  <span className="research-card__icon">🧩</span>
                  <h3 className="research-card__title">The Problem Context</h3>
                </div>
                <p className="research-card__text">
                  Hundreds of IT vacancies are posted daily on Sri Lankan platforms like TopJobs.lk and Ikman.lk.
                  Each job demands different skills and role specialization. Manually reviewing job posts is time-consuming,
                  which causes students to miss opportunities that match their qualifications.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="research-card">
                <div className="research-card__head">
                  <span className="research-card__icon">🌍</span>
                  <h3 className="research-card__title">Gap in Existing Tools</h3>
                </div>
                <p className="research-card__text">
                  International tools such as JobScan and Resume Worded often require paid subscriptions and mainly target
                  Western job markets. They rarely reflect Sri Lankan recruiter expectations and do not use local job portals,
                  limiting their usefulness for Sri Lankan IT job seekers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="research-card">
                <div className="research-card__head">
                  <span className="research-card__icon">✅</span>
                  <h3 className="research-card__title">Our Research Solution</h3>
                </div>
                <p className="research-card__text">
  This study proposes a localized and integrated platform that first evaluates and improves CV quality based on Sri Lankan 
  HR validation criteria. The system provides detailed feedback by identifying missing or weak elements such as technical skills,
   professional summary, GitHub links, formatting quality, and quantifiable achievements, and suggests specific improvements to enhance 
   the CV. After validation and feedback, the platform recommends suitable IT job opportunities from Sri Lankan job portals by matching 
   the candidate’s validated skills and profile with real market demand.
</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════ PROJECT SCOPE ════════ */}
      <section className="scope-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Project Scope</p>
            <h2 className="section-title">
              What the system covers<br />
              <span>and what it does not</span>
            </h2>
          </FadeIn>

          <div className="scope-grid">
            <FadeIn delay={0.06}>
              <div className="scope-box scope-box--yes">
                <h3 className="scope-box__title">Included</h3>
                <ul className="scope-list">
                  <li>Focus on Sri Lankan IT jobs (software development + internships)</li>
                  <li>Accept English CVs (PDF / Word)</li>
                  <li>Analyze structure, formatting, skills, professionalism</li>
                  <li>Give personalized feedback for CV improvement</li>
                  <li>Recommend jobs using TopJobs.lk and Ikman.lk data</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="scope-box scope-box--no">
                <h3 className="scope-box__title">Not Included</h3>
                <ul className="scope-list">
                  <li>CVs written in Sinhala or Tamil</li>
                 
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════ MOTIVATION & JUSTIFICATION ════════ */}
      <section className="motivation-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Motivation & Justification</p>
            <h2 className="section-title">
              Why we built a<br />
              <span>localized integrated system</span>
            </h2>
          </FadeIn>

          <div className="motivation-grid">
            <FadeIn delay={0.05}>
              <div className="motivation-card">
                <div className="motivation-card__icon">🎓</div>
                <h3 className="motivation-card__title">Student Challenges</h3>
                <p className="motivation-card__text">
                  Many students lack guidance in preparing professional CVs. Common problems include weak structure,
                  missing technical keywords, limited project evidence, and missing GitHub/portfolio links.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="motivation-card">
                <div className="motivation-card__icon">🔍</div>
                <h3 className="motivation-card__title">Job Search Overload</h3>
                <p className="motivation-card__text">
                  Sri Lankan job portals publish many vacancies daily. Manual searching is inefficient and students often miss
                  suitable opportunities that match their profile.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="motivation-card">
                <div className="motivation-card__icon">🧠</div>
                <h3 className="motivation-card__title">Research Gap</h3>
                <p className="motivation-card__text">
                  Existing systems often treat CV improvement and job recommendation as separate problems.
                  Our research combines both — improving the CV first and then matching to jobs using Sri Lankan market data.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════ RESEARCH OBJECTIVES ════════ */}
      <section className="objectives-section">
        <div className="section-inner">
          <FadeIn>
            <p className="section-tag">— Research Objectives</p>
            <h2 className="section-title">
              What this research aims<br />
              <span>to achieve</span>
            </h2>
          </FadeIn>

          <div className="obj-wrap">
            <FadeIn delay={0.05}>
              <div className="obj-main">
                <div className="obj-main__badge">Main Objective</div>
                <p className="obj-main__text">
                  Develop a CV Enhancement and Job Opportunity Recommendation System that follows Sri Lankan IT industry
                  requirements and helps users find suitable jobs in the local market.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="obj-grid">
                <div className="obj-card">
                  <h3 className="obj-card__title">1) Create a CV Analysis System</h3>
                  <p className="obj-card__text">
                    Read PDF/Word CVs, extract skills, education, experience and key evidence, and generate personalized
                    feedback to improve structure, formatting, and professionalism.
                  </p>
                </div>

                <div className="obj-card">
                  <h3 className="obj-card__title">2) Develop a Job Recommendation System</h3>
                  <p className="obj-card__text">
                    Match CV-based profile data with job requirements from TopJobs.lk and Ikman.lk and recommend relevant
                    IT roles beyond simple keyword matching.
                  </p>
                </div>

                <div className="obj-card">
                  <h3 className="obj-card__title">3) Build a User-Centric Interface</h3>
                  <p className="obj-card__text">
                    Provide a simple interface for students to upload CVs, view scores, receive actionable feedback, and
                    explore recommended jobs easily without premium barriers.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}