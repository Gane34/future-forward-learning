import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Star, Zap, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-children-learning.jpg";

const badges = [
  "Small Batch Learning",
  "Hands-on Practical Training",
  "Confidence & Speaking Development",
  "Admissions Open",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">

      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="orb w-[600px] h-[600px] top-[-15%] right-[-10%] bg-violet-600/20" />
      <div className="orb w-[500px] h-[500px] bottom-[-20%] left-[-8%] bg-cyan-500/10" style={{ animationDelay: "3s", animationDirection: "alternate-reverse" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left: Content */}
          <div className="space-y-7">

            {/* Top label */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-label">
                <Star className="w-3.5 h-3.5" />
                MVR AI Robotics Academy · Khammam
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.1] text-white">
                AI, Robotics &
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.1]">
                <span className="text-gradient-primary">Computer Skills</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.1] text-white">
                for Kids
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-white/60 max-w-lg leading-relaxed font-light">
              Helping children build <strong className="text-white/80 font-medium">confidence, creativity, logical thinking,
              speaking skills</strong>, and future-ready tech exposure through practical learning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started" className="btn-premium text-base px-8 py-4 rounded-xl">
                Book Free Demo
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <a
                href="https://wa.me/919502952770?text=Hi%2C%20I%20want%20to%20know%20more%20about%20MVR%20AI%20Robotics%20Academy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base px-8 py-4 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Now
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60">
                  <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
              className="pt-4 flex flex-wrap gap-6 border-t border-white/[0.07]">
              {[
                { icon: Users, value: "50+", label: "Students Enrolled" },
                { icon: Star, value: "3", label: "Programs" },
                { icon: Zap, value: "Ages 6–16", label: "All Levels" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-none">{stat.value}</p>
                    <p className="text-[11px] text-white/35 font-light mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute w-[480px] h-[480px] rounded-full border border-primary/10 animate-spin-slow" style={{ borderStyle: "dashed" }} />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/8 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s", borderStyle: "dashed" }} />

            <div className="relative w-[380px] h-[460px]">
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl scale-90" />
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <img src={heroImage} alt="Children learning AI and robotics at MVR AI Robotics Academy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060F]/80 via-transparent to-transparent" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }}
                  className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white"
                >
                  ✦ Ages 6–16
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 border border-white/15">
                    <p className="text-xs text-white/50 font-medium uppercase tracking-widest mb-1">Taught by</p>
                    <p className="text-sm font-semibold text-white">Dr. Muggu Murali Krishna</p>
                    <p className="text-xs text-cyan-400 mt-0.5">PhD · AI Researcher · Educator · Mentor</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}
              className="absolute -left-10 top-1/3 bg-[#0D0D1E]/90 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-2xl w-44"
            >
              <p className="text-xs font-bold text-white/70 mb-1">Brand Statement</p>
              <p className="text-[11px] text-white/45 leading-relaxed font-light italic">
                "We Don't Just Teach Computers — We Help Children Think, Build, Speak &amp; Grow."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
              className="absolute -right-6 bottom-1/4 bg-[#0D0D1E]/90 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-2xl"
            >
              <div className="text-green-400 font-black text-lg">FREE</div>
              <p className="text-xs text-white/50 mt-0.5">Demo Class</p>
              <p className="text-xs text-white/30">Book yours today</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
