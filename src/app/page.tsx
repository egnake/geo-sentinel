import axios from 'axios';
import MainDashboard from '../components/MainDashboard'; // İsim değişti!

async function getEarthquakes() {
  try {
    const res = await axios.get('https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=100');
    return res.data.result;
  } catch (error) {
    console.error("Veri hatası:", error);
    return [];
  }
}

export default async function Home() {
  const earthquakes = await getEarthquakes();

  return (
    <main className="h-screen w-screen bg-slate-950 overflow-hidden flex flex-col">
       {/* Header */}
       <header className="h-14 border-b border-slate-800 bg-slate-900 flex justify-between items-center px-6 z-30 shrink-0">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
            <h1 className="text-xl font-bold text-white tracking-wider font-mono">
                GEO<span className="text-blue-500">SENTINEL</span>
            </h1>
        </div>
        <div className="text-xs text-slate-500 font-mono hidden md:block">
            SYSTEM STATUS: ONLINE
        </div>
      </header>

      {/* Ana Gövde */}
      <div className="flex-1 overflow-hidden">
        {/* Component ismi değişti */}
        <MainDashboard earthquakes={earthquakes} />
      </div>
    </main>
  );
}