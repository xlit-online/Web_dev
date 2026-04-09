import { useState } from "react";
import "./App.css";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  function calculateBMI() {
    const w = parseFloat(weight);
    const hCm = parseFloat(height);

    if (!w || !hCm) {
      setBmi(null);
      setCategory("Please enter valid values!");
      return;
    }

    const hM = hCm / 100;
    const bmiValue = w / (hM * hM);

    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setCategory("Category: Underweight");
    } else if (bmiValue < 24.9) {
      setCategory("Category: Normal weight");
    } else if (bmiValue < 29.9) {
      setCategory("Category: Overweight");
    } else {
      setCategory("Category: Obesity");
    }
  }

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <button onClick={calculateBMI}>Calculate BMI</button>

      {bmi && <h2>Your BMI: {bmi}</h2>}
      <p>{category}</p>
    </div>
  );
}