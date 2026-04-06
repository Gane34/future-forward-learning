import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Clock, Users } from "lucide-react";

const FounderBatchBanner = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0a3d 0%, #0f1240 35%, #0a1f3f 70%, #071520 100%)",
            boxShadow: "0 30px 100px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            border: "1px solid rgba(245,158,11,0.25)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

          {/* Glow orbs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-500/15 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-violet-600/20 blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-14">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

              {/* Left */}
              <div className="flex-1">
                {/* Urgency badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-black tracking-widest uppercase">
                    <Flame className="w-3.5 h-3.5" /> Founder Batch
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> Limited Seats
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-white/60 text-xs font-bold uppercase tracking-widest">
                    Early Fee Offer
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Founder Batch<br />
                  <span style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Admissions Open
                  </span>
                </h2>

                <p className="text-white/55 leading-relaxed font-light max-w-xl mb-5">
                  We are launching our special Founder Batch for children who want to learn future skills
                  through practical, enjoyable, and confidence-building sessions. This is the <strong className="text-white/80">best time to join early</strong> and
                  grow with our academy from the beginning.
                </p>

                <p className="text-amber-400/80 text-sm font-medium italic mb-6">
                  ✦ Be among the first students to join our AI &amp; Robotics learning journey.
                </p>

                {/* Highlights row */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Users, text: "Small Batch" },
                    { icon: Flame, text: "Early Fee Offer" },
                    { icon: Clock, text: "Limited Seats Only" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-white/50 font-light">
                      <item.icon className="w-4 h-4 text-amber-400/60" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col gap-4 shrink-0 w-full lg:w-auto">
                <Link
                  to="/admission"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", boxShadow: "0 6px 25px rgba(245,158,11,0.4)" }}
                >
                  Reserve a Seat
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919502952770?text=Hi%2C%20I%20want%20to%20book%20a%20demo%20for%20the%20Founder%20Batch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Book Demo on WhatsApp
                </a>
                <p className="text-xs text-white/25 text-center font-light">Only limited seats available · Enroll early</p>
              </div>
            </div>
          </div>

          {/* Bottom shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default FounderBatchBanner;
