// script.js

// Helper to check if we're in dark mode
const isDarkMode = () => document.body.classList.contains('dark');

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards');
  const filterButtons  = document.querySelectorAll('.light-one .light');
  const themeToggle    = document.querySelector('.theme-toggle');
  const body           = document.body;
  const extContainer   = document.querySelector('.extention');
  const heading        = document.querySelector('.light-h, .dark-h');
  const modeButton     = document.querySelector('.light-moon, .dark-sun');
  const oneContainer   = document.querySelector('.one');

  // Build each card’s HTML using the current theme
  const createCardHTML = (extension) => {
    const cardTheme   = isDarkMode() ? 'dark-card'    : 'light-card';
    const btnTheme    = isDarkMode() ? 'dark'         : 'light';
    const sliderTheme = isDarkMode() ? 'slider-dark'  : 'slider-light';

    return `
      <div class="card ${cardTheme}" data-active="${extension.isActive}">
        <div class="content-card">
          <img src="${extension.logo}" alt="${extension.name}">
          <div>
            <h3>${extension.name}</h3>
            <p>${extension.description}</p>
          </div>
        </div>
        <div class="btn-card">
          <button class="${btnTheme}">Remove</button>
          <label class="switch">
            <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
            <span class="slider ${sliderTheme}"></span>
          </label>
        </div>
      </div>
    `;
  };

  // Render the cards based on the selected filter
  function renderCards(filter = 'all') {
    const filtered = filter === 'all'
      ? extensionsData
      : extensionsData.filter(ext => filter === 'active' ? ext.isActive : !ext.isActive);

    cardsContainer.innerHTML = filtered.map(createCardHTML).join('');
  }

  // Initial render
  renderCards();

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.textContent.toLowerCase());
    });
  });

  // Theme toggle click
  themeToggle.addEventListener('click', () => {
    const wasLight = body.classList.contains('light');

    // Toggle body theme classes
    body.classList.toggle('light', wasLight === false);
    body.classList.toggle('dark',  wasLight === true);

    // Swap extension container class
    if (extContainer) {
      extContainer.classList.toggle('light-extention', wasLight === false);
      extContainer.classList.toggle('dark-extention',  wasLight === true);
    }

    // Swap heading class
    heading.classList.replace(
      wasLight ? 'light-h' : 'dark-h',
      wasLight ? 'dark-h'  : 'light-h'
    );

    // Swap mode button class
    modeButton.classList.replace(
      wasLight ? 'light-moon' : 'dark-sun',
      wasLight ? 'dark-sun'   : 'light-moon'
    );

    // Swap .one container class
    oneContainer.classList.replace(
      wasLight ? 'light-one' : 'dark-one',
      wasLight ? 'dark-one'  : 'light-one'
    );

    // Swap filter buttons classes
    document.querySelectorAll('.one button').forEach(button => {
      button.classList.replace(
        wasLight ? 'light' : 'dark',
        wasLight ? 'dark'  : 'light'
      );
    });

    // Update the toggle icon
    const newIcon = wasLight ? 'icon-sun.svg' : 'icon-moon.svg';
    themeToggle.innerHTML = `<img src="assets/images/${newIcon}" 
                               alt="${wasLight ? 'Light mode' : 'Dark mode'}">`;

    // Re-render cards so each slider/button/card gets updated theme classes
    const activeFilter = document.querySelector('.one .active')?.textContent.toLowerCase() || 'all';
    renderCards(activeFilter);
  });
});
