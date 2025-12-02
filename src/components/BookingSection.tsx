import { Calendar, Shield, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import narenImage from "@/assets/team-naren.png";

export const BookingSection = () => {
  const benefits = [
    {
      icon: Target,
      text: "On-point solutions (No AI fluff)"
    },
    {
      icon: Shield,
      text: "First Discovery & Free Initial Audit"
    },
    {
      icon: CheckCircle2,
      text: "100% Confidential—side-by-side insights"
    }
  ];

  const handleBooking = () => {
    window.open("https://calendly.com/YOUR-CALENDLY-LINK", "_blank");
  };

  return (
    <section className="section-spacing bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Book This <span className="text-[#F59E0B]">Strategy Call?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Naren's Profile */}
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                <img 
                  src={narenImage} 
                  alt="Naren Ethiraj"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Naren Ethiraj</h3>
              <p className="text-[#F59E0B] font-bold text-lg mb-4">
                FOUNDER & CEO OF CWP
              </p>
              <p className="text-muted-foreground">
                Ex-founder, BBA graduate, and a growth strategist with two years of hardcore marketing experience in SaaS, Consumer Tech, and Growth
              </p>
            </div>
          </Card>

          {/* Right side - Benefits */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Let's Figure Out Roadblocks & Grab Faster
            </h3>
            <p className="text-muted-foreground mb-8">
              Get insights in a 1:1 call to find where your brand is positioned and how to scale it step-by-step
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <benefit.icon className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <p className="text-lg">{benefit.text}</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleBooking}
              size="lg"
              className="w-full md:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold px-8 py-6 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Complimentary Call Now!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
