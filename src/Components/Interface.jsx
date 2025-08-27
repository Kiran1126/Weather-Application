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
    <div className="min-h-[570px] w-[500px] p-10 rounded-2xl bg-linear-210 bg-amber-50 flex flex-col justify-around items-start shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <TopSection />
      <Search city={city} setCity={setCity} getWeather={getWeather} />
      <MidSection error={error} weather={weather} />
    </div>
  );
};

const TopSection = () => {
  return(
    <div className="w-full flex justify-between items-center px-5 text-black mb-10">
      <div className="flex gap-3">
        <span class="material-symbols-outlined">
          video_chat
        </span>
        <span class="material-symbols-outlined">
          sms
        </span>
      </div>
      <div className="flex gap-3">
        <span class="material-symbols-outlined">
          android_wifi_4_bar
        </span>
        <span class="material-symbols-outlined">
          4g_plus_mobiledata
        </span>
        <span class="material-symbols-outlined">
          battery_android_frame_2
        </span>
      </div>
    </div>
  );
};

function Search({ city, setCity, getWeather }){
  return(
    <div className="h-full w-full flex justify-center items-start mb-5">
      <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter your city..."  required className="border-2 p-2 rounded-l-xl text-lg"/>
      <button onClick={getWeather}>
        <span className="material-symbols-outlined text-black p-2.5 border-2 border-r-black rounded-r-xl cursor-pointer">
          search
        </span>
      </button> 
    </div>
  );
};

const MidSection = ({ error, weather }) => {
  return(
    <div className="h-full w-full flex justify-center items-center text-black text-xl">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        weather ? (
          <div className="flex-col">
            <h2>📍 {weather.name}, {weather.sys.country}</h2>
            <p>🌡️ Temperature: {weather.main.temp} °C</p>
            <p>😱 Feels like: {weather.main.feels_like} °C</p>
            <p>🌧️ Humidity: {weather.main.humidity}</p>
            <p>💨 Wind Speed: {weather.wind.speed}</p>
            <p>📋 Forecast: {weather.weather[0].description}</p>
            <div className="w-full flex justify-center">
              <img 
                className="h-[120px] w-[120px]"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          </div>
        ) : (
          <img src="src/assets/Searching.jpg" />
        )
      }
    </div>
  );
};

export default Interface;