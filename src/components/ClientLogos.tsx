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
import yourspaceLogo from "@/assets/logos/yourspace.png";
import ooruLogo from "@/assets/logos/ooru.png";
import cryptoknowledgeLogo from "@/assets/logos/cryptoknowledge.png";
import beverlysLogo from "@/assets/logos/beverlys.jpg";
import augiesLogo from "@/assets/logos/augies.jpg";
import navfabLogo from "@/assets/logos/navfab.svg";

export const row1Logos = [
  { src: zeoniusLogo, alt: "Zeonius IT Services logo" },
  { src: aadicuraLogo, alt: "Aadicura logo" },
  { src: godeskLogo, alt: "Godesk logo" },
  { src: cognisLogo, alt: "Cognis logo", dark: true },
  { src: bdsoftLogo, alt: "BD Software logo" },
  { src: leadratLogo, alt: "Leadrat logo", dark: true },
  { src: healthassLogo, alt: "Healthass logo", dark: true },
  { src: infodotLogo, alt: "Infodot Technologies logo" },
  { src: yoloLogo, alt: "Yolo logo" },
  { src: icrederityLogo, alt: "iCrederity logo" },
  { src: yourspaceLogo, alt: "Your Space logo" },
  { src: ooruLogo, alt: "Ooru logo" },
];

export const row2Logos = [
  { src: ustigersLogo, alt: "US Tigers logo" },
  { src: ifutureLogo, alt: "iFuture logo" },
  { src: iqonicLogo, alt: "IQONIC Design logo" },
  { src: amanstraLogo, alt: "Amanstra Consulting logo" },
  { src: groupLogo, alt: "Group logo", dark: true },
  { src: rocketnewsLogo, alt: "Rocket News logo" },
  { src: reinventLogo, alt: "Reinvent logo" },
  { src: worcoorLogo, alt: "WorCoor logo" },
  { src: privueLogo, alt: "Privue logo" },
  { src: settlrsLogo, alt: "Settlrs logo" },
  { src: cryptoknowledgeLogo, alt: "CryptoKnowledge logo" },
  { src: beverlysLogo, alt: "Beverly's logo" },
];

export const row3Logos = [
  { src: kingswayLogo, alt: "Kingsway logo" },
  { src: swiftcheckLogo, alt: "Swift Check AI logo" },
  { src: eaglyticsLogo, alt: "Eaglytics Co logo" },
  { src: web3tixLogo, alt: "Web3Tix logo" },
  { src: xorecLogo, alt: "Xorec logo" },
  { src: leonstrideLogo, alt: "Leonstride Technologies logo" },
  { src: wellversedLogo, alt: "Wellversed logo", dark: true },
  { src: bokaapLogo, alt: "Bokaap logo" },
  { src: revassureLogo, alt: "ReAssure logo" },
  { src: qblueLogo, alt: "QBlue logo", dark: true },
  { src: augiesLogo, alt: "Augies Building Services logo" },
  { src: navfabLogo, alt: "Nav Fab logo" },
];


export const ClientLogos = () => {
  // Mark logos that are white/light-on-transparent with `dark: true` to render on a dark card
  const cardClass = (dark?: boolean) =>
    `flex-shrink-0 flex items-center justify-center h-14 md:h-16 px-4 md:px-5 py-2.5 md:py-3 rounded-xl shadow-sm border ${
      dark
        ? "bg-slate-900 border-slate-800"
        : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
    }`;

  const edgeMask =
    "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";

  const renderRow = (logos: typeof row1Logos, direction: "rtl" | "ltr", key: string, rowLabel: string) => (
    <div
      className={`relative overflow-hidden py-4 md:py-6 group/marquee ${edgeMask}`}
      role="group"
      aria-label={rowLabel}
    >
      <ul
        className={`flex w-max gap-6 sm:gap-10 md:gap-16 items-center list-none m-0 p-0 ${
          direction === "rtl" ? "animate-scroll-rtl" : "animate-scroll-ltr"
        }`}
      >
        {[...logos, ...logos].map((logo, index) => {
          const isClone = index >= logos.length;
          return (
            <li
              key={`${key}-${index}`}
              className={cardClass(logo.dark)}
              aria-hidden={isClone || undefined}
            >
              <img
                src={logo.src}
                alt={isClone ? "" : logo.alt}
                aria-label={isClone ? undefined : logo.alt}
                role="img"
                loading="lazy"
                decoding="async"
                className="h-8 md:h-10 lg:h-12 w-auto max-w-[110px] md:max-w-[140px] object-contain"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden"
      aria-labelledby="client-logos-heading"
    >
      <div className="mb-10 md:mb-12 text-center px-4">
        <h3 id="client-logos-heading" className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Trusted by 100+ Brands
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Leading companies trust us with their growth</p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {renderRow(row1Logos, "rtl", "r1", "Client logos, row 1")}
        {renderRow(row2Logos, "ltr", "r2", "Client logos, row 2")}
        {renderRow(row3Logos, "rtl", "r3", "Client logos, row 3")}
      </div>
    </section>
  );
};


