// =========================
// 1. Typing animation
// =========================

const typingText = document.getElementById("typing-text");

const roles = [
    "CSE Student",
    "Python Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentRole.slice(0, characterIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1200;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion) {
    typingText.textContent = roles[0];
} else {
    typeEffect();
}


// =========================
// 2. Light and dark theme
// =========================

const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();
});


// =========================
// 3. Mobile navigation
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationItems = navLinks.querySelectorAll("a");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigationItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});


// =========================
// 4. Project filtering
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const selected = item === button;

            item.classList.toggle("active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        projectCards.forEach((card) => {
            const categories = card.dataset.category.split(" ");
            const matches =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            card.classList.toggle("is-hidden", !matches);
        });
    });
});

filterButtons.forEach((button) => {
    button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
    );
});


// =========================
// 5. Scroll reveal animation
// =========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// =========================
// 6. Copy email button
// =========================

const copyEmailButton = document.getElementById("copy-email");
const copyMessage = document.getElementById("copy-message");

copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    if (email.includes("PLACEHOLDER")) {
        copyMessage.textContent =
            "Add your real email address in index.html first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(email);
        copyMessage.textContent = "Email copied to clipboard!";
    } catch (error) {
        copyMessage.textContent =
            "Copy unavailable. Email: " + email;
    }
});


// =========================
// 7. Automatic copyright year
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();