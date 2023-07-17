"use client";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Home() {
  const [city, setCity] = useState("Chennai");
  const [Details, setDetails] = useState();
  const [backgroundClass, setBackgroundClass] = useState("");
  const [CurrDate, setCurrDate] = useState(() => new Date().toString());
  const APIKey = "YourAPIKEY";

  const fetchWeatherData = () => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
      .then((response) => {
        setDetails(response.data);
      })
    setBackgroundClass(getBackgroundClass);
  };

  useEffect(() => {
    fetchWeatherData();
    setBackgroundClass(getBackgroundClass);

    const interval = setInterval(() => {
      setCurrDate(() => new Date().toString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const getBackgroundClass = () => {
    if (!Details) return "";
    const weatherCondition = Details.weather[0];

    if (weatherCondition.main === "Thunderstorm") return "bg-thunderstorm";
    if (weatherCondition.main === "Drizzle") return "bg-drizzle";
    if (weatherCondition.main === "Rain") return "bg-rain";
    if (weatherCondition.main === "Snow") return "bg-snow";
    if (weatherCondition.main === "Clouds") return "bg-clouds";
    if (weatherCondition.main === "Clear") return "bg-clear";
    if (weatherCondition.id.toString().startsWith('7')) return "bg-fog";
  }

  return (
    <main className={`flex min-h-screen flex-col p-24 ${backgroundClass} bg-gradient-to-b from-cyan-400 to-blue-500 font-sans`}>
      <div className="bg-slate-700 p-5">
        <input type="text" className="text-white bg-transparent capitalize text-4xl tracking-widest w-80" value={city} onChange={handleInputChange} />
        <button className="px-10 bg-blue-800 py-2" onClick={fetchWeatherData}>Show weather</button>
        <div className="tracking-wider mt-7">{CurrDate}</div>
      </div>

      {Details &&
        <div className="flex flex-row col-span-2 container">
          <div className="items bg-slate-700">Temperature<div>{Details.main.temp}</div></div>
          <div className="items bg-slate-700">Pressure<div>{Details.main.pressure}</div></div>
          <div className="items bg-slate-700">Humidity<div>{Details.main.humidity}</div></div>
          <div className="items bg-slate-700">Wind Speed<div>{Details.wind.speed}</div></div>
        </div>
      }
    </main>
  )
}