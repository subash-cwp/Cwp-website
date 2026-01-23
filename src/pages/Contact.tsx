import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { SEOHead } from "@/components/SEOHead";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contact Us - CWP Marketing"
        description="Get in touch with CWP Marketing. We're here to help you grow your business with strategic marketing solutions."
        keywords="contact, marketing agency, get in touch, consultation, Chennai"
      />
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <ScrollAnimationWrapper animation="fade-in">
            <ContactForm />
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
