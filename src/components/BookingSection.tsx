import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar } from "lucide-react";

export const BookingSection = () => {
  const benefits = [
    "On-point solutions (No AI fluff)",
    "First Discovery & Free Initial Audit",
    "100% Confidential—side-by-side insights"
  ];

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Book This <span className="text-primary">Strategy Call?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-muted to-secondary rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-end justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Naren Ethiraj</h3>
                    <p className="text-primary font-semibold mb-1">FOUNDER & CEO OF CWP</p>
                    <p className="text-sm text-muted-foreground">
                      Ex-founder, BBA graduate, and a growth strategist with two years of hardcore marketing experience in SaaS, Consumer Tech, and Growth
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Let&apos;s Figure Out Roadblocks & Grab Faster
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get insights in a 1:1 call to find where your brand is positioned and how to scale it step-by-step
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full md:w-auto gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Complimentary Call Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
