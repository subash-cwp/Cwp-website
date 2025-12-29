import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import BlogAdmin from "./pages/admin/BlogAdmin";
import CaseStudiesAdmin from "./pages/admin/CaseStudiesAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import SiteSettingsAdmin from "./pages/admin/SiteSettingsAdmin";
import AnalyticsAdmin from "./pages/admin/AnalyticsAdmin";
import ActivityLogAdmin from "./pages/admin/ActivityLogAdmin";
import EmailCampaignsAdmin from "./pages/admin/EmailCampaignsAdmin";
import LeadScoringAdmin from "./pages/admin/LeadScoringAdmin";
import MediaLibraryAdmin from "./pages/admin/MediaLibraryAdmin";
import ABTestingAdmin from "./pages/admin/ABTestingAdmin";
import SEOAnalyzerAdmin from "./pages/admin/SEOAnalyzerAdmin";
import { Analytics } from "@/components/Analytics";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Analytics />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/case-studies" element={<CaseStudiesAdmin />} />
            <Route path="/admin/services" element={<ServicesAdmin />} />
            <Route path="/admin/team" element={<TeamAdmin />} />
            <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
            <Route path="/admin/leads" element={<LeadsAdmin />} />
            <Route path="/admin/leads-scoring" element={<LeadScoringAdmin />} />
            <Route path="/admin/email-campaigns" element={<EmailCampaignsAdmin />} />
            <Route path="/admin/media" element={<MediaLibraryAdmin />} />
            <Route path="/admin/ab-testing" element={<ABTestingAdmin />} />
            <Route path="/admin/seo" element={<SEOAnalyzerAdmin />} />
            <Route path="/admin/activity-log" element={<ActivityLogAdmin />} />
            <Route path="/admin/settings" element={<SiteSettingsAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
