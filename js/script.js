const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('h4');

    gsap.set(title, { opacity: 0, y: 20 });
    gsap.set(img, { filter: "brightness(100%)" });

    item.addEventListener('mouseenter', () => {
        gsap.to(img, { filter: "brightness(40%)", duration: 0.5, ease: "power2.out", force3D: true });
        gsap.to(title, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(img, { filter: "brightness(100%)", duration: 0.5, ease: "power2.out" });
        gsap.to(title, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
    });
});

const buttons = document.querySelectorAll('.btn-general, .btn-secundario');

const darkColor = "#000000";
const lightColor = "#EEF0E6";

buttons.forEach(btn => {
    const icon = btn.querySelector('.btn-icon');
    const image = icon.querySelector('img');
    const text = btn.querySelector('span');
    const isGeneral = btn.classList.contains('btn-general');

    btn.addEventListener('mouseenter', () => {
        gsap.set(text, { zIndex: 20 });

        gsap.to(icon, { width: "100%", duration: 0.5, ease: "power2.out" });

        gsap.to(image, { opacity: 0, duration: 0.2 });

        gsap.to(text, { x: -20, duration: 0.5, ease: "power2.out" });

        if (isGeneral) {
            gsap.to(text, { color: lightColor, duration: 0.3 });
        } else {
            gsap.to(text, { color: darkColor, duration: 0.3 });
        }
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(icon, { width: "42px", duration: 0.5, ease: "power2.out" });

        gsap.to(image, { opacity: 1, duration: 0.3, delay: 0.1 });

        gsap.to(text, { x: 0, duration: 0.5, ease: "power2.out" });

        if (isGeneral) {
            gsap.to(text, { color: darkColor, duration: 0.3 });
        } else {
            gsap.to(text, { color: lightColor, duration: 0.3 });
        }
    });
});

const eventCards = document.querySelectorAll('.ed-card');
const eventsContainer = document.querySelector('.events-editorial');

let mmEvents = gsap.matchMedia();

mmEvents.add("(min-width: 769px)", () => {
    gsap.set(eventCards, { flex: 1 });

    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        const desc = card.querySelector('.ed-desc');

        gsap.to(card, {
            flex: 2,
            duration: 0.45,
            ease: "power2.out"
        });
        gsap.to(desc, {
            height: "auto",
            opacity: 1,
            marginBottom: 20,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.05
        });

        eventCards.forEach(c => {
            if (c !== card) {
                gsap.to(c, {
                    flex: 1,
                    duration: 0.45,
                    ease: "power2.out"
                });
                const d = c.querySelector('.ed-desc');
                gsap.to(d, { height: 0, opacity: 0, marginBottom: 0, duration: 0.3, overwrite: true });
            }
        });
    };

    const handleContainerLeave = () => {
        gsap.to(eventCards, {
            flex: 1,
            duration: 0.45,
            ease: "power2.out"
        });
        eventCards.forEach(c => {
            const d = c.querySelector('.ed-desc');
            gsap.to(d, { height: 0, opacity: 0, marginBottom: 0, duration: 0.3, overwrite: true });
        });
    };

    eventCards.forEach(card => {
        const desc = card.querySelector('.ed-desc');
        gsap.set(desc, { height: 0, opacity: 0, marginBottom: 0 });
        card.addEventListener('mouseenter', handleCardEnter);
    });

    if (eventsContainer) {
        eventsContainer.addEventListener('mouseleave', handleContainerLeave);
    }

    return () => {
        eventCards.forEach(card => {
            card.removeEventListener('mouseenter', handleCardEnter);
        });
        if (eventsContainer) {
            eventsContainer.removeEventListener('mouseleave', handleContainerLeave);
        }
        gsap.set(eventCards, { clearProps: "flex" });
        const allDescs = document.querySelectorAll('.ed-desc');
        gsap.set(allDescs, { clearProps: "height,opacity,marginBottom" });
    };
});


const navLinks = document.querySelectorAll('header nav ul li a');
if (navLinks.length > 0) {
    gsap.from(navLinks, {
        y: -15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
    });
}

gsap.registerPlugin(ScrollTrigger);

const fadeElements = document.querySelectorAll('h2, h3, p.intro-text, .destination-subtitulo-grid p');
fadeElements.forEach(el => {
    if (el.closest('.dest-overlay') || el.closest('.ed-content')) return;

    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

let mmGlobal = gsap.matchMedia();

mmGlobal.add("(min-width: 769px)", () => {

    const revealImages = document.querySelectorAll('.wonder-card > img, .home-segunda-seccion > img, .intro-right img');
    revealImages.forEach(img => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    const grids = document.querySelectorAll('.grid-gallery');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.grid-item, .dest-item');
        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    });
});

mmGlobal.add("(max-width: 768px)", () => {

    const revealImages = document.querySelectorAll('.wonder-card > img, .home-segunda-seccion > img, .intro-right img');
    revealImages.forEach(img => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 85%"
            },
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    const grids = document.querySelectorAll('.grid-gallery');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.grid-item, .dest-item');
        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power3.out"
            });
        }
    });
});

const textBoxes = document.querySelectorAll('.dest-overlay, .ed-content');
textBoxes.forEach(box => {
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

const parallaxTitles = document.querySelectorAll('.destination-titulo, .routes-titulo');
parallaxTitles.forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: 100,
        ease: "none"
    });
});

const consultSection = document.querySelector('.consult-experts');
if (consultSection) {
    const backImg = consultSection.querySelector('.consult-img-back');
    const frontImg = consultSection.querySelector('.consult-img-front');

    gsap.to(backImg, {
        scrollTrigger: {
            trigger: consultSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: -50,
        ease: "none"
    });

    gsap.to(frontImg, {
        scrollTrigger: {
            trigger: consultSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 50,
        ease: "none"
    });
}

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinksMobile = navMenu.querySelectorAll('a');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

const scrollBtn = document.createElement('button');
scrollBtn.classList.add('btn-scroll-top');
scrollBtn.innerHTML = '<img src="./svg/arrow.svg" alt="Up">';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 1080) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

