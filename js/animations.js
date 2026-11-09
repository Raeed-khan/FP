/* =========================================================
   YOUTH AWARE - ADVANCED ANIMATIONS
   GSAP + ScrollTrigger + Lenis
   Developed by Raeed Khan
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const preloader = document.getElementById("preloader");

    function finishPreloader() {
        if (preloader) {
            preloader.classList.add("hidden");
        }
        document.body.classList.add("page-loaded");
    }

    // Always provide a fallback if animation libraries fail.
    setTimeout(finishPreloader, 3500);

    if (reduceMotion) {
        finishPreloader();
        return;
    }

    if (typeof gsap === "undefined") {
        console.warn("GSAP library not found. Using CSS animations.");
        finishPreloader();
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    } else if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
    }

    /* ===============================
       1. LENIS SMOOTH SCROLL
    =============================== */

    let lenis = null;

    if (typeof Lenis !== "undefined") {
        try {
            lenis = new Lenis({
                duration: 1.1,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.5
            });

            window.lenis = lenis;

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            if (typeof ScrollTrigger !== "undefined") {
                lenis.on("scroll", ScrollTrigger.update);
            }
        } catch (error) {
            console.warn("Lenis could not start:", error);
        }
    }

    /* ===============================
       2. PRELOADER ANIMATION
    =============================== */

    function hidePreloader() {
        if (!preloader) return;

        gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: finishPreloader
        });
    }

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, {
            once: true
        });
    }

    /* ===============================
       3. HERO INTRO ANIMATION
    =============================== */

    const heroElements = [
        ".hero-badge",
        ".hero-content h1",
        ".hero-description",
        ".hero-buttons",
        ".hero-metrics"
    ];

    const existingHeroElements = heroElements.filter(selector =>
        document.querySelector(selector)
    );

    if (existingHeroElements.length) {
        gsap.from(existingHeroElements, {
            opacity: 0,
            y: 35,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.2
        });
    }

    /* ===============================
       4. NAVBAR ANIMATION
    =============================== */

    const navbar = document.querySelector(".site-header");

    if (navbar) {
        gsap.from(navbar, {
            y: -35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    /* ===============================
       5. HERO FLOATING CARDS
    =============================== */

    const floatingCards = document.querySelectorAll(
        ".floating-card"
    );

    floatingCards.forEach((card, index) => {
        gsap.to(card, {
            y: index % 2 === 0 ? -12 : 12,
            duration: 2.5 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    /* ===============================
       6. SECTION REVEAL (SAFE & SMOOTH)
    =============================== */

    if (typeof ScrollTrigger !== "undefined") {
        gsap.utils.toArray(
            ".section-heading, .about-main-card, .about-feature-card, .program-card, .impact-box, .process-item, .team-card, .contact-wrapper"
        ).forEach(element => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 35
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        });
    }

    /* ===============================
       7. CARD HOVER EFFECTS
    =============================== */

    const cards = document.querySelectorAll(
        ".program-card, .team-card, .about-feature-card, .about-main-card"
    );

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -6,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    /* ===============================
       8. SCROLL PROGRESS BAR
    =============================== */

    let progressBar = document.querySelector(
        ".scroll-progress"
    );

    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "scroll-progress";

        Object.assign(progressBar.style, {
            position: "fixed",
            top: "0",
            left: "0",
            height: "3px",
            width: "0%",
            background: "linear-gradient(90deg, #00e5ff, #8b5cf6)",
            zIndex: "99999",
            pointerEvents: "none"
        });

        document.body.appendChild(progressBar);
    }

    function updateScrollProgress() {
        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();

    /* ===============================
       9. SCROLL TRIGGER REFRESH
    =============================== */

    window.addEventListener("load", () => {
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    });

    console.log("YouthAware advanced animations initialized successfully.");
});