document.addEventListener('DOMContentLoaded', async () => {
    await loadMenu();
    initializeARButtons();
  
    function initializeARButtons() {
      const arSupported = 'xr' in navigator;
  
      document.querySelectorAll('.view-ar').forEach(button => {
        button.addEventListener('click', async (event) => {
          const model = event.target.getAttribute('data-model');
          const modelViewer = document.getElementById('model-viewer');
          const loadingContainer = document.getElementById('loading-container');
          const arViewer = document.getElementById('ar-viewer');
  
          if (arSupported) {
            try {
              loadingContainer.classList.remove('hidden');
              modelViewer.src = `./public/models/${model}`;
              arViewer.classList.remove('hidden');
              modelViewer.addEventListener('load', () => {
                loadingContainer.classList.add('hidden');
              });
            } catch (error) {
              loadingContainer.classList.add('hidden');
              alert('Failed to load AR model.');
              console.error(error);
            }
          } else {
            alert("AR is not supported on your device.");
          }
        });
      });
    }
  
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
      } catch (error) {
        console.error("Failed to load menu:", error);
        alert("Unable to load the menu. Please try again later.");
      }
    }
  });
  