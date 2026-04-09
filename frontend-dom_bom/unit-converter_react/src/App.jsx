import { useEffect, useState } from "react";
import "./App.css";

const units = {
  length: ["meters", "kilometers", "miles"],
  weight: ["kg", "grams", "pounds"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

export default function App() {
  const [type, setType] = useState("length");
  const [from, setFrom] = useState("meters");
  const [to, setTo] = useState("kilometers");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setFrom(units[type][0]);
    setTo(units[type][1]);
  }, [type]);

  function convert(val, fromUnit, toUnit, conversionType) {
    if (fromUnit === toUnit) return val;

    if (conversionType === "length") {
      const map = { meters: 1, kilometers: 1000, miles: 1609.34 };
      return (val * map[fromUnit]) / map[toUnit];
    }

    if (conversionType === "weight") {
      const map = { kg: 1, grams: 0.001, pounds: 0.453592 };
      return (val * map[fromUnit]) / map[toUnit];
    }

    if (conversionType === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") return (val * 9) / 5 + 32;
      if (fromUnit === "celsius" && toUnit === "kelvin") return val + 273.15;

      if (fromUnit === "fahrenheit" && toUnit === "celsius") return ((val - 32) * 5) / 9;
      if (fromUnit === "fahrenheit" && toUnit === "kelvin") return ((val - 32) * 5) / 9 + 273.15;

      if (fromUnit === "kelvin" && toUnit === "celsius") return val - 273.15;
      if (fromUnit === "kelvin" && toUnit === "fahrenheit") return ((val - 273.15) * 9) / 5 + 32;
    }

    return val;
  }

  function handleConvert() {
    const num = parseFloat(value);

    if (isNaN(num)) {
      setResult("Enter a valid number!");
      return;
    }

    const converted = convert(num, from, to, type);
    setResult(`${num} ${from} = ${converted.toFixed(2)} ${to}`);
  }

  return (
    <div className="container">
      <h1>Unit Converter</h1>

      <input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>

      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {units[type].map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {units[type].map((u) => (
          <option key={u} value={u}>{u}</option>
        ))}
      </select>

      <button onClick={handleConvert}>Convert</button>

      <h2>{result}</h2>
    </div>
  );
}