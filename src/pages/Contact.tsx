import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactFAQ } from "@/components/contact/ContactFAQ";

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact Us - CWP Marketing"
        description="Get in touch with CWP Marketing. We're here to help you grow your business with strategic marketing solutions. Call us or send a message today."
        keywords="contact, marketing agency, get in touch, consultation, Chennai, digital marketing"
      />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <ContactHero />
          
          <ScrollAnimationWrapper animation="slide-up">
            <ContactInfo />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="fade-in">
            <ContactFormSection />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="slide-up">
            <ContactMap />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper animation="scale-in">
            <ContactFAQ />
          </ScrollAnimationWrapper>
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Contact;
