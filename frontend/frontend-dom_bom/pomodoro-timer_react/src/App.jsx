import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const workTime = 25 * 60;
  const breakTime = 5 * 60;

  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);

  const timerRef = useRef(null);

  function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function startTimer() {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          if (isWork) {
            alert("Work finished! Break time!");
            setIsWork(false);
            return breakTime;
          } else {
            alert("Break finished! Work time!");
            setIsWork(true);
            return workTime;
          }
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
    setIsWork(true);
    setTimeLeft(workTime);
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>

      <div className="mode">{isWork ? "Work Time" : "Break Time"}</div>

      <div className="display">{formatTime(timeLeft)}</div>

      <div className="buttons">
        <button className="start" onClick={startTimer}>Start</button>
        <button className="pause" onClick={pauseTimer}>Pause</button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}