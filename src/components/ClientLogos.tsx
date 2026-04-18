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
import infodotLogo from "@/assets/logos/infodot.webp";
import yoloLogo from "@/assets/logos/yolo.png";
import icrederityLogo from "@/assets/logos/icrederity.webp";
import worcoorLogo from "@/assets/logos/worcoor.png";
import privueLogo from "@/assets/logos/privue.webp";
import settlrsLogo from "@/assets/logos/settlrs.png";
import bokaapLogo from "@/assets/logos/bokaap.svg";
import revassureLogo from "@/assets/logos/revassure.png";
import qblueLogo from "@/assets/logos/qblue.webp";

export const ClientLogos = () => {
  // Mark logos that are white/light-on-transparent with `dark: true` to render on a dark card
  const row1Logos = [
    { src: zeoniusLogo, alt: "Zeonius IT Services" },
    { src: aadicuraLogo, alt: "Aadicura" },
    { src: godeskLogo, alt: "Godesk" },
    { src: cognisLogo, alt: "Cognis" },
    { src: bdsoftLogo, alt: "BD Software" },
    { src: leadratLogo, alt: "Leadrat" },
    { src: healthassLogo, alt: "Healthass", dark: true },
    { src: infodotLogo, alt: "Infodot Technologies" },
    { src: yoloLogo, alt: "Yolo" },
    { src: icrederityLogo, alt: "iCrederity" },
  ];
  
  const row2Logos = [
    { src: ustigersLogo, alt: "US Tigers" },
    { src: ifutureLogo, alt: "iFuture" },
    { src: iqonicLogo, alt: "IQONIC Design" },
    { src: amanstraLogo, alt: "Amanstra Consulting" },
    { src: groupLogo, alt: "Group", dark: true },
    { src: rocketnewsLogo, alt: "Rocket News" },
    { src: reinventLogo, alt: "Reinvent" },
    { src: worcoorLogo, alt: "WorCoor" },
    { src: privueLogo, alt: "Privue" },
    { src: settlrsLogo, alt: "Settlrs" },
  ];
  
  const row3Logos = [
    { src: kingswayLogo, alt: "Kingsway" },
    { src: swiftcheckLogo, alt: "Swift Check AI" },
    { src: eaglyticsLogo, alt: "Eaglytics Co" },
    { src: web3tixLogo, alt: "Web3Tix" },
    { src: xorecLogo, alt: "Xorec" },
    { src: leonstrideLogo, alt: "Leonstride Technologies" },
    { src: wellversedLogo, alt: "Wellversed", dark: true },
    { src: bokaapLogo, alt: "Bokaap" },
    { src: revassureLogo, alt: "ReAssure" },
    { src: qblueLogo, alt: "QBlue" },
  ];

  const cardClass = (dark?: boolean) =>
    `flex-shrink-0 flex items-center justify-center h-16 px-4 py-3 rounded-xl shadow-sm border ${
      dark
        ? "bg-slate-900 border-slate-800"
        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
    }`;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="mb-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Trusted by 100+ Brands
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Leading companies trust us with their growth</p>
      </div>
      
      {/* Row 1 - Right to Left */}
      <div className="relative mb-4 overflow-hidden py-6">
        <div className="flex gap-12 md:gap-20 animate-scroll-rtl items-center">
          {[...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos].map((logo, index) => (
            <div key={index} className={cardClass(logo.dark)}>
              <img 
                src={logo.src} 
                alt={logo.alt} 
                loading="lazy"
                className="h-10 md:h-12 w-auto max-w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Left to Right */}
      <div className="relative mb-4 overflow-hidden py-6">
        <div className="flex gap-12 md:gap-20 animate-scroll-ltr items-center">
          {[...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos].map((logo, index) => (
            <div key={index} className={cardClass(logo.dark)}>
              <img 
                src={logo.src} 
                alt={logo.alt}
                loading="lazy"
                className="h-10 md:h-12 w-auto max-w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Right to Left */}
      <div className="relative overflow-hidden py-6">
        <div className="flex gap-12 md:gap-20 animate-scroll-rtl items-center">
          {[...row3Logos, ...row3Logos, ...row3Logos, ...row3Logos].map((logo, index) => (
            <div key={index} className={cardClass(logo.dark)}>
              <img 
                src={logo.src} 
                alt={logo.alt}
                loading="lazy"
                className="h-10 md:h-12 w-auto max-w-[140px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
