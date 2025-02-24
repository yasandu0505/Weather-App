import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import searchIcon from "../images/search.png";
import humidityIcon from "../images/humidity.png";
import airSpeedIcon from "../images/wind.png";
import { useState, useEffect } from "react";

const MainBody = () => {
  const apiKey = "55c06efe7456fc527c66462bfaac5b7b";

  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    cityName: "Your City",
    temperature: "0",
    status: "Status not found",
    humidity: "0",
    windSpeed: "0",
    weatherIcon: "01d",
  });
  const [dateInfo, setDateInfo] = useState({ date: "", dayName: "" });

  useEffect(() => {
    fetchTime();
  }, []);

  const fetchTime = async () => {
    try {
      const response = await fetch("");
      if (!response.ok) throw new Error("Failed to fetch time");

      const timeData = await response.json();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dateTime = new Date(timeData.datetime);

      setDateInfo({
        date: dateTime.toISOString().split("T")[0],
        dayName: days[timeData.day_of_week] || "Date not found",
      });
    } catch (error) {
      console.error("Time fetch error:", error);
      setDateInfo({ date: "Time not found", dayName: "Date not found" });
    }
  };

  const fetchWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      const weatherConditions = {
        "01d": "Clear Sky", "02d": "Few Clouds", "03d": "Scattered Clouds", "04d": "Broken Clouds",
        "09d": "Shower Rain", "10d": "Rain", "11d": "Thunderstorm", "13d": "Snow", "50d": "Mist",
        "01n": "Clear Sky", "02n": "Few Clouds", "03n": "Scattered Clouds", "04n": "Broken Clouds",
        "09n": "Shower Rain", "10n": "Rain", "11n": "Thunderstorm", "13n": "Snow", "50n": "Mist",
      };

      setWeatherData({
        cityName: data.name,
        temperature: Math.floor(data.main.temp),
        status: weatherConditions[data.weather[0].icon] || "Status not found",
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherIcon: data.weather[0].icon,
      });
    } catch (error) {
      console.error("Weather fetch error:", error);
      setWeatherData({
        cityName: "City not Found",
        temperature: "-",
        status: "Status not found",
        humidity: "-",
        windSpeed: "-",
        weatherIcon: "01d",
      });
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="search-section">
          <input
            className="city-input"
            type="text"
            placeholder="Search"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <div className="search-icon-section" onClick={fetchWeather}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>

        <div className="city-name-temperature-section">
          <div className="city-temperature">
            <h1 className="city-name">
              <span className="location-icon">
                <i className="bi bi-geo-alt-fill me-4"></i>
              </span>
              {weatherData.cityName}
            </h1>
            <h1 className="temperature ms-md-3 ms-0">{weatherData.temperature}°C</h1>
            <h4 className="status ms-md-3 ms-0">{weatherData.status}</h4>
            <p className="date ms-md-3 ms-0">{dateInfo.dayName} | {dateInfo.date}</p>
          </div>
          <div className="weather-icon">
            <img src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`} alt="Weather" />
          </div>
        </div>

        <div className="humidity-airspeed-section">
          <div className="humidity-section">
            <img className="humidity-icon" src={humidityIcon} alt="Humidity" />
            <div className="humidity">
              <h6>Humidity</h6>
              <h4>{weatherData.humidity}%</h4>
            </div>
          </div>
          <div className="airSpeed-section">
            <img className="airSpeed-icon" src={airSpeedIcon} alt="Air Speed" />
            <div className="airSpeed">
              <h6>Wind Speed</h6>
              <h4>{weatherData.windSpeed} km/h</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
