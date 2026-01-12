const appViews = document.querySelectorAll(".view");
const shotMenu = document.getElementById("shotMenu");
const shotDisplay = document.getElementById("shotDisplay");

/* ===============================
   VIEW HANDLING
================================ */
function showView(id) {
  appViews.forEach(view => view.classList.add("hidden"));

  const target = document.getElementById(id);
  if (target) {
    target.classList.remove("hidden");
  }
}

/* ===============================
   SHOTS
================================ */
function renderShotMenu() {
  shotMenu.innerHTML = "";
  shotDisplay.innerHTML = "";

  // --- FILTER BUTTONS ---
  const filterBar = document.createElement("div");
  filterBar.className = "shot-filters";

  filterBar.innerHTML = `
    <button class="filter-btn ${currentShotFilter === "all" ? "active" : ""}">All</button>
    <button class="filter-btn ${currentShotFilter === "favorites" ? "active" : ""}">⭐ Favorites</button>
    <button class="filter-btn ${currentShotFilter === "learned" ? "active" : ""}">✅ Learned</button>
  `;

  const [allBtn, favBtn, learnedBtn] = filterBar.querySelectorAll("button");

  allBtn.addEventListener("click", () => setShotFilter("all"));
  favBtn.addEventListener("click", () => setShotFilter("favorites"));
  learnedBtn.addEventListener("click", () => setShotFilter("learned"));

  shotMenu.appendChild(filterBar);

  // --- FILTER LOGIC ---
  let visibleShots = shotsData;

  if (currentShotFilter === "favorites") {
    visibleShots = shotsData.filter(s => favoritesState[s.id]);
  }

  if (currentShotFilter === "learned") {
    visibleShots = shotsData.filter(s => progressState[s.id]);
  }

  // --- RENDER SHOTS ---
  visibleShots.forEach(shot => {
    const btn = document.createElement("button");
    btn.className = "shot-btn";

    const learned = progressState[shot.id];
    const favorite = favoritesState[shot.id];

    btn.innerHTML = `
      ${shot.name}
      ${learned ? " ✔" : ""}
      ${favorite ? " ⭐" : ""}
    `;

    btn.addEventListener("click", () => renderShotDetails(shot));
    shotMenu.appendChild(btn);
  });

  renderProgressSummary();
}


function renderProgressSummary() {
  const learnedCount = shotsData.filter(s => progressState[s.id]).length;
  const total = shotsData.length;
  const percent = Math.round((learnedCount / total) * 100);

  const summary = document.createElement("div");
  summary.className = "progress-summary";
  summary.innerHTML = `
    <strong>Progress:</strong> ${learnedCount}/${total} shots learned (${percent}%)
  `;

  shotMenu.prepend(summary);
}

function renderShotDetails(shot) {
  const isLearned = progressState[shot.id];
  const isFavorite = favoritesState[shot.id];

  shotDisplay.innerHTML = `
    <div class="card">
      <img src="${shot.image}" alt="${shot.name}" loading="lazy">
    </div>

    <div class="card">
      <h2>${shot.name}</h2>

      <div>
        <button class="learn-btn">
          ${isLearned ? "✅ Marked as Learned" : "📘 Mark as Learned"}
        </button>

        <button class="fav-btn">
          ${isFavorite ? "⭐ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>

      <p><strong>Difficulty:</strong> ${shot.difficulty}</p>
      <p>${shot.description}</p>

      <div class="shot-tabs">
        <div class="shot-tab active" data-tab="technique">Technique</div>
        <div class="shot-tab" data-tab="mistakes">Mistakes</div>
        <div class="shot-tab" data-tab="drills">Drills</div>
        <div class="shot-tab" data-tab="tips">Tips</div>
      </div>

      <div id="tabContent" class="tab-content"></div>
    </div>
  `;

  // MARK AS LEARNED BUTTON LOGIC
  const learnBtn = shotDisplay.querySelector(".learn-btn");
  learnBtn.addEventListener("click", () => {
    toggleLearned(shot.id);
    renderShotDetails(shot);
  });

  // FAVORITE BUTTON LOGIC
  const favBtn = shotDisplay.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    toggleFavorite(shot.id);
    renderShotDetails(shot);
  });

  // Tabs logic
  renderTabContent("technique", shot);

  const tabs = shotDisplay.querySelectorAll(".shot-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const tabName = tab.dataset.tab;
      renderTabContent(tabName, shot);
    });
  });
}



