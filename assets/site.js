/* RLE Lab shared helpers: theme toggle + per-browser progress storage. */
(function () {
  const KEY = "rle-theme";
  /* localStorage first; if the browser blocks it (private mode, sandboxed previews),
     fall back to window.name, which survives reloads and page-to-page navigation in the same tab. */
  const nameBag = () => { try { const o = JSON.parse(window.name || "{}"); return o && typeof o === "object" ? o : {}; } catch (e) { return {}; } };
  const raw = {
    get(k) { try { const v = localStorage.getItem(k); if (v !== null) return v; } catch (e) {} const b = nameBag(); return k in b ? b[k] : null; },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} const b = nameBag(); b[k] = v; try { window.name = JSON.stringify(b); } catch (e) {} }
  };
  const store = {
    get(k, d) { const v = raw.get("rle-" + k); if (v === null) return d; try { return JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { raw.set("rle-" + k, JSON.stringify(v)); }
  };
  window.RLE = { store, raw };

  const ICON = {
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
  };
  const LABEL = { system: "Auto", light: "Day", dark: "Night" };
  function get() { return raw.get(KEY) || "system"; }
  function apply(mode) {
    const root = document.documentElement;
    /* our own attribute, so a host page that sets data-theme cannot override the visitor's choice */
    if (mode === "system") root.removeAttribute("data-mode"); else root.setAttribute("data-mode", mode);
    document.querySelectorAll("[data-theme-btn]").forEach(b => {
      b.innerHTML = ICON[mode] + "<span>" + LABEL[mode] + "</span>";
      b.setAttribute("aria-label", "Theme: " + LABEL[mode] + ". Click to change.");
    });
    window.dispatchEvent(new Event("themechange"));
  }
  document.addEventListener("DOMContentLoaded", () => {
    apply(get());
    document.querySelectorAll("[data-theme-btn]").forEach(b => b.addEventListener("click", () => {
      const order = ["system", "light", "dark"], next = order[(order.indexOf(get()) + 1) % 3];
      raw.set(KEY, next);
      apply(next);
    }));
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (get() === "system") window.dispatchEvent(new Event("themechange")); });
  });
})();
