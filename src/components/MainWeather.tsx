import React from 'react';
import { WeatherData } from '../types';

interface MainWeatherProps {
  data: WeatherData['current'] | undefined;
  location: WeatherData['location'] | undefined;
}

export default function MainWeather({ data, location }: MainWeatherProps) {
  // Jodi kono karone data na thake, tahole ekti placeholder card dekhabe, crash korbe na
  if (!location || !data) {
    return (
      <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center text-neutral-400 font-mono text-sm">
        No location data available. Please search for a city.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-2xl transition-all duration-300 hover:border-cyan-500/30">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="space-y-3">
        <div>
          {/* Optional Chaining (?.name) added here for double safety */}
          <h1 className="text-4xl font-black tracking-tight text-white">{location?.name}</h1>
          <p className="text-sm text-neutral-400 font-medium">{location?.region}, {location?.country}</p>
        </div>
        <span className="inline-block px-3 py-1 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
          {data?.condition?.text}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-6 md:mt-0 self-end md:self-auto">
        <div className="text-right">
          <h2 className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
            {Math.round(data?.temp_c)}°
          </h2>
          <p className="text-xs text-neutral-400 font-medium">Feels like: <span className="text-white">{Math.round(data?.feelslike_c)}°C</span></p>
        </div>
        {data?.condition?.icon && (
          <img 
            src={data.condition.icon} 
            alt={data.condition.text || 'weather icon'} 
            className="w-24 h-24 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse"
          />
        )}
      </div>
    </div>
  );
}