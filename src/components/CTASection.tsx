import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-primary rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-primary-foreground" />
              <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-primary-foreground" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary-foreground" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
                <Heart size={14} className="text-primary-foreground/80" />
                <span className="text-xs font-semibold text-primary-foreground/80 tracking-wide uppercase">
                  Built with Care
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground tracking-tight mb-4">
                Give Your Child the Tools
                <br />
                to Shape the Future
              </h2>
              <p className="text-primary-foreground/75 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                Join families who trust FuturMinds to prepare their children — 
                not just for school, but for life in an AI-powered world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg bg-card text-foreground hover:bg-card/90 transition-all shadow-lg"
                >
                  Schedule a Free Consultation
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
