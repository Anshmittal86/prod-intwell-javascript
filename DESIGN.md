---
name: Aetheric Digital
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4a454f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7b7480'
  outline-variant: '#ccc3d1'
  surface-tint: '#6f4f98'
  primary: '#0f0024'
  on-primary: '#ffffff'
  primary-container: '#2d0a54'
  on-primary-container: '#9978c4'
  inverse-primary: '#d9b9ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#0a0614'
  on-tertiary: '#ffffff'
  tertiary-container: '#231d2d'
  on-tertiary-container: '#8c8498'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eedcff'
  primary-fixed-dim: '#d9b9ff'
  on-primary-fixed: '#290450'
  on-primary-fixed-variant: '#56377e'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#e9def5'
  tertiary-fixed-dim: '#cdc2d9'
  on-tertiary-fixed: '#1e1929'
  on-tertiary-fixed-variant: '#4a4456'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-padding: 120px
---

## Brand & Style

The design system is engineered for a high-end web development agency that bridges the gap between technical rigor and avant-garde creativity. It targets enterprise-level clients and ambitious startups who view their digital presence as an investment rather than a cost.

The aesthetic is a fusion of **Minimalism** and **Glassmorphism**. It utilizes expansive white space to denote luxury and focus, punctuated by deep purple accents that suggest intelligence and sophistication. The interface feels ethereal yet grounded, using translucent layers and soft background blurs to create a sense of three-dimensional depth within a clean, modern framework. The emotional response is one of absolute confidence, precision, and "award-winning" technical mastery.

## Colors

The palette is anchored by **Imperial Purple** (#2D0A54), a deep, authoritative shade used for primary branding and high-contrast text. This is complemented by **Electric Violet** (#7C3AED) for interactive states and vibrant accents. 

To achieve the "award-winning" glassmorphism look, the system uses a tiered white approach. Pure white (#FFFFFF) serves as the primary canvas, while semi-transparent surface colors create the frosted glass effect. Functional neutrals (Black and Slate) are reserved strictly for body text and subtle borders to maintain the clean, airy atmosphere.

## Typography

This design system uses a dual-type approach to balance modern precision with approachability. **Hanken Grotesk** is the voice of the brand—used for headlines with tight tracking and heavy weights to create a commanding, editorial feel. 

**Plus Jakarta Sans** is used for all functional text. Its soft, humanist curves provide a necessary warmth that balances the sharp headlines. For ultra-premium layouts, utilize the "label-caps" style for small eyebrow text or category tags to create a rhythmic, structured hierarchy.

## Layout & Spacing

The layout philosophy is based on a **Fluid Grid** with generous, intentional breathing room. The 12-column grid uses wide 24px gutters, but the defining characteristic is the vertical rhythm—sections are separated by massive 120px gaps to allow each piece of content to be consumed without distraction.

On mobile, the margins tighten to 20px, and the grid collapses to a single column, but the "whitespace-first" approach remains. Key elements like hero images or glass cards should occasionally break the grid or bleed to the edges to create a dynamic, modern energy.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism** and multi-layered blurs rather than traditional shadows. 

1.  **The Glass Layer:** Elevated elements (cards, modals) use a semi-transparent background (`rgba(255, 255, 255, 0.7)`) with a `backdrop-filter: blur(20px)`.
2.  **The Ghost Border:** Instead of a shadow, use a 1px solid white border with 20% opacity to define the edge of the glass element.
3.  **Vibrant Glows:** For the highest elevation, place soft, large-scale radial gradients of Primary Purple behind glass elements to create a "glowing" depth effect.
4.  **Shadows:** When used, shadows must be "Ambient"—very large blur radius (40px+), very low opacity (5%), and tinted with the primary purple color to avoid a muddy look.

## Shapes

The shape language is refined and "Soft-Modern." The standard radius is 0.5rem (8px), providing a clean, professional edge. For larger structural components like testimonials or service cards, use the `rounded-xl` (1.5rem/24px) setting to emphasize the friendly, high-tech nature of the brand. Interactive elements like buttons should remain consistent with the container they inhabit to maintain a unified visual language.

## Components

### Buttons
Primary buttons are solid Imperial Purple with white text, using a subtle hover scale effect (1.02x). Secondary buttons use a glass background with a subtle border. All buttons utilize a 0.3s ease-in-out transition for all states.

### Cards
Cards are the primary expression of the brand's style. They must feature the glassmorphism effect: backdrop blur, semi-transparent white background, and a faint white inner border. Content inside cards should have generous internal padding (min 32px).

### Input Fields
Inputs are minimalist. Use a subtle bottom border or a very light grey background with no border. On focus, the border transitions to a 2px Electric Violet line with a soft outer glow.

### Chips & Tags
Use the `label-caps` typography style. Chips should have a light purple background (10% opacity) with Primary Purple text, or be fully glass-styled when appearing on dark backgrounds.

### Smooth Animations
Interactions should feel liquid. Use "staggered entry" animations for list items and "fade-in-up" transitions for section headers as the user scrolls. Background blurs should subtly shift or rotate on mouse-move to enhance the tactile glass feel.