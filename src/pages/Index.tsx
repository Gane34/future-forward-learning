import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import WhySection from "@/components/WhySection";
import WhatWeTeach from "@/components/WhatWeTeach";
import HowChildrenLearn from "@/components/HowChildrenLearn";
import LearningOutcomes from "@/components/LearningOutcomes";
import StudentProjects from "@/components/StudentProjects";
import StoriesSection from "@/components/StoriesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "MVR AI Academy",
    "description": "Future-ready AI, robotics, and coding education for children aged 9–13",
    "url": "https://mmkaisolutions.com",
    "courseMode": "offline",
    "educationalLevel": "Children aged 9-13",
    "teaches": ["Artificial Intelligence", "Robotics", "Coding", "Programming"],
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">
      <SEO
        title="MVR AI Academy — Future-Ready AI & Robotics for Children"
        description="Future-ready AI, robotics, and coding education for children aged 9–13. Project-based learning that builds confidence, creativity, and logical thinking."
        keywords="AI education, robotics for kids, coding for children, STEM education, project-based learning, artificial intelligence courses, robotics classes, programming for kids"
        ogUrl="https://mmkaisolutions.com/"
        canonicalUrl="https://mmkaisolutions.com/"
        structuredData={structuredData}
      />
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <FounderSection />
        <WhatWeTeach />
        <HowChildrenLearn />
        <LearningOutcomes />
        <StudentProjects />
        <StoriesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