function renderTabContent(tab, shot) {
  const container = document.getElementById("tabContent");

  if (tab === "technique") {
    container.innerHTML = `
      <h3>When to Use</h3>
      <ul>
        ${shot.usedWhen.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h3>Technique Steps</h3>
      <ul>
        ${shot.instructions.map(step => `<li>${step}</li>`).join("")}
      </ul>
    `;
  }

  if (tab === "mistakes") {
    container.innerHTML = `
      <h3>Common Mistakes</h3>
      <ul>
        ${shot.commonMistakes.map(m => `<li>${m}</li>`).join("")}
      </ul>
    `;
  }

  if (tab === "drills") {
    container.innerHTML = `
      <h3>Training Drills</h3>
      <ul>
        ${shot.drills.map(d => `<li>${d}</li>`).join("")}
      </ul>
    `;
  }

  if (tab === "tips") {
    container.innerHTML = `
      <h3>Coaching Tips</h3>
      <ul>
        ${shot.coachingTips.map(t => `<li>${t}</li>`).join("")}
      </ul>

      <p class="pro-tip">
        <strong>Pro Tip:</strong> ${shot.proTip}
      </p>
    `;
  }
}




/* ===============================
   BENEFITS
================================ */
function renderBenefits() {
  const container = document.getElementById("benefits");

  container.innerHTML = `
    <h2>Benefits of Tennis</h2>

    <div class="benefits-tabs">
      <button class="benefit-tab active" data-type="physical">💪 Physical</button>
      <button class="benefit-tab" data-type="mental">🧠 Mental</button>
      <button class="benefit-tab" data-type="social">🤝 Social</button>
    </div>

    <div id="benefitsContent" class="benefits-content"></div>
  `;

  // render default
  renderBenefitsCategory("physical");

  // tab logic
  const tabs = container.querySelectorAll(".benefit-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const type = tab.dataset.type;
      renderBenefitsCategory(type);
    });
  });
}
function renderBenefitsCategory(type) {
  const content = document.getElementById("benefitsContent");

  const titles = {
    physical: "Physical Benefits",
    mental: "Mental Benefits",
    social: "Social & Life Benefits"
  };

  const descriptions = {
    physical: "Tennis is a complete physical workout that builds strength, endurance, speed, and flexibility.",
    mental: "Tennis strengthens your mind, focus, confidence, and emotional control.",
    social: "Tennis builds relationships, discipline, sportsmanship, and lifelong habits."
  };

  const images = {
    physical: "assets/physical.JPG",
    mental: "assets/mental.jpg",
    social: "assets/social.webp"
  };

  const data = benefitsData[type];

  content.innerHTML = `
    <div class="benefits-layout">

      <!-- LEFT -->
      <div class="benefits-left card">
        ${renderBenefitColumn(titles[type], data)}
      </div>

      <!-- RIGHT -->
      <div class="benefits-right card">
        <h3>${titles[type]}</h3>
        <p>${descriptions[type]}</p>
        <img src="${images[type]}" alt="${titles[type]}">
        <div class="benefits-highlight">
          💡 Tennis improves your life both on and off the court.
        </div>
      </div>

    </div>
  `;
}

function renderBenefitColumn(title, items) {
  return `
    <div class="benefit-column card">
      <h3>${title}</h3>
      <ul>
        ${items
          .map(
            item => `
            <li>
              <strong>${item.title}</strong><br>
              <span>${item.desc}</span>
            </li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;
}




/* ===============================
   STORY
================================ */
function renderStory() {
  document.getElementById("story").innerHTML = `
    <h2>My Story</h2>

    <p class="story-text">
      ${aboutContent.paragraph}
    </p>

    <div class="story-images">
      <img src="${aboutContent.images[0]}" loading="lazy" alt="My tennis journey">
      <img src="${aboutContent.images[1]}" alt="Training and competition">
    </div>
  `;
}

/* ===============================
   HOME PAGE LOGIC
================================ */
function renderHome() {
  const box = document.getElementById("homeProgressBox");
  if (!box) return;

  const learned = shotsData.filter(s => progressState[s.id]).length;
  const total = shotsData.length;
  const percent = Math.round((learned / total) * 100);

  box.innerHTML = `
    <div class="card">
      <h2>Your Progress</h2>
      <p>You have learned <strong>${learned}</strong> out of <strong>${total}</strong> shots.</p>
      <p>Progress: <strong>${percent}%</strong></p>
    </div>
  `;
}

