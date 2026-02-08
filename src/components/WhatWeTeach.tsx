import { motion } from "framer-motion";
import { Cpu, Code2, Cog, Rocket, Brain, Users } from "lucide-react";

const subjects = [
  {
    icon: Cpu,
    title: "AI Fundamentals",
    description: "Demystifying artificial intelligence through visual experiments. Kids learn how machines 'see' and 'learn'.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Code2,
    title: "Coding & Logic",
    description: "From block-based basics to Python. We build the logical foundation for computational thinking.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Cog,
    title: "Robotics",
    description: "Engineering meets creativity. Hands-on mechanics, sensors, and building robots that interact with the world.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Rocket,
    title: "Innovation Lab",
    description: "Open-ended projects where students solve real-world problems using the tools they've mastered.",
    color: "bg-green-500/10 text-green-600",
  },
];

const WhatWeTeach = () => {
  return (
    <section id="curriculum" className="py-24 bg-background relative section-scroll">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold uppercase tracking-wider text-sm"
          >
            Our Curriculum
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-6"
          >
            Empowering Young Minds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A holistic approach combining technical skills with critical thinking and ethical reasoning.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl glass-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--primary),0.2)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${subject.color} bg-opacity-20 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <subject.icon size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 tracking-wide text-foreground relative z-10">{subject.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-light relative z-10">
                {subject.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeTeach;
