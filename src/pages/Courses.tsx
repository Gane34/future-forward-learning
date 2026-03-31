import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, Users, Cpu, Cog,
  Zap, Lock, Star, Tag, BookOpen, TrendingUp, Award, Crown, Sparkles,
  MessageSquare, ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

/* ─────────────────────────────────────────
   Book / Course data
───────────────────────────────────────── */
const books = [
  {
    book: 1,
    badge: null,
    color: "violet",
    icon: BookOpen,
    title: "Little AI Champions",
    tagline: "Computer basics, MS Word, Excel, PowerPoint, Internet safety, Canva and ChatGPT — all in one course",
    price: 999,
    weeks: 5,
    sessions: 10,
    minPerSession: 90,
    classes: "Class 3 – 5",
    ages: "Age 8 – 10",
    prereq: "Complete beginners",
    skills: [
      "Computer parts", "Keyboard typing", "MS Word", "MS Excel",
      "PowerPoint", "Internet safety", "Canva design", "ChatGPT basics",
    ],
    description:
      "Your child arrives not knowing what a CPU is. They leave having typed a real letter in MS Word, built a class marks chart in Excel, designed a greeting card in Canva, and used ChatGPT to write a story. Every session produces something tangible they bring home and show you.",
    earnDay:
      "Design festival greeting cards for neighbours at Rs 30–50 each. By Session 6 your child can do this independently.",
    gradient: "from-violet-600/15 via-violet-500/5 to-transparent",
    borderColor: "border-violet-500/20",
    accentColor: "text-violet-400",
    bgAccent: "rgba(124,58,237,0.08)",
  },
  {
    book: 2,
    badge: "Most Popular",
    color: "cyan",
    icon: TrendingUp,
    title: "AI Champion Pro",
    tagline: "Advanced Excel with IF formula and VLOOKUP, professional Word reports, Google Workspace, ChatGPT RTCF, Gemini and NotebookLM",
    price: 1999,
    weeks: 5,
    sessions: 10,
    minPerSession: 90,
    classes: "Class 6 – 10",
    ages: "Age 11 – 15",
    prereq: "After Book 1 or basic computer user",
    skills: [
      "Excel IF formula", "VLOOKUP", "Budget tracker", "Word TOC report",
      "PPT SmartArt", "Google Workspace", "ChatGPT RTCF", "Gemini", "NotebookLM", "Canva certificate",
    ],
    description:
      "This is the course that separates children who use computers from children who work with computers. Excel's IF formula auto-assigns grades. VLOOKUP finds data instantly. NotebookLM turns your own textbook into an AI tutor. Google Forms collects answers automatically into a spreadsheet. These are not school skills — these are office skills. Most adults in Narasaraopet do not have them.",
    earnDay:
      "Build Excel trackers for local shops (Rs 200–500 setup). Design Canva certificates for school events using Bulk Create (Rs 5–10 each, 50 at a time).",
    gradient: "from-cyan-600/15 via-cyan-500/5 to-transparent",
    borderColor: "border-cyan-500/20",
    accentColor: "text-cyan-400",
    bgAccent: "rgba(6,182,212,0.08)",
  },
  {
    book: 3,
    badge: null,
    color: "amber",
    icon: Award,
    title: "Smart AI Creator",
    tagline: "Deep office skills, full Google Workspace, AI tools mastery, WhatsApp Business, digital income setup and Earn Day market",
    price: 2499,
    weeks: 8,
    sessions: 16,
    minPerSession: 90,
    classes: "Class 7 – 9",
    ages: "Age 12 – 15",
    prereq: "After Book 2 or intermediate user",
    skills: [
      "Excel dashboard", "Word letterhead", "PPT video export", "Canva Brand Kit",
      "Bulk Create", "Gmail professional", "Google Meet", "ChatGPT chain",
      "NotebookLM audio", "Cyber safety", "Typing 30 WPM", "WhatsApp Business", "Invoice writing",
    ],
    description:
      "Eight weeks of serious skill-building. This course gives each topic two full sessions so practice becomes confidence. By Week 7 students have a WhatsApp Business profile with a service catalog, a Canva design portfolio with at least 10 real pieces, and a simple invoice ready to send to a customer. The Earn Day market in Session 16 is a real selling event — parents browse your child's work and place actual orders.",
    earnDay:
      "Run a stall at Earn Day Market. WhatsApp Business catalog live. Design portfolio printed. Take real orders on the day. Students have earned Rs 200–800 at their first market.",
    gradient: "from-amber-600/15 via-amber-500/5 to-transparent",
    borderColor: "border-amber-500/20",
    accentColor: "text-amber-400",
    bgAccent: "rgba(245,158,11,0.08)",
  },
  {
    book: 4,
    badge: "Complete Journey",
    color: "green",
    icon: Crown,
    title: "Digital AI Champion",
    tagline: "Expert Excel with Pivot Tables, Mail Merge, AI ecosystem mastery, resume building, design portfolio and Grand Showcase with Earn Day Market",
    price: 2999,
    pricePremium: 3999,
    weeks: "12–16",
    sessions: "24–32",
    minPerSession: 90,
    classes: "Class 8 – 10",
    ages: "Age 13 – 16",
    prereq: "After Book 3 or advanced user",
    skills: [
      "Excel VLOOKUP", "Pivot Table", "MIS dashboard", "Mail Merge",
      "10-page report", "Narrated PPT video", "AI ecosystem", "Canva Bulk Create",
      "YouTube channel", "Google My Business", "Resume in Canva", "Design portfolio PDF",
      "Typing 35 WPM", "Earn Day Grand Market",
    ],
    description:
      "The complete Digital AI Champion course produces something most Class 10 graduates do not have — a professional resume, a 15-piece design portfolio, a WhatsApp Business profile with active customers, and measurable typing speed. The Rs 3,999 upgrade adds 4 revision weeks, a grand showcase ceremony, and the alumni community. Both versions end with a Grand Earn Day Market — a real public selling event where students interact with customers independently.",
    earnDay:
      "By graduation students have quoted prices, issued invoices, and received payment at least once. The portfolio and resume go straight to college admissions or job applications.",
    gradient: "from-green-600/15 via-green-500/5 to-transparent",
    borderColor: "border-green-500/20",
    accentColor: "text-green-400",
    bgAccent: "rgba(34,197,94,0.08)",
  },
];

