const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('h4');

    // Set initial state
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

// Button Animations
const buttons = document.querySelectorAll('.btn-general, .btn-secundario');

// Colors from CSS variables
const darkColor = "#000000";
const lightColor = "#EEF0E6";

buttons.forEach(btn => {
    const icon = btn.querySelector('.btn-icon');
    const image = icon.querySelector('img');
    const text = btn.querySelector('span');
    const isGeneral = btn.classList.contains('btn-general');

    // Mouse Enter
    btn.addEventListener('mouseenter', () => {
        // Ensure text is on top
        gsap.set(text, { zIndex: 20 });

        // Expand icon background
        gsap.to(icon, { width: "100%", duration: 0.5, ease: "power2.out" });

        // Hide arrow
        gsap.to(image, { opacity: 0, duration: 0.2 });

        // Center text correction (moving left to compensate padding)
        gsap.to(text, { x: -20, duration: 0.5, ease: "power2.out" });

        // Color contrast
        if (isGeneral) {
            // Dark button -> Light text
            gsap.to(text, { color: lightColor, duration: 0.3 });
        } else {
            // Light button -> Dark text
            gsap.to(text, { color: darkColor, duration: 0.3 });
        }
    });

    // Mouse Leave
    btn.addEventListener('mouseleave', () => {
        // Shrink icon background
        gsap.to(icon, { width: "42px", duration: 0.5, ease: "power2.out" });

        // Show arrow
        gsap.to(image, { opacity: 1, duration: 0.3, delay: 0.1 });

        // Reset text position
        gsap.to(text, { x: 0, duration: 0.5, ease: "power2.out" });

        // Reset color
        if (isGeneral) {
            gsap.to(text, { color: darkColor, duration: 0.3 });
        } else {
            gsap.to(text, { color: lightColor, duration: 0.3 });
        }
    });
});

// Events Section Animations
const eventCards = document.querySelectorAll('.ed-card');
const eventsContainer = document.querySelector('.events-editorial');
let mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    // Desktop Setup

    // Initial State
    gsap.set(eventCards, { flex: 1 });

    // Define Handlers
    const handleCardEnter = (e) => {
        const card = e.currentTarget;
        const desc = card.querySelector('.ed-desc');

        // Active Card
        gsap.to(card, {
            flex: 1.7, // Reduced expansion to prevent "descuadre"
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

        // Siblings
        eventCards.forEach(c => {
            if (c !== card) {
                gsap.to(c, {
                    flex: 1, // Keep siblings readable, don't shrink them aggressively
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

    // Attach Listeners
    eventCards.forEach(card => {
        const desc = card.querySelector('.ed-desc');
        gsap.set(desc, { height: 0, opacity: 0, marginBottom: 0 }); // Ensure initial state
        card.addEventListener('mouseenter', handleCardEnter);
    });

    if (eventsContainer) {
        eventsContainer.addEventListener('mouseleave', handleContainerLeave);
    }

    // Cleanup
    return () => {
        eventCards.forEach(card => {
            card.removeEventListener('mouseenter', handleCardEnter);
            gsap.set(card, { clearProps: "all" });
            const desc = card.querySelector('.ed-desc');
            gsap.set(desc, { clearProps: "all" });
        });
        if (eventsContainer) {
            eventsContainer.removeEventListener('mouseleave', handleContainerLeave);
        }
    };
});

// Nav Entrance Animation
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

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// 1. General Title & Text Fade Up
const fadeElements = document.querySelectorAll('h2, h3, p.intro-text, .destination-intro-grid p');
fadeElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// 2. Image Reveal (Scale Up)
const revealImages = document.querySelectorAll('.wonder-card > img, .iguazu-falls > img, .intro-right img, .dest-item img');
revealImages.forEach(img => {
    gsap.from(img, {
        scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// 3. Stagger Grids (Routes, Gallery)
const grids = document.querySelectorAll('.grid-gallery, .destination-grid');
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

// 4. Parallax Effect for Destination Titles (Big Text)
const parallaxTitles = document.querySelectorAll('.destination-title, .routes-title');
parallaxTitles.forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: 100, // Move down slightly slower than scroll
        ease: "none"
    });
});

// 5. Consult Experts Interaction
const consultSection = document.querySelector('.consult-experts');
if (consultSection) {
    const backImg = consultSection.querySelector('.consult-img-back');
    const frontImg = consultSection.querySelector('.consult-img-front');

    // Parallax differentiation
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
