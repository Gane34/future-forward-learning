import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Rocket,
  GraduationCap,
  Sparkles,
  Cpu,
  Bot,
  FlaskConical,
  CheckCircle,
  Clock,
  Wifi,
  MapPin,
  Loader2,
  CheckCircle2,
  Briefcase,
  Star,
  Award,
  Users,
  Zap,
  ShieldAlert,
  Target,
  Monitor,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const domains = [
  {
    icon: Cpu,
    title: "Artificial Intelligence",
    desc: "Machine Learning, Deep Learning, NLP, Computer Vision, Data Analytics and AI applications.",
    color: "cyan",
  },
  {
    icon: Bot,
    title: "Robotics & Embedded Systems",
    desc: "Sensors, Automation, Embedded Systems, IoT, Autonomous Robots and Electronics.",
    color: "violet",
  },
  {
    icon: FlaskConical,
    title: "Pharma-Tech",
    desc: "Healthcare AI, Drug Discovery, Pharmaceutical Data Science, Bioinformatics and Medical Technology.",
    color: "emerald",
  },
  {
    icon: Target,
    title: "Prototype Development",
    desc: "Convert your innovative idea into a functional working prototype ready for demonstration.",
    color: "amber",
  },
];

const whoCanApply = [
  "Engineering Students",
  "Pharmacy Students",
  "Diploma Students",
  "Final Year Students",
  "Fresh Graduates",
  "Anyone with an innovative idea",
];

const benefits = [
  "100% Free Mentorship",
  "Hands-on Guidance",
  "Real Prototype Development",
  "Patent Filing Guidance",
  "Demo Day Presentation",
  "Certificate of Completion",
  "Networking with IITs and Innovation Hubs",
  "Industry Mentorship",
  "Cash Awards for Top 3 Prototypes",
];

const mentorHighlights = [
  "MSME Hackathon 5.0 Grantee",
  "Principal Investigator of AIRS Railway Inspection Robot",
  "Government Funded Research Projects",
  "Hands-on Patent Filing Experience",
  "13+ Years Teaching Experience",
  "NPTEL Elite Silver",
  "AI for Drug Discovery",
  "IIT Madras",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  qualification: string;
  college: string;
  city: string;
  domain: string;
  idea: string;
  problem: string;
  motivation: string;
  currentStage: string;
  mode: string;
}

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  qualification: "",
  college: "",
  city: "",
  domain: "",
  idea: "",
  problem: "",
  motivation: "",
  currentStage: "",
  mode: "",
};

