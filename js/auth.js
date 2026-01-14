
/* ===============================
   AUTH STORAGE KEYS
================================ */
const USERS_KEY = "tennis_users";
const CURRENT_USER_KEY = "tennis_current_user";

/* ===============================
   STORAGE HELPERS
================================ */
function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(username) {
  localStorage.setItem(CURRENT_USER_KEY, username);
}

/* ===============================
   REGISTER
================================ */
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const error = document.getElementById("registerError");

    if (!username || !password) {
      error.textContent = "Please fill all fields.";
      return;
    }

    const users = loadUsers();

    if (users[username]) {
      error.textContent = "User already exists.";
      return;
    }

    users[username] = {
      password: password,
      progress: {},
      favorites: {},
      quizScores: [],
      achievements: {}
    };

    saveUsers(users);

    error.style.color = "#7CFFB2";
    error.textContent = "Account created! You can log in now.";
  });
}

/* ===============================
   LOGIN
================================ */
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    const users = loadUsers();

    if (!users[username] || users[username].password !== password) {
      error.textContent = "Invalid username or password.";
      return;
    }

    setCurrentUser(username);

    // Go to main app
    window.location.href = "index.html";
  });
}
