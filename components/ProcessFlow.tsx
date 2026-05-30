"use client";
import { motion } from "framer-motion";
import { Trash, Zap, Leaf } from "lucide-react";

export default function ProcessFlow() {
  const steps = [
    {
      icon: <Trash size={24} />,
      title: "Waste Capture",
      desc: "Systematic collection of high-yield organic waste directly at the processing source.",
    },
    {
      icon: <Zap size={24} />,
      title: "Energy Service",
      desc: "Anaerobic processing converts organic raw methane into reliable baseload grid power.",
    },
    {
      icon: <Leaf size={24} />,
      title: "Bio-Fertilizer",
      desc: "Valuable pathogen-free byproduct processed directly into high-nutrient organic soil booster.",
    },
  ];

  return (
    <section className="py-24 bg-surface text-text">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight">
            On-Site Biodigesters. Waste In. Power Out.
          </h2>
          <p className="text-muted font-medium">
            How Sync Energy engineered a predictable, closed-loop value asset architecture.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {/* Animated Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0">
            <motion.div 
              whileInView={{ width: "100%" }}
              initial={{ width: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-primary"
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.3 }}
              key={idx}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-heading">{step.title}</h3>
              <p className="text-muted text-sm max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
