import { motion } from "framer-motion";
import { BookOpen, Brain, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    number: "01",
    title: "Memorization Isn't Enough",
    description:
      "Traditional education focuses on memorizing facts. In a world shaped by AI, children need to learn how to think, create, and solve problems — not just repeat answers.",
    color: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Brain,
    number: "02",
    title: "The Skills Gap Is Real",
    description:
      "By 2030, 85% of jobs will require skills that don't exist today. Logic, computational thinking, and creativity aren't optional — they're essential for your child's future.",
    color: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Children Learn Best by Doing",
    description:
      "Research shows hands-on, project-based learning improves retention by up to 75%. Our approach lets children build real things — robots, AI models, and creative projects.",
    color: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
];

const WhySection = () => {
  return (
    <section id="why" className="py-24 lg:py-32 bg-background section-scroll relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="section-label mb-5 inline-flex">The Challenge</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Why Traditional Education{" "}
            <span className="text-gradient">Falls Short</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed font-light">
            The world is changing faster than classrooms can keep up. Your child
            deserves an education that prepares them for what's coming.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative"
            >
              <div className={`relative h-full p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${reason.color} border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>

                {/* Large background number */}
                <div className="absolute -top-4 -right-2 text-[9rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none">
                  {reason.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-7 ${reason.iconBg} group-hover:scale-105 transition-transform duration-300`}>
                  <reason.icon className={`w-6 h-6 ${reason.iconColor}`} />
                </div>

                {/* Number label */}
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-3 block">
                  {reason.number}
                </span>

                <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
            <span className="text-2xl font-bold text-gradient">85%</span>
            <span className="text-sm text-white/40 font-light">of future jobs don't exist yet — we prepare children for them</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
