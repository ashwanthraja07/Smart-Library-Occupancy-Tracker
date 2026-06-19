/**
 * Tooltip Component
 * 
 * Usage:
 * const tooltip = new Tooltip({
 *   text: 'Hover over me!',
 *   content: 'This is helpful information',
 *   position: 'top' // 'top', 'bottom'
 * });
 * container.appendChild(tooltip.render());
 */

class Tooltip {
  constructor(options = {}) {
    this.text = options.text || 'Hover for info';
    this.content = options.content || 'Tooltip content';
    this.position = options.position || 'top';
  }

  render() {
    const container = document.createElement('div');
    container.className = 'tooltip-container';

    const trigger = document.createElement('span');
    trigger.className = 'tooltip-trigger';
    trigger.textContent = this.text;
    trigger.style.cursor = 'help';

    const tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.textContent = this.content;
    tooltipContent.style.bottom = this.position === 'top' ? 'calc(100% + 8px)' : 'auto';
    tooltipContent.style.top = this.position === 'bottom' ? 'calc(100% + 8px)' : 'auto';

    // Add click to toggle for mobile
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      container.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove('active');
      }
    });

    container.appendChild(trigger);
    container.appendChild(tooltipContent);
    this.element = container;
    return container;
  }

  show() {
    if (this.element) {
      this.element.classList.add('active');
    }
  }

  hide() {
    if (this.element) {
      this.element.classList.remove('active');
    }
  }

  setContent(content) {
    this.content = content;
    if (this.element) {
      const tooltipContent = this.element.querySelector('.tooltip-content');
      tooltipContent.textContent = content;
    }
  }
}
