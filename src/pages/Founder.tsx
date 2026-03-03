import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FounderImage from "@/assets/founder-image.jpeg";
import {
    GraduationCap,
    Microscope,
    Heart,
    Lightbulb,
    Globe,
    Users,
    BookOpen,
    Award,
    Trophy,
    FileText,
    Cpu,
    Users2,
    Zap,
} from "lucide-react";

const milestones = [
    {
        year: "Early Life",
        icon: BookOpen,
        title: "Roots in Rural India",
        desc: "Born and raised in the Andhra Pradesh heartland, Muggu Murali Krishna grew up experiencing firsthand the gap between rural educational access and the rapidly evolving world of technology.",
    },
    {
        year: "Research",
        icon: Microscope,
        title: "PhD & Scientific Career",
        desc: "Pursued a doctoral degree in advanced computing and AI, dedicating years to research that blended cutting-edge technology with real-world societal impact — especially in healthcare and education.",
    },
    {
        year: "Realisation",
        icon: Lightbulb,
        title: "The 15-Year Syllabus Gap",
        desc: "During his PhD journey, he uncovered a stark truth: rural India's classrooms were teaching a curriculum 15 years behind the world's frontier. A child in Narasaraopet had no path to AI literacy.",
    },
    {
        year: "Action",
        icon: Heart,
        title: "A Promise to Family",
        desc: "Driven by a promise made to his late father and inspired by his daughter Kovida, he resolved to bridge that gap — not just for his family, but for every child in every village.",
    },
    {
        year: "2024",
        icon: Globe,
        title: "Founded MMK AI Solutions",
        desc: "Launched MVR AI Academy and MMK AI Solutions to transform local tuition centres into Innovation Hubs — equipping children aged 9–13 with AI, robotics, and problem-solving skills.",
    },
    {
        year: "Today",
        icon: Users,
        title: "Scaling the Movement",
        desc: "MVR AI Academy is now expanding across Andhra Pradesh, training students and educators alike to ensure that geography never decides a child's future.",
    },
];

// ── DEFAULT achievements (used when admin hasn't set any yet) ─────────
type AchievementItem = {
    id?: string;
    icon?: React.ElementType;
    category: string;
    title: string;
    desc: string;
};

const defaultAchievements: AchievementItem[] = [
    {
        icon: GraduationCap,
        category: "Academia",
        title: "PhD in Advanced Computing & AI",
        desc: "Completed rigorous doctoral research blending machine learning, computer vision, and data-driven decision systems — producing work recognised at national-level academic conferences.",
    },
    {
        icon: FileText,
        category: "Research",
        title: "Published Research Papers",
        desc: "Authored and co-authored multiple peer-reviewed papers in AI, healthcare diagnostics, and rural technology adoption, contributing to the global body of knowledge in applied AI.",
    },
    {
        icon: Cpu,
        category: "Innovation",
        title: "AI-Powered Healthcare Diagnostics (MVR Medico)",
        desc: "Founded MVR Medico, an initiative deploying AI diagnostic tools in rural healthcare centres across Andhra Pradesh, bridging the technology gap in underserved medical facilities.",
    },
    {
        icon: Trophy,
        category: "Education",
        title: "Established MVR AI Academy",
        desc: "Built one of Andhra Pradesh's first grassroots AI education institutions specifically targeting children aged 9–13, with a curriculum co-designed with researchers and educators.",
    },
    {
        icon: Users2,
        category: "Community",
        title: "Transformed Tuition Centres into Innovation Hubs",
        desc: "Pioneered a replicable model that converts ordinary tuition centres into hands-on Innovation Hubs, bringing robotics kits, coding tools, and AI projects to rural classrooms at scale.",
    },
    {
        icon: Zap,
        category: "Leadership",
        title: "Founder & Director, MMK AI Solutions",
        desc: "Led the end-to-end design, funding strategy, and operational launch of MMK AI Solutions — a research-backed ed-tech company bridging the 15-year rural syllabus gap with measurable outcomes.",
    },
    {
        category: "Recognition",
        title: "Community Science Evangelist",
        desc: "Recognised by local government bodies and education networks for grassroots science outreach, conducting workshops, science fairs, and AI demonstrations across villages and town schools.",
    },
];

const values = [
    {
        icon: Heart,
        title: "Compassion",
        desc: "Every decision is rooted in genuine care for the children and families we serve.",
    },
    {
        icon: Microscope,
        title: "Scientific Rigour",
        desc: "A PhD-driven approach ensures our curriculum is evidence-based and truly future-proof.",
    },
    {
        icon: GraduationCap,
        title: "Accessibility",
        desc: "Premium AI education must reach every child, regardless of zip code or income.",
    },
    {
        icon: Award,
        title: "Excellence",
        desc: "We refuse to settle for 'good enough' when children deserve the very best.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08 },
    }),
};

