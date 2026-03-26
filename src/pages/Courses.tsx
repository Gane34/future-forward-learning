import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, Users, Cpu, Cog,
  Zap, Lock, Star, Tag
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const level0Topics = [
  "What is AI and Robotics?",
  "Basic electronics and circuits",
  "LED, buzzer, and simple sensor activities",
  "Introduction to Arduino",
  "Fun mini-projects and demos",
];

const level1Topics = [
  "Arduino programming basics",
  "Motors, sensors, and modules",
  "Traffic light, smart alarm, and obstacle projects",
  "Robot movement and control",
  "Project-based hands-on learning",
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Courses & Levels – MVR AI & Robotics Academy | Khammam, Telangana"
        description="Explore Level 0 (AI & Robotics Foundation) and Level 1 (Robotics Builder Program) at MVR AI & Robotics Academy, Khammam. Pilot batch at ₹999."
        keywords="AI robotics courses Khammam, Level 0 robotics kids, robotics foundation program, MVR AI & Robotics Academy levels, kids coding Telangana"
        ogUrl="https://mmkaisolutions.com/courses"
        canonicalUrl="https://mmkaisolutions.com/courses"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Courses – MVR AI & Robotics Academy",
          url: "https://mmkaisolutions.com/courses",
        }}
      />

      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="orb w-[600px] h-[600px] top-[-20%] right-[-10%] bg-violet-600/15" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label mb-6 inline-flex">Our Programs</span>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                Choose Your Child's{" "}
                <span className="text-gradient">Learning Level</span>
              </h1>
              <p className="text-lg text-white/45 max-w-2xl mx-auto font-light leading-relaxed">
                Two structured levels designed to take children from complete
                beginners to confident builders — at their own pace.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Level cards */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 space-y-10">

          {/* ── LEVEL 0 ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-transparent to-transparent"
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.12)" }}
          >
            {/* Pilot badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
              <Star className="w-3.5 h-3.5" />
              PILOT BATCH
            </div>

            <div className="p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-start">

              {/* Left */}
              <div>
                {/* Level label */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400/70">Level 0</p>
                    <h2 className="text-xl font-bold text-white leading-tight">AI & Robotics Foundation</h2>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/55">
                    <Users className="w-3.5 h-3.5" /> Age: 6–10 years
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/55">
                    <Zap className="w-3.5 h-3.5" /> Beginner-friendly
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/55">
                    <Clock className="w-3.5 h-3.5" /> Weekend batches
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Students are introduced to the exciting world of AI, electronics, sensors,
                  and beginner robotics through fun activities and simple projects.
                  This level builds interest and removes fear around technology.
                </p>

                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Focus Areas</p>
                <div className="space-y-2 mb-8">
                  {level0Topics.map((topic) => (
                    <div key={topic} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400/70 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60 font-light">{topic}</span>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white/40">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  Best for first-time learners who are new to technology and robotics.
                </div>
              </div>

              {/* Right: Pricing */}
              <div className="flex flex-col justify-center">
                <div
                  className="rounded-2xl p-8 border border-violet-500/20 text-center"
                  style={{ background: "rgba(124,58,237,0.08)" }}
                >
                  {/* Original price */}
                  <p className="text-sm text-white/30 font-light mb-1">Original price</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-white/25" />
                    <span className="text-2xl font-bold text-white/25 line-through">₹2,499</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.07] my-4" />

                  {/* Pilot price */}
                  <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
                    🎉 Pilot Batch Special
                  </p>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-black text-white">₹999</span>
                    <span className="text-white/40 text-sm font-light">/batch</span>
                  </div>
                  <p className="text-xs text-white/35 font-light mb-6">
                    Limited seats · One-time pilot pricing
                  </p>

                  {/* Savings badge */}
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-bold mb-6">
                    You save ₹1,500 — 60% off!
                  </div>

                  <button
                    onClick={() => navigate("/admission")}
                    className="w-full btn-premium py-4 rounded-xl text-base"
                  >
                    Enroll in Level 0
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-white/25 mt-3 font-light">
                    No hidden fees · Contact us before payment
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── LEVEL 1 ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-cyan-600/8 via-transparent to-transparent"
          >
            {/* Coming soon overlay */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-3xl">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-sm font-bold text-white/70 tracking-widest uppercase mb-2">Coming Soon</p>
                <p className="text-xs text-white/35 font-light max-w-xs">
                  Level 1 is currently in development.<br />
                  Complete Level 0 to be first in line.
                </p>
                <button
                  onClick={() => navigate("/admission")}
                  className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  Join Waitlist
                </button>
              </div>
            </div>

            {/* Content (blurred behind overlay) */}
            <div className="p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-start opacity-30 pointer-events-none select-none">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                    <Cog className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-cyan-400/70">Level 1</p>
                    <h2 className="text-xl font-bold text-white leading-tight">Robotics Builder Program</h2>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/55">
                    <Users className="w-3.5 h-3.5" /> Age: 9–14 years
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/55">
                    <Zap className="w-3.5 h-3.5" /> Intermediate
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
                  Students move from simple activities to building real robotics systems.
                  They learn how components work together and begin creating interactive
                  projects using Arduino, motors, sensors, and coding logic.
                </p>

                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Students Learn</p>
                <div className="space-y-2">
                  {level1Topics.map((topic) => (
                    <div key={topic} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400/70 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60 font-light">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-2xl p-8 border border-cyan-500/20 text-center" style={{ background: "rgba(6,182,212,0.08)" }}>
                  <p className="text-4xl font-black text-white mb-2">Coming Soon</p>
                  <p className="text-sm text-white/40 font-light">Pricing to be announced</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto px-6 lg:px-8 mt-14"
        >
          <div className="rounded-3xl p-8 lg:p-10 border border-white/[0.07] bg-white/[0.02] text-center">
            <p className="text-white/35 text-sm font-light mb-4">
              Not sure which level is right for your child?
            </p>
            <button
              onClick={() => navigate("/get-started")}
              className="btn-ghost px-8 py-3"
            >
              Schedule a Free Assessment Call
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
