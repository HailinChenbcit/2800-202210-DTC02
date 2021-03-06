// Followed this video to implement the JS navbar and the smooth scrolling on the index.html
// https://www.youtube.com/watch?v=3-2Pj5hxwrw&t=135s&ab_channel=BrianDesign
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector(".navbar_menu");
const navLogo = document.querySelector('#navbar_logo');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
        const teamMenu = document.querySelector('#team-page');
    const aboutMenu = document.querySelector('#about-page');
    let scrollPos = window.scrollY;

    // adds "highlight" class to my menu items //
    if(window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        teamMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 750) {
        teamMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        aboutMenu.classList.remove("highlight");
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1200) {
        aboutMenu.classList.add("highlight");
        homeMenu.classList.remove('highlight');
        teamMenu.classList.remove('highlight');
        return;
    }

    if((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
        elem.classList.remove("highlight");
    }
};

window.addEventListener("scroll", highlightMenu);
window.addEventListener("click", highlightMenu);

// Close mobile menu
const hideMobileMenu = () => {
    const menuBars = document.querySelector(".is-active");
    if(window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle("is-active");
        menuLinks.classList.remove('active');
    }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);
