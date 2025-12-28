import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes CWP different from other marketing agencies?",
    answer: "We combine strategic thinking with hands' on execution. Unlike agencies that just run campaigns, we become your growth partner - analyzing your market position, identifying bottlenecks, and building data' driven strategies that deliver measurable results. Plus, we specialize in both startups and D2C brands, understanding the unique challenges of scaling."
  },
  {
    question: "How long does it take to see results?",
    answer: "Timeline varies by service: Performance marketing campaigns show initial results in 2' 4 weeks, with optimization reaching peak performance in 2' 3 months. SEO typically takes 3' 6 months for significant organic growth. Email marketing and automation show results within the first month. We provide weekly reports so you can track progress at every stage."
  },
  {
    question: "Do you work with startups or only established businesses?",
    answer: "We specialize in both! We've helped early-stage startups go from 0 to their first 1000 customers, and scaled established D2C brands to 10x revenue. Our strategies are tailored to your current stage - whether you need validation, rapid growth, or market domination."
  },
  {
    question: "What's included in the free strategy call?",
    answer: "Our complimentary 45-minute strategy call includes: comprehensive audit of your current marketing efforts, identification of key growth opportunities, bottleneck analysis, preliminary roadmap for scaling, and honest recommendations on what will work best for your business. No AI fluff, no sales pressure - just actionable insights."
  },
  {
    question: "Can you work with our existing marketing team?",
    answer: "Absolutely! We can either be your full' stack marketing team or seamlessly integrate with your existing resources. We've successfully collaborated with in' house teams, providing strategic direction, specialized expertise, or handling specific channels while your team focuses on others."
  },
  {
    question: "What industries do you specialize in?",
    answer: "Our core expertise spans D2C e' commerce, B2B SaaS, tech startups, consumer goods, and healthcare. However, our strategic frameworks and performance marketing expertise translate across industries. We focus on understanding your specific market dynamics and customer behavior rather than applying cookie' cutter solutions."
  },
  {
    question: "How do you measure success?",
    answer: "We define success based on your business goals - whether that's revenue growth, lead generation, brand awareness, or customer acquisition cost. Every campaign includes clear KPIs, tracking dashboards, and regular reporting. We're obsessed with data and continuously optimize based on what's actually moving the needle for your business."
  },
  {
    question: "What's your pricing structure?",
    answer: "Our pricing is customized based on scope, channels, and your business stage. We offer project' based engagements for specific campaigns, monthly retainers for ongoing growth partnerships, and performance' based models for established businesses. Book a strategy call to discuss what works best for your needs and budget."
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
