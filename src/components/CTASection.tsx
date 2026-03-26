import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Calendar } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] p-12 lg:p-20"
          style={{
            background: "linear-gradient(135deg, #1a0a3d 0%, #0f1240 40%, #0a2040 80%, #061828 100%)",
            boxShadow: "0 40px 120px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255,255,255,0.08)"
          }}
        >
          {/* Background orbs */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

          {/* Decorative ring */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
          <div className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full border border-white/[0.03]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-xs font-semibold text-white/70 tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Admissions Open — 2025–26
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Give Your Child the Tools
              <br />
              <span className="text-gradient animate-shimmer">to Shape the Future</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto font-light"
            >
              Join families who trust MVR AI & Robotics Academy to prepare their children —
              not just for school, but for life in an AI-powered world.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            >
              <a
                href="/get-started"
                className="btn-premium text-base px-8 py-4 rounded-xl"
              >
                Schedule a Free Consultation
                <ArrowRight className="w-4.5 h-4.5" />
              </a>
              <a
                href="/admission"
                className="btn-ghost text-base px-8 py-4 border-white/20 text-white hover:bg-white/10"
              >
                Apply for Admission
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/[0.08]"
            >
              {[
                { icon: Users, text: "200+ students enrolled" },
                { icon: Calendar, text: "Batches starting every month" },
                { icon: Sparkles, text: "Free first class trial" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-sm text-white/40">
                  <item.icon className="w-4 h-4 text-white/25" />
                  <span className="font-light">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
