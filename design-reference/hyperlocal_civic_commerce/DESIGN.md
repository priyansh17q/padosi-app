---
name: Hyperlocal Civic Commerce
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-currency:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-card:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-regular:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-semibold:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-numeric:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 2.5rem
  screen-margin-mobile: 1rem
  screen-margin-tablet: 1.5rem
  screen-margin-desktop: 2rem
  card-padding: 1rem
  gutter-mobile: 0.75rem
  bottom-nav-height: 4.5rem
  touch-target-min: 2.75rem
---

## Brand & Style
The brand personality balances institutional fintech security with neighborly warmth and civic agility. The interface targets urban and suburban community members—both task posters needing swift, reliable domestic support and neighborhood runners seeking verified local income. The emotional response must evoke safety, zero-friction escrow transparency, and immediate physical proximity. 

The aesthetic is Modern Tactile Minimalism with subtle layered depth:
- Crisp surfaces defined by ultra-fine structural borders rather than heavy drop shadows.
- Micro-interactions and touch targets calibrated for single-handed mobile navigation on the go.
- Clear distinction between financial/escrow metrics, geospatial indicators, and human trust signals (verification, ratings, community endorsements).

## Colors
The palette is engineered around high contrast, legible metric tracking, and local commerce safety:

- **Primary (`#059669` / `#10B981`):** Represents verified fulfillment, financial settlement, active tasks, and primary conversion pathways. Use `#059669` for text, primary CTA backgrounds, and icons requiring WCAG AAA contrast against light grounds. Use `#10B981` for active status indicators, progress bars, and vibrant highlights.
- **Secondary / Ink (`#0F172A` / `#1E293B`):** Establishes fintech-grade authority. `#0F172A` is reserved for critical numeric data (currency amounts, task payouts, time metrics) and major display typography. `#1E293B` is applied to body copy, icons, and structural frames.
- **Tertiary Accent (`#F59E0B`):** Warm Amber denotes temporal urgency, pending neighborhood escrow holds, and live counter-offers. Used sparingly to avoid visual fatigue.
- **Surface & Backgrounds:** The base viewport background uses Slate Light (`#F8FAFC`), while cards sit on pure White (`#FFFFFF`). Badge backdrops for verified statuses use Soft Mint (`#ECFDF5`) bordered by `#A7F3D0`. Subtle dividers and containment lines use `#E2E8F0`.

## Typography
Plus Jakarta Sans is utilized across all tiers for its open counters, contemporary geometric structure, and legibility at small sizes on mobile screens.

- **Currency & Numerics:** The Indian Rupee symbol (`₹`), payout values, and distance gauges are rendered in weights 700 and 800 with tight letter spacing (`-0.02em`) to ensure instant visual processing inside task feed items.
- **Proximity & Time Units:** Distances (e.g., `450 m`, `1.2 km`) and deadlines (`Within 30 mins`) use `label-numeric` set in tabular-friendly weights, ensuring numbers align cleanly when stacked.
- **Hierarchy Rules:** Display sizes never exceed 32px on viewport devices to prevent truncation of localized neighborhood street names and multi-line task summaries.

## Layout & Spacing
The layout model is mobile-first, fluid within container boundaries, and optimized for thumb-reach ergonomics:

- **Grid Architecture:** 4-column fluid layout for viewports up to 599px, expanding to 8 columns on tablets (600px–1023px), and a constrained 12-column system centered at a max width of 1140px for desktop portals.
- **Mobile Margins & Safe Areas:** A persistent 16px screen padding (`screen-margin-mobile`) flanks the content area. Safe-area-insets are respected for top status bars and bottom virtual home indicators.
- **Bottom Clearance Rhythm:** Because the marketplace relies on a fixed bottom navigation bar or sticky bid/accept CTA trays (`bottom-nav-height: 4.5rem`), scroll views enforce a mandatory `padding-bottom: 5.5rem` to prevent information occlusion.
- **Touch Targets:** All clickable entities (chips, counters, action pills) conform to a strict minimum touch target of 44px (`touch-target-min`).

## Elevation & Depth
This design system avoids heavy drop shadows in favor of a layered, tactile approach suitable for direct daylight readability:

