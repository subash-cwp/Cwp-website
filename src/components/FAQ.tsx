import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "What makes CWP different from other marketing agencies?",
    answer: "Most agencies stop at generating leads. We own the full revenue journey — demand generation and performance marketing to create qualified opportunities, plus sales development, qualification, follow-ups, pipeline management and closing support to convert them. One team, accountable for pipeline and closed deals, not just clicks."
  },
  {
    question: "How quickly can we get started, and when do we see results?",
    answer: "Onboarding takes 3–5 business days and most campaigns and outreach sequences go live in week 2. Paid campaigns and outreach typically show qualified leads within 2–4 weeks, sales pipeline improvements within 30–60 days, and SEO compounds over 3–6 months. You get weekly reporting throughout."
  },
  {
    question: "Can you support sales, not just marketing?",
    answer: "Yes. We can handle prospecting, LinkedIn and email outreach, lead qualification, appointment setting, sales follow-ups, pipeline management and closing support — working as an extension of your sales team or as the team itself."
  },
  {
    question: "Who do you work with?",
    answer: "Startups, SaaS and technology companies, B2B businesses, professional services, real estate, healthcare and growing MSMEs. If you need more qualified leads and better conversion to closed deals, we can help."
  },
  {
    question: "What's included in the free 30-minute audit call?",
    answer: "A review of your current marketing and sales motion, where qualified leads are leaking, gaps in follow-up and pipeline management, and a preliminary plan for lifting lead-to-customer conversion. No fluff, no pressure — just actionable insights."
  },
  {
    question: "Can you work with our existing marketing or sales team?",
    answer: "Absolutely. We plug into your team — taking over specific channels, owning outreach and follow-ups, or providing strategic direction — while your team focuses on the rest."
  },
  {
    question: "How do you measure success?",
    answer: "By qualified leads, pipeline created, lead-to-customer conversion rate, cost per qualified lead and revenue closed. Every engagement has clear KPIs, live dashboards and regular reporting."
  },
  {
    question: "What's your minimum engagement and pricing?",
    answer: "We start with a 90-day growth sprint and then continue month-to-month. Pricing depends on scope, channels and whether you need marketing, sales support, or both. Book the free audit call and we'll scope it with you."
  }
];

export const FAQ = () => {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground">
              Got questions? We've got answers. Here's everything you need to know about working with CWP.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
