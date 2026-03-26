import { motion } from "framer-motion";
import { Lightbulb, Wrench, Zap } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Think",
    subtitle: "Understand the Problem",
    description:
      "Children learn to ask the right questions, break down challenges, and form a plan — building critical thinking skills that last a lifetime.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    lineColor: "from-amber-500/40 to-cyan-500/40",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Build",
    subtitle: "Create Real Solutions",
    description:
      "Using code, sensors, and creativity, they build working prototypes — from AI chatbots to obstacle-avoiding robots. Learning by making.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    lineColor: "from-cyan-500/40 to-violet-500/40",
  },
  {
    icon: Zap,
    number: "03",
    title: "Apply",
    subtitle: "Connect to the Real World",
    description:
      "Children present their projects, reflect on what they learned, and see how their skills connect to real-world problems and future careers.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    lineColor: "",
  },
];

const HowChildrenLearn = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle horizontal glow */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="section-label mb-5 inline-flex">Our Approach</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            How Children{" "}
            <span className="text-gradient">Actually Learn</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed font-light">
            A proven 3-step framework that turns abstract concepts into
            hands-on experience — building confidence with every project.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[3.75rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-amber-500/30 via-cyan-500/30 to-violet-500/30" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step icon circle */}
                <div className="relative z-10 mb-8">
                  <div className={`w-[7.5rem] h-[7.5rem] rounded-3xl border ${step.bg} ${step.glow} flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                    <span className={`text-xs font-bold tracking-[0.2em] ${step.color}/60 uppercase`}>
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="max-w-xs">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className={`text-sm font-semibold ${step.color}/80 mb-4 tracking-wide`}>
                    {step.subtitle}
                  </p>
                  <p className="text-white/45 text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Step number watermark */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                  {step.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-white/30 text-sm font-light">
            Every session follows this framework — ensuring no child is left behind
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowChildrenLearn;
