import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=9de148424d1814b2c0b8bf08b547206e`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}&#176;C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? (
                  <p>{data.main.feels_like.toFixed()}&#176;C</p>
                ) : null}
              </p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? <p>{data.main.humidity}%</p> : null}
              </p>
              <p>Humiditiy</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.main ? <p>{data.wind.speed.toFixed()} km/h</p> : null}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
