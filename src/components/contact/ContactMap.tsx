import { MapPin, ExternalLink, Navigation, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const OFFICE_NAME = "CWP | Consult With Professionals";
const OFFICE_CATEGORY = "Internet marketing service";
const OFFICE_RATING = "5.0";
const OFFICE_REVIEW_COUNT = "18";
const OFFICE_HOURS = "Open · Closes 7pm";
const OFFICE_ADDRESS =
  "SIDCO Electronics Complex, Guindy Industrial Estate, Chennai, Tamil Nadu 600032";
const OFFICE_MAP_LINK = "https://share.google/yfBOoMM75sG3ZdjKv";
const OFFICE_DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  OFFICE_ADDRESS
)}`;
const OFFICE_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  `${OFFICE_NAME}, Guindy, Chennai`
)}&output=embed`;

export const ContactMap = () => {
  return (
    <section className="section-spacing bg-card/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Our <span className="text-gradient-primary">Office</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to meet you in person. Come visit us at our office in Guindy, Chennai.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-border/50 bg-card min-h-[400px]">
            <iframe
              src={OFFICE_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CWP Marketing Office Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />

            {/* Overlay with Business Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold mb-1">{OFFICE_NAME}</p>
                  <p className="text-sm text-muted-foreground break-words">
                    {OFFICE_CATEGORY}
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="text-primary font-medium">{OFFICE_RATING}</span>
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-muted-foreground">({OFFICE_REVIEW_COUNT})</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{OFFICE_HOURS}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Button className="w-full gap-2" asChild>
                  <a href={OFFICE_DIRECTIONS_LINK} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </Button>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={OFFICE_MAP_LINK} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Open in Maps
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Landmarks</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  SIDCO Electronics Complex
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Kalaignar Centenary Super Speciality Hospital (KCSSH)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Guindy Industrial Estate Park
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">Parking Available</h3>
              <p className="text-sm text-muted-foreground">
                Free parking available for visitors. Please call ahead if you're visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
