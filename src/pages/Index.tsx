import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import WhatWeTeach from "@/components/WhatWeTeach";
import HowChildrenLearn from "@/components/HowChildrenLearn";
import LearningOutcomes from "@/components/LearningOutcomes";
import StudentProjects from "@/components/StudentProjects";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <WhatWeTeach />
        <HowChildrenLearn />
        <LearningOutcomes />
        <StudentProjects />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
