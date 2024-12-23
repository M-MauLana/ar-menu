document.addEventListener('DOMContentLoaded', async () => {
    await loadMenu();
  
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
  
    async function initializeARButtons() {
      const arSupported = 'xr' in navigator;
  
      document.querySelectorAll('.view-ar').forEach(button => {
        button.addEventListener('click', async (event) => {
          const modelPath = event.target.getAttribute('data-model');
          if (arSupported) {
            try {
              const permissionStatus = await navigator.permissions.query({ name: 'camera' });
  
              if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
                window.location.href = `./ar-viewer.html?model=${modelPath}`;
              } else {
                alert('Camera access is required for AR features. Please enable it in your browser settings.');
              }
            } catch (error) {
              console.error("Error accessing camera:", error);
              alert("AR features require camera access, but we couldn't activate it. Please try again.");
            }
          } else {
            alert("AR is not supported on your device or browser.");
          }
        });
      });
    }
  });
  