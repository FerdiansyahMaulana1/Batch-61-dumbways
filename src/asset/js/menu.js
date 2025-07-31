
  document.addEventListener("DOMContentLoaded", function () {
    const drawer = document.getElementById('mobile-drawer');
    const openButton = document.getElementById('mobile-menu-button');
    const closeButton = document.getElementById('close-drawer');
    const backdrop = drawer.querySelector('div.bg-black');

    openButton.addEventListener('click', () => {
        console.log("Drawer button clicked");
      drawer.classList.remove('invisible');
      backdrop.classList.remove('opacity-0');
      drawer.querySelector('.transform').classList.remove('translate-x-full');
    });

    const closeDrawer = () => {
      backdrop.classList.add('opacity-0');
      drawer.querySelector('.transform').classList.add('translate-x-full');
      setTimeout(() => {
        drawer.classList.add('invisible');
      }, 300);
    };

    closeButton.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
  });

