const appViews = document.querySelectorAll(".view");
const shotMenu = document.getElementById("shotMenu");
const shotDisplay = document.getElementById("shotDisplay");

function showView(id) {
  appViews.forEach(v => v.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function renderShotMenu() {
  shotMenu.innerHTML = "";
  shotsData.forEach(shot => {
    const btn = document.createElement("button");
    btn.className = "shot-btn";
    btn.textContent = shot.name;
    btn.onclick = () => renderShotDetails(shot);
    shotMenu.appendChild(btn);
  });
}

function renderShotDetails(shot) {
  shotDisplay.innerHTML = `
    <div class="card">
      <img src="${shot.image}">
    </div>
    <div class="card">
      <h2>${shot.name}</h2>
      <p>${shot.description}</p>
      <ul>
        ${shot.instructions.map(i => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `;
}

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
  

function renderStory() {
    document.getElementById("story").innerHTML = `
      <h2>My Story</h2>
  
      <p class="story-text">
        ${aboutContent.paragraph}
      </p>
  
      <div class="story-images">
        <img src="${aboutContent.images[0]}" alt="My tennis journey">
        <img src="${aboutContent.images[1]}" alt="Training and competition">
      </div>
    `;
  }
  
  
  
