import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Shield, Star } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    category: "Problem-solving",
    title: "Logical Thinking",
    description:
      "Children develop structured thinking — learning to decompose problems, recognize patterns, and build solutions step by step.",
    stat: "3×",
    statLabel: "Better problem retention",
    gradient: "from-violet-500/15 to-transparent",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    statColor: "text-violet-400",
  },
  {
    icon: Sparkles,
    category: "Self-expression",
    title: "Creativity & Confidence",
    description:
      "By creating their own projects, children discover they can build things that matter — gaining confidence that carries into all areas of life.",
    stat: "75%",
    statLabel: "Higher learning retention",
    gradient: "from-cyan-500/15 to-transparent",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    statColor: "text-cyan-400",
  },
  {
    icon: Shield,
    category: "Career preparation",
    title: "Future Readiness",
    description:
      "Understanding AI and technology from an early age gives children a meaningful advantage — not just for careers, but for navigating the world.",
    stat: "85%",
    statLabel: "Of future jobs need tech skills",
    gradient: "from-amber-500/15 to-transparent",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    statColor: "text-amber-400",
  },
];

const LearningOutcomes = () => {
  return (
    <section id="outcomes" className="py-24 lg:py-32 bg-background section-scroll relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-5 inline-flex">What Children Gain</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            More Than Knowledge —{" "}
            <span className="text-gradient">Skills for Life</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed font-light">
            Our goal isn't just to teach technology. It's to help children
            become confident, creative thinkers ready for whatever comes next.
          </p>
        </motion.div>

        {/* Outcome cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${outcome.gradient} border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl border ${outcome.iconBg} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <outcome.icon className={`w-6 h-6 ${outcome.iconColor}`} />
              </div>

              {/* Category */}
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 mb-2 block">
                {outcome.category}
              </span>

              <h3 className="text-xl font-bold text-white mb-3">
                {outcome.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed font-light mb-8">
                {outcome.description}
              </p>

              {/* Stat */}
              <div className="mt-auto pt-6 border-t border-white/[0.07] flex items-end gap-3">
                <span className={`text-4xl font-black ${outcome.statColor} leading-none`}>
                  {outcome.stat}
                </span>
                <span className="text-xs text-white/35 font-light pb-1 leading-tight">
                  {outcome.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {[
            "Project-Based Learning",
            "Certified Curriculum",
            "Small Batch Sizes",
            "Ages 9–13 Specialist",
            "Real Hardware & Code",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs text-white/50 font-medium"
            >
              <Star className="w-3 h-3 text-amber-400/60" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
