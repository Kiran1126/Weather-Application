import React, { useState } from "react";

const Interface = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if(!city) 
      return;
    try {
      const res = await fetch(`http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if(data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (error) {
      setError('Network error');
    } 
  };

  return (
    <div className="min-h-[75%] w-[500px] p-10 rounded-2xl bg-linear-210 from-deep via-mid to-sky flex justify-around items-center flex-col">
      <Search city={city} setCity={setCity} getWeather={getWeather} />
      <MidSection error={error} weather={weather} />
    </div>
  );
};

function Search({ city, setCity, getWeather }){
  return(
    <div className="h-full w-full flex justify-center items-start">
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter your city..."  required className="bg-white p-2 rounded-l-xl text-lg"/>
      <button onClick={getWeather}>
        <span className="material-symbols-outlined text-white p-2 border-2 border-r-white rounded-r-xl cursor-pointer">
          search
        </span>
      </button> 
    </div>
  );
};

const MidSection = ({ error, weather }) => {
  return(
    <div className="h-full w-full flex justify-center items-center">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        weather && (
          <div className="flex-col">
            <h2>📍 {weather.name}, {weather.sys.country}</h2>
            <p>🌡️ Temperature: {weather.main.temp} °C</p>
            <p>😱 Feels like: {weather.main.feels_like} °C</p>
            <p>🌧️ Humidity: {weather.main.humidity}</p>
            <p>💨 Wind Speed: {weather.wind.speed}</p>
            <p>📋 {weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        )
      }
    </div>
  );
};

export default Interface;