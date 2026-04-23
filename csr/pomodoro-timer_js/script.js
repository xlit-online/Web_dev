const display = document.getElementById("display");
const modeText = document.getElementById("mode");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let timer = null;
let isWork = true;

let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;

function formatTime(sec) {
  const mins = String(Math.floor(sec / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateUI() {
  display.textContent = formatTime(timeLeft);
  modeText.textContent = isWork ? "Work Time" : "Break Time";
}

function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

      isWork = !isWork;
      timeLeft = isWork ? workTime : breakTime;

      alert(isWork ? "Break finished! Work time!" : "Work finished! Break time!");
    }

    updateUI();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isWork = true;
  timeLeft = workTime;
  updateUI();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateUI();