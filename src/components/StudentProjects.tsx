import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import childrenRobotics from "@/assets/children-robotics.jpg";
import studentPresenting from "@/assets/student-presenting.jpg";

const projects = [
  {
    image: childrenRobotics,
    title: "Smart Obstacle Robot",
    age: "Ages 10–12",
    description:
      "Students designed and built a robot that navigates obstacles using ultrasonic sensors and basic AI decision logic.",
    tags: ["Robotics", "Sensors", "Logic"],
  },
  {
    image: studentPresenting,
    title: "AI Weather Predictor",
    age: "Ages 11–13",
    description:
      "A team project where students created a simple machine learning model to predict weather patterns using local data.",
    tags: ["AI", "Data", "Teamwork"],
  },
];

const StudentProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm tracking-wide uppercase mb-3">
            Real Results
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            What Our Students Create
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            These aren't hypothetical exercises. These are real projects built by
            real children — proof that young minds can achieve remarkable things.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-foreground backdrop-blur-sm">
                      {project.age}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentProjects;
