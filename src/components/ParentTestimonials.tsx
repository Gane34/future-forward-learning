import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "My child enjoyed the class and was excited to explain what was learned at home. The environment feels very different from regular tuition — it's more interactive and engaging.",
    author: "Parent of a Class 4 student",
    role: "AI Little Champions",
    stars: 5,
  },
  {
    text: "A very practical and confidence-building approach. It is good to see children learning with genuine interest. My son actually looks forward to class every weekend.",
    author: "Parent of a Class 6 student",
    role: "Level 0 Robotics",
    stars: 5,
  },
  {
    text: "This academy gives a new type of learning experience. My child felt happy and engaged. She came home and explained the whole session to us — we were impressed.",
    author: "Parent of a Class 5 student",
    role: "Computer + Future Skills",
    stars: 5,
  },
];

const ParentTestimonials = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="orb w-[400px] h-[400px] bottom-[-10%] right-[-5%] bg-violet-600/10" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <Quote className="w-3.5 h-3.5" />
            What Parents &amp; Students Say
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Real Feedback from Our<br />
            <span className="text-gradient">Learning Journey</span>
          </h2>
          <p className="text-white/40 font-light max-w-md mx-auto text-sm">
            Honest words from families who have experienced the difference.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="relative rounded-3xl p-8 border border-white/[0.08] bg-white/[0.02] flex flex-col"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-primary/70" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/65 text-sm leading-relaxed font-light italic flex-1 mb-6">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="pt-5 border-t border-white/[0.07]">
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-primary/60 font-medium mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-white/20 text-xs font-light italic">
            Student video feedback and parent testimonial clips coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ParentTestimonials;
