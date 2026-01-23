import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling us directly or reaching out via WhatsApp for faster assistance.",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We offer a free 30-minute consultation call to understand your business needs and discuss how we can help you achieve your marketing goals. No strings attached.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with businesses across various industries including SaaS, E-commerce, Healthcare, Education, Finance, and Startups. Our strategies are customized based on your specific industry and target audience.",
  },
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. Most marketing campaigns show initial results within 2-3 months, while comprehensive strategies may take 6-12 months for full impact. We'll provide a detailed timeline during our consultation.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer: "Absolutely! We love working with startups and small businesses. We have flexible packages designed specifically for businesses at different stages of growth, from early-stage startups to established enterprises.",
  },
  {
    question: "Can I visit your office for a meeting?",
    answer: "Yes, we welcome in-person meetings at our Chennai office. Please schedule an appointment in advance so we can ensure the right team members are available to meet with you.",
  },
];

export const ContactFAQ = () => {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Common Questions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about working with us.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 data-[state=open]:bg-primary/5 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <span className="font-semibold pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Still Have Questions */}
          <div className="mt-8 text-center bg-gradient-to-r from-primary/10 via-neon-purple/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <a
              href="mailto:support@consultwithprofessionals.com"
              className="text-primary hover:underline font-medium"
            >
              Email us directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
