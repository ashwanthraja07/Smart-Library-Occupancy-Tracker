# Design System — VIT Smart Library

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0d0d14` | Main background |
| `--color-bg-card` | `#13131f` | Card surfaces |
| `--color-purple` | `#8b5cf6` | Primary accent |
| `--color-blue` | `#3b82f6` | Secondary accent |
| `--color-green` | `#22c55e` | Available seats |
| `--color-red` | `#ef4444` | Occupied seats |
| `--color-border` | `rgba(255,255,255,0.07)` | Borders |

## Typography

- **Primary font**: Space Grotesk (headings, labels)
- **Body font**: Outfit (body text, descriptions)

## Components

- `AnimatedPage` — framer-motion page transition wrapper
- `LoadingSpinner` — animated spinner for data loading states
- `SidebarLayout` — header + floating bottom navigation
- `PasswordInput` — input with show/hide password toggle
- `Seat` — individual seat button (green=free, red=occupied)
- `SeatModal` — info popup with zone, comfort score, amenities

## Key UX Decisions

1. **No booking/reservation** — read-only seat viewing only
2. **Auto-refresh** — floors poll every 10s, seats every 5s
3. **JWT auth** — all protected routes require Bearer token
4. **localStorage** — token, name, regNumber, lastLogin, seatHistory
5. **Show/hide password** on all login forms
