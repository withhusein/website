import React, { useState } from 'react';
import { DEFAULT_SITE_SETTINGS, CASE_STUDIES, ARTICLES, SERVICES } from './data/mockData';
import { Header } from './components/Header';
import { CaseStudy, Article, SiteSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudy[]>(CASE_STUDIES);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleWaRedirect = (customText?: string) => {
    const defaultMsg = "Halo Alex Morgan, saya ingin berkonsultasi mengenai kebutuhan Business Analysis.";
    const encoded = encodeURIComponent(customText || defaultMsg);
    window.open(`https://wa.me/${siteSettings.waNumber}?text=${encoded}`, '_blank');
  };

  // Handler update setting dari CMS
  const handleSettingsChange = (field: keyof SiteSettings, value: any) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans antialiased pb-20">
      {/* CMS BAR FLOATING (Sisi Atas) */}
      <div className="bg-stone-900 text-white px-4 py-2 flex justify-between items-center text-xs font-mono border-b border-stone-700 sticky top-0 z-50">
        <span>STATUS CMS: {isAdminMode ? '🔴 SEDANG MENGEDIT (ADMIN MODE)' : '🟢 PRATINJAU PENGUNJUNG'}</span>
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-3 py-1 rounded font-bold uppercase transition ${
            isAdminMode ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-stone-700 text-white hover:bg-stone-600'
          }`}
        >
          {isAdminMode ? 'Keluar Mode CMS' : 'Buka Panel CMS Admin'}
        </button>
      </div>

      {/* Banner Atas */}
      {siteSettings.showBanner && (
        <div className="bg-stone-800 text-stone-200 text-xs py-2 px-4 text-center font-mono tracking-wide">
          {siteSettings.bannerText}
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        siteSettings={siteSettings}
        setCvModalOpen={setCvModalOpen}
        handleWaRedirect={handleWaRedirect}
      />

      {/* PANEL KONTROL CMS (Hanya muncul jika mode Admin aktif) */}
      {isAdminMode && (
        <div className="max-w-5xl mx-auto my-6 p-6 bg-amber-50 border-2 border-amber-400 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-bold text-amber-900 border-b border-amber-200 pb-2">
            ⚙️ Panel Kontrol CMS (Pengaturan Konten Teks)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Nama Analis / Judul Logo:</label>
              <input
                type="text"
                value={siteSettings.analystName}
                onChange={(e) => handleSettingsChange('analystName', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">Nomor WhatsApp (Tanpa +):</label>
              <input
                type="text"
                value={siteSettings.waNumber}
                onChange={(e) => handleSettingsChange('waNumber', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">Headline Utamа:</label>
              <input
                type="text"
                value={siteSettings.headlineTitle}
                onChange={(e) => handleSettingsChange('headlineTitle', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-stone-700 mb-1">Sub-Headline / Deskripsi:</label>
              <textarea
                rows={2}
                value={siteSettings.subHeadline}
                onChange={(e) => handleSettingsChange('subHeadline', e.target.value)}
                className="w-full p-2 border border-stone-300 rounded bg-white"
              />
            </div>
            <div className="flex space-x-6 items-center pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteSettings.showBanner}
                  onChange={(e) => handleSettingsChange('showBanner', e.target.checked)}
                />
                <span className="font-semibold text-xs">Tampilkan Banner Atas</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteSettings.showMetrics}
                  onChange={(e) => handleSettingsChange('showMetrics', e.target.checked)}
                />
                <span className="font-semibold text-xs">Tampilkan Section Metrik</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN UTAMA */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'beranda' && (
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="inline-block px-3 py-1 bg-stone-200 text-stone-800 text-xs font-mono rounded">
                Senior Business Analyst & Process Engineer
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                {siteSettings.headlineTitle}
              </h1>
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-serif italic border-l-4 border-stone-800 pl-4">
                {siteSettings.subHeadline}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => handleWaRedirect()}
                  className="px-6 py-3 bg-stone-900 text-stone-50 font-bold text-sm uppercase rounded shadow hover:bg-stone-800 transition"
                >
                  Jadwalkan Konsultasi
                </button>
                <button
                  onClick={() => setActiveTab('studi-kasus')}
                  className="px-6 py-3 border border-stone-400 text-stone-800 font-bold text-sm uppercase rounded hover:bg-stone-200 transition"
                >
                  Lihat Studi Kasus
                </button>
              </div>
            </section>

            {siteSettings.showMetrics && (
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-stone-300">
                <div className="p-6 bg-white border border-stone-200 rounded shadow-sm">
                  <div className="text-3xl font-black text-stone-900">78%</div>
                  <div className="text-sm font-semibold text-stone-600 mt-1">Efisiensi Waktu Operasional</div>
                </div>
                <div className="p-6 bg-white border border-stone-200 rounded shadow-sm">
                  <div className="text-3xl font-black text-stone-900">0.4%</div>
                  <div className="text-sm font-semibold text-stone-600 mt-1">Tingkat Error Setelah Automasi</div>
                </div>
                <div className="p-6 bg-white border border-stone-200 rounded shadow-sm">
                  <div className="text-3xl font-black text-stone-900">Rp 28.5M</div>
                  <div className="text-sm font-semibold text-stone-600 mt-1">Penghematan Biaya Proyek</div>
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'studi-kasus' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Studi Kasus</h2>
            <div className="grid grid-cols-1 gap-6">
              {caseStudiesList.map((cs) => (
                <div key={cs.id} className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm space-y-4">
                  <span className="px-2.5 py-0.5 bg-stone-100 text-stone-800 text-xs font-mono rounded">
                    {cs.clientCategory}
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900">{cs.title}</h3>
                  <p className="text-stone-700 text-sm">{cs.solutionSummary}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'produk-layanan' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Produk & Layanan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((srv) => (
                <div key={srv.id} className="p-6 bg-white border rounded shadow-sm space-y-4">
                  <h3 className="text-xl font-bold">{srv.title}</h3>
                  <p className="text-xs text-stone-500">{srv.duration}</p>
                  <button
                    onClick={() => handleWaRedirect(srv.waMessage)}
                    className="w-full py-2 bg-stone-900 text-white font-bold text-xs uppercase rounded"
                  >
                    Pilih Paket
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL CV */}
      {cvModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-xl font-bold">Download Resume / CV</h3>
            <p className="text-sm text-stone-600">Pilih format CV yang Anda butuhkan:</p>
            <div className="space-y-2">
              <button onClick={() => setCvModalOpen(false)} className="w-full text-left p-3 border rounded hover:bg-stone-100 text-sm font-medium">
                📄 Resume Eksekutif (PDF)
              </button>
            </div>
            <button onClick={() => setCvModalOpen(false)} className="w-full py-2 bg-stone-200 text-xs font-bold uppercase rounded mt-4">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}