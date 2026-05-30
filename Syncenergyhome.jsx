

```tsx
"use client";

import { useState, useEffect, useRef } from "react"; 
import { 
  Leaf, 
  Zap, 
  Recycle, 
  Menu, 
  X, 
  Play, 
  ArrowRight, 
  Plug, 
  Trash2, 
  Sprout, 
  Factory, 
  Building2, 
  Globe, 
  TrendingUp, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Flame,
  Cpu,
  ShieldCheck,
  Mail
} from "lucide-react";

/* ------------------------------------------------------------------ */ 
/* Brand Identity Tokens */ 
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
/* Custom Intersection Observer Hook for Scroll Animations */ 
/* ------------------------------------------------------------------ */ 
function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] { 
  const ref = useRef<HTMLDivElement>(null); 
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
/* Animated Counter Component */ 
/* ------------------------------------------------------------------ */ 
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */ 
/* Lightweight Particle Background (Fixed Canvas Code) */ 
/* ------------------------------------------------------------------ */ 
export function ParticleBackground() { 
  const ref = useRef<HTMLCanvasElement>(null); 

  useEffect(() => { 
    const canvas = ref.current; 
    if (!canvas) return;
    const ctx = canvas.getContext("2d"); 
    if (!ctx) return;

    let raf: number; 
    let w: number, h: number; 

    const resize = () => { 
      w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth; 
      h = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight; 
    }; 
    resize(); 
    window.addEventListener("resize", resize); 

    const N = 40; 
    const dots = Array.from({ length: N }, () => ({ 
      x: Math.random() * w, 
      y: Math.random() * h + h, 
      r: Math.random() * 2 + 0.8, 
      s: Math.random() * 0.4 + 0.1, 
      a: Math.random() * 0.4 + 0.15, 
      drift: (Math.random() - 0.5) * 0.2, 
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
        ctx.fillStyle = `rgba(46, 204, 113, ${d.a})`; 
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
      className="absolute inset-0 pointer-events-none w-full h-full mix-blend-screen opacity-70"
    />
  );
}

/* ------------------------------------------------------------------ */ 
/* Main Site App Wrapper */ 
/* ------------------------------------------------------------------ */ 
export default function SyncEnergyApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-scroll to top on page simulation toggle
  const navigateTo = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-light selection:text-dark font-sans bg-[#F4F9F5] text-[#1C2B22]">
      
      {/* Dynamic Sticky Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B12]/80 backdrop-blur-md border-b border-[#1A7A4A]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <Leaf className="text-[#2ECC71]" size={22} />
            Sync <span className="text-[#2ECC71]">Energy</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {["solutions", "how-it-works", "impact", "about", "contact"].map((page) => (
              <button 
                key={page} 
                onClick={() => navigateTo(page)}
                className={`text-sm font-medium transition-colors hover:text-[#2ECC71] capitalize ${
                  currentPage === page ? "text-[#2ECC71]" : "text-gray-300"
                }`}
              >
                {page.replace("-", " ")}
              </button>
            ))}
            <button 
              onClick={() => navigateTo("contact")}
              className="bg-[#1A7A4A] hover:bg-[#2ECC71] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all shadow-md"
            >
              Partner With Us
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0D1B12] border-b border-[#1A7A4A]/20 flex flex-col p-6 gap-4">
            {["solutions", "how-it-works", "impact", "about", "contact"].map((page) => (
              <button 
                key={page} 
                onClick={() => navigateTo(page)}
                className="text-left text-gray-300 hover:text-[#2ECC71] text-lg font-medium capitalize"
              >
                {page.replace("-", " ")}
              </button>
            ))}
            <button 
              onClick={() => navigateTo("contact")}
              className="bg-[#1A7A4A] text-white font-semibold py-3 rounded-full text-center mt-2"
            >
              Partner With Us
            </button>
          </div>
        )}
      </nav>

      {/* Main Container Router */}
      <main className="flex-grow">
        {currentPage === "home" && <HomepageView navigateTo={navigateTo} />}
        {currentPage === "solutions" && <SolutionsView />}
        {currentPage === "how-it-works" && <HowItWorksView />}
        {currentPage === "impact" && <ImpactView />}
        {currentPage === "about" && <AboutView />}
        {currentPage === "contact" && <ContactView />}
      </main>

      {/* Global Brand Footer */}
      <footer className="bg-[#0D1B12] border-t border-[#1A7A4A]/20 text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="text-white font-bold text-2xl flex items-center gap-2">
              Sync <span className="text-[#2ECC71]">Energy</span>
            </div>
            <p className="max-w-sm text-sm text-[#6B8F71]">
              Transforming Waste into a Sustainable Energy Future. Deploying grid-independent, decentralized power across high-impact processing setups.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#1A7A4A]/20 text-white transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#1A7A4A]/20 text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[#1A7A4A]/20 text-white transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo("solutions")} className="hover:text-[#2ECC71]">Solutions</button></li>
              <li><button onClick={() => navigateTo("how-it-works")} className="hover:text-[#2ECC71]">How It Works</button></li>
              <li><button onClick={() => navigateTo("impact")} className="hover:text-[#2ECC71]">Impact Metrics</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Gateway</h4>
            <ul className="space-y-2 text-sm">
              <li>SyncEnergy@gmail.com</li>
              <li><a href="https://www.biogas-pilot.io" target="_blank" rel="noreferrer" className="hover:text-white underline">www.biogas-pilot.io</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-xs text-[#6B8F71] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Sync Energy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */ 
/* 1. Homepage Content Component View */ 
/* ------------------------------------------------------------------ */ 
function HomepageView({ navigateTo }: { navigateTo: (id: string) => void }) {
  const [probRef, probVisible] = useInView();
  const [solRef, solVisible] = useInView();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-[#0D1B12] to-[#14291B] flex flex-col justify-center items-center px-6 pt-24 overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Waste to Power.<br />
            <span className="text-[#2ECC71]">Locally Built.</span><br />
            Nationally Scalable.
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Sync Energy deploys IoT-enabled biodigesters that turn Nigeria's 32 million tonnes of annual organic waste into clean, decentralized electricity and bio-fertilizer.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button onClick={() => navigateTo("solutions")} className="w-full sm:w-auto bg-[#1A7A4A] hover:bg-[#2ECC71] text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all">
              Explore Solutions <ArrowRight size={18} />
            </button>
            <button onClick={() => navigateTo("how-it-works")} className="w-full sm:w-auto border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all">
              <Play size={16} fill="white" /> Watch How It Works
            </button>
          </div>
        </div>

        {/* SDG Ribbon */}
        <div className="absolute bottom-0 left-0 w-full bg-[#0D1B12]/80 border-t border-white/5 py-4 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-6 whitespace-nowrap text-xs tracking-wider text-[#6B8F71] font-semibold">
            <span>ALIGNED WITH UN SDGs:</span>
            <span className="text-white bg-white/5 px-3 py-1 rounded border border-white/10">SDG 7 Clean Energy</span>
            <span className="text-white bg-white/5 px-3 py-1 rounded border border-white/10">SDG 11 Sustainable Cities</span>
            <span className="text-white bg-white/5 px-3 py-1 rounded border border-white/10">SDG 12 Responsible Consumption</span>
            <span className="text-white bg-white/5 px-3 py-1 rounded border border-white/10">SDG 13 Climate Action</span>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section ref={probRef as any} className={`bg-[#0D1B12] text-white transition-all duration-1000 ${probVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 border-y border-white/5">
          <div className="p-12 md:p-24 border-b lg:border-b-0 lg:border-r border-white/5 space-y-4">
            <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center"><Plug size={20} /></div>
            <h3 className="text-5xl font-black tracking-tight text-white"><AnimatedCounter value={85} suffix="M" /></h3>
            <p className="text-lg font-bold text-gray-200">Nigerians living completely without reliable power network connection grids.</p>
            <p className="text-sm text-[#6B8F71]">Agro-processors spend millions daily running volatile, carbon-heavy diesel generators to combat grid structural failures.</p>
          </div>
          <div className="p-12 md:p-24 space-y-4">
            <div className="w-10 h-10 bg-[#F5A623]/10 text-[#F5A623]/20 rounded-lg flex items-center justify-center"><Trash2 size={20} className="text-[#F5A623]" /></div>
            <h3 className="text-5xl font-black tracking-tight text-white"><AnimatedCounter value={32} suffix="M" /></h3>
            <p className="text-lg font-bold text-gray-200">Tonnes of processing organic waste produced annually—over 50% left raw and untreated.</p>
            <p className="text-sm text-[#6B8F71]">Unmanaged agricultural mass pileups degrade community hygiene conditions and emit toxic environmental methane fumes.</p>
          </div>
        </div>
        <div className="bg-[#1A7A4A] py-4 text-center font-bold text-sm tracking-wide">TWO CRISES. ONE UNIFIED DECENTRALIZED PLATFORM SOLUTION.</div>
      </section>

      {/* The Solution Process section */}
      <section ref={solRef as any} className={`py-24 bg-[#F4F9F5] transition-all duration-1000 ${solVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">On-Site Biodigesters. Waste In. Power Out.</h2>
            <p className="text-[#6B8F71] text-sm">How Sync Energy turns standard processing streams into high-yield commercial power.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-3">
              <div className="w-12 h-12 bg-[#1A7A4A] text-white rounded-full flex items-center justify-center mx-auto shadow-md"><Trash2 size={20} /></div>
              <h4 className="font-bold text-lg">Waste Capture</h4>
              <p className="text-xs text-[#6B8F71]">Systematic source collation of high-yield organic residues across dynamic processing operations.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-3">
              <div className="w-12 h-12 bg-[#1A7A4A] text-white rounded-full flex items-center justify-center mx-auto shadow-md"><Zap size={20} /></div>
              <h4 className="font-bold text-lg">Energy Service</h4>
              <p className="text-xs text-[#6B8F71]">Continuous processing turns raw biomethane directly into grid-stabilized baseload electricity power.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-3">
              <div className="w-12 h-12 bg-[#1A7A4A] text-white rounded-full flex items-center justify-center mx-auto shadow-md"><Sprout size={20} /></div>
              <h4 className="font-bold text-lg">Bio-Fertilizer</h4>
              <p className="text-xs text-[#6B8F71]">Valuable organic processing residue byproduct recovered completely as high-nutrient soil supplements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Segments Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">Built for Nigeria's Highest-Impact Industries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F4F9F5] border border-gray-100 rounded-3xl space-y-4 hover:shadow-xl transition-all group">
              <div className="w-10 h-10 bg-[#1A7A4A]/10 text-[#1A7A4A] rounded-xl flex items-center justify-center font-bold text-lg">🚜</div>
              <h3 className="text-xl font-bold">Livestock Farms</h3>
              <p className="text-xs text-[#6B8F71] leading-relaxed">Convert large quantities of livestock manure into stable, grid-independent power arrays suited for storage cooling.</p>
            </div>
            <div className="p-8 bg-[#F4F9F5] border border-gray-100 rounded-3xl space-y-4 hover:shadow-xl transition-all group">
              <div className="w-10 h-10 bg-[#1A7A4A]/10 text-[#1A7A4A] rounded-xl flex items-center justify-center"><Factory size={20} /></div>
              <h3 className="text-xl font-bold">Agro-Processors</h3>
              <p className="text-xs text-[#6B8F71] leading-relaxed">Tailored for busy Cassava and Rice mill plants currently expending massive funds daily on volatile diesel setups.</p>
            </div>
            <div className="p-8 bg-[#F4F9F5] border border-gray-100 rounded-3xl space-y-4 hover:shadow-xl transition-all group">
              <div className="w-10 h-10 bg-[#1A7A4A]/10 text-[#1A7A4A] rounded-xl flex items-center justify-center"><Building2 size={20} /></div>
              <h3 className="text-xl font-bold">Industrial Estates</h3>
              <p className="text-xs text-[#6B8F71] leading-relaxed">Integrated group hub designs built to deliver continuous, reliable, self-sufficient baseline operations power lines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funnel / Market Opportunity Section */}
      <section className="py-24 bg-[#0D1B12] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Structured Asset Deployment Scaling Corridors</h2>
            <p className="text-[#6B8F71] text-sm">Targeting high-value cluster deployments to convert localized biomass residue into measurable clean energy generation assets by 2026.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-1"><span>TOTAL ADDRESSABLE MARKET (TAM)</span><span>$100B</span></div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden"><div className="bg-[#F5A623] h-full w-full" /></div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-1"><span>SERVICEABLE ADDRESSABLE MARKET (SAM)</span><span>$3B</span></div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden"><div className="bg-[#2ECC71] h-full w-[45%]" /></div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="flex justify-between text-xs font-bold text-gray-400 mb-1"><span>TARGET CELL INSTALLATIONS (SOM)</span><span>2K - 5K units</span></div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden"><div className="bg-white h-full w-[15%]" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metric Verification Grid */}
      <section className="py-24 bg-[#F4F9F5]">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-extrabold text-center tracking-tight">Every Installation Counts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#0D1B12] text-[#2ECC71] rounded-xl"><Globe size={22} /></div>
              <div><h4 className="font-bold text-lg">90% Methane Reduction</h4><p className="text-xs text-[#6B8F71] mt-1">Intercepts harmful organic environmental gases at source before atmospheric escape.</p></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#0D1B12] text-[#F5A623] rounded-xl"><TrendingUp size={22} /></div>
              <div><h4 className="font-bold text-lg">65% Energy Cost Savings</h4><p className="text-xs text-[#6B8F71] mt-1">Systematically displaces costly diesel fueling configurations with steady localized biopower options.</p></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#0D1B12] text-[#2ECC71] rounded-xl"><Trash2 size={22} /></div>
              <div><h4 className="font-bold text-lg">5.2 Tonnes/Month Diverted</h4><p className="text-xs text-[#6B8F71] mt-1">Maintains clean operational footprints across local agricultural processing setups.</p></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-[#0D1B12] text-white rounded-xl"><Leaf size={22} /></div>
              <div><h4 className="font-bold text-lg">SDG Institutional Compliance</h4><p className="text-xs text-[#6B8F71] mt-1">Fully addresses United Nations frameworks for clean production and climate adaptation development metrics.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Phased Roadmap Component */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl font-extrabold text-center tracking-tight">Phased Scaling Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-4 border-l-4 border-[#1A7A4A] bg-[#F4F9F5] rounded-r-xl"><span className="text-xs font-bold text-[#1A7A4A] block">PHASE 01</span><span className="font-bold text-sm block">Pilot Optimization</span><span className="text-[11px] text-[#6B8F71]">Active validation testing setup</span></div>
            <div className="p-4 border-l-4 border-[#1A7A4A] bg-[#F4F9F5] rounded-r-xl"><span className="text-xs font-bold text-[#1A7A4A] block">PHASE 02</span><span className="font-bold text-sm block">Productization</span><span className="text-[11px] text-[#6B8F71]">Cooking gas & Biofertilizer deployment</span></div>
            <div className="p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-xl text-gray-400"><span className="text-xs font-bold block">PHASE 03</span><span className="font-bold text-sm block">EaaS Replication</span><span className="text-[11px] text-[#6B8F71]">Energy-as-a-Service subscriptions</span></div>
            <div className="p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-xl text-gray-400"><span className="text-xs font-bold block">PHASE 04</span><span className="font-bold text-sm block">Infrastructure Maturity</span><span className="text-[11px] text-[#6B8F71]">Grid injection + Carbon Credits</span></div>
            <div className="p-4 border-l-4 border-gray-200 bg-gray-50 rounded-r-xl text-gray-400"><span className="text-xs font-bold block">PHASE 05</span><span className="font-bold text-sm block">National Scale</span><span className="text-[11px] text-[#6B8F71]">Expansion along industrial corridors</span></div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="bg-[#0D1B12] text-white py-20 text-center px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to Turn Waste Into an Asset?</h2>
          <p className="text-gray-300 text-sm max-w-md mx-auto">Whether you manage a farm, processing plant, or industrial estate—Sync Energy can build your clean energy future.</p>
          <div className="pt-2">
            <button onClick={() => navigateTo("contact")} className="bg-[#1A7A4A] hover:bg-[#2ECC71] text-white font-bold px-8 py-3.5 rounded-full transition-all">Get in Touch</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */ 
/* 2. Solutions Route Component View */ 
/* ------------------------------------------------------------------ */ 
function SolutionsView() {
  const bomItems = [
    { name: "Biogas Digester Unit", price: "₦270,000", func: "Core anaerobic digestion tank framework" },
    { name: "Liquid pH Sensor", price: "₦15,000", func: "Monitors internal ecosystem acidity levels" },
    { name: "ESP32 IoT Board", price: "₦20,000", func: "Cloud telemetry pipeline communication processor" },
    { name: "3 Load Cells + HX711", price: "₦9,000", func: "Input/output mass conversion calculation" },
    { name: "DS18B20 Temp Kit", price: "₦5,000", func: "Continuous anaerobic heat metric monitoring" },
    { name: "MQ-4 Methane Sensor", price: "₦2,500", func: "Safety validation & instant trace leak mitigation" },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#F4F9F5]">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1A7A4A]">Commercial Cleantech Solutions</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0D1B12]">Systems Portfolio Breakdown</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100"><h3 className="text-lg font-bold">Livestock Farm Configurations</h3><p className="text-xs text-[#6B8F71] mt-1">Handles manure input loads to generate constant localized cooling power.</p></div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100"><h3 className="text-lg font-bold">Agro-Processing Units</h3><p className="text-xs text-[#6B8F71] mt-1">Engineered for cassava or rice mills seeking complete diesel generation displacement metrics.</p></div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100"><h3 className="text-lg font-bold">Community Power Hubs</h3><p className="text-xs text-[#6B8F71] mt-1">Decentralized microgrid arrays built to supply clusters of commercial infrastructure.</p></div>
        </div>

        {/* Telemetry Framework Block */}
        <div className="bg-[#0D1B12] text-white p-8 rounded-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold flex items-center gap-2"><Cpu className="text-[#2ECC71]" size={20} /> Cloud-Connected IoT Framework Monitoring</h3>
            <p className="text-xs text-gray-400">Continuous telemetry verification safe-checking optimization channels across 4 core vectors:</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5"><span className="font-bold text-[#2ECC71] block mb-1">01. INPUT STREAM</span>Mass metric scaling tracking load delivery weights.</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5"><span className="font-bold text-[#F5A623] block mb-1">02. GAS PRESSURE</span>Real-time extraction production flow rates.</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5"><span className="font-bold text-[#2ECC71] block mb-1">03. DIGESTATE QUALITY</span>Byproduct chemical nutrient capacity tracing.</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5"><span className="font-bold text-red-400 block mb-1">04. PROCESS SAFETY</span>Automated hazardous trace micro-leak mitigation maps.</div>
          </div>
        </div>

        {/* Bill of Materials Hardware Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-5 bg-[#0D1B12] text-white"><h4 className="font-bold">Pilot Bill of Materials (BOM)</h4></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F9F5] text-gray-600 font-bold uppercase border-b border-gray-100">
                <tr><th className="p-4">Component</th><th className="p-4">Deployment Function</th><th className="p-4 text-right">Unit Price</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {bomItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-[#0D1B12]">{item.name}</td>
                    <td className="p-4 text-gray-500">{item.func}</td>
                    <td className="p-4 text-right font-bold text-[#1A7A4A]">{item.price}</td>
                  </tr>
                ))}
                <tr className="bg-[#1A7A4A]/5 font-bold text-base text-[#1A7A4A]">
                  <td className="p-4">TOTAL</td>
                  <td className="text-xs text-gray-400 font-normal p-4">Estimated framework setup optimization cost per automated cell unit</td>
                  <td className="p-4 text-right">₦321,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */ 
/* 3. Process Route Component View */ 
/* ------------------------------------------------------------------ */ 
function HowItWorksView() {
  const steps = [
    "Organic raw waste inputs collected at target milling/farming source operations.",
    "Anaerobic localized bacteria decompose biomass feedstock inside custom cells.",
    "Raw bio-methane (CH₄ + CO₂) collection stored safely inside isolated arrays.",
    "Biomethane purification scrubbing lines eliminate moisture and trace gases.",
    "Purified biogas converted locally into grid-independent baseline electricity.",
    "Digestate residue fully separated for premium organic farming soil fertilizers."
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">The Science of Waste to Power</h1>
          <p className="text-sm text-[#6B8F71] max-w-md mx-auto">Closed-loop organic decomposition designed explicitly for industrial performance scales.</p>
        </div>

        {/* Chemical Formulation Presentation */}
        <div className="bg-[#F4F9F5] border border-[#1A7A4A]/10 rounded-2xl p-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block">Biochemical Transformation Flow</span>
          <div className="text-2xl sm:text-4xl font-mono font-bold text-[#1A7A4A]">
            C₆H₁₂O₆ → 3CH₄ + 3CO₂
          </div>
          <p className="text-[11px] text-[#6B8F71] max-w-sm mx-auto">Complex biological compounds convert efficiently into raw, energetic methane gas and useful agricultural soil components.</p>
        </div>

        {/* Process Map Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((text, index) => (
            <div key={index} className="p-5 rounded-xl bg-[#F4F9F5] border border-gray-50 flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-[#0D1B12] text-white font-bold text-xs flex items-center justify-center shrink-0">{index + 1}</span>
              <p className="text-xs leading-relaxed text-gray-700 font-medium">{text}</p>
            </div>
          ))}
        </div>

        {/* Proof of Concept Callout Frame */}
        <div className="bg-[#1A7A4A]/5 border border-[#1A7A4A]/20 p-6 rounded-xl space-y-2">
          <h4 className="font-bold flex items-center gap-2 text-[#1A7A4A]"><Flame size={18} /> MVP Validation: 16-Day Proof-of-Concept Flame Test</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            Our 25-litre operational testing laboratory testing configuration recorded complete biochemical breakdown stability, ensuring sustained combustion outputs alongside high nutrient retention capacity across all recovered organic soil bio-fertilizer volumes.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */ 
/* 4. Impact Route Component View */ 
/* ------------------------------------------------------------------ */ 
function ImpactView() {
  return (
    <div className="pt-32 pb-24 bg-[#F4F9F5]">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <h1 className="text-4xl font-black text-center text-[#0D1B12]">Strategic Impact & Environmental Mandate</h1>
        
        <div className="bg-[#0D1B12] text-white p-8 text-center rounded-2xl space-y-2">
          <p className="text-lg md:text-xl italic font-medium text-gray-200">
            "By intercepting methane at source, each operational unit prevents multiple tonnes of greenhouse CO₂ gases from polluting regional ecosystems annually."
          </p>
          <span className="text-[10px] tracking-widest uppercase font-bold text-[#2ECC71] block">Verified Cleantech Carbon Interception Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-xl border border-gray-100"><span className="text-xs font-bold px-2 py-0.5 bg-amber-500 text-white rounded">SDG 7</span><h4 className="font-bold mt-2">Clean Baseload Power</h4><p className="text-xs text-[#6B8F71] mt-1">Directly replaces volatile localized diesel combustion machinery generation setups.</p></div>
          <div className="p-5 bg-white rounded-xl border border-gray-100"><span className="text-xs font-bold px-2 py-0.5 bg-orange-600 text-white rounded">SDG 11</span><h4 className="font-bold mt-2">Sustainable Communities</h4><p className="text-xs text-[#6B8F71] mt-1">Removes high volumes of toxic unmanaged agricultural waste residues from local milling processing clusters.</p></div>
          <div className="p-5 bg-white rounded-xl border border-gray-100"><span className="text-xs font-bold px-2 py-0.5 bg-yellow-600 text-white rounded">SDG 12</span><h4 className="font-bold mt-2">Circular Production</h4><p className="text-xs text-[#6B8F71] mt-1">Transforms hazardous raw biomass runtime runoff assets completely into valuable farming infrastructure inputs.</p></div>
          <div className="p-5 bg-white rounded-xl border border-gray-100"><span className="text-xs font-bold px-2 py-0.5 bg-emerald-700 text-white rounded">SDG 13</span><h4 className="font-bold mt-2">Climate Action Integration</h4><p className="text-xs text-[#6B8F71] mt-1">Captures volatile methane gas expansion immediately at source positions before atmospheric emission.</p></div>
        </div>

        <div className="p-6 bg-white rounded-xl text-center border border-gray-100 space-y-2">
          <h4 className="font-bold text-lg">Scalable National Footprint Outlook</h4>
          <p className="text-xs text-[#6B8F71] max-w-md mx-auto">Targeting the modular deployment of 2,000 to 5,000 commercial-scale anaerobic units across major production sectors to anchor carbon-negative processing systems nationwide.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */ 
/* 5. About Route Component View */ 
/* ------------------------------------------------------------------ */ 
function AboutView() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1A7A4A]">The Sync Energy Narrative</span>
          <h1 className="text-4xl font-black text-[#0D1B12]">Origin & Core Principles</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs leading-relaxed text-gray-600">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0D1B12]">The Core Infrastructure Challenge</h4>
            <p>Sync Energy was established following a direct operational insight: regional agro-processors generate consistent, high-yield organic waste streams daily while suffering major revenue losses from unstable centralized grid networks.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#0D1B12]">Our Engineering Strategy</h4>
            <p>We bypassed unscalable small-scale consumer biogas designs to pioneer rugged, automated commercial-scale biodigesters capable of supplying continuous, telemetry-verified electricity directly to processing grids.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="p-4 bg-[#F4F9F5] rounded-xl"><h5 className="font-bold text-[#1A7A4A] mb-1">Localism</h5><p className="text-[11px] text-[#6B8F71]">Built utilizing locally sourced production assets to guarantee easy ongoing engineering maintenance.</p></div>
          <div className="p-4 bg-[#F4F9F5] rounded-xl"><h5 className="font-bold text-[#1A7A4A] mb-1">Innovation</h5><p className="text-[11px] text-[#6B8F71]">Integrating modern IoT monitoring architecture into large-scale anaerobic systems.</p></div>
          <div className="p-4 bg-[#F4F9F5] rounded-xl"><h5 className="font-bold text-[#1A7A4A] mb-1">Sustainability</h5><p className="text-[11px] text-[#6B8F71]">Delivering measurable carbon offset metrics without reducing plant production capacity.</p></div>
          <div className="p-4 bg-[#F4F9F5] rounded-xl"><h5 className="font-bold text-[#1A7A4A] mb-1">Accessibility</h5><p className="text-[11px] text-[#6B8F71]">Providing grid-independent commercial baseload energy arrays straight to localized production lines.</p></div>
        </div>

        <div className="p-8 bg-[#F4F9F5] rounded-2xl text-center space-y-4 border border-gray-100">
          <h4 className="font-bold">Leadership & Technical Expertise</h4>
          <div className="flex justify-center">
            <div className="space-y-2 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0D1B12] text-white flex items-center justify-center font-bold tracking-tight text-lg shadow-md">SE</div>
              <span className="text-xs font-bold text-[#0D1B12]">[Founder Profile Parameters Placeholder]</span>
              <span className="text-[11px] text-[#6B8F71]">Cleantech Systems Engineering Lead</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */ 
/* 6. Contact Route Component View */ 
/* ------------------------------------------------------------------ */ 
function ContactView() {
  return (
    <div className="pt-32 pb-24 bg-[#F4F9F5]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1A7A4A]">Consultation Framework Gateway</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0D1B12] tracking-tight">Deploy Sync Energy inside your operations</h1>
          <p className="text-xs text-[#6B8F71] leading-relaxed"> Ready to turn high-volume organic waste footprints into a reliable source of power? Complete our data verification form below. Our engineering team will assess your site's generation capacity parameters promptly.</p>
          <div className="space-y-2 pt-2 text-xs font-semibold text-[#0D1B12]">
            <div className="flex items-center gap-2"><Mail size={14} className="text-[#1A7A4A]" /> SyncEnergy@gmail.com</div>
            <div className="flex items-center gap-2">🌐 <a href="https://www.biogas-pilot.io" target="_blank" rel="noreferrer" className="underline hover:text-[#1A7A4A]">www.biogas-pilot.io</a></div>
          </div>
        </div>

        {/* Unified Safe Content Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Point of Contact / Name</label>
              <input type="text" required placeholder="e.g. Aliyu Rasaq" className="w-full text-xs border border-gray-200 bg-[#F4F9F5] p-3 rounded-lg focus:outline-none focus:border-[#1A7A4A]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Organization Entity</label>
              <input type="text" required placeholder="e.g. Allied Rice Mills Ltd" className="w-full text-xs border border-gray-200 bg-[#F4F9F5] p-3 rounded-lg focus:outline-none focus:border-[#1A7A4A]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
              <input type="email" required placeholder="e.g. management@alliedrice.ng" className="w-full text-xs border border-gray-200 bg-[#F4F9F5] p-3 rounded-lg focus:outline-none focus:border-[#1A7A4A]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">What best describes you?</label>
              <select className="w-full text-xs border border-gray-200 bg-[#F4F9F5] p-3 rounded-lg focus:outline-none focus:border-[#1A7A4A]">
                <option>Commercial Farmer</option>
                <option>Agro-Processor (Cassava/Rice/Milling)</option>
                <option>Industrial Estate Administrator</option>
                <option>Cleantech Investor</option>
                <option>Strategic Venture Partner</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Estimated Daily Biomass / Message</label>
              <textarea rows={3} required placeholder="Outline your raw biomass waste profile or current baseline electricity generator fuel expenses..." className="w-full text-xs border border-gray-200 bg-[#F4F9F5] p-3 rounded-lg focus:outline-none focus:border-[#1A7A4A]" />
            </div>
            <button type="submit" className="w-full bg-[#1A7A4A] hover:bg-[#2ECC71] text-white font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase transition-colors shadow-sm">
              Submit Framework Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

```
