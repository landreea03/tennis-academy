console.log("main.js loaded");

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
  });
});
