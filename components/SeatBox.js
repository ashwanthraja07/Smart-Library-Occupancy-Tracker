/**
 * SeatBox Component
 * 
 * Usage:
 * const seat = new SeatBox({
 *   seatId: 'A-12',
 *   status: 'free', // 'free' or 'occupied'
 *   onClick: () => console.log('Seat clicked')
 * });
 * container.appendChild(seat.render());
 */

class SeatBox {
  constructor(options = {}) {
    this.seatId = options.seatId || 'A-1';
    this.status = options.status || 'free'; // 'free', 'occupied'
    this.onClick = options.onClick || (() => {});
    this.disabled = options.disabled || false;
    this.selected = options.selected || false;
  }

  render() {
    const button = document.createElement('button');
    button.className = `seat-box ${this.status}`;
    
    if (this.disabled) button.classList.add('disabled');
    if (this.selected) button.classList.add('selected');

    button.setAttribute('aria-label', `${this.seatId} - ${this.status}`);
    button.setAttribute('data-seat-id', this.seatId);
    
    // Icon based on status
    const icon = this.status === 'free' ? '✓' : '✕';
    button.textContent = icon;

    button.addEventListener('click', () => {
      if (!this.disabled) {
        this.onClick();
      }
    });

    this.element = button;
    return button;
  }

  setStatus(status) {
    this.status = status;
    if (this.element) {
      this.element.classList.remove('free', 'occupied');
      this.element.classList.add(status);
      const icon = status === 'free' ? '✓' : '✕';
      this.element.textContent = icon;
      this.element.setAttribute('aria-label', `${this.seatId} - ${status}`);
    }
  }

  setSelected(selected) {
    this.selected = selected;
    if (this.element) {
      if (selected) {
        this.element.classList.add('selected');
      } else {
        this.element.classList.remove('selected');
      }
    }
  }
}
