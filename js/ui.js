const appViews = document.querySelectorAll(".view");
const shotMenu = document.getElementById("shotMenu");
const shotDisplay = document.getElementById("shotDisplay");

/* ===============================
   VIEW HANDLING
================================ */
function showView(id) {
  appViews.forEach(view => view.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

/* ===============================
   SHOTS
================================ */
function renderShotMenu() {
  const user = getCurrentUserData();

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
  allBtn.onclick = () => setShotFilter("all");
  favBtn.onclick = () => setShotFilter("favorites");
  learnedBtn.onclick = () => setShotFilter("learned");

  shotMenu.appendChild(filterBar);

  // --- FILTER LOGIC ---
  let visibleShots = shotsData;

  if (currentShotFilter === "favorites") {
    visibleShots = shotsData.filter(s => user.favorites[s.id]);
  }

  if (currentShotFilter === "learned") {
    visibleShots = shotsData.filter(s => user.progress[s.id]);
  }

  // --- PROGRESS SUMMARY ---
  renderProgressSummary();

  // --- RENDER SHOTS ---
  visibleShots.forEach(shot => {
    const btn = document.createElement("button");
    btn.className = "shot-btn";

    const learned = user.progress[shot.id];
    const favorite = user.favorites[shot.id];

    btn.innerHTML = `
      ${shot.name}
      ${learned ? " ✔" : ""}
      ${favorite ? " ⭐" : ""}
    `;

    btn.onclick = () => renderShotDetails(shot);
    shotMenu.appendChild(btn);
  });
}

function renderProgressSummary() {
  const user = getCurrentUserData();

  const learnedCount = shotsData.filter(s => user.progress[s.id]).length;
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
  const user = getCurrentUserData();

  const isLearned = user.progress[shot.id];
  const isFavorite = user.favorites[shot.id];

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

  // LEARN BUTTON
  shotDisplay.querySelector(".learn-btn").onclick = () => {
    toggleLearned(shot.id);
    renderShotDetails(shot);
  };

  // FAVORITE BUTTON
  shotDisplay.querySelector(".fav-btn").onclick = () => {
    toggleFavorite(shot.id);
    renderShotDetails(shot);
  };

  // Tabs
  renderTabContent("technique", shot);

  const tabs = shotDisplay.querySelectorAll(".shot-tab");
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderTabContent(tab.dataset.tab, shot);
    };
  });
}

