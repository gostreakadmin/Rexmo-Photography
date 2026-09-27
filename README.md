# Rexmo Photography — Luxury Studio Website

A completely modern, editorial, cinematic redesign and rebuild for **Rexmo Photography** (Established 1992).

---

## ✦ Brand Identity & Heritage

- **Brand:** REXMO PHOTOGRAPHY
- **Established:** 1992
- **Founder:** Francis Jeya Balan
- **Creative Direction:** Jesley Frantin
- **Headquarters:** 4/48-2 Near Church, Main Road, Kovalam, Kanyakumari District, Tamil Nadu 629702, India
- **Direct Email:** `jesleyfrantin@gmail.com`
- **WhatsApp Concierge:** `+91 94427 88952`
- **Positioning:** Luxury fine-art photography and cinematography studio specializing in timeless wedding narratives, intimate maternity sessions, delicate newborn portraits, high-fashion modeling portfolios, and curated celebrations across South India and international destinations.

---

## ✦ Visual & Design System

- **Theme:** Warm Ivory Luxury Light Theme
  - Primary Background: `#FFFFFF`
  - Secondary Background: `#F7F6F2` (Warm ivory / alabaster)
  - Primary Text: `#171717`
  - Muted Text: `#6F6F6F`
  - Borders: `#E7E4DE` (Hairline luxury borders)
  - Accent Gold: `#A58A62` (Warm antique gold / bronze)
- **Typography:**
  - Editorial Serif Headings: **Cormorant Garamond** & **Playfair Display**
  - Modern Sans Body & UI: **Manrope**
  - Monospace Data / Counters: System Monospace
- **Layout Architecture:**
  - Asymmetric editorial grids
  - Magazine-style numbered sections (`01` through `10`)
  - Generous whitespace and high visual hierarchy
  - Preservation of photographic aspect ratios (portrait, landscape, square, panoramic)

---

## ✦ Built Sections & Features

1. **Header:** Minimalist sticky header with smooth background transition on scroll, section active-state indicators, and full-screen luxury mobile drawer.
2. **Hero:** Full-screen cinematic hero with authentic high-resolution Rexmo wedding photography, subtle parallax, editorial metadata strip, and dual CTAs.
3. **Introduction:** *"Defining the Narrative"* — Asymmetric editorial layout highlighting the studio's core philosophy and discipline.
4. **Cinematic Nostalgia:** The union of 4K digital sensors with analog Portra/Fuji color science and unforced emotion.
5. **Curated Collections (Services):**
   - `01 — WEDDINGS` (Wedding Narratives)
   - `02 — MATERNITY` (Maternity Sessions)
   - `03 — NEWBORN` (Newborn Portraits)
   - `04 — MODELING` (Editorial & Portfolios)
   - `05 — EVENTS` (Curated Celebrations)
   - Interactive modals detailing inclusions and direct inquiry triggers.
6. **Selected Frames (Featured Gallery):**
   - Dynamic masonry layout preserving natural aspect ratios without clipping.
   - Interactive filters: `ALL`, `WEDDINGS`, `MATERNITY`, `NEWBORN`, `MODELING`, `EVENTS`.
   - Fullscreen Lightbox supporting:
     - Keyboard navigation (Left/Right arrows, Escape)
     - Touch swipe gestures for mobile
     - Counter (`01 / 20`), category tags, captions, and location tags.
7. **Cinematic Motion:** 4K video reel showcase, Super 8 analog film features, bespoke score highlights, and showreel modal.
8. **Heritage & Legacy (Since 1992):**
   - Archival portrait of Founder Francis Jeya Balan and current Creative Director Jesley Frantin.
   - Interactive chronology timeline: *1992 The Beginning → The Legacy → The Next Generation → Rexmo Today*.
9. **Destinations Directory:**
   - Interactive destination selector for Tamil Nadu, Kerala, Karnataka, and International (Dubai, Abu Dhabi, London, Paris, Maldives).
   - Notable venue lists and bespoke itinerary request actions.
10. **Words From Our Clients (Testimonials):**
    - Authentic client reviews from real patrons (Irone Fleedon, Rohan, Sandhya Sekhar, Amal Aaron).
    - Smooth quote carousel with client name, event category, and location.
11. **Reservation Brief & Inquiries:**
    - Direct WhatsApp Concierge integration (+91 94427 88952) with pre-filled message dispatch.
    - Direct email (`jesleyfrantin@gmail.com`).
    - Interactive reservation brief form with collection selection, date, and venue details.
12. **Footer:** Minimalist footer with quick navigation, social links, and back-to-top button.
13. **Floating Concierge:** Discreet floating WhatsApp button with editorial tooltip.

---

## ✦ Technical Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 + PostCSS
- **Icons:** Lucide React + Bespoke SVGs
- **SEO & Performance:**
  - JSON-LD Structured Data (`PhotographyBusiness`, `LocalBusiness`, `WebSite`)
  - Open Graph & Twitter Cards
  - Semantic HTML5 heading hierarchy
  - `sitemap.xml` & `robots.txt`
  - Sub-350ms build time with zero compilation errors

---

## ✦ Running Locally

```bash
# Navigate to project directory
cd /home/gagan-b/Hello/rexmo/rexmo-photography

# Run development server
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview
```
