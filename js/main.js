console.log("main.js loaded");

/* 
   AUTH GUARD
 */
const USERS_KEY = "tennis_users";
const CURRENT_USER_KEY = "tennis_current_user";

if (!localStorage.getItem(CURRENT_USER_KEY)) {
  window.location.href = "login.html";
}
/* 
   LOGOUT BUTTON
 */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "login.html";
  };
}

/* 
   USER STORE HELPERS
 */
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
  const user = users[username];

  if (!user) return null;

  
  if (!user.progress) user.progress = {};
  if (!user.favorites) user.favorites = {};
  if (!user.quizScores) user.quizScores = [];
  if (!user.achievements) user.achievements = {};

  if (user.xp === undefined) user.xp = 0;
  if (user.level === undefined) user.level = 1;

  if (!user.streak) {
    const today = new Date().toDateString();
    user.streak = {
      current: 1,
      best: 1,
      lastActive: today
    };
  }

  users[username] = user;
  saveUsers(users);

  return user;
}




function saveCurrentUserData(userData) {
  const users = loadUsers();
  const username = getCurrentUsername();
  users[username] = userData;
  saveUsers(users);
}

/* 
   XP & LEVEL SYSTEM
 */

function addXP(amount) {
  const user = getCurrentUserData();
  if (!user) return;

  user.xp += amount;

  const oldLevel = user.level;

  
  user.level = Math.floor(user.xp / 100) + 1;

  if (user.level > oldLevel) {
    showLevelUpPopup(user.level);
  }

  saveCurrentUserData(user);
}

function showLevelUpPopup(level) {
  const popup = document.createElement("div");
  popup.className = "levelup-popup";
  popup.innerHTML = `
    🎉 <strong>Level Up!</strong><br>
    You reached <strong>Level ${level}</strong>!
  `;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3500);
}

/* 
   STREAK SYSTEM
 */

function updateStreak() {
  const user = getCurrentUserData();
  if (!user) return;

  const today = new Date().toDateString();
  const last = user.streak.lastActive;

  if (last !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (last === yesterday.toDateString()) {
      user.streak.current += 1;
    } else {
      user.streak.current = 1;
    }

    user.streak.best = Math.max(user.streak.best, user.streak.current);
    user.streak.lastActive = today;

    saveCurrentUserData(user);
  }
}


/* 
   ACHIEVEMENTS SYSTEM
 */

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



/* 
   SHOT FILTER STATE
 */
let currentShotFilter = "all"; 

function setShotFilter(filter) {
  currentShotFilter = filter;
  renderShotMenu();
}

/* 
   FAVORITES (PER USER)
 */
function toggleFavorite(shotId) {
  const user = getCurrentUserData();
  user.favorites[shotId] = !user.favorites[shotId];
  saveCurrentUserData(user);
  renderShotMenu();
  checkAchievements();
}

/* 
   PROGRESS (PER USER)
 */
function toggleLearned(shotId) {
  const user = getCurrentUserData();
  user.progress[shotId] = !user.progress[shotId];
  saveCurrentUserData(user);
  addXP(20);
  renderShotMenu();
  checkAchievements(); 
}

/* 
   NAV BUTTONS
 */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;

    showView(view);

    if (view === "shots") renderShotMenu();
    if (view === "benefits") renderBenefits();
    if (view === "story") renderStory();
    if (view === "quiz") startQuiz();
    if (view === "profile") renderProfile();
    if (view === "roadmap") renderRoadmap();



    setActiveNav(btn);
  });
});

/* 
   LOGO → HOME
*/
const homeLogo = document.getElementById("homeLogo");
if (homeLogo) {
  homeLogo.addEventListener("click", () => {
    updateStreak();
    showView("home");
    renderHome();
    clearActiveNav();
  });
}

/* 
   ACTIVE STATE
*/
function setActiveNav(activeBtn) {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

function clearActiveNav() {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
}

/* 
   DEFAULT VIEW
 */
updateStreak();
showView("home");
renderHome();

/* 
   LIGHTBOX
 */
document.addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `<img src="${e.target.src}">`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  }
});

/* 
   SEARCH
 */
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

/* 
   SEARCH HANDLING
 */
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


/* 
   HOME SHORTCUTS (LEARNING PATHS)
 */
document.addEventListener("click", e => {

  // START TRAINING
  if (e.target.id === "startTrainingBtn") {
    showView("shots");
    renderShotMenu();
  }

  // VIEW PROGRESS
  if (e.target.id === "viewProgressBtn") {
    showView("shots");
    setShotFilter("learned");
  }

  // BEGINNER → Forehand
  if (e.target.id === "pathBeginner") {
    const shot = shotsData.find(s => s.id === "forehand");
    if (shot) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(shot);
    }
  }

  // INTERMEDIATE → Backhand
  if (e.target.id === "pathIntermediate") {
    const shot = shotsData.find(s => s.id === "backhand");
    if (shot) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(shot);
    }
  }

  // ADVANCED → Serve
  if (e.target.id === "pathAdvanced") {
    const shot = shotsData.find(s => s.id === "serve");
    if (shot) {
      showView("shots");
      renderShotMenu();
      renderShotDetails(shot);
    }
  }

});


/* 
   QUIZ SYSTEM (PER USER)
 */
let quizOrder = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizFinished = false;
let quizMistakes = [];


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
  quizMistakes = []; 

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

    // Highlight correct answer
    buttons.forEach(b => {
      if (b.textContent === correct) {
        b.classList.add("correct");
      }
    });

    // ✅ SAVE MISTAKE
    quizMistakes.push({
      question: quizOrder[currentQuizIndex].question,
      correct: correct
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

  //  SAVE SCORE TO CURRENT USER 
  const user = getCurrentUserData();

  if (user) {
    user.quizScores.push({
      score: quizScore,
      total: quizOrder.length,
      date: new Date().toISOString(),
      mistakes: quizMistakes 
    });
    
    saveCurrentUserData(user);
    addXP(quizScore * 10);
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

/* 
   SMART COACH SYSTEM
 */


function getCoachRecommendationsPrioritized() {
  const user = getCurrentUserData();
  if (!user) return [];

  const scores = [];

  shotsData.forEach(shot => {
    let score = 0;

    // 1. If not learned -> very important
    if (!user.progress[shot.id]) score += 50;

    // 2. If not favorite -> medium importance
    if (!user.favorites[shot.id]) score += 10;

    // 3. If user often fails quizzes -> very important
    user.quizScores.slice(-5).forEach(q => {
      if (q.mistakes) {
        q.mistakes.forEach(m => {
          if (m.question.toLowerCase().includes(shot.id)) {
            score += 20;
          }
        });
      }
    });

    if (score > 0) {
      scores.push({
        name: shot.name,
        score
      });
    }
  });

  // Sort by most important
  scores.sort((a, b) => b.score - a.score);

  // Return TOP 3 only
  return scores.slice(0, 3);
}



