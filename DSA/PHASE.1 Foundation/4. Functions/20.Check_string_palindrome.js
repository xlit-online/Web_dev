let str = "madam";
let left = 0;
let right = str.length - 1;
let isPalindrome = true;

while (left < right) {
    if (str[left] !== str[right]) {
        isPalindrome = false;
        break;
    }
    left++;
    right--;
}

console.log(isPalindrome);
