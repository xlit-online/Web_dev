const valueInput = document.getElementById("value");
const typeSelect = document.getElementById("type");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const units = {
  length: ["meters", "kilometers", "miles"],
  weight: ["kg", "grams", "pounds"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

function loadUnits() {
  const type = typeSelect.value;

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  units[type].forEach(unit => {
    const option1 = document.createElement("option");
    option1.value = unit;
    option1.textContent = unit;
    fromUnit.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = unit;
    option2.textContent = unit;
    toUnit.appendChild(option2);
  });
}

function convert(value, from, to, type) {
  if (from === to) return value;

  if (type === "length") {
    const map = { meters: 1, kilometers: 1000, miles: 1609.34 };
    return (value * map[from]) / map[to];
  }

  if (type === "weight") {
    const map = { kg: 1, grams: 0.001, pounds: 0.453592 };
    return (value * map[from]) / map[to];
  }

  if (type === "temperature") {
    if (from === "celsius" && to === "fahrenheit") return (value * 9) / 5 + 32;
    if (from === "celsius" && to === "kelvin") return value + 273.15;

    if (from === "fahrenheit" && to === "celsius") return ((value - 32) * 5) / 9;
    if (from === "fahrenheit" && to === "kelvin") return ((value - 32) * 5) / 9 + 273.15;

    if (from === "kelvin" && to === "celsius") return value - 273.15;
    if (from === "kelvin" && to === "fahrenheit") return ((value - 273.15) * 9) / 5 + 32;
  }

  return value;
}

convertBtn.addEventListener("click", () => {
  const value = parseFloat(valueInput.value);

  if (isNaN(value)) {
    result.textContent = "Enter a valid number!";
    return;
  }

  const type = typeSelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;

  const converted = convert(value, from, to, type);

  result.textContent = `${value} ${from} = ${converted.toFixed(2)} ${to}`;
});

typeSelect.addEventListener("change", loadUnits);

loadUnits();