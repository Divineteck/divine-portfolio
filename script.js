/* ================= TYPING EFFECT ================= */

const typingText = document.getElementById("typing-text");

const words = [
    "digital experiences.",
    "beautiful websites.",
    "creative designs.",
    "visual stories.",
    "brands that stand out."
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, characterIndex + 1);
        characterIndex++;

        if (characterIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, characterIndex - 1);
        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();



/* ================= DYNAMIC PROJECTS RENDERER ================= */

const projectsData = [
    {
        category: "WEB DESIGN",
        title: "Creative Portfolio",
        description: "A modern portfolio website built for a creative professional.",
        image: "images/project1.jpg"
    },
    {
        category: "BRANDING",
        title: "Brand Identity",
        description: "A complete visual identity created for a modern brand.",
        image: "images/project2.jpg"
    },
    {
        category: "PHOTOGRAPHY",
        title: "Creative Photography",
        description: "Professional photography and visual storytelling.",
        image: "images/project3.jpg"
    },
    {
        category: "AI CREATION",
        title: "AI Image Masterpieces",
        description: "Advanced AI prompt creation and visual storytelling.",
        image: "images/project4.jpg"
    },
    {
        category: "VIDEO EDITING",
        title: "Commercial Video Edit",
        description: "Engaging promotional video content for brands.",
        image: "images/project5.jpg"
    },
    {
        category: "GRAPHIC DESIGN",
        title: "Promotional Flyers",
        description: "High-conversion graphic design layouts for social platforms.",
        image: "images/project6.jpg"
    }
];

const projectsGrid = document.getElementById("projectsGrid");

if (projectsGrid) {
    projectsGrid.innerHTML = projectsData.map(project => `
        <div class="project-card reveal">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <span>${project.category}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </div>
    `).join('');
}



/* ================= SCROLL REVEAL (INTERSECTION OBSERVER) ================= */

const autoRevealElements = document.querySelectorAll(".section-heading, .about-text, .service-card, .project-card");
autoRevealElements.forEach(el => {
    if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
    }
});

const allRevealElements = document.querySelectorAll(".reveal");

const revealOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, revealOptions);

allRevealElements.forEach(element => {
    revealObserver.observe(element);
});



/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const navLinks = document.querySelectorAll("#navMenu a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
    });
});



/* ================= 3D CARD TILT INTERACTIVE EFFECT ================= */

const tiltCards = document.querySelectorAll(".project-card, .service-card, .stat");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
});



/* ================= PRELOADER, TYPING & ANIMATED DOTS ================= */

window.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const welcomeTypingEl = document.getElementById("welcomeTyping");
    const loadingStatusEl = document.getElementById("loadingStatus");
    
    const welcomeText = "WELCOME 🤗 TO DIVINE PORTFOLIO\nYOU WILL LOVE IT";
    let charIdx = 0;

    function typeWelcome() {
        if (welcomeTypingEl && charIdx < welcomeText.length) {
            welcomeTypingEl.textContent += welcomeText.charAt(charIdx);
            charIdx++;
            setTimeout(typeWelcome, 70);
        }
    }

    typeWelcome();

    let dotCount = 0;
    const loadingInterval = setInterval(() => {
        if (loadingStatusEl) {
            dotCount = (dotCount + 1) % 4;
            const dots = ".".repeat(dotCount);
            loadingStatusEl.textContent = `PLEASE WAIT${dots}`;
        }
    }, 500);

    setTimeout(() => {
        clearInterval(loadingInterval);
        if (preloader) {
            preloader.classList.add("fade-out");
            document.body.style.overflow = "auto";
        }
    }, 3500);
});



/* ================= SKILLS PROGRESS BAR ANIMATION ================= */

const skillsOptions = {
    root: null,
    threshold: 0.2
};

const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fillBars = entry.target.querySelectorAll('.progress-bar-fill');
            fillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            });
        } else {
            const fillBars = entry.target.querySelectorAll('.progress-bar-fill');
            fillBars.forEach(bar => {
                bar.style.width = '0%';
            });
        }
    });
}, skillsOptions);

const skillsContainer = document.getElementById('skillsContainer');
if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
}
