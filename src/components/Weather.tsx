'use client';

import React, { useState } from 'react';
import { WeatherData } from '../types';
import MainWeather from './MainWeather';
import Forecast from './Forecast';
import HourlyForecast from './HourlyForecast';
import LiveConditions from './LiveConditions';
import RecentlySearched from './RecentlySearched';
import Sidebar from './Sidebar';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "4fc78a923254846221a430089f1443f8"; 

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity) return;
    setLoading(true);
    try {
      const safeCity = encodeURIComponent(searchCity.trim());
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${safeCity}&appid=${API_KEY}&units=metric`);
      if (!res.ok) throw new Error("Location not found!");
      const rawData = await res.json();
      
      const formattedData: WeatherData = {
        location: {
          name: rawData.city.name,
          region: rawData.city.country,
          country: rawData.city.country,
          localtime: new Date().toLocaleTimeString(),
        },
        current: {
          temp_c: rawData.list[0].main.temp,
          condition: { 
            text: rawData.list[0].weather[0].main, 
            icon: `https://openweathermap.org/img/wn/${rawData.list[0].weather[0].icon}@2x.png`,
            code: rawData.list[0].weather[0].id 
          },
          wind_kph: rawData.list[0].wind.speed * 3.6,
          humidity: rawData.list[0].main.humidity,
          feelslike_c: rawData.list[0].main.feels_like,
          uv: 0,
          pressure_mb: rawData.list[0].main.pressure,
        },
        forecast: {
          forecastday: rawData.list.filter((_: any, idx: number) => idx % 8 === 0).map((item: any) => ({
            date: item.dt_txt.split(' ')[0],
            day: {
              maxtemp_c: item.main.temp_max,
              mintemp_c: item.main.temp_min,
              avgtemp_c: item.main.temp,
              condition: { 
                text: item.weather[0].description, 
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` 
              },
            },
            hour: rawData.list.slice(0, 8).map((h: any) => ({
              time: h.dt_txt,
              temp_c: h.main.temp,
              condition: { icon: `https://openweathermap.org/img/wn/${h.weather[0].icon}.png` }
            }))
          }))
        }
      };
      setWeatherData(formattedData);
    } catch (err) {
      alert("Weather dynamic data load error!");
    } finally {
      setLoading(false);
    }
  };

  // POCO / MIUI Style Global Gradient Background Matrix Mapper
  const getCinematicTheme = () => {
    if (!weatherData) return "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900";
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-950"; // Cinematic rainy gloomy sky
    }
    if (condition.includes("cloud")) {
      return "bg-gradient-to-tr from-sky-900 via-zinc-800 to-neutral-950"; // Heavy overcast atmospheric depth
    }
    if (condition.includes("clear") || condition.includes("sun")) {
      return "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-blue-600 to-indigo-950"; // Clear blue daylight sky
    }
    return "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900";
  };

  const conditionText = weatherData?.current.condition.text.toLowerCase() || "";

  return (
    <div className={`flex min-h-screen ${getCinematicTheme()} text-white font-sans overflow-hidden relative transition-all duration-1000`}>
      
      {/* 🌤️ CASE A: CINEMATIC SUN / CLEAR ANIMATION OVERLAY */}
      {conditionText.includes("clear") && (
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-amber-400/20 blur-[80px] animate-pulse pointer-events-none z-0 duration-[4000ms]" />
      )}

      {/* 🌧️ CASE B: DYNAMIC REAL-TIME WEATHER PARTICLES FOR RAIN */}
      {conditionText.includes("rain") && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
          <div className="absolute top-[-20%] left-[10%] w-[1px] h-[120px] bg-sky-200 animate-rain-drop"></div>
          <div className="absolute top-[-20%] left-[25%] w-[1px] h-[150px] bg-sky-300 animate-rain-drop [animation-delay:0.2s]"></div>
          <div className="absolute top-[-20%] left-[45%] w-[1px] h-[100px] bg-slate-300 animate-rain-drop [animation-delay:0.5s]"></div>
          <div className="absolute top-[-20%] left-[65%] w-[1px] h-[140px] bg-sky-100 animate-rain-drop [animation-delay:0.1s]"></div>
          <div className="absolute top-[-20%] left-[80%] w-[1px] h-[110px] bg-sky-300 animate-rain-drop [animation-delay:0.7s]"></div>
          <div className="absolute top-[-20%] left-[95%] w-[1px] h-[130px] bg-slate-400 animate-rain-drop [animation-delay:0.4s]"></div>
        </div>
      )}

      {/* ☁️ CASE C: CINEMATIC CLOUDS FLOATING EFFECT */}
      {conditionText.includes("cloud") && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
          <div className="absolute top-[10%] left-[-20%] w-[40%] h-[30%] bg-zinc-400 blur-[60px] rounded-full animate-float" />
          <div className="absolute top-[25%] right-[-20%] w-[50%] h-[25%] bg-slate-500 blur-[80px] rounded-full animate-float [animation-delay:3s]" />
        </div>
      )}

      {/* Real layout context shell */}
      <div className="flex w-full min-h-screen z-20 relative backdrop-blur-[2px]">
        <Sidebar />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Engine search layout */}
          <form onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }} className="flex max-w-md mx-auto items-center gap-3 bg-black/20 border border-white/10 backdrop-blur-xl rounded-2xl px-4 py-2.5 focus-within:border-cyan-500/50 transition-all duration-300 shadow-2xl">
            <input 
              type="text" 
              placeholder="Search city (e.g. Kolkata, London)..." 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm font-medium placeholder:text-neutral-500 text-white"
            />
            <button type="submit" className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:opacity-90">🔍</button>
          </form>

          {loading && <p className="text-center text-sm font-mono text-cyan-400 animate-pulse">Connecting Atmosphere Hub...</p>}

          {weatherData ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <MainWeather data={weatherData.current} location={weatherData.location} />
                <HourlyForecast hourlyData={weatherData.forecast.forecastday[0]?.hour} />
                <LiveConditions data={weatherData.current} />
              </div>
              <div className="space-y-6">
                <Forecast forecastDays={weatherData.forecast.forecastday} />
                <RecentlySearched />
              </div>
            </div>
          ) : (
            !loading && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="text-5xl animate-bounce">🌍</div>
                <h2 className="text-xl font-bold text-neutral-300">Live Weather Display Core</h2>
                <p className="text-xs text-neutral-500 max-w-xs">Type any worldwide city above to active pure hardware CSS dynamic environment render.</p>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}