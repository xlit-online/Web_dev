import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  function formatTime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }

  function startTimer() {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <h1>Stopwatch</h1>

      <div className="display">{formatTime(seconds)}</div>

      <div className="buttons">
        <button className="start" onClick={startTimer}>Start</button>
        <button className="stop" onClick={stopTimer}>Stop</button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}