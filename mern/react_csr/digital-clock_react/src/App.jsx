import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const dateText = time.toLocaleDateString("en-US", options);

  return (
    <div className="container">
      <h1>Digital Clock</h1>
      <div className="clock">
        {hours}:{minutes}:{seconds}
      </div>
      <p className="date">{dateText}</p>
    </div>
  );
}