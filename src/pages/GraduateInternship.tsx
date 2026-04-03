import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Rocket, GraduationCap, Lightbulb, TrendingUp, Users,
  CheckCircle, Clock, Wifi, MapPin, Loader2, CheckCircle2,
  Briefcase, Star, Award, Brain, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const tracks = [
  {
    icon: Lightbulb,
    title: "Innovation & Ideation",
    desc: "Design Thinking, problem framing, rapid prototyping, and turning real-world problems into product ideas.",
    color: "amber",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurship Fundamentals",
    desc: "Business model canvas, lean startup methodology, pitching to investors, and building an MVP.",
    color: "violet",
  },
  {
    icon: Brain,
    title: "AI in Business",
    desc: "How to apply AI tools (ChatGPT, Gemini, NotebookLM) to automate operations, marketing, and customer service.",
    color: "cyan",
  },
  {
    icon: Briefcase,
    title: "Digital Ventures",
    desc: "Build your online presence — Google My Business, WhatsApp Business, social media strategy, and digital marketing basics.",
    color: "green",
  },
];

const benefits = [
  "100% Free — no fees, no hidden costs",
  "Certificate of completion from MMK AI Solutions",
  "Mentored directly by Dr. Murali Krishna (PhD)",
  "Flexible schedule — online or in-person (Khammam)",
  "Real project output: business plan or working prototype",
  "Networking with fellow innovators and entrepreneurs",
  "Letter of recommendation for outstanding interns",
  "Priority consideration for future MMK AI Solutions roles",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  college: string;
  city: string;
  track: string;
  experience: string;
  idea: string;
  motivation: string;
  hoursPerWeek: string;
  mode: string;
}

const empty: FormState = {
  name: "", email: "", phone: "", qualification: "",
  college: "", city: "", track: "", experience: "",
  idea: "", motivation: "", hoursPerWeek: "", mode: "",
};

