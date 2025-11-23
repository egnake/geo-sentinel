"use client";

import { X, Navigation, Share2, Calendar, Activity, Waves } from "lucide-react";

interface DrawerProps {
  quake: any;
  onClose: () => void;
}

export default function Drawer({ quake, onClose }: DrawerProps) {
  if (!quake) return null;

  // --- HATA DÜZELTME (FIX) BAŞLANGICI ---
  
  // 1. Tarih verisi güvenliği: Veri yoksa uygulama çökmesin
  const dateRaw = quake.date || ""; // Veri null gelirse boş string kabul et
  const dateParts = dateRaw.split(" "); // Güvenli bölme işlemi
  const dateOnly = dateParts[0] || "Tarih Yok"; // Tarih kısmı
  const timeOnly = dateParts[1] || "--:--";    // Saat kısmı

  // 2. Koordinat güvenliği: GeoJSON bazen eksik gelebilir
  // GeoJSON formatı: [Boylam, Enlem] -> Google Maps: [Enlem, Boylam]
  const coordinates = quake.geojson?.coordinates || [0, 0];
  
  // --- HATA DÜZELTME SONU ---

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end items-end md:items-start pointer-events-none">
      
      {/* Arka planı karartma */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] md:hidden pointer-events-auto"
        onClick={onClose}
      ></div>

      {/* PANEL GÖVDESİ */}
      <div className="pointer-events-auto w-full md:w-96 h-[70vh] md:h-screen bg-slate-900/95 backdrop-blur-xl border-t md:border-l border-slate-700 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out animation-slide-up md:animation-slide-left">
        
        {/* Başlık ve Kapatma Butonu */}
        <div className="p-4 flex justify-between items-start border-b border-slate-800">
            <div>
                <h2 className="text-lg font-bold text-white leading-tight">{quake.title}</h2>
                <span className="text-xs text-slate-400 font-mono">{quake.earthquake_id}</span>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-300 transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            
            {/* Büyük Büyüklük Göstergesi */}
            <div className="flex items-center justify-center py-4">
                <div className={`relative flex items-center justify-center w-24 h-24 rounded-full border-4 ${
                    quake.mag > 5 ? 'border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 
                    quake.mag > 3 ? 'border-orange-500 text-orange-500' : 'border-emerald-500 text-emerald-500'
                }`}>
                    <div className="text-center">
                        <span className="block text-3xl font-black">{quake.mag.toFixed(1)}</span>
                        <span className="text-[10px] uppercase tracking-wider font-bold opacity-80">Richter</span>
                    </div>
                </div>
            </div>

            {/* Detay Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Waves size={16} />
                        <span className="text-xs">Derinlik</span>
                    </div>
                    <span className="text-lg font-mono font-bold text-white">{quake.depth} km</span>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar size={16} />
                        <span className="text-xs">Tarih</span>
                    </div>
                    {/* DÜZELTİLDİ: Artık güvenli değişkenleri kullanıyoruz */}
                    <span className="text-sm font-mono font-bold text-white">{dateOnly}</span>
                    <span className="block text-xs text-slate-500">{timeOnly}</span>
                </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="space-y-3 pt-4">
                <a 
                    // DÜZELTİLDİ: Google Maps link yapısı güvenli hale getirildi
                    href={`https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/25"
                >
                    <Navigation size={18} />
                    Google Haritalar'da Aç
                </a>
                
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition-all border border-slate-700">
                    <Share2 size={18} />
                    Konumu Paylaş
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}