import React, { useState, useEffect } from "react";

function App() {
  const [inputMinutes, setInputMinutes] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setInputMinutes(value);

    if (!isNaN(value) && value !== "" && value > 0) {
      const totalSeconds = parseInt(value) * 60;
      setHours(Math.floor(totalSeconds / 3600));
      setMinutes(Math.floor((totalSeconds % 3600) / 60));
      setSeconds(totalSeconds % 60);
    } else {
      setStart(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  useEffect(() => {
    let timer;
    if (start) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(timer);
              setStart(false);
            } else {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [start, hours, minutes, seconds]);

  return (
    <div className="App text-center p-4 bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Timer</h1>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter Minutes"
          value={inputMinutes}
          onChange={handleInput}
          className="border border-gray-300 p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <h3 className="text-xl mb-4">
        {hours} Hours : {minutes} Minutes : {seconds} Seconds
      </h3>
      <div>
        <button
          className={`px-4 py-2 rounded mr-2 ${
            start ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
          onClick={() => setStart(!start)}
        >
          {start ? "Stop" : "Start"}
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
          onClick={() => {
            setStart(false);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            setInputMinutes("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
