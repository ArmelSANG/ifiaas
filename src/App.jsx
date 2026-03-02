import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════ */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #06080d;
    --surface: #0d1018;
    --surface2: #131720;
    --white: #f0ede6;
    --muted: rgba(240,237,230,0.45);
    --green: #0d6e3f;
    --green2: #1aa860;
    --accent: #00f5a0;
    --gold: #d4a843;
    --gold2: #f0c860;
    --border: rgba(240,237,230,0.07);

    --px: clamp(1.2rem, 5vw, 5rem);
    --section-py: clamp(4rem, 8vw, 8rem);
  }

  html { scroll-behavior: smooth; font-size: 16px; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Syne', sans-serif;
    overflow-x: hidden;
    cursor: none;
    -webkit-font-smoothing: antialiased;
  }

  * { cursor: none !important; }

  @media (hover: none) {
    * { cursor: auto !important; }
    body { cursor: auto; }
  }

  a { text-decoration: none; color: inherit; }

  ::selection { background: rgba(0,245,160,0.2); color: var(--accent); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--green); border-radius: 2px; }

  /* Noise overlay */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 8000;
    opacity: 0.4;
  }

  /* ── Keyframes ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-16px); } }
  /* Mobile: forcer la visibilité hero */
  @media (max-width: 900px) {
    .hero-force-visible { opacity:1 !important; transform:none !important; animation:none !important; }
  }
  @keyframes gridMove { from { transform:translateY(0); } to { transform:translateY(60px); } }
  @keyframes ticker   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes pulse    { 0%,100% { opacity:.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.12); } }
  @keyframes spinC    { from { transform:translate(-50%,-50%) rotate(0deg); } to { transform:translate(-50%,-50%) rotate(360deg); } }
  @keyframes scanline { 0% { top:-4%; } 100% { top:106%; } }
  @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }

  /* ── Reveal ── */
  .rv { opacity:0; transform:translateY(44px); transition:opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1); }
  .rv.in { opacity:1; transform:translateY(0); }
  .rv.d1 { transition-delay:.1s; }
  .rv.d2 { transition-delay:.2s; }
  .rv.d3 { transition-delay:.32s; }

  /* ── Nav link ── */
  .nl { font-family:'JetBrains Mono',monospace; font-size:.7rem; letter-spacing:.15em; text-transform:uppercase; color:var(--muted); position:relative; transition:color .3s; }
  .nl::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:var(--accent); transition:width .3s; }
  .nl:hover { color:var(--accent); }
  .nl:hover::after { width:100%; }

  /* ── Platform tab ── */
  .ptab { border:none; transition:all .3s; }
  .ptab:hover { background:rgba(240,237,230,.04) !important; }

  /* ── Domain item ── */
  .di { transition:padding-left .4s cubic-bezier(.16,1,.3,1), border-color .4s; }
  .di:hover { padding-left:1.4rem !important; border-left-color:var(--accent) !important; }

  /* ── Skill tag ── */
  .sk { transition:border-color .3s, color .3s, background .3s; }
  .sk:hover { border-color:var(--accent) !important; color:var(--accent) !important; background:rgba(0,245,160,.05) !important; }

  /* ── Footer link ── */
  .fl { display:block; transition:color .3s; }
  .fl:hover { color:var(--accent) !important; }

  /* ── Highlight row ── */
  .hi { transition:background .3s, transform .2s, padding-left .2s; }
  .hi:hover { background:rgba(0,245,160,.07) !important; padding-left:.5rem; }

  /* ── Project card ── */
  .pj { transition:transform .35s; }
  .pj:hover { transform:translateY(-5px); }

  /* ── CTA btn ── */
  .ctab { transition:transform .2s, filter .2s; }
  .ctab:hover { transform:translateY(-3px); filter:brightness(1.1); }

  /* ══════════════════════════════
     RESPONSIVE BREAKPOINTS
  ══════════════════════════════ */

  /* Tablet ≤ 900px */
  @media (max-width: 900px) {
    .hero-grid    { grid-template-columns: 1fr !important; }
    .hero-right   { display: none !important; }
    .domains-grid { grid-template-columns: 1fr !important; }
    .domain-vis   { display: none !important; }
    .proj-grid    { grid-template-columns: 1fr !important; }
    .founder-grid { grid-template-columns: 1fr !important; }
    .footer-grid  { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
    .nav-links    { display: none !important; }
  }

  /* Mobile ≤ 600px */
  @media (max-width: 600px) {
    .plat-tabs    { grid-template-columns: 1fr !important; }
    .plat-detail  { grid-template-columns: 1fr !important; }
    .price-grid   { grid-template-columns: 1fr 1fr !important; }
    .footer-grid  { grid-template-columns: 1fr !important; }
    .hero-stats   { gap: 1.5rem !important; }
    .cta-btns     { flex-direction: column !important; align-items: center !important; }
    .founder-contacts { flex-direction: column !important; }
    .proj-inner   { grid-template-columns: 1fr !important; }
  }

  /* Very small ≤ 380px */
  @media (max-width: 380px) {
    .hero-stats   { flex-wrap: wrap !important; }
  }
`;

/* ── Inject styles once ── */
if (!document.getElementById("ifiaas-styles")) {
  const s = document.createElement("style");
  s.id = "ifiaas-styles";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════ */
const Tag = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1.2rem" }}>
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".67rem", letterSpacing: ".25em", textTransform: "uppercase", color: "var(--accent)" }}>{label}</span>
    <div style={{ width: 36, height: 1, background: "var(--accent)" }} />
  </div>
);

const SectionTitle = ({ children, style = {} }) => (
  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3.6rem)", fontWeight: 600, lineHeight: 1.08, ...style }}>{children}</h2>
);

const Corner = ({ pos, color = "var(--accent)", size = 55 }) => {
  const styles = {
    tl: { top: -8, left: -8, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: -8, right: -8, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: -8, left: -8, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: -8, right: -8, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return <div style={{ position: "absolute", width: size, height: size, ...styles[pos] }} />;
};

/* ═══════════════════════════════════════════
   CURSOR  (hidden on touch devices)
═══════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rp = useRef({ x: 0, y: 0 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) { setTouch(true); return; }

    const mv = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX - 5 + "px"; dot.current.style.top = e.clientY - 5 + "px"; }
    };
    const big = () => dot.current && (dot.current.style.transform = "scale(2.8)");
    const sm  = () => dot.current && (dot.current.style.transform = "scale(1)");
    document.addEventListener("mousemove", mv);
    document.querySelectorAll("a,button").forEach((el) => { el.addEventListener("mouseenter", big); el.addEventListener("mouseleave", sm); });

    let raf;
    const loop = () => {
      rp.current.x += (pos.current.x - rp.current.x - 18) * 0.1;
      rp.current.y += (pos.current.y - rp.current.y - 18) * 0.1;
      if (ring.current) { ring.current.style.left = rp.current.x + "px"; ring.current.style.top = rp.current.y + "px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { document.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);

  if (touch) return null;
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 10, height: 10, background: "var(--accent)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transition: "transform .18s", mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", width: 36, height: 36, border: "1px solid rgba(0,245,160,.32)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998 }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   NAV
═══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [["Plateformes", "#plateformes"], ["Domaines", "#domaines"], ["Projets", "#projets"], ["Fondateur", "#fondateur"]];

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: `1.3rem var(--px)`, display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", background: scrolled ? "rgba(6,8,13,.9)" : "transparent", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition: "all .5s" }}>
        <a href="#" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1.15rem", fontWeight: 700, letterSpacing: ".2em", color: "var(--accent)" }}>IFIAAS</a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
          {links.map(([l, h]) => <a key={l} href={h} className="nl">{l}</a>)}
        </div>

        {/* Desktop CTA */}
        <a href="https://wa.me/22967455462" target="_blank" rel="noreferrer"
          className="nav-links"
          style={{ background: "var(--accent)", color: "#000", padding: ".55rem 1.5rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", clipPath: "polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)", transition: "background .3s" }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--gold2)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--accent)"}>
          Contact
        </a>

        {/* Hamburger (mobile) */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", padding: ".5rem", flexDirection: "column", gap: "5px" }}
          className="hamburger">
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: menuOpen && i === 1 ? "transparent" : "var(--accent)", borderRadius: 2, transition: "all .3s", transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none" }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 490, background: "rgba(6,8,13,.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem" }}>
          {links.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,8vw,3rem)", fontWeight: 600, color: "var(--white)", transition: "color .3s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--white)"}>
              {l}
            </a>
          ))}
          <a href="https://wa.me/22967455462" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
            style={{ marginTop: "1rem", background: "var(--accent)", color: "#000", padding: ".9rem 2.5rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".82rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
            WhatsApp
          </a>
        </div>
      )}

      {/* Inject hamburger visibility via style */}
      <style>{`
        @media (max-width: 900px) {
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
function Hero() {
  const words = ["l'informatique", "la finance", "l'agriculture", "GigaZone WiFi", "la tontine digitale"];
  const [typed, setTyped] = useState("");
  const wi = useRef(0), ci = useRef(0), del = useRef(false);

  useEffect(() => {
    let t;
    const run = () => {
      const w = words[wi.current];
      if (!del.current) {
        ci.current++;
        setTyped(w.slice(0, ci.current));
        if (ci.current === w.length) { del.current = true; t = setTimeout(run, 1900); return; }
      } else {
        ci.current--;
        setTyped(w.slice(0, ci.current));
        if (ci.current === 0) { del.current = false; wi.current = (wi.current + 1) % words.length; }
      }
      t = setTimeout(run, del.current ? 55 : 100);
    };
    t = setTimeout(run, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", padding: `clamp(7rem,14vw,11rem) var(--px) clamp(4rem,8vw,7rem)`, position: "relative", overflow: "hidden" }}>
      {/* BG layers */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,160,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.032) 1px,transparent 1px)", backgroundSize: "60px 60px", animation: "gridMove 15s linear infinite" }} />
        {[[600, "rgba(13,110,63,.17)", "-10%", null, "-5%", null], [420, "rgba(212,168,67,.11)", "38%", null, null, "3%"], [280, "rgba(0,245,160,.08)", null, "8%", "18%", null]].map(([s, bg, top, bottom, left, right], i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", background: bg, filter: "blur(80px)", top, bottom, left, right, animation: `float ${10 + i}s ease-in-out infinite`, animationDelay: `${-i * 3}s` }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(0,245,160,.14),transparent)", animation: "scanline 8s linear infinite" }} />
      </div>

      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }}>
        {/* LEFT */}
        <div>
          <div className="hero-force-visible" style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "2.2rem", animation: "fadeUp .8s .1s both" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.6rem,.8vw,.7rem)", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent)" }}>Bénin · Innovation · Impact</span>
          </div>

          <h1 className="hero-force-visible" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.6rem,5.5vw,5.5rem)", lineHeight: 1.05, fontWeight: 600, marginBottom: "1.8rem", animation: "fadeUp .8s .25s both" }}>
            Construire l'avenir<br />
            par{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>
              {typed}<span style={{ animation: "blink 1s infinite", color: "var(--accent)" }}>|</span>
            </em>
          </h1>

          <p className="hero-force-visible" style={{ fontSize: "clamp(.88rem,1.2vw,1rem)", lineHeight: 1.82, color: "var(--muted)", maxWidth: 460, marginBottom: "2.5rem", animation: "fadeUp .8s .4s both" }}>
            IFIAAS crée des outils numériques concrets — WiFi rentable, tontine digitale, chat IA. Des solutions bâties depuis Zinvié, Bénin, pour l'Afrique et le monde.
          </p>

          <div className="hero-force-visible" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp .8s .55s both" }}>
            <a href="#plateformes"
              style={{ background: "var(--green)", color: "var(--white)", padding: ".95rem 2rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.72rem,.85vw,.8rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", transition: "background .3s, transform .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--green2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Nos plateformes →
            </a>
            <a href="#fondateur"
              style={{ background: "transparent", color: "var(--white)", padding: ".95rem 2rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.72rem,.85vw,.8rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)", transition: "border-color .3s, color .3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--white)"; }}>
              À propos
            </a>
          </div>

          <div className="hero-stats hero-force-visible" style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", animation: "fadeUp .8s .7s both", flexWrap: "wrap" }}>
            {[["3+", "Plateformes live"], ["3", "Secteurs clés"], ["∞", "Vision & projets"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(1.6rem,2.5vw,2rem)", color: "var(--accent)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.55rem,.65vw,.62rem)", color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-right" style={{ position: "relative", height: "min(520px,50vw)" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(280px,26vw)", height: "min(280px,26vw)", borderRadius: "50%", background: "radial-gradient(ellipse at 40% 35%,rgba(0,245,160,.15) 0%,rgba(13,110,63,.08) 50%,transparent 70%)", border: "1px solid rgba(0,245,160,.12)", animation: "float 8s ease-in-out infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "rgba(0,245,160,.3)", fontStyle: "italic" }}>IFI</span>
          </div>
          {[[340, "rgba(0,245,160,.06)", 30], [430, "rgba(212,168,67,.05)", 50]].map(([s, c, d]) => (
            <div key={s} style={{ position: "absolute", top: "50%", left: "50%", width: s, height: s, borderRadius: "50%", border: `1px dashed ${c}`, animation: `spinC ${d}s linear infinite`, marginTop: -s / 2, marginLeft: -s / 2 }} />
          ))}
          {[
            { icon: "📶", label: "GigaZone WiFi Pro", sub: "z.ifiaas.com", top: "4%", left: "-5%" , delay: "0s" },
            { icon: "🏦", label: "ifiMoney — Tontine", sub: "money.ifiaas.com", top: "37%", right: "-8%", delay: "-2.5s" },
            { icon: "💬", label: "ifiChat Live", sub: "chat.ifiaas.com", bottom: "10%", left: "7%", delay: "-5s" },
          ].map((c) => (
            <div key={c.sub} style={{ position: "absolute", top: c.top, left: c.left, right: c.right, bottom: c.bottom, background: "rgba(13,16,24,.88)", backdropFilter: "blur(20px)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.3rem", animation: `float 7s ease-in-out infinite`, animationDelay: c.delay, minWidth: 155 }}>
              <div style={{ fontSize: "1.3rem", marginBottom: ".4rem" }}>{c.icon}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", color: "var(--accent)", letterSpacing: ".1em", marginBottom: ".2rem" }}>{c.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: "var(--muted)" }}>{c.sub}</div>
            </div>
          ))}
          <div style={{ position: "absolute", top: 0, right: 0, width: 55, height: 55, borderTop: "2px solid rgba(0,245,160,.2)", borderRight: "2px solid rgba(0,245,160,.2)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 55, height: 55, borderBottom: "2px solid rgba(212,168,67,.2)", borderLeft: "2px solid rgba(212,168,67,.2)" }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TICKER
═══════════════════════════════════════════ */
function Ticker() {
  const items = ["GigaZone WiFi Pro", "ifiMoney Tontine", "ifiChat Live", "Marketplace Crypto", "WiFi < 50 000 FCFA", "100% Légal ARCEP", "Finance Numérique", "Agriculture Tech", "Zinvié · Bénin · Monde"];
  return (
    <div style={{ background: "var(--green)", padding: ".9rem 0", overflow: "hidden", whiteSpace: "nowrap", borderTop: "1px solid rgba(0,245,160,.2)", borderBottom: "1px solid rgba(0,245,160,.2)" }}>
      <div style={{ display: "inline-flex", gap: "3rem", animation: "ticker 30s linear infinite" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.65rem,.75vw,.72rem)", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(240,237,230,.88)", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {t}<span style={{ color: "var(--gold2)", fontSize: ".4rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PLATFORMS
═══════════════════════════════════════════ */
function Platforms() {
  const isMobile = useIsMobile();
  const platforms = [
    {
      icon: "📶", domain: "z.ifiaas.com", name: "GigaZone WiFi Pro",
      badge: "🟢 En ligne", tagline: "Lancez votre WifiZone au Bénin",
      color: "var(--accent)",
      desc: "Transformez n'importe quel routeur en hotspot WiFi rentable. Système de tickets, parrainage intégré, 100% légal ARCEP Bénin. Installation gratuite par les techniciens IFIAAS. Démarrez avec moins de 50 000 FCFA et encaissez 100% de vos ventes.",
      highlights: ["100% légal — autorisé ARCEP Bénin", "Installation gratuite par nos techniciens", "Vous gardez 100% de vos bénéfices", "Système de parrainage & commissions", "Disponible dans tout le Bénin"],
      extra: { title: "Exemples de forfaits", items: [["1h Ultra (50Mbps)", "100 FCFA"], ["3h Ultra", "200 FCFA"], ["1 Jour Nav.", "200 FCFA"], ["7 Jours Nav.", "900 FCFA"], ["30 Jours Nav.", "3 000 FCFA"], ["VPN intégré", "inclus"]] },
      url: "https://z.ifiaas.com"
    },
    {
      icon: "🏦", domain: "money.ifiaas.com", name: "ifiMoney",
      badge: "🟢 En ligne", tagline: "Tontine numérique sécurisée",
      color: "var(--gold2)",
      desc: "ifiMoney digitalise la tontine africaine. Gérez vos groupes d'épargne collective en ligne — cotisations automatisées, tours de paiement transparents, suivi en temps réel. La confiance de la tontine traditionnelle, avec la sécurité du numérique.",
      highlights: ["Tontine 100% numérique & sécurisée", "Gestion de groupes d'épargne", "Suivi en temps réel", "Transparence totale", "Accessible partout, sur mobile"],
      url: "https://money.ifiaas.com"
    },
    {
      icon: "💬", domain: "chat.ifiaas.com", name: "ifiChat",
      badge: "🟢 En ligne", tagline: "Chat Live intégré à Telegram",
      color: "#7ecfff",
      desc: "ifiChat est une interface de chat en temps réel connectée nativement à Telegram. Communiquez avec votre audience, gérez votre support client et animez votre communauté depuis une interface fluide et unifiée.",
      highlights: ["Chat live en temps réel", "Intégration Telegram native", "Support client intégré", "Communauté connectée", "Accessible sur tous appareils"],
      url: "https://chat.ifiaas.com"
    }
  ];

  const [active, setActive] = useState(0);
  const p = platforms[active];

  return (
    <section id="plateformes" style={{ padding: `var(--section-py) var(--px)`, background: "var(--surface)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -300, right: -300, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(13,110,63,.1) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div className="rv" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
        <Tag label="Plateformes" />
        <SectionTitle style={{ marginBottom: "1rem" }}>Déjà <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>en ligne</em></SectionTitle>
        <p style={{ color: "var(--muted)", fontSize: "clamp(.85rem,1.1vw,.95rem)", lineHeight: 1.78, maxWidth: 520 }}>
          Trois produits opérationnels — WiFi, épargne collective et communication. Sélectionnez une plateforme pour en savoir plus.
        </p>
      </div>

      {/* Tabs */}
      <div className="rv plat-tabs" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border)", marginBottom: "1px" }}>
        {platforms.map((pl, i) => (
          <button key={i} onClick={() => setActive(i)} className="ptab"
            style={{ padding: "clamp(.9rem,2vw,1.4rem) 1rem", background: active === i ? "rgba(0,245,160,.05)" : "var(--surface2)", borderBottom: active === i ? `2px solid ${pl.color}` : "2px solid transparent", color: active === i ? pl.color : "var(--muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.6rem,.8vw,.72rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem" }}>
            <span style={{ fontSize: isMobile ? "1rem" : "1.1rem" }}>{pl.icon}</span>
            <span>{isMobile ? pl.name.split(" ")[0] : pl.name}</span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="rv plat-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
        {/* Left: description */}
        <div style={{ background: "var(--surface)", padding: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{p.icon}</span>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.58rem,.7vw,.65rem)", color: p.color, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".3rem" }}>{p.badge} · {p.domain}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 600 }}>{p.name}</div>
            </div>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1rem,1.5vw,1.2rem)", fontStyle: "italic", color: p.color, marginBottom: "1.2rem" }}>{p.tagline}</div>
          <p style={{ fontSize: "clamp(.82rem,1vw,.9rem)", color: "var(--muted)", lineHeight: 1.88, marginBottom: "2rem" }}>{p.desc}</p>
          <a href={p.url} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: p.color, color: "#000", padding: ".8rem 1.8rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.68rem,.8vw,.75rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)", transition: "filter .3s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Visiter ↗
          </a>
        </div>

        {/* Right: highlights + forfaits */}
        <div style={{ background: "var(--surface2)", padding: "clamp(2rem,4vw,3.5rem)" }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.2rem" }}>Points clés</div>
          {p.highlights.map((h, i) => (
            <div key={i} className="hi" style={{ padding: ".8rem 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem", borderRadius: 4, paddingLeft: 0 }}>
              <span style={{ color: p.color, minWidth: 18, fontSize: ".95rem" }}>✓</span>
              <span style={{ fontSize: "clamp(.78rem,1vw,.87rem)" }}>{h}</span>
            </div>
          ))}
          {p.extra && (
            <div style={{ marginTop: "1.8rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>{p.extra.title}</div>
              <div className="price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                {p.extra.items.map(([d, v]) => (
                  <div key={d} style={{ background: "rgba(0,245,160,.05)", border: "1px solid rgba(0,245,160,.1)", padding: ".65rem .9rem", borderRadius: 4 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".58rem", color: "var(--muted)", marginBottom: ".2rem" }}>{d}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".9rem", color: "var(--accent)", fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DOMAINS
═══════════════════════════════════════════ */
function Domains() {
  const domains = [
    { num: "01", title: "💻 Informatique", desc: "Développement fullstack, architecture système, applications web & mobile. Des solutions robustes conçues pour répondre aux besoins concrets des entreprises africaines et internationales." },
    { num: "02", title: "📊 Finance & Épargne", desc: "Finance digitale et tontine numérique. ifiMoney modernise l'épargne collective africaine, pendant qu'une marketplace crypto se prépare en coulisses." },
    { num: "03", title: "🌱 Agriculture Tech", desc: "Digitalisation des pratiques agricoles, outils de monitoring et de gestion. La technologie au service de la productivité agricole africaine." },
  ];

  return (
    <section id="domaines" style={{ padding: `var(--section-py) var(--px)`, background: "var(--bg)" }}>
      <div className="domains-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "center" }}>
        <div>
          <div className="rv"><Tag label="Domaines d'expertise" /></div>
          <SectionTitle className="rv" style={{ marginBottom: "clamp(2rem,4vw,3rem)" }}>Trois piliers,<br /><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>une vision</em></SectionTitle>
          {domains.map((d, i) => (
            <div key={d.num} className={`di rv d${i + 1}`} style={{ padding: "1.8rem 0", borderBottom: "1px solid var(--border)", borderLeft: "2px solid transparent", paddingLeft: 0, display: "flex", gap: "1.2rem", marginLeft: -2 }}>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem", color: "var(--accent)", display: "block", marginBottom: ".5rem" }}>{d.num}</span>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.25rem,2vw,1.5rem)", fontWeight: 600, marginBottom: ".5rem" }}>{d.title}</div>
                <div style={{ fontSize: "clamp(.8rem,1vw,.87rem)", color: "var(--muted)", lineHeight: 1.78 }}>{d.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual — hidden on mobile */}
        <div className="domain-vis rv" style={{ position: "relative", height: "min(500px,45vw)" }}>
          <div style={{ position: "absolute", inset: 0, border: "1px solid var(--border)", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%,rgba(13,110,63,.18) 0%,transparent 70%)" }} />
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(5rem,10vw,10rem)", color: "rgba(0,245,160,.07)", lineHeight: 1, userSelect: "none" }}>IFI</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(240,237,230,.2)", marginTop: "1rem" }}>Info · Finance · Agriculture</div>
            </div>
            {[[160, 20], [260, 35], [360, 50]].map(([s, d]) => (
              <div key={s} style={{ position: "absolute", top: "50%", left: "50%", width: s, height: s, borderRadius: "50%", border: "1px solid rgba(0,245,160,.05)", animation: `spinC ${d}s linear infinite`, marginTop: -s / 2, marginLeft: -s / 2 }} />
            ))}
            <span style={{ position: "absolute", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".18em", color: "rgba(240,237,230,.18)", top: "1.5rem", right: "1.5rem" }}>IFIAAS · 2026</span>
            <span style={{ position: "absolute", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".18em", color: "rgba(240,237,230,.18)", bottom: "1.5rem", left: "1.5rem" }}>Zinvié · Bénin</span>
          </div>
          <Corner pos="tr" />
          <Corner pos="bl" color="var(--gold)" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════ */
function Projects() {
  const projects = [
    { badge: "En développement", bc: "var(--accent)", bl: "var(--accent)", bg: "rgba(0,245,160,.03)", featured: true, name: "Marketplace Crypto", desc: "Une marketplace dédiée à la monnaie virtuelle. Achat, vente et échange d'actifs numériques dans un environnement sécurisé, conçue pour l'adoption de masse sur le marché africain et international.", tags: ["Blockchain", "Crypto", "DeFi", "Web3"] },
    { badge: "Bientôt", bc: "var(--gold2)", bl: "var(--gold)", bg: "rgba(212,168,67,.03)", name: "WiFi Zone Manager Pro", desc: "L'évolution de GigaZone : analytics temps réel, facturation automatisée, gestion multi-sites. Pour scaler votre business WiFi.", tags: ["IoT", "SaaS", "Analytics"] },
    { badge: "À venir", bc: "var(--muted)", bl: "transparent", bg: "var(--surface)", name: "Et bien plus…", desc: "L'écosystème IFIAAS est en expansion permanente. Nouveaux outils, nouvelles opportunités.", tags: ["Innovation", "???"] },
  ];

  return (
    <section id="projets" style={{ padding: `var(--section-py) var(--px)`, background: "var(--surface)" }}>
      <div className="rv" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(2.5rem,5vw,4.5rem)", flexWrap: "wrap", gap: "1.5rem" }}>
        <div><Tag label="Roadmap" /><SectionTitle>Projets à <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>venir</em></SectionTitle></div>
        <p style={{ color: "var(--muted)", fontSize: ".85rem", maxWidth: 240, lineHeight: 1.7 }}>L'écosystème IFIAAS grandit sans cesse.</p>
      </div>

      <div className="rv proj-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1px", background: "var(--border)" }}>
        {/* Featured */}
        <div className="pj" style={{ background: projects[0].bg, padding: "clamp(2rem,4vw,3rem)", borderLeft: `2px solid ${projects[0].bl}` }}>
          <div style={{ display: "inline-block", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", padding: ".3rem .9rem", border: `1px solid ${projects[0].bc}`, color: projects[0].bc, marginBottom: "1.3rem" }}>{projects[0].badge}</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 600, marginBottom: ".9rem" }}>{projects[0].name}</div>
          <p style={{ fontSize: "clamp(.82rem,1vw,.88rem)", color: "var(--muted)", lineHeight: 1.78, marginBottom: "1.8rem" }}>{projects[0].desc}</p>
          <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>{projects[0].tags.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", padding: ".25rem .7rem", background: "rgba(240,237,230,.04)", color: "var(--muted)" }}>{t}</span>)}</div>
        </div>

        {/* Others */}
        <div className="proj-inner" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "var(--border)" }}>
          {projects.slice(1).map((p) => (
            <div key={p.name} className="pj" style={{ background: p.bg, padding: "clamp(1.5rem,3vw,2.5rem)", borderLeft: `2px solid ${p.bl}` }}>
              <div style={{ display: "inline-block", fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", padding: ".3rem .9rem", border: `1px solid ${p.bc}`, color: p.bc, marginBottom: "1rem" }}>{p.badge}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.3rem,2vw,1.6rem)", fontWeight: 600, marginBottom: ".7rem" }}>{p.name}</div>
              <p style={{ fontSize: "clamp(.78rem,.95vw,.85rem)", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1.2rem" }}>{p.desc}</p>
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>{p.tags.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".58rem", padding: ".22rem .65rem", background: "rgba(240,237,230,.04)", color: "var(--muted)" }}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOUNDER
═══════════════════════════════════════════ */
function Founder() {
  const skills = ["Développement Fullstack", "Conception Graphique", "Finance Digitale", "Agriculture Tech", "UI/UX Design", "Entrepreneuriat", "WiFi & Réseaux", "Architecture Système"];
  const contacts = [
    ["📱", "WhatsApp", "+229 67 45 54 62", "https://wa.me/22967455462"],
    ["📺", "YouTube", "@ifiaas", "https://youtube.com/@ifiaas"],
    ["✉️", "Email", "contact@ifiaas.com", "mailto:contact@ifiaas.com"],
    ["📍", "Adresse", "Zinvié, Bénin", null],
  ];

  return (
    <section id="fondateur" style={{ padding: `var(--section-py) var(--px)`, background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(212,168,67,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "clamp(2rem,6vw,6rem)", alignItems: "center" }}>
        {/* Avatar */}
        <div className="rv" style={{ position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--surface2)", border: "1px solid var(--border)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 80% at 40% 60%,rgba(13,110,63,.18) 0%,transparent 70%)" }} />
            <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(4rem,10vw,7rem)", color: "rgba(0,245,160,.12)", lineHeight: 1 }}>AS</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(240,237,230,.2)", marginTop: "1rem" }}>Armel Sangan</div>
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,245,160,.2),transparent)", animation: "scanline 4s linear infinite" }} />
          </div>
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "rgba(6,8,13,.93)", backdropFilter: "blur(20px)", border: "1px solid var(--border)", padding: ".75rem 1.4rem", whiteSpace: "nowrap", textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", color: "var(--accent)", letterSpacing: ".15em", textTransform: "uppercase" }}>Promoteur & CEO</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 600, marginTop: ".2rem" }}>IFIAAS</div>
          </div>
          <Corner pos="tr" size={48} />
          <Corner pos="bl" color="var(--gold)" size={48} />
        </div>

        {/* Content */}
        <div>
          <div className="rv"><Tag label="Fondateur" /></div>
          <h2 className="rv" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4vw,4rem)", fontWeight: 600, lineHeight: 1.05, marginBottom: ".5rem" }}>
            Armel<br /><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>SANGAN</em>
          </h2>
          <div className="rv" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.62rem,.8vw,.72rem)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.8rem" }}>
            Développeur · Designer · Entrepreneur
          </div>
          <p className="rv" style={{ fontSize: "clamp(.85rem,1.1vw,.95rem)", color: "var(--muted)", lineHeight: 1.88, marginBottom: "2rem", maxWidth: 500 }}>
            Armel SANGAN est le promoteur et fondateur d'IFIAAS. Développeur fullstack et designer graphique passionné, il a conçu GigaZone WiFi Pro, ifiMoney et ifiChat — trois produits déjà actifs au Bénin. Sa mission : bâtir l'infrastructure numérique africaine, un outil concret à la fois.
          </p>

          <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: ".45rem", marginBottom: "2rem" }}>
            {skills.map(s => <span key={s} className="sk" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.58rem,.7vw,.65rem)", letterSpacing: ".07em", textTransform: "uppercase", padding: ".38rem .9rem", border: "1px solid var(--border)", color: "var(--muted)" }}>{s}</span>)}
          </div>

          {/* Contacts card */}
          <div className="rv" style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "clamp(1rem,2.5vw,1.5rem) clamp(1.2rem,3vw,2rem)", marginBottom: "1.8rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Coordonnées</div>
            {contacts.map(([icon, label, val, href]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: ".9rem", marginBottom: ".55rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: ".88rem", minWidth: 18 }}>{icon}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", color: "var(--muted)", minWidth: 65 }}>{label}</span>
                {href
                  ? <a href={href} target="_blank" rel="noreferrer" className="fl" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.7rem,.85vw,.78rem)", color: "var(--accent)" }}>{val}</a>
                  : <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.7rem,.85vw,.78rem)", color: "var(--white)" }}>{val}</span>}
              </div>
            ))}
          </div>

          <div className="rv founder-contacts" style={{ display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
            {[["📱 WhatsApp", "https://wa.me/22967455462", "#25d366", "#000"], ["▶ YouTube", "https://youtube.com/@ifiaas", "#f00", "#fff"]].map(([label, url, bg, color]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="ctab"
                style={{ display: "flex", alignItems: "center", gap: ".6rem", background: bg, color, padding: ".85rem 1.6rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.65rem,.8vw,.72rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA
═══════════════════════════════════════════ */
function CTA() {
  return (
    <div style={{ background: "var(--green)", padding: `clamp(4rem,8vw,7rem) var(--px)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(8rem,20vw,22rem)", color: "rgba(255,255,255,.04)", whiteSpace: "nowrap", lineHeight: 1 }}>IFIAAS</span>
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.6rem,.75vw,.68rem)", letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(240,237,230,.6)", marginBottom: "1.3rem" }}>Collaboration · Partenariat</div>
        <SectionTitle style={{ marginBottom: "1.1rem" }}>Prêt à construire<br /><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>ensemble ?</em></SectionTitle>
        <p style={{ color: "rgba(240,237,230,.65)", fontSize: "clamp(.88rem,1.1vw,1rem)", marginBottom: "2.5rem" }}>Un projet, une idée, un besoin ? Armel est disponible sur WhatsApp.</p>
        <div className="cta-btns" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/22967455462" target="_blank" rel="noreferrer" className="ctab"
            style={{ background: "#000", color: "var(--accent)", padding: ".95rem 2.3rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.75rem,.9vw,.82rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
            Contacter Armel
          </a>
          <a href="https://youtube.com/@ifiaas" target="_blank" rel="noreferrer" className="ctab"
            style={{ background: "transparent", color: "var(--white)", padding: ".95rem 2.3rem", fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.75rem,.9vw,.82rem)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid rgba(240,237,230,.3)", clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)" }}>
            Notre YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: "var(--bg)", padding: `clamp(3rem,6vw,4rem) var(--px) clamp(1.5rem,3vw,2rem)`, borderTop: "1px solid var(--border)" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(1.5rem,4vw,4rem)", marginBottom: "clamp(2rem,4vw,4rem)" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(1rem,1.5vw,1.3rem)", fontWeight: 700, color: "var(--accent)", letterSpacing: ".2em", marginBottom: "1rem" }}>IFIAAS</div>
          <p style={{ fontSize: "clamp(.78rem,1vw,.87rem)", color: "var(--muted)", lineHeight: 1.78, maxWidth: 300, marginBottom: "1.2rem" }}>Informatique · Finance · Agriculture. Innovation numérique depuis Zinvié, Bénin.</p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", color: "rgba(240,237,230,.2)", letterSpacing: ".08em" }}>contact@ifiaas.com</div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(240,237,230,.22)", marginBottom: "1.3rem" }}>Plateformes</div>
          {[["📶 GigaZone WiFi", "https://z.ifiaas.com"], ["🏦 ifiMoney", "https://money.ifiaas.com"], ["💬 ifiChat", "https://chat.ifiaas.com"]].map(([l, u]) => (
            <a key={l} href={u} target="_blank" rel="noreferrer" className="fl" style={{ fontSize: "clamp(.78rem,1vw,.87rem)", color: "var(--muted)", marginBottom: ".75rem" }}>{l}</a>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(240,237,230,.22)", marginBottom: "1.3rem" }}>Contact</div>
          {[["📱 WhatsApp", "https://wa.me/22967455462"], ["▶ YouTube @ifiaas", "https://youtube.com/@ifiaas"], ["✉️ contact@ifiaas.com", "mailto:contact@ifiaas.com"]].map(([l, u]) => (
            <a key={l} href={u} target="_blank" rel="noreferrer" className="fl" style={{ fontSize: "clamp(.75rem,.95vw,.85rem)", color: "var(--muted)", marginBottom: ".75rem" }}>{l}</a>
          ))}
          <div style={{ fontSize: "clamp(.75rem,.95vw,.85rem)", color: "var(--muted)", marginTop: ".3rem" }}>📍 Zinvié, Bénin</div>
        </div>
      </div>
      <div style={{ paddingTop: "1.8rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.58rem,.72vw,.68rem)", color: "rgba(240,237,230,.18)" }}>© 2026 IFIAAS · Armel SANGAN</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.58rem,.72vw,.68rem)", color: "rgba(240,237,230,.18)" }}>ifiaas.com · Bénin 🇧🇯</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
═══════════════════════════════════════════ */
export default function App() {
  useReveal();
  return (
    <div>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Platforms />
      <Domains />
      <Projects />
      <Founder />
      <CTA />
      <Footer />
    </div>
  );
}
