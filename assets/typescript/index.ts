// Navbar Logic
function activeNav(element: any): void {
    const MOBILE_MENU: HTMLElement | null = document.getElementById("mobile-menu");
    if (MOBILE_MENU && !MOBILE_MENU.classList.contains("hidden")) {
        toggleMobileMenu();
    }

    const ALL_LINKS: NodeListOf<HTMLElement> = document.querySelectorAll("#navbar a, #mobile-menu a");
    ALL_LINKS.forEach((link) => link.classList.remove("active"));

    element.classList.add("active");
}

function toggleMobileMenu(): void {
    const MOBILE_MENU: HTMLElement | null = document.getElementById("mobile-menu");
    if (!MOBILE_MENU) return;
    MOBILE_MENU.classList.toggle("hidden");

    if (!MOBILE_MENU.classList.contains("hidden")) {
        MOBILE_MENU.classList.add("fade");
        MOBILE_MENU.classList.remove("fadeOut");
        document.body.style.overflow = "hidden";
    } else {
        MOBILE_MENU.classList.remove("fade");
        MOBILE_MENU.classList.add("fadeOut");
        document.body.style.overflow = "auto";
    }
}

// Ketika scroll active class berubah
window.addEventListener("scroll", (): void => {
    let current: string | null = null;
    const SECTIONS: NodeListOf<HTMLElement> = document.querySelectorAll("section");
    const SCROLL_POS: number = window.scrollY || window.pageYOffset;

    SECTIONS.forEach((section: HTMLElement): void => {
        const SECTION_TOP: number = section.offsetTop;

        if (SCROLL_POS >= SECTION_TOP - 150) {
            current = section.getAttribute("id");
        }
    });

    const updateLinks = (selector: string): void => {
        document.querySelectorAll(selector).forEach((a) => {
            a.classList.remove("active");
            const href = a.getAttribute("href");
            if (href === `#${current}`) {
                a.classList.add("active");
            }
        });
    };

    updateLinks("#navbar a");
    updateLinks("#mobile-menu a");
});

//Button redirect logic
function redirectGame(gameType: string): void {
    switch (gameType) {
        case "clicker":
            window.location.href = "pages/clicker.html";
            break;
        case "rps":
            window.location.href = "pages/rps.html";
            break;
        case "pokemon":
            window.location.href = "pages/pokemon.html";
            break;
        default:
            window.location.href = "pages/clicker.html";
            break;
    }
}
