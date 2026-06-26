import React from 'react';
import { WeatherData } from '../types';

interface HourlyForecastProps {
  hourlyData: WeatherData['forecast']['forecastday'][0]['hour'] | undefined;
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
  // Array empty ba undefined hole blank placeholder dekhabe, crash korbe na
  if (!hourlyData || !Array.isArray(hourlyData)) {
    return (
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md text-center text-xs text-neutral-500 font-mono">
        Loading hourly matrix...
      </div>
    );
  }

  const currentHour = new Date().getHours();
  const displayHours = hourlyData.filter((_, index) => index >= currentHour).slice(0, 6);

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md">
      <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-mono">Today's Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        {displayHours.map((hour, index) => {
          // Time details string check logic
          const timeStr = hour?.time ? hour.time.split(' ')[1] : '--:--';
          return (
            <div key={index} className="flex flex-col items-center justify-between min-w-[85px] bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.05] transition-all group">
              <span className="text-xs text-neutral-400 font-medium">{timeStr}</span>
              {hour?.condition?.icon && (
                <img src={hour.condition.icon} alt="icon" className="w-10 h-10 my-2 group-hover:scale-110 transition-transform" />
              )}
              <span className="text-base font-bold text-white">{Math.round(hour?.temp_c)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}