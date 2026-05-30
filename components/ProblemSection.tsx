"use client";
import { motion } from "framer-motion";
import { ZapOff, Trash2 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function ProblemSection() {
  return (
    <section className="bg-dark text-white border-y border-primary/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: Energy Crisis */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -30 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center space-y-6"
        >
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400">
            <ZapOff size={24} />
          </div>
          <h3 className="text-5xl md:text-6xl font-black font-heading tracking-tight">
            <AnimatedCounter value={85} suffix="M+" />
          </h3>
          <p className="text-xl font-semibold text-gray-200 font-heading">
            Nigerians without reliable grid electricity grid connection.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Businesses and families lose billions daily running volatile, low-efficiency diesel generators to combat unpredictable grid collapses.
          </p>
        </motion.div>

        {/* Right Side: Waste Crisis */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 30 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 flex flex-col justify-center space-y-6"
        >
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
            <Trash2 size={24} />
          </div>
          <h3 className="text-5xl md:text-6xl font-black font-heading tracking-tight">
            <AnimatedCounter value={32} suffix="M" />
          </h3>
          <p className="text-xl font-semibold text-gray-200 font-heading">
            Tonnes of organic waste generated annually—over 50% untreated.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Unmanaged feedstock piles up in urban and agricultural hubs, releasing unchecked atmospheric methane and worsening regional hygiene crises.
          </p>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary-light py-6 text-center text-white font-heading text-lg font-bold tracking-wide">
        Two distinct national crises. One unified circular solution.
      </div>
    </section>
  );
}
