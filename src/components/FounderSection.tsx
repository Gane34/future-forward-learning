import { motion } from "framer-motion";
import FounderImage from "@/assets/founder-image.jpeg";

const FoundersNotePage = () => {
    return (
        <main className="min-h-screen bg-background">

            {/* HERO */}
            <section className="pt-32 pb-24 bg-muted/30">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-serif font-bold mb-6">
                            Founder’s Note – Our Soul
                        </h1>

                        <p className="text-lg text-muted-foreground mb-6">
                            The Father’s Promise: From PhD to the Grassroots
                        </p>

                        <p className="text-muted-foreground leading-relaxed">
                            I am a scientist by training, but a father by soul.
                            This journey began not in a laboratory, but with a promise —
                            one made to my late father and to my daughter, Kovida.
                        </p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <img
                            src={FounderImage}
                            alt="Dr. Muralikrishna"
                            className="w-80 h-80 object-cover rounded-2xl shadow-xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 space-y-20">

                    {/* Roots */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-4">The Roots</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            My journey with MMK AI Solutions did not begin in a boardroom
                            or a startup accelerator. It began with a simple but deeply
                            responsible belief: education should serve generations,
                            not just careers.
                        </p>
                    </motion.section>

                    {/* Gap */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-4">The 15-Year Gap</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            During my PhD, I encountered an uncomfortable truth.
                            Rural India is living with a 15-year syllabus gap.
                            While the world moves toward Generative AI and advanced
                            computing, many rural children remain disconnected from
                            modern tools — not due to lack of talent, but lack of access.
                        </p>
                    </motion.section>

                    {/* Science for Society */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-4">
                            Science for Society
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            MMK AI Solutions is a research-driven movement.
                            Through MVR Medico, we bring AI-powered healthcare
                            diagnostics closer to rural communities.
                            Through education, we transform tuition centers into
                            Innovation Hubs — where children learn how to think,
                            question, and solve problems.
                        </p>
                    </motion.section>

                </div>
            </section>

            {/* VISION & MISSION BLOCK */}
            <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                            Our Foundation
                        </span>
                        <h2 className="mt-3 text-4xl lg:text-5xl font-serif font-bold">
                            Vision & Mission
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group"
                        >
                            <div className="bg-background/90 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-10 h-full hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/80"></div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">The Vision</h3>
                                </div>
                                <p className="text-foreground/90 leading-relaxed mb-6 text-lg font-medium">
                                    This work is my tribute to my father's legacy and my gift
                                    to the next generation. We are building a future where a child in Narasaraopet
                                    has access to the same tools, thinking frameworks, and
                                    learning opportunities as a child in Silicon Valley.
                                </p>
                                <blockquote className="text-primary font-bold italic border-l-4 border-primary pl-6 text-xl leading-relaxed bg-primary/5 py-4 px-4 rounded-r-lg">
                                    "A child in Narasaraopet should have the same opportunities
                                    as a child in Silicon Valley."
                                </blockquote>
                            </div>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group"
                        >
                            <div className="bg-background/90 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-10 h-full hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary/80"></div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300">
                                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">The Mission</h3>
                                </div>
                                <p className="text-foreground/90 leading-relaxed mb-6 text-lg font-medium">
                                    To transform local tuition centres into Innovation Hubs — spaces
                                    where students learn to think critically, code confidently, and
                                    solve real-world problems using AI and robotics.
                                </p>
                                <p className="text-foreground/90 leading-relaxed text-lg font-medium">
                                    Every child deserves access to world-class STEM education, regardless
                                    of their zip code or income. Through MVR AI & Robotics Academy, we're
                                    making this mission a reality — one child, one classroom, one village at a time.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* CLOSING STATEMENT */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl leading-relaxed"
                    >
                        Geography should never decide a child’s future.
                        That belief is the soul of everything we build.
                    </motion.p>
                </div>
            </section>

        </main>
    );
};

export default FoundersNotePage;
