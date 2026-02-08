import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import childrenRobotics from "@/assets/children-robotics.jpg";
import studentPresenting from "@/assets/student-presenting.jpg";

const AllProjects = () => {
    const navigate = useNavigate();

    const projects = [
        {
            id: 1,
            image: childrenRobotics,
            title: "Smart Obstacle Robot",
            student: "Aarav, Age 11",
            quote: "I wanted to make a robot that could help blind people navigate.",
            desc: "Used ultrasonic sensors and Arduino to detect obstacles within 50cm.",
            tags: ["Robotics", "C++"],
        },
        {
            id: 2,
            image: studentPresenting,
            title: "AI Crop Disease Detector",
            student: "Sarah, Age 13",
            quote: "Farmers lose crops because they don't know the disease early enough.",
            desc: "Trained an image classification model to identify 3 types of leaf diseases.",
            tags: ["Python", "TensorFlow"],
        },
        // Placeholder for more projects as requested by "we will make all" but lacking specific data sources
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2670&auto=format&fit=crop", // Placeholder
            title: "Automatic Plant Watering System",
            student: "Rohan, Age 10",
            quote: "Plants die when we forget to water them. This system does it automatically.",
            desc: "Built using moisture sensors and a water pump controlled by Arduino.",
            tags: ["IoT", "Arduino"],
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop", // Placeholder
            title: "Voice Controlled Home Automation",
            student: "Priya, Age 14",
            quote: "Turning lights on and off with just my voice is magic!",
            desc: "Integrated Google Assistant API with Raspberry Pi to control home appliances.",
            tags: ["IoT", "Python"],
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 py-12">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Student Projects Showcase</h1>
                <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
                    Explore the incredible innovations built by our young minds.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold font-serif mb-1">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground">by {project.student}</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                    "{project.quote}" - {project.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProjects;
