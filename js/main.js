console.log("main.js loaded");

/* ===============================
   SHOT FILTER STATE
================================ */
let currentShotFilter = "all"; // "all" | "favorites" | "learned"

function setShotFilter(filter) {
  currentShotFilter = filter;
  renderShotMenu();
}

/* ===============================
   FAVORITES SYSTEM
================================ */
const FAV_KEY = "tennis_favorites";

function loadFavorites() {
  const saved = localStorage.getItem(FAV_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveFavorites(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}

let favoritesState = loadFavorites();

function toggleFavorite(shotId) {
  favoritesState[shotId] = !favoritesState[shotId];
  saveFavorites(favoritesState);
  renderShotMenu();
}

/* ===============================
   PROGRESS TRACKING
================================ */
const STORAGE_KEY = "tennis_progress";

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

let progressState = loadProgress();

function toggleLearned(shotId) {
  progressState[shotId] = !progressState[shotId];
  saveProgress(progressState);
  renderShotMenu();
}

/* ===============================
   NAV BUTTONS
================================ */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;

    showView(view);

    if (view === "shots") {
      renderShotMenu();
    }

    if (view === "benefits") {
      renderBenefits();
    }

    if (view === "story") {
      renderStory();
    }

    if (view === "home") {
      renderHome();
    }

    setActiveNav(btn);
  });
});

/* ===============================
   LOGO → HOME
================================ */
const homeLogo = document.getElementById("homeLogo");

if (homeLogo) {
  homeLogo.addEventListener("click", () => {
    showView("home");
    renderHome();
    clearActiveNav();
  });
} else {
  console.error("homeLogo not found — check ID in HTML");
}

/* ===============================
   ACTIVE STATE
================================ */
function setActiveNav(activeBtn) {
  document.querySelectorAll(".nav-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  activeBtn.classList.add("active");
}

function clearActiveNav() {
  document.querySelectorAll(".nav-btn").forEach(btn =>
    btn.classList.remove("active")
  );
}

/* ===============================
   DEFAULT VIEW
================================ */
showView("home");
renderHome();

/* ===============================
   LIGHTBOX FOR IMAGES
================================ */
document.addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    openLightbox(e.target.src);
  }
});

function openLightbox(src) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `<img src="${src}">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

/* ===============================
   SEARCH
================================ */
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

/* ===============================
   BUILD SEARCH INDEX
================================ */
const searchIndex = [];

// Home
searchIndex.push({
  label: "Tennis (Home)",
  category: "Home",
  action: () => {
    showView("home");
    renderHome();
  }
});

// Shots
shotsData.forEach(shot => {
  searchIndex.push({
    label: shot.name,
    category: "Shot",
    action: () => {
      showView("shots");
      renderShotMenu();
      renderShotDetails(shot);
    }
  });
});

// Benefits
Object.keys(benefitsData).forEach(section => {
  searchIndex.push({
    label: `${section.charAt(0).toUpperCase() + section.slice(1)} Benefits`,
    category: "Benefits",
    action: () => {
      showView("benefits");
      renderBenefits();
    }
  });
});

// Story
searchIndex.push({
  label: "My Story",
  category: "Story",
  action: () => {
    showView("story");
    renderStory();
  }
});

/* ===============================
   SEARCH HANDLING
================================ */
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  searchResults.innerHTML = "";

  if (!query) {
    searchResults.classList.add("hidden");
    return;
  }

  const matches = searchIndex.filter(item =>
    item.label.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    searchResults.classList.add("hidden");
    return;
  }

  matches.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.label}
      <div class="category">${item.category || ""}</div>
    `;
    div.addEventListener("click", () => {
      item.action();
      clearSearch();
    });
    searchResults.appendChild(div);
  });

  searchResults.classList.remove("hidden");
});

/* ENTER KEY SUPPORT */
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const first = searchResults.querySelector("div");
    if (first) first.click();
  }
});

/* CLEAR SEARCH */
function clearSearch() {
  searchInput.value = "";
  searchResults.innerHTML = "";
  searchResults.classList.add("hidden");
}

/* ===============================
   HOME BUTTONS
================================ */
document.addEventListener("click", e => {
  if (e.target.id === "startTrainingBtn") {
    showView("shots");
    renderShotMenu();
  }

  if (e.target.id === "viewProgressBtn") {
    showView("shots");
    setShotFilter("learned");
  }
});
