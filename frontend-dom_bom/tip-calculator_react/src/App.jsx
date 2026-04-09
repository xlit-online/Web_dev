import { useState } from "react";
import "./App.css";

export default function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("");
  const [people, setPeople] = useState("");

  const [tipAmount, setTipAmount] = useState(null);
  const [totalBill, setTotalBill] = useState(null);
  const [perPerson, setPerPerson] = useState(null);

  function calculateTip() {
    const b = parseFloat(bill);
    const t = parseFloat(tip);
    const p = parseInt(people);

    if (!b || !t || !p || p <= 0) {
      setTipAmount(null);
      setTotalBill(null);
      setPerPerson(null);
      return;
    }

    const tipValue = (b * t) / 100;
    const finalBill = b + tipValue;
    const eachPerson = finalBill / p;

    setTipAmount(tipValue.toFixed(2));
    setTotalBill(finalBill.toFixed(2));
    setPerPerson(eachPerson.toFixed(2));
  }

  return (
    <div className="container">
      <h1>Tip Calculator</h1>

      <input
        type="number"
        placeholder="Bill Amount"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <input
        type="number"
        placeholder="Tip Percentage (%)"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
      />

      <input
        type="number"
        placeholder="Number of People"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
      />

      <button onClick={calculateTip}>Calculate</button>

      {tipAmount && (
        <>
          <h2>Tip Amount: ₹{tipAmount}</h2>
          <h2>Total Bill: ₹{totalBill}</h2>
          <h2>Per Person: ₹{perPerson}</h2>
        </>
      )}

      {!tipAmount && <p className="error">Enter values to calculate.</p>}
    </div>
  );
}