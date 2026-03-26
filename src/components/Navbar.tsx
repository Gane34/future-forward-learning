import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.svg";

const navItems = [
  { label: "Why Us", href: "#why" },
  { label: "Courses", href: "/courses" },
  { label: "How It Works", href: "#process" },
  { label: "Projects", href: "/projects" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060611]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavigation(e, "/")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:blur-lg transition-all duration-300" />
              <img
                src={logo}
                alt="MVR AI Academy"
                className="relative w-9 h-9 rounded-full object-cover border border-white/15"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[15px] text-white tracking-tight">MVR AI Academy</span>
              <span className="text-[10px] text-white/40 tracking-widest uppercase font-medium">Khammam</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group cursor-pointer rounded-lg hover:bg-white/[0.05]"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/internship"
              onClick={(e) => handleNavigation(e, "/internship")}
              className="px-4 py-2 text-sm font-semibold text-primary hover:text-white border border-primary/30 hover:border-primary rounded-xl hover:bg-primary/10 transition-all duration-200"
            >
              Internship
            </a>
            <a
              href="/admission"
              onClick={(e) => handleNavigation(e, "/admission")}
              className="group relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow: "0 4px 15px rgba(124,58,237,0.35)"
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Apply Now <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#06060F]/95 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all cursor-pointer flex items-center justify-between group"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </motion.a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                <a
                  href="/internship"
                  onClick={(e) => handleNavigation(e, "/internship")}
                  className="px-5 py-3 text-sm font-semibold text-center text-primary border border-primary/30 rounded-xl hover:bg-primary/10 transition-all"
                >
                  Internship Registration
                </a>
                <a
                  href="/admission"
                  onClick={(e) => handleNavigation(e, "/admission")}
                  className="px-5 py-3 text-sm font-semibold text-center text-white rounded-xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                    boxShadow: "0 4px 15px rgba(124,58,237,0.35)"
                  }}
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
