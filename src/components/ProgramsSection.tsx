import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles, Cpu, Monitor } from "lucide-react";

const programs = [
  {
    icon: Sparkles,
    title: "AI Little Champions",
    age: "Age 6–10",
    fee: "₹999",
    feeNote: "Pilot Batch",
    color: "violet",
    badge: "Beginner Friendly",
    description: "A fun and beginner-friendly batch designed to help children explore computer basics, creativity, simple AI exposure, digital confidence, and smart thinking.",
    skills: [
      "Basic computer handling",
      "Creative AI activities",
      "Fun digital tasks",
      "Logical thinking exercises",
      "Speaking & confidence practice",
      "Learning through play",
    ],
    bestFor: "Children who are just beginning their digital and future-skills journey.",
    gradient: "from-violet-600/12 via-violet-500/4 to-transparent",
    border: "border-violet-500/20",
    accentBg: "rgba(124,58,237,0.08)",
    accentText: "text-violet-400",
    accentBorder: "rgba(124,58,237,0.3)",
  },
  {
    icon: Cpu,
    title: "Level 0 Robotics",
    age: "Age 10–14",
    fee: "₹999",
    feeNote: "Pilot Batch",
    color: "cyan",
    badge: "Most Popular",
    description: "A practical hands-on program to introduce children to basic electronics, components, robotics concepts, mini projects, and confidence-building through explanation and presentation.",
    skills: [
      "Introduction to robotics",
      "Components & circuit basics",
      "Sensors & practical use",
      "Simple project building",
      "Problem-solving mindset",
      "Presentation skills",
    ],
    bestFor: "Students who enjoy building, exploring, experimenting, and learning by doing.",
    gradient: "from-cyan-600/12 via-cyan-500/4 to-transparent",
    border: "border-cyan-500/20",
    accentBg: "rgba(6,182,212,0.08)",
    accentText: "text-cyan-400",
    accentBorder: "rgba(6,182,212,0.3)",
  },
  {
    icon: Monitor,
    title: "Computer + Future Skills",
    age: "Age 8–14",
    fee: "Ask Us",
    feeNote: "Contact for fee",
    color: "green",
    badge: "Digital Foundation",
    description: "A practical digital foundation program to help children become comfortable with computers, smart digital usage, typing, productivity tools, and confident learning habits.",
    skills: [
      "Typing basics",
      "MS Office basics",
      "Smart internet usage",
      "Digital confidence",
      "Creative computer activities",
      "Foundation for future digital learning",
    ],
    bestFor: "Children who need strong computer basics and digital confidence in today's world.",
    gradient: "from-green-600/12 via-green-500/4 to-transparent",
    border: "border-green-500/20",
    accentBg: "rgba(34,197,94,0.08)",
    accentText: "text-green-400",
    accentBorder: "rgba(34,197,94,0.3)",
  },
];

const WhatsAppLink = "https://wa.me/919502952770?text=Hi%2C%20I%20want%20to%20enquire%20about%20the%20course";

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] top-[-5%] right-[-8%] bg-violet-600/10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-5 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            Our Programs
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Choose the Right Course<br />
            <span className="text-gradient">for Your Child</span>
          </h2>
          <p className="text-white/45 font-light max-w-xl mx-auto text-base leading-relaxed">
            Designed for children to learn with curiosity, confidence, creativity,
            and practical exposure to future-ready skills.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {programs.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden border ${prog.border} bg-gradient-to-br ${prog.gradient} flex flex-col`}
                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
              >
                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${prog.accentText}`}
                    style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}>
                    {prog.badge}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}>
                      <Icon className={`w-6 h-6 ${prog.accentText}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{prog.title}</h3>
                      <p className={`text-xs font-medium ${prog.accentText}`}>{prog.age}</p>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-white/[0.07]">
                    <span className="text-3xl font-black text-white">{prog.fee}</span>
                    <span className={`text-xs font-bold ${prog.accentText}`}>{prog.feeNote}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/50 font-light leading-relaxed mb-5">{prog.description}</p>

                  {/* Skills */}
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">What They Will Learn</p>
                  <div className="space-y-2 mb-6 flex-1">
                    {prog.skills.map((skill) => (
                      <div key={skill} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${prog.accentText} opacity-70`} />
                        <span className="text-xs text-white/55 font-light">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best for */}
                  <div className="p-3 rounded-xl mb-5 text-xs text-white/40 font-light leading-relaxed"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="font-semibold text-white/50">Best for: </span>{prog.bestFor}
                  </div>

                  {/* CTA */}
                  <a
                    href={WhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 4px 15px rgba(124,58,237,0.3)" }}
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/35 text-sm font-light mb-4">
            Not sure which batch is right for your child?
          </p>
          <a
            href={WhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
          >
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact us on WhatsApp — we will guide you
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
