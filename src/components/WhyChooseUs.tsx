import { motion } from "framer-motion";
import { Users, Zap, Cpu, Mic2, Heart, BookOpen } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Small Batch Personal Attention",
    desc: "Every child gets more guidance, support, and active involvement. We keep batches small so every student is seen, heard, and helped.",
    color: "violet",
  },
  {
    icon: Zap,
    title: "Practical Hands-on Learning",
    desc: "Children learn by doing, observing, exploring, and explaining — not just by listening. Every session has an activity.",
    color: "amber",
  },
  {
    icon: Cpu,
    title: "AI & Robotics Exposure from Early Age",
    desc: "Students get early awareness of future-ready technology in a simple and enjoyable way that builds curiosity, not fear.",
    color: "cyan",
  },
  {
    icon: Mic2,
    title: "Confidence & Speaking Development",
    desc: "We encourage students to explain what they learn, speak confidently, and express their ideas. Speaking is a skill we build every class.",
    color: "green",
  },
  {
    icon: Heart,
    title: "Friendly & Safe Learning Environment",
    desc: "A comfortable and supportive atmosphere where children can learn without fear, ask questions freely, and enjoy the process.",
    color: "pink",
  },
  {
    icon: BookOpen,
    title: "Project & Presentation-Based Learning",
    desc: "Students are encouraged to create, observe, present, and grow with practical learning experiences they can show their parents.",
    color: "orange",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#a78bfa", glow: "rgba(124,58,237,0.15)" },
  amber:  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#fbbf24", glow: "rgba(245,158,11,0.15)" },
  cyan:   { bg: "rgba(6,182,212,0.08)",  border: "rgba(6,182,212,0.2)",  text: "#22d3ee", glow: "rgba(6,182,212,0.15)" },
  green:  { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.2)",  text: "#4ade80", glow: "rgba(34,197,94,0.15)" },
  pink:   { bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)", text: "#f472b6", glow: "rgba(236,72,153,0.15)" },
  orange: { bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)", text: "#fb923c", glow: "rgba(249,115,22,0.15)" },
};

const WhyChooseUs = () => {
  return (
    <section id="why" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] bottom-[-10%] left-[-5%] bg-violet-600/10" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Heart className="w-3.5 h-3.5" />
            Why Parents Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            More Than Just a<br />
            <span className="text-gradient">Tech Class</span>
          </h2>
          <p className="text-white/45 font-light max-w-xl mx-auto text-base leading-relaxed">
            We focus not only on learning, but also on confidence, curiosity,
            communication, and practical exposure for children.
          </p>
        </motion.div>

        {/* 6 Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const c = colorMap[reason.color];
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-3xl p-7 border transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                style={{ background: c.bg, borderColor: c.border, boxShadow: `0 0 0 0 ${c.glow}` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${c.glow} 0%, transparent 70%)` }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <Icon className="w-6 h-6" style={{ color: c.text }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 leading-snug">{reason.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm font-light italic"
        >
          ✦ We aim to build confident learners, not just passive students.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
