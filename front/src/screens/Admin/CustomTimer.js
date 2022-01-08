import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

function CustomTimer({ time, start,reset=false, msg, onlyS = false }) {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer(function (timer) {
        console.log("ll");
        if (timer > 0) {
          return timer - 1;
        } else {
          clearInterval(increment.current);
          navigate("/result1");
        }
      });
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const handleReset = () => {
    alert('reset')
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    //setTimer(100);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    if (!onlyS) {
      return `${getHours} : ${getMinutes} : ${getSeconds}`;
    } else {
      return `${getSeconds}`;
    }
  };
  useEffect(() => {
    setTimer(time);
    if (start) {
      handleStart();
    }
    if(reset){
      handleReset()
    }
  }, [start,reset]);

  return (
    <>
      {msg} <b>{formatTime()}</b>
    </>
  );
}

export default CustomTimer;