function renderTabContent(tab, shot) {
  const container = document.getElementById("tabContent");

  if (tab === "technique") {
    container.innerHTML = `
      <h3>When to Use</h3>
      <ul>${shot.usedWhen.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Technique Steps</h3>
      <ul>${shot.instructions.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
  }

  if (tab === "mistakes") {
    container.innerHTML = `
      <h3>Common Mistakes</h3>
      <ul>${shot.commonMistakes.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
  }

  if (tab === "drills") {
    container.innerHTML = `
      <h3>Training Drills</h3>
      <ul>${shot.drills.map(i => `<li>${i}</li>`).join("")}</ul>
    `;
  }

  if (tab === "tips") {
    container.innerHTML = `
      <h3>Coaching Tips</h3>
      <ul>${shot.coachingTips.map(i => `<li>${i}</li>`).join("")}</ul>
      <p class="pro-tip"><strong>Pro Tip:</strong> ${shot.proTip}</p>
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

  renderBenefitsCategory("physical");

  const tabs = container.querySelectorAll(".benefit-tab");
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderBenefitsCategory(tab.dataset.type);
    };
  });
}

function renderBenefitsCategory(type) {
  const content = document.getElementById("benefitsContent");

  const titles = {
    physical: "Physical Benefits",
    mental: "Mental Benefits",
    social: "Social & Life Benefits"
  };

  const images = {
    physical: "assets/physical.JPG",
    mental: "assets/mental.jpg",
    social: "assets/social.webp"
  };

  const data = benefitsData[type];

  content.innerHTML = `
    <div class="benefits-layout">
      <div class="benefits-left card">
        ${renderBenefitColumn(titles[type], data)}
      </div>
      <div class="benefits-right card">
        <h3>${titles[type]}</h3>
        <img src="${images[type]}">
        <div class="benefits-highlight">
          💡 Tennis improves your life both on and off the court.
        </div>
      </div>
    </div>
  `;
}

function renderBenefitColumn(title, items) {
  return `
    <div class="benefit-column">
      <h3>${title}</h3>
      <ul>
        ${items.map(item => `
          <li>
            <strong>${item.title}</strong><br>
            <span>${item.desc}</span>
          </li>
        `).join("")}
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
    <p class="story-text">${aboutContent.paragraph}</p>
    <div class="story-images">
      <img src="${aboutContent.images[0]}" loading="lazy">
      <img src="${aboutContent.images[1]}">
    </div>
  `;
}

/* ===============================
   HOME
================================ */
function renderHome() {
  const box = document.getElementById("homeProgressBox");
  if (!box) return;

  const user = getCurrentUserData();
  const learned = shotsData.filter(s => user.progress[s.id]).length;
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

function renderProfile() {
  const user = getCurrentUserData();
  const container = document.getElementById("profile");

  if (!user) {
    container.innerHTML = "<p>Please log in again.</p>";
    return;
  }

  const username = getCurrentUsername();

  // Progress stats
  const learnedShots = Object.keys(user.progress).filter(id => user.progress[id]);
  const favoriteShots = Object.keys(user.favorites).filter(id => user.favorites[id]);
  const learnedCount = learnedShots.length;
  const totalShots = shotsData.length;
  const progressPercent = Math.round((learnedCount / totalShots) * 100);

  // Achievements
  const unlockedAchievements = Object.entries(user.achievements)
    .filter(([_, v]) => v)
    .map(([id]) => achievementsList.find(a => a.id === id))
    .filter(Boolean);

  // Quiz stats
  const quizCount = user.quizScores.length;
  const bestScore = quizCount === 0 ? 0 : Math.max(...user.quizScores.map(q => q.score));

  container.innerHTML = `
    <div class="profile-dashboard">

      <!-- HEADER -->
      <div class="card profile-header">
        <h2>👤 ${username}</h2>
        <p>Welcome back to Tennis Academy</p>
      </div>

      <!-- STATS -->
      <div class="profile-stats">
        <div class="card stat-card">📘 Shots Learned<br><strong>${learnedCount}/${totalShots}</strong></div>
        <div class="card stat-card">⭐ Favorites<br><strong>${favoriteShots.length}</strong></div>
        <div class="card stat-card">📝 Quizzes Taken<br><strong>${quizCount}</strong></div>
        <div class="card stat-card">🏆 Best Quiz Score<br><strong>${bestScore}</strong></div>
      </div>

      <!-- PROGRESS -->
      <div class="card">
        <h3>📈 Progress</h3>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${progressPercent}%"></div>
        </div>
        <p>${progressPercent}% completed</p>
      </div>

      <!-- ACHIEVEMENTS -->
      <div class="card">
        <h3>🏆 Achievements</h3>
        <div class="achievements-grid">
          ${
            unlockedAchievements.length === 0
              ? "<p>No achievements yet</p>"
              : unlockedAchievements.map(a => `
                  <div class="achievement-card">
                    🏆
                    <div>${a.title}</div>
                  </div>
                `).join("")
          }
        </div>
      </div>

      <!-- LEARNED SHOTS -->
      <div class="card">
        <h3>📘 Learned Shots</h3>
        <ul>
          ${
            learnedShots.length === 0
              ? "<li>None yet</li>"
              : learnedShots.map(id => {
                  const s = shotsData.find(x => x.id === id);
                  return `<li>${s ? s.name : id}</li>`;
                }).join("")
          }
        </ul>
      </div>

      <!-- FAVORITES -->
      <div class="card">
        <h3>⭐ Favorite Shots</h3>
        <ul>
          ${
            favoriteShots.length === 0
              ? "<li>No favorites yet</li>"
              : favoriteShots.map(id => {
                  const s = shotsData.find(x => x.id === id);
                  return `<li>${s ? s.name : id}</li>`;
                }).join("")
          }
        </ul>
      </div>

      <!-- QUIZ HISTORY -->
      <div class="card">
        <h3>📝 Quiz History</h3>
        <ul class="quiz-history">
          ${
            quizCount === 0
              ? "<li>No quizzes taken yet</li>"
              : user.quizScores.map(q => `
                  <li>
                    Score: <strong>${q.score}/${q.total}</strong>
                    <span>${new Date(q.date).toLocaleString()}</span>
                  </li>
                `).join("")
          }
        </ul>
      </div>

    </div>
  `;
}
