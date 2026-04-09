const passwordField = document.getElementById("password");
const lengthInput = document.getElementById("length");

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/|";

function generatePassword() {
  let chars = "";

  if (uppercaseCheck.checked) chars += upperChars;
  if (lowercaseCheck.checked) chars += lowerChars;
  if (numbersCheck.checked) chars += numberChars;
  if (symbolsCheck.checked) chars += symbolChars;

  if (chars === "") {
    passwordField.value = "";
    message.textContent = "Select at least one option!";
    return;
  }

  const length = parseInt(lengthInput.value);
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordField.value = password;
  message.textContent = "Password generated!";
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (!passwordField.value) return;

  navigator.clipboard.writeText(passwordField.value);
  message.textContent = "Copied to clipboard!";
});