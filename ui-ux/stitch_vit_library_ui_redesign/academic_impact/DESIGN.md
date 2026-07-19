---
name: Academic Impact
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2f2'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e7'
  surface-container-highest: '#e6e1e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4c4450'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#7e7481'
  outline-variant: '#cfc2d1'
  surface-tint: '#7d45a2'
  primary: '#2e004b'
  on-primary: '#ffffff'
  primary-container: '#4a0e6f'
  on-primary-container: '#ba7fe0'
  inverse-primary: '#e4b5ff'
  secondary: '#805600'
  on-secondary: '#ffffff'
  secondary-container: '#ffb21d'
  on-secondary-container: '#6b4800'
  tertiary: '#281700'
  on-tertiary: '#ffffff'
  tertiary-container: '#442a00'
  on-tertiary-container: '#b8905c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f4daff'
  primary-fixed-dim: '#e4b5ff'
  on-primary-fixed: '#2f004c'
  on-primary-fixed-variant: '#632c88'
  secondary-fixed: '#ffddaf'
  secondary-fixed-dim: '#ffba44'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#614000'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ebbf87'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5f4114'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e1'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 24px
  lg: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

This design system employs a high-energy **Neo-Brutalist** aesthetic tailored for a high-density university environment. The personality is authoritative yet vibrant, designed to cut through visual noise with absolute structural clarity. 

The visual narrative is defined by:
- **Raw Geometry:** Every container is a defined block, rejecting organic "softness" for mechanical precision.
- **Comic-Strip Depth:** The UI avoids realistic lighting. Instead, it uses "hard shadows"—solid, unblurred offsets that create a physical, tactile presence on the screen.
- **Honest Construction:** 1px grey borders and bold charcoal outlines act as the scaffolding of the interface, making the layout feel engineered rather than decorated.
- **Interactive Haptics:** Elements should physically "click" or compress (using Y-axis translation) when pressed, mimicking the physical resistance of real-world buttons.

## Colors

The palette uses high-contrast "categorical" colors to signal hierarchy and state instantly.

- **Primary (Academic Purple):** Used for key branding, active navigation states, and primary call-to-action buttons.
- **Secondary (Gold):** Used for high-visibility highlights, focus states, and secondary visual interest.
- **Neutral (Charcoal):** Applied to all borders, typography, and hard shadows to provide a consistent structural anchor.
- **Status Colors:**
    - **Free:** Use vibrant emerald for icons/indicators. For backgrounds (e.g., seat cards), use a 10% opacity tint of this green.
    - **Occupied:** Use sharp crimson for icons/indicators. For backgrounds, use a 10% opacity tint of this red.
- **Surface:** The background remains a stark white to ensure maximum legibility of the fine 1px grey borders.

## Typography

The typography strategy pairs a mechanical, technical display face with a clean, approachable humanist body face.

- **Space Grotesk (Headings):** Used for all titles and headers. It should feel "designed" and structured. Use uppercase sparingly for section labels to increase the "Brutalist" feel.
- **Outfit (Body/Labels):** Used for all data entry, descriptions, and metadata. Its high x-height ensures legibility even when compressed into small seat cards or map legends.
- **Weight Usage:** Stick to `700` for main headings and `400` for body text. Avoid thin weights as they disappear against the bold border language of the design system.

## Layout & Spacing

The system follows a strict **fixed-width container philosophy** for mobile-first utility, centered within a wider viewport for desktop.

- **Grid:** A 12-column system is used, but elements usually span the full width (12) or halves (6).
- **Gutter & Margins:** A 16px safe area is maintained on all mobile screens.
- **Rhythm:** Spacing between related items (label to input) should be 8px (`xs`). Spacing between distinct sections or cards should be 24px (`md`).
- **Responsive Reflow:** On desktop, cards for library sections or seat maps should tile horizontally in a 2 or 3-column grid, while maintaining their fixed aspect ratios.

## Elevation & Depth

This system rejects all forms of blurring, transparency, and ambient light. Depth is communicated through **Bold Outlines and Hard Shadows**.

- **Borders:** Every interactive element or container must have a 1px solid border. Use `#1C1B1B` (Charcoal) for interactive elements and a lighter grey for static container separators.
- **Hard Shadows:** Use solid offsets with 100% opacity. 
    - **Default:** `4px 4px 0px 0px #1C1B1B`
    - **Large (Modals):** `8px 8px 0px 0px #1C1B1B`
- **Active State:** When an element is pressed, it should translate `2px` down and `2px` right, while the shadow reduces by the same amount, simulating a physical button press.

## Shapes

The design system uses a **Sharp (0px)** shape language. This reinforces the "Brutalist" architecture of the VIT Library app.

- **Containers:** All cards, buttons, and inputs must have 90-degree corners.
- **Exceptions:** Very small UI indicators like status dots or notification badges may use a 100% "full" roundedness to contrast against the otherwise rigid grid.

## Components

- **Buttons:** Large, high-contrast blocks. Primary buttons use the Purple background with White text and a Charcoal hard shadow. Secondary buttons use a White background with Charcoal text and border.
- **Input Fields:** Stark white rectangles with a 1px Charcoal border. Labels sit strictly above the input. Focus state is indicated by a Primary Purple 1px border.
- **Cards:** Used for library floor details or seat blocks. Must have the standard 1px border and 4px hard shadow.
- **Status Chips:** Small rectangular boxes with 1px borders. Use the light tint backgrounds (#2ECC71 or #E74C3C at 10% opacity) with the full-strength color for the text and a small leading icon.
- **Seat Map Nodes:** Square blocks. 
    - **Free:** White background, 1px green border, green text.
    - **Occupied:** Light red tint background, 1px red border, red text.
- **Lists:** Items are separated by 1px grey horizontal rules with no vertical padding between the rule and the text, creating a "ledger" look.