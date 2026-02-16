import React from 'react'
import { useState, useEffect } from "react";

export const TiempoTurno = ({operadoresOn}) => {


    const initialTime = operadoresOn
    const [currentTime, setCurrentTime] = useState(parseTime(initialTime));
  
    useEffect(() => {
        const timerInterval = setInterval(() => {
          if (currentTime > 0) {
            setCurrentTime(currentTime + 1);
          } else {
            clearInterval(timerInterval);
          }
        }, 1000); 
      
        return () => {
          clearInterval(timerInterval);
        };
      }, [currentTime]);
    
    function parseTime(timeString) {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }
  
    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
      

  return (
    <h6> {formatTime(currentTime)} </h6>
  )
}