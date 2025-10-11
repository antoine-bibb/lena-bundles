// src/utils/theme.js
const STORAGE_KEY = "theme"; // "light" | "dark" | "auto"

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme) {
  const root = document.documentElement; // <html>
  if (theme === "dark" || (theme === "auto" && getSystemPrefersDark())) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
}

export function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY) || "auto";
}

export function setSavedTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function toggleTheme() {
  const current = getSavedTheme();
  const next = current === "dark" ? "light" : "dark";
  setSavedTheme(next);
  return next;
}

// initialize once on app load
export function initTheme() {
  applyTheme(getSavedTheme());
  // react to OS changes if user uses "auto"
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => {
    if (getSavedTheme() === "auto") applyTheme("auto");
  };
  if (media.addEventListener) media.addEventListener("change", listener);
  else media.addListener(listener); // Safari
}
