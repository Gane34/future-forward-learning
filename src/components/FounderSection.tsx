import { motion } from "framer-motion";
import FounderImage from "@/assets/founder-image.jpeg";

const FounderPage = () => {
    return (
        <section className="min-h-screen py-28 bg-background relative overflow-hidden" id="founder">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl font-serif font-bold mb-4">
                        Dr. Muralikrishna
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        PhD • Educator • EdTech Visionary
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <img
                            src={FounderImage}
                            alt="Dr. Muralikrishna"
                            className="w-80 h-80 object-cover rounded-2xl shadow-xl"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-muted-foreground leading-relaxed"
                    >
                        <p>
                            Dr. Muralikrishna is not building another coaching center.
                            He is building an education movement.
                        </p>

                        <p>
                            With a strong academic foundation and years of experience
                            as a teacher, his work bridges deep research with
                            real-world learning — especially for children who are
                            often left behind by mainstream education systems.
                        </p>

                        <p>
                            His focus lies in bringing structured thinking, coding,
                            and modern technological literacy to rural and semi-urban
                            students — not as shortcuts to jobs, but as tools for
                            intellectual empowerment.
                        </p>
                    </motion.div>
                </div>

                {/* Founder Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-24 max-w-4xl mx-auto bg-muted/40 p-10 rounded-2xl"
                >
                    <h2 className="text-2xl font-serif font-bold mb-6 text-center">
                        Founder’s Message
                    </h2>

                    <p className="text-center text-lg leading-relaxed text-muted-foreground">
                        “I am a teacher first — not an entrepreneur.
                        <br /><br />
                        My responsibility is not to chase trends, but to prepare
                        children for a future we cannot fully predict.
                        <br /><br />
                        When a rural child learns to think logically, to build, to
                        question, and to create — technology becomes a tool of
                        empowerment, not distraction.
                        <br /><br />
                        This institute exists to make that future possible.”
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default FounderPage;
