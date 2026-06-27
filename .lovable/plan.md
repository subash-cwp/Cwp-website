# Admin CMS Upgrade

Goal: every piece of content on the site is editable from the admin panel, and new pages can be created without code.

We'll ship this in **two phases** (same project, sequential), as you chose.

---

## Phase 1 — Editable Static Content (Home, About, Services, Contact, Nav, Footer)

### Database
New table `public.page_content`:
- `page_key` (e.g. `home`, `about`, `services`, `contact`, `nav`, `footer`)
- `section_key` (e.g. `hero`, `cta`, `mission`, `address`)
- `content` (JSONB — flexible: `{ heading, subheading, body, image, ctaLabel, ctaHref, items: [...] }`)
- Standard id / timestamps + updated_by
- RLS: public `SELECT` for published rows; only admins can write
- GRANTs to anon (read) + authenticated + service_role

Seeded with the current hardcoded content from Home/About/Services/Contact/Nav/Footer so nothing breaks on day one.

### Admin UI
New admin page `/admin/page-content` with:
- Tabs per page (Home · About · Services · Contact · Navigation · Footer)
- Each tab lists the editable sections for that page
- Each section opens a form with the right fields (heading, subheading, body — using existing `RichTextEditor` — image via existing `ImageUpload`, CTA label/href, repeatable items where relevant like nav links / footer columns / stats)
- Save → upserts into `page_content`

### Frontend wiring
New hook `usePageContent(pageKey)` that fetches all sections for a page once and caches via React Query. Replace hardcoded strings in:
- `Hero.tsx`, `AnimatedStats.tsx`, `WhyChoose.tsx`, `Process.tsx`, `FAQ.tsx` (Home)
- `pages/About.tsx`, `pages/Services.tsx`, `pages/Contact.tsx` sub-components
- `Navbar.tsx` (menu items), `Footer.tsx` (columns, address, socials)

Fallback to current copy if a row is missing, so nothing ever renders empty.

---

## Phase 2 — Custom Page Builder

### Database
- `public.custom_pages`: `slug` (unique), `title`, `meta_description`, `og_image`, `published`, `sort_order`
- `public.custom_page_sections`: `page_id` FK, `type` (`hero` | `text` | `image` | `image_text` | `cta` | `gallery` | `faq` | `embed_html`), `content` JSONB, `sort_order`
- Full RLS + GRANTs (public read for published; admin write)

### Admin UI
New `/admin/pages`:
- List existing custom pages + "New page" button
- Editor: slug, SEO meta, publish toggle, then a **section stack** — add / reorder (drag) / edit / delete typed sections, each with its own mini form
- Live "View page" link

### Frontend route
- Add `<Route path="/:slug" element={<CustomPage />} />` (last, before the 404)
- `CustomPage.tsx` loads the page + sections by slug, renders each section type with a small renderer registry, sets SEO via existing `SEOHead`, returns the `NotFound` page if slug isn't found / not published
- Sitemap edge function already exists — extend it to include published custom pages

---

## What stays the same
- Blog, Case Studies, Services (catalog), Team, Testimonials, Media Library — your existing admin sections already cover these and won't be touched.
- Auth, roles, RLS pattern (`has_role`) — reused.

---

## Technical notes
- All new tables follow the project's GRANT + RLS rules (anon read for public content, admin-only writes via `has_role(auth.uid(),'admin')`).
- Reuses existing `RichTextEditor`, `ImageUpload`, `AdminLayout`, `AdminSearch`.
- React Query for fetching; optimistic update on save with toast.
- Drag-reorder via `@dnd-kit/sortable` (lightweight, already common in this stack).

---

## Delivery order
1. Phase 1 migration → Admin UI → wire frontend (one page at a time: Home → About → Services → Contact → Nav → Footer).
2. Phase 2 migration → Admin UI → dynamic route + sitemap.

Phase 1 is the bigger immediate unlock (you'll feel it on every page). Phase 2 follows right after. Approve and I'll start with the Phase 1 migration.