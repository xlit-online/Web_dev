import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);

  function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function startTimer() {
    if (timerRef.current !== null) return;

    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;

    const total = mins * 60 + secs;

    if (total <= 0) {
      alert("Enter time first!");
      return;
    }

    setTimeLeft(total);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          alert("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimeLeft(0);
    setMinutes("");
    setSeconds("");
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <h1>Countdown Timer</h1>

      <div className="input-box">
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        <input
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>

      <div className="display">{formatTime(timeLeft)}</div>

      <div className="buttons">
        <button className="start" onClick={startTimer}>Start</button>
        <button className="pause" onClick={pauseTimer}>Pause</button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}