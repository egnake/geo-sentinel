"use client"; 

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import { useEffect } from "react";
import { assemblyPoints } from "@/data/assemblyPoints";

// Harita Katmanları
const TILE_LAYERS: Record<string, string> = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  terrain: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
};

const getColor = (mag: number) => {
    if (mag >= 5.0) return "#ef4444"; 
    if (mag >= 3.0) return "#f97316"; 
    return "#10b981"; 
};

// Kamera Hareketi
function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
        map.flyTo(coords, 10, { animate: true, duration: 1.5 });
    }
  }, [coords, map]);
  return null;
}

interface MapProps {
  earthquakes: any[];
  selectedCoords: [number, number] | null;
  showAssemblyPoints: boolean;
  mapStyle: 'dark' | 'satellite' | 'terrain';
  onMarkerClick: (quake: any) => void;
}

const Map = ({ earthquakes, selectedCoords, showAssemblyPoints, mapStyle, onMarkerClick }: MapProps) => {
  return (
    <MapContainer 
        center={[39.0, 35.0]} 
        zoom={6} 
        style={{ height: "100%", width: "100%", background: "#020617" }} 
        zoomControl={false}
    >
      {/* Katman Ayarı (key=mapStyle sayesinde hata vermeden değişir) */}
      <TileLayer 
        key={mapStyle}
        url={TILE_LAYERS[mapStyle] || TILE_LAYERS.dark} 
        attribution='&copy; OpenStreetMap & Contributors'
      />
      
      <FlyToLocation coords={selectedCoords} />

      {/* 1. DEPREM NOKTALARI */}
      {earthquakes.map((quake) => {
        const coords = quake.geojson?.coordinates;
        if (!coords) return null;
        const [lng, lat] = coords; 
        
        return (
            <CircleMarker 
                key={quake.earthquake_id} 
                center={[lat, lng]} 
                radius={quake.mag * 3} 
                eventHandlers={{
                    click: () => onMarkerClick(quake)
                }}
                pathOptions={{ 
                    color: getColor(quake.mag), 
                    fillColor: getColor(quake.mag), 
                    fillOpacity: 0.7, 
                    weight: 0 
                }}
            />
        );
      })}

      {/* 2. GÜVENLİ BÖLGELER (DÜZELTİLEN KISIM) */}
      {showAssemblyPoints && assemblyPoints && assemblyPoints.map((point) => (
         <CircleMarker 
            key={point.id} 
            center={[point.lat, point.lng]} 
            radius={8} 
            pathOptions={{ 
                color: "#60a5fa", // Açık Mavi Çerçeve
                fillColor: "#3b82f6", // Koyu Mavi İç
                fillOpacity: 0.9, 
                weight: 2 
            }}
         >
             {/* İŞTE EKSİK OLAN POPUP BURASI: */}
             <Popup className="custom-popup">
                 <div className="text-center">
                    <strong className="text-blue-400 block text-sm mb-1">{point.name}</strong>
                    <span className="text-[10px] text-slate-300 uppercase tracking-wider border border-blue-500/30 px-2 py-0.5 rounded bg-blue-500/10">
                        Güvenli Bölge
                    </span>
                 </div>
             </Popup>
         </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;
