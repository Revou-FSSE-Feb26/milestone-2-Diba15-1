// Navbar Logic
function activeNav(element) {
    const MOBILE_MENU = document.getElementById('mobile-menu');
    if (!MOBILE_MENU.classList.contains('hidden')) {
        toggleMobileMenu();
    }

    const ALL_LINKS = document.querySelectorAll('#navbar a, #mobile-menu a');
    ALL_LINKS.forEach(link => link.classList.remove('active'));

    element.classList.add('active');
}

function toggleMobileMenu() {
    const MOBILE_MENU = document.getElementById('mobile-menu');
    MOBILE_MENU.classList.toggle('hidden');

    if (!MOBILE_MENU.classList.contains('hidden')) {
        MOBILE_MENU.classList.add('fade');
        MOBILE_MENU.classList.remove('fadeOut');
        document.body.style.overflow = 'hidden';
    } else {
        MOBILE_MENU.classList.remove('fade');
        MOBILE_MENU.classList.add('fadeOut');
        document.body.style.overflow = 'auto';
    }
}

// Ketika scroll active class berubah
window.addEventListener('scroll', () => {
    let current = "";
    const SECTIONS = document.querySelectorAll('section');
    const SCROLL_POS = window.scrollY || window.pageYOffset;

    SECTIONS.forEach(section => {
        const SECTION_TOP = section.offsetTop;

        if (SCROLL_POS >= (SECTION_TOP - 150)) {
            current = section.getAttribute('id');
        }
    });

    const updateLinks = (selector) => {
        document.querySelectorAll(selector).forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href === `#${current}`) {
                a.classList.add('active');
            }
        });
    };

    updateLinks('#navbar a');
    updateLinks('#mobile-menu a');
});

//Button redirect logic
function redirectGame(gameType) {
    switch (gameType) {
        case "clicker":
            window.location.href = 'pages/clicker.html';
            break;
        case "rps":
            window.location.href = 'pages/rps.html';
            break;
        case "pokemon":
            window.location.href = 'pages/pokemon.html';
            break;
        default:
            window.location.href = 'pages/clicker.html';
            break;
    }
}