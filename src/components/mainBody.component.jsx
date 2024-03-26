import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import searchIcon from "../images/search.png";
import humidity from "../images/humidity.png";
import airSpeed from "../images/wind.png";
import { useState } from "react";
const MainBody = () => {
  const apiKey = "55c06efe7456fc527c66462bfaac5b7b";

  const [inputCity, setInputCity] = useState("");
  const [cityName, setCityName] = useState("Your City");
  const [temperature, setTemperature] = useState("0");
  const [statusOfWeather, setStatusOfWeather] = useState("status not found");
  const [humidityy, setHumidity] = useState("0");
  const [windSpeed, setWindSpeed] = useState("0");
  const [date, setDate] = useState("");
  const [dateName,setDateName] = useState("");
  const [weatherIcon,setWeatherIcon] = useState("01d");

  const handleInputCity = (e) => {
    setInputCity(e.target.value);
  };

  const handleTime = async () => {
    const timeUrl = "http://worldtimeapi.org/api/ip";
    const timeResponse = await fetch(timeUrl);

    if (!timeResponse.ok) {
      setDate("Time not found");
      throw new Error("Network response was not ok for the time");
    }

    const timeData = await timeResponse.json();

    const dayDetect = timeData.day_of_week;
      switch(dayDetect){
        case 1 :
          setDateName("Monday");
          break;
        case 2 :
          setDateName("Tuesday");
          break;
        case 3 :
          setDateName("Wednesday");
          break;
        case 4 :
          setDateName("Thursday");
          break;
        case 5 :
          setDateName("Friday");
          break;
        case 6 :
          setDateName("Saturday");
          break;
        case 7 :
          setDateName("Sunday");
          break;
        default:
          setDateName("date not found");

      }

      const dateTimeString = timeData.datetime;
      const dateTime = new Date(dateTimeString);
      const currentDate = dateTime.toISOString().split("T")[0];
   
      console.log("Date:", currentDate);
      setDate(currentDate);


  }
  handleTime();

  const handleSearch = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=Metric&appid=${apiKey}`;
      const response = await fetch(url);

    
      if (!response.ok) {
        setCityName("City not Found");
        setTemperature("-");
        setStatusOfWeather("status not found");
        setHumidity("-");
        setWindSpeed("-");
        setWeatherIcon("01d");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.cod === 200) {
        setCityName(data.name);
        setTemperature(Math.floor(data.main.temp));
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      } else {
        console.error("Error in API response:", data.message);
      }

      const weatherIconId = data.weather[0].icon;
      switch(weatherIconId){
        case "01d":
          setWeatherIcon("01d");
          setStatusOfWeather("Clear Sky");
          break;
        case "02d":
          setWeatherIcon("02d");
          setStatusOfWeather("Few Clouds");
          break;
        case "03d":
          setWeatherIcon("03d");
          setStatusOfWeather("Scattered Clouds");
          break;
        case "04d":
          setWeatherIcon("04d");
          setStatusOfWeather("Broken Clouds");
          break;
        case "09d":
          setWeatherIcon("09d");
          setStatusOfWeather("Shower Rain");
          break;
        case "10d":
          setWeatherIcon("10d");
          setStatusOfWeather("Rain");
          break;
        case "11d":
          setWeatherIcon("11d");
          setStatusOfWeather("Thunderstrom");
          break;
        case "13d":
          setWeatherIcon("13d");
          setStatusOfWeather("Snow");
          break;
        case "50d":
          setWeatherIcon("50d");
          setStatusOfWeather("Mist");
          break;
        case "01n":
          setWeatherIcon("01n");
          setStatusOfWeather("Clear Sky");
          break;
        case "02n":
          setWeatherIcon("02n");
          setStatusOfWeather("Few Clouds");
          break;
        case "03n":
          setWeatherIcon("03n");
          setStatusOfWeather("Scattered Clouds");
          break;
        case "04n":
          setWeatherIcon("04n");
          setStatusOfWeather("Broken Clouds");
          break;
        case "09n":
          setWeatherIcon("09n");
          setStatusOfWeather("Shower Rain");
          break;
        case "10n":
          setWeatherIcon("10n");
          setStatusOfWeather("Rain");
          break;
        case "11n":
          setWeatherIcon("11n");
          setStatusOfWeather("Thunderstrom");
          break;
        case "13n":
          setWeatherIcon("13n");
          setStatusOfWeather("Snow");
          break;
        case "50n":
          setWeatherIcon("50n");
          setStatusOfWeather("Mist");
          break;
        default:
          setWeatherIcon("status not found");
      }
      
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
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
            onChange={handleInputCity}
          />
          <div className="search-icon-section" onClick={() => handleSearch()}>
            <img src={searchIcon} alt="" />
          </div>
        </div>
        <div className="city-name-temperature-section">
          <div className="city-temperature">
            <h1 className="city-name">
              {/* <span className="location-icon">
                <i class="bi bi-geo-alt-fill me-4"></i>
              </span> */}
              {cityName}
            </h1>
            <h1 className="temperature ms-md-3 ms-0">{temperature}°C</h1>{" "}
            <h4 className="status ms-md-3 ms-0">{statusOfWeather}</h4>
            <p className="date ms-md-3 ms-0">{dateName} | {date}</p>
          </div>
          <div className="weather-icon">
            <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />
          </div>
        </div>
        <div className="humidity-airspeed-preasure-section">
          <div className="humidity-section">
            <img className="humidity-icon" src={humidity} alt="" />
            <div className="humidity">
              <h6>Humidity</h6>
              <h4>{humidityy}%</h4>
            </div>
          </div>
          <div className="airSpeed-section">
            <img className="airSpeed-icon" src={airSpeed} alt="" />
            <div className="airSpeed">
              <h6>Air Speed</h6>
              <h4>{windSpeed} km/h</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
