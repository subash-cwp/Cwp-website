import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  avatar: string | null;
  rating: number | null;
  content: string;
}

// Fallback data when database is empty
const fallbackTestimonials = [
  {
    id: "1",
    name: "Rajesh Kumar",
    company: "TechStart India",
    role: "CEO",
    avatar: null,
    rating: 5,
    content: "CWP transformed our digital presence completely. Their strategic approach to performance marketing helped us achieve 10x ROAS within 3 months. Highly recommended!"
  },
  {
    id: "2",
    name: "Priya Sharma",
    company: "Fashion Forward",
    role: "Marketing Director",
    avatar: null,
    rating: 5,
    content: "Working with CWP has been a game-changer for our D2C brand. Their comprehensive email marketing setup and automation increased our conversion rate by 35%."
  },
  {
    id: "3",
    name: "Amit Patel",
    company: "GrowthTech Solutions",
    role: "Founder",
    avatar: null,
    rating: 5,
    content: "The team at CWP doesn't just execute - they strategize. Their data-driven approach and creative campaigns helped us scale from 100 to 1000+ qualified leads per month."
  }
];

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      
      if (error || !data || data.length === 0) {
        setTestimonials(fallbackTestimonials);
      } else {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <section className="section-spacing bg-secondary/30 relative overflow-hidden">
        <div className="container-custom flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient-primary relative">
              Clients Say
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10" />
            </span>
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
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="p-8 h-full bg-card border-border/50 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden hover-lift">
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-neon-cyan/0 group-hover:from-primary/5 group-hover:to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform" 
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                            {getInitials(testimonial.name)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold group-hover:text-primary-glow transition-colors">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex hover:bg-primary hover:text-primary-foreground transition-colors" />
            <CarouselNext className="hidden md:flex hover:bg-primary hover:text-primary-foreground transition-colors" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};