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

                    {/* Vision */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-semibold mb-4">The Vision</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This work is my tribute to my father’s legacy and my gift
                            to the next generation.
                            We are building a future where a child in Narasaraopet
                            has access to the same tools, thinking frameworks, and
                            learning opportunities as a child in Silicon Valley.
                        </p>
                    </motion.section>

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
