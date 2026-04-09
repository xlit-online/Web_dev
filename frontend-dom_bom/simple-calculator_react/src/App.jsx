import { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("");

  function appendValue(val) {
    setDisplay((prev) => prev + val);
  }

  function clearDisplay() {
    setDisplay("");
  }

  function deleteLast() {
    setDisplay((prev) => prev.slice(0, -1));
  }

  function calculateResult() {
    try {
      setDisplay(String(eval(display)));
    } catch {
      setDisplay("Error");
    }
  }

  return (
    <div className="calculator">
      <h1>Calculator</h1>

      <input type="text" value={display} readOnly />

      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={deleteLast}>DEL</button>
        <button onClick={() => appendValue("/")}>/</button>
        <button onClick={() => appendValue("*")}>*</button>

        <button onClick={() => appendValue("7")}>7</button>
        <button onClick={() => appendValue("8")}>8</button>
        <button onClick={() => appendValue("9")}>9</button>
        <button onClick={() => appendValue("-")}>-</button>

        <button onClick={() => appendValue("4")}>4</button>
        <button onClick={() => appendValue("5")}>5</button>
        <button onClick={() => appendValue("6")}>6</button>
        <button onClick={() => appendValue("+")}>+</button>

        <button onClick={() => appendValue("1")}>1</button>
        <button onClick={() => appendValue("2")}>2</button>
        <button onClick={() => appendValue("3")}>3</button>
        <button className="equal" onClick={calculateResult}>=</button>

        <button className="zero" onClick={() => appendValue("0")}>0</button>
        <button onClick={() => appendValue(".")}>.</button>
      </div>
    </div>
  );
}