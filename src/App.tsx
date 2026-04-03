import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AllProjects from "./pages/AllProjects";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Founder from "./pages/Founder";
import AdmissionForm from "./pages/AdmissionForm";
import InternshipForm from "./pages/InternshipForm";
import GraduateInternship from "./pages/GraduateInternship";
import Courses from "./pages/Courses";

import { useState } from "react";
import Preloader from "./components/Preloader";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading ? (
          <Preloader onComplete={() => setIsLoading(false)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/admission" element={<AdmissionForm />} />
              <Route path="/internship" element={<InternshipForm />} />
              <Route path="/graduate-internship" element={<GraduateInternship />} />
              <Route path="/courses" element={<Courses />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
