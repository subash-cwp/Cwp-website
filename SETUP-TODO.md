# CWP Marketing Website - Setup Checklist

## ⚠️ CRITICAL: Required Information to Provide

### 1. Contact Information
- [ ] **WhatsApp Phone Number** - Update in:
  - `src/components/WhatsAppButton.tsx` (line 7)
  - `src/pages/Careers.tsx` (line 82)
  - `src/components/Footer.tsx` (line 65)

- [ ] **Calendly Booking Link** - Update in:
  - `src/components/Hero.tsx` (line 16)
  - `src/components/BookingSection.tsx` (line 66)
  - `src/pages/Pricing.tsx` (line 64)

### 2. Social Media Links
- [ ] **LinkedIn URL** - Update in:
  - `src/components/Footer.tsx` (line 24)
  - `src/components/TeamProfiles.tsx` (lines 46, 58, 70, 82)

- [ ] **Twitter/X URL** - Update in:
  - `src/components/Footer.tsx` (line 27)
  - `src/components/TeamProfiles.tsx` (lines 53, 65, 77, 89)
  - `index.html` (line 35 - for Twitter card)

- [ ] **Facebook URL** - Update in:
  - `src/components/Footer.tsx` (line 30)

### 3. Client Logos
Current status: Text-based logos in `src/components/ClientLogos.tsx`

**Option A - Use actual logo images:**
1. Collect logo files from your clients (PNG, SVG, or JPG format)
2. Upload them to `public/images/clients/` folder
3. Update `src/components/ClientLogos.tsx` to use `<img>` tags instead of text

**Option B - Keep text logos but improve styling:**
- Current implementation is already functional
- Consider adding background shapes or color accents

### 4. Open Graph / Social Sharing Image
- [ ] **Create OG Image** (1200x630px recommended)
  - Upload to `public/og-image.jpg`
  - Current placeholder: `https://cwp-mktng.org/og-image.jpg`
  - Used for social media link previews (Facebook, LinkedIn, Twitter)

### 5. Analytics & Tracking
- [ ] **Google Analytics**
  - Get your GA4 Measurement ID from Google Analytics
  - Update in `index.html` (line 42) - Replace `GA_MEASUREMENT_ID`
  - Uncomment the Google Analytics script block

- [ ] **Facebook Pixel**
  - Get your Pixel ID from Facebook Business Manager
  - Update in `index.html` (line 50) - Replace `YOUR_PIXEL_ID`
  - Uncomment the Facebook Pixel script block

### 6. Live Chat (Optional)
Choose one and implement:

**Option A - Tawk.to (Free):**
1. Sign up at tawk.to
2. Get your Property ID and Widget ID
3. Update `src/components/LiveChat.tsx` (line 8)
4. Add `<LiveChat />` to `src/App.tsx`

**Option B - Intercom (Paid):**
1. Sign up at intercom.com
2. Get your App ID
3. Uncomment Intercom code in `src/components/LiveChat.tsx`
4. Add script to `index.html` as noted in comments

## 📝 Content Updates Needed

### 7. Team Member Information
Update real team details in `src/components/TeamProfiles.tsx`:
- [ ] Replace placeholder names
- [ ] Replace stock photos with actual team photos
- [ ] Update bios and credentials
- [ ] Add real LinkedIn/Twitter profiles

### 8. Blog Content
- [ ] Add real blog post content (currently using placeholder articles)
- [ ] Connect to actual blog platform or CMS
- [ ] Update blog post links in `src/pages/Blog.tsx`

### 9. Case Studies
- [ ] Add real client case studies with actual data
- [ ] Replace placeholder metrics with real results
- [ ] Add client testimonials and quotes
- [ ] Update in `src/pages/CaseStudies.tsx`

### 10. Pricing Information
- [ ] Verify pricing packages in `src/pages/Pricing.tsx`
- [ ] Adjust prices to match your actual offerings
- [ ] Update feature lists for each package

### 11. Job Listings
- [ ] Add real job openings in `src/pages/Careers.tsx`
- [ ] Update job requirements and descriptions
- [ ] Update company benefits

### 12. Downloadable Resources
- [ ] Create actual downloadable files for `src/pages/Resources.tsx`
- [ ] Add real PDFs, templates, and guides
- [ ] Implement actual file download functionality

## 🎨 Design Customization (Optional)

### 13. Brand Colors
Customize in `src/index.css` if needed:
- Primary color (currently blue)
- Accent color
- Background colors

### 14. Fonts
- Current: Inter font family
- To change: Update `src/index.css` and install new font package

### 15. Logo
- [ ] Replace placeholder "C" logo with actual company logo
- Update in `src/components/Navbar.tsx` and `src/components/Footer.tsx`

## 🚀 Deployment Checklist

### Before Going Live:
- [ ] All TODOs above completed
- [ ] Test all forms (Contact, Newsletter)
- [ ] Test all navigation links
- [ ] Verify mobile responsiveness
- [ ] Test WhatsApp button with real number
- [ ] Test Calendly booking flow
- [ ] Verify analytics tracking is working
- [ ] Check page load speed
- [ ] Review SEO meta tags
- [ ] Test on multiple browsers
- [ ] Verify all external links open in new tab

## 📍 Quick Find & Replace Guide

To quickly update placeholder values, search for:
- `YOUR-CALENDLY-LINK` - Calendly booking URL
- `YOUR-LINKEDIN` - LinkedIn company page
- `YOUR-TWITTER` - Twitter/X handle
- `YOUR-FACEBOOK` - Facebook page
- `919876543210` - WhatsApp phone number
- `GA_MEASUREMENT_ID` - Google Analytics ID
- `YOUR_PIXEL_ID` - Facebook Pixel ID
- `YOUR_PROPERTY_ID` - Tawk.to Property ID

## 💡 Notes

- All placeholder content is clearly marked with comments
- Forms are functional but currently only show toast notifications
- For production, connect forms to actual email service or CRM
- Analytics components are created but need IDs to activate
- Live chat is set up but needs account configuration

---

**Last Updated:** December 2, 2025
**Status:** Development - Pending Client Information
