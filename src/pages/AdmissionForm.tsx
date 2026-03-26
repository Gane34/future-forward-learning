import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2, GraduationCap } from "lucide-react";
import { sendAdmissionEmail } from "@/lib/emailService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import ChatBot from "@/components/ChatBot";

export interface Admission {
  id: string;
  submittedAt: string;
  // Student
  studentName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  grade: string;
  schoolName: string;
  // Parent / Guardian
  parentName: string;
  relationship: string;
  parentEmail: string;
  parentMobile: string;
  altMobile: string;
  // Address
  address: string;
  city: string;
  pincode: string;
  // Program
  programLevel: string;
  interests: string;
  heardFrom: string;
  // Medical / Notes
  medicalNotes: string;
}

const empty: Omit<Admission, "id" | "submittedAt"> = {
  studentName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  grade: "",
  schoolName: "",
  parentName: "",
  relationship: "",
  parentEmail: "",
  parentMobile: "",
  altMobile: "",
  address: "",
  city: "",
  pincode: "",
  programLevel: "",
  interests: "",
  heardFrom: "",
  medicalNotes: "",
};

const AdmissionForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(empty);

  const set = (field: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const setSelect = (field: keyof typeof empty) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save to localStorage
      const admission: Admission = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        ...form,
      };
      const existing: Admission[] = JSON.parse(localStorage.getItem("admissions") || "[]");
      localStorage.setItem("admissions", JSON.stringify([admission, ...existing]));

      // Send email notification
      await sendAdmissionEmail({
        studentName: form.studentName,
        age: form.age,
        grade: form.grade,
        schoolName: form.schoolName,
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentMobile: form.parentMobile,
        city: form.city,
        programLevel: form.programLevel,
        interests: form.interests,
        heardFrom: form.heardFrom,
      });

      setSubmitted(true);
      toast({ title: "Admission submitted!", description: "We'll contact you within 24 hours." });
    } catch {
      // Email failed but form data is saved — still succeed for user
      setSubmitted(true);
      toast({ title: "Admission submitted!", description: "We'll contact you within 24 hours." });
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
          <h2 className="text-2xl font-bold font-serif mb-3 text-foreground">
            Application Received! 🎉
          </h2>
          <p className="text-muted-foreground mb-2">
            Thank you, <strong className="text-foreground">{form.parentName}</strong>!
          </p>
          <p className="text-muted-foreground mb-6">
            We've registered <strong className="text-foreground">{form.studentName}</strong>'s admission application for{" "}
            <strong className="text-foreground">{form.programLevel}</strong>. Our team will reach you at{" "}
            <strong className="text-foreground">{form.parentMobile}</strong> within 24 hours.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">
              Return Home
            </Button>
            <Button onClick={() => { setForm(empty); setSubmitted(false); }} className="flex-1">
              New Application
            </Button>
          </div>
        </div>
        <ChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <SEO
        title="Admission Form – MVR AI Robotics Academy | Khammam, Telangana"
        description="Apply for admission to MVR AI Robotics Academy. Enroll your child aged 9–13 in AI, Robotics, and Coding programs in Khammam, Telangana. Mentored by Dr. Murali Krishna (PhD)."
        keywords="admission form MVR AI Academy, AI academy admission Khammam, robotics program enrollment Telangana, coding class application children India, MMK AI Solutions admission, STEM school program Khammam, Dr Murali Krishna academy admission"
        ogUrl="https://mmkaisolutions.com/admission"
        canonicalUrl="https://mmkaisolutions.com/admission"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Admission Form – MVR AI Robotics Academy",
          "description": "Apply for admission to MVR AI Robotics Academy AI, Robotics and Coding programs for children aged 9–13 in Khammam, Telangana.",
          "url": "https://mmkaisolutions.com/admission",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mmkaisolutions.com/" },
              { "@type": "ListItem", "position": 2, "name": "Admission", "item": "https://mmkaisolutions.com/admission" }
            ]
          }
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

        {/* Header */}
        <div
          className="rounded-2xl p-8 mb-8 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(263,90%,20%), hsl(180,100%,10%))",
            border: "1px solid hsl(263,90%,65%/0.3)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, hsl(263,90%,65%), hsl(180,100%,40%))" }}
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-white mb-2">
            MVR AI Academy
          </h1>
          <p className="text-lg" style={{ color: "hsl(180,100%,70%)" }}>
            Student Admission Form
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Admissions open for 2025–26 • Ages 6–14 • Khammam, Telangana
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24" }}>
            🎉 Level 0 Pilot Batch — ₹999 (was ₹2,499)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section: Student Details */}
          <Section title="Student Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Student Full Name *">
                <Input placeholder="e.g. Arjun Kumar" value={form.studentName} onChange={set("studentName")} required />
              </Field>
              <Field label="Date of Birth *">
                <Input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} required />
              </Field>
              <Field label="Age *">
                <Input type="number" min={5} max={18} placeholder="e.g. 11" value={form.age} onChange={set("age")} required />
              </Field>
              <Field label="Gender *">
                <Select onValueChange={setSelect("gender")} required>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Current Grade / Class *">
                <Select onValueChange={setSelect("grade")} required>
                  <SelectTrigger><SelectValue placeholder="Select grade" /></SelectTrigger>
                  <SelectContent>
                    {["Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Other"].map(g => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="School Name *">
                <Input placeholder="e.g. Sri Vidya School" value={form.schoolName} onChange={set("schoolName")} required />
              </Field>
            </div>
          </Section>

          {/* Section: Parent / Guardian */}
          <Section title="Parent / Guardian Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Parent / Guardian Name *">
                <Input placeholder="e.g. Ramesh Kumar" value={form.parentName} onChange={set("parentName")} required />
              </Field>
              <Field label="Relationship to Student *">
                <Select onValueChange={setSelect("relationship")} required>
                  <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Email Address *">
                <Input type="email" placeholder="name@example.com" value={form.parentEmail} onChange={set("parentEmail")} required />
              </Field>
              <Field label="Mobile Number *">
                <Input type="tel" placeholder="+91 98765 43210" value={form.parentMobile} onChange={set("parentMobile")} required />
              </Field>
              <Field label="Alternate Mobile (Optional)">
                <Input type="tel" placeholder="+91 98765 43210" value={form.altMobile} onChange={set("altMobile")} />
              </Field>
            </div>
          </Section>

          {/* Section: Address */}
          <Section title="Address">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Field label="Street Address *">
                  <Input placeholder="House No., Street, Locality" value={form.address} onChange={set("address")} required />
                </Field>
              </div>
              <Field label="City / Town *">
                <Input placeholder="e.g. Khammam" value={form.city} onChange={set("city")} required />
              </Field>
              <Field label="PIN Code *">
                <Input placeholder="e.g. 507165" value={form.pincode} onChange={set("pincode")} required maxLength={6} />
              </Field>
            </div>
          </Section>

          {/* Section: Program */}
          <Section title="Program Selection">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Program Level *">
                <Select onValueChange={setSelect("programLevel")} required>
                  <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Level 0 – AI & Robotics Foundation (₹999 Pilot Batch, Ages 6–10)">Level 0 – AI & Robotics Foundation (₹999 Pilot · Ages 6–10)</SelectItem>
                    <SelectItem value="Level 1 – Robotics Builder Program (Upcoming, Ages 9–14)" disabled>Level 1 – Robotics Builder Program (Coming Soon · Ages 9–14)</SelectItem>
                    <SelectItem value="Not Sure – Request Free Assessment">Not Sure – Request Free Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="How did you hear about us?">
                <Select onValueChange={setSelect("heardFrom")}>
                  <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Friend / Family">Friend / Family</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Google Search">Google Search</SelectItem>
                    <SelectItem value="Flyer / Poster">Flyer / Poster</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Child's Interests (Optional)">
                  <Textarea
                    placeholder="e.g. loves building things, interested in computers, curious about robots..."
                    value={form.interests}
                    onChange={set("interests")}
                    rows={2}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Medical / Special Notes (Optional)">
                  <Textarea
                    placeholder="Any medical conditions, allergies, or special requirements we should know about..."
                    value={form.medicalNotes}
                    onChange={set("medicalNotes")}
                    rows={2}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* Declaration */}
          <div
            className="rounded-xl p-4 text-sm text-muted-foreground"
            style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.15)" }}
          >
            By submitting this form, I confirm that the information provided is accurate and I consent to MVR AI Academy contacting me regarding the admission process.
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
              "Submit Admission Application"
            )}
          </Button>
        </form>
      </div>

      <ChatBot />
    </div>
  );
};

// Helpers
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{ background: "hsl(240,10%,8%)", border: "1px solid hsl(263,90%,65%/0.2)" }}
  >
    <div
      className="px-6 py-4"
      style={{ background: "hsl(263,90%,65%/0.08)", borderBottom: "1px solid hsl(263,90%,65%/0.15)" }}
    >
      <h2 className="font-semibold text-foreground">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label className="text-sm text-muted-foreground">{label}</Label>
    {children}
  </div>
);

export default AdmissionForm;
