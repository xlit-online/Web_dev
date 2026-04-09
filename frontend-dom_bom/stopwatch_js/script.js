const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let timer = null;
let seconds = 0;

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;

  hrs = String(hrs).padStart(2, "0");
  mins = String(mins).padStart(2, "0");
  secs = String(secs).padStart(2, "0");

  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  display.textContent = formatTime(seconds);
}

startBtn.addEventListener("click", () => {
  if (timer !== null) return;

  timer = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  updateDisplay();
});

updateDisplay();