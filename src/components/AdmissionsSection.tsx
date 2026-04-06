import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Sparkles, CheckCircle } from "lucide-react";

const fees = [
  { program: "AI Little Champions",       age: "Age 6–10",  fee: "₹999",       note: "Pilot Batch · Limited Seats" },
  { program: "Level 0 Robotics",          age: "Age 10–14", fee: "₹999",       note: "Pilot Batch · Limited Seats" },
  { program: "Computer + Future Skills",  age: "Age 8–14",  fee: "Contact Us", note: "Ask on WhatsApp for pricing" },
];

const AdmissionsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] top-[-15%] left-[-5%] bg-violet-600/12" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions Open
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Join Us Today —<br />
            <span className="text-gradient">Limited Seats Available</span>
          </h2>
          <p className="text-white/45 font-light max-w-lg mx-auto text-base leading-relaxed">
            Early admission is recommended for better personal attention.
            Batch timings and suitable program guidance available on WhatsApp.
          </p>
        </motion.div>

        {/* Fee table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/[0.08] mb-10"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Free Demo highlight */}
          <div className="px-8 py-5 border-b border-white/[0.08]"
            style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(124,58,237,0.06) 100%)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-400">Free Demo Class Available</p>
                <p className="text-xs text-white/40 font-light">Book your child's demo session today — no commitment required</p>
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="divide-y divide-white/[0.06]">
            {fees.map((f, i) => (
              <motion.div
                key={f.program}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-4 h-4 text-primary/50 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">{f.program}</p>
                    <p className="text-xs text-white/40 font-light mt-0.5">{f.age}</p>
                  </div>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-xl font-black text-white">{f.fee}</p>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wide">{f.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { icon: Users, text: "Small Batch" },
            { icon: CheckCircle, text: "Practical Learning" },
            { icon: Clock, text: "Limited Seats" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/60 font-medium">
              <item.icon className="w-4 h-4 text-primary/50" />
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/get-started"
            className="btn-premium px-10 py-4 rounded-xl text-base flex items-center justify-center gap-2"
          >
            Book Free Demo
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
          <a
            href="https://wa.me/919502952770?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20MVR%20AI%20Robotics%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-10 py-4 rounded-xl text-base flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp for Details
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
