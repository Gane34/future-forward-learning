import { motion } from "framer-motion";
import { ShieldCheck, Users, GraduationCap } from "lucide-react";
import FounderImage from "@/assets/founder-image.jpeg";

const FounderSection = () => {
    return (
        <section
            id="founder"
            className="py-24 bg-[#0A192F] relative overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-serif font-bold text-[#D4AF37] mb-4"
                    >
                        Why Parents Trust Us
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        Teaching children responsibly requires structure, safety,
                        and proven guidance — not just enthusiasm.
                    </motion.p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">

                    {/* Left Trust Point */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#112240] p-6 rounded-xl shadow-lg border border-[#D4AF37]/20 relative group hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ShieldCheck className="w-10 h-10 text-[#D4AF37] mb-4 relative z-10" />
                        <h3 className="text-xl font-semibold mb-2 text-white relative z-10">
                            Structured & Child-Safe Learning
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                            Small batches, guided sessions, age-appropriate tools,
                            and zero exposure to unsafe or random online content.
                        </p>
                    </motion.div>

                    {/* Founder Image */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative flex justify-center"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#D4AF37]/30 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)]">
                            <img
                                src={FounderImage}
                                alt="Founder"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </motion.div>

                    {/* Right Trust Point */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#112240] p-6 rounded-xl shadow-lg border border-[#D4AF37]/20 relative group hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Users className="w-10 h-10 text-[#D4AF37] mb-4 relative z-10" />
                        <h3 className="text-xl font-semibold mb-2 text-white relative z-10">
                            Proven with Real Students
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                            500+ students guided so far. Children as young as 8
                            building games, animations, and logical thinking skills.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Promise */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-[#D4AF37]/20 p-8 rounded-2xl shadow-lg text-center"
                >
                    <GraduationCap className="w-10 h-10 mx-auto mb-4 text-[#D4AF37] opacity-90" />
                    <p className="text-lg leading-relaxed text-gray-200">
                        A child doesn’t need more screen time.
                        They need the <strong className="text-[#D4AF37] font-semibold">right guidance</strong>, at the
                        <strong className="text-[#D4AF37] font-semibold"> right age</strong>, in a
                        <strong className="text-[#D4AF37] font-semibold"> safe learning environment</strong>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderSection;
