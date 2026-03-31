import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, Code2, Cog, Rocket } from "lucide-react";

const subjects = [
  {
    icon: Cpu,
    title: "AI Fundamentals",
    description: "Demystifying artificial intelligence through visual experiments. Kids learn how machines 'see', 'hear', and 'learn' using hands-on activities.",
    tag: "Level 1 → 3",
    gradient: "from-violet-600/15 via-violet-500/5 to-transparent",
    iconGradient: "from-violet-500 to-purple-600",
    border: "hover:border-violet-500/30",
    glow: "hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]",
  },
  {
    icon: Code2,
    title: "Coding & Logic",
    description: "From block-based basics to Python. We build the logical foundation for computational thinking that lasts a lifetime.",
    tag: "Scratch → Python",
    gradient: "from-cyan-600/15 via-cyan-500/5 to-transparent",
    iconGradient: "from-cyan-500 to-teal-600",
    border: "hover:border-cyan-500/30",
    glow: "hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]",
  },
  {
    icon: Cog,
    title: "Robotics",
    description: "Engineering meets creativity. Hands-on mechanics, sensors, and programming robots that interact with and respond to the real world.",
    tag: "Hardware + Code",
    gradient: "from-orange-600/15 via-orange-500/5 to-transparent",
    iconGradient: "from-orange-500 to-amber-600",
    border: "hover:border-orange-500/30",
    glow: "hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]",
  },
  {
    icon: Rocket,
    title: "Innovation Lab",
    description: "Open-ended projects where students solve real-world problems using all the tools they've mastered. Showcased at our Demo Days.",
    tag: "Real Projects",
    gradient: "from-green-600/15 via-green-500/5 to-transparent",
    iconGradient: "from-green-500 to-emerald-600",
    border: "hover:border-green-500/30",
    glow: "hover:shadow-[0_20px_60px_rgba(34,197,94,0.15)]",
  },
];

const WhatWeTeach = () => {
  return (
    <section id="curriculum" className="py-24 lg:py-32 bg-background section-scroll relative overflow-hidden">
      {/* Grid dots */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-5 inline-flex">Our Curriculum</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Empowering Young Minds<br />
              <span className="text-gradient">to Shape the Future</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-white/45 text-base leading-relaxed max-w-sm font-light lg:text-right"
          >
            A holistic curriculum combining technical skills, critical thinking,
            and ethical reasoning for ages 9–13.
          </motion.p>
        </div>

        {/* Subject cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative p-7 rounded-3xl bg-gradient-to-br ${subject.gradient} border border-white/[0.07] ${subject.border} ${subject.glow} transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden`}
            >
              {/* Subtle shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.iconGradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <subject.icon className="w-6 h-6 text-white" />
              </div>

              {/* Tag */}
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/30 mb-3 block">
                {subject.tag}
              </span>

              <h3 className="text-lg font-bold text-white mb-3 relative z-10">
                {subject.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light relative z-10">
                {subject.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">3 Progressive Levels</p>
              <p className="text-xs text-white/40 font-light">Explorer → Builder → Innovator</p>
            </div>
          </div>
          <Link
            to="/courses"
            className="text-sm font-semibold text-primary hover:text-white flex items-center gap-1.5 transition-colors group/link"
          >
            View full curriculum
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeTeach;
