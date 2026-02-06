import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Wrench, Zap } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Think",
    subtitle: "Understand the Problem",
    description:
      "Children learn to ask the right questions, break down challenges, and form a plan — building critical thinking skills that last a lifetime.",
    color: "bg-accent",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Build",
    subtitle: "Create Real Solutions",
    description:
      "Using code, sensors, and creativity, they build working prototypes — from AI chatbots to obstacle-avoiding robots. Learning by making.",
    color: "bg-secondary/10",
  },
  {
    icon: Zap,
    number: "03",
    title: "Apply",
    subtitle: "Connect to the Real World",
    description:
      "Children present their projects, reflect on what they learned, and see how their skills connect to real-world problems and careers.",
    color: "bg-highlight-soft",
  },
];

const HowChildrenLearn = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wide uppercase mb-3">
            Our Approach
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            How Children Learn
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A proven 3-step framework that turns abstract concepts into hands-on
            experience — building confidence with every project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-border" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="relative text-center"
            >
              {/* Step circle */}
              <div className="relative z-10 mx-auto mb-6">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto shadow-sm`}>
                  <step.icon size={26} className="text-foreground" />
                </div>
              </div>

              <span className="text-xs font-bold text-secondary tracking-widest uppercase">
                Step {step.number}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-2 mb-1">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-foreground/70 mb-3">
                {step.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowChildrenLearn;