const Founder = () => {
    return (
        <>
            <SEO
                title="Our Founder | Muggu Murali Krishna – MVR AI Academy"
                description="Meet Muggu Murali Krishna, the visionary scientist and father behind MVR AI Academy & MMK AI Solutions, on a mission to bring future-ready AI education to every child in rural India."
            />
            <Navbar />

            <main className="min-h-screen bg-background overflow-hidden">

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="relative pt-32 pb-28 bg-muted/30 overflow-hidden">
                    {/* decorative blobs */}
                    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
                        {/* Text side */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={0}
                        >
                            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-secondary mb-4">
                                Meet the Founder
                            </span>

                            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                                Muggu{" "}
                                <span className="text-secondary">Murali Krishna</span>
                            </h1>

                            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                                Scientist. Educator. Father. Visionary.
                            </p>

                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Dr. Muggu Murali Krishna — affectionately known as{" "}
                                <strong className="text-foreground">MMK</strong> — is the
                                founder of MVR AI Academy and MMK AI Solutions. A
                                PhD-trained researcher, he chose to channel the power of
                                science not into patents or papers alone, but into the
                                hands of children who had never heard the word "algorithm."
                            </p>

                            <motion.a
                                href="/contact"
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                custom={2}
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm shadow-lg hover:shadow-secondary/30 hover:scale-105 transition-all"
                            >
                                Connect with Us
                            </motion.a>
                        </motion.div>

                        {/* Photo side */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            custom={1}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                {/* Glow ring */}
                                <div className="absolute inset-0 rounded-3xl bg-secondary/30 blur-2xl scale-105 pointer-events-none" />
                                <img
                                    src={FounderImage}
                                    alt="Muggu Murali Krishna – Founder, MVR AI Academy"
                                    className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl border border-white/10"
                                />
                                {/* Badge */}
                                <div className="absolute -bottom-5 -right-5 bg-card border border-border rounded-2xl px-5 py-3 shadow-xl">
                                    <p className="text-xs text-muted-foreground font-medium">Founder &amp; Director</p>
                                    <p className="text-sm font-bold text-foreground">MMK AI Solutions</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── INTRODUCTION QUOTE ────────────────────────────── */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.blockquote
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-2xl lg:text-3xl font-serif italic text-foreground/90 leading-relaxed"
                        >
                            "I am a scientist by training, but a father by soul. This journey
                            began not in a laboratory, but with a promise — one made to my
                            late father and to my daughter, Kovida."
                        </motion.blockquote>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={1}
                            className="mt-6 text-sm text-muted-foreground font-medium tracking-wide"
                        >
                            — Muggu Murali Krishna
                        </motion.p>
                    </div>
                </section>

                {/* ── JOURNEY TIMELINE ──────────────────────────────── */}
                <section className="py-20 bg-muted/20">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
                                The Journey
                            </span>
                            <h2 className="mt-3 text-4xl font-serif font-bold">
                                From PhD to Grassroots
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                                Every milestone in Dr. Murali Krishna's life was a stepping
                                stone toward one grand mission — democratising AI education.
                            </p>
                        </motion.div>

                        <div className="relative">
                            {/* Timeline spine */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 pointer-events-none" />

                            <div className="space-y-14">
                                {milestones.map((m, i) => {
                                    const Icon = m.icon;
                                    const isLeft = i % 2 === 0;
                                    return (
                                        <motion.div
                                            key={m.year}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="show"
                                            viewport={{ once: true }}
                                            custom={i}
                                            className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center md:gap-10`}
                                        >
                                            {/* Content card */}
                                            <div className="flex-1 pl-14 md:pl-0">
                                                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                                    <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                                                        {m.year}
                                                    </span>
                                                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                                                        {m.title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                                        {m.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Dot */}
                                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-secondary shadow-md shadow-secondary/40 ring-4 ring-background z-10">
                                                <Icon size={10} className="text-secondary-foreground" />
                                            </div>

                                            {/* Spacer */}
                                            <div className="flex-1 hidden md:block" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PAST ACHIEVEMENTS ─────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
                                Track Record
                            </span>
                            <h2 className="mt-3 text-4xl font-serif font-bold">
                                Past Achievements &amp; Recognitions
                            </h2>
                            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                                A decade of relentless work across academia, healthcare, and
                                grassroots education — each milestone a proof point of what
                                science can do when it serves society.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {defaultAchievements.map((a, i) => {
                                const Icon = a.icon;
                                return (
                                    <motion.div
                                        key={a.title}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        custom={i}
                                        className="group relative bg-card border border-border rounded-2xl p-6 hover:border-secondary/60 hover:shadow-lg transition-all overflow-hidden"
                                    >
                                        {/* subtle bg glow on hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_top_left,hsl(var(--secondary)/0.08)_0%,transparent_70%)] pointer-events-none" />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                {Icon && (
                                                    <div className="w-10 h-10 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors flex items-center justify-center flex-shrink-0">
                                                        <Icon size={18} className="text-secondary" />
                                                    </div>
                                                )}
                                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                                                    {a.category}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-2 leading-snug">
                                                {a.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {a.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── AI BODHAN CONCLAVE 2026 ───────────────────────── */}
                <section className="py-24 bg-muted/20">
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
                                National Event · Bharat Mandapam, New Delhi
                            </span>
                            <h2 className="mt-3 text-4xl font-serif font-bold">
                                AI Bodhan Conclave 2026
                            </h2>
                            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Dr. Muggu Murali Krishna represented MMK AI Solutions at the
                                AI Bodhan Conclave 2026 — a prestigious national conclave held
                                at Bharat Mandapam, New Delhi, dedicated to shaping the future
                                of Artificial Intelligence in India. As a founder and startup
                                representative, he engaged with policymakers, researchers, and
                                innovators driving India's AI ecosystem forward, reaffirming
                                our commitment to building responsible, inclusive, and
                                future-ready AI solutions for every corner of the country.
                            </p>
                        </motion.div>

                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                            {[
                                "IMG20260212110949.jpg",
                                "IMG20260212110950.jpg",
                                "IMG20260212112649.jpg",
                                "IMG20260212112709.jpg",
                                "IMG20260212113553.jpg",
                                "IMG20260213131420 (1).jpg",
                                "IMG_20260212_091050.jpg",
                                "IMG_20260212_104419.jpg",
                                "IMG_20260212_133248.jpg",
                                "IMG_20260212_152025.jpg",
                                "IMG_20260212_170550 (1).jpg",
                                "IMG_20260212_171557.jpg",
                                "IMG_20260213_113849 (1).jpg",
                                "IMG_20260213_115101.jpg",
                                "IMG_20260213_122508.jpg",
                                "IMG_20260213_133144.jpg",
                                "IMG_20260213_134221.jpg",
                                "IMG_20260213_142217.jpg",
                                "IMG_20260213_143259.jpg",
                                "IMG_20260213_143724 (1).jpg",
                                "IMG_20260213_143726.jpg",
                            ].map((photo, i) => (
                                <motion.div
                                    key={photo}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    custom={i * 0.3}
                                    className="break-inside-avoid mb-3"
                                >
                                    <img
                                        src={`/delhi/${photo}`}
                                        alt={`AI Bodhan Conclave 2026 – photo ${i + 1}`}
                                        className="w-full rounded-xl object-cover shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CORE VALUES ───────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
                                What Drives Him
                            </span>
                            <h2 className="mt-3 text-4xl font-serif font-bold">
                                Core Values
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <motion.div
                                        key={v.title}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        custom={i}
                                        className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-colors group"
                                    >
                                        <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                            <Icon size={20} className="text-secondary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {v.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {v.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── VISION STATEMENT ──────────────────────────────── */}
                <section className="py-24 bg-muted/20">
                    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <span className="text-xs font-semibold tracking-widest uppercase text-secondary">
                                Vision &amp; Mission
                            </span>
                            <h2 className="mt-3 text-4xl font-serif font-bold mb-6">
                                A Future Where Geography Is No Barrier
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Dr. Murali Krishna's vision is audacious yet simple:{" "}
                                <em>a child in Narasaraopet should have the same opportunities
                                    as a child in Silicon Valley.</em>
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Through MVR AI Academy he is turning local tuition centres into
                                Innovation Hubs — spaces where students learn to think
                                critically, code confidently, and solve real-world problems
                                using AI and robotics.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Through <strong className="text-foreground">MVR Medico</strong>,
                                his parallel initiative, AI-powered diagnostics are reaching
                                rural healthcare centres, echoing the same belief:{" "}
                                <em>science must serve society.</em>
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={1}
                            className="space-y-6"
                        >
                            {[
                                {
                                    stat: "9–13",
                                    label: "Target age group for AI literacy",
                                },
                                {
                                    stat: "15 yrs",
                                    label: "Syllabus gap we're closing in rural India",
                                },
                                {
                                    stat: "1 Mission",
                                    label: "Geography should never decide a child's future",
                                },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.stat}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    custom={i}
                                    className="flex items-start gap-5 bg-card border border-border rounded-2xl p-6"
                                >
                                    <span className="text-3xl font-serif font-bold text-secondary whitespace-nowrap">
                                        {s.stat}
                                    </span>
                                    <p className="text-sm text-muted-foreground leading-relaxed self-center">
                                        {s.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── CLOSING CTA ───────────────────────────────────── */}
                <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.25)_0%,transparent_70%)] pointer-events-none" />
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-4xl font-serif font-bold mb-6"
                        >
                            Join the Movement
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={1}
                            className="text-primary-foreground/80 text-lg leading-relaxed mb-10"
                        >
                            Whether you're a parent, educator, or partner — you can be part
                            of the change Dr. Murali Krishna is driving. Let's build a
                            generation that's ready for the future.
                        </motion.p>
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={2}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a
                                href="/get-started"
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm shadow-lg hover:shadow-secondary/30 hover:scale-105 transition-all"
                            >
                                Get Started Today
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
                            >
                                Contact Us
                            </a>
                        </motion.div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
};

export default Founder;
