(function () {
  "use strict";

  const data = window.ANS_DATA;
  const desktopQuery = window.matchMedia("(min-width: 1024px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const header = document.getElementById("site-header");
  const menuToggle = header.querySelector(".menu-toggle");
  const navTriggers = Array.from(header.querySelectorAll(".nav-trigger"));

  /* ---------- Header state ---------- */

  let openTrigger = null;
  let openedAt = 0;
  let hoverTimer = 0;

  function updateHeaderOverlay() {
    const atTop = window.scrollY < 24;
    const menuOpen = header.classList.contains("is-menu-open");
    header.dataset.overlay = String(atTop && !openTrigger && !menuOpen);
  }

  let scrollQueued = false;
  window.addEventListener("scroll", () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      updateHeaderOverlay();
    });
  }, { passive: true });

  /* ---------- Mega menu ---------- */

  function panelFor(trigger) {
    return document.getElementById(trigger.getAttribute("aria-controls"));
  }

  function openPanel(trigger) {
    if (openTrigger && openTrigger !== trigger) closePanel(openTrigger);
    clearTimeout(hoverTimer);
    if (openTrigger !== trigger) openedAt = performance.now();
    trigger.setAttribute("aria-expanded", "true");
    panelFor(trigger).hidden = false;
    openTrigger = trigger;
    updateHeaderOverlay();
  }

  function closePanel(trigger) {
    clearTimeout(hoverTimer);
    trigger.setAttribute("aria-expanded", "false");
    panelFor(trigger).hidden = true;
    if (openTrigger === trigger) openTrigger = null;
    updateHeaderOverlay();
  }

  navTriggers.forEach((trigger) => {
    const item = trigger.closest(".nav-item");

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      const justOpenedByHover = performance.now() - openedAt < 400;
      if (isOpen && !justOpenedByHover) closePanel(trigger);
      else openPanel(trigger);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      openPanel(trigger);
      panelFor(trigger).querySelector("a")?.focus();
    });

    item.addEventListener("pointerenter", (event) => {
      if (!desktopQuery.matches || event.pointerType !== "mouse") return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => openPanel(trigger), openTrigger ? 0 : 120);
    });

    item.addEventListener("pointerleave", (event) => {
      if (!desktopQuery.matches || event.pointerType !== "mouse") return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        if (openTrigger === trigger) closePanel(trigger);
      }, 200);
    });
  });

  document.addEventListener("click", (event) => {
    if (openTrigger && desktopQuery.matches && !header.contains(event.target)) closePanel(openTrigger);
  });

  header.addEventListener("focusout", (event) => {
    if (!openTrigger || !desktopQuery.matches) return;
    const nextFocus = event.relatedTarget;
    if (nextFocus && !openTrigger.closest(".nav-item").contains(nextFocus)) closePanel(openTrigger);
  });

  /* ---------- Mobile menu ---------- */

  function setMenu(open) {
    header.classList.toggle("is-menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (!open && openTrigger) closePanel(openTrigger);
    updateHeaderOverlay();
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!header.classList.contains("is-menu-open"));
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
    if (openTrigger) closePanel(openTrigger);
  });

  header.querySelectorAll(".primary-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!desktopQuery.matches) setMenu(false);
    });
  });

  /* ---------- Search ---------- */

  const overlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchStatus = document.getElementById("search-status");
  const suggestions = overlay.querySelector("[data-search-suggestions]");
  let searchReturnFocus = null;
  let activeResult = -1;

  function openSearch(trigger) {
    searchReturnFocus = trigger || document.activeElement;
    if (openTrigger) closePanel(openTrigger);
    overlay.hidden = false;
    document.body.classList.add("is-locked");
    searchInput.focus();
    renderSearch(searchInput.value);
  }

  function closeSearch() {
    overlay.hidden = true;
    if (!header.classList.contains("is-menu-open")) document.body.classList.remove("is-locked");
    searchReturnFocus?.focus();
  }

  function normalize(text) {
    return text.toLowerCase().normalize("NFKD").replace(/[®™]/g, "");
  }

  function scoreEntry(entry, terms) {
    const title = normalize(entry.title);
    const haystack = title + " " + normalize(entry.detail + " " + entry.type + " " + entry.keywords);
    let score = 0;
    for (const term of terms) {
      if (!haystack.includes(term)) return 0;
      if (title.startsWith(term)) score += 4;
      else if (title.includes(term)) score += 2;
      else score += 1;
    }
    return score;
  }

  function highlight(element, text, terms) {
    const lower = normalize(text);
    const firstTerm = terms.find((term) => lower.includes(term));
    if (!firstTerm) {
      element.textContent = text;
      return;
    }
    const start = lower.indexOf(firstTerm);
    const mark = document.createElement("mark");
    mark.textContent = text.slice(start, start + firstTerm.length);
    element.append(text.slice(0, start), mark, text.slice(start + firstTerm.length));
  }

  function renderSearch(query) {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    searchResults.replaceChildren();
    activeResult = -1;
    suggestions.hidden = terms.length > 0;

    if (!terms.length) {
      searchStatus.textContent = "";
      return;
    }

    const matches = data.searchIndex
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter((match) => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    searchStatus.textContent = matches.length
      ? `${matches.length} result${matches.length === 1 ? "" : "s"} for “${query.trim()}”`
      : `No results for “${query.trim()}”. Try a product name such as PIVOT, or browse all products.`;

    for (const { entry } of matches) {
      const item = document.createElement("li");
      item.className = "search-result";
      const link = document.createElement("a");
      link.href = entry.url;

      const type = document.createElement("span");
      type.className = "search-result-type";
      type.textContent = entry.type;

      const title = document.createElement("span");
      title.className = "search-result-title";
      highlight(title, entry.title, terms);

      const detail = document.createElement("span");
      detail.className = "search-result-detail";
      detail.textContent = entry.detail;

      link.append(type, title, detail);
      item.append(link);
      searchResults.append(item);
    }
  }

  function moveActiveResult(step) {
    const items = searchResults.querySelectorAll(".search-result");
    if (!items.length) return;
    items[activeResult]?.classList.remove("is-active");
    activeResult = (activeResult + step + items.length) % items.length;
    items[activeResult].classList.add("is-active");
    items[activeResult].scrollIntoView({ block: "nearest" });
  }

  searchInput.addEventListener("input", () => renderSearch(searchInput.value));

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") { event.preventDefault(); moveActiveResult(1); }
    if (event.key === "ArrowUp") { event.preventDefault(); moveActiveResult(-1); }
    if (event.key === "Enter" && activeResult >= 0) {
      event.preventDefault();
      searchResults.querySelectorAll(".search-result a")[activeResult].click();
    }
  });

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", () => openSearch(button));
  });

  overlay.querySelector("[data-search-close]").addEventListener("click", closeSearch);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeSearch();
  });

  overlay.querySelectorAll("[data-search-term]").forEach((button) => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.searchTerm;
      renderSearch(searchInput.value);
      searchInput.focus();
    });
  });

  overlay.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = overlay.querySelectorAll("input, button:not([hidden]), a[href]");
    const visible = Array.from(focusable).filter((el) => el.offsetParent !== null);
    const first = visible[0];
    const last = visible[visible.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  document.addEventListener("keydown", (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable;

    if (event.key === "Escape") {
      if (!overlay.hidden) { closeSearch(); return; }
      if (header.classList.contains("is-menu-open")) { setMenu(false); menuToggle.focus(); return; }
      if (openTrigger) { const trigger = openTrigger; closePanel(trigger); trigger.focus(); }
      return;
    }

    const shortcut = (event.key === "/" && !typing) || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey));
    if (shortcut && overlay.hidden) {
      event.preventDefault();
      openSearch(document.activeElement);
    }
  });

  /* ---------- Image fallback ---------- */

  function showPlaceholder(img) {
    if (img.dataset.failed) return;
    img.dataset.failed = "true";
    const placeholder = document.createElement("span");
    placeholder.className = "media-placeholder";
    const label = document.createElement("strong");
    label.textContent = img.alt || "Product image";
    const path = document.createElement("code");
    path.textContent = img.dataset.local || img.src;
    placeholder.append(label, path);
    img.hidden = true;
    img.after(placeholder);
  }

  function watchImage(img) {
    if (img.complete && img.naturalWidth === 0) showPlaceholder(img);
    else img.addEventListener("error", () => showPlaceholder(img), { once: true });
  }

  document.querySelectorAll("img[data-local]").forEach(watchImage);

  /* ---------- Product discovery ---------- */

  const discoverPanel = document.getElementById("discover-panel");
  const tabs = Array.from(document.querySelectorAll('.segmented [role="tab"]'));
  const optionsRow = discoverPanel.querySelector("[data-discover-options]");
  const resultsList = discoverPanel.querySelector("[data-discover-results]");
  const summaryTitle = discoverPanel.querySelector("[data-discover-title]");
  const summaryText = discoverPanel.querySelector("[data-discover-summary]");
  const summaryCount = discoverPanel.querySelector("[data-discover-count]");
  const exploreLink = discoverPanel.querySelector("[data-discover-explore]");

  const categoryGlyph = '<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="6" y="10" width="108" height="16"/><rect x="6" y="32" width="108" height="16"/><rect x="6" y="54" width="108" height="16"/><path d="M16 18h40M16 40h40M16 62h40"/></svg>';

  const state = { mode: "market", optionId: data.discovery.market[0].id };

  function currentOption() {
    return data.discovery[state.mode].find((option) => option.id === state.optionId);
  }

  function buildResultCard(item) {
    const li = document.createElement("li");
    li.className = "result-card";

    const link = document.createElement("a");
    link.className = "product-link";
    link.href = item.url;

    const media = document.createElement("span");
    media.className = "product-media";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 600;
      img.height = 450;
      img.dataset.local = item.localImage;
      media.append(img);
      watchImage(img);
    } else {
      const glyph = document.createElement("span");
      glyph.className = "category-glyph";
      glyph.innerHTML = categoryGlyph;
      media.append(glyph);
    }

    const body = document.createElement("span");
    body.className = "product-body";

    const family = document.createElement("span");
    family.className = "product-family";
    family.textContent = item.family;

    const name = document.createElement("span");
    name.className = "product-name";
    name.textContent = item.name;

    const description = document.createElement("span");
    description.className = "product-desc";
    description.textContent = item.description;

    body.append(family, name, description);

    if (item.keySpec) {
      const spec = document.createElement("span");
      spec.className = "product-spec";
      spec.textContent = item.keySpec;
      body.append(spec);
    }

    const cta = document.createElement("span");
    cta.className = "product-cta";
    cta.innerHTML = 'View details<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';
    body.append(cta);

    link.append(media, body);
    li.append(link);
    return li;
  }

  function renderOptions() {
    optionsRow.replaceChildren();
    for (const option of data.discovery[state.mode]) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.option = option.id;
      chip.setAttribute("aria-pressed", String(option.id === state.optionId));

      chip.append(option.label);
      chip.addEventListener("click", () => selectOption(option.id));
      optionsRow.append(chip);
    }
  }

  function renderResults() {
    const option = currentOption();
    const items = option.items.map((id) => data.catalogById.get(id));

    summaryTitle.textContent = option.label;
    summaryText.textContent = option.summary;
    summaryCount.textContent = `${items.length} matching ${items.length === 1 ? "solution" : "solutions"}`;
    exploreLink.href = option.exploreUrl;
    exploreLink.textContent = option.exploreLabel;

    const cards = items.map(buildResultCard);
    const animate = !reducedMotion.matches;
    if (animate) cards.forEach((card) => card.classList.add("is-entering"));
    resultsList.replaceChildren(...cards);
    resultsList.scrollLeft = 0;

    if (!animate) return;
    requestAnimationFrame(() => {
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 45}ms`;
        card.classList.remove("is-entering");
      });
    });
  }

  function selectOption(optionId) {
    state.optionId = optionId;
    optionsRow.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.option === optionId));
    });
    renderResults();
  }

  function selectMode(mode, moveFocus) {
    state.mode = mode;
    state.optionId = data.discovery[mode][0].id;
    tabs.forEach((tab) => {
      const selected = tab.dataset.mode === mode;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) {
        discoverPanel.setAttribute("aria-labelledby", tab.id);
        if (moveFocus) tab.focus();
      }
    });
    renderOptions();
    renderResults();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectMode(tab.dataset.mode, false));
    tab.addEventListener("keydown", (event) => {
      const keyStep = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!keyStep) return;
      event.preventDefault();
      const next = tabs[(index + keyStep + tabs.length) % tabs.length];
      selectMode(next.dataset.mode, true);
    });
  });

  renderOptions();
  renderResults();

  /* ---------- Scroll reveal ---------- */

  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll("[data-reveal]").forEach((element, index) => {
      element.style.setProperty("--stagger", String(index % 4));
    });
  });

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  updateHeaderOverlay();
})();