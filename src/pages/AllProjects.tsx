import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

const AllProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Local override for project images
        import("@/data/projects").then((module) => {
            setProjects(module.localProjects);
            setLoading(false);
        });
    }, []);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Student AI & Robotics Projects – MVR AI Robotics Academy",
        "description": "AI, Robotics, and Coding projects built by school children aged 9–13 at MVR AI Academy, Khammam, Telangana.",
        "url": "https://mmkaisolutions.com/projects",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mmkaisolutions.com/" },
            { "@type": "ListItem", "position": 2, "name": "Student Projects", "item": "https://mmkaisolutions.com/projects" }
          ]
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Student AI & Robotics Projects | MVR AI Academy | Khammam"
                description="See real AI, Robotics, and Coding projects built by school children aged 9–13 at MVR AI Robotics Academy, Khammam, Telangana — inspired by Dr. Murali Krishna (PhD)."
                keywords="student AI projects Khammam, kids robotics projects Telangana, children coding showcase India, MVR AI Academy student work, line follower robot school, automated rover project, STEM projects children Andhra Pradesh, MMK AI Solutions"
                ogUrl="https://mmkaisolutions.com/projects"
                canonicalUrl="https://mmkaisolutions.com/projects"
                structuredData={structuredData}
            />
            <div className="container mx-auto px-6 py-12">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Student Pilot Projects</h1>
                <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
                    Explore the incredible innovations and pilot projects built by our young minds.
                </p>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No projects showcased yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                                <div className="aspect-video overflow-hidden bg-muted">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold font-serif mb-1 line-clamp-1">{project.title}</h3>
                                            <p className="text-sm text-muted-foreground">by {project.student_name}</p>
                                        </div>
                                        {/* <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" /> */}
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                                        {project.quote && <span className="italic block mb-1">"{project.quote}"</span>}
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags?.map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProjects;
