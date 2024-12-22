document.addEventListener('DOMContentLoaded', async () => {
  await loadMenu();

  // Function to load menu from JSON
  async function loadMenu() {
      try {
          const response = await fetch('./menu.json');
          const menuItems = await response.json();
          const menuContainer = document.querySelector('.menu');

          menuItems.forEach(item => {
              const menuItem = document.createElement('div');
              menuItem.className = 'menu-item';

              menuItem.innerHTML = `
                  <img src="./public/images/${item.image}" alt="${item.name}">
                  <h3>${item.name}</h3>
                  <p>${item.description}</p>
                  <button class="view-ar" data-model="${item.model}">View in AR</button>
              `;

              menuContainer.appendChild(menuItem);
          });

          initializeARButtons();
      } catch (error) {
          console.error("Failed to load menu:", error);
          alert("Unable to load the menu. Please try again later.");
      }
  }

  // Function to initialize AR buttons
  function initializeARButtons() {
      const arSupported = 'xr' in navigator;

      document.querySelectorAll('.view-ar').forEach(button => {
          button.addEventListener('click', (event) => {
              const model = event.target.getAttribute('data-model');
              if (arSupported) {
                  window.location.href = `./ar-viewer.html?model=${model}`;
              } else {
                  alert("AR is not supported on your device.");
              }
          });
      });
  }
});
