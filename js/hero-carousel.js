(function () {
    "use strict";

    const carousel = document.querySelector("[data-hero-carousel]");
    if (!carousel) return;

    const INTERVAL = 7000;
    const SWIPE_THRESHOLD = 50;
    const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
    const tabs = Array.from(carousel.querySelectorAll(".hero-tab"));
    const pauseButton = carousel.querySelector("[data-hero-pause]");
    const slidesArea = carousel.querySelector(".hero-slides");

    let current = 0;
    let timer = 0;
    let pausedByUser = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let held = false;
    let cycleStart = 0;
    let elapsedBeforeHold = 0;

    carousel.style.setProperty("--hero-interval", INTERVAL + "ms");

    function schedule(delay) {
        clearTimeout(timer);
        if (pausedByUser || held) return;
        timer = setTimeout(() => goTo(current + 1), delay);
    }

    function restartProgressBar() {
        const bar = tabs[current].querySelector(".hero-tab-progress");
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animation = "";
    }

    function startCycle() {
        cycleStart = performance.now();
        elapsedBeforeHold = 0;
        carousel.classList.toggle("is-playing", !pausedByUser);
        if (!pausedByUser) restartProgressBar();
        schedule(INTERVAL);
    }

    function goTo(index, focusTab) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === current;
            slide.classList.toggle("is-active", active);
            slide.inert = !active;
        });

        tabs.forEach((tab, i) => {
            const active = i === current;
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
        });

        if (focusTab) tabs[current].focus();
        startCycle();
    }

    function setHeld(value) {
        if (held === value) return;
        if (value) elapsedBeforeHold = performance.now() - cycleStart;
        else cycleStart = performance.now() - elapsedBeforeHold;
        held = value;
        carousel.classList.toggle("is-held", held);
        schedule(Math.max(600, INTERVAL - elapsedBeforeHold));
    }

    function setPaused(value) {
        pausedByUser = value;
        pauseButton.setAttribute("aria-pressed", String(value));
        pauseButton.setAttribute("aria-label", value ? "Play slideshow" : "Pause slideshow");
        startCycle();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => goTo(index, false));
        tab.addEventListener("keydown", (event) => {
            const target = {
                ArrowRight: index + 1,
                ArrowLeft: index - 1,
                Home: 0,
                End: slides.length - 1
            }[event.key];
            if (target === undefined) return;
            event.preventDefault();
            goTo(target, true);
        });
    });

    carousel.querySelector("[data-hero-prev]").addEventListener("click", () => goTo(current - 1, false));
    carousel.querySelector("[data-hero-next]").addEventListener("click", () => goTo(current + 1, false));
    pauseButton.addEventListener("click", () => setPaused(!pausedByUser));

    carousel.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") setHeld(true);
    });
    carousel.addEventListener("pointerleave", (event) => {
        if (event.pointerType === "mouse") setHeld(false);
    });
    carousel.addEventListener("focusin", () => setHeld(true));
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) setHeld(false);
    });
    document.addEventListener("visibilitychange", () => setHeld(document.hidden));

    let touchStart = null;

    slidesArea.addEventListener("touchstart", (event) => {
        touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }, { passive: true });

    slidesArea.addEventListener("touchend", (event) => {
        if (!touchStart) return;
        const dx = event.changedTouches[0].clientX - touchStart.x;
        const dy = event.changedTouches[0].clientY - touchStart.y;
        touchStart = null;
        const isHorizontalSwipe = Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5;
        if (isHorizontalSwipe) goTo(current + (dx < 0 ? 1 : -1), false);
    }, { passive: true });

    setPaused(pausedByUser);
})();