import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '40cddc1db84a249e8f7c9a4e9c48a404';

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Max Temperature: {weather.main.temp_max} °C</p>
          <p>Min Temperature: {weather.main.temp_min} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
