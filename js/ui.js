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

  shotsData.forEach(shot => {
    const btn = document.createElement("button");
    btn.className = "shot-btn";

    const learned = progressState[shot.id];

    btn.innerHTML = `
      ${shot.name}
      ${learned ? " ✔" : ""}
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

  shotDisplay.innerHTML = `
    <div class="card">
      <img src="${shot.image}" alt="${shot.name}" loading="lazy">
    </div>

    <div class="card">
      <h2>${shot.name}</h2>

      <button class="learn-btn">
        ${isLearned ? "✅ Marked as Learned" : "📘 Mark as Learned"}
      </button>

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
    renderShotDetails(shot); // re-render to update button text
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
  document.getElementById("benefits").innerHTML = `
    <h2>Benefits of Tennis</h2>

    <div class="benefits-grid">
      ${renderBenefitColumn("Physical Benefits", benefitsData.physical)}
      ${renderBenefitColumn("Mental Benefits", benefitsData.mental)}
      ${renderBenefitColumn("Social & Life Benefits", benefitsData.social)}
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
