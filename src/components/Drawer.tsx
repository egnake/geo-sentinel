"use client";

import { X, Navigation, Share2, Calendar, Waves, Activity, AlertTriangle } from "lucide-react";

interface DrawerProps {
  quake: any;
  onClose: () => void;
}

export default function Drawer({ quake, onClose }: DrawerProps) {
  // Deprem verisi yoksa gösterme
  if (!quake) return null;

  // --- TARİH DÜZELTMESİ ---
  // API bazen "2024.11.24 14:30:00" formatında döner.
  // Biz bunu güvenli bir şekilde ayırıyoruz.
  const fullDate = quake.date || quake.date_time || ""; // Farklı isimlendirme ihtimaline karşı önlem
  
  let displayDate = "--.--.----";
  let displayTime = "--:--";

  if (fullDate.includes(" ")) {
    const parts = fullDate.split(" ");
    displayDate = parts[0];
    displayTime = parts[1]?.slice(0, 5); // Saniyeyi kırp (14:30:00 -> 14:30)
  } else if (fullDate) {
    displayDate = fullDate; // Eğer boşluk yoksa olduğu gibi göster
  }

  // Koordinatları Güvenli Al
  const lng = quake.geojson?.coordinates?.[0] || 0;
  const lat = quake.geojson?.coordinates?.[1] || 0;

  // Tema Rengi
  const getThemeColor = (m: number) => {
    if (m >= 5.0) return "red";
    if (m >= 3.0) return "orange";
    return "emerald";
  };
  const theme = getThemeColor(quake.mag);

  return (
    <div className="fixed inset-0 z-[2000] flex justify-end items-end md:items-start pointer-events-none">
      
      {/* Arka Plan Karartma (Mobil İçin) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] md:hidden pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* --- PANEL GÖVDESİ --- */}
      <div className="pointer-events-auto w-full md:w-96 h-[85vh] md:h-screen bg-slate-900/95 backdrop-blur-2xl border-t md:border-l border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] flex flex-col transform transition-transform duration-300 ease-out animation-slide-up md:animation-slide-left">
        
        {/* 1. HEADER */}
        <div className="p-6 flex justify-between items-start border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1.5">
                    <Activity size={14} className={`text-${theme}-500 animate-pulse`} />
                    <span className={`text-[10px] font-bold tracking-widest text-${theme}-500 uppercase border border-${theme}-500/30 px-1.5 py-0.5 rounded bg-${theme}-500/10`}>
                        SİSMİK DETAY
                    </span>
                </div>
                <h2 className="text-xl font-bold text-white leading-tight font-sans tracking-wide drop-shadow-md">
                    {quake.title || "Konum Bilgisi Yok"}
                </h2>
                <span className="text-xs text-slate-500 font-mono mt-2 block">
                    ID: <span className="text-slate-300 select-all">{quake.earthquake_id}</span>
                </span>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 bg-slate-800/50 rounded-full hover:bg-red-600 hover:text-white text-slate-400 transition-all duration-300 border border-white/10 group"
            >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
        </div>

        {/* 2. İÇERİK (SCROLL) */}
        <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar relative">
            
            {/* Dekoratif Arka Işık */}
            <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-${theme}-600/20 blur-[90px] rounded-full pointer-events-none`}></div>

            {/* A) BÜYÜKLÜK GÖSTERGESİ */}
            <div className="flex flex-col items-center justify-center py-2 relative z-10">
                <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-4 bg-slate-950 shadow-2xl ${
                    theme === 'red' ? 'border-red-500 shadow-red-500/40 text-red-500' : 
                    theme === 'orange' ? 'border-orange-500 shadow-orange-500/30 text-orange-500' : 
                    'border-emerald-500 shadow-emerald-500/20 text-emerald-500'
                }`}>
                    <div className="text-center">
                        <span className="block text-5xl font-black tracking-tighter drop-shadow-lg">
                            {quake.mag ? quake.mag.toFixed(1) : "?"}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 block mt-1">Richter</span>
                    </div>
                </div>
                
                {quake.mag >= 5.0 && (
                    <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold animate-bounce">
                        <AlertTriangle size={14} />
                        KRİTİK SEVİYE
                    </div>
                )}
            </div>

            {/* B) BİLGİ KARTLARI */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
                {/* Derinlik Kartı */}
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-slate-400 mb-3 group-hover:text-blue-400">
                        <Waves size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Derinlik</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-mono font-bold text-white">{quake.depth}</span>
                        <span className="text-sm text-slate-500">km</span>
                    </div>
                </div>

                {/* Tarih Kartı */}
                <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-slate-400 mb-3 group-hover:text-blue-400">
                        <Calendar size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Zaman</span>
                    </div>
                    {/* DÜZELTİLEN KISIM BURASI */}
                    <span className="text-lg font-mono font-bold text-white block leading-none mb-1">{displayTime}</span>
                    <span className="text-xs text-slate-500 font-mono">{displayDate}</span>
                </div>
            </div>
        </div>

        {/* 3. FOOTER (AKSİYONLAR) */}
        <div className="p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-md space-y-3 z-20">
            <a 
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/40 active:scale-[0.98]"
            >
                <Navigation size={18} />
                GOOGLE HARİTALAR'DA GİT
            </a>
            
            <button className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-bold text-sm transition-all border border-white/5 active:scale-[0.98]">
                <Share2 size={18} />
                KONUMU PAYLAŞ
            </button>
        </div>

      </div>
    </div>
  );
}
