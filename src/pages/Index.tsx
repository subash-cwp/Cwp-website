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

const Index = () => {
  return (
    <>
      <PageTransition />
      <div className="min-h-screen relative">
        <InteractiveParticles />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          
          <ScrollAnimationWrapper animation="fade-in" threshold={0.2}>
            <ClientLogos />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <Services />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-in-left" threshold={0.15}>
            <WhyChoose />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <AnimatedStats />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <Process />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-in-right" threshold={0.1}>
            <Portfolio />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <TeamProfiles />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-in" threshold={0.15}>
            <Testimonials />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.2}>
            <FAQ />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <BookingSection />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.2}>
            <ContactForm />
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
