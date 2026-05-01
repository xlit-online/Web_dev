let num = 123;
let sum = 0;
let temp = num;

while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
}

if (sum === 3 || sum === 6 || sum === 9 || sum === 12) {
    console.log(true);
} else {
    console.log(false);
}
