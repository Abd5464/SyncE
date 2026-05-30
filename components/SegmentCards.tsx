"use client";
import { motion } from "framer-motion";
import { BarnIcon, Factory, Building } from "lucide-react"; // Note: customized fallback icon inside
import Link from "next/link";

export default function SegmentCards() {
  const cards = [
    {
      icon: <span className="text-2xl">🚜</span>,
      title: "Livestock Farms",
      desc: "Transform highly abundant organic manure loads into steady off-grid cooling and process matching electricity.",
    },
    {
      icon: <Factory size={24} />,
      title: "Agro-Processors",
      desc: "Tailored to high-scale Cassava and Rice mills expending millions daily on volatile diesel inputs.",
    },
    {
      icon: <Building size={24} />,
      title: "Industrial Estates",
      desc: "Decentralized community configurations seeking continuous, self-sufficient baseline commercial operational power.",
    },
  ];

  return (
    <section className="py-24 bg-white text-text">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-center tracking-tight mb-16">
          Built for Nigeria's Highest-Impact Industries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(26,122,74,0.08)" }}
              className="p-8 rounded-3xl border border-gray-100 bg-surface flex flex-col justify-between group transition-all duration-300"
              key={idx}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <Link href="/solutions" className="mt-8 text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
