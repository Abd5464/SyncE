"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
  const headlineWords = "Waste to Power. Locally Built. Nationally Scalable.".split(" ");

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-dark to-[#112418] flex flex-col justify-center items-center px-6 pt-24 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-heading leading-tight">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="inline-block mr-3"
            >
              {word === "Locally" || word === "Nationally" ? (
                <span className="text-primary-light">{word}</span>
              ) : word === "Power." ? (
                <span className="text-secondary">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Sync Energy deploys IoT-enabled biodigesters that turn Nigeria's 32 million tonnes of annual organic waste into clean, decentralized electricity and bio-fertilizer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/solutions" className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all group shadow-lg shadow-primary/20">
            Explore Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/how-it-works" className="w-full sm:w-auto border border-white/20 hover:border-white/40 bg-white/5 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all">
            <Play size={16} fill="white" /> Watch How It Works
          </Link>
        </motion.div>
      </div>

      {/* Sustainable SDG Banner */}
      <div className="absolute bottom-0 left-0 w-full bg-dark/60 border-t border-white/5 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center">
          <div className="flex gap-8 items-center text-xs tracking-wider text-muted font-semibold uppercase animate-pulse">
            <span>Aligned with UN SDGs:</span>
            <span className="text-white bg-primary/20 px-3 py-1 rounded">SDG 7 Clean Energy</span>
            <span className="text-white bg-primary/20 px-3 py-1 rounded">SDG 11 Sustainable Cities</span>
            <span className="text-white bg-primary/20 px-3 py-1 rounded">SDG 12 Responsible Consumption</span>
            <span className="text-white bg-primary/20 px-3 py-1 rounded">SDG 13 Climate Action</span>
          </div>
        </div>
      </div>
    </section>
  );
}
