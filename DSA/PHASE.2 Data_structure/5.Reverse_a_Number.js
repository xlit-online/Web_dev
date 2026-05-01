let num = 1234;
let rev = 0;

while (num > 0) {
    rev = rev * 10 + (num % 10);
    num = Math.floor(num / 10);
}

console.log(rev); // 4321
