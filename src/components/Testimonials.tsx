import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechStart India",
    role: "CEO",
    image: "RK",
    rating: 5,
    text: "CWP transformed our digital presence completely. Their strategic approach to performance marketing helped us achieve 10x ROAS within 3 months. Highly recommended!"
  },
  {
    name: "Priya Sharma",
    company: "Fashion Forward",
    role: "Marketing Director",
    image: "PS",
    rating: 5,
    text: "Working with CWP has been a game-changer for our D2C brand. Their comprehensive email marketing setup and automation increased our conversion rate by 35%."
  },
  {
    name: "Amit Patel",
    company: "GrowthTech Solutions",
    role: "Founder",
    image: "AP",
    rating: 5,
    text: "The team at CWP doesn't just execute - they strategize. Their data-driven approach and creative campaigns helped us scale from 100 to 1000+ qualified leads per month."
  },
  {
    name: "Sarah Johnson",
    company: "EcoLife Products",
    role: "CMO",
    image: "SJ",
    rating: 5,
    text: "CWP's SEO expertise positioned our brand on page 1 of Google for all our target keywords. Their content strategy delivered sustainable organic growth month after month."
  },
  {
    name: "Vikram Singh",
    company: "FinServe Pro",
    role: "Co-Founder",
    image: "VS",
    rating: 5,
    text: "From branding to performance marketing, CWP handled everything professionally. Their strategic insights and execution excellence made them an invaluable growth partner."
  }
];

export const Testimonials = () => {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the brands we've helped grow and scale.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="p-8 h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-300">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
