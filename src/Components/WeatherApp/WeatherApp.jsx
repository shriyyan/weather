// src/WeatherApp.js
import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = '22e507f123d28a73e217ef0b18d4c8b8';

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weatherData: null,
      error: null
    };
  }

  getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}&units=metric`);
      this.setState({ weatherData: response.data, error: null });
    } catch (err) {
      this.setState({ error: 'City not found', weatherData: null });
    }
  };

  render() {
    const { city, weatherData, error } = this.state;

    return (
      <div>
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => this.setState({ city: e.target.value })}
        />
        <button onClick={this.getWeather}>Get Weather</button>
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
