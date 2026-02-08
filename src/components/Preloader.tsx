
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Step 0: Initial delay
        const timer1 = setTimeout(() => setStep(1), 500);
        // Step 1: Show Main Brand
        const timer2 = setTimeout(() => setStep(2), 2000);
        // Step 2: Show Branches
        const timer3 = setTimeout(() => setStep(3), 5000);
        // Step 3: Exit
        const timer4 = setTimeout(() => onComplete(), 6000);

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
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4 z-10">
                {/* Main Brand */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: step >= 1 ? 1 : 0,
                        scale: step >= 2 ? 0.7 : 1, // Shrink slightly when branches appear
                        y: step >= 2 ? -50 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-8 relative z-10"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        MMKAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400 drop-shadow-[0_0_10px_rgba(var(--secondary),0.5)]">Solutions</span>
                    </h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: step >= 1 ? "100%" : 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(var(--secondary),0.5)]"
                    />
                </motion.div>

                {/* Branches */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full mt-8">
                    <AnimatePresence>
                        {step >= 2 && branches.map((branch, index) => (
                            <motion.div
                                key={branch}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.3, // Stagger effect
                                    duration: 0.6
                                }}
                                className="flex flex-col items-center"
                            >
                                {/* Connecting Line (Visual only) */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 40 }}
                                    transition={{ delay: index * 0.3, duration: 0.4 }}
                                    className="w-0.5 bg-gradient-to-b from-secondary/50 to-primary/50 mb-4 hidden md:block shadow-[0_0_5px_rgba(var(--secondary),0.5)]"
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
