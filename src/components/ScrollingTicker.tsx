import { motion } from "framer-motion";
import { Star, Trophy, Zap, Users, Award, Train, GraduationCap, Lightbulb } from "lucide-react";

const items = [
  { icon: Trophy, text: "MSME Hackathon 5.0 — Selected Innovation Project", highlight: true },
  { icon: GraduationCap, text: "FREE Graduate Internship — Entrepreneurship & Innovation · Apply Now", highlight: true },
  { icon: Star, text: "Pilot Batch Open · Level 0 — Only ₹999", highlight: false },
  { icon: Award, text: "UDYAM-TS-04-0062944 · MSME Registered", highlight: true },
  { icon: Lightbulb, text: "Graduate Internship — Innovation · AI in Business · Digital Ventures", highlight: false },
  { icon: Zap, text: "AI · Robotics · Coding · For Ages 6–16", highlight: false },
  { icon: Users, text: "50+ Students Enrolled", highlight: false },
  { icon: Train, text: "AI-Driven Railway Inspection System — Govt of India Recognition", highlight: true },
  { icon: Star, text: "Solo Taught by Dr. Murali Krishna · PhD", highlight: false },
  { icon: Lightbulb, text: "" },
  { icon: Trophy, text: "Admissions Open 2025–26 · Limited Seats", highlight: false },
];

// Duplicate for seamless loop
const tickerItems = [...items, ...items];

const ScrollingTicker = () => {
  return (
    <div
      className="relative z-50 w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1a0533 0%, #0f0a2e 30%, #0a1a2e 70%, #1a0533 100%)",
        borderBottom: "1px solid rgba(245,158,11,0.3)",
        boxShadow: "0 2px 20px rgba(245,158,11,0.15), 0 0 40px rgba(124,58,237,0.1)",
      }}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #1a0533, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #1a0533, transparent)" }} />

      {/* Shimmer line on top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.8), rgba(124,58,237,0.8), transparent)" }} />

      <motion.div
        className="flex items-center gap-0 py-2.5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {tickerItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center shrink-0">
              {/* Item */}
              <div className="flex items-center gap-2 px-5">
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                  style={{
                    background: item.highlight
                      ? "rgba(245,158,11,0.2)"
                      : "rgba(124,58,237,0.2)",
                    border: item.highlight
                      ? "1px solid rgba(245,158,11,0.4)"
                      : "1px solid rgba(124,58,237,0.4)",
                  }}
                >
                  <Icon
                    className="w-2.5 h-2.5"
                    style={{ color: item.highlight ? "#f59e0b" : "#a78bfa" }}
                  />
                </div>
                <span
                  className="text-xs font-semibold whitespace-nowrap tracking-wide"
                  style={{
                    color: item.highlight ? "#fcd34d" : "rgba(255,255,255,0.75)",
                    textShadow: item.highlight ? "0 0 12px rgba(245,158,11,0.5)" : "none",
                  }}
                >
                  {item.text}
                </span>
              </div>

              {/* Separator */}
              <div className="shrink-0 flex items-center gap-1 px-1">
                <span style={{ color: "rgba(245,158,11,0.4)", fontSize: "10px" }}>✦</span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ScrollingTicker;
