import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendInternshipEmail } from "@/lib/emailService";
import { ArrowLeft, CheckCircle2, Loader2, Rocket, Brain, Bot, Code2, Lightbulb, Clock, Wifi, MapPin, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  // Section 1 – Student Information
  studentName: string;
  classGrade: string;
  schoolName: string;
  cityState: string;
  parentName: string;
  parentContact: string;
  studentEmail: string;
  // Section 2 – Interest in Technology
  heardAboutAI: string;
  aiSources: string[];
  interestAreas: string[];
  // Section 3 – Basic Knowledge
  toolsUsed: string[];
  robotDescription: string;
  projectsBuilt: string[];
  projectExplanation: string;
  // Section 4 – Logical Thinking
  obstacleResponse: string;
  aiHelpAnswer: string;
  // Section 5 – Learning Interest
  whyJoin: string;
  learnMost: string[];
  // Section 6 – Availability
  hoursPerWeek: string;
  preferredMode: string;
}

const emptyForm: FormState = {
  studentName: "",
  classGrade: "",
  schoolName: "",
  cityState: "",
  parentName: "",
  parentContact: "",
  studentEmail: "",
  heardAboutAI: "",
  aiSources: [],
  interestAreas: [],
  toolsUsed: [],
  robotDescription: "",
  projectsBuilt: [],
  projectExplanation: "",
  obstacleResponse: "",
  aiHelpAnswer: "",
  whyJoin: "",
  learnMost: [],
  hoursPerWeek: "",
  preferredMode: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Section = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.2)" }}
  >
    <div
      className="px-6 py-4"
      style={{ background: "hsl(263,90%,65%/0.08)", borderBottom: "1px solid hsl(263,90%,65%/0.15)" }}
    >
      <h2 className="font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <div className="px-6 py-5 space-y-5">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const CheckGroup = ({
  options,
  selected,
  onChange,
  allowOther,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  allowOther?: boolean;
}) => {
  const [otherText, setOtherText] = useState("");

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: selected.includes(opt) ? "hsl(263,90%,65%)" : "hsl(240,10%,15%)",
              border: selected.includes(opt) ? "none" : "1px solid hsl(263,90%,65%/0.4)",
            }}
            onClick={() => toggle(opt)}
          >
            {selected.includes(opt) && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-sm text-foreground group-hover:text-white transition-colors" onClick={() => toggle(opt)}>
            {opt}
          </span>
        </label>
      ))}
      {allowOther && (
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: otherText ? "hsl(263,90%,65%)" : "hsl(240,10%,15%)",
              border: otherText ? "none" : "1px solid hsl(263,90%,65%/0.4)",
            }}
          >
            {otherText && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <Input
            placeholder="Other: specify..."
            value={otherText}
            onChange={(e) => {
              const prev = selected.filter((s) => !s.startsWith("Other:"));
              setOtherText(e.target.value);
              if (e.target.value.trim()) {
                onChange([...prev, `Other: ${e.target.value.trim()}`]);
              } else {
                onChange(prev);
              }
            }}
            className="h-8 text-sm"
            style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
          />
        </div>
      )}
    </div>
  );
};