const inputStyle = { background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" };

const GraduateInternship = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.qualification.trim()) {
      toast({ title: "Please fill required fields", description: "Name, phone, and qualification are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const entry = { id: Date.now().toString(), submittedAt: new Date().toISOString(), type: "graduate_internship", ...form };
      const existing = JSON.parse(localStorage.getItem("graduate_internship_applications") || "[]");
      localStorage.setItem("graduate_internship_applications", JSON.stringify([entry, ...existing]));
      setSubmitted(true);
      toast({ title: "Application submitted! 🎉", description: "Dr. Murali Krishna's team will contact you soon." });
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.3)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "hsl(263,90%,65%/0.15)" }}>
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">Application Received! 🎉</h2>
          <p className="text-muted-foreground mb-2">Thank you, <strong className="text-foreground">{form.name}</strong>!</p>
          <p className="text-muted-foreground mb-6">
            Your Graduate Internship application is recorded. Dr. Murali Krishna's team will reach you at{" "}
            <strong className="text-foreground">{form.phone}</strong> shortly.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">Return Home</Button>
            <Button onClick={() => { setForm(empty); setSubmitted(false); }} className="flex-1"
              style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}>
              New Application
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Graduate Internship – Entrepreneurship & Innovation | MMK AI Solutions Khammam"
        description="Apply for the free Graduate Internship in Entrepreneurship and Innovation at MMK AI Solutions, Khammam. Mentored by Dr. Murali Krishna (PhD). Build your startup idea, learn AI in business, and earn a certificate."
        keywords="free graduate internship Khammam, entrepreneurship internship Telangana, innovation internship India, MMK AI Solutions internship, Dr Murali Krishna, startup internship Khammam"
        ogUrl="https://mmkaisolutions.com/graduate-internship"
        canonicalUrl="https://mmkaisolutions.com/graduate-internship"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Free Graduate Internship – Entrepreneurship & Innovation",
          "description": "Free internship for graduates covering entrepreneurship, innovation, AI in business, and digital ventures. Mentored by Dr. Muggu Murali Krishna (PhD).",
          "provider": { "@type": "Organization", "name": "MMK AI Solutions", "url": "https://mmkaisolutions.com" },
          "instructor": { "@type": "Person", "name": "Dr. Muggu Murali Krishna", "honorificSuffix": "PhD" },
          "url": "https://mmkaisolutions.com/graduate-internship",
          "isAccessibleForFree": true,
        }}
      />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ── Hero ── */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
          <div className="orb w-[500px] h-[500px] top-[-15%] right-[-10%] bg-amber-500/10" />
          <div className="orb w-[400px] h-[400px] bottom-[-10%] left-[-5%] bg-violet-600/10" style={{ animationDelay: "2s" }} />

          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-10 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* FREE badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/35 text-green-400 text-xs font-black tracking-widest uppercase">
                  <Star className="w-3.5 h-3.5" /> 100% FREE
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
                  <Award className="w-3.5 h-3.5" /> For Graduates
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/60 text-xs font-bold tracking-widest uppercase">
                  Certificate Provided
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Graduate Internship in<br />
                <span className="text-gradient">Entrepreneurship &amp; Innovation</span>
              </h1>

              <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-8">
                A free, mentored internship program for graduates who want to build something real —
                a startup idea, a digital venture, or an innovation project. Guided personally by
                Dr. Muggu Murali Krishna (PhD), Founder, MMK AI Solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                {[
                  { icon: GraduationCap, text: "Any Graduate / Final Year Student" },
                  { icon: Clock, text: "6–8 Weeks · Flexible Hours" },
                  { icon: Wifi, text: "Online · Offline · Hybrid" },
                  { icon: MapPin, text: "Khammam, Telangana" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/55">
                    <item.icon className="w-3.5 h-3.5 text-white/35 shrink-0" />
                    <span className="font-light">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-8">

          {/* ── 4 Tracks ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> What You'll Work On
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {tracks.map((t) => {
                const Icon = t.icon;
                const colors: Record<string, { bg: string; border: string; text: string }> = {
                  amber: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#fbbf24" },
                  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#a78bfa" },
                  cyan: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#22d3ee" },
                  green: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", text: "#4ade80" },
                };
                const c = colors[t.color];
                return (
                  <div key={t.title} className="flex items-start gap-4 p-5 rounded-2xl border" style={{ background: c.bg, borderColor: c.border }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.text}20`, border: `1px solid ${c.text}40` }}>
                      <Icon className="w-5 h-5" style={{ color: c.text }} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{t.title}</p>
                      <p className="text-xs text-white/45 font-light leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Benefits ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8 border border-green-500/20"
            style={{ background: "rgba(34,197,94,0.05)" }}>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" /> What You Get
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400/80 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60 font-light">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── About the Mentor ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8 border border-violet-500/20"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)" }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7 text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400/70 mb-1">Your Mentor</p>
                <h3 className="text-xl font-bold text-white mb-2">Dr. Muggu Murali Krishna (PhD)</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">
                  Founder of MMK AI Solutions and MVR AI & Robotics Academy. PhD researcher at the intersection
                  of AI, healthcare, and innovation. Selected under MSME Hackathon 5.0 (Govt. of India).
                  Represented at AI Bodhan Conclave 2026, Bharat Mandapam, New Delhi. He brings 15+ years of
                  research experience and a mission to build the next generation of innovators from Telangana.
                </p>
                <button onClick={() => navigate("/founder")} className="mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                  Read full profile →
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Application Form ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Apply for the Free Internship</h2>
              <p className="text-white/40 font-light mt-2 text-sm">Takes 3 minutes · No fees · Immediate confirmation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.2)", borderRadius: "1.5rem", padding: "2rem" }}>

              {/* Personal Info */}
              <div>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Personal Information</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">Full Name *</Label>
                    <Input placeholder="Your full name" value={form.name} onChange={set("name")} required style={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">Phone Number *</Label>
                    <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} required style={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">Email Address</Label>
                    <Input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} style={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">City / State</Label>
                    <Input placeholder="e.g. Khammam, Telangana" value={form.city} onChange={set("city")} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Academic */}
              <div>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Academic Background</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">Qualification *</Label>
                    <Input placeholder="e.g. B.Tech / BCA / MBA / Final Year" value={form.qualification} onChange={set("qualification")} required style={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">College / University</Label>
                    <Input placeholder="College name" value={form.college} onChange={set("college")} style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Track */}
              <div className="space-y-2">
                <Label className="text-sm text-white/50">Preferred Track</Label>
                <select
                  value={form.track}
                  onChange={set("track")}
                  className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                  style={inputStyle}
                >
                  <option value="">Select a track...</option>
                  <option>Innovation & Ideation</option>
                  <option>Entrepreneurship Fundamentals</option>
                  <option>AI in Business</option>
                  <option>Digital Ventures</option>
                  <option>All of the above</option>
                </select>
              </div>

              {/* Idea & Motivation */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Do you have a startup / project idea? (optional)</Label>
                  <Textarea placeholder="Briefly describe your idea..." value={form.idea} onChange={set("idea")} rows={3} style={inputStyle} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Why do you want to join this internship?</Label>
                  <Textarea placeholder="What do you hope to achieve..." value={form.motivation} onChange={set("motivation")} rows={3} style={inputStyle} />
                </div>
              </div>

              {/* Availability */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Hours available per week</Label>
                  <select value={form.hoursPerWeek} onChange={set("hoursPerWeek")} className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none" style={inputStyle}>
                    <option value="">Select...</option>
                    <option>5–10 hours</option>
                    <option>10–15 hours</option>
                    <option>15–20 hours</option>
                    <option>Full-time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Preferred Mode</Label>
                  <select value={form.mode} onChange={set("mode")} className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none" style={inputStyle}>
                    <option value="">Select...</option>
                    <option>Online</option>
                    <option>Offline (Khammam)</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-white/25 font-light">
                By submitting, you consent to MMK AI Solutions contacting you about this internship program.
              </p>

              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold"
                style={{ background: loading ? undefined : "linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)" }}>
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Rocket className="w-5 h-5 mr-2" /> Apply for Free Internship</>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact */}
          <div className="flex items-start gap-3 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <MapPin className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
            <p className="text-xs text-white/40 font-light leading-relaxed">
              <strong className="text-white/60">MMK AI Solutions · MVR AI & Robotics Academy</strong><br />
              Wyra, Khammam, Telangana – 507165, India · 📞 +91 9502952770 · ✉️ muggu@mmkaisolutions.com
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GraduateInternship;
