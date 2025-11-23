"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from './Sidebar';
import Drawer from './Drawer';
import { Layers, List, Map as MapIcon, Shield, Globe, Activity } from 'lucide-react';

const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-sm animate-pulse">SİSTEM YÜKLENİYOR...</div>
});

export default function MainDashboard({ earthquakes }: { earthquakes: any[] }) {
  // STATES
  const [selectedQuake, setSelectedQuake] = useState<any | null>(null);
  const [minMag, setMinMag] = useState<number>(0); 
  const [showSafeZones, setShowSafeZones] = useState<boolean>(false); 
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'terrain'>('dark');
  
  // --- YENİ EKLENEN: ARAMA STATE'İ ---
  const [searchTerm, setSearchTerm] = useState(""); 

  // Mobil arayüz kontrolleri
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false); 

  // --- GÜNCELLENEN FİLTRELEME (Hem Büyüklük Hem İsim) ---
  const filteredEarthquakes = earthquakes.filter(q => {
    const matchesMag = q.mag >= minMag;
    // Başlıkta aranan kelime geçiyor mu? (Büyük/küçük harf duyarsız)
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMag && matchesSearch;
  });

  const handleQuakeSelect = (quake: any) => {
    setSelectedQuake(quake); 
    setIsSidebarOpen(false); 
  };

  return (
    <div className="relative flex h-full w-full bg-slate-950 overflow-hidden font-sans">
      
      {/* --- SOL PANEL (SIDEBAR CONTAINER) --- */}
      <div className={`
        fixed inset-0 z-40 transition-transform duration-300 ease-in-out
        md:relative md:inset-auto md:translate-x-0 md:w-96 md:flex md:flex-col 
        md:border-r md:border-white/10 md:shadow-[10px_0_40px_rgba(0,0,0,0.6)] md:bg-slate-950 relative
        ${isSidebarOpen ? 'translate-x-0 flex flex-col bg-slate-950/95 backdrop-blur-md' : '-translate-x-full hidden'}
      `}>
        
        {/* Dekoratif Arka Plan Işığı */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-96 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
        
        {/* Mobil Kapatma Header */}
        <div className="md:hidden p-4 border-b border-white/10 flex justify-between items-center bg-slate-900">
            <span className="font-bold text-white flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                GEO SENTINEL
            </span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 text-sm hover:text-white">Kapat</button>
        </div>

        {/* KONTROL PANELİ */}
        <div className="p-4 border-b border-white/5 bg-slate-900/30 backdrop-blur-md z-10 relative">
             <div className="flex gap-2 mb-3">
                {[0, 3, 4, 5].map((mag) => (
                    <button key={mag} onClick={() => setMinMag(mag)} className={`flex-1 py-1.5 text-xs font-bold rounded border transition-all duration-300 ${
                        minMag === mag 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}>
                        {mag === 0 ? 'TÜMÜ' : `>${mag}.0`}
                    </button>
                ))}
            </div>
            
            <button onClick={() => setShowSafeZones(!showSafeZones)} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-bold border transition-all duration-300 ${
                showSafeZones 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}>
                <Shield size={14} />
                {showSafeZones ? 'GÜVENLİ BÖLGELER AKTİF' : 'GÜVENLİ BÖLGELERİ GÖSTER'}
            </button>
        </div>

        {/* LİSTE COMPONENTİ (Buraya yeni prop'ları gönderiyoruz) */}
        <div className="flex-1 overflow-hidden z-10 relative">
            <Sidebar 
                earthquakes={filteredEarthquakes} 
                onSelect={(coords) => {
                    const quake = earthquakes.find(q => q.geojson.coordinates[1] === coords[0] && q.geojson.coordinates[0] === coords[1]);
                    if (quake) handleQuakeSelect(quake);
                }}
                // Arama verisini Sidebar'a iletiyoruz
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
        </div>
      </div>

      {/* --- SAĞ PANEL (HARİTA) --- */}
      <div className="flex-1 relative z-0 w-full h-full">
        <Map 
            earthquakes={filteredEarthquakes} 
            selectedCoords={selectedQuake ? [selectedQuake.geojson.coordinates[1], selectedQuake.geojson.coordinates[0]] : null} 
            showAssemblyPoints={showSafeZones}
            mapStyle={mapStyle}
            onMarkerClick={handleQuakeSelect}
        />

        {/* Yüzen Araçlar */}
        <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-[500] bg-blue-600 text-white px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.5)] font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform border border-blue-400/30 backdrop-blur-sm"
        >
            <List size={20} />
            LİSTEYİ GÖSTER
        </button>

        <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2 items-end group">
            <button 
                onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
                className="bg-slate-950/80 text-white p-3 rounded-full shadow-lg border border-white/20 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                title="Harita Katmanları"
            >
                <Layers size={20} />
            </button>
            
            {isLayerMenuOpen && (
                <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col gap-1 min-w-[150px] animation-fade-in">
                    <button onClick={() => setMapStyle('dark')} className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-bold transition-colors ${mapStyle === 'dark' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <MapIcon size={14} /> Karanlık
                    </button>
                    <button onClick={() => setMapStyle('satellite')} className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-bold transition-colors ${mapStyle === 'satellite' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <Globe size={14} /> Uydu
                    </button>
                    <button onClick={() => setMapStyle('terrain')} className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-bold transition-colors ${mapStyle === 'terrain' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                        <MapIcon size={14} /> Arazi
                    </button>
                </div>
            )}
        </div>
      </div>

      <Drawer 
        quake={selectedQuake} 
        onClose={() => setSelectedQuake(null)} 
      />

    </div>
  );
}