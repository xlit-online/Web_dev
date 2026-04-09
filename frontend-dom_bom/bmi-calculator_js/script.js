const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calcBtn = document.getElementById("calcBtn");

const result = document.getElementById("result");
const category = document.getElementById("category");

calcBtn.addEventListener("click", () => {
  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);

  if (!weight || !heightCm) {
    result.textContent = "Please enter valid values!";
    category.textContent = "";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  result.textContent = `Your BMI: ${bmi.toFixed(2)}`;

  if (bmi < 18.5) {
    category.textContent = "Category: Underweight";
  } else if (bmi < 24.9) {
    category.textContent = "Category: Normal weight";
  } else if (bmi < 29.9) {
    category.textContent = "Category: Overweight";
  } else {
    category.textContent = "Category: Obesity";
  }
});