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
        title="Contact CWP — Talk About Leads, Pipeline & Sales"
        description="Talk to CWP about generating qualified leads and closing more sales — demand generation, performance marketing and sales support. Call, email or message us."
        keywords="contact, marketing agency, get in touch, consultation, Chennai, digital marketing"
        canonicalUrl="https://consultwithprofessionals.com/contact"
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
