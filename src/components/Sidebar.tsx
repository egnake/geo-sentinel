"use client";

import { Clock, MapPin, Activity, Wifi, ChevronRight, Search } from "lucide-react";

interface EarthquakeData {
  earthquake_id: string;
  mag: number;
  title: string;
  date: string;
  depth: number;
  geojson: {
    coordinates: [number, number];
  };
}

// Yeni prop'ları ekledik: searchTerm ve onSearchChange
interface SidebarProps {
  earthquakes: EarthquakeData[];
  onSelect: (coords: [number, number]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Sidebar = ({ earthquakes, onSelect, searchTerm, onSearchChange }: SidebarProps) => {
  
  const formatTime = (dateStr: string) => {
    if (!dateStr) return "--:--";
    const parts = dateStr.split(" ");
    return parts.length > 1 ? parts[1].slice(0, 5) : dateStr;
  };

  const getSeverityStyle = (mag: number) => {
    if (mag >= 5.0) return { 
        bg: "from-red-500/10 to-transparent", 
        border: "border-red-500/50 hover:border-red-400", 
        text: "text-red-500", 
        glow: "neon-glow-red",
        badge: "bg-red-500 text-white"
    };
    if (mag >= 3.0) return { 
        bg: "from-orange-500/10 to-transparent", 
        border: "border-orange-500/30 hover:border-orange-400", 
        text: "text-orange-400", 
        glow: "neon-glow-orange",
        badge: "bg-orange-500 text-white"
    };
    return { 
        bg: "from-emerald-500/5 to-transparent", 
        border: "border-emerald-500/20 hover:border-emerald-400", 
        text: "text-emerald-400", 
        glow: "neon-glow-green",
        badge: "bg-emerald-500/20 text-emerald-400"
    };
  };

  return (
    <div className="w-full h-full flex flex-col glass-panel backdrop-blur-2xl">
      
      {/* --- HEADER --- */}
      <div className="p-5 border-b border-white/10 bg-slate-900/40">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 tracking-widest font-mono">
                <Activity size={16} className="text-cyan-400 animate-pulse" />
                CANLI VERİ AKIŞI
            </h2>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-bold text-cyan-400">SYNC</span>
            </div>
        </div>

        {/* --- YENİ EKLENEN ARAMA KUTUSU --- */}
        <div className="relative mb-2 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={14} />
            <input 
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Şehir Ara (Örn: İzmir)"
                className="w-full bg-slate-950/50 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>SON GÜNCELLEME: ŞİMDİ</span>
            <span>TOPLAM: <b className="text-white">{earthquakes?.length || 0}</b></span>
        </div>
      </div>
      
      {/* --- LİSTE ALANI --- */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {earthquakes && earthquakes.length > 0 ? (
           earthquakes.map((quake, index) => {
            const style = getSeverityStyle(quake.mag);
            
            return (
              <div
                key={quake.earthquake_id}
                onClick={() => {
                    if(quake.geojson?.coordinates) {
                        const [lng, lat] = quake.geojson.coordinates;
                        onSelect([lat, lng]);
                    }
                }}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`
                    group relative p-4 rounded-xl border bg-gradient-to-r ${style.bg} ${style.border} 
                    cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/80
                    animate-card-entry
                `}
              >
                {quake.mag > 4 && (
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-red-500 blur-xl`} />
                )}

                <div className="relative flex items-center gap-4">
                    {/* Büyüklük */}
                    <div className={`
                        flex flex-col items-center justify-center w-12 h-12 rounded-xl shadow-lg shrink-0
                        ${quake.mag > 4 ? style.badge : 'bg-slate-800 border border-white/10 text-white'}
                        transition-transform group-hover:scale-110 duration-300
                    `}>
                        <span className="text-lg font-black leading-none">{quake.mag.toFixed(1)}</span>
                        <span className="text-[8px] opacity-80 font-mono">MAG</span>
                    </div>

                    {/* Metinler */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-200 group-hover:text-white truncate font-sans tracking-wide">
                            {quake.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/30 border border-white/5">
                                <Clock size={10} className="text-slate-400" />
                                <span className="text-[10px] text-slate-300 font-mono">{formatTime(quake.date)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/30 border border-white/5">
                                <MapPin size={10} className="text-slate-400" />
                                <span className="text-[10px] text-slate-300 font-mono">{quake.depth}km</span>
                            </div>
                        </div>
                    </div>

                    <ChevronRight size={16} className="text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            );
          })
        ) : (
            <div className="flex flex-col items-center justify-center h-40 text-slate-600 gap-2 opacity-50">
                <Wifi size={32} className="animate-pulse" />
                <span className="text-xs font-mono">
                    {searchTerm ? "SONUÇ BULUNAMADI" : "VERİ BEKLENİYOR..."}
                </span>
            </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;