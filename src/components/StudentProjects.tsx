import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Tag } from "lucide-react";

const StudentProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/data/projects").then((module) => {
      setProjects(module.localProjects);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-5 inline-flex">Student Showcase</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Future{" "}
              <span className="text-gradient">Innovators</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex"
          >
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white border border-white/[0.08] hover:border-white/20 px-5 py-2.5 rounded-xl transition-all duration-300 group"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`grid lg:grid-cols-5 gap-10 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Image — 3/5 width */}
              <div className={`lg:col-span-3 ${index % 2 === 1 ? "[direction:ltr]" : ""}`}>
                <div className="relative rounded-3xl overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060F]/70 via-transparent to-transparent z-10 pointer-events-none" />

                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-[360px] lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-[360px] lg:h-[440px] bg-card flex items-center justify-center">
                      <Tag className="w-12 h-12 text-white/10" />
                    </div>
                  )}

                  {/* Student badge */}
                  <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/30 border border-primary/40 flex items-center justify-center text-xs font-bold text-white">
                      {project.student_name?.[0] ?? "S"}
                    </div>
                    <span className="text-sm font-semibold text-white bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                      {project.student_name}
                    </span>
                  </div>

                  {/* Index label */}
                  <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 flex items-center justify-center text-xs font-bold text-white/60">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Content — 2/5 width */}
              <div className={`lg:col-span-2 space-y-6 ${index % 2 === 1 ? "[direction:ltr]" : ""}`}>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-4">
                    {project.title}
                  </h3>
                  {project.quote && (
                    <div className="relative pl-5 border-l-2 border-primary/40">
                      <p className="text-base italic text-white/50 font-light leading-relaxed">
                        "{project.quote}"
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-white/45 text-sm leading-relaxed font-light">
                  {project.description}
                </p>

                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-white/50 text-[11px] font-semibold uppercase tracking-wide rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center md:hidden"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"
          >
            View all projects <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentProjects;
