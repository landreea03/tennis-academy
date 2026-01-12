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
    if (view === "quiz") {
      startQuiz();
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

/* ===============================
   HOME LEARNING PATH SHORTCUTS
================================ */
document.addEventListener("click", e => {

  // BEGINNER → Forehand
  if (e.target.id === "pathBeginner") {
    const forehand = shotsData.find(s => s.id === "forehand");
    if (forehand) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(forehand);
    }
  }

  // INTERMEDIATE → Backhand + Volley (show Backhand first)
  if (e.target.id === "pathIntermediate") {
    const backhand = shotsData.find(s => s.id === "backhand");
    if (backhand) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(backhand);
    }
  }

  // ADVANCED → Serve + Slice (show Serve first)
  if (e.target.id === "pathAdvanced") {
    const serve = shotsData.find(s => s.id === "serve");
    if (serve) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(serve);
    }
  }

});
/* ===============================
   QUIZ SYSTEM (FIXED)
================================ */

let quizOrder = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizFinished = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const quizScoreBox = document.getElementById("quizScore");

function startQuiz() {
  quizOrder = [...quizData].sort(() => Math.random() - 0.5);
  currentQuizIndex = 0;
  quizScore = 0;
  quizFinished = false;

  nextQuestionBtn.textContent = "Next Question";
  nextQuestionBtn.style.display = "none";

  showQuestion();
}

function showQuestion() {
  quizFeedback.textContent = "";
  nextQuestionBtn.style.display = "none";

  // Finished?
  if (currentQuizIndex >= quizOrder.length) {
    showFinalScore();
    return;
  }

  const q = quizOrder[currentQuizIndex];

  quizQuestion.textContent = `Question ${currentQuizIndex + 1} of ${quizOrder.length}: ${q.question}`;
  quizOptions.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => checkAnswer(btn, option, q.answer);

    quizOptions.appendChild(btn);
  });

  quizScoreBox.textContent = `Score: ${quizScore}`;
}

function checkAnswer(button, selected, correct) {
  const buttons = quizOptions.querySelectorAll("button");
  buttons.forEach(b => (b.disabled = true));

  if (selected === correct) {
    button.classList.add("correct");
    quizFeedback.textContent = "✅ Correct!";
    quizScore++;
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }

  quizScoreBox.textContent = `Score: ${quizScore}`;
  nextQuestionBtn.style.display = "inline-block";
}

nextQuestionBtn.addEventListener("click", () => {
  if (quizFinished) {
    startQuiz();
  } else {
    currentQuizIndex++;
    showQuestion();
  }
});

function showFinalScore() {
  quizFinished = true;

  quizQuestion.textContent = "🏁 Quiz Finished!";
  quizOptions.innerHTML = "";
  quizFeedback.innerHTML = `
    <h3>You scored ${quizScore} out of ${quizOrder.length}</h3>
    <p>${getScoreMessage()}</p>
  `;

  nextQuestionBtn.textContent = "Restart Quiz";
  nextQuestionBtn.style.display = "inline-block";
}

function getScoreMessage() {
  const percent = (quizScore / quizOrder.length) * 100;

  if (percent === 100) return "🏆 Perfect! You are a tennis expert!";
  if (percent >= 70) return "🔥 Great job! You really know your tennis!";
  if (percent >= 40) return "👍 Good, but you can improve!";
  return "📘 Keep training and try again!";
}
