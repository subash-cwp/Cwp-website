import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { InteractiveParticles } from "@/components/InteractiveParticles";
import logo from "@/assets/logo.png";

const steps = [
  "We review your enquiry and pull together a quick baseline audit.",
  "A strategist emails you to schedule a 30-min discovery call.",
  "On the call, you'll get 3 specific growth opportunities — free.",
];

const ThankYou = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <>
      <SEOHead
        title="Thank You — CWP Marketing"
        description="Thanks for reaching out. A senior strategist will be in touch within 24 hours."
        canonicalUrl="https://consultwithprofessionals.com/thank-you"
      />

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <InteractiveParticles />

        <div className="relative z-10">
          <header className="border-b border-border/50 bg-background/70 backdrop-blur-lg sticky top-0 z-40">
            <div className="container-custom flex items-center justify-between h-16">
              <Link to="/" className="flex items-center group">
                <img src={logo} alt="CWP" className="w-9 h-9 rounded-[5%] group-hover:scale-110 transition-transform" />
              </Link>
              <a href="tel:+918610986622" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" /> <span className="hidden sm:inline">+91 86109 86622</span>
              </a>
            </div>
          </header>

          <section className="relative py-16 md:py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container-custom relative z-10 max-w-2xl">
              <div className="relative animate-scale-in">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-neon-cyan/20 to-neon-purple/30 rounded-2xl blur-xl opacity-60" />
                <div className="relative bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl p-8 md:p-12 shadow-2xl text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-primary/30 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">Enquiry received</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-3">You're in. 🎉</h1>
                  <p className="text-muted-foreground mb-8">
                    Thanks for reaching out. A senior strategist will be in touch within{" "}
                    <span className="text-foreground font-semibold">24 hours</span>.
                  </p>

                  <div className="text-left bg-secondary/40 border border-border/60 rounded-xl p-5 md:p-6 mb-8">
                    <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-4">What happens next</p>
                    <ol className="space-y-3 text-sm">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-foreground/90 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button asChild size="lg" className="flex-1 gap-2 hover-lift">
                      <a href="tel:+918610986622"><Phone className="h-4 w-4" /> Call us now</a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="flex-1 gap-2">
                      <a href="https://wa.me/918610986622" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                    <Link to="/case-studies" className="text-primary hover:underline inline-flex items-center gap-1">
                      Browse case studies <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <span className="hidden sm:inline text-muted-foreground">·</span>
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
