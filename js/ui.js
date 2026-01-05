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
    btn.textContent = shot.name;
    btn.addEventListener("click", () => renderShotDetails(shot));
    shotMenu.appendChild(btn);
  });
}

function renderShotDetails(shot) {
  shotDisplay.innerHTML = `
    <div class="card">
      <img src="${shot.image}" alt="${shot.name}" loading="lazy">
    </div>

    <div class="card">
      <h2>${shot.name}</h2>

      <p><strong>Difficulty:</strong> ${shot.difficulty}</p>
      <p>${shot.description}</p>

      <h3>When to Use</h3>
      <ul>
        ${shot.usedWhen.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h3>Technique Steps</h3>
      <ul>
        ${shot.instructions.map(step => `<li>${step}</li>`).join("")}
      </ul>

      <h3>Common Mistakes</h3>
      <ul>
        ${shot.commonMistakes.map(mistake => `<li>${mistake}</li>`).join("")}
      </ul>

      <h3>Coaching Tips</h3>
      <ul>
        ${shot.coachingTips.map(tip => `<li>${tip}</li>`).join("")}
      </ul>

      <h3>Drills</h3>
      <ul>
        ${shot.drills.map(drill => `<li>${drill}</li>`).join("")}
      </ul>

      <p class="pro-tip">
        <strong>Pro Tip:</strong> ${shot.proTip}
      </p>
    </div>
  `;
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
