import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";



const StudentProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Local override for project images
    import("@/data/projects").then((module) => {
      setProjects(module.localProjects);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // Or a loading skeleton

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-semibold uppercase tracking-wider text-sm"
            >
              Student Showcase
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-3 text-foreground"
            >
              Future Innovators
            </motion.h2>
          </div>
          <motion.a
            href="/projects"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
          >
            View all projects <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-3/5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-[400px] bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">No Image</p>
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur text-foreground text-sm font-bold rounded-full">
                      {project.student_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-2/5 space-y-6">
                <h3 className="text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70">{project.title}</h3>
                {project.quote && (
                  <div className="pl-4 border-l-4 border-secondary/80">
                    <p className="text-lg italic text-muted-foreground font-light">"{project.quote}"</p>
                  </div>
                )}
                <p className="text-foreground/80 leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex gap-2 pt-2 flex-wrap">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wide rounded-md hover:bg-primary/20 transition-colors">
                      {tag}
                    </span>
                  ))}
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
