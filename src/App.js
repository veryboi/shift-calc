import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [shiftStart, setShiftStart] = useState('');
  const [lunchStart, setLunchStart] = useState('');
  const [lunchEnd, setLunchEnd] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0'+minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }
  const parseTime = (timeInput) => {
    const [hours, minutes] = timeInput.split(':').map(Number);
    console.log(new Date(2024, 1, 1, hours, minutes))
    
    return new Date(2024, 1, 1, hours, minutes);
  }
  useEffect(()=> {
    if (shiftStart && lunchStart && lunchEnd) {
      
    
  const startTime = parseTime(shiftStart);
  let lunchStartTime = parseTime(lunchStart);
  let lunchEndTime = parseTime(lunchEnd);

  if (lunchStartTime < startTime) {
    lunchStartTime.setHours(lunchStartTime.getHours() + 12);
  }

  if (lunchEndTime < lunchStartTime) {
    lunchEndTime.setHours(lunchEndTime.getHours()+12);
  }
  const beforeLunchTime = (lunchStartTime - startTime) / 3600000;
  const lunchTime = (lunchEndTime - lunchStartTime) / 3600000;
  const totalWorkTime = 8;

  const afterLunchTime = totalWorkTime - beforeLunchTime;

  const shiftEndTime = new Date(lunchEndTime.getTime() + afterLunchTime * 3600000);
  console.log(shiftEndTime);
  const formattedShiftEnd = formatTime(shiftEndTime);

  setShiftEnd('Your shift ends at ' + formattedShiftEnd);
} else {
  setShiftEnd('Pls complete all time fields');
     
}}, [shiftStart, lunchStart, lunchEnd] );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shift End Calculator</h1>
        <div className="input-container">
        <div className="input-group">
        <label htmlFor="lunchEnd">Shift Start</label>
        <input 
        type="text"
        value={shiftStart}
        onChange={(e=> setShiftStart(e.target.value))}
        placeholder="Shift Start"/>
        </div>
<div className="input-group">
<label htmlFor="lunchEnd">Lunch Start</label>
        <input 
        type="text"
        value={lunchStart}
        onChange={e => setLunchStart(e.target.value)}
        placeholder="Lunch Start"/>
</div>

<div className="input-group">
  <label htmlFor="lunchEnd">Lunch End</label>
<input 
        type="text"
        value={lunchEnd}
        onChange={e => setLunchEnd(e.target.value)}
        placeholder="Lunch End"/>
        </div>
        </div>

<h3>{shiftEnd}</h3>
      </header>

      
    </div>
  );
}

export default App;
