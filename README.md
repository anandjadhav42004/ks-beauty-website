# KS Beauty — Luxury Mobile Bridal Hair & Makeup Website

A premium, single-page marketing website for **KS Beauty**, a founder-led luxury mobile bridal hair and makeup artistry service serving Toronto, Durham Region, and the Greater Toronto Area (GTA).

**Live Demo:** [Add your deployed URL here]

## Overview

KS Beauty offers salon-quality hair and makeup delivered directly to clients' homes, hotels, or event venues. This site was built to position the brand as a premium, trustworthy, founder-led bridal beauty service — with a strong focus on South Asian and multicultural bridal artistry.

## Features

- **Fully responsive design** — desktop, tablet, and mobile (app-style mobile navigation with bottom nav bar)
- **Editorial hero section** with cutout-style imagery blended into the background
- **Services showcase** — Bridal Makeup & Hair, Special Event Glam, Group/Bridal Party Bookings, Touch-Up & Trial Sessions
- **Why Choose Us** — trust badges and credibility checklist
- **Add-Ons grid** — false lashes, hair extensions, draping, second looks, and more
- **Pricing/Packages section** — tiered package cards (Bridal Trial, Bridal Day, Bridal Party Package)
- **Gallery** — filterable portfolio by category (Bridal, Soft Glam, Reception, Party Makeup, Editorial, Hair Styling)
- **Instagram preview** section
- **FAQ accordion**
- **Contact/Quote form** with automated email confirmation (via EmailJS)
- **Scroll-based animations** — parallax effects, fade-ups, staggered reveals (Framer Motion)
- **SEO-ready** — meta tags, semantic HTML, structured content

## Tech Stack

- **Framework:** React + TypeScript (Vite)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **UI Components:** shadcn/ui, Radix UI primitives
- **Icons:** Lucide React
- **Forms & Email:** React Hook Form + EmailJS
- **Routing:** Wouter

## Project Structure

```
ks-beauty/
├── public/
│   ├── images/          # Hero, about, services, and gallery images
│   └── favicon.svg
├── src/
│   ├── components/      # Page sections (Hero, Services, Gallery, Pricing, etc.)
│   │   └── ui/           # Reusable UI primitives (shadcn/ui)
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
git clone https://github.com/anandjadhav42004/ks-beauty-website.git
cd ks-beauty-website
npm install
```

### Development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Setup Required Before Launch

This is currently a **demo build**. Before going live for the client, the following need to be updated:

- [ ] Replace placeholder contact info (phone, email, Instagram handle) with real business details
- [ ] Add EmailJS credentials (Service ID, Template ID, Public Key) in `ContactForm.tsx` — sign up free at [emailjs.com](https://emailjs.com)
- [ ] Replace sample testimonials with real client reviews and headshots
- [ ] Replace Instagram preview grid with real content or live feed embed
- [ ] Update pricing (currently placeholder values)
- [ ] Add a custom domain (currently on a temporary `.replit.app` / dev URL)
- [ ] Add a real Privacy Policy and Terms of Service page
- [ ] Set up analytics (Google Analytics / Meta Pixel) if running ads

## Design System

| Element | Value |
|---|---|
| Primary (Bottle Green) | `#1F3329` |
| Accent (Antique Gold) | `#B8935A` |
| Secondary Accent (Maroon) | `#7A2E38` |
| Background (Ivory) | `#FBF6EE` |
| Text (Charcoal) | `#2B2420` |
| Display Font | Playfair Display |
| Body Font | Jost |

## Credits

Designed & built by **Anand Jadhav**

## License

This project is proprietary and built for KS Beauty. All rights reserved.
