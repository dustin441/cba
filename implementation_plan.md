# CBA Glass Website Redesign Plan

## 1. Visual Strategy & Branding
The goal is to transform the current dated website into a premium, high-end digital experience that reflects the 20+ years of expertise and quality service of CBA Glass.

- **Primary Color Palette**: 
  - Deep Navy (#001F3F) - Base background
  - Electric Blue (#0074D9) - Accents and CTAs
  - Crisp White (#FFFFFF) - Typography
  - Subtle Gradients - Adding depth to sections
- **Typography**: 
  - Headings: 'Outfit' or 'Inter' (Bold, modern, professional)
  - Body: 'Inter' (Highly readable)
- **Aesthetics**: 
  - Glassmorphism for cards and navigation
  - High-quality imagery from the work photo collection
  - Smooth parallax effects and entrance animations

## 2. Content Structure
The site will be a single-page high-conversion landing page (or multi-page if needed, but a sleek long-form page is better for mobile-first conversion).

1.  **Hero Section**:
    - Background: High-res video or photo of high-end windshield replacement (heavy machinery or RV).
    - Headline: "OEM Quality Glass. 20+ Years of Excellence."
    - CTA: "Get a Free Quote" (Primary) / "Call Now" (Secondary).
2.  **Service Grid**:
    - Interactive cards with hover effects.
    - Services: Windshield Replacement, ADAS Calibration, RV Glass, Heavy Machinery Glass, Door Glass.
3.  **The "CBA Difference"**:
    - Icons/Animations highlighting: Mobile Service, Lifetime Warranty, Insurance Approval, 20+ Yrs Exp.
4.  **Work Showcase (Gallery)**:
    - Premium carousel of the organized work photos.
5.  **About Us**:
    - Focused copy on family-owned, quality-first approach.
6.  **Contact & Lead Gen**:
    - Sleek, minimal form.
    - Integrated map or service area highlight.
7.  **Footer**:
    - Social links, contact info, and SEO-optimized links.

## 3. Technical Stack
- **Framework**: Next.js 16.2.2 (following project standards)
- **Styling**: Vanilla CSS with modern features (CSS Variables, Flex/Grid)
- **Animations**: Framer Motion for entrance, scroll-triggered animations, and micro-interactions.
- **Assets**: 
  - Logos: `/scratch/cba/website_assets/logos/`
  - Photos: `/scratch/cba/website_assets/photos/`

## 4. Implementation Steps
1.  **Project Setup**: Initialize Next.js project in a new directory `projects/cba-redesign`.
2.  **Design System**: Create `index.css` with color tokens and base styles.
3.  **Components**: Build Navbar, Hero, ServiceCards, and Gallery components.
4.  **Layout**: Assemble the main page with a focus on responsiveness.
5.  **Animations**: Integrate Framer Motion for the "sleek" feel.
6.  **Testing & Optimization**: Ensure fast load times and mobile-first excellence.

---
**Status**: Assets Organized | Plan Drafted
**Next Action**: Initialize Next.js project and start on the Design System.
