// src/App.js
import React, { useState } from 'react';
import Clock from './Clock';
import './App.css';

function App() {
  const [clocks, setClocks] = useState([]);
  const [formData, setFormData] = useState({
    country: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClock = (e) => {
    e.preventDefault();
    const { country, hours, minutes, seconds } = formData;
    if (!country || !hours || !minutes || !seconds) {
      alert('Please fill in all fields');
      return;
    }
    const newClock = new Clock(hours, minutes, seconds, country);
    setClocks([...clocks, newClock]);
    setFormData({
      country: '',
      hours: '',
      minutes: '',
      seconds: '',
    });
  };

  return (
    <div className="App">
      <h1>Clock Application</h1>
      <form onSubmit={handleAddClock}>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country name"
        />
        <input
          type="number"
          name="hours"
          value={formData.hours}
          onChange={handleInputChange}
          placeholder="Hours"
          min="0"
          max="23"
        />
        <input
          type="number"
          name="minutes"
          value={formData.minutes}
          onChange={handleInputChange}
          placeholder="Minutes"
          min="0"
          max="59"
        />
        <input
          type="number"
          name="seconds"
          value={formData.seconds}
          onChange={handleInputChange}
          placeholder="Seconds"
          min="0"
          max="59"
        />
        <button type="submit">Add Clock</button>
      </form>
      {clocks.length > 0 && (
        <div className="clock-list">
          {clocks.map((clock, index) => (
            <div key={index} className="clock-item">
              <h3>{clock.country}</h3>
              <p>Time: {clock.show()}</p>
              <p>Seconds: {clock.convertToSeconds()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
