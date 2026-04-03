import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import msmeLogo from "@/assets/msme logo.jpg";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/[0.05] relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* Brand — 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />
                <img src={logo} alt="MVR AI & Robotics Academy" className="relative w-10 h-10 rounded-full object-cover border border-white/10" />
              </div>
              <div>
                <p className="font-bold text-base text-white tracking-tight">MVR AI & Robotics Academy</p>
                <p className="text-[11px] text-white/35 tracking-widest uppercase font-medium">by MMK AI Solutions</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <img src={msmeLogo} alt="MSME Registered" className="h-4 w-auto object-contain" />
                  <span className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400">
                    UDYAM-TS-04-0062944
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed font-light max-w-xs">
              Future-ready AI, Robotics & Coding education for children aged 9–13.
              Built by educators and scientists who believe every child deserves the tools to thrive.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-white/35">
                <MapPin className="w-3.5 h-3.5 text-white/25 shrink-0" />
                <span className="font-light">Khammam, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/35">
                <Mail className="w-3.5 h-3.5 text-white/25 shrink-0" />
                <a href="mailto:info@mmkaisolutions.com" className="font-light hover:text-white/60 transition-colors">
                  info@mmkaisolutions.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/35">
                <Phone className="w-3.5 h-3.5 text-white/25 shrink-0" />
                <span className="font-light">+91 95029 52770</span>
              </div>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-5">
              Learn More
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Our Approach", href: "/#process" },
                { name: "Curriculum", href: "/#curriculum" },
                { name: "Why MVR", href: "/#why" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
              {[
                { name: "Student Projects", to: "/projects" },
                { name: "Meet the Founder", to: "/founder" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {[
                { name: "AI for Kids", href: "/#curriculum" },
                { name: "Robotics Lab", href: "/#curriculum" },
                { name: "Coding Bootcamp", href: "/#curriculum" },
                { name: "Innovation Lab", href: "/#curriculum" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/internship"
                  className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light flex items-center gap-1 group"
                >
                  Internship
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", to: "/contact" },
                { name: "Schedule a Tour", to: "/get-started" },
                { name: "Apply Now", to: "/admission" },
                { name: "Partner With Us", to: "/get-started" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-light flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/admission"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 4px 15px rgba(124,58,237,0.3)"
                }}
              >
                Apply Now
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* MSME Registered badge */}
        <div className="py-4 border-t border-white/[0.05] flex justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <div className="bg-white rounded-lg px-2 py-1 flex items-center">
              <img
                src={msmeLogo}
                alt="MSME Registered – Government of India"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">MSME Registered</p>
              <p className="text-[10px] text-white/30 font-light mt-0.5">Ministry of MSME · Government of India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25 font-light">
            © 2026 MMK AI Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors font-light">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors font-light">
              Terms of Service
            </a>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-xs text-white/15 font-light">
              Designed with ♥ for the next generation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
