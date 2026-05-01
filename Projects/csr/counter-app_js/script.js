const display = document.getElementById('count');

const incBtn = document.getElementById('incBtn');
const resetBtn = document.getElementById('restBtn');
const decBtn = document.getElementById('decBtn');

let count = 0;

incBtn.addEventListener('click', () => {
    count++;
    display.textContent = count;
})

resetBtn.addEventListener('click', () => {
    count = 0;
    display.textContent = count;
})

decBtn.addEventListener('click', () => {
    count--;
    display.textContent = count;
})
