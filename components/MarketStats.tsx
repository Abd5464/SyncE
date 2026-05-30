"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

export default function MarketStats() {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight">
            The Massive Scale of our Addressable Market
          </h2>
          <p className="text-muted leading-relaxed">
            Sync Energy targets structured deployment funnels to lock down high-yield generation clusters across prominent agrarian and production corridors by 2026.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-2xl font-bold font-heading">
                <AnimatedCounter value={19} suffix="M" />
              </h4>
              <p className="text-xs text-muted font-medium uppercase mt-1">Tonnes Feedstock Avail.</p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h4 className="text-2xl font-bold font-heading">
                <AnimatedCounter value={5000} />
              </h4>
              <p className="text-xs text-muted font-medium uppercase mt-1">Target Installations</p>
            </div>
          </div>
        </div>

        {/* Custom Visualized TAM/SAM/SOM Stack Funnel */}
        <div className="space-y-4">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Total Addressable Market (TAM)</span>
              <span className="text-secondary font-bold font-heading">$100 Billion</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-full" />
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl ml-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Serviceable Addressable Market (SAM)</span>
              <span className="text-primary-light font-bold font-heading">$3 Billion</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="bg-primary-light h-full w-[45%]" />
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl ml-8"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Target Share of Market (SOM)</span>
              <span className="text-white font-bold font-heading">2K–5K Units</span>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[15%]" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
