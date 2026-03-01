import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { id: "home", label: "Home", type: "page", to: "/" },
  { id: "about", label: "About", type: "page", to: "/about" },
    { id: "architecture", label: "Architecture", type: "page", to: "/architecture" },

  // These are sections on the HOME page
  
  { id: "methodology", label: "Methodology", type: "page", to: "/methodology" },
  { id: "features", label: "Features", type: "page", to: "/feature" },
  { id: "results", label: "Results", type: "page", to: "/results" },
  { id: "team", label: "Team", type: "page", to: "/team" },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (link) => {
    setMenuOpen(false);

    // Page navigation
    if (link.type === "page") {
      navigate(link.to);
      return;
    }

    // Section navigation (on Home page)
    const onHome = location.pathname === "/";

    if (onHome) {
      scrollToId(link.id);
    } else {
      // go to home then scroll after render
      navigate("/", { state: { scrollTo: link.id } });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => handleNav(NAV_LINKS[0])}>
          <div className="navbar__logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12h6M9 16h6M9 8h3M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">CVPro</span>
            <span className="navbar__logo-badge">GROUP 19</span>
          </div>
          <div className="navbar__logo-sub">SRI LANKAN IT RESEARCH</div>
        </div>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`navbar__link ${
                  activeSection === link.id ? "navbar__link--active" : ""
                }`}
                onClick={() => handleNav(link)}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="navbar__link-underline" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className="navbar__cta"
          onClick={() => handleNav({ id: "features", type: "section" })}
        >
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${
            menuOpen ? "navbar__hamburger--open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            className={`navbar__mobile-link ${
              activeSection === link.id ? "navbar__mobile-link--active" : ""
            }`}
            onClick={() => handleNav(link)}
          >
            {link.label}
          </button>
        ))}

        <button
          className="navbar__cta navbar__cta--mobile"
          onClick={() => handleNav({ id: "features", type: "section" })}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}