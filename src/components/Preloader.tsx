import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 500);
        const timer2 = setTimeout(() => setStep(2), 2000);
        const timer3 = setTimeout(() => setStep(3), 5000);
        const timer4 = setTimeout(() => onComplete(), 6500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onComplete]);

    const branches = [
        "MVR AI Innovate Labs",
        "MVR AI Robotics Academy",
        "MVR Medico & Health",
    ];

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 7, repeat: Infinity }}
                />
            </div>

            <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4 z-10">

                {/* Rotating ring around logo */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: 360
                            }}
                            transition={{
                                rotate: {
                                    duration: 10,
                                    ease: "linear",
                                    repeat: Infinity
                                },
                                scale: { duration: 0.8 }
                            }}
                            className="absolute w-64 h-64 border border-secondary/40 rounded-full"
                        />
                    )}
                </AnimatePresence>

                {/* Main Brand */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: step >= 1 ? 1 : 0,
                        scale: step >= 2 ? 0.7 : 1,
                        y: step >= 2 ? -50 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-8 relative z-10"
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-white flex items-center justify-center gap-4"
                        animate={{
                            textShadow: [
                                "0 0 5px rgba(255,255,255,0.2)",
                                "0 0 25px rgba(0,255,255,0.6)",
                                "0 0 5px rgba(255,255,255,0.2)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        <span>MMK</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400">
                            AI Solutions
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step >= 1 ? "100%" : 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-4 rounded-full"
                    />
                </motion.div>

                {/* Branches */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full mt-8">
                    <AnimatePresence>
                        {step >= 2 &&
                            branches.map((branch, index) => (
                                <motion.div
                                    key={branch}
                                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    transition={{
                                        delay: index * 0.4,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 120
                                    }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Pulse node */}
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-secondary mb-3"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [1, 0.5, 1]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: index * 0.3
                                        }}
                                    />

                                    <div className="p-6 rounded-xl glass-card border border-white/10 w-full max-w-xs mx-auto hover:border-secondary/50 transition-all duration-300">
                                        <p className="font-semibold text-sm md:text-base text-white tracking-wide">
                                            {branch}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
