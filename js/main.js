console.log("main.js loaded");

/* ===============================
   AUTH GUARD
================================ */
const USERS_KEY = "tennis_users";
const CURRENT_USER_KEY = "tennis_current_user";

if (!localStorage.getItem(CURRENT_USER_KEY)) {
  window.location.href = "login.html";
}
/* ===============================
   LOGOUT BUTTON
================================ */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "login.html";
  };
}

/* ===============================
   USER STORE HELPERS
================================ */
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUsername() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

function getCurrentUserData() {
  const users = loadUsers();
  const username = getCurrentUsername();
  return users[username];
}

function saveCurrentUserData(userData) {
  const users = loadUsers();
  const username = getCurrentUsername();
  users[username] = userData;
  saveUsers(users);
}


/* ===============================
   ACHIEVEMENTS SYSTEM
================================ */

function checkAchievements() {
  const user = getCurrentUserData();
  if (!user) return;

  let unlockedSomething = false;

  achievementsList.forEach(ach => {
    if (!user.achievements[ach.id]) {
      if (ach.check(user)) {
        user.achievements[ach.id] = true;
        unlockedSomething = true;
        showAchievementPopup(ach.title);
      }
    }
  });

  if (unlockedSomething) {
    saveCurrentUserData(user);
  }
}

function showAchievementPopup(title) {
  const overlay = document.createElement("div");
  overlay.className = "achievement-overlay";

  overlay.innerHTML = `
    <div class="achievement-modal">
      <div class="achievement-icon">🏆</div>
      <h2>Achievement Unlocked!</h2>
      <p>${title}</p>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("hide");
    setTimeout(() => overlay.remove(), 500);
  }, 2500);
}



/* ===============================
   SHOT FILTER STATE
================================ */
let currentShotFilter = "all"; // all | favorites | learned

function setShotFilter(filter) {
  currentShotFilter = filter;
  renderShotMenu();
}

/* ===============================
   FAVORITES (PER USER)
================================ */
function toggleFavorite(shotId) {
  const user = getCurrentUserData();
  user.favorites[shotId] = !user.favorites[shotId];
  saveCurrentUserData(user);
  renderShotMenu();
  checkAchievements();
}

/* ===============================
   PROGRESS (PER USER)
================================ */
function toggleLearned(shotId) {
  const user = getCurrentUserData();
  user.progress[shotId] = !user.progress[shotId];
  saveCurrentUserData(user);
  renderShotMenu();
  checkAchievements(); 
}

/* ===============================
   NAV BUTTONS
================================ */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;

    showView(view);

    if (view === "shots") renderShotMenu();
    if (view === "benefits") renderBenefits();
    if (view === "story") renderStory();
    if (view === "quiz") startQuiz();
    if (view === "profile") renderProfile();


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
}

/* ===============================
   ACTIVE STATE
================================ */
function setActiveNav(activeBtn) {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

function clearActiveNav() {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
}

/* ===============================
   DEFAULT VIEW
================================ */
showView("home");
renderHome();

/* ===============================
   LIGHTBOX
================================ */
document.addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `<img src="${e.target.src}">`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  }
});

/* ===============================
   SEARCH
================================ */
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const searchIndex = [];

// Home
searchIndex.push({
  label: "Tennis (Home)",
  category: "Home",
  action: () => showView("home")
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
    label: section.charAt(0).toUpperCase() + section.slice(1) + " Benefits",
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

  matches.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.label}<div class="category">${item.category}</div>`;
    div.onclick = () => {
      item.action();
      clearSearch();
    };
    searchResults.appendChild(div);
  });

  searchResults.classList.remove("hidden");
});

function clearSearch() {
  searchInput.value = "";
  searchResults.innerHTML = "";
  searchResults.classList.add("hidden");
}

/* ===============================
   HOME SHORTCUTS
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
   QUIZ SYSTEM (PER USER)
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

  // Disable all buttons
  buttons.forEach(b => (b.disabled = true));

  if (selected === correct) {
    button.classList.add("correct");
    quizFeedback.textContent = "✅ Correct!";
    quizScore++;
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = `❌ Wrong! Correct answer: ${correct}`;

    // Highlight correct one
    buttons.forEach(b => {
      if (b.textContent === correct) {
        b.classList.add("correct");
      }
    });
  }

  quizScoreBox.textContent = `Score: ${quizScore}`;
  nextQuestionBtn.style.display = "inline-block";
}


nextQuestionBtn.onclick = () => {
  if (quizFinished) startQuiz();
  else {
    currentQuizIndex++;
    showQuestion();
  }
};

function showFinalScore() {
  quizFinished = true;

  // ===== SAVE SCORE TO CURRENT USER =====
  const user = getCurrentUserData();

  if (user) {
    user.quizScores.push({
      score: quizScore,
      total: quizOrder.length,
      date: new Date().toISOString()
    });
    saveCurrentUserData(user);
    checkAchievements();
  }

  // ===== UI =====
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
  if (percent >= 80) return "🔥 Excellent! You really know your tennis!";
  if (percent >= 60) return "👍 Good job! Keep improving!";
  if (percent >= 40) return "📘 Not bad, but you should practice more!";
  return "🎾 Keep training and try again!";
}


