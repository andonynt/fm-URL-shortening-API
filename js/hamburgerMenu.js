
//-translate-y-full invisible opacity-0

const d = document;

const hamburgerMenu = (iconId, mobileNavBar) => {
  const $menu = d.getElementById(iconId),
  $mobileNavBar = d.getElementById(mobileNavBar);

  d.addEventListener('click', (e) => {
    if(e.target === $menu){
      $mobileNavBar.classList.toggle('-translate-y-full');
      $mobileNavBar.classList.toggle('invisible');
      $mobileNavBar.classList.toggle('opacity-0');
    }
  });
}

export default hamburgerMenu;
