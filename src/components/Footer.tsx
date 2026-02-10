import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 py-12 lg:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="MVR AI Academy" className="w-10 h-10 rounded-full object-cover border border-white/10" />
              <span className="font-bold text-lg text-primary-foreground tracking-tight">
                MMK AI Solutions
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm">
              Future-ready AI, robotics, and coding education for children aged
              9–13. Built by educators and scientists who believe every child
              deserves the tools to thrive.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">
              Learn More
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Our Approach", href: "/#process" },
                { name: "Curriculum", href: "/#curriculum" },
                { name: "Student Projects", href: "/projects" },
                { name: "FAQs", href: "/contact" }, // Pointing to contact for now
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/contact"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/get-started"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  Schedule a Tour
                </a>
              </li>
              <li>
                <a
                  href="/get-started"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 MMK AI Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
