"use client"; 

import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import { useEffect } from "react";
import { assemblyPoints } from "@/data/assemblyPoints";

// --- HARİTA TİPLERİ (URL'ler) ---
const TILE_LAYERS = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  terrain: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" // Daha renkli arazi haritası
};

// ... (Tip tanımlamaları ve getColor aynı) ...
interface EarthquakeData {
  earthquake_id: string;
  mag: number;
  geojson: { coordinates: [number, number] };
  // Diğer alanlar Map içinde kullanılmıyorsa gerek yok, sadeleştirdim
}

const getColor = (mag: number) => {
    if (mag >= 5.0) return "#ef4444"; 
    if (mag >= 3.0) return "#f97316"; 
    return "#22c55e"; 
};

function FlyToLocation({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 10, { animate: true, duration: 1.5 });
  }, [coords, map]);
  return null;
}

interface MapProps {
  earthquakes: any[];
  selectedCoords: [number, number] | null;
  showAssemblyPoints: boolean;
  mapStyle: 'dark' | 'satellite' | 'terrain'; // <--- YENİ PROP
  onMarkerClick: (quake: any) => void; // <--- Tıklama olayı
}

const Map = ({ earthquakes, selectedCoords, showAssemblyPoints, mapStyle, onMarkerClick }: MapProps) => {
  return (
    <MapContainer center={[39.0, 35.0]} zoom={6} style={{ height: "100%", width: "100%" }} zoomControl={false}>
      
      {/* Dinamik Tile Layer */}
      <TileLayer 
        url={TILE_LAYERS[mapStyle]} 
        attribution='&copy; OpenStreetMap & Contributors'
      />
      
      <FlyToLocation coords={selectedCoords} />

      {earthquakes.map((quake) => {
        const [lng, lat] = quake.geojson.coordinates;
        return (
            <CircleMarker 
                key={quake.earthquake_id} 
                center={[lat, lng]} 
                radius={quake.mag * 3} 
                eventHandlers={{
                    click: () => onMarkerClick(quake) // Tıklanınca üst bileşene haber ver
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

      {showAssemblyPoints && assemblyPoints.map((point) => (
         <CircleMarker key={point.id} center={[point.lat, point.lng]} radius={8} pathOptions={{ color: "#fff", fillColor: "#3b82f6", fillOpacity: 1, weight: 2 }}>
         </CircleMarker>
      ))}
    </MapContainer>
  );
};
export default Map;