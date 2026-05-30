import { useState, useEffect, useRef } from "react";
import {
  Leaf, Zap, Recycle, Menu, X, Play, ArrowRight, Plug,
  Trash2, Sprout, Factory, Beef, Building2, Globe,
  Linkedin, Twitter, Instagram, Flame,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand tokens                                                      */
/* ------------------------------------------------------------------ */
const C = {
  primary: "#1A7A4A",
  primaryLight: "#2ECC71",
  secondary: "#F5A623",
  dark: "#0D1B12",
  surface: "#F4F9F5",
  text: "#1C2B22",
  muted: "#6B8F71",
};

/* ------------------------------------------------------------------ */
/* Hooks                                                             */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* ------------------------------------------------------------------ */
/* Particle background (canvas)                                      */
/* ------------------------------------------------------------------ */
function ParticleBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 60;
    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      s: Math.random() * 0.5 + 0.15,
      a: Math.random() * 0.5 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s;
        d.x += d.drift;
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46,204,113,${d.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(46,204,113,0.6)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                  */
/* ------------------------------------------------------------------ */
function Counter({ to, prefix = "", suffix = "", decimals = 0, dur = 1600 }) {
  const [ref, seen] = useInView(0.5);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let start;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal wrapper                                                    */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, y = 28 }) {
  const [ref, seen] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s ${delay}ms cubic-bezier(.2,.7,.2,1), transform .7s ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                              */
/* ------------------------------------------------------------------ */
function Logo({ light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          display: "grid",
          placeItems: "center",
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
          boxShadow: "0 4px 14px rgba(26,122,74,.35)",
          position: "relative"
        }}
      >
        <Leaf size={15} color="#fff" style={{ position: "absolute", transform: "translate(-3px,-2px)" }} />
        <Zap size={14} color={C.secondary} style={{ transform: "translate(4px,3px)" }} fill={C.secondary} />
      </span>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: 800,
          fontSize: 19,
          letterSpacing: "-.02em",
          color: light ? "#fff" : C.text,
        }}
      >
        Sync<span style={{ color: C.primaryLight }}>Energy</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                            */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Solutions", "How It Works", "Impact", "About", "Contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all .3s",
        background: scrolled ? "rgba(13,27,18,.72)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(46,204,113,.14)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo light />
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="nav-link"
              style={{
                color: "rgba(255,255,255,.82)",
                fontSize: 14.5,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color .2s",
              }}
            >
              {l}
            </a>
          ))}
          <button style={pillBtn(true)}>Partner With Us</button>
        </div>
        <button
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {open && (
        <div
          className="nav-mobile"
          style={{
            background: "rgba(13,27,18,.97)",
            backdropFilter: "blur(14px)",
            padding: "8px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((l) => (
            <a key={l} href="#" style={{ color: "#fff", padding: "14px 0", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,.08)", fontWeight: 500 }}>
              {l}
            </a>
          ))}
          <button style={{ ...pillBtn(true), marginTop: 14, width: "100%" }}>Partner With Us</button>
        </div>
      )}
    </nav>
  );
}

