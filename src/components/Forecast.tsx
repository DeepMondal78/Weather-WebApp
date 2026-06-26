import React from 'react';
import { WeatherData } from '../types';

interface ForecastProps {
  forecastDays: WeatherData['forecast']['forecastday'];
}

export default function Forecast({ forecastDays }: ForecastProps) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md space-y-4">
      <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider font-mono">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecastDays.map((day, idx) => {
          const dateObj = new Date(day.date);
          const dayName = idx === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:bg-white/[0.03] transition-all">
              <span className="w-16 text-sm font-medium text-neutral-300">{dayName}</span>
              <div className="flex items-center gap-2">
                <img src={day.day.condition.icon} alt="forecast icon" className="w-8 h-8" />
                <span className="text-xs text-neutral-400 hidden sm:inline max-w-[100px] truncate">{day.day.condition.text}</span>
              </div>
              <div className="text-sm font-mono font-semibold">
                <span className="text-white">{Math.round(day.day.maxtemp_c)}°</span>
                <span className="text-neutral-500 ml-2">{Math.round(day.day.mintemp_c)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}