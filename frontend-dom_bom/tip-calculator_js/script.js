const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const calcBtn = document.getElementById("calcBtn");

const totalTip = document.getElementById("totalTip");
const totalBill = document.getElementById("totalBill");
const perPerson = document.getElementById("perPerson");

calcBtn.addEventListener("click", () => {
  const bill = parseFloat(billInput.value);
  const tipPercent = parseFloat(tipInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || !tipPercent || !people || people <= 0) {
    totalTip.textContent = "Please enter valid values!";
    totalBill.textContent = "";
    perPerson.textContent = "";
    return;
  }

  const tipAmount = (bill * tipPercent) / 100;
  const finalBill = bill + tipAmount;
  const eachPerson = finalBill / people;

  totalTip.textContent = `Tip Amount: ₹${tipAmount.toFixed(2)}`;
  totalBill.textContent = `Total Bill: ₹${finalBill.toFixed(2)}`;
  perPerson.textContent = `Per Person: ₹${eachPerson.toFixed(2)}`;
});