export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceOutcome {
  metric: string;
  label: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailContent {
  intro: string;
  whoItsFor: string[];
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  outcomes: ServiceOutcome[];
  tools: string[];
  faqs: ServiceFaq[];
}

export const serviceDetails: Record<string, ServiceDetailContent> = {
  "strategy-planning": {
    intro:
      "Most brands do not have a traffic problem, they have a clarity problem. Our strategy engagements start with the numbers you already have, uncover where growth is leaking, and end with a quarter-by-quarter plan your team can actually execute.",
    whoItsFor: [
      "D2C brands stuck at a revenue plateau despite rising ad spend",
      "Founders planning a new category, market, or product launch",
      "Marketing teams without a documented growth roadmap or KPI model",
      "Businesses spending across channels with no single source of truth",
    ],
    deliverables: [
      {
        title: "Growth audit report",
        description:
          "A full review of channels, funnel stages, creative, and analytics with prioritized gaps ranked by revenue impact.",
      },
      {
        title: "Market and competitor map",
        description:
          "Positioning analysis of your top competitors: messaging, offers, channel mix, keyword footprint, and pricing signals.",
      },
      {
        title: "12-month growth roadmap",
        description:
          "Quarterly initiatives, owners, dependencies, and expected outcomes, broken into monthly sprints.",
      },
      {
        title: "KPI and budget model",
        description:
          "A working spreadsheet linking spend to CAC, ROAS, LTV, and payback so every rupee has a target attached.",
      },
    ],
    process: [
      {
        title: "Discovery and data access",
        description:
          "Stakeholder interviews plus read-only access to ad accounts, analytics, CRM, and revenue reporting.",
      },
      {
        title: "Audit and benchmarking",
        description:
          "We quantify current performance, compare it to category benchmarks, and isolate the biggest constraints.",
      },
      {
        title: "Strategy workshop",
        description:
          "A working session with your team to pressure-test positioning, offers, channel priorities, and targets.",
      },
      {
        title: "Roadmap handover",
        description:
          "Documented plan, KPI model, and 30/60/90-day execution checklist, with an optional retained review cadence.",
      },
    ],
    outcomes: [
      { metric: "1 plan", label: "Single source of truth for growth" },
      { metric: "90 days", label: "Clear execution checklist" },
      { metric: "100%", label: "Initiatives tied to measurable KPIs" },
    ],
    tools: ["GA4", "Looker Studio", "Semrush", "Meta Ads Manager", "HubSpot", "Notion"],
    faqs: [
      {
        question: "How long does a strategy engagement take?",
        answer:
          "A focused audit and roadmap typically takes three to four weeks, depending on data access and the number of channels in play.",
      },
      {
        question: "Do you also execute the strategy?",
        answer:
          "Yes. Most clients move into a retained execution engagement across performance, SEO, or lifecycle marketing once the roadmap is approved.",
      },
      {
        question: "What if we have very little historical data?",
        answer:
          "We build a test-and-learn plan instead, with structured experiments designed to generate reliable data within the first 60 days.",
      },
    ],
  },

  "crm-marketing-automation": {
    intro:
      "Paid traffic gets the first order. Lifecycle marketing pays for the business. We build the email, SMS, and CRM infrastructure that turns one-time buyers and cold leads into predictable, compounding revenue.",
    whoItsFor: [
      "Brands where email and SMS contribute less than 20% of revenue",
      "Teams with a CRM that nobody trusts or updates",
      "Businesses sending campaigns manually with no automation flows",
      "B2B companies with leads going cold between enquiry and sale",
    ],
    deliverables: [
      {
        title: "Lifecycle audit and deliverability check",
        description:
          "Review of your existing flows, list health, sending domain, authentication, and inbox placement.",
      },
      {
        title: "Core automation flows",
        description:
          "Welcome, abandoned cart, browse abandonment, post-purchase, win-back, and lead-nurture sequences built and tested.",
      },
      {
        title: "Segmentation architecture",
        description:
          "Behaviour and value-based segments, suppression rules, and re-engagement logic mapped to your data model.",
      },
      {
        title: "Campaign calendar and templates",
        description:
          "Branded, responsive templates plus a monthly campaign calendar with copy, offers, and A/B tests planned.",
      },
    ],
    process: [
      {
        title: "Audit and data mapping",
        description:
          "We map every customer touchpoint and event so the automation triggers off clean, reliable data.",
      },
      {
        title: "Foundation build",
        description:
          "Domain authentication, template system, segments, and suppression rules configured correctly from day one.",
      },
      {
        title: "Flow launch",
        description:
          "Priority automations go live in order of revenue impact, each with its own success metric.",
      },
      {
        title: "Optimize and scale",
        description:
          "Monthly A/B testing on subject lines, offers, timing, and creative, with reporting on revenue per recipient.",
      },
    ],
    outcomes: [
      { metric: "20-35%", label: "Typical revenue share from lifecycle" },
      { metric: "6+", label: "Core automations live" },
      { metric: "24/7", label: "Nurturing without manual effort" },
    ],
    tools: ["Klaviyo", "HubSpot", "Mailchimp", "Zoho CRM", "Twilio", "Zapier"],
    faqs: [
      {
        question: "Which platform do you recommend?",
        answer:
          "Klaviyo for D2C and ecommerce, HubSpot or Zoho for B2B pipelines. We work with your existing stack wherever possible.",
      },
      {
        question: "How quickly do flows start generating revenue?",
        answer:
          "Cart and welcome flows usually show measurable revenue within the first two to three weeks of going live.",
      },
      {
        question: "Can you fix poor deliverability?",
        answer:
          "Yes. We handle SPF, DKIM, and DMARC setup, list cleaning, and a warm-up schedule to rebuild sender reputation.",
      },
    ],
  },

  "outreach-demand-generation": {
    intro:
      "Waiting for inbound is not a pipeline strategy. We build multichannel outbound systems that put qualified conversations on your calendar every week, without burning your domain or your brand.",
    whoItsFor: [
      "B2B teams with long sales cycles and inconsistent pipeline",
      "Agencies and SaaS companies targeting a defined ICP list",
      "Founders doing outreach manually with no repeatable system",
      "Sales teams that need meetings, not just contact lists",
    ],
    deliverables: [
      {
        title: "ICP and list building",
        description:
          "Defined ideal customer profile with verified, enriched prospect lists segmented by persona and trigger.",
      },
      {
        title: "Multichannel sequences",
        description:
          "Cold email, LinkedIn, and follow-up cadences with personalized angles per segment.",
      },
      {
        title: "Domain and inbox infrastructure",
        description:
          "Secondary domains, authentication, warm-up, and sending limits configured to protect deliverability.",
      },
      {
        title: "Pipeline reporting",
        description:
          "Weekly reporting on sends, reply rate, positive replies, meetings booked, and cost per meeting.",
      },
    ],
    process: [
      {
        title: "ICP definition",
        description:
          "We pin down who converts best today and build the targeting criteria and trigger events around them.",
      },
      {
        title: "Infrastructure setup",
        description:
          "Domains, mailboxes, warm-up, and CRM integration so replies land in one tracked place.",
      },
      {
        title: "Sequence testing",
        description:
          "Multiple angles tested in small batches to find the messaging that earns replies before scaling volume.",
      },
      {
        title: "Scale and hand off",
        description:
          "Winning sequences scaled, with qualified replies routed directly to your sales team.",
      },
    ],
    outcomes: [
      { metric: "Weekly", label: "Qualified meetings booked" },
      { metric: "3-5x", label: "Touchpoints per prospect" },
      { metric: "Tracked", label: "Cost per booked meeting" },
    ],
    tools: ["Apollo", "Instantly", "Lemlist", "Sales Navigator", "Clay", "HubSpot"],
    faqs: [
      {
        question: "Is cold outreach compliant?",
        answer:
          "We follow opt-out requirements, sending limits, and regional regulations, and we never use scraped consumer data.",
      },
      {
        question: "Will this damage our main domain?",
        answer:
          "No. Outbound runs on separate, warmed sending domains so your primary business domain stays protected.",
      },
      {
        question: "How soon do meetings start?",
        answer:
          "Infrastructure and warm-up take two to three weeks, with first replies and meetings typically in weeks three to five.",
      },
    ],
  },

  "performance-marketing": {
    intro:
      "Performance marketing is not a media-buying exercise, it is a creative and measurement discipline. We build full-funnel paid programs where every campaign has a job, every creative has a hypothesis, and every rupee is accountable to CAC and ROAS.",
    whoItsFor: [
      "D2C brands scaling past their first plateau on Meta or Google",
      "Businesses with rising CAC and falling return on ad spend",
      "Teams running ads with no creative testing framework",
      "Advertisers who cannot trust their conversion tracking",
    ],
    deliverables: [
      {
        title: "Account and tracking audit",
        description:
          "Structure, bidding, audiences, exclusions, and a full conversion-tracking validation across pixel, GA4, and CRM.",
      },
      {
        title: "Full-funnel campaign build",
        description:
          "Prospecting, retargeting, and retention campaigns structured by intent with clean budget separation.",
      },
      {
        title: "Creative testing engine",
        description:
          "Monthly batches of ad concepts, hooks, and formats tested systematically, with winners scaled and losers retired.",
      },
      {
        title: "Landing page and CRO input",
        description:
          "Offer, message-match, and page-speed recommendations, plus dedicated landing pages where they lift conversion.",
      },
      {
        title: "Weekly performance reporting",
        description:
          "A live dashboard covering spend, CAC, ROAS, blended efficiency, and next week's test plan.",
      },
    ],
    process: [
      {
        title: "Audit and tracking fix",
        description:
          "Before spend changes, we make sure the data is trustworthy: events, values, attribution windows, and offline conversions.",
      },
      {
        title: "Restructure and relaunch",
        description:
          "Accounts are rebuilt around clear funnel stages with consolidated budgets and clean signal.",
      },
      {
        title: "Test creative at pace",
        description:
          "Structured concept, hook, and format testing to find the creative that lowers CAC, since creative is the real targeting.",
      },
      {
        title: "Scale profitably",
        description:
          "Budgets scale only where efficiency holds, with weekly optimization reviews and monthly strategy resets.",
      },
    ],
    outcomes: [
      { metric: "Up to 10x", label: "ROAS achieved for scaling brands" },
      { metric: "Weekly", label: "Creative test cycles" },
      { metric: "Full-funnel", label: "Attribution you can trust" },
    ],
    tools: ["Meta Ads", "Google Ads", "GA4", "Google Tag Manager", "Looker Studio", "Shopify"],
    faqs: [
      {
        question: "What ad budget do you work with?",
        answer:
          "We work with brands from early scaling budgets upward. What matters more is offer strength and creative volume than raw spend.",
      },
      {
        question: "Do you produce the ad creative?",
        answer:
          "Yes. Static, motion, and UGC-style concepts are produced in-house as part of the testing engine.",
      },
      {
        question: "How soon will we see results?",
        answer:
          "Tracking and structure fixes often improve efficiency in the first month, with compounding gains from creative testing over 60 to 90 days.",
      },
    ],
  },

  "seo-organic-growth": {
    intro:
      "SEO is the only channel where the cost per lead falls over time. We combine technical fixes, content built for real search intent, and genuine authority building to grow rankings that hold.",
    whoItsFor: [
      "Businesses fully dependent on paid traffic for leads",
      "Sites with technical issues blocking indexing or Core Web Vitals",
      "Brands with content that ranks on page two and stalls",
      "Local businesses competing in map and city-level searches",
    ],
    deliverables: [
      {
        title: "Technical SEO audit and fixes",
        description:
          "Crawlability, indexation, site architecture, schema, internal linking, Core Web Vitals, and mobile usability.",
      },
      {
        title: "Keyword and intent map",
        description:
          "Priority keyword clusters mapped to funnel stage, difficulty, and the exact page that should rank for each.",
      },
      {
        title: "On-page optimization",
        description:
          "Titles, meta descriptions, headings, internal links, and content depth reworked across priority pages.",
      },
      {
        title: "Content production",
        description:
          "Search-led blogs, service pages, and comparison content briefed and written for intent, not word count.",
      },
      {
        title: "Authority and local SEO",
        description:
          "Digital PR, relevant link acquisition, Google Business Profile optimization, and citation cleanup.",
      },
    ],
    process: [
      {
        title: "Crawl and audit",
        description:
          "Full technical crawl plus Search Console analysis to find what is blocking or suppressing performance.",
      },
      {
        title: "Fix the foundation",
        description:
          "Technical issues and on-page gaps are cleared first so new content compounds instead of leaking equity.",
      },
      {
        title: "Publish with intent",
        description:
          "A monthly content plan built on clusters and internal linking, aligned to commercial priorities.",
      },
      {
        title: "Earn authority",
        description:
          "Ongoing link acquisition and PR outreach, with monthly reporting on rankings, traffic, and conversions.",
      },
    ],
    outcomes: [
      { metric: "3-6 months", label: "Typical window for compounding gains" },
      { metric: "Page 1", label: "Targets for high-intent keywords" },
      { metric: "Lower CPL", label: "Cost per lead falls over time" },
    ],
    tools: ["Semrush", "Google Search Console", "Screaming Frog", "GA4", "Ahrefs", "PageSpeed Insights"],
    faqs: [
      {
        question: "How long before SEO shows results?",
        answer:
          "Technical fixes can lift performance within weeks. Content and authority work usually compounds visibly from month three onward.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No credible agency can guarantee positions. We commit to the work, the reporting, and measurable progress on traffic and qualified leads.",
      },
      {
        question: "Can you handle local SEO too?",
        answer:
          "Yes. Google Business Profile, local landing pages, citations, and review strategy are all part of local engagements.",
      },
    ],
  },

  "creative-branding": {
    intro:
      "Performance ceilings are usually brand problems. We build identity systems, websites, and creative assets that make your brand instantly recognizable and measurably easier to buy from.",
    whoItsFor: [
      "New brands that need a complete identity from scratch",
      "Established businesses whose brand no longer matches their ambition",
      "Companies with a website that gets traffic but not conversions",
      "Teams with inconsistent creative across channels",
    ],
    deliverables: [
      {
        title: "Brand strategy and positioning",
        description:
          "Audience, promise, tone of voice, and messaging hierarchy documented in a usable brand platform.",
      },
      {
        title: "Visual identity system",
        description:
          "Logo suite, colour, typography, iconography, photography direction, and a full brand guideline document.",
      },
      {
        title: "Website design and UX",
        description:
          "Conversion-focused wireframes, responsive UI design, and a component library ready for development.",
      },
      {
        title: "Marketing creative kit",
        description:
          "Ad templates, social layouts, presentation decks, and packaging or print assets as required.",
      },
    ],
    process: [
      {
        title: "Brand discovery",
        description:
          "Workshops and research to define what your brand stands for and how it should sound and look.",
      },
      {
        title: "Concept directions",
        description:
          "Two to three distinct creative territories presented in context, not in isolation.",
      },
      {
        title: "Design and refine",
        description:
          "The chosen direction is developed into a complete system with structured feedback rounds.",
      },
      {
        title: "Rollout and handover",
        description:
          "Files, guidelines, and templates delivered so your team can apply the brand consistently.",
      },
    ],
    outcomes: [
      { metric: "1 system", label: "Consistent brand across every channel" },
      { metric: "CRO-led", label: "Web design built to convert" },
      { metric: "Scalable", label: "Templates your team can reuse" },
    ],
    tools: ["Figma", "Adobe Creative Suite", "Webflow", "After Effects", "Framer"],
    faqs: [
      {
        question: "Can you refresh our brand without a full rebuild?",
        answer:
          "Yes. Brand refreshes retain your recognizable equity while modernizing typography, colour, layout, and messaging.",
      },
      {
        question: "Do you build the website as well as design it?",
        answer:
          "Yes. We design and develop responsive, fast, SEO-ready websites, or hand off clean files to your development team.",
      },
      {
        question: "Will we own the source files?",
        answer:
          "You own all final assets and source files on completion, along with the brand guidelines.",
      },
    ],
  },

  "content-marketing": {
    intro:
      "Buyers research long before they enquire. Content marketing puts your expertise in front of them at every step, so that by the time they reach a sales conversation, they already trust you.",
    whoItsFor: [
      "B2B and considered-purchase brands with educated buyers",
      "Founders who want to build a personal authority platform",
      "Teams publishing inconsistently with no editorial system",
      "Businesses whose sales team lacks supporting collateral",
    ],
    deliverables: [
      {
        title: "Content strategy and editorial calendar",
        description:
          "Themes, formats, cadence, and distribution mapped to funnel stage and search demand.",
      },
      {
        title: "Long-form articles and pillar pages",
        description:
          "Deeply researched, SEO-aligned articles written by specialists and reviewed against your expertise.",
      },
      {
        title: "Thought leadership programme",
        description:
          "Founder-led LinkedIn posts, opinion pieces, and newsletters that build a recognizable point of view.",
      },
      {
        title: "Sales enablement assets",
        description:
          "Case studies, whitepapers, one-pagers, and lead magnets your sales team can send with confidence.",
      },
    ],
    process: [
      {
        title: "Research and positioning",
        description:
          "Audience questions, competitor content gaps, and keyword demand shape the editorial angle.",
      },
      {
        title: "Plan the calendar",
        description:
          "A rolling quarterly calendar balancing search-driven, authority, and conversion content.",
      },
      {
        title: "Produce and review",
        description:
          "Briefs, drafts, expert review, and edits with clear approval checkpoints at each stage.",
      },
      {
        title: "Distribute and repurpose",
        description:
          "Every asset is repurposed across email, social, and sales, then measured on traffic and pipeline influence.",
      },
    ],
    outcomes: [
      { metric: "Compounding", label: "Organic traffic from evergreen assets" },
      { metric: "Authority", label: "Founder positioned as a category voice" },
      { metric: "Sales-ready", label: "Collateral for every funnel stage" },
    ],
    tools: ["Semrush", "Surfer", "Notion", "Google Docs", "LinkedIn", "Beehiiv"],
    faqs: [
      {
        question: "Who writes the content?",
        answer:
          "Specialist writers backed by research and, where relevant, interviews with your internal experts to keep it credible.",
      },
      {
        question: "How much content do we need?",
        answer:
          "Consistency beats volume. Most clients start with four to six well-built assets per month plus repurposing.",
      },
      {
        question: "Is AI used to write it?",
        answer:
          "AI supports research and outlining. Final content is written and edited by humans with subject-matter review.",
      },
    ],
  },

  "social-media-management": {
    intro:
      "Social is where brand and demand meet. We run always-on social programmes that grow an engaged audience, keep your brand consistent, and turn attention into enquiries.",
    whoItsFor: [
      "Brands posting inconsistently with flat engagement",
      "Businesses that want social to generate leads, not just likes",
      "Teams with no in-house design or community bandwidth",
      "Brands ready to work with creators and influencers",
    ],
    deliverables: [
      {
        title: "Monthly content calendar",
        description:
          "Planned posts, reels, stories, and carousels with copy, hashtags, and publishing schedule approved in advance.",
      },
      {
        title: "Design and video production",
        description:
          "On-brand statics, motion graphics, and short-form video edited for each platform's format.",
      },
      {
        title: "Community management",
        description:
          "Daily comment and DM responses, sentiment monitoring, and escalation of sales-ready conversations.",
      },
      {
        title: "Influencer and creator programme",
        description:
          "Creator sourcing, briefing, contracting, and performance tracking of collaborations.",
      },
      {
        title: "Monthly analytics report",
        description:
          "Reach, engagement rate, follower growth, saves, shares, click-throughs, and leads attributed to social.",
      },
    ],
    process: [
      {
        title: "Audit and strategy",
        description:
          "Profile audit, competitor review, and a content pillar framework tailored to your audience.",
      },
      {
        title: "Plan and produce",
        description:
          "Monthly calendar and assets created and approved ahead of time so publishing never slips.",
      },
      {
        title: "Publish and engage",
        description:
          "Scheduled publishing plus active community management to build real conversation.",
      },
      {
        title: "Measure and iterate",
        description:
          "Monthly reporting drives the next calendar, doubling down on formats that actually perform.",
      },
    ],
    outcomes: [
      { metric: "Always-on", label: "Consistent publishing cadence" },
      { metric: "Engaged", label: "Community managed daily" },
      { metric: "Attributed", label: "Leads tracked back to social" },
    ],
    tools: ["Meta Business Suite", "Later", "Canva", "Premiere Pro", "Instagram", "LinkedIn"],
    faqs: [
      {
        question: "Which platforms should we be on?",
        answer:
          "Only the ones where your buyers are. For most D2C brands that is Instagram and YouTube; for B2B it is usually LinkedIn.",
      },
      {
        question: "Do you handle paid social too?",
        answer:
          "Yes, through our performance marketing team, so organic and paid creative reinforce each other.",
      },
      {
        question: "How much input do we need to give?",
        answer:
          "A monthly approval round and access to product or founder footage. We handle planning, production, and publishing.",
      },
    ],
  },
};

export const getServiceDetail = (slug: string) => serviceDetails[slug];
