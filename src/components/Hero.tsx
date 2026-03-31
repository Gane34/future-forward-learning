import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, FolderOpen, GraduationCap, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-children-learning.jpg";

const stats = [
  { icon: Users, value: "200+", label: "Young Innovators" },
  { icon: FolderOpen, value: "50+", label: "Projects Built" },
  { icon: GraduationCap, value: "3", label: "Learning Levels" },
  { icon: MapPin, value: "Khammam", label: "Telangana" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">

      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="orb w-[700px] h-[700px] top-[-15%] right-[-10%] bg-violet-600/20" />
      <div className="orb w-[600px] h-[600px] bottom-[-20%] left-[-8%] bg-cyan-500/10" style={{ animationDelay: "3s", animationDirection: "alternate-reverse" }} />
      <div className="orb w-[300px] h-[300px] top-[40%] left-[35%] bg-primary/15" style={{ animationDelay: "1.5s" }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">
                <Sparkles className="w-3.5 h-3.5" />
                Future Forward Learning
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] text-white">
                Where Young
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05]">
                <span className="text-gradient-primary">Minds Build</span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] text-white">
                Tomorrow.
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-white/55 max-w-lg leading-relaxed font-light"
            >
              AI, Robotics & Coding education for children aged 9–13.
              A father's dream turned into a movement — bringing Silicon Valley
              skills to the heart of Telangana.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="/courses" className="btn-premium text-base px-8 py-4 rounded-xl">
                Start Learning Now
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
              <a href="/founder" className="btn-ghost text-base px-8 py-4">
                Our Story
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.07]"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1.5 text-primary/70">
                    <stat.icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium tracking-wide text-white/40 uppercase">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Rotating ring */}
            <div
              className="absolute w-[520px] h-[520px] rounded-full border border-primary/15 animate-spin-slow"
              style={{ borderStyle: "dashed" }}
            />
            <div
              className="absolute w-[440px] h-[440px] rounded-full border border-cyan-500/10 animate-spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "30s", borderStyle: "dashed" }}
            />

            {/* Main image frame */}
            <div className="relative w-[400px] h-[480px]">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-3xl scale-90" />

              {/* Image */}
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                <img
                  src={heroImage}
                  alt="Children learning AI and robotics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060F]/80 via-transparent to-transparent" />

                {/* Badge overlays */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white"
                >
                  ✦ Ages 9–13
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 border border-white/15">
                    <p className="text-xs text-white/50 font-medium uppercase tracking-widest mb-1">Founded by</p>
                    <p className="text-sm font-semibold text-white">Dr. Muggu Murali Krishna</p>
                    <p className="text-xs text-cyan-400 mt-0.5">PhD • AI Researcher • Educator</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating accent cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute -left-8 top-1/3 bg-[#0D0D1E]/90 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-2xl w-44"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-xs font-semibold text-white">AI & Robotics</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                />
              </div>
              <p className="text-[10px] text-white/40 mt-1.5">Curriculum depth: 85%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -right-6 bottom-1/4 bg-[#0D0D1E]/90 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-2xl"
            >
              <div className="text-2xl font-bold text-gradient-primary">15+</div>
              <p className="text-xs text-white/50 mt-0.5">Years of research</p>
              <p className="text-xs text-white/30">by the founder</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
