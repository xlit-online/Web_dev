const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let timer = null;
let totalSeconds = 0;

function formatTime(sec) {
  const mins = String(Math.floor(sec / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateDisplay() {
  display.textContent = formatTime(totalSeconds);
}

startBtn.addEventListener("click", () => {
  const mins = parseInt(minutesInput.value) || 0;
  const secs = parseInt(secondsInput.value) || 0;

  if (timer !== null) return;

  totalSeconds = mins * 60 + secs;

  if (totalSeconds <= 0) {
    alert("Enter time first!");
    return;
  }

  updateDisplay();

  timer = setInterval(() => {
    totalSeconds--;
    updateDisplay();

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Time's up!");
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  totalSeconds = 0;
  minutesInput.value = "";
  secondsInput.value = "";
  updateDisplay();
});

updateDisplay();