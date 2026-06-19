/**
 * NavigationBar Component
 * 
 * Usage:
 * const nav = new NavigationBar({
 *   activeItem: 'floors',
 *   onItemClick: (item) => console.log('Clicked:', item)
 * });
 * document.body.appendChild(nav.render());
 */

class NavigationBar {
  constructor(options = {}) {
    this.activeItem = options.activeItem || 'floors'; // 'floors', 'seats', 'account'
    this.onItemClick = options.onItemClick || (() => {});
    
    this.items = [
      { id: 'floors', label: 'Floors', icon: 'layers' },
      { id: 'seats', label: 'My Seats', icon: 'event_seat' },
      { id: 'account', label: 'Account', icon: 'person' }
    ];
  }

  render() {
    const nav = document.createElement('nav');
    nav.className = 'navigation-bar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    this.items.forEach(item => {
      const navItem = document.createElement('a');
      navItem.className = 'nav-item';
      if (item.id === this.activeItem) {
        navItem.classList.add('active');
      }

      navItem.href = '#';
      navItem.setAttribute('data-item', item.id);
      navItem.setAttribute('role', 'tab');
      navItem.setAttribute('aria-selected', item.id === this.activeItem);

      const icon = document.createElement('span');
      icon.className = 'nav-item-icon material-symbols-outlined';
      icon.textContent = item.icon;

      const label = document.createElement('span');
      label.className = 'nav-item-label';
      label.textContent = item.label;

      navItem.appendChild(icon);
      navItem.appendChild(label);

      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActive(item.id);
        this.onItemClick(item.id);
      });

      nav.appendChild(navItem);
    });

    this.element = nav;
    return nav;
  }

  setActive(itemId) {
    this.activeItem = itemId;
    if (this.element) {
      const items = this.element.querySelectorAll('.nav-item');
      items.forEach(item => {
        const id = item.getAttribute('data-item');
        if (id === itemId) {
          item.classList.add('active');
          item.setAttribute('aria-selected', 'true');
        } else {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        }
      });
    }
  }
}
