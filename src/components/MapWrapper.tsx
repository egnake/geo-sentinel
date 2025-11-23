// src/components/MapWrapper.tsx
"use client"; // Bu satır kritik! Burası artık istemci (tarayıcı) tarafı.

import dynamic from 'next/dynamic';

// Haritayı burada dinamik olarak çağırıyoruz
const Map = dynamic(() => import('./Map'), { 
  ssr: false, // Sunucuda render etme emrini burada veriyoruz, artık kızmaz.
  loading: () => <div className="h-full w-full flex items-center justify-center text-white bg-gray-900">Harita Yükleniyor...</div>
});

export default Map;