import { Calendar, Linkedin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import narenImage from "@/assets/team-naren.png";

export const BookingSection = () => {
  const handleBooking = () => {
    window.open("https://calendly.com/YOUR-CALENDLY-LINK", "_blank");
  };

  return (
    <section className="py-20 bg-[#1a1a1a] text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[450px_1fr_1fr] gap-12 items-center">
          {/* Left - Naren's Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img 
                src={narenImage} 
                alt="Naren Ethiraj"
                className="w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>

          {/* Middle - Profile Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl font-bold">Naren Ethiraj</h3>
                <a 
                  href="https://linkedin.com/in/YOUR-LINKEDIN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#0077B5] rounded flex items-center justify-center hover:bg-[#006399] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-400 text-lg mb-6">FOUNDER & CEO OF CWP</p>
              
              <div className="border-l-4 border-[#F59E0B] pl-4 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <span className="text-[#F59E0B] text-2xl">"</span>
                  Backed 100+ founders across 15+ industries, shaping strategy, amplifying marketing, and scaling sales through high-performance growth systems.
                  <span className="text-[#F59E0B] text-2xl">"</span>
                </p>
              </div>
            </div>

            <Button 
              onClick={handleBooking}
              size="lg"
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold px-12 py-6 text-lg rounded-lg"
            >
              Book Now
            </Button>
          </div>

          {/* Right - Benefits Accordion */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Book This Strategy Call?
            </h2>

            <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="bg-[#F59E0B] text-black hover:bg-[#D97706] px-6 py-4 rounded-lg font-bold text-left hover:no-underline [&[data-state=open]]:rounded-b-none">
                  Drive More Sales & Boost Revenue
                </AccordionTrigger>
                <AccordionContent className="bg-white text-black px-6 py-4 rounded-b-lg">
                  Get expert guidance to define your market, optimize positioning, and implement actionable steps that generate measurable revenue growth.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="bg-[#F59E0B] text-black hover:bg-[#D97706] px-6 py-4 rounded-lg font-bold text-left hover:no-underline [&[data-state=open]]:rounded-b-none">
                  Maximize Your Pipeline & Close Deals Faster
                </AccordionTrigger>
                <AccordionContent className="bg-white text-black px-6 py-4 rounded-b-lg">
                  Learn proven strategies to fill your pipeline with qualified leads and accelerate your sales cycle to close more deals in less time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="bg-[#F59E0B] text-black hover:bg-[#D97706] px-6 py-4 rounded-lg font-bold text-left hover:no-underline [&[data-state=open]]:rounded-b-none">
                  Free Discovery & GTM Report
                </AccordionTrigger>
                <AccordionContent className="bg-white text-black px-6 py-4 rounded-b-lg">
                  Receive a comprehensive go-to-market analysis with actionable insights tailored to your business, absolutely free with your strategy call.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none">
                <AccordionTrigger className="bg-[#F59E0B] text-black hover:bg-[#D97706] px-6 py-4 rounded-lg font-bold text-left hover:no-underline [&[data-state=open]]:rounded-b-none">
                  Scale Confidently with Expert Insights
                </AccordionTrigger>
                <AccordionContent className="bg-white text-black px-6 py-4 rounded-b-lg">
                  Gain clarity on your growth path with battle-tested strategies and expert insights from someone who's scaled 100+ businesses across industries.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
