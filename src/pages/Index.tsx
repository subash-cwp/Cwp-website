import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ClientLogos } from "@/components/ClientLogos";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { AnimatedStats } from "@/components/AnimatedStats";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BookingSection } from "@/components/BookingSection";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientLogos />
      <Services />
      <WhyChoose />
      <AnimatedStats />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <BookingSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default Index;
