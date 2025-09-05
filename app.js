// Utilidades
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ===== Menú lateral en móvil ===== */
const menuBtn = $("#menuToggle");
const sidebar = $("#sidebar");
if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}

/* ===== Buscador (demo, sin backend) ===== */
const searchForm = $("#searchForm");
const q = $("#q");
if (searchForm && q) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = q.value.trim();
    if (!term) {
      q.focus();
      q.setAttribute("aria-invalid", "true");
      q.setAttribute("title", "Escribe algo para buscar");
      return;
    }
    q.removeAttribute("aria-invalid");
    q.removeAttribute("title");
    // En un proyecto real redirigirías a /search?q=...
    alert(`Buscar: ${term}`);
  });

  // Atajo: "/" para enfocar buscador
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      q.focus();
      q.select();
    }
  });
}

/* ===== Filtros (chips) ===== */
const chips = $$(".chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    // Aquí podrías filtrar cards por data-attr
  });
});

/* ===== Tema claro/oscuro ===== */
const themeBtn = $("#themeToggle");
const THEMES = { LIGHT: "light", DARK: "dark", AUTO: "auto" };

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch {}
}

function nextTheme(current) {
  if (current === THEMES.AUTO) return THEMES.DARK;
  if (current === THEMES.DARK) return THEMES.LIGHT;
  return THEMES.AUTO;
}

if (themeBtn) {
  // Inicial
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch {}
  applyTheme(saved || THEMES.AUTO);

  // Toggle por clic (auto → dark → light → auto)
  themeBtn.addEventListener("click", () => {
    const curr = document.documentElement.getAttribute("data-theme") || THEMES.AUTO;
    const nxt = nextTheme(curr);
    applyTheme(nxt);
    themeBtn.setAttribute("aria-label", `Cambiar tema (actual: ${nxt})`);
  });
}

/* ===== Búsqueda por voz (simulada) ===== */
const voiceBtn = $("#voiceBtn");
if (voiceBtn) {
  voiceBtn.addEventListener("click", () => {
    // Para demo: notifica; en producción usar Web Speech API con permisos
    alert("Búsqueda por voz (demo).");
  });
}

/* ===== Acceder (demo) ===== */
const signInBtn = $("#signInBtn");
if (signInBtn) {
  signInBtn.addEventListener("click", () => alert("Autenticación (demo)."));
}

/* ===== Atajos extra ===== */
// g h → ir al inicio (demo)
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h" && e.ctrlKey) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});