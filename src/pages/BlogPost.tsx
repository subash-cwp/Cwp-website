import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter, Facebook, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

const blogPosts = [
  {
    id: 1,
    title: "10 Proven Strategies to 3X Your Social Media Engagement in 2024",
    excerpt: "Discover the latest tactics that top brands are using to dramatically increase their social media reach and engagement rates.",
    category: "Social Media",
    date: "Dec 1, 2025",
    readTime: "8 min read",
    author: "Naren Kumar",
    authorRole: "Social Media Strategist",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    content: `
      <p>Social media engagement is the lifeblood of any successful digital marketing strategy. In 2024, the landscape has evolved dramatically, and brands need to adapt to stay relevant.</p>
      
      <h2>1. Embrace Short-Form Video Content</h2>
      <p>Platforms like TikTok, Instagram Reels, and YouTube Shorts have revolutionized content consumption. Short-form videos receive 2.5x more engagement than traditional posts. Focus on creating entertaining, educational content that captures attention in the first 3 seconds.</p>
      
      <h2>2. Leverage User-Generated Content</h2>
      <p>User-generated content builds trust and authenticity. Encourage your audience to share their experiences with your brand. UGC campaigns can increase engagement by up to 28% and reduce content creation costs.</p>
      
      <h2>3. Implement Interactive Features</h2>
      <p>Polls, quizzes, Q&A sessions, and interactive stories drive participation. These features make your audience feel involved and valued, leading to higher engagement rates and brand loyalty.</p>
      
      <h2>4. Optimize Posting Times</h2>
      <p>Timing is crucial. Analyze your audience insights to determine when your followers are most active. Generally, posting during lunch hours (11 AM - 1 PM) and evening (7 PM - 9 PM) yields better results.</p>
      
      <h2>5. Build Community, Not Just Followers</h2>
      <p>Focus on creating genuine connections. Respond to comments, acknowledge mentions, and participate in conversations. A smaller, engaged community is more valuable than a large, passive following.</p>
      
      <h2>6. Collaborate with Micro-Influencers</h2>
      <p>Micro-influencers (10K-100K followers) often have higher engagement rates than mega-influencers. Their audiences are more niche and trust their recommendations more.</p>
      
      <h2>7. Create Platform-Specific Content</h2>
      <p>What works on Instagram may not work on LinkedIn. Tailor your content strategy for each platform. Understand the unique culture and expectations of each social network.</p>
      
      <h2>8. Use Social Listening</h2>
      <p>Monitor conversations about your brand, industry, and competitors. This helps you understand sentiment, identify opportunities, and address concerns proactively.</p>
      
      <h2>9. Invest in Paid Promotion</h2>
      <p>Organic reach continues to decline. Strategic paid promotion can amplify your best content and reach new audiences. Start with a small budget and optimize based on performance.</p>
      
      <h2>10. Analyze and Iterate</h2>
      <p>Track your metrics religiously. Identify what's working and what's not. Continuously experiment with new formats, topics, and approaches to keep your strategy fresh.</p>
      
      <h2>Conclusion</h2>
      <p>Increasing social media engagement requires a combination of creativity, consistency, and data-driven decision-making. Start implementing these strategies today, and you'll see significant improvements in your engagement metrics within 90 days.</p>
    `
  },
  {
    id: 2,
    title: "The Ultimate Guide to SEO in 2025: What's Changed and What Still Works",
    excerpt: "Learn how Google's latest algorithm updates are reshaping SEO strategy and what you need to do to stay ahead of the competition.",
    category: "SEO",
    date: "Nov 28, 2025",
    readTime: "12 min read",
    author: "Naren Kumar",
    authorRole: "SEO Specialist",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    content: `
      <p>Search engine optimization continues to evolve at a rapid pace. What worked in 2023 may not be effective today. Let's explore the key changes and strategies that will drive SEO success in 2025.</p>
      
      <h2>The Rise of AI in Search</h2>
      <p>Google's AI-powered search features have fundamentally changed how results are displayed. Focus on creating comprehensive, authoritative content that directly answers user queries.</p>
      
      <h2>E-E-A-T is More Important Than Ever</h2>
      <p>Experience, Expertise, Authoritativeness, and Trustworthiness are crucial ranking factors. Showcase your credentials, cite sources, and build a strong online reputation.</p>
      
      <h2>Core Web Vitals and User Experience</h2>
      <p>Page speed, interactivity, and visual stability directly impact rankings. Optimize your website for mobile-first indexing and ensure seamless user experiences across all devices.</p>
      
      <h2>Content Quality Over Quantity</h2>
      <p>Gone are the days of churning out thin content. Focus on creating in-depth, valuable content that serves user intent. One exceptional piece outperforms ten mediocre articles.</p>
      
      <h2>Voice Search Optimization</h2>
      <p>With the growing adoption of voice assistants, optimize for conversational queries. Use natural language and target long-tail keywords that match how people speak.</p>
      
      <h2>Conclusion</h2>
      <p>SEO in 2025 is about providing genuine value to users. Focus on quality, user experience, and building authority in your niche. The fundamentals remain the same – just executed at a higher level.</p>
    `
  },
  {
    id: 3,
    title: "How We Generated 500+ Qualified Leads in 90 Days: A Case Study",
    excerpt: "A deep dive into the exact strategies and tactics we used to help a B2B SaaS company transform their lead generation.",
    category: "Case Study",
    date: "Nov 25, 2025",
    readTime: "10 min read",
    author: "Naren Kumar",
    authorRole: "Growth Marketing Lead",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    content: `
      <p>When TechFlow SaaS approached us, they were struggling with lead generation. Their website traffic was stagnant, and the leads they did get rarely converted. Here's how we turned things around.</p>
      
      <h2>The Challenge</h2>
      <p>TechFlow had a great product but poor market visibility. Their monthly lead count was under 50, and most weren't qualified. They needed a comprehensive strategy to attract and convert their ideal customers.</p>
      
      <h2>Our Approach</h2>
      <p>We implemented a multi-channel strategy focusing on content marketing, SEO, paid advertising, and marketing automation. Each channel was carefully orchestrated to create a cohesive lead generation machine.</p>
      
      <h2>The Results</h2>
      <p>Within 90 days, we achieved remarkable results: 580+ qualified leads per month, 425% increase in organic traffic, 340% revenue growth, and an 8.3% conversion rate.</p>
      
      <h2>Key Takeaways</h2>
      <p>Success came from understanding the target audience deeply, creating valuable content, optimizing the conversion funnel, and continuously iterating based on data.</p>
    `
  },
  {
    id: 4,
    title: "Email Marketing ROI: Why It Still Beats Every Other Channel",
    excerpt: "Email marketing delivers an average ROI of 4200%. Here's how to maximize your email campaigns for maximum revenue.",
    category: "Email Marketing",
    date: "Nov 22, 2025",
    readTime: "7 min read",
    author: "Naren Kumar",
    authorRole: "Email Marketing Expert",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    content: `
      <p>Despite the rise of social media and new marketing channels, email marketing remains the highest-ROI channel for most businesses. Here's why and how to maximize it.</p>
      
      <h2>Why Email Marketing Works</h2>
      <p>Email is personal, direct, and permission-based. Unlike social media, you own your email list. Your messages reach your audience without algorithm interference.</p>
      
      <h2>Building a Quality List</h2>
      <p>Focus on attracting subscribers who genuinely want to hear from you. Use lead magnets, gated content, and compelling opt-in offers. Quality trumps quantity.</p>
      
      <h2>Segmentation and Personalization</h2>
      <p>One-size-fits-all emails are dead. Segment your list based on behavior, preferences, and demographics. Personalized emails generate 6x higher transaction rates.</p>
      
      <h2>Automation for Scale</h2>
      <p>Set up automated sequences for welcome series, abandoned carts, re-engagement, and nurturing campaigns. Automation ensures consistent communication without manual effort.</p>
    `
  },
  {
    id: 5,
    title: "Content Marketing Strategy: Creating Content That Actually Converts",
    excerpt: "Stop creating content that gets ignored. Learn the framework for developing content that drives real business results.",
    category: "Content Marketing",
    date: "Nov 19, 2025",
    readTime: "9 min read",
    author: "Naren Kumar",
    authorRole: "Content Strategy Director",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    content: `
      <p>Most content fails to convert because it's created without strategy. Here's how to develop content that moves your audience from awareness to action.</p>
      
      <h2>Understanding Your Audience</h2>
      <p>Before creating any content, deeply understand who you're creating it for. What are their pain points? What questions do they have? What motivates them?</p>
      
      <h2>The Content Funnel</h2>
      <p>Map content to each stage of the buyer's journey. Top-of-funnel content builds awareness, middle-funnel content nurtures interest, and bottom-funnel content drives conversions.</p>
      
      <h2>Quality Over Quantity</h2>
      <p>Publishing consistently is important, but never sacrifice quality for frequency. One piece of exceptional content outperforms ten mediocre posts.</p>
      
      <h2>Distribution is Half the Battle</h2>
      <p>Creating great content isn't enough – you need to get it in front of the right people. Develop a multi-channel distribution strategy that amplifies your reach.</p>
    `
  },
  {
    id: 6,
    title: "Paid Advertising in 2025: Platform-by-Platform Breakdown",
    excerpt: "Compare ROI across Google Ads, Facebook, LinkedIn, and emerging platforms. Know where to invest your ad budget.",
    category: "Paid Advertising",
    date: "Nov 15, 2025",
    readTime: "11 min read",
    author: "Naren Kumar",
    authorRole: "Paid Media Specialist",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    content: `
      <p>With advertising costs rising across all platforms, choosing where to invest your budget is more critical than ever. Here's a breakdown of major platforms and their strengths.</p>
      
      <h2>Google Ads</h2>
      <p>Best for capturing high-intent search traffic. Works well for B2B and B2C. Focus on keyword research, quality score optimization, and landing page experience.</p>
      
      <h2>Meta (Facebook & Instagram)</h2>
      <p>Excellent for brand awareness and e-commerce. Powerful targeting options based on interests and behaviors. Video content performs exceptionally well.</p>
      
      <h2>LinkedIn Ads</h2>
      <p>The go-to platform for B2B marketing. Higher CPCs but highly qualified audiences. Great for targeting by job title, company size, and industry.</p>
      
      <h2>Emerging Platforms</h2>
      <p>TikTok Ads, Reddit Ads, and Connected TV are showing promising results for early adopters. Lower competition means potentially better ROI.</p>
    `
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));
  
  const relatedPosts = blogPosts
    .filter(p => p.id !== Number(id))
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      <article className="section-spacing pt-32">
        <div className="container-custom">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-semibold">{post.category}</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Share:</span>
                <button className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4 text-primary" />
                </button>
                <button className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4 text-primary" />
                </button>
                <button className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div 
            className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          <section className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Link to={`/blog/${relatedPost.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="text-primary font-semibold">{relatedPost.category}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how these strategies can be applied to your unique situation.
            </p>
            <Button size="lg" asChild>
              <a href="/#contact">Get Your Free Strategy Session</a>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}