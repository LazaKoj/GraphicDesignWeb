document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-button');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        const navList = document.querySelector('.nav-right');
        if (!menuOpen) {
            menuToggle.classList.add('open');
            navList.classList.remove('fade-out');
            navList.classList.add('active');
            menuOpen = true;
        } else {
            menuToggle.classList.remove('open');
            navList.classList.remove('active');
            navList.classList.add('fade-out');
            setTimeout(() => {
                navList.classList.remove('fade-out');
            }, 1000); 
            menuOpen = false;
        }
    });
});
