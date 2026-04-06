import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderBatchBanner from "@/components/FounderBatchBanner";
import ProgramsSection from "@/components/ProgramsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowWeTeach from "@/components/HowWeTeach";
import ClassroomGallery from "@/components/ClassroomGallery";
import StudentsGain from "@/components/StudentsGain";
import ParentTestimonials from "@/components/ParentTestimonials";
import AchievementsBanner from "@/components/AchievementsBanner";
import AdmissionsSection from "@/components/AdmissionsSection";
import ContactSection from "@/components/ContactSection";
import ScrollingTicker from "@/components/ScrollingTicker";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://mmkaisolutions.com/#organization",
        "name": "MVR AI Robotics Academy",
        "alternateName": ["MMK AI Solutions", "MVR AI & Robotics Academy"],
        "description": "Future-ready AI, robotics, and coding education for school children aged 9–13 in Khammam, Telangana, India.",
        "url": "https://mmkaisolutions.com",
        "logo": "https://mmkaisolutions.com/favicon.png",
        "image": "https://mmkaisolutions.com/og-image.jpg",
        "telephone": "+91-9502952770",
        "email": "muggu@mmkaisolutions.com",
        "founder": {
          "@type": "Person",
          "name": "Muggu Murali Krishna",
          "honorificSuffix": "PhD"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Wyra",
          "addressLocality": "Khammam",
          "addressRegion": "Telangana",
          "postalCode": "507165",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "17.1767",
          "longitude": "80.3649"
        },
        "areaServed": ["Khammam", "Telangana", "Andhra Pradesh", "India"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI & Robotics Programs",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Level 0 – AI & Coding Foundation",
              "description": "Beginner program covering AI concepts, block-based coding, and basic robotics for children with no prior experience.",
              "provider": { "@type": "Organization", "name": "MVR AI Robotics Academy" },
              "educationalLevel": "Beginner",
              "teaches": ["Artificial Intelligence", "Block-based Coding", "Basic Robotics"]
            },
            {
              "@type": "Course",
              "name": "Level 1 – Robotics & Automation",
              "description": "Intermediate program with autonomous robots, sensor integration, Python for robotics, and hands-on engineering.",
              "provider": { "@type": "Organization", "name": "MVR AI Robotics Academy" },
              "educationalLevel": "Intermediate",
              "teaches": ["Robotics", "Python", "Sensors", "Automation"]
            },
            {
              "@type": "Course",
              "name": "Junior AI Innovator Internship",
              "description": "School student internship program in AI, Robotics, Coding and Innovation under Dr. Murali Krishna.",
              "provider": { "@type": "Organization", "name": "MVR AI Robotics Academy" },
              "educationalLevel": "Beginner to Intermediate",
              "teaches": ["AI Basics", "Robotics", "Coding", "Innovation Projects"]
            }
          ]
        },
        "sameAs": ["https://mmkaisolutions.com"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What age group does MVR AI & Robotics Academy teach?",
            "acceptedAnswer": { "@type": "Answer", "text": "MVR AI & Robotics Academy teaches children aged 9 to 13 years. Programs range from Level 0 Foundation to advanced Robotics and AI Innovation." }
          },
          {
            "@type": "Question",
            "name": "Where is MVR AI & Robotics Academy located?",
            "acceptedAnswer": { "@type": "Answer", "text": "MVR AI & Robotics Academy is located in Wyra, Khammam, Telangana – 507165, India. Contact: +91 9502952770." }
          },
          {
            "@type": "Question",
            "name": "What courses does MVR AI & Robotics Academy offer?",
            "acceptedAnswer": { "@type": "Answer", "text": "We offer AI Fundamentals, Coding & Logic (Scratch to Python), Robotics engineering, Innovation Lab projects, and a Junior AI Innovator Internship for school students." }
          },
          {
            "@type": "Question",
            "name": "Who founded MVR AI & Robotics Academy?",
            "acceptedAnswer": { "@type": "Answer", "text": "MVR AI & Robotics Academy was founded by Dr. Muggu Murali Krishna (PhD), a researcher and educator dedicated to bringing AI and robotics education to children in rural India." }
          },
          {
            "@type": "Question",
            "name": "How can I enroll my child at MVR AI & Robotics Academy?",
            "acceptedAnswer": { "@type": "Answer", "text": "Visit mmkaisolutions.com/get-started to fill the enrollment form, or call us at +91 9502952770 or email muggu@mmkaisolutions.com." }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://mmkaisolutions.com/#website",
        "url": "https://mmkaisolutions.com",
        "name": "MVR AI Robotics Academy – MMK AI Solutions",
        "description": "AI, Robotics and Coding education for school children in Khammam, Telangana.",
        "publisher": { "@id": "https://mmkaisolutions.com/#organization" }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/30">
      <SEO
        title="MVR AI & Robotics Academy — AI, Robotics & Coding for Children | Khammam, Telangana"
        description="MVR AI Robotics Academy offers AI, Robotics, and Coding programs for school children aged 9–13 in Khammam, Telangana. Project-based learning led by Dr. Murali Krishna (PhD). Enroll today!"
        keywords="AI academy Khammam, robotics for kids Telangana, coding classes children India, STEM education Khammam, AI education school students, MVR AI & Robotics Academy, MMK AI Solutions, Dr Murali Krishna, junior AI internship, artificial intelligence robotics Telangana"
        ogUrl="https://mmkaisolutions.com/"
        canonicalUrl="https://mmkaisolutions.com/"
        structuredData={structuredData}
      />
      <ScrollingTicker />
      <Navbar />
      <main>
        <Hero />
        <FounderBatchBanner />
        <ProgramsSection />
        <WhyChooseUs />
        <HowWeTeach />
        <ClassroomGallery />
        <StudentsGain />
        <ParentTestimonials />
        <AchievementsBanner />
        <AdmissionsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
