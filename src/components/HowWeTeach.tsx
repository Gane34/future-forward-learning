import { motion } from "framer-motion";
import { Eye, Monitor, Wrench, Mic2, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Eye,
    title: "Explain Simply",
    subtitle: "See",
    desc: "We begin by explaining concepts in a clear and child-friendly way using examples, visuals, and discussion. Every idea is broken down so any child can understand.",
    color: "violet",
  },
  {
    number: "02",
    icon: Monitor,
    title: "Show Live Demo",
    subtitle: "Learn",
    desc: "Students see concepts in action through whiteboard explanation, TV display, digital tools, and live demonstration. Seeing it real makes it click.",
    color: "cyan",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Hands-on Practice",
    subtitle: "Do",
    desc: "Children participate in practical activities, observation, simple tasks, and guided experimentation. Learning by doing builds real confidence.",
    color: "amber",
  },
  {
    number: "04",
    icon: Mic2,
    title: "Student Presentation",
    subtitle: "Explain",
    desc: "Students are encouraged to explain what they learned, speak confidently, and build self-expression. Teaching others is the deepest form of learning.",
    color: "green",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; num: string }> = {
  violet: { bg: "rgba(124,58,237,0.1)",  border: "rgba(124,58,237,0.25)", text: "#a78bfa", num: "#7c3aed" },
  cyan:   { bg: "rgba(6,182,212,0.1)",   border: "rgba(6,182,212,0.25)",  text: "#22d3ee", num: "#0891b2" },
  amber:  { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)", text: "#fbbf24", num: "#d97706" },
  green:  { bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)",  text: "#4ade80", num: "#16a34a" },
};

const HowWeTeach = () => {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, rgba(15,10,40,0.6) 50%, hsl(var(--background)) 100%)" }}>
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Wrench className="w-3.5 h-3.5" />
            How We Teach
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Our 4-Step<br />
            <span className="text-gradient">Teaching Method</span>
          </h2>
          <p className="text-white/45 font-light max-w-xl mx-auto text-base leading-relaxed">
            Our sessions are designed to be simple, interactive, practical, and confidence-building.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1]">
            <span className="text-sm font-bold text-white/70 tracking-wide">See → Learn → Do → Explain</span>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const c = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-3xl p-7 border flex flex-col"
                style={{ background: c.bg, borderColor: c.border }}
              >
                {/* Step number */}
                <div className="text-5xl font-black mb-4 leading-none" style={{ color: `${c.num}40` }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${c.text}15`, border: `1px solid ${c.border}` }}>
                  <Icon className="w-6 h-6" style={{ color: c.text }} />
                </div>

                {/* Subtitle pill */}
                <span className="text-[10px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: c.text }}>
                  Step {step.number} · {step.subtitle}
                </span>

                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed flex-1">{step.desc}</p>

                {/* Connector arrow (not on last) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex w-6 h-6 items-center justify-center z-10">
                    <ArrowRight className="w-4 h-4 text-white/20" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeTeach;
