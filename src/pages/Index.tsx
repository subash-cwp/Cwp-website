import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { AnimatedStats } from "@/components/AnimatedStats";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { TeamProfiles } from "@/components/TeamProfiles";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BookingSection } from "@/components/BookingSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { InteractiveParticles } from "@/components/InteractiveParticles";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { SEOHead } from "@/components/SEOHead";
import { JsonLd } from "@/components/JsonLd";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { CookieConsent } from "@/components/CookieConsent";
import { lazy, Suspense } from "react";

// Lazy load heavy components
const LazyPortfolio = lazy(() => import("@/components/Portfolio").then(module => ({ default: module.Portfolio })));
const LazyTeamProfiles = lazy(() => import("@/components/TeamProfiles").then(module => ({ default: module.TeamProfiles })));
const LazyTestimonials = lazy(() => import("@/components/Testimonials").then(module => ({ default: module.Testimonials })));

// Loading fallback component
const SectionLoader = () => (
  <div className="section-spacing flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <>
      <SEOHead 
        title="CWP Marketing - Strategic Marketing & Growth Consulting"
        description="We build, grow and help you scale. Strategic marketing, creative solutions, and growth consulting that aligns with your brand's vision. Trusted by 50+ brands."
        keywords="marketing agency, growth consulting, digital marketing, SEO, social media marketing, brand strategy, Chennai"
      />
      <JsonLd 
        schema={{
          type: "Organization",
          name: "CWP Marketing",
          url: window.location.origin,
          logo: `${window.location.origin}/og-image.png`,
          description: "Strategic marketing and growth consulting agency trusted by 50+ brands",
          contactPoint: {
            telephone: "+918610986622",
            contactType: "sales"
          },
          sameAs: ["https://www.linkedin.com/in/naren-ethiraj-14834514b/"]
        }}
      />
      <ExitIntentPopup />
      <CookieConsent />
      <PageTransition />
      <ScrollProgressBar />
      <div className="min-h-screen relative">
        <InteractiveParticles />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          
          <ScrollAnimationWrapper animation="fade-in" threshold={0.2}>
            <ParallaxSection speed={0.3} direction="up">
              <ClientLogos />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.4} direction="down">
              <Services />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-in-left" threshold={0.15}>
            <ParallaxSection speed={0.3} direction="up">
              <WhyChoose />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <ParallaxSection speed={0.5} direction="down">
              <AnimatedStats />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.4} direction="up">
              <Process />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-in-right" threshold={0.1}>
            <ParallaxSection speed={0.35} direction="down">
              <Suspense fallback={<SectionLoader />}>
                <LazyPortfolio />
              </Suspense>
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <Suspense fallback={<SectionLoader />}>
                <LazyTeamProfiles />
              </Suspense>
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-in" threshold={0.15}>
            <ParallaxSection speed={0.4} direction="down">
              <Suspense fallback={<SectionLoader />}>
                <LazyTestimonials />
              </Suspense>
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.2}>
            <ParallaxSection speed={0.3} direction="up">
              <FAQ />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <ParallaxSection speed={0.4} direction="down">
              <BookingSection />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.2}>
            <ParallaxSection speed={0.3} direction="up">
              <ContactForm />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </div>
      </div>
    </>
  );
};

export default Index;
