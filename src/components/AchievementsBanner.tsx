import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Train, Award, ArrowRight, Sparkles } from "lucide-react";
import msmeLogo from "@/assets/msme logo.jpg";

const AchievementsBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] top-[-10%] left-[-5%] bg-amber-500/8" style={{ animationDelay: "1s" }} />
      <div className="orb w-[400px] h-[400px] bottom-[-10%] right-[-5%] bg-violet-600/10" style={{ animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-label inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            National Recognition
          </span>
        </motion.div>

        {/* Achievement card — MSME Hackathon 5.0 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border border-amber-500/25 cursor-pointer group"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(124,58,237,0.08) 50%, rgba(6,182,212,0.05) 100%)",
            boxShadow: "0 20px 80px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.1)"
          }}
          onClick={() => navigate("/founder#msme")}
        >
          {/* Shimmer line on top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          <div className="p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">

            {/* Left: Icon + MSME logo */}
            <div className="flex items-center gap-5 shrink-0">
              {/* Glow icon */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-xl scale-150" />
                <div className="relative w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Train className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              {/* MSME Logo */}
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-amber-500/20">
                <img
                  src={msmeLogo}
                  alt="MSME – Government of India"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Center: Text */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  🏆 MSME Hackathon 5.0
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/50">
                  Government of India
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                AI-Driven Autonomous Railway Track Inspection System
              </h3>

              <p className="text-sm text-white/50 font-light leading-relaxed max-w-2xl">
                Innovation project associated with Dr. Murali Krishna selected under{" "}
                <span className="text-white/70 font-medium">MSME Hackathon 5.0</span> — aligned with the theme{" "}
                <em>"Innovation in Adoption of Industry 4.0 &amp; 5.0 in MSME Ecosystem."</em>{" "}
                Integrating computer vision, robotics &amp; predictive diagnostics for real-world railway infrastructure safety.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Computer Vision", "Robotics", "Predictive Diagnostics", "Industry 4.0 & 5.0", "Infrastructure Safety"].map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 font-light">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 tracking-wide">Selected Innovation</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate("/founder"); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all group-hover:border-amber-500/40 group-hover:text-amber-300"
              >
                Read More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsBanner;
