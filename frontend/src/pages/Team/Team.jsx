import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Team.css";
import Footer from "../../components/Footer/Footer";

/* ✅ Import images from assets folder */
import member1Img from "../../assets/member1.png";
import member2Img from "../../assets/member2.png";
import member3Img from "../../assets/member3.png";

import sup1Img from "../../assets/supervisor1.jpeg";
import sup2Img from "../../assets/supervisor2.webp";

const TEAM = [
  {
    name: "K.P.V. Perera",
    reg: "ICT/21/897",
    track: "Software Technology",
    dept: "Department of ICT",
    uni: "University of Sri Jayewardenepura · Faculty of Technology",
    phone: "071-3399389",
    email: "ict21897@fot.sjp.ac.lk",
    accent: "#2563eb",
    photo: member1Img, // ✅ added
  },
  {
    name: "K.K.H. Dewmini",
    reg: "ICT/21/825",
    track: "Software Technology",
    dept: "Department of ICT",
    uni: "University of Sri Jayewardenepura · Faculty of Technology",
    phone: "076-7317696",
    email: "ict21825@fot.sjp.ac.lk",
    accent: "#4f46e5",
    photo: member2Img, // ✅ added
  },
  {
    name: "N.H.A.K.D. Dharmarathna",
    reg: "ICT/21/828",
    track: "Network Technology",
    dept: "Department of ICT",
    uni: "University of Sri Jayewardenepura · Faculty of Technology",
    phone: "072-8250339",
    email: "ict21828@fot.sjp.ac.lk",
    accent: "#0ea5e9",
    photo: member3Img, // ✅ added
  },
];

const SUPERVISORS = [
  {
    badge: "PRINCIPAL SUPERVISOR",
    name: "Dr. D. L. Chamara Pramod Liyanage",
    role: "University of Sri Jayewardenepura",
    email: "dlchamara@sjp.ac.lk",
    quote:
      "Guiding Group 19 through technical orchestration and research methodology validation.",
    gradient:
      "linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)",
    photo: sup1Img, // ✅ added
  },
  {
    badge: "CO-SUPERVISOR",
    name: "Ms. Nirasha Kulasooriya",
    role: "University of Sri Jayewardenepura",
    email: "nirashakulasooriya@sjp.ac.lk",
    quote:
      "Supporting the research direction, evaluation planning, and academic quality assurance.",
    gradient:
      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 65%, #2563eb 100%)",
    photo: sup2Img, // ✅ added
  },
];

function initials(name) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] || "";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

export default function TeamPage() {
  return (
    <main className="teamPage">
      <Navbar />

      {/* HERO */}
      <section className="teamHero">
        <div className="teamHero__blob teamHero__blob--1" />
        <div className="teamHero__blob teamHero__blob--2" />
        <div className="teamHero__dots" />

        <div className="teamHero__inner">
          <div className="teamHero__badge">
            <span className="teamHero__badgeDot" />
            BICT (Hons) Research · Group 19
          </div>

          <h1 className="teamHero__title">
            The <span>Research</span> Team
          </h1>

          <p className="teamHero__sub">
            Department of Information & Communication Technology · Faculty of
            Technology · University of Sri Jayewardenepura.
          </p>

          <div className="teamHero__miniLine" />
        </div>
      </section>

      {/* MEMBERS */}
      <section className="teamSection">
        <div className="teamInner">
          <div className="teamGrid">
            {TEAM.map((m) => (
              <article
                key={m.email}
                className="memberCard"
                style={{ "--accent": m.accent }}
              >
                <div className="memberCard__ring">
                  <div className="memberCard__avatar">
                    {/* ✅ show image if available, else fallback initials */}
                    {m.photo ? (
                      <img
                        className="memberCard__img"
                        src={m.photo}
                        alt={m.name}
                        loading="lazy"
                      />
                    ) : (
                      <span className="memberCard__initials">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>

                  <div className="memberCard__reg">{m.reg}</div>
                </div>

                <h3 className="memberCard__name">{m.name}</h3>

                <div className="memberCard__pill">
                  <span className="memberCard__pillIcon">▦</span>
                  {m.track.toUpperCase()}
                </div>

                <div className="memberCard__meta">
                  <div className="memberCard__metaRow">
                    <span className="memberCard__metaIcon">✉️</span>
                    <a className="memberCard__link" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </div>
                  <div className="memberCard__metaRow">
                    <span className="memberCard__metaIcon">📞</span>
                    <a
                      className="memberCard__link"
                      href={`tel:${m.phone.replace(/[^0-9+]/g, "")}`}
                    >
                      {m.phone}
                    </a>
                  </div>
                </div>

                <div className="memberCard__foot">
                  <div className="memberCard__small">{m.uni}</div>
                  <div className="memberCard__small">{m.dept}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUPERVISORS */}
      <section className="superSection">
        <div className="teamInner">
          <div className="superGrid">
            {SUPERVISORS.map((s) => (
              <div
                key={s.email}
                className="superCard"
                style={{ backgroundImage: s.gradient }}
              >
                {/* ✅ Supervisor image */}
                <div className="superCard__imgWrap">
                  <img
                    className="superCard__img"
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                  />
                </div>

                <div className="superCard__left">
                  <div className="superCard__badge">
                    <span className="superCard__cap">🎓</span> {s.badge}
                  </div>
                  <div className="superCard__name">{s.name}</div>
                  <div className="superCard__role">{s.role}</div>
                  <div className="superCard__line" />
                  <div className="superCard__quote">“{s.quote}”</div>
                </div>

                <a className="superCard__email" href={`mailto:${s.email}`}>
                  {s.email}
                </a>

                <div className="superCard__pattern" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}