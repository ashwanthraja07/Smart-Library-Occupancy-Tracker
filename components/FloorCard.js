/**
 * FloorCard Component
 * 
 * Usage:
 * const floor = new FloorCard({
 *   floorName: 'Ground Floor',
 *   occupancyPercent: 65,
 *   availableSeats: 15,
 *   totalSeats: 42,
 *   onClick: () => console.log('Floor selected')
 * });
 * container.appendChild(floor.render());
 */

class FloorCard {
  constructor(options = {}) {
    this.floorName = options.floorName || 'Floor 1';
    this.occupancyPercent = options.occupancyPercent || 50;
    this.availableSeats = options.availableSeats || 20;
    this.totalSeats = options.totalSeats || 40;
    this.onClick = options.onClick || (() => {});
    this.zone = options.zone || 'Study Zone';
  }

  render() {
    const card = document.createElement('div');
    card.className = 'floor-card';

    const header = document.createElement('div');
    header.className = 'floor-card-header';

    const title = document.createElement('h3');
    title.className = 'floor-card-title';
    title.textContent = this.floorName;

    const subtitle = document.createElement('p');
    subtitle.className = 'floor-card-subtitle';
    subtitle.textContent = this.zone;

    header.appendChild(title);
    header.appendChild(subtitle);

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-bar-fill gold';
    progressFill.style.width = `${this.occupancyPercent}%`;
    
    progressBar.appendChild(progressFill);

    // Occupancy info
    const occupancy = document.createElement('div');
    occupancy.className = 'floor-card-occupancy flex justify-between items-center';

    const occupancyLabel = document.createElement('span');
    occupancyLabel.className = 'floor-card-occupancy-label';
    occupancyLabel.textContent = `${this.availableSeats} of ${this.totalSeats} seats`;

    const occupancyPercent = document.createElement('span');
    occupancyPercent.className = 'floor-card-occupancy-percent';
    occupancyPercent.textContent = `${this.occupancyPercent}%`;

    occupancy.appendChild(occupancyLabel);
    occupancy.appendChild(occupancyPercent);

    card.appendChild(header);
    card.appendChild(progressBar);
    card.appendChild(occupancy);

    card.addEventListener('click', () => this.onClick());
    card.style.cursor = 'pointer';

    this.element = card;
    return card;
  }

  setOccupancy(percent, availableSeats = null) {
    this.occupancyPercent = percent;
    if (availableSeats) this.availableSeats = availableSeats;
    
    if (this.element) {
      const progressFill = this.element.querySelector('.progress-bar-fill');
      progressFill.style.width = `${percent}%`;

      const occupancyPercent = this.element.querySelector('.floor-card-occupancy-percent');
      occupancyPercent.textContent = `${percent}%`;

      if (availableSeats) {
        const occupancyLabel = this.element.querySelector('.floor-card-occupancy-label');
        occupancyLabel.textContent = `${availableSeats} of ${this.totalSeats} seats`;
      }
    }
  }
}
