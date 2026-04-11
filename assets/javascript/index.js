// Navbar Logic
function activeNav(element) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }

    const allLinks = document.querySelectorAll('#navbar a, #mobile-menu a');
    allLinks.forEach(link => link.classList.remove('active'));

    element.classList.add('active');
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');

    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('fade');
        mobileMenu.classList.remove('fadeOut');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('fade');
        mobileMenu.classList.add('fadeOut');
        document.body.style.overflow = 'auto';
    }
}

// Ketika scroll active class berubah
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (scrollPos >= (sectionTop - 150)) {
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