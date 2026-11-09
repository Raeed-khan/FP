/* =========================================================
   YOUTH AWARE - MAIN JAVASCRIPT
   Developed by Raeed Khan
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ===============================
       1. PRELOADER
    =============================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hidden");
        }

        document.body.classList.add("page-loaded");
    }

    window.addEventListener("load", hidePreloader);

    // Fallback: hide preloader even if an animation script fails.
    setTimeout(hidePreloader, 3500);


    /* ===============================
       2. MOBILE NAVIGATION
    =============================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMobileMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("is-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", event => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });
    }


    /* ===============================
       3. HEADER SCROLL EFFECT
    =============================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* ===============================
       4. AI ASSISTANT PANEL
    =============================== */

    const aiLauncher = document.getElementById("ai-launcher");
    const aiPanel = document.getElementById("ai-panel");
    const aiClose = document.getElementById("ai-close");

    function openAI() {
        if (!aiPanel || !aiLauncher) return;

        aiPanel.classList.add("active");
        aiLauncher.setAttribute("aria-expanded", "true");
    }

    function closeAI() {
        if (!aiPanel || !aiLauncher) return;

        aiPanel.classList.remove("active");
        aiLauncher.setAttribute("aria-expanded", "false");
    }

    if (aiLauncher && aiPanel) {
        aiLauncher.addEventListener("click", () => {
            const isOpen = aiPanel.classList.contains("active");

            if (isOpen) {
                closeAI();
            } else {
                openAI();
            }
        });
    }

    if (aiClose) {
        aiClose.addEventListener("click", closeAI);
    }

    document.addEventListener("click", event => {
        if (
            aiPanel &&
            aiLauncher &&
            aiPanel.classList.contains("active") &&
            !aiPanel.contains(event.target) &&
            !aiLauncher.contains(event.target)
        ) {
            closeAI();
        }
    });


    /* ===============================
       5. KEYBOARD ESCAPE SUPPORT
    =============================== */

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMobileMenu();
            closeAI();
        }
    });


    /* ===============================
       6. SMOOTH SECTION NAVIGATION
    =============================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* ===============================
       7. SCROLL REVEAL ANIMATIONS
    =============================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }


    /* ===============================
       8. CONTACT FORM
    =============================== */

    const youthForm = document.getElementById("youthForm");

    if (youthForm) {
        youthForm.addEventListener("submit", event => {
            event.preventDefault();

            const submitButton = youthForm.querySelector(
                'button[type="submit"]'
            );

            let message = youthForm.querySelector(".form-status");

            if (!message) {
                message = document.createElement("p");
                message.className = "form-status";
                message.setAttribute("role", "status");
                youthForm.appendChild(message);
            }

            message.textContent =
                "Your form is not connected to a server yet. Please use the WhatsApp or email contact option.";

            message.style.marginTop = "15px";
            message.style.color = "#00e5ff";

            if (submitButton) {
                submitButton.blur();
            }
        });
    }


    /* ===============================
       9. CURRENT YEAR
    =============================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ===============================
       10. BUTTON INTERACTION
    =============================== */

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("pointerdown", () => {
            button.classList.add("button-pressed");
        });

        ["pointerup", "pointerleave", "pointercancel"].forEach(eventName => {
            button.addEventListener(eventName, () => {
                button.classList.remove("button-pressed");
            });
        });
    });


    /* ===============================
       11. ACCESSIBILITY
    =============================== */

    if (menuToggle && !menuToggle.hasAttribute("aria-label")) {
        menuToggle.setAttribute("aria-label", "Toggle navigation menu");
    }

    if (aiLauncher && !aiLauncher.hasAttribute("aria-label")) {
        aiLauncher.setAttribute("aria-label", "Open AI assistant");
    }


    /* ===============================
       12. WEBSITE READY
    =============================== */

    console.log(
        "%c YOUTH AWARE ",
        "background:#00e5ff;color:#050816;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c Building a Safer Digital Generation.",
        "color:#00e5ff;font-size:13px;"
    );

});