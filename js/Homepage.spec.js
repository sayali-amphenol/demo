const { test, expect } = require("@playwright/test");
const path = require("path");

const pageUrl = "file://" + path.resolve(__dirname, "../index.html");

async function openOffline(page) {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route(/^https?:/, (route) => route.abort());
    await page.goto(pageUrl);
    return errors;
}

test("loads without script errors and with one h1", async ({ page }) => {
    const errors = await openOffline(page);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".result-card").first()).toBeVisible();
    expect(errors).toEqual([]);
});

test("header turns solid after scrolling past the top", async ({ page }) => {
    await openOffline(page);
    const header = page.locator("#site-header");
    await expect(header).toHaveAttribute("data-overlay", "true");
    await page.mouse.wheel(0, 600);
    await expect(header).toHaveAttribute("data-overlay", "false");
});

test("mega menu opens on click and Escape closes it and restores focus", async ({ page }) => {
    await openOffline(page);
    const trigger = page.getByRole("button", { name: "Products", exact: true });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mega-products")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mega-products")).toBeHidden();
    await expect(trigger).toBeFocused();
});

test("clicking a menu that hover just opened keeps it open", async ({ page }) => {
    await openOffline(page);
    const trigger = page.getByRole("button", { name: "Markets", exact: true });
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await trigger.click();
    await expect(page.locator("#mega-markets")).toBeVisible();
});

test("product finder shows power products when filtering by product category", async ({ page }) => {
    await openOffline(page);
    await page.getByRole("tab", { name: "By product" }).click();
    await page.locator(".chip", { hasText: "Power distribution" }).click();

    const names = page.locator("[data-discover-results] .product-name");
    await expect(names).toHaveText(["nrgSMART®", "DC Power Panels", "Fuses and Breakers"]);
    await expect(page.locator("[data-discover-count]")).toHaveText("3 matching solutions");
    await expect(page.locator("[data-discover-explore]")).toHaveAttribute("href", "https://amphenol-ns.com/Our-Products/Power-Distribution");
});

test("data center market option links into the finalized product experience", async ({ page }) => {
    await openOffline(page);
    await expect(page.locator("[data-discover-explore]")).toHaveAttribute("href", "https://network-solution.netlify.app/?application=data-center");
});

test("arrow keys move between discovery tabs", async ({ page }) => {
    await openOffline(page);
    await page.getByRole("tab", { name: "By market" }).focus();
    await page.keyboard.press("ArrowRight");
    const productTab = page.getByRole("tab", { name: "By product" });
    await expect(productTab).toBeFocused();
    await expect(productTab).toHaveAttribute("aria-selected", "true");
});

test("search finds products by name and reports empty results", async ({ page }) => {
    await openOffline(page);
    await page.getByRole("button", { name: /Search products/ }).click();
    const input = page.locator("#search-input");
    await expect(input).toBeFocused();

    await input.fill("fibervault");
    const first = page.locator(".search-result a").first();
    await expect(first).toContainText("FiberVault®");
    await expect(first).toHaveAttribute("href", /FiberVault-Hyperscale-ODF/);

    await input.fill("zzqx");
    await expect(page.locator(".search-result")).toHaveCount(0);
    await expect(page.locator("#search-status")).toContainText("No results");
});

test("slash shortcut opens search and Escape closes it", async ({ page }) => {
    await openOffline(page);
    await page.keyboard.press("/");
    await expect(page.locator("#search-overlay")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#search-overlay")).toBeHidden();
});

test("unavailable images are replaced by a labelled placeholder with the target path", async ({ page }) => {
    await openOffline(page);
    const heroPlaceholder = page.locator(".rack-media .media-placeholder").first();
    await expect(heroPlaceholder).toContainText("assets/images/pivot-panel.webp");
});

test("in-page anchors all resolve to existing sections", async ({ page }) => {
    await openOffline(page);
    const missing = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href^="#"]'))
            .map((a) => a.getAttribute("href"))
            .filter((href) => href === "#" || !document.querySelector(href))
    );
    expect(missing).toEqual([]);
});

test.describe("mobile", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

    test("menu opens as a drawer with accordion sections", async ({ page }) => {
        await openOffline(page);
        const toggle = page.locator(".menu-toggle");
        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(page.locator("#primary-nav")).toBeVisible();

        await page.getByRole("button", { name: "Markets", exact: true }).click();
        await expect(page.getByRole("link", { name: "Outside Plant", exact: true })).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
    });

    test("page does not scroll horizontally", async ({ page }) => {
        await openOffline(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
    });
});

test.describe("hero carousel", () => {
    test("next button and tabs switch slides and only the active slide is interactive", async ({ page }) => {
        await openOffline(page);
        const slides = page.locator(".hero-slide");
        await expect(slides).toHaveCount(4);
        await expect(slides.nth(0)).toHaveClass(/is-active/);

        await page.getByRole("button", { name: "Next slide" }).click();
        await expect(slides.nth(1)).toHaveClass(/is-active/);
        await expect(page.getByRole("tab", { name: /FiberVault/ })).toHaveAttribute("aria-selected", "true");
        await expect(slides.nth(1).getByRole("link", { name: "Explore FiberVault®" })).toBeVisible();
        expect(await slides.nth(0).evaluate((el) => el.inert)).toBe(true);

        await page.getByRole("tab", { name: /nrgSMART/ }).click();
        await expect(slides.nth(3)).toHaveClass(/is-active/);
    });

    test("previous wraps from the first slide to the last", async ({ page }) => {
        await openOffline(page);
        await page.getByRole("button", { name: "Previous slide" }).click();
        await expect(page.locator(".hero-slide").nth(3)).toHaveClass(/is-active/);
    });

    test("arrow keys move between slide tabs", async ({ page }) => {
        await openOffline(page);
        await page.getByRole("tab", { name: /Core to edge/ }).focus();
        await page.keyboard.press("ArrowRight");
        const fiberVaultTab = page.getByRole("tab", { name: /FiberVault/ });
        await expect(fiberVaultTab).toBeFocused();
        await page.keyboard.press("End");
        await expect(page.getByRole("tab", { name: /nrgSMART/ })).toBeFocused();
    });

    test("advances automatically and stops when paused", async ({ page }) => {
        await page.clock.install();
        await openOffline(page);
        const slides = page.locator(".hero-slide");
        await page.clock.runFor(7100);
        await expect(slides.nth(1)).toHaveClass(/is-active/);

        await page.getByRole("button", { name: "Pause slideshow" }).click();
        await page.mouse.move(700, 2);
        await page.evaluate(() => document.activeElement.blur());
        await page.clock.runFor(20000);
        await expect(slides.nth(1)).toHaveClass(/is-active/);
        await expect(page.getByRole("button", { name: "Play slideshow" })).toHaveAttribute("aria-pressed", "true");
    });

    test("does not autoplay when the user prefers reduced motion", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.clock.install();
        await openOffline(page);
        await page.clock.runFor(20000);
        await expect(page.locator(".hero-slide").nth(0)).toHaveClass(/is-active/);
    });
});