import aadicuraLogo from "@/assets/logos/aadicura.png";
import zeoniusLogo from "@/assets/logos/zeonius.png";
import cognisLogo from "@/assets/logos/cognis.png";
import bdsoftLogo from "@/assets/logos/bdsoft.png";
import iqonicLogo from "@/assets/logos/iqonic.png";
import godeskLogo from "@/assets/logos/godesk.svg";
import amanstraLogo from "@/assets/logos/amanstra.png";
import leadratLogo from "@/assets/logos/leadrat.png";
import healthassLogo from "@/assets/logos/healthass.png";
import groupLogo from "@/assets/logos/group.png";
import rocketnewsLogo from "@/assets/logos/rocketnews.png";
import reinventLogo from "@/assets/logos/reinvent.png";
import eaglyticsLogo from "@/assets/logos/eaglytics.png";
import web3tixLogo from "@/assets/logos/web3tix.png";
import ustigersLogo from "@/assets/logos/ustigers.png";
import ifutureLogo from "@/assets/logos/ifuture.png";
import kingswayLogo from "@/assets/logos/kingsway.png";
import swiftcheckLogo from "@/assets/logos/swiftcheck.png";
import xorecLogo from "@/assets/logos/xorec.png";
import leonstrideLogo from "@/assets/logos/leonstride.png";
import wellversedLogo from "@/assets/logos/wellversed.png";

export const ClientLogos = () => {
  const row1Logos = [
    { src: zeoniusLogo, alt: "Zeonius IT Services" },
    { src: aadicuraLogo, alt: "Aadicura" },
    { src: godeskLogo, alt: "Godesk" },
    { src: cognisLogo, alt: "Cognis" },
    { src: bdsoftLogo, alt: "BD Software" },
    { src: leadratLogo, alt: "Leadrat" },
    { src: healthassLogo, alt: "Healthass" },
  ];
  
  const row2Logos = [
    { src: ustigersLogo, alt: "US Tigers" },
    { src: ifutureLogo, alt: "iFuture" },
    { src: iqonicLogo, alt: "IQONIC Design" },
    { src: amanstraLogo, alt: "Amanstra Consulting" },
    { src: groupLogo, alt: "Group" },
    { src: rocketnewsLogo, alt: "Rocket News" },
    { src: reinventLogo, alt: "Reinvent" },
  ];
  
  const row3Logos = [
    { src: kingswayLogo, alt: "Kingsway" },
    { src: swiftcheckLogo, alt: "Swift Check AI" },
    { src: eaglyticsLogo, alt: "Eaglytics Co" },
    { src: web3tixLogo, alt: "Web3Tix" },
    { src: xorecLogo, alt: "Xorec" },
    { src: leonstrideLogo, alt: "Leonstride Technologies" },
    { src: wellversedLogo, alt: "Wellversed" },
  ];

  return (
    <section className="section-spacing bg-background/50 overflow-hidden">
      <div className="mb-12 text-center">
        <h3 className="text-2xl font-semibold text-muted-foreground">
          Trusted by 20+ Brands
        </h3>
      </div>
      
      {/* Row 1 - Right to Left */}
      <div className="relative mb-6 overflow-hidden bg-background/30 py-8">
        <div className="flex gap-16 animate-scroll-rtl items-center">
          {[...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-12"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                loading="lazy"
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Left to Right */}
      <div className="relative mb-6 overflow-hidden bg-muted/20 py-8">
        <div className="flex gap-16 animate-scroll-ltr items-center">
          {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-12"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                loading="lazy"
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Right to Left */}
      <div className="relative overflow-hidden bg-background/30 py-8">
        <div className="flex gap-16 animate-scroll-rtl items-center">
          {[...row3Logos, ...row3Logos, ...row3Logos, ...row3Logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-12"
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                loading="lazy"
                className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
