/**
 * ProgressBar Component
 * 
 * Usage:
 * const progress = new ProgressBar({
 *   value: 65,
 *   color: 'gold', // 'gold', 'purple', 'green', 'red'
 *   showLabel: true
 * });
 * container.appendChild(progress.render());
 */

class ProgressBar {
  constructor(options = {}) {
    this.value = Math.min(Math.max(options.value || 0, 0), 100);
    this.color = options.color || 'gold'; // 'gold', 'purple', 'green', 'red'
    this.showLabel = options.showLabel !== false;
    this.animated = options.animated !== false;
  }

  render() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = 'var(--spacing-sm)';
    container.style.width = '100%';

    const bar = document.createElement('div');
    bar.className = 'progress-bar';

    const fill = document.createElement('div');
    fill.className = `progress-bar-fill ${this.color}`;
    fill.style.width = '0%';

    if (this.animated) {
      // Animate to value after render
      setTimeout(() => {
        fill.style.width = `${this.value}%`;
      }, 100);
    } else {
      fill.style.width = `${this.value}%`;
    }

    bar.appendChild(fill);

    if (this.showLabel) {
      const label = document.createElement('span');
      label.style.fontSize = 'var(--font-size-label-lg)';
      label.style.fontWeight = 'var(--font-weight-medium)';
      label.style.color = 'var(--color-on-surface)';
      label.textContent = `${this.value}%`;
      container.appendChild(label);
    }

    container.appendChild(bar);
    this.element = container;
    this.fillElement = fill;
    return container;
  }

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100);
    if (this.fillElement) {
      this.fillElement.style.width = `${this.value}%`;
    }
    const label = this.element?.querySelector('span');
    if (label) {
      label.textContent = `${this.value}%`;
    }
  }

  setColor(color) {
    this.color = color;
    if (this.fillElement) {
      this.fillElement.className = `progress-bar-fill ${color}`;
    }
  }
}
