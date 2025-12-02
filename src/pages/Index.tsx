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
import { CustomCursor } from "@/components/CustomCursor";
import { ParallaxSection } from "@/components/ParallaxSection";

const Index = () => {
  return (
    <>
      <PageTransition />
      <CustomCursor />
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
              <Portfolio />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <TeamProfiles />
            </ParallaxSection>
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-in" threshold={0.15}>
            <ParallaxSection speed={0.4} direction="down">
              <Testimonials />
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