- **Level 0 (Flat Surface):** Viewport background `#F8FAFC`. Zero elevation, zero shadow.
- **Level 1 (Feed & Content Cards):** Pure White `#FFFFFF` resting over `#F8FAFC`. Elevated by a structural 1px solid border (`#E2E8F0`) paired with an ultra-subtle, diffused ambient drop: `0px 1px 3px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Active/Pressed Cards & Dynamic Modals):** White `#FFFFFF` with a crisp border (`#CBD5E1`) and a dual-cast shadow: `0px 4px 12px rgba(15, 23, 42, 0.06), 0px 1px 2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Sticky Bottom CTAs & Floating Action Trays):** Pure White background with an upper separation hairline: border-top 1px solid `#E2E8F0`, underpinned by an elevation offset of `0px -4px 16px rgba(15, 23, 42, 0.06)`.
- **Level 4 (Escrow Shields & Floating Overlays):** Used for OTP verification prompts, runner tracking drawdowns, and settlement confirmations. Features a high-diffuse shadow: `0px 12px 32px rgba(15, 23, 42, 0.12)`.

## Shapes
A roundedness factor of 2 creates an approachable yet structured visual rhythm suited for neighborhood-scale logistics:

- **Base Cards & Modals:** Standardized with `rounded-xl` (1.5rem / 24px) for prominent marketplace cards, bottom sheets, and task containers. Nested elements (sub-tasks, price breakdowns) use `rounded-lg` (1rem / 16px).
- **Interactive Controls:** Standard inputs, search bars, and task category selectors use `rounded-lg` (1rem / 16px) or `rounded` (0.5rem / 8px).
- **Pills & Badges:** Metadata badges for radius distance (`350 m away`), verification checkmarks (`KYC Verified Neighbor`), and status counters use fully rounded pill geometry (`rounded-full` / `9999px`) to immediately demarcate functional tags from structural cards.

## Components

### Buttons
- **Primary Action (CTA):** Full-width or inline rounded pill (`rounded-full`), height 52px. Background `#059669` with bold white text. Active state drops scale to `0.98` with background darkening to `#047857` to provide physical touch response.
- **Secondary Action:** Transparent background, 1.5px solid border in `#0F172A`, text in `#0F172A`. Height 52px, `rounded-full`.
- **Urgent / Escrow Alert Action:** Warm Amber `#F59E0B` fill with `#0F172A` text for high contrast when instant action is needed (e.g., "Confirm Task Delivery", "Release ₹450").

### Task Cards
- **Architecture:** White background, 20px padding, 20px border-radius, bordered with 1px `#E2E8F0`.
- **Card Header:** Flex row containing the Task Title (`title-card`, `#0F172A`) on the left and the Task Payout (`display-currency`, `#059669`) on the right.
- **Metadata Tray:** Horizontal row of pill tags: Distance Pill (Slate Light bg, Slate Dark text), Time Pill (Amber Light bg, Amber Dark text), and Neighbor Trust Level (Mint bg, `#059669` text with micro check icon).
- **Card Footer:** Task requester thumbnail (36px circle), neighbor first name + street sector, and a micro action link or status state.

### Chips & Badges
- **Status Pills:** Height 26px, padding 4px 10px, font `label-badge`. 
  - *Verified Neighbor:* Fill `#ECFDF5`, border 1px `#A7F3D0`, text `#059669`.
  - *Urgent Delivery:* Fill `#FEF3C7`, border 1px `#FDE68A`, text `#B45309`.
  - *Distance Meter:* Fill `#F1F5F9`, border 1px `#E2E8F0`, text `#334155`.

### Input Fields
- **Marketplace Inputs:** Height 50px, `rounded-lg`, background `#FFFFFF`, border 1.5px solid `#CBD5E1`. Internal horizontal padding of 16px. Placeholder text `#94A3B8`.
- **Focus State:** Border changes to `#059669`, accompanied by a 3px soft mint outer ring (`rgba(5, 150, 105, 0.15)`).
- **Currency Entry:** Specialized input with prepended fixed `₹` symbol in `#0F172A`, large numeric font (`headline-md`), and inline increment helpers (`+₹50`, `+₹100`).

### Checkboxes & Selection Controls
- **Radio & Task Pickers:** 22px diameter. Selected state displays an outer ring in `#059669` with an inner 10px solid emerald dot.
- **Verification Sliders:** Tactile swipe-to-complete component for task handoffs, using a green handle traversing an `#ECFDF5` track with a locked chevron arrow.

### Bottom Navigation Bar
- Fixed at viewport bottom. Background pure white `#FFFFFF` with top border 1px solid `#E2E8F0`.
- 4 primary destinations: "Tasks Feed", "My Errand Runs", "Post Task", and "Wallet / Escrow".
- Active icons highlighted in `#059669` with a subtle 4px mint under-dot; inactive icons rendered in `#64748B`.