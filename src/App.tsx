import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Careers from "./pages/Careers";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CustomPage from "./pages/CustomPage";
import Auth from "./pages/Auth";
import Enquiry from "./pages/Enquiry";
import ThankYou from "./pages/ThankYou";
import Unsubscribe from "./pages/Unsubscribe";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersAdmin from "./pages/admin/UsersAdmin";
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
import PageContentAdmin from "./pages/admin/PageContentAdmin";
import CustomPagesAdmin from "./pages/admin/CustomPagesAdmin";
import { Analytics } from "@/components/Analytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTop } from "@/components/BackToTop";
import { PageWrapper } from "@/components/PageWrapper";

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
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersAdmin />} />
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
              <Route path="/admin/page-content" element={<PageContentAdmin />} />
              <Route path="/admin/pages" element={<CustomPagesAdmin />} />
              <Route path="/:slug" element={<CustomPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
