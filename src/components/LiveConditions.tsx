import React from 'react';
import { WeatherData } from '../types';

interface LiveConditionsProps {
  data: WeatherData['current'];
}

export default function LiveConditions({ data }: LiveConditionsProps) {
  const conditions = [
    { label: 'Wind Speed', value: `${data.wind_kph} km/h`, icon: '💨', color: 'from-blue-500/20 to-transparent' },
    { label: 'Humidity', value: `${data.humidity}%`, icon: '💧', color: 'from-cyan-500/20 to-transparent' },
    { label: 'UV Index', value: data.uv, icon: '☀️', color: 'from-amber-500/20 to-transparent' },
    { label: 'Pressure', value: `${data.pressure_mb} hPa`, icon: '⏲️', color: 'from-purple-500/20 to-transparent' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {conditions.map((item, idx) => (
        <div key={idx} className={`relative overflow-hidden bg-gradient-to-br ${item.color} bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between h-32`}>
          <div className="text-2xl">{item.icon}</div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">{item.label}</p>
            <p className="text-lg font-bold text-white mt-1">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}