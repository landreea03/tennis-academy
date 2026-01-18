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
  const container = document.getElementById("profile");
  const user = getCurrentUserData();

  if (!user) {
    container.innerHTML = "<p>No user data found.</p>";
    return;
  }

  // --- Stats ---
  const learnedCount = shotsData.filter(s => user.progress[s.id]).length;
  const favoriteCount = shotsData.filter(s => user.favorites[s.id]).length;
  const totalShots = shotsData.length;
  const progressPercent = Math.round((learnedCount / totalShots) * 100);

  const quizAttempts = user.quizScores.length;
  const bestScore = quizAttempts
    ? Math.max(...user.quizScores.map(q => q.score))
    : 0;

  const avgScore = quizAttempts
    ? Math.round(
        user.quizScores.reduce((sum, q) => sum + q.score, 0) / quizAttempts
      )
    : 0;

  // --- Achievements ---
  const unlocked = Object.entries(user.achievements || {}).filter(([_, v]) => v);

  // --- Render ---
  container.innerHTML = `
    <h2>👤 Profile: ${getCurrentUsername()}</h2>

    <div class="profile-stats-grid">
      <div class="card">📘 Learned Shots<br><strong>${learnedCount}/${totalShots}</strong></div>
      <div class="card">⭐ Favorites<br><strong>${favoriteCount}</strong></div>
      <div class="card">📊 Progress<br><strong>${progressPercent}%</strong></div>
      <div class="card">🧠 Quiz Attempts<br><strong>${quizAttempts}</strong></div>
      <div class="card">🏆 Best Quiz Score<br><strong>${bestScore}</strong></div>
      <div class="card">📈 Avg Quiz Score<br><strong>${avgScore}</strong></div>
    </div>

    <h3>🏆 Achievements</h3>
    <div class="profile-achievements">
      ${
        achievementsList.map(a => {
          const isUnlocked = user.achievements[a.id];
          return `
            <div class="achievement-card ${isUnlocked ? "unlocked" : "locked"}">
              ${isUnlocked ? "🏆" : "🔒"} ${a.title}
            </div>
          `;
        }).join("")
      }
    </div>

    <h3>📝 Quiz History</h3>
    <div class="profile-quiz-history">
      ${
        user.quizScores.length === 0
          ? "<p>No quizzes taken yet.</p>"
          : user.quizScores
              .slice()
              .reverse()
              .map(
                q => `
                <div class="card">
                  Score: <strong>${q.score}/${q.total}</strong><br>
                  Date: ${new Date(q.date).toLocaleString()}
                </div>
              `
              )
              .join("")
      }
    </div>

    <h3>📊 Your Stats</h3>
    <div class="charts-grid">
      <div class="card">
        <h4>📈 Quiz Scores Over Time</h4>
        <canvas id="quizChart"></canvas>
      </div>

      <div class="card">
        <h4>🍩 Learning Progress</h4>
        <canvas id="progressChart"></canvas>
      </div>
    </div>
  `;

  // Draw charts AFTER HTML exists
  drawQuizChart(user);
  drawProgressChart(user);
}



let quizChartInstance = null;
let progressChartInstance = null;

function drawQuizChart(user) {
  const ctx = document.getElementById("quizChart");

  if (!ctx) return;

  const labels = user.quizScores.map((q, i) => `Attempt ${i + 1}`);
  const scores = user.quizScores.map(q => q.score);

  if (quizChartInstance) quizChartInstance.destroy();

  quizChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Quiz Score",
          data: scores,
          borderWidth: 3,
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function drawProgressChart(user) {
  const ctx = document.getElementById("progressChart");
  if (!ctx) return;

  const learned = Object.values(user.progress).filter(Boolean).length;
  const remaining = shotsData.length - learned;

  if (progressChartInstance) progressChartInstance.destroy();

  progressChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Learned", "Remaining"],
      datasets: [
        {
          data: [learned, remaining],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}
