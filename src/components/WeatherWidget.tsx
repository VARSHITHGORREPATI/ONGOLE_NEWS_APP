'use client';

import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="rounded-2xl p-5 text-white shadow-lg" style={{ background: 'linear-gradient(to bottom right, var(--primary), var(--primary-dark))', boxShadow: 'var(--shadow-elevated)' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white/80 text-xs">Ongole, Prakasam</p>
          <p className="text-3xl font-bold mt-1">32°C</p>
          <p className="text-white/80 text-sm mt-0.5">Partly Cloudy</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
          <Sun className="w-8 h-8" style={{ color: 'var(--accent-gold)' }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/20">
        {[{ icon: Droplets, label: 'Humidity', value: '68%' }, { icon: Wind, label: 'Wind', value: '12 km/h' }, { icon: Cloud, label: 'Rain', value: '10%' }].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <item.icon className="w-4 h-4 text-white/70" />
            <span className="text-xs text-white/70">{item.label}</span>
            <span className="text-sm font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