function pillBtn(primary) {
  return {
    border: "none",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontWeight: 700,
    fontSize: 14.5,
    padding: "11px 22px",
    borderRadius: 999,
    background: primary ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})` : "transparent",
    color: "#fff",
    boxShadow: primary ? "0 6px 20px rgba(26,122,74,.4)" : "none",
    transition: "transform .2s, box-shadow .2s",
  };
}

/* ------------------------------------------------------------------ */
/* Hero                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  const words = ["Waste to Power.", "Locally Built.", "Nationally Scalable."];
  return (
    <header
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: `radial-gradient(120% 90% at 70% 10%, #1A3020 0%, ${C.dark} 60%)`,
        padding: "120px 24px 60px",
      }}
    >
      <ParticleBackground />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: C.primaryLight,
            background: "rgba(46,204,113,.1)",
            border: "1px solid rgba(46,204,113,.3)",
            padding: "7px 15px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".02em",
            marginBottom: 28,
            animation: "fadeUp .8s both",
          }}
        >
          <Flame size={14} /> Nigeria's waste crisis is our energy opportunity
        </span>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.02,
            letterSpacing: "-.03em",
            fontSize: "clamp(2.6rem, 7vw, 5.4rem)",
            margin: 0,
          }}
        >
          {words.map((w, i) => (
            <span
              key={w}
              style={{
                display: "block",
                animation: `fadeUp .8s both`,
                animationDelay: `${0.15 + i * 0.18}s`,
                color: i === 0 ? C.primaryLight : "#fff",
              }}
            >
              {w}
            </span>
          ))}
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,.7)",
            fontSize: "clamp(1rem,2vw,1.22rem)",
            maxWidth: 620,
            lineHeight: 1.6,
            margin: "28px 0 36px",
            animation: "fadeUp .8s both",
            animationDelay: ".75s",
          }}
        >
          Sync Energy deploys IoT-enabled biodigesters that turn Nigeria's 32 million
          tonnes of annual organic waste into clean, decentralized electricity and
          bio-fertilizer.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp .8s both", animationDelay: ".9s" }}>
          <button style={{ ...pillBtn(true), padding: "15px 28px", fontSize: 16, display: "inline-flex", alignItems: "center", gap: 8 }}>
            Explore Solutions <ArrowRight size={18} />
          </button>
          <button
            style={{
              ...pillBtn(false),
              padding: "15px 26px",
              fontSize: 16,
              border: "1.5px solid rgba(255,255,255,.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <Play size={16} fill="#fff" /> Watch How It Works
          </button>
        </div>
      </div>
      {/* SDG strip */}
      <div
        style={{
          position: "relative",
          marginTop: 70,
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,.1)",
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
          animation: "fadeUp .8s both",
          animationDelay: "1.05s",
        }}
      >
        <span style={{ color: "rgba(255,255,255,.4)", fontSize: 13, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
          Aligned with SDGs
        </span>
        {[
          { n: "7", c: "#FCC30B", t: "Clean Energy" },
          { n: "11", c: "#FD9D24", t: "Sustainable Cities" },
          { n: "12", c: "#BF8B2E", t: "Responsible Consumption" },
          { n: "13", c: "#3F7E44", t: "Climate Action" },
        ].map((s) => (
          <span key={s.n} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: 6, background: s.c, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>
              {s.n}
            </span>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>{s.t}</span>
          </span>
        ))}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                           */
/* ------------------------------------------------------------------ */
function Problem() {
  const Stat = ({ icon, big, label }) => (
    <div style={{ flex: 1, minWidth: 260 }}>
      <div style={{ color: C.secondary, marginBottom: 18 }}>{icon}</div>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,5vw,3.6rem)", color: "#fff", lineHeight: 1, letterSpacing: "-.03em" }}>
        {big}
      </div>
      <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, marginTop: 14, maxWidth: 360, lineHeight: 1.55 }}>{label}</p>
    </div>
  );
  return (
    <section style={{ background: C.dark, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ textAlign: "center", color: C.primaryLight, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", fontSize: 13, marginBottom: 48 }}>
            The Problem
          </p>
        </Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <Reveal><Stat icon={<Plug size={40} />} big={<Counter to={85} suffix="M" />} label="Nigerians without reliable electricity, dependent on diesel and an unstable grid." /></Reveal>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 60, color: C.primaryLight, fontWeight: 300, opacity: 0.7 }}>+</div>
          <Reveal delay={120}><Stat icon={<Trash2 size={40} />} big={<Counter to={32} suffix="M" />} label="Tonnes of organic waste generated annually, with 50 to 60% left untreated." /></Reveal>
        </div>
        <Reveal delay={200}>
          <p style={{ textAlign: "center", marginTop: 60, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff" }}>
            Two crises. <span style={{ color: C.primaryLight }}>One solution.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Solution / process flow                                           */
/* ------------------------------------------------------------------ */
function Solution() {
  const steps = [
    { icon: <Trash2 size={28} />, t: "Waste Capture", d: "Collect organic waste at source from farms, mills and estates." },
    { icon: <Zap size={28} />, t: "Energy Service", d: "Convert raw biogas into biomethane for clean baseload electricity." },
    { icon: <Sprout size={28} />, t: "Bio-Fertilizer", d: "Process digestate into premium organic soil amendments." },
  ];
  return (
    <section style={{ background: C.surface, padding: "110px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 style={secTitle()}>On-Site Biodigesters.<br /><span style={{ color: C.primary }}>Waste In. Power Out.</span></h2>
        </Reveal>
        <div style={{ display: "flex", gap: 30, marginTop: 64, flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 130}>
              <div style={{ flex: 1, minWidth: 250, maxWidth: 320, textAlign: "center" }}>
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 22px",
                    boxShadow: "0 12px 30px rgba(26,122,74,.3)",
                    position: "relative",
                  }}
                >
                  {s.icon}
                  <span style={{ position: "absolute", top: -6, right: -6, width: 26, height: 26, borderRadius: "50%", background: C.secondary, color: C.dark, fontWeight: 800, fontSize: 13, display: "grid", placeItems: "center" }}>{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 21, color: C.text, margin: "0 0 10px" }}>{s.t}</h3>
                <p style={{ color: C.muted, fontSize: 15.5, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Target segments                                                   */
/* ------------------------------------------------------------------ */
function Segments() {
  const cards = [
    { icon: <Beef size={26} />, t: "Livestock Farms", d: "Abundant manure feedstock paired with constant cooling and processing power demand." },
    { icon: <Factory size={26} />, t: "Agro-Processors", d: "Cassava and rice mills spending millions daily on diesel can offset it on-site." },
    { icon: <Building2 size={26} />, t: "Industrial Estates & Communities", d: "Decentralized clusters seeking reliable, clean baseload power." },
  ];
  return (
    <section style={{ background: "#fff", padding: "110px 24px" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <Reveal><h2 style={secTitle()}>Built for Nigeria's<br /><span style={{ color: C.primary }}>Highest-Impact Industries</span></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: 60 }}>
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 110}>
              <SegCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function SegCard({ icon, t, d }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: C.surface,
        border: `1.5px solid ${h ? C.primaryLight : "rgba(0,0,0,.06)"}`,
        borderRadius: 18,
        padding: "32px 28px",
        height: "100%",
        boxShadow: h ? "0 18px 40px rgba(26,122,74,.18)" : "0 2px 10px rgba(0,0,0,.03)",
        transform: h ? "translateY(-6px)" : "none",
        transition: "all .3s cubic-bezier(.2,.7,.2,1)",
        cursor: "pointer",
      }}
    >
      <div style={{ width: 54, height: 54, borderRadius: 13, background: "rgba(26,122,74,.1)", color: C.primary, display: "grid", placeItems: "center", marginBottom: 20 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 19, color: C.text, margin: "0 0 10px" }}>{t}</h3>
      <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.55, margin: "0 0 18px" }}>{d}</p>
      <span style={{ color: C.primary, fontWeight: 700, fontSize: 14.5, display: "inline-flex", alignItems: "center", gap: 6 }}>
        Learn More <ArrowRight size={15} style={{ transform: h ? "translateX(4px)" : "none", transition: "transform .25s" }} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Market opportunity                                                */
/* ------------------------------------------------------------------ */
function Market() {
  const funnel = [
    { label: "TAM", value: "$50–100B", sub: "Total Addressable Market (2026)", w: 100, c: "rgba(46,204,113,.22)" },
    { label: "SAM", value: "$1.5–3B", sub: "Serviceable Addressable Market", w: 72, c: "rgba(46,204,113,.42)" },
    { label: "SOM", value: "2,000–5,000", sub: "Target Installations", w: 44, c: C.primaryLight },
  ];
  return (
    <section style={{ background: C.dark, padding: "110px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto", position: "relative" }}>
        <Reveal><h2 style={{ ...secTitle(), color: "#fff" }}>A Market the Size of<br /><span style={{ color: C.primaryLight }}>the Opportunity</span></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, marginTop: 60, alignItems: "center" }} className="market-grid">
          {/* counters */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { big: <><Counter to={16} />–<Counter to={19} suffix="M" /></>, l: "Tonnes/year feedstock availability" },
              { big: <>$<Counter to={50} />–<Counter to={100} suffix="B" /></>, l: "Total addressable market" },
              { big: <>$<Counter to={1.5} decimals={1} />–<Counter to={3} suffix="B" /></>, l: "Serviceable addressable market" },
              { big: <Counter to={5000} />, l: "Target installations (SOM)" },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 90}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3.4vw,2.4rem)", color: C.primaryLight, letterSpacing: "-.02em" }}>{m.big}</div>
                  <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, marginTop: 8 }}>{m.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* funnel */}
          <Reveal delay={150}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {funnel.map((f) => (
                <div
                  key={f.label}
                  style={{
                    width: `${f.w}%`,
                    background: f.c,
                    border: "1px solid rgba(46,204,113,.4)",
                    borderRadius: 12,
                    padding: "18px 16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#fff", fontSize: 18 }}>{f.value}</div>
                  <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 3 }}>{f.label} · {f.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact grid                                                       */
/* ------------------------------------------------------------------ */
function Impact() {
  const items = [
    { icon: <Leaf size={26} />, big: <Counter to={90} suffix="%" />, t: "Methane Reduction", d: "Captures greenhouse gases before emission." },
    { icon: <Zap size={26} />, big: <Counter to={65} suffix="%" />, t: "Energy Cost Savings", d: "Replaces diesel with clean baseload energy." },
    { icon: <Recycle size={26} />, big: <Counter to={5.2} decimals={1} />, t: "Tonnes/Month Diverted", d: "Keeps communities clean and productive." },
    { icon: <Globe size={26} />, big: "4", t: "UN SDGs Aligned", d: "Goals 7, 11, 12 and 13." },
  ];
  return (
    <section style={{ background: C.surface, padding: "110px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal><h2 style={secTitle()}>Every Installation <span style={{ color: C.primary }}>Counts</span></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 22, marginTop: 56 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 90}>
              <div style={{ background: "#fff", borderRadius: 18, padding: "30px 26px", border: "1px solid rgba(0,0,0,.05)", height: "100%" }}>