const inputStyle = { background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" };

const PrototypeInternshipProgram = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (f: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.qualification.trim() || !form.idea.trim() || !form.problem.trim() || !form.motivation.trim()) {
      toast({
        title: "Please fill required fields",
        description: "Name, phone, qualification, your idea, the problem you want to solve, and why you want to join are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const entry = { id: Date.now().toString(), submittedAt: new Date().toISOString(), type: "prototype_internship", ...form };
      const existing = JSON.parse(localStorage.getItem("prototype_internship_applications") || "[]");
      localStorage.setItem("prototype_internship_applications", JSON.stringify([entry, ...existing]));
      setSubmitted(true);
      toast({ title: "Application submitted! 🎉", description: "Your prototype internship application has been recorded successfully." });
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl p-8 text-center border" style={{ background: "hsl(240,10%,8%)", borderColor: "hsl(263,90%,65%/0.3)" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "hsl(263,90%,65%/0.15)" }}>
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-foreground">Application Submitted Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for applying to the Prototype Internship Program. Our team will review your application and contact you shortly regarding the next selection round.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">Back to Home</Button>
            <Button onClick={() => { setForm({ ...empty }); setSubmitted(false); }} className="flex-1" style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}>
              Submit Another Application
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Prototype Internship Program | MMK AI Solutions"
        description="Join the free Prototype Internship Program by MMK AI Solutions. Build real AI, Robotics, Embedded Systems and Pharma-Tech prototypes under expert mentorship."
        keywords="prototype internship program, free internship, AI internship, robotics internship, pharma-tech internship, MMK AI Solutions"
        ogUrl="https://mmkaisolutions.com/prototype-internship"
        canonicalUrl="https://mmkaisolutions.com/prototype-internship"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Prototype Internship Program",
          description: "A free mentorship-driven internship program focused on building real-world prototypes in AI, robotics, embedded systems, and pharma-tech.",
          provider: { "@type": "Organization", name: "MMK AI Solutions", url: "https://mmkaisolutions.com" },
          instructor: { "@type": "Person", name: "Dr. M. Murali Krishna", honorificSuffix: "PhD" },
          url: "https://mmkaisolutions.com/prototype-internship",
          isAccessibleForFree: true,
        }}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
          <div className="orb w-[500px] h-[500px] top-[-15%] right-[-10%] bg-violet-500/10" />
          <div className="orb w-[400px] h-[400px] bottom-[-10%] left-[-5%] bg-cyan-500/10" style={{ animationDelay: "2s" }} />

          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> Applications Open
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                    <Star className="w-3.5 h-3.5" /> 100% FREE
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/60 text-xs font-bold tracking-widest uppercase">
                    <Award className="w-3.5 h-3.5" /> Limited Seats
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Prototype Internship Program
                </h1>
                <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl mb-6">
                  Build something real.
                </p>
                <p className="text-base text-white/55 font-light leading-relaxed max-w-2xl mb-8">
                  MMK AI Solutions is opening a free, mentorship-driven Prototype Internship. This is not a certificate collection program. Participants will identify a real-world problem, design and build a working prototype, receive mentorship from industry experts, and present their work during Demo Day.
                </p>
                <p className="text-base text-white/55 font-light leading-relaxed max-w-2xl mb-8">
                  If the prototype has strong innovation potential, we will guide the participant through patent filing and actively advocate for it through our IIT, innovation hub, startup ecosystem, and industry network.
                </p>
                <Button onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })} className="h-12 px-6 text-base font-semibold" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)" }}>
                  <Rocket className="w-5 h-5 mr-2" /> Apply Now
                </Button>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-3xl border border-white/[0.08] p-6 lg:p-8" style={{ background: "linear-gradient(145deg, rgba(124,58,237,0.16) 0%, rgba(6,182,212,0.08) 100%)" }}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: GraduationCap, text: "Engineering • Pharmacy • Any Discipline" },
                    { icon: Target, text: "Prototype Based Learning" },
                    { icon: Wifi, text: "Online / Offline / Hybrid" },
                    { icon: MapPin, text: "Wyra, Khammam" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/65">
                      <item.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Who Can Apply
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whoCanApply.map((item) => (
                <div key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-white/65">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" /> Program Domains
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {domains.map((domain) => {
                const Icon = domain.icon;
                const colors: Record<string, { bg: string; border: string; text: string }> = {
                  cyan: { bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)", text: "#22d3ee" },
                  violet: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#a78bfa" },
                  emerald: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", text: "#34d399" },
                  amber: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#fbbf24" },
                };
                const c = colors[domain.color];
                return (
                  <motion.div whileHover={{ y: -4, scale: 1.01 }} key={domain.title} className="flex items-start gap-4 rounded-3xl border p-5" style={{ background: c.bg, borderColor: c.border }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${c.text}20`, border: `1px solid ${c.text}40` }}>
                      <Icon className="w-6 h-6" style={{ color: c.text }} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{domain.title}</p>
                      <p className="text-xs text-white/50 font-light leading-relaxed">{domain.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 border border-emerald-500/20" style={{ background: "rgba(16,185,129,0.05)" }}>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> What You Get
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/65 font-light">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 border border-violet-500/20" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 70%)" }}>
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                <GraduationCap className="w-8 h-8 text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400/70 mb-2">About the Mentor</p>
                <h3 className="text-2xl font-bold text-white mb-3">Dr. M. Murali Krishna (PhD)</h3>
                <p className="text-sm text-white/55 font-light leading-relaxed mb-4">
                  Founder of MMK AI Solutions and MVR AI Robotics Academy. Learn directly from someone who has taken research ideas from concept to government funding, prototype development, patents, and real-world implementation.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {mentorHighlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white/60">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-8 border border-amber-500/20" style={{ background: "rgba(245,158,11,0.06)" }}>
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">What We Don&apos;t Promise</h2>
                <p className="text-sm text-white/65 font-light leading-relaxed">
                  We do not guarantee funding. We do not guarantee patent approval. We do not guarantee placements. Instead, we guarantee genuine mentorship, technical guidance, prototype development support, and opportunities to present your innovation.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div id="application-form" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Apply for the Prototype Internship</h2>
              <p className="text-white/40 font-light mt-2 text-sm">Takes 3 minutes · No fees · Immediate confirmation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 rounded-[1.5rem] border border-white/[0.08] p-6 md:p-8" style={{ background: "hsl(240,10%,8%)" }}>
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
                    <Label className="text-sm text-white/50">City</Label>
                    <Input placeholder="e.g. Khammam, Telangana" value={form.city} onChange={set("city")} style={inputStyle} />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Academic Background</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">Qualification *</Label>
                    <Input placeholder="e.g. B.Tech / B.Pharm / Final Year" value={form.qualification} onChange={set("qualification")} required style={inputStyle} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-white/50">College / University</Label>
                    <Input placeholder="College name" value={form.college} onChange={set("college")} style={inputStyle} />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Domain</Label>
                  <select value={form.domain} onChange={set("domain")} className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500" style={inputStyle}>
                    <option value="">Select a domain...</option>
                    <option>Artificial Intelligence</option>
                    <option>Robotics & Embedded Systems</option>
                    <option>Pharma-Tech</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Current Stage</Label>
                  <select value={form.currentStage} onChange={set("currentStage")} className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none" style={inputStyle}>
                    <option value="">Select...</option>
                    <option>Idea Only</option>
                    <option>Research Stage</option>
                    <option>Prototype Stage</option>
                    <option>Working Prototype</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Describe Your Idea *</Label>
                  <Textarea placeholder="Describe your idea in a few lines..." value={form.idea} onChange={set("idea")} rows={4} style={inputStyle} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Problem You Want To Solve *</Label>
                  <Textarea placeholder="What real-world problem are you trying to solve?" value={form.problem} onChange={set("problem")} rows={4} style={inputStyle} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-white/50">Why Do You Want To Join *</Label>
                  <Textarea placeholder="Tell us why this program matters to you..." value={form.motivation} onChange={set("motivation")} rows={4} style={inputStyle} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-white/50">Preferred Mode</Label>
                <select value={form.mode} onChange={set("mode")} className="w-full h-10 rounded-lg px-3 text-sm text-white focus:outline-none" style={inputStyle}>
                  <option value="">Select...</option>
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <p className="text-xs text-white/25 font-light">
                By submitting, you consent to MMK AI Solutions contacting you about this internship opportunity.
              </p>

              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold" style={{ background: loading ? undefined : "linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)" }}>
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Rocket className="w-5 h-5 mr-2" /> Apply Now</>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Monitor className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/35 mb-2">Contact</p>
                <h3 className="text-xl font-bold text-white mb-3">MMK AI Solutions</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  MVR AI Robotics Academy<br />
                  Wyra, Khammam<br />
                  Telangana, India<br />
                  Phone: +91 9010845996<br />
                  Email: muggu@mmkaisolutions.com
                </p>
              </div>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
            <p className="text-lg font-semibold text-white/70">Skill before Certificates. Rural to Global.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrototypeInternshipProgram;
