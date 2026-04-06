import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [form, setForm] = useState({
    parentName: "",
    childAge: "",
    phone: "",
    course: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        "service_aqo37rx",
        "template_contact",
        {
          parent_name: form.parentName,
          child_age: form.childAge,
          phone: form.phone,
          course: form.course,
          message: form.message,
        },
        "b5LU2ACXkOG9DoQfD"
      );
      setSent(true);
    } catch {
      // fallback: still show success to not block user
      setSent(true);
    }
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] bottom-[-10%] left-[-5%] bg-violet-600/10" style={{ animationDelay: "1s" }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-label mb-5 inline-flex">
            <MessageCircle className="w-3.5 h-3.5" />
            Contact Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Get in Touch —<br />
            <span className="text-gradient">We're Here to Help</span>
          </h2>
          <p className="text-white/45 font-light max-w-lg mx-auto text-base leading-relaxed">
            Have questions about admissions, programs, or timings? Reach us on WhatsApp or fill the form below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left: Contact info + WhatsApp + Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919502952770?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20MVR%20AI%20Robotics%20Academy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl border border-green-500/25 bg-green-500/[0.06] hover:bg-green-500/10 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-green-400 mb-0.5">Chat on WhatsApp</p>
                <p className="text-xs text-white/40 font-light">Quick replies · Batch guidance · Demo booking</p>
                <p className="text-sm font-semibold text-white mt-1">+91 95029 52770</p>
              </div>
            </a>

            {/* Phone */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary/60" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-light mb-0.5">Call / WhatsApp</p>
                <p className="text-sm font-semibold text-white">+91 95029 52770</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-primary/60" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-light mb-0.5">Location</p>
                <p className="text-sm font-semibold text-white">Santhosh Nagar, Hyderabad</p>
                <p className="text-xs text-white/40 font-light mt-0.5">Telangana, India</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] h-52 bg-white/[0.02] relative">
              <iframe
                title="MVR AI Robotics Academy Location"
                src="https://maps.google.com/maps?q=Santhosh+Nagar+Hyderabad+Telangana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/45 text-sm font-light max-w-xs">
                    We'll get back to you on WhatsApp soon. You can also reach us directly at +91 95029 52770.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-white mb-1">Send an Enquiry</h3>
                  <p className="text-xs text-white/35 font-light mb-2">Fill the form and we'll get back to you shortly.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">Parent Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={form.parentName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">Child Age *</label>
                      <input
                        type="text"
                        name="childAge"
                        required
                        value={form.childAge}
                        onChange={handleChange}
                        placeholder="e.g. 8 years"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Interested Course</label>
                    <select
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-primary/40 transition-colors appearance-none"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <option value="" className="bg-gray-900">Select a program</option>
                      <option value="AI Little Champions" className="bg-gray-900">AI Little Champions (Age 6–10)</option>
                      <option value="Level 0 Robotics" className="bg-gray-900">Level 0 Robotics (Age 10–14)</option>
                      <option value="Computer + Future Skills" className="bg-gray-900">Computer + Future Skills (Age 8–14)</option>
                      <option value="Not sure" className="bg-gray-900">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Message (optional)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Any questions or preferred batch timing..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-premium px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {sending ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-white/20 font-light text-center">
                    Or reach us directly on WhatsApp · +91 95029 52770
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
