import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-children-learning.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
      {/* Animated Deep Space Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-semibold tracking-wide border border-secondary/20">
              <Sparkles className="w-4 h-4" />
              <span>Future Forward Learning</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1]"
          >
            A Father's <span className="text-secondary italic">Dream.</span>
            <br />
            A Scientist's <span className="text-primary/90">Vision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground/90 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Empowering the next generation with the tools to shape tomorrow.
            An emotional journey from a father's hope to a nation's future through
            AI, Robotics, and Ethics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
            >
              Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#founder"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border border-border bg-transparent hover:bg-muted transition-all"
            >
              Read the Story
            </a>
          </motion.div>
        </div>

        {/* Hero Image / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative lg:h-[800px] flex items-center justify-center"
        >
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
            <img
              src={heroImage}
              alt="Father and child looking at future"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating "Dream" Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-xs hidden sm:block"
            >
              <p className="font-serif text-lg font-medium text-primary mb-1">
                "For every child..."
              </p>
              <p className="text-sm text-muted-foreground">
                Building a foundation of curiosity and capability.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
