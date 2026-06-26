import React from 'react';

export default function Sidebar() {
  return (
    <div className="w-20 md:w-24 hidden sm:flex flex-col items-center justify-between py-8 border-r border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        W⚡
      </div>
      
      <div className="flex flex-col gap-6 text-neutral-400">
        <button className="p-3 bg-white/5 text-cyan-400 rounded-2xl border border-white/10 shadow-lg shadow-cyan-500/10"><span className="text-xl">📊</span></button>
        <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors"><span className="text-xl">🗺️</span></button>
        <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors"><span className="text-xl">⚙️</span></button>
      </div>

      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-blue-500/20" />
    </div>
  );
}