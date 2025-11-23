# 🌍 GeoSentinel: Real-Time Seismic Intelligence Platform

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge&logo=activity)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwindcss)

**GeoSentinel**, Türkiye genelindeki sismik aktiviteleri (depremleri) gerçek zamanlı olarak izleyen, analiz eden ve kullanıcıya modern bir arayüzle sunan bir "Sismik İstihbarat" panelidir. 

Sadece veri listelemekle kalmaz; harita üzerinde görselleştirme, büyüklük analizi ve afet anında toplanma alanlarına erişim gibi hayati özellikler sunar.

 *(Buraya projenin ekran görüntüsünü ekleyebilirsiniz)*

## 🚀 Canlı Demo (Live Demo)
Projenin canlı çalışan halini buradan inceleyebilirsiniz:
**[🔗 https://geo-sentinel-five.vercel.app/](https://geo-sentinel-five.vercel.app/)**

---

## ⚡ Temel Özellikler (Features)

* **📡 Canlı Veri Akışı:** Kandilli Rasathanesi verileri ile saniyelik senkronizasyon.
* **🗺️ İnteraktif Harita:** * **Leaflet.js** tabanlı dinamik harita.
    * **Katmanlar:** Karanlık, Uydu ve Arazi (Terrain) modları arası geçiş.
    * **Animasyon:** Deprem büyüklüğüne göre değişen "Pulse" efektleri.
* **🔍 Akıllı Arama ve Filtreleme:**
    * Şehre veya bölgeye göre anlık arama.
    * Deprem büyüklüğüne (>3.0, >4.0, >5.0) göre filtreleme.
* **🛡️ Güvenli Bölgeler:** Olası afet durumunda en yakın toplanma alanlarını harita üzerinde gösterme.
* **📊 Detaylı Analiz:** Seçilen depremin derinlik, zaman ve tam konum bilgilerini içeren "Drawer" (Kayar Panel) sistemi.
* **📱 Tam Responsive:** Mobil cihazlarda uygulama hissi veren, masaüstünde ise profesyonel bir dashboard deneyimi sunan duyarlı tasarım.
* **🎨 UI/UX:** Glassmorphism (Buzlu Cam), Neon efektleri ve Dark Mode ile modern, "Cybersecurity" temalı arayüz.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

Bu proje, modern web geliştirme standartlarına uygun olarak, performans ve ölçeklenebilirlik odaklı geliştirilmiştir.

| Alan | Teknoloji |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Dil** | TypeScript |
| **Styling** | Tailwind CSS (Custom Animations & Glassmorphism) |
| **Maps** | Leaflet.js & React-Leaflet |
| **Data Fetching** | Axios |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## ⚙️ Kurulum ve Çalıştırma (Installation)

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları izleyin:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone https://github.com/egnake/geo-sentinel.git
    cd geo-sentinel
    ```

2.  **Paketleri Yükleyin:**
    ```bash
    npm install
    ```

3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:3000` adresine gidin.

---

## 📂 Proje Yapısı

```bash
src/
├── app/              # Next.js App Router (Sayfalar)
├── components/       # UI Bileşenleri (Map, Sidebar, Drawer vb.)
│   ├── Map.tsx       # Harita Mantığı
│   ├── Sidebar.tsx   # Veri Listesi ve Filtreler
│   ├── Drawer.tsx    # Detay Paneli
│   └── ...
├── data/             # Statik Veriler (Toplanma Alanları vb.)
└── styles/           # Global CSS ve Tailwind Ayarları
