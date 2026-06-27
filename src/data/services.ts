export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export const servicesData: ServiceItem[] = [
  {
    slug: "strategy-planning",
    icon: "Target",
    title: "Strategy & Planning",
    shortDescription:
      "Build a data-backed marketing strategy that gets your brand exactly where you want to be.",
    description:
      "Make your D2C brand a strategic powerhouse with a growth roadmap built on data, research, and proven frameworks. We turn ambitious goals into measurable, executable plans.",
    features: ["Market Analysis", "Competitor Research", "Growth Roadmap", "KPI Framework"],
    benefits: [
      "Clear go-to-market plan tailored to your stage",
      "Quarterly roadmaps with measurable KPIs",
      "Competitor benchmarking and positioning",
      "Budget allocation aligned to ROI goals",
    ],
    metaTitle: "Marketing Strategy & Planning Services | CWP Marketing",
    metaDescription:
      "Data-driven marketing strategy, competitor research, and growth roadmaps for scaling D2C brands, startups, and enterprises.",
    keywords:
      "marketing strategy, growth strategy, marketing planning, GTM strategy, competitor research",
  },
  {
    slug: "crm-marketing-automation",
    icon: "Megaphone",
    title: "CRM & Marketing Automation",
    shortDescription:
      "Generate more qualified leads with optimized email, SMS, and lifecycle automation.",
    description:
      "Complete email marketing setup, lifecycle automation, and CRM workflows that nurture leads and accelerate conversions across every stage of the funnel.",
    features: ["Email Campaigns", "SMS Marketing", "Automation Flows", "Segmentation"],
    benefits: [
      "Increase repeat purchases and LTV",
      "Recover abandoned carts automatically",
      "Personalized journeys by segment",
      "Integrated CRM + ESP setup",
    ],
    metaTitle: "CRM & Marketing Automation Services | CWP Marketing",
    metaDescription:
      "Email marketing, SMS automation, and CRM workflows that nurture leads and drive repeat revenue.",
    keywords:
      "marketing automation, CRM, email marketing, lifecycle marketing, klaviyo, hubspot",
  },
  {
    slug: "outreach-demand-generation",
    icon: "LineChart",
    title: "Outreach & Demand Generation",
    shortDescription:
      "Multichannel outreach that powers up qualified pipeline and lead generation.",
    description:
      "Targeted cold outreach, LinkedIn automation, and nurture sequences designed to build a steady stream of sales-qualified leads for your business.",
    features: ["Cold Outreach", "LinkedIn Automation", "Lead Nurturing", "Pipeline Building"],
    benefits: [
      "Predictable inbound and outbound pipeline",
      "Personalized multichannel sequences",
      "Sales-ready meetings on your calendar",
      "Higher reply and conversion rates",
    ],
    metaTitle: "B2B Outreach & Demand Generation Services | CWP Marketing",
    metaDescription:
      "Cold outreach, LinkedIn automation, and demand generation to build qualified B2B pipeline.",
    keywords:
      "demand generation, B2B outreach, LinkedIn outreach, lead generation, pipeline marketing",
  },
  {
    slug: "performance-marketing",
    icon: "TrendingUp",
    title: "Performance Marketing",
    shortDescription:
      "Make every ad rupee work harder with full-funnel performance marketing.",
    description:
      "10x your brand with comprehensive paid ad strategies across Meta, Google, and programmatic — optimized for ROAS, CAC, and scalable growth.",
    features: ["Meta Ads", "Google Ads", "Retargeting", "Analytics"],
    benefits: [
      "Lower CAC and improved ROAS",
      "Creative testing frameworks",
      "Full-funnel attribution",
      "Weekly optimization and reporting",
    ],
    metaTitle: "Performance Marketing Agency | Meta & Google Ads | CWP",
    metaDescription:
      "Performance marketing services for Meta Ads, Google Ads, retargeting, and analytics. Scale with measurable ROAS.",
    keywords:
      "performance marketing, paid ads, meta ads, google ads, ppc agency, ROAS",
  },
  {
    slug: "seo-organic-growth",
    icon: "Users",
    title: "SEO & Organic Growth",
    shortDescription:
      "Dominate Google search with technical SEO and a content strategy that ranks.",
    description:
      "Technical SEO, on-page optimization, link building, and content strategy that drive sustainable, compounding organic traffic and qualified leads.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
    benefits: [
      "Higher rankings for high-intent keywords",
      "Site-wide technical fixes",
      "Authority-building backlinks",
      "Local SEO for Google Business Profile",
    ],
    metaTitle: "SEO Services & Organic Growth Agency | CWP Marketing",
    metaDescription:
      "Technical SEO, content strategy, link building, and local SEO services to grow organic traffic and rankings.",
    keywords:
      "SEO services, organic growth, technical SEO, link building, local SEO, content strategy",
  },
  {
    slug: "creative-branding",
    icon: "Palette",
    title: "Creative & Full Branding",
    shortDescription:
      "Stand out with a full-spectrum brand identity, design system, and UX.",
    description:
      "Brand identity, logo design, website design, and UI/UX that transform your online presence into a growth-centric business and create lasting brand equity.",
    features: ["Brand Identity", "Logo Design", "Website Design", "UI/UX"],
    benefits: [
      "Cohesive brand identity across channels",
      "Conversion-focused web design",
      "Design systems built to scale",
      "UX that turns visitors into customers",
    ],
    metaTitle: "Branding & Creative Design Agency | CWP Marketing",
    metaDescription:
      "Brand identity, logo design, website design, and UI/UX services to build a memorable, conversion-focused brand.",
    keywords:
      "branding agency, brand identity, logo design, website design, UI UX agency",
  },
  {
    slug: "content-marketing",
    icon: "FileText",
    title: "Content Marketing & Thought Leadership",
    shortDescription:
      "Establish authority with strategic content and thought leadership programs.",
    description:
      "Blogs, whitepapers, case studies, and newsletters that build authority, drive organic growth, and position your founders as category leaders.",
    features: ["Blog Writing", "Whitepapers", "Case Studies", "Newsletters"],
    benefits: [
      "Authority content that earns backlinks",
      "Founder-led thought leadership",
      "Conversion-ready case studies",
      "Editorial calendars aligned to SEO",
    ],
    metaTitle: "Content Marketing & Thought Leadership Services | CWP",
    metaDescription:
      "Strategic content marketing, blog writing, whitepapers, and thought leadership to build authority and drive organic growth.",
    keywords:
      "content marketing, thought leadership, blog writing, whitepapers, case studies, newsletter",
  },
  {
    slug: "social-media-management",
    icon: "Share2",
    title: "Social Media Management",
    shortDescription:
      "Build a strong social presence that engages and converts.",
    description:
      "Monthly content calendars, community management, influencer partnerships, and analytics to build a social presence that drives engagement and revenue.",
    features: ["Content Calendar", "Community Management", "Influencer Marketing", "Analytics"],
    benefits: [
      "Consistent, on-brand content",
      "Active community engagement",
      "Influencer collaborations that convert",
      "Performance-led reporting",
    ],
    metaTitle: "Social Media Management Services | CWP Marketing",
    metaDescription:
      "Social media management, content calendars, community management, and influencer marketing for growing brands.",
    keywords:
      "social media management, social media agency, instagram marketing, influencer marketing",
  },
];

export const getServiceBySlug = (slug: string) =>
  servicesData.find((s) => s.slug === slug);
