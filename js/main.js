console.log("main.js loaded"); 
document.querySelectorAll(".nav-btn").forEach(btn => { btn.addEventListener("click", () => { showView(btn.dataset.view); }); });
 renderShotMenu(); 
 renderBenefits();
  renderStory(); 
  showView("shots");