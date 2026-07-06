import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_URL = 'https://cwpmktng.com'

function escapeXml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}



Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const today = new Date().toISOString().split('T')[0]

    // Static pages
    const staticPages = [
      { loc: '/', changefreq: 'weekly', priority: '1.0' },
      { loc: '/about', changefreq: 'monthly', priority: '0.8' },
      { loc: '/services', changefreq: 'monthly', priority: '0.9' },
      { loc: '/portfolio', changefreq: 'weekly', priority: '0.8' },
      { loc: '/blog', changefreq: 'daily', priority: '0.9' },
      { loc: '/case-studies', changefreq: 'weekly', priority: '0.8' },
      { loc: '/pricing', changefreq: 'monthly', priority: '0.7' },
      { loc: '/careers', changefreq: 'weekly', priority: '0.6' },
      { loc: '/resources', changefreq: 'weekly', priority: '0.7' },
      { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    ]

    // Fetch published blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)

    // Fetch published case studies
    const { data: caseStudies } = await supabase
      .from('case_studies')
      .select('slug, updated_at')
      .eq('published', true)

    // Fetch published services
    const { data: services } = await supabase
      .from('services')
      .select('slug, updated_at')
      .eq('published', true)

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

    // Add static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    }

    // Add blog posts
    if (blogPosts) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at?.split('T')[0] || today
        xml += `
  <url>
    <loc>${SITE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
      }
    }

    // Add case studies
    if (caseStudies) {
      for (const study of caseStudies) {
        const lastmod = study.updated_at?.split('T')[0] || today
        xml += `
  <url>
    <loc>${SITE_URL}/case-studies/${escapeXml(study.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
      }
    }

    // Add services
    if (services) {
      for (const service of services) {
        const lastmod = service.updated_at?.split('T')[0] || today
        xml += `
  <url>
    <loc>${SITE_URL}/services/${escapeXml(service.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      }
    }

    xml += `
</urlset>`

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    // Return a generic error message; keep details server-side only.
    return new Response(JSON.stringify({ error: 'Failed to generate sitemap' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
