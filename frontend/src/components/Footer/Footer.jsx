import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const chips = [
    { icon: "📄", label: "CV Analysis Engine" },
    { icon: "🧠", label: "AI Skill Extraction" },
    { icon: "🎯", label: "Job Recommendation" },
    { icon: "🛡️", label: "Blind Mode Fairness" },
  ];

  const outcomes = [
    "Automatic extraction of skills, experience, and CV structure",
    "AI-powered scoring based on Sri Lankan HR recruitment criteria",
    "Skill-based job recommendation using real IT job market data",
    "Blind Mode reduces bias by hiding sensitive personal information",
    "Personalized feedback to improve CV quality and ATS compatibility",
  ];

  const tags = [
    "CV Validator",
    "AI Recruitment",
    "Job Recommendation",
    "Sri Lanka IT Market",
    "Fair Hiring",
  ];

  return (
    <footer className="as-footer">
      <div className="as-container">
        <div className="as-top">
          {/* LEFT COLUMN */}
          <div className="as-col as-brand">
            <h3 className="as-title">
              CV Validator & Job Recommendation System
            </h3>

            <p className="as-desc">
              An AI-powered system designed to analyze CVs, evaluate candidate
              readiness, and recommend relevant IT jobs using real Sri Lankan
              recruitment criteria. The system uses intelligent skill
              extraction, structured scoring, and fairness-focused Blind Mode to
              support unbiased hiring and student career development.
            </p>

            <div className="as-chips">
              {chips.map((chip) => (
                <span className="as-chip" key={chip.label}>
                  <span className="as-chipIcon">{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="as-meta">
              <span>© {year}</span>
              <span className="as-dot">✦</span>
              <span>Group 19</span>
              <span className="as-dot">✦</span>
              <span>University of Sri Jayewardenepura</span>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="as-col">
            <h4 className="as-subtitle">Key Research Outcomes</h4>

            <ul className="as-list">
              {outcomes.map((item, index) => (
                <li key={index} className="as-li">
                  <span className={`as-bullet as-bullet--${index % 4}`} />
                  <span className="as-liText">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN */}
          <div className="as-col as-right">
            <h4 className="as-subtitle">Research Links</h4>

            <div className="as-linkStack">
              <a
                href="https://github.com/HimashaDewmini/cv-job-prediction-system-Group19.git"
                target="_blank"
                rel="noopener noreferrer"
                className="as-linkBtn"
              >
                <span className="as-linkIcon">💻</span>
                <span className="as-linkText">GitHub Repository</span>
                <span className="as-linkHint">↗</span>
              </a>

              <button
                type="button"
                className="as-linkBtn"
                onClick={() =>
                  window.open(
                    "https://github.com/HimashaDewmini/cv-job-prediction-system-Group19",
                    "_blank",
                  )
                }
              >
                <span className="as-linkIcon">🎥</span>
                <span className="as-linkText">System Demo / Presentation</span>
                <span className="as-linkHint">↗</span>
              </button>
            </div>

            <div className="as-noteCard">
              <div className="as-noteTitle">Project Summary</div>

              <p className="as-noteText">
                This research project develops an AI-based CV validation and job
                recommendation platform specifically for the Sri Lankan IT job
                market. It integrates machine learning, natural language
                processing, and real recruitment insights to provide accurate,
                fair, and personalized career guidance.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="as-bottom">
          <div className="as-bottomLeft">
            Built with React + Flask + Groq LLM ✦ Final Year Research Project
          </div>

          <div className="as-bottomRight">
            {tags.map((tag, index) => (
              <span key={tag} className="as-tag">
                {index !== 0 && <span className="as-tagSep">✦</span>}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
