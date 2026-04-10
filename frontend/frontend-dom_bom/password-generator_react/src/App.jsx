import { useState } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+{}[]<>?/|";

  function generatePassword() {
    let chars = "";

    if (uppercase) chars += upperChars;
    if (lowercase) chars += lowerChars;
    if (numbers) chars += numberChars;
    if (symbols) chars += symbolChars;

    if (!chars) {
      setPassword("");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  }

  function copyPassword() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="output-box">
        <input type="text" value={password} readOnly />
        <button onClick={copyPassword}>Copy</button>
      </div>

      <label>Password Length</label>
      <input
        type="number"
        value={length}
        min="4"
        max="50"
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={() => setUppercase(!uppercase)}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={lowercase}
            onChange={() => setLowercase(!lowercase)}
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
          Symbols
        </label>
      </div>

      <button className="generate" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}