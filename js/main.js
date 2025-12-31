console.log("main.js loaded");

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

