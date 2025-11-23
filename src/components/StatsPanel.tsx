"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StatsPanel({ earthquakes }: { earthquakes: any[] }) {
  const stats = [
    { name: 'KRİTİK', count: earthquakes.filter(e => e.mag >= 5.0).length, color: '#ef4444' }, 
    { name: 'ORTA', count: earthquakes.filter(e => e.mag >= 3.0 && e.mag < 5.0).length, color: '#f97316' }, 
    { name: 'HAFİF', count: earthquakes.filter(e => e.mag < 3.0).length, color: '#10b981' }, 
  ];

  return (
    <div className="h-full w-full bg-slate-900 p-4 flex flex-col justify-center border-t border-slate-800">
      <h3 className="text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-widest flex justify-between">
        <span>SİSMİK YOĞUNLUK</span>
        <span className="text-blue-500">ANALİZ MODU</span>
      </h3>
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} layout="vertical" barSize={10}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={50} tick={{fill:'#64748b', fontSize:9}} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{backgroundColor:'#0f172a', borderColor:'#334155', color:'#fff', fontSize:'12px'}} cursor={{fill:'transparent'}} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {stats.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}