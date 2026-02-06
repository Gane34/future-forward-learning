import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Sparkles, Shield } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "Logical Thinking",
    stat: "Problem-solving",
    description:
      "Children develop structured thinking — learning to decompose problems, recognize patterns, and build solutions step by step.",
  },
  {
    icon: Sparkles,
    title: "Creativity & Confidence",
    stat: "Self-expression",
    description:
      "By creating their own projects, children discover they can build things that matter — gaining confidence that carries into all areas of life.",
  },
  {
    icon: Shield,
    title: "Future Readiness",
    stat: "Career preparation",
    description:
      "Understanding AI and technology from an early age gives children a meaningful advantage — not just for careers, but for navigating the world ahead.",
  },
];

const LearningOutcomes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="outcomes" className="py-20 lg:py-28 bg-warm">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wide uppercase mb-3">
            What Children Gain
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            More Than Knowledge — Skills for Life
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our goal isn't just to teach technology. It's to help children become
            confident, creative thinkers who are ready for whatever comes next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
            >
              <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                  <outcome.icon size={22} className="text-primary" />
                </div>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {outcome.stat}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {outcome.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {outcome.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
