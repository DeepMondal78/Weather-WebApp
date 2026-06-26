import React from 'react';

export default function RecentlySearched() {
  // static showcase array, pore localstorage use korte parbe
  const recents = ['Dhaka', 'London', 'Tokyo', 'New York'];

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-md">
      <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 font-mono">Recent Explorations</h3>
      <div className="flex flex-wrap gap-2">
        {recents.map((city, i) => (
          <button key={i} className="px-4 py-2 text-xs font-medium text-neutral-300 bg-white/[0.04] border border-white/5 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-200">
            ⏱️ {city}
          </button>
        ))}
      </div>
    </div>
  );
}