import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code2, Cog, Rocket } from "lucide-react";
import childCoding from "@/assets/child-coding.jpg";

const subjects = [
  {
    icon: Cpu,
    title: "AI Fundamentals",
    description:
      "Children explore how artificial intelligence works through visual, age-appropriate experiments — from image recognition to simple decision trees.",
  },
  {
    icon: Code2,
    title: "Coding & Logic",
    description:
      "We teach computational thinking and coding fundamentals using block-based and text-based programming — building real, working programs.",
  },
  {
    icon: Cog,
    title: "Robotics & Engineering",
    description:
      "Hands-on robotics projects teach mechanics, sensors, and motor control. Children design, build, and test their own creations.",
  },
  {
    icon: Rocket,
    title: "Project-Based Learning",
    description:
      "Every module culminates in a real project. Children present their work, reflect on challenges, and celebrate their achievements.",
  },
];

const WhatWeTeach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="curriculum" className="py-20 lg:py-28 bg-warm">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={childCoding}
                alt="Child learning to code on a laptop in a modern classroom"
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-card rounded-xl shadow-lg p-4 border border-border">
              <p className="text-sm font-bold text-foreground">Ages 9–13</p>
              <p className="text-xs text-muted-foreground">Tailored curriculum</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-secondary font-semibold text-sm tracking-wide uppercase mb-3">
                Curriculum
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
                What We Teach
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                A carefully designed curriculum that blends technology with
                creativity — making complex concepts accessible and exciting for
                young minds.
              </p>
            </motion.div>

            <div className="space-y-6">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/15 transition-colors">
                    <subject.icon size={18} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {subject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {subject.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeTeach;