const RadioGroup = ({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}) => (
  <div className="space-y-2">
    {options.map((opt) => (
      <label key={opt} className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange(opt)}>
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: selected === opt ? "hsl(263,90%,65%)" : "hsl(240,10%,15%)",
            border: selected === opt ? "none" : "1px solid hsl(263,90%,65%/0.4)",
          }}
        >
          {selected === opt && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <span className="text-sm text-foreground group-hover:text-white transition-colors">{opt}</span>
      </label>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const InternshipForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const setArray = (field: keyof FormState) => (val: string[]) =>
    setForm((f) => ({ ...f, [field]: val }));

  const setRadio = (field: keyof FormState) => (val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName.trim() || !form.classGrade.trim() || !form.schoolName.trim() || !form.parentContact.trim()) {
      toast({ title: "Please fill required fields", description: "Student name, class, school and parent contact are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const entry = { id: Date.now().toString(), submittedAt: new Date().toISOString(), ...form };
      const existing = JSON.parse(localStorage.getItem("internship_applications") || "[]");
      localStorage.setItem("internship_applications", JSON.stringify([entry, ...existing]));

      await sendInternshipEmail({
        studentName: form.studentName,
        classGrade: form.classGrade,
        schoolName: form.schoolName,
        cityState: form.cityState,
        parentName: form.parentName,
        parentContact: form.parentContact,
        studentEmail: form.studentEmail,
        whyJoin: form.whyJoin,
        preferredMode: form.preferredMode,
      });

      setSubmitted(true);
      toast({ title: "Application submitted!", description: "Dr. Murali Krishna's team will contact you soon." });
    } catch {
      setSubmitted(true);
      toast({ title: "Application submitted!", description: "Dr. Murali Krishna's team will contact you soon." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center"
          style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.3)" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "hsl(263,90%,65%/0.15)" }}
          >
            <CheckCircle2 className="w-10 h-10" style={{ color: "hsl(120,100%,50%)" }} />
          </div>
          <h2 className="text-2xl font-bold font-serif mb-3 text-foreground">Application Submitted! 🎉</h2>
          <p className="text-muted-foreground mb-2">
            Thank you, <strong className="text-foreground">{form.parentName || form.studentName}</strong>!
          </p>
          <p className="text-muted-foreground mb-6">
            <strong className="text-foreground">{form.studentName}</strong>'s internship application has been recorded.
            Dr. Murali Krishna's team will reach you at{" "}
            <strong className="text-foreground">{form.parentContact}</strong> shortly.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
              Return Home
            </Button>
            <Button
              onClick={() => { setForm(emptyForm); setSubmitted(false); }}
              className="flex-1"
              style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}
            >
              New Application
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <SEO
        title="Junior AI Innovator Internship for School Students | MVR AI & Robotics Academy Khammam"
        description="Apply for the Junior AI Innovator Internship at MVR AI Robotics Academy, Khammam, Telangana. School students aged 9–13 get hands-on training in AI, Robotics, and Coding under Dr. Murali Krishna (PhD). Free evaluation form — register now!"
        keywords="AI internship school students India, junior AI innovator internship Khammam, robotics internship Telangana, coding internship children Andhra Pradesh, MVR AI & Robotics Academy internship apply, MMK AI Solutions internship program, Dr Murali Krishna AI internship, AI training kids Khammam, school AI program Telangana, free AI internship India"
        ogUrl="https://mmkaisolutions.com/internship"
        canonicalUrl="https://mmkaisolutions.com/internship"
        ogImageAlt="Junior AI Innovator Internship – MVR AI Robotics Academy, Khammam"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              "@id": "https://mmkaisolutions.com/internship#course",
              "name": "Junior AI Innovator Internship",
              "description": "A hands-on AI, Robotics, and Coding internship for school students aged 9–13, mentored by Dr. Murali Krishna (PhD) at MVR AI Robotics Academy, Khammam, Telangana.",
              "url": "https://mmkaisolutions.com/internship",
              "provider": {
                "@type": "Organization",
                "name": "MVR AI Robotics Academy – MMK AI Solutions",
                "url": "https://mmkaisolutions.com",
                "telephone": "+91-9502952770",
                "email": "muggu@mmkaisolutions.com"
              },
              "instructor": {
                "@type": "Person",
                "name": "Dr. Muggu Murali Krishna",
                "honorificSuffix": "PhD",
                "jobTitle": "Founder & Mentor"
              },
              "educationalLevel": "School Students aged 9–13",
              "teaches": ["Artificial Intelligence", "Robotics", "Coding", "Innovation Projects", "AI Tools"],
              "courseMode": ["offline", "online", "blended"],
              "availableLanguage": ["English", "Telugu"],
              "locationCreated": {
                "@type": "Place",
                "name": "Wyra, Khammam, Telangana, India"
              }
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who can apply for the Junior AI Innovator Internship?",
                  "acceptedAnswer": { "@type": "Answer", "text": "School students aged 9 to 13 years can apply. No prior experience in AI or coding is required — the program starts from the basics." }
                },
                {
                  "@type": "Question",
                  "name": "What will students learn in the AI internship?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Students will learn AI basics, Robotics, Coding (Scratch to Python), AI tools like ChatGPT and Gemini, and complete innovation projects under the guidance of Dr. Murali Krishna (PhD)." }
                },
                {
                  "@type": "Question",
                  "name": "Is the internship available online or offline?",
                  "acceptedAnswer": { "@type": "Answer", "text": "The internship is available in Online, Offline, and Hybrid modes. Students can choose their preferred mode when applying." }
                },
                {
                  "@type": "Question",
                  "name": "How many hours per week is the internship?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Students can commit 1–2 hours, 3–4 hours, or 5+ hours per week depending on their availability. The program is flexible to fit school schedules." }
                },
                {
                  "@type": "Question",
                  "name": "Where is MVR AI & Robotics Academy located?",
                  "acceptedAnswer": { "@type": "Answer", "text": "MVR AI Robotics Academy is located in Wyra, Khammam, Telangana – 507165, India. Contact: +91 9502952770 | muggu@mmkaisolutions.com" }
                }
              ]
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mmkaisolutions.com/" },
                { "@type": "ListItem", "position": 2, "name": "Internship", "item": "https://mmkaisolutions.com/internship" }
              ]
            }
          ]
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* ── SEO Hero Header ── */}
        <div
          className="rounded-2xl p-8 mb-6 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(263,90%,20%), hsl(180,100%,10%))",
            border: "1px solid hsl(263,90%,65%/0.3)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}
          >
            <Rocket className="w-7 h-7 text-white" />
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "hsl(180,100%,60%)" }}>
            MMK AI Solutions / MVR AI Robotics Academy — Khammam, Telangana
          </p>
          <h1 className="text-3xl font-bold font-serif text-white mb-2">
            Junior AI Innovator Internship
          </h1>
          <p className="text-base" style={{ color: "hsl(180,100%,70%)" }}>
            AI, Robotics &amp; Coding Internship Program for School Students
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Mentored by <strong className="text-white">Dr. Murali Krishna (PhD)</strong> · Ages 9–13 · Online / Offline / Hybrid
          </p>
        </div>

        {/* ── SEO Content Block (crawlable text for Google) ── */}
        <div
          className="rounded-2xl p-6 mb-6 space-y-6"
          style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.15)" }}
        >
          {/* About */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" style={{ color: "hsl(263,90%,65%)" }} />
              About the Program
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The <strong className="text-foreground">Junior AI Innovator Internship</strong> is a structured learning program
              by <strong className="text-foreground">MVR AI Robotics Academy</strong> (MMK AI Solutions), Khammam, Telangana.
              Designed for school students aged <strong className="text-foreground">9 to 13 years</strong>, this internship
              gives children a real-world introduction to Artificial Intelligence, Robotics, and Coding — guided by
              <strong className="text-foreground"> Dr. Muggu Murali Krishna (PhD)</strong>, a researcher and educator on
              a mission to bring future-ready STEM education to every child in India.
            </p>
          </div>

          {/* What students learn */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5" style={{ color: "hsl(263,90%,65%)" }} />
              What Students Learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Brain, label: "AI Basics", desc: "Introduction to Artificial Intelligence concepts and real-world applications" },
                { icon: Bot, label: "Robotics", desc: "Build and program robots using sensors, motors, and logic" },
                { icon: Code2, label: "Coding", desc: "From block-based Scratch coding to Python programming" },
                { icon: Lightbulb, label: "AI Tools", desc: "Hands-on use of ChatGPT, Gemini, and other AI tools" },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "hsl(263,90%,65%/0.07)", border: "1px solid hsl(263,90%,65%/0.15)" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(263,90%,65%/0.15)" }}>
                    <Icon className="w-4 h-4" style={{ color: "hsl(263,90%,75%)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & mode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(180,100%,50%)" }} />
              <div>
                <p className="text-sm font-semibold text-foreground">Eligibility</p>
                <p className="text-xs text-muted-foreground">School students, Class 4–10, ages 9–13. No prior experience needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Wifi className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(180,100%,50%)" }} />
              <div>
                <p className="text-sm font-semibold text-foreground">Mode</p>
                <p className="text-xs text-muted-foreground">Online, Offline (Khammam), or Hybrid — your choice.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(180,100%,50%)" }} />
              <div>
                <p className="text-sm font-semibold text-foreground">Time Commitment</p>
                <p className="text-xs text-muted-foreground">Flexible: 1–2 hrs/week to 5+ hrs/week to fit school schedules.</p>
              </div>
            </div>
          </div>

          {/* Why join */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" style={{ color: "hsl(120,100%,50%)" }} />
              Why Join This Internship?
            </h2>
            <ul className="space-y-2">
              {[
                "Learn AI and Robotics from a PhD-trained mentor — Dr. Murali Krishna",
                "Hands-on project-based learning: build real robots and AI demos",
                "Flexible schedule — online or offline from Khammam, Telangana",
                "Certificate of completion from MVR AI Robotics Academy",
                "First step toward a future in AI, technology, and innovation",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(120,100%,50%)" }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 pt-2 border-t" style={{ borderColor: "hsl(263,90%,65%/0.15)" }}>
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(263,90%,65%)" }} />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">MVR AI Robotics Academy — MMK AI Solutions</strong><br />
              Wyra, Khammam, Telangana – 507165, India · 📞 +91 9502952770 · ✉️ muggu@mmkaisolutions.com
            </p>
          </div>
        </div>

        {/* ── Form Header ── */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-foreground">Student AI Internship Evaluation Form</h2>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details below to register for the Junior AI Innovator Internship</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ── Section 1: Student Information ── */}
          <Section title="Section 1 – Student Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Student Name *">
                <Input
                  placeholder="e.g. Arjun Kumar"
                  value={form.studentName}
                  onChange={setField("studentName")}
                  required
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <Field label="Class / Grade *">
                <Input
                  placeholder="e.g. Class 7 / Grade 7"
                  value={form.classGrade}
                  onChange={setField("classGrade")}
                  required
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <Field label="School Name *">
                <Input
                  placeholder="e.g. Sri Vidya School"
                  value={form.schoolName}
                  onChange={setField("schoolName")}
                  required
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <Field label="City / State">
                <Input
                  placeholder="e.g. Khammam, Telangana"
                  value={form.cityState}
                  onChange={setField("cityState")}
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <Field label="Parent Name">
                <Input
                  placeholder="e.g. Ramesh Kumar"
                  value={form.parentName}
                  onChange={setField("parentName")}
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <Field label="Parent Contact Number *">
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.parentContact}
                  onChange={setField("parentContact")}
                  required
                  style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Student Email (if available)">
                  <Input
                    type="email"
                    placeholder="student@example.com"
                    value={form.studentEmail}
                    onChange={setField("studentEmail")}
                    style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* ── Section 2: Interest in Technology ── */}
          <Section title="Section 2 – Interest in Technology">
            <Field label="Have you heard about Artificial Intelligence (AI) before?">
              <RadioGroup
                options={["Yes", "No"]}
                selected={form.heardAboutAI}
                onChange={setRadio("heardAboutAI")}
              />
            </Field>

            <Field label="Where did you hear about AI?">
              <CheckGroup
                options={["School", "YouTube", "Internet", "Friends"]}
                selected={form.aiSources}
                onChange={setArray("aiSources")}
                allowOther
              />
            </Field>

            <Field label="What interests you most?">
              <CheckGroup
                options={["Robots", "Computers", "Coding", "Science experiments", "AI tools"]}
                selected={form.interestAreas}
                onChange={setArray("interestAreas")}
              />
            </Field>
          </Section>

          {/* ── Section 3: Basic Knowledge ── */}
          <Section title="Section 3 – Basic Knowledge">
            <Field label="Have you ever used any of these tools?">
              <CheckGroup
                options={["ChatGPT", "Gemini", "Scratch coding", "Python", "None"]}
                selected={form.toolsUsed}
                onChange={setArray("toolsUsed")}
              />
            </Field>

            <Field label="Do you know what a robot is? Write in your own words:">
              <Textarea
                placeholder="A robot is..."
                value={form.robotDescription}
                onChange={setField("robotDescription")}
                rows={3}
                style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
              />
            </Field>

            <Field label="Have you ever built any project?">
              <CheckGroup
                options={["Science project", "Electronics project", "Robotics project", "No project yet"]}
                selected={form.projectsBuilt}
                onChange={setArray("projectsBuilt")}
              />
            </Field>

            <Field label="If yes, explain briefly:">
              <Textarea
                placeholder="Describe your project..."
                value={form.projectExplanation}
                onChange={setField("projectExplanation")}
                rows={2}
                style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
              />
            </Field>
          </Section>

          {/* ── Section 4: Logical Thinking ── */}
          <Section title="Section 4 – Logical Thinking">
            <Field label="If a robot sees an obstacle in front, what should it do?">
              <RadioGroup
                options={["Stop", "Turn", "Go back", "I am not sure"]}
                selected={form.obstacleResponse}
                onChange={setRadio("obstacleResponse")}
              />
            </Field>

            <Field label="What do you think AI can help humans do? (Example: doctors, cars, education, etc.)">
              <Textarea
                placeholder="I think AI can help humans by..."
                value={form.aiHelpAnswer}
                onChange={setField("aiHelpAnswer")}
                rows={3}
                style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
              />
            </Field>
          </Section>

          {/* ── Section 5: Learning Interest ── */}
          <Section title="Section 5 – Learning Interest">
            <Field label="Why do you want to join this AI internship?">
              <Textarea
                placeholder="I want to join because..."
                value={form.whyJoin}
                onChange={setField("whyJoin")}
                rows={3}
                style={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(263,90%,65%/0.25)" }}
              />
            </Field>

            <Field label="What do you want to learn most?">
              <CheckGroup
                options={["AI basics", "Robotics", "Coding", "AI tools", "Innovation projects"]}
                selected={form.learnMost}
                onChange={setArray("learnMost")}
              />
            </Field>
          </Section>

          {/* ── Section 6: Availability ── */}
          <Section title="Section 6 – Availability">
            <Field label="How many hours per week can you spend learning AI?">
              <RadioGroup
                options={["1–2 hours", "3–4 hours", "5+ hours"]}
                selected={form.hoursPerWeek}
                onChange={setRadio("hoursPerWeek")}
              />
            </Field>

            <Field label="Preferred mode">
              <RadioGroup
                options={["Online", "Offline", "Both"]}
                selected={form.preferredMode}
                onChange={setRadio("preferredMode")}
              />
            </Field>
          </Section>

          {/* Declaration */}
          <div
            className="rounded-xl p-4 text-sm text-muted-foreground"
            style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.15)" }}
          >
            By submitting this form, I confirm that the information provided is accurate and I consent to MVR AI Robotics Academy contacting me regarding the Junior AI Innovator Internship program.
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold"
            style={{
              background: loading ? undefined : "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Internship Application"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;
