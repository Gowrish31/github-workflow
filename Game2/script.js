const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const gameOverEl = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");

let score = 0;
let currentMole = null;
let timeLeft = 30;
let moleInterval;
let countdownInterval;
let moleSpeed = 1000; // starts at 1s

// Create grid
for (let i = 0; i < 9; i++) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  hole.dataset.index = i;
  grid.appendChild(hole);
}

const holes = document.querySelectorAll(".hole");

// Random mole pop
function showMole() {
  holes.forEach(hole => hole.classList.remove("mole"));
  const index = Math.floor(Math.random() * 9);
  holes[index].classList.add("mole");
  currentMole = index;
}

// Countdown Timer
function startCountdown() {
  countdownInterval = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    
    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      clearInterval(moleInterval);
      endGame();
    }

    if (timeLeft === 20 || timeLeft === 10) {
      moleSpeed -= 300;
      restartMoleInterval();
    }
  }, 1000);
}

// Mole Timer
function startMoleInterval() {
  moleInterval = setInterval(showMole, moleSpeed);
}

function restartMoleInterval() {
  clearInterval(moleInterval);
  startMoleInterval();
}

// Event Listeners
holes.forEach(hole => {
  hole.addEventListener("click", () => {
    if (parseInt(hole.dataset.index) === currentMole) {
      score++;
    } else {
      score = Math.max(0, score - 1); // avoid negative score
    }
    scoreEl.textContent = score;
  });
});

startBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = score;
  timeLeft = 30;
  timeEl.textContent = timeLeft;
  moleSpeed = 1000;
  gameOverEl.style.display = "none";
  startCountdown();
  startMoleInterval();
});

resetBtn.addEventListener("click", () => {
  location.reload();
});

playAgainBtn.addEventListener("click", () => {
  location.reload();
});

function endGame() {
  holes.forEach(hole => hole.classList.remove("mole"));
  finalScoreEl.textContent = score;
  gameOverEl.style.display = "block";
}
 