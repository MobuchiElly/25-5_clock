import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPause, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (timerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      if (timerLabel === "Session") {
        // setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else {
        // setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, timeLeft, breakLength, sessionLength, timerLabel]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!timerRunning) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (!timerRunning) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[rgb(30,85,92)] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-8">25 + 5 Clock</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-center mr-16">
          <h2 id="break-label" className="text-white text-2xl mb-2">Break Length</h2>
          <div className="flex items-center">
            <button
              id="break-decrement"
              className="text-white text-2xl px-4 py-1"
              onClick={decrementBreakLength}
              disabled={timerRunning}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <span id="break-length" className="text-white text-2xl px-4">{breakLength}</span>
            <button
              id="break-increment"
              className="text-white text-2xl px-4 py-1"
              onClick={incrementBreakLength}
              disabled={timerRunning}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 id="session-label" className="text-white text-2xl mb-2">Session Length</h2>
          <div className="flex items-center">
            <button
              id="session-decrement"
              className="text-white text-2xl px-4 py-1"
              onClick={decrementSessionLength}
              disabled={timerRunning}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <span id="session-length" className="text-white text-2xl px-4">{sessionLength}</span>
            <button
              id="session-increment"
              className="text-white text-2xl px-4 py-1"
              onClick={incrementSessionLength}
              disabled={timerRunning}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="border border-[rgb(19,53,58)] border-4 text-white rounded-3xl text-center min-w-80 p-8">
          <h2 id="timer-label" className="text-white text-2xl">{timerLabel}</h2>
          <div id="time-left" className="text-white text-5xl">{formatTime(timeLeft)}</div>
        </div>
        <div className="flex mt-4">
          <button
            id="start_stop"
            className="text-white text-2xl px-4 py-1 mr-4"
            onClick={handleStartStop}
          >
            {timerRunning ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <button
            id="reset"
            className="text-white text-2xl px-4 py-1"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>
      <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  );
};

export default App;
