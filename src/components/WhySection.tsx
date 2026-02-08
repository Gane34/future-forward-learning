import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Brain, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    title: "Memorization Isn't Enough",
    description:
      "Traditional education focuses on memorizing facts. But in a world shaped by AI, children need to learn how to think, create, and solve problems — not just repeat answers.",
  },
  {
    icon: Brain,
    title: "The Skills Gap Is Real",
    description:
      "By 2030, 85% of jobs will require skills that don't exist today. Logic, computational thinking, and creativity aren't optional — they're essential for your child's future.",
  },
  {
    icon: Lightbulb,
    title: "Children Learn Best by Doing",
    description:
      "Research shows that hands-on, project-based learning improves retention by up to 75%. Our approach lets children build real things — robots, AI models, and creative projects.",
  },
];

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-20 lg:py-28 bg-background section-scroll">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wide uppercase mb-3">
            The Challenge
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            Why Traditional Education Falls Short
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The world is changing faster than classrooms can keep up. Your child
            deserves an education that prepares them for what's coming.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="group"
            >
              <div className="p-8 rounded-2xl glass-card hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--secondary),0.2)] h-full relative overflow-hidden group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-secondary/20">
                  <reason.icon size={26} className="text-secondary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3 tracking-wide">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
