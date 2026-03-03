import { useEffect, useRef, useState } from "react";
import "./HowToUse.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// ✅ Update these paths to match your project structure
import imgLogin from "../../assets/howto/01.png";
import imgUpload from "../../assets/howto/02.png";
import imgScore from "../../assets/howto/03.png";
import imgChecks from "../../assets/howto/04.png";
import imgDownload from "../../assets/howto/05.png";
import imgJobs from "../../assets/howto/06.png";
import imgFilter from "../../assets/howto/07.png";
import imgApply from "../../assets/howto/08.png";

/* ── Smooth fade-in when in view ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold,
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`htFade ${visible ? "htFade--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

const STEPS = [
  {
    id: "login",
    badge: "Step 01",
    title: "Login & enter the platform",
    desc: "After login, you will see the CV Validator Pro home screen. From here, you can start uploading your CV.",
    bullets: ["Secure access for students", "Clear landing UI to start", "Quick navigation via menu"],
    img: imgLogin,
    tip: "Tip: Use the top “Get Started” button for faster access.",
  },
  {
    id: "upload",
    badge: "Step 02",
    title: "Upload your CV (PDF)",
    desc: "Drop your CV into the upload area or click to select a PDF file. You can optionally enable Blind Mode for fair screening.",
    bullets: ["Drag & drop upload", "PDF format validation", "Blind Mode option (fair screening)"],
    img: imgUpload,
    tip: "Blind Mode reduces bias by ignoring photo and school-exam emphasis.",
  },
  {
    id: "score",
    badge: "Step 03",
    title: "View overall score & summary",
    desc: "After analyzing, you will see your overall score and quick summary of your CV performance.",
    bullets: ["Overall score shown clearly", "Dimension cards (Impact/Brevity/Style/Skills)", "Instant feedback highlights"],
    img: imgScore,
    tip: "Focus first on the lowest dimension score to improve faster.",
  },
  {
    id: "checks",
    badge: "Step 04",
    title: "See validation checks & improvements",
    desc: "Scroll down to see detailed checks (e.g., Email, Keywords, Achievements). You’ll also see what should be improved.",
    bullets: ["Detailed validation list", "Clear suggestions for improvements", "Evidence-based feedback"],
    img: imgChecks,
    tip: "Add quantified achievements (numbers) to boost Impact score quickly.",
  },
  {
    id: "download",
    badge: "Step 05",
    title: "Download your report",
    desc: "You can download or print your CV evaluation report for later use or sharing.",
    bullets: ["Download report option", "Printable output", "Useful for tracking improvements over time"],
    img: imgDownload,
    tip: "Save reports to compare improvements after updating your CV.",
  },
  {
    id: "jobs",
    badge: "Step 06",
    title: "Go to Job Recommendations",
    desc: "Click “Go to Job Recommendations” to view IT job matches based on your CV content.",
    bullets: ["Opens job recommendation page", "Shows match score and job details", "Highlights matched/missing skills"],
    img: imgJobs,
    tip: "Use recommendations to understand what skills recruiters expect.",
  },
  {
    id: "filter",
    badge: "Step 07",
    title: "Filter jobs by seniority level",
    desc: "Use filters (Intern/Junior/Mid/Senior) to see jobs that match your career level.",
    bullets: ["Career level filters", "More relevant results for students", "Reduces unrealistic job matches"],
    img: imgFilter,
    tip: "Start with Intern/Junior to find realistic roles for your current level.",
  },
  {
    id: "apply",
    badge: "Step 08",
    title: "Apply to a job (redirect to job page)",
    desc: "Click “Apply Now” to open the original job posting page and apply directly.",
    bullets: ["Redirect to official job post", "Apply on the real job website", "Safe and direct application flow"],
    img: imgApply,
    tip: "Before applying, improve missing skills shown in the card to raise your match level.",
  },
];

export default function HowToUse() {
  const [activeId, setActiveId] = useState(STEPS[0].id);
  const [modal, setModal] = useState(null);

  // Scrollspy (simple)
  useEffect(() => {
    const handler = () => {
      const offsets = STEPS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Number.POSITIVE_INFINITY };
        return { id: s.id, top: el.getBoundingClientRect().top };
      });

      // choose the closest section near top
      const near = offsets
        .filter((x) => x.top < 160)
        .sort((a, b) => b.top - a.top)[0];

      if (near?.id) setActiveId(near.id);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      

      <section className="htSection" id="howto">
        <div className="htBlob htBlob--1" />
        <div className="htBlob htBlob--2" />
        <div className="htDots" />

        <div className="htInner">
          {/* Header */}
          <FadeIn>
            <p className="htTag">— How to Use</p>
            <h2 className="htTitle">
              Learn the full flow in <span>8 simple steps</span>
            </h2>
            <p className="htLead">
              Upload your CV → get a score + improvements → download the report → receive job recommendations →
              filter by level → apply to real jobs.
            </p>
          </FadeIn>

          <div className="htLayout">
            {/* Sticky mini-nav */}
            <aside className="htSide">
              <div className="htSideCard">
                <div className="htSideTitle">Quick Steps</div>
                <div className="htSideList">
                  {STEPS.map((s) => (
                    <button
                      key={s.id}
                      className={`htSideItem ${activeId === s.id ? "htSideItem--active" : ""}`}
                      onClick={() => jumpTo(s.id)}
                    >
                      <span className="htSideBadge">{s.badge}</span>
                      <span className="htSideText">{s.title}</span>
                    </button>
                  ))}
                </div>

                <div className="htSideFooter">
                  <button className="htTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    ↑ Back to Top
                  </button>
                </div>
              </div>
            </aside>

            {/* Steps */}
            <main className="htMain">
              {STEPS.map((s, i) => (
                <FadeIn key={s.id} delay={i * 0.05}>
                  <section className="htStep" id={s.id}>
                    <div className="htStepHead">
                      <div className="htStepBadge">{s.badge}</div>
                      <div className="htStepTitleWrap">
                        <h3 className="htStepTitle">{s.title}</h3>
                        <p className="htStepDesc">{s.desc}</p>
                      </div>
                    </div>

                    <div className="htStepGrid">
                      {/* Image */}
                      <button
                        type="button"
                        className="htShot"
                        onClick={() => setModal({ title: s.title, desc: s.desc, img: s.img })}
                      >
                        <div className="htShotTop">
                          <span className="htZoom">Click to zoom</span>
                        </div>
                        <img src={s.img} alt={s.title} />
                      </button>

                      {/* Content */}
                      <div className="htStepBody">
                        <div className="htBullets">
                          {s.bullets.map((b) => (
                            <div key={b} className="htBullet">
                              <span className="htBulletDot">✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>

                        <div className="htTip">
                          <div className="htTipTitle">Quick tip</div>
                          <div className="htTipText">{s.tip}</div>
                        </div>

                        <div className="htActions">
                          {i > 0 && (
                            <button className="htNavBtn htNavBtn--ghost" onClick={() => jumpTo(STEPS[i - 1].id)}>
                              ← Previous
                            </button>
                          )}
                          {i < STEPS.length - 1 && (
                            <button className="htNavBtn" onClick={() => jumpTo(STEPS[i + 1].id)}>
                              Next → 
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </FadeIn>
              ))}
            </main>
          </div>
        </div>

        {/* Modal / Lightbox */}
        {modal && (
          <div className="htModal" role="dialog" aria-modal="true">
            <button className="htModalBackdrop" onClick={() => setModal(null)} aria-label="Close" />
            <div className="htModalCard">
              <div className="htModalTop">
                <div>
                  <div className="htModalTitle">{modal.title}</div>
                  <div className="htModalDesc">{modal.desc}</div>
                </div>
                <button className="htModalClose" onClick={() => setModal(null)}>
                  ✕
                </button>
              </div>
              <div className="htModalImgWrap">
                <img src={modal.img} alt={modal.title} />
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}