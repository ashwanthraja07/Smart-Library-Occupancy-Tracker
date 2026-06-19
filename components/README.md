# Component Library

Reusable, beginner-friendly components for the VIT Library Occupancy Tracker.

## Quick Start

1. **View the demo**: Open `components/index.html` in your browser to see all components in action.
2. **Use a component**: Copy the relevant `.js` file and the CSS files into your project.
3. **Import & use**: See examples below.

## Components

### 1. SeatBox
Represents a single library seat (free or occupied).

**File**: `SeatBox.js`

**Usage**:
```javascript
const seat = new SeatBox({
  seatId: 'A-12',           // Seat identifier
  status: 'free',           // 'free' or 'occupied'
  selected: false,          // Is it selected?
  disabled: false,          // Disable interaction?
  onClick: () => {          // Callback when clicked
    console.log('Seat clicked');
  }
});

// Render to DOM
container.appendChild(seat.render());

// Update state
seat.setStatus('occupied');
seat.setSelected(true);
```

**Props**:
- `seatId` (string): Unique seat identifier (e.g., "A-12")
- `status` (string): "free" or "occupied"
- `selected` (boolean): Whether the seat is currently selected
- `disabled` (boolean): Disable click interactions
- `onClick` (function): Called when seat is clicked

---

### 2. FloorCard
Displays a floor with occupancy info and progress bar.

**File**: `FloorCard.js`

**Usage**:
```javascript
const floor = new FloorCard({
  floorName: 'Ground Floor',
  zone: 'Quiet Study Zone',
  occupancyPercent: 65,
  availableSeats: 15,
  totalSeats: 42,
  onClick: () => {
    console.log('Floor card clicked');
  }
});

container.appendChild(floor.render());

// Update occupancy
floor.setOccupancy(70, 12); // 70% occupancy, 12 seats available
```

**Props**:
- `floorName` (string): Name of the floor
- `zone` (string): Study zone type
- `occupancyPercent` (number): 0-100 occupancy percentage
- `availableSeats` (number): Number of free seats
- `totalSeats` (number): Total seats on floor
- `onClick` (function): Called when card is clicked

---

### 3. ProgressBar
Shows a progress indicator with percentage.

**File**: `ProgressBar.js`

**Usage**:
```javascript
const progress = new ProgressBar({
  value: 65,              // 0-100
  color: 'gold',          // 'gold', 'purple', 'green', 'red'
  showLabel: true,        // Show percentage text?
  animated: true          // Animate on first render?
});

container.appendChild(progress.render());

// Update value
progress.setValue(80);
progress.setColor('red');
```

**Props**:
- `value` (number): 0-100 percentage
- `color` (string): "gold", "purple", "green", or "red"
- `showLabel` (boolean): Show percentage text
- `animated` (boolean): Animate the fill on first render

---

### 4. Tooltip
Shows helpful information on hover/click.

**File**: `Tooltip.js`

**Usage**:
```javascript
const tooltip = new Tooltip({
  text: 'Hover over me',           // Trigger text
  content: 'Helpful info here',    // Tooltip content
  position: 'top'                  // 'top' or 'bottom'
});

container.appendChild(tooltip.render());

// Control visibility
tooltip.show();
tooltip.hide();
tooltip.setContent('New content');
```

**Props**:
- `text` (string): Text that triggers the tooltip
- `content` (string): Content shown in tooltip
- `position` (string): "top" or "bottom" placement

---

### 5. NavigationBar
Fixed bottom navigation with 3 items: Floors, My Seats, Account.

**File**: `NavigationBar.js`

**Usage**:
```javascript
const nav = new NavigationBar({
  activeItem: 'floors',           // 'floors', 'seats', 'account'
  onItemClick: (itemId) => {
    console.log('Clicked:', itemId);
  }
});

document.body.appendChild(nav.render());

// Change active item
nav.setActive('seats');
```

**Props**:
- `activeItem` (string): Which nav item is currently active
- `onItemClick` (function): Called with item ID when clicked

---

## Styling

### Global Theme
All components use CSS custom properties for easy customization:

**File**: `theme.css`

Contains:
- **Colors**: Primary, secondary, surfaces, states
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Border radius**: Rounded corners
- **Shadows**: Depth effects

### Component Styles
**File**: `components.css`

Pre-built styles for all components. Includes:
- Hover/active states
- Responsive breakpoints (375px mobile, 768px tablet)
- Accessibility features (focus states, ARIA labels)

---

## Responsive Design

All components work on:
- **Mobile**: 375px width
- **Tablet**: 768px width
- **Desktop**: 1200px+ width

Responsive breakpoints are built into `components.css`.

---

## Integration Tips

### With HTML
```html
<script src="components/theme.css"></script>
<script src="components/components.css"></script>
<script src="components/SeatBox.js"></script>

<script>
  const seat = new SeatBox({ seatId: 'A-1', status: 'free' });
  document.body.appendChild(seat.render());
</script>
```

### With React (Future)
Each component's class structure makes it easy to convert to React:

```jsx
function SeatBoxComponent({ seatId, status, onClick }) {
  return (
    <button className={`seat-box ${status}`} onClick={onClick}>
      {status === 'free' ? '✓' : '✕'}
    </button>
  );
}
```

---

## File Structure

```
components/
├── theme.css          # Global colors, typography, spacing
├── components.css     # All component styles
├── SeatBox.js         # Seat component class
├── FloorCard.js       # Floor card component class
├── ProgressBar.js     # Progress bar component class
├── Tooltip.js         # Tooltip component class
├── NavigationBar.js   # Navigation bar component class
└── README.md          # This file
```

---

## Usage Notes

This package contains reusable component classes and shared styling.
- Include `theme.css` and `components.css` in your project.
- Include the component `.js` files where you need them.
- The global theme already imports fonts and defines color, spacing, and typography tokens.

---

## Tips for Customization

### Change Colors
Edit CSS custom properties in `theme.css`:
```css
:root {
  --color-purple: #2e004b;  /* Change primary color */
  --color-gold: #ffb21d;    /* Change accent color */
}
```

### Change Fonts
Update font families in `theme.css`:
```css
:root {
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Outfit", sans-serif;
}
```

### Adjust Spacing
Modify spacing values:
```css
:root {
  --spacing-md: 16px;  /* Increase for more space */
}
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

All components use vanilla JavaScript (ES6) with no dependencies.

---

## Questions?

Refer to the demo page (`index.html`) for working examples of every component!
