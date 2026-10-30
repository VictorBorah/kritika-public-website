# Kritika Micro Foundation — Public Showroom & Dealership Website

> **Official E-Rickshaw Showroom & Dealership**  
> *Showroom Address*: Rittika Enterprise, Pegu Bazaar, Dhemaji Town, Dhemaji – 787057, Assam, India  
> *Phone*: [+91-99543-67393](tel:+919954367393) | *Email*: [sales@kritikafoundation.com](mailto:sales@kritikafoundation.com)  
> *Production Domain*: [https://kritikafoundation.com](https://kritikafoundation.com)  
> *Staging Domain*: [https://kmflabz.space](https://kmflabz.space)  

---

## 1. Overview & Business Positioning

**Kritika Micro Foundation** is a premier E-Rickshaw showroom and dealership in Dhemaji, Assam. 

### Critical Business Positioning
- **Primary Focus**: E-Rickshaw sales, vehicle models, accessories, showroom experience, and customer enquiries.
- **Financing Assistance**: Facilitated solely as an added customer convenience through **associated finance partners**. Kritika Micro Foundation is **not** a bank, NBFC, or direct lender.
- **Key Selling Propositions**:
  1. Multiple E-Rickshaw options.
  2. Financing assistance through associated finance partners.
  3. Minimum documentation requirements.
  4. Same-day loan sanctioning policy (subject to partner approval and eligibility*).
  5. Same-day vehicle delivery (subject to vehicle availability and formalities*).
  6. Fully assembled E-Rickshaws.
  7. Optional vehicle accessories and customization packages.
  8. Convenient showroom-based purchasing experience.

---

## 2. Tech Stack & Motion Engine

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom Dark Gaming / Cyberpunk theme tokens
- **Animations**: 
  - HTML5 Canvas 269-frame scroll-driven image sequence (`requestAnimationFrame`)
  - Framer Motion spring physics
  - Conic-gradient CSS rotating borders (`@keyframes rotateBorder`)
- **Icons**: Lucide React
- **Celebration Effects**: `canvas-confetti`
- **Output**: Static HTML/CSS/JS export (`output: 'export'`) for high-performance cPanel shared hosting

---

## 3. Website Sections

1. **Navbar**: Glassmorphic sticky header with Dhemaji dealership branding, desktop nav links, tel call-out, and mobile slide-over drawer.
2. **Hero Section**: *"Your Journey. Your Freedom. Your E-Rickshaw."* with gradient emphasis, showroom status badges, and dual CTAs.
3. **Scroll-Driven Canvas Experience**: 269-frame sequence of 3 Kritika E-Rickshaws advancing along the highway, activating headlights and taxi signage, and accelerating past.
4. **Why Choose Us**: 6 cyber-card feature highlights with animated gradient borders and compliance disclaimers.
5. **E-Rickshaw Fleet Showcase**: Interactive showcase for Crimson Super DX, Jade Commuter Pro, and Cobalt Voyager Max with technical specifications and direct WhatsApp enquiry.
6. **Optional Accessories Hub**: Showcase for 7 accessories (Taxi Light, LED Effect Lights, Ambient LED Lights, Music System, Tire Cover, Rickshaw Protective Cover, Alloy Wheels).
7. **Financing Information**: Transparent 4-step partner workflow with strict disclaimers.
8. **About Us**: Showroom mission, Dhemaji roots, and driver empowerment pillars.
9. **Contact & Showroom Hub**: Physical address, direct telephone, email, embedded Google Map, and instant WhatsApp inquiry form.
10. **Footer**: Official copyright and attribution *"Designed with ❤️ by Victor Borah"*.

---

## 4. CI/CD & Deployment Pipeline

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`):

| Branch | Environment | Host | Target URL |
|---|---|---|---|
| `staging` | Staging | `website.kmflabz.space` | `https://kmflabz.space` |
| `master` | Production | `kritikafoundation.com` | `https://kritikafoundation.com` |

Secrets configured in GitHub Actions:
- `FTP_STAGING_SERVER`, `FTP_STAGING_USERNAME`, `FTP_STAGING_PASSWORD`
- `FTP_PROD_SERVER`, `FTP_PROD_USERNAME`, `FTP_PROD_PASSWORD`

---

## 5. Development

```bash
# Run locally
npm install
npm run dev

# Build static export
npm run build
```