const roboticsLevels = [
  {
    level: 0,
    title: "AI & Robotics Foundation",
    description: "Students are introduced to the exciting world of AI, electronics, sensors, and beginner robotics through fun activities and simple projects. This level builds interest and removes fear around technology.",
    ages: "6–10 years",
    price: 999,
    originalPrice: 2499,
    status: "open",
    badge: "Pilot Batch",
    topics: ["What is AI and Robotics?", "Basic electronics and circuits", "LED, buzzer, and simple sensor activities", "Introduction to Arduino", "Fun mini-projects and demos"],
    icon: Cpu,
    color: "violet",
  },
  {
    level: 1,
    title: "Robotics Builder Program",
    description: "Students move from simple activities to building real robotics systems. They learn how components work together and begin creating interactive projects using Arduino, motors, sensors, and coding logic.",
    ages: "9–14 years",
    price: null,
    status: "coming",
    badge: "Coming Soon",
    topics: ["Arduino programming basics", "Motors, sensors, and modules", "Traffic light, smart alarm, and obstacle projects", "Robot movement and control", "Project-based hands-on learning"],
    icon: Cog,
    color: "cyan",
  },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Courses & Levels – MVR AI & Robotics Academy | Khammam, Telangana"
        description="Explore all 4 learning books — Little AI Champions, AI Champion Pro, Smart AI Creator, Digital AI Champion — plus Robotics Level 0 & 1 at MVR AI & Robotics Academy."
        keywords="AI courses Khammam, robotics kids Telangana, Little AI Champions, AI Champion Pro, Smart AI Creator, Digital AI Champion, MVR AI Robotics Academy"
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

        {/* ── Page Hero ── */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="orb w-[600px] h-[600px] top-[-20%] right-[-10%] bg-violet-600/15" />
          <div className="orb w-[400px] h-[400px] bottom-[-10%] left-[-5%] bg-cyan-500/10" style={{ animationDelay: "2s" }} />

          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="section-label mb-6 inline-flex">
                <Sparkles className="w-3.5 h-3.5" />
                Solo Taught by Dr. Murali
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                The Complete{" "}
                <span className="text-gradient">Learning Ladder</span>
              </h1>
              <p className="text-lg text-white/45 max-w-2xl mx-auto font-light leading-relaxed mb-8">
                Four progressive books — from complete beginner to Digital AI Champion.
                Every session produces something real. Every level builds a skill your child
                can use to earn.
              </p>

              {/* Stats strip */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                {[
                  { val: "4", label: "Learning Books" },
                  { val: "60+", label: "Total Sessions" },
                  { val: "90 min", label: "Per Session" },
                  { val: "1 Teacher", label: "Dr. Murali, PhD" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                    <span className="text-white font-bold">{s.val}</span>
                    <span className="font-light">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4 Books ── */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8 mb-24">
          {books.map((book, idx) => {
            const Icon = book.icon;
            return (
              <motion.div
                key={book.book}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.08 }}
                className={`relative rounded-3xl overflow-hidden border ${book.borderColor} bg-gradient-to-br ${book.gradient}`}
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
              >
                {/* Top bar */}
                <div
                  className="px-8 pt-7 pb-0 flex flex-wrap items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Book number pill */}
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] ${book.accentColor}`}>
                      Book {book.book} of 4
                    </span>
                    {book.badge && (
                      <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400`}>
                        {book.badge === "Most Popular" ? "⭐ " : "🏆 "}{book.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/30 font-light">Solo taught</span>
                </div>

                {/* Main content */}
                <div className="p-8 lg:p-10 grid lg:grid-cols-3 gap-10">

                  {/* Left: Info (2 cols) */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${book.accentColor}`} />
                        </div>
                        <div>
                          <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight">{book.title}</h2>
                        </div>
                      </div>
                      <p className="text-sm text-white/45 font-light leading-relaxed">{book.tagline}</p>
                    </div>

                    {/* Meta tags */}
                    <div className="flex flex-wrap gap-2">
                      {[book.classes, book.ages, book.prereq].map((tag) => (
                        <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50 font-light">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/55 leading-relaxed font-light">{book.description}</p>

                    {/* Earn Day */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20">
                      <span className="text-lg shrink-0">💰</span>
                      <div>
                        <p className="text-xs font-bold text-amber-400 tracking-wide mb-1">Earn Day Idea</p>
                        <p className="text-xs text-white/50 font-light leading-relaxed">{book.earnDay}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.18em] mb-3">Skills Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {book.skills.map((skill) => (
                          <span key={skill} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/50 font-light">
                            <CheckCircle2 className={`w-3 h-3 ${book.accentColor} opacity-70`} />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Pricing card */}
                  <div className="flex flex-col justify-center">
                    <div
                      className={`rounded-2xl p-7 border ${book.borderColor} text-center space-y-4`}
                      style={{ background: book.bgAccent }}
                    >
                      {/* Session stats */}
                      <div className="grid grid-cols-3 gap-2 pb-4 border-b border-white/[0.07]">
                        {[
                          { val: book.weeks, label: "Weeks" },
                          { val: book.sessions, label: "Sessions" },
                          { val: book.minPerSession, label: "Min each" },
                        ].map((s) => (
                          <div key={s.label} className="text-center">
                            <p className={`text-xl font-black ${book.accentColor}`}>{s.val}</p>
                            <p className="text-[10px] text-white/35 font-light">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Price */}
                      {book.book === 4 ? (
                        <div className="space-y-2">
                          <div>
                            <p className="text-[10px] text-white/35 uppercase tracking-widest font-light mb-1">Standard · 12 weeks</p>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-3xl font-black text-white">₹{book.price?.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                          <div className="h-px bg-white/[0.06]" />
                          <div>
                            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold mb-1">Premium · 16 weeks + Alumni</p>
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-3xl font-black text-amber-400">₹{book.pricePremium?.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-light mb-1">Course fee</p>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-xs text-white/40 font-light">₹</span>
                            <span className="text-4xl font-black text-white">{book.price?.toLocaleString("en-IN")}</span>
                          </div>
                          <p className="text-[10px] text-white/30 font-light mt-1">for {book.sessions} sessions</p>
                        </div>
                      )}

                      {/* CTA */}
                      <button
                        onClick={() => navigate("/get-started")}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                        style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 4px 15px rgba(124,58,237,0.3)" }}
                      >
                        Enquire about this course
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-[10px] text-white/25 font-light">Contact us before payment · No hidden fees</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ── Dr. Murali banner ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 lg:px-8 mb-24"
        >
          <div
            className="rounded-3xl p-8 lg:p-12 border border-white/[0.07] relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #0f1240 50%, #061828 100%)" }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-violet-600/15 blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400/70 mb-2">
                  All 4 courses are taught personally by Dr. Murali — no assistant needed
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                  Dr. Muggu Murali Krishna (PhD Pharmacy)
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed max-w-2xl">
                  teaches every session of all 4 courses himself. No hardware kits. No co-teacher required.
                  Morning batches run independently using only a laptop and projector. This means consistent quality,
                  flexible scheduling, and a course that runs whenever Dr. Murali runs it — regardless of any other factors.
                </p>
              </div>
              <button
                onClick={() => navigate("/founder")}
                className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
              >
                Meet Dr. Murali →
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── Robotics Programs ── */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="section-label mb-5 inline-flex">
              <Cpu className="w-3.5 h-3.5" />
              Robotics Programs
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Hardware · Electronics · <span className="text-gradient">Robotics</span>
            </h2>
            <p className="text-white/40 font-light max-w-lg mx-auto text-sm">
              Hands-on robotics with real components — sensors, Arduino, and motors.
              Designed for children who want to build things that move.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {roboticsLevels.map((lvl, idx) => {
              const Icon = lvl.icon;
              const isOpen = lvl.status === "open";
              return (
                <motion.div
                  key={lvl.level}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative rounded-3xl overflow-hidden border ${isOpen ? "border-violet-500/20" : "border-white/[0.07]"}`}
                  style={{ background: isOpen ? "rgba(124,58,237,0.06)" : "rgba(255,255,255,0.02)" }}
                >
                  {/* Coming soon overlay */}
                  {!isOpen && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
                      <div className="text-center px-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                          <Lock className="w-6 h-6 text-cyan-400" />
                        </div>
                        <p className="text-sm font-bold text-white/70 tracking-widest uppercase mb-2">Coming Soon</p>
                        <p className="text-xs text-white/35 font-light max-w-xs">
                          Level 1 is in development.<br />Complete Level 0 to be first in line.
                        </p>
                        <button
                          onClick={() => navigate("/admission")}
                          className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                        >
                          Join Waitlist
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={`p-8 ${!isOpen ? "opacity-30 pointer-events-none select-none" : ""}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl ${isOpen ? "bg-violet-500/15 border-violet-500/25" : "bg-cyan-500/15 border-cyan-500/25"} border flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${isOpen ? "text-violet-400" : "text-cyan-400"}`} />
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5 ${isOpen ? "text-violet-400/70" : "text-cyan-400/70"}`}>Level {lvl.level}</p>
                          <h3 className="text-lg font-bold text-white">{lvl.title}</h3>
                        </div>
                      </div>
                      {isOpen && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                          ⭐ {lvl.badge}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50">
                        <Users className="w-3 h-3" /> {lvl.ages}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50">
                        <Zap className="w-3 h-3" /> {lvl.level === 0 ? "Beginner-friendly" : "Intermediate"}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50">
                        <Clock className="w-3 h-3" /> Weekend batches
                      </span>
                    </div>

                    <p className="text-sm text-white/50 font-light leading-relaxed mb-5">{lvl.description}</p>

                    {/* Topics */}
                    <div className="space-y-1.5 mb-7">
                      {lvl.topics.map((t) => (
                        <div key={t} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isOpen ? "text-violet-400/70" : "text-cyan-400/70"}`} />
                          <span className="text-xs text-white/55 font-light">{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & CTA */}
                    {isOpen ? (
                      <div className="flex items-center justify-between pt-5 border-t border-white/[0.07]">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white/25 text-sm line-through font-light">₹{lvl.originalPrice?.toLocaleString("en-IN")}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 font-bold">60% off</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-white">₹{lvl.price}</span>
                            <span className="text-white/35 text-xs font-light">/batch</span>
                          </div>
                          <p className="text-[10px] text-amber-400 font-bold mt-0.5">🎉 Pilot batch special</p>
                        </div>
                        <button
                          onClick={() => navigate("/admission")}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 4px 15px rgba(124,58,237,0.3)" }}
                        >
                          Enroll Now <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="pt-5 border-t border-white/[0.07] text-center">
                        <p className="text-2xl font-black text-white/20">Coming Soon</p>
                        <p className="text-xs text-white/30 font-light mt-1">Pricing to be announced</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Learning Ladder summary ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 lg:px-8 mb-16"
        >
          <div className="rounded-3xl p-8 lg:p-10 border border-white/[0.07] bg-white/[0.02]">
            <div className="text-center mb-8">
              <span className="section-label mb-4 inline-flex">The Learning Ladder</span>
              <h3 className="text-2xl font-bold text-white">Complete all four in order for the full journey</h3>
              <p className="text-sm text-white/40 font-light mt-2">from beginner to Digital AI Champion</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { book: 1, title: "Little AI Champions", price: "₹999", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                { book: 2, title: "AI Champion Pro", price: "₹1,999", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                { book: 3, title: "Smart AI Creator", price: "₹2,499", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                { book: 4, title: "Digital AI Champion", price: "₹2,999+", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
              ].map((step, i) => (
                <div key={step.book} className={`relative rounded-2xl p-4 border ${step.bg} text-center`}>
                  {i < 3 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-white/20" />
                    </div>
                  )}
                  <p className={`text-2xl font-black mb-1 ${step.color}`}>#{step.book}</p>
                  <p className="text-xs font-semibold text-white leading-tight mb-2">{step.title}</p>
                  <p className={`text-sm font-bold ${step.color}`}>{step.price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Bottom CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 lg:px-8"
        >
          <div className="rounded-3xl p-8 lg:p-10 border border-white/[0.07] bg-white/[0.02] text-center">
            <MessageSquare className="w-8 h-8 text-primary/50 mx-auto mb-4" />
            <p className="text-white font-semibold text-lg mb-2">Not sure which course is right for your child?</p>
            <p className="text-white/35 text-sm font-light mb-6 max-w-md mx-auto">
              Talk to Dr. Murali directly. We'll recommend the right starting point based on your child's age and current skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/get-started")}
                className="btn-premium px-8 py-3"
              >
                Schedule a Free Call
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/admission")}
                className="btn-ghost px-8 py-3"
              >
                Apply for Admission
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
