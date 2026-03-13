import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SEO from "@/components/SEO";

const GetStarted = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        mobile: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newInquiry = {
                id: Date.now().toString(),
                ...formData,
                date: new Date().toISOString(),
                status: "new",
            };

            const existingInquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
            localStorage.setItem("inquiries", JSON.stringify([newInquiry, ...existingInquiries]));

            setLoading(false);
            setSubmitted(true);
            toast({
                title: "Application Received!",
                description: "We'll be in touch shortly.",
            });
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 text-center shadow-lg animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold font-serif mb-2">Thank You!</h2>
                    <p className="text-muted-foreground mb-8">
                        Your interest has been registered. Our team will contact you at <strong>{formData.mobile}</strong> soon to schedule a discussion.
                    </p>
                    <Button onClick={() => navigate("/")} className="w-full">
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
            <SEO
                title="Enroll Your Child at MVR AI Academy | Khammam, Telangana"
                description="Enroll your child in MVR AI Robotics Academy's AI, Robotics, and Coding programs for ages 9–13. Fill this form and our team will contact you within 24 hours. Khammam, Telangana."
                keywords="enroll AI academy Khammam, robotics class registration Telangana, coding program children India, MVR AI Academy enrollment, MMK AI Solutions register, AI school students Khammam, STEM program Andhra Pradesh"
                ogUrl="https://mmkaisolutions.com/get-started"
                canonicalUrl="https://mmkaisolutions.com/get-started"
                structuredData={{
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": "Enroll at MVR AI Robotics Academy",
                  "description": "Start your child's AI and Robotics journey. Enroll at MVR AI Academy in Khammam, Telangana.",
                  "url": "https://mmkaisolutions.com/get-started",
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mmkaisolutions.com/" },
                      { "@type": "ListItem", "position": 2, "name": "Get Started", "item": "https://mmkaisolutions.com/get-started" }
                    ]
                  }
                }}
            />
            <div className="w-full max-w-lg">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </button>

                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8 border-b border-border bg-muted/30">
                        <h1 className="text-2xl font-bold font-serif mb-2">Start Your Journey</h1>
                        <p className="text-muted-foreground">
                            Fill out the form below to initiate the enrollment process.
                        </p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">I am a...</Label>
                                <Select onValueChange={handleRoleChange} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Parent">Parent</SelectItem>
                                        <SelectItem value="Teacher">Teacher</SelectItem>
                                        <SelectItem value="Student">Student</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full font-semibold" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
