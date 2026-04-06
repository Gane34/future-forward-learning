import { motion } from "framer-motion";
import { Mic2, Search, Brain, Wrench, MessageCircle, Zap } from "lucide-react";

const gains = [
  {
    icon: Mic2,
    title: "Confidence to Explain",
    desc: "Children are encouraged to speak, present, and express their understanding in every session. They leave with the ability to explain what they built.",
    color: "violet",
  },
  {
    icon: Search,
    title: "Curiosity for Technology",
    desc: "Students begin to see technology as something they can understand and explore — not something that's only for adults or 'smart people'.",
    color: "cyan",
  },
  {
    icon: Brain,
    title: "Better Logical Thinking",
    desc: "Activities are designed to improve observation, sequence, thinking, and problem-solving. Every activity challenges the mind gently.",
    color: "amber",
  },
  {
    icon: Wrench,
    title: "Hands-on Learning Mindset",
    desc: "Children learn through practical exposure, not just passive watching. They build, touch, test, and observe real results from their work.",
    color: "green",
  },
  {
    icon: MessageCircle,
    title: "Communication & Presentation",
    desc: "Students get opportunities to speak and explain, which helps confidence grow. Public speaking starts in a safe, friendly classroom.",
    color: "pink",
  },
  {
    icon: Zap,
    title: "Early Future-Skills Exposure",
    desc: "A strong foundation for digital, AI, robotics, and modern learning confidence. Your child will be prepared before most of their peers.",
    color: "orange",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#a78bfa" },
  cyan:   { bg: "rgba(6,182,212,0.08)",  border: "rgba(6,182,212,0.2)",  text: "#22d3ee" },
  amber:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#fbbf24" },
  green:  { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  text: "#4ade80" },
  pink:   { bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)", text: "#f472b6" },
  orange: { bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", text: "#fb923c" },
};

const StudentsGain = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] top-[-10%] right-[-8%] bg-cyan-500/8" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Zap className="w-3.5 h-3.5" />
            What Students Will Gain
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Skills That Last<br />
            <span className="text-gradient">a Lifetime</span>
          </h2>
          <p className="text-white/45 font-light max-w-xl mx-auto text-base leading-relaxed">
            Our goal is not just to teach content, but to help children develop
            useful life and future skills.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {gains.map((gain, i) => {
            const Icon = gain.icon;
            const c = colorMap[gain.color];
            return (
              <motion.div
                key={gain.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-2xl border"
                style={{ background: c.bg, borderColor: c.border }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${c.text}15`, border: `1px solid ${c.border}` }}>
                  <Icon className="w-5 h-5" style={{ color: c.text }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{gain.title}</h3>
                  <p className="text-xs text-white/50 font-light leading-relaxed">{gain.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm font-light italic"
        >
          ✦ We help children become more confident, curious, and future-ready.
        </motion.p>
      </div>
    </section>
  );
};

export default StudentsGain;
