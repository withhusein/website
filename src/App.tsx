import React, { useState } from 'react';
import { DEFAULT_SITE_SETTINGS, CASE_STUDIES, ARTICLES, SERVICES } from './data/mockData';
import { Header } from './components/Header';
import { CaseStudy, Article } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [siteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  const handleWaRedirect = (customText?: string) => {
    const defaultMsg = "Halo Alex Morgan, saya ingin berkonsultasi mengenai kebutuhan Business Analysis.";
    const encoded = encodeURIComponent(customText || defaultMsg);
    window.open(`https://wa.me/${siteSettings.waNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans antialiased">
      {/* Banner Atas */}
      {siteSettings.showBanner && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-mono tracking-wide">
          {siteSettings.bannerText}
        </div>
      )}

      {/* Header / Navigasi */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        siteSettings={siteSettings}
        setCvModalOpen={setCvModalOpen}
        handleWaRedirect={handleWaRedirect}
      />

      {/* Konten Utama berdasarkan Tab */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* TAB 1: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="space-y-16">
            <section className="space-y-6">
              <div className="inline-block px-3 py-1 bg-stone-200 text-stone-800 text-xs font-mono rounded">
                Senior Business Analyst & Process Engineer
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                {siteSettings.headlineTitle}
              </h1>
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-serif italic border-l-4 border-stone-800 pl-4">
                {siteSettings.subHeadline}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleWaRedirect()}
                  className="px-6 py-3 bg-stone-900 text-stone-50 font-bold text-sm uppercase tracking-wider rounded shadow hover:bg-stone-800 transition"
                >
                  Jadwalkan Konsultasi
                </button>
                <button
                  onClick={() => setActiveTab('studi-kasus')}
                  className="px-6 py-3 border border-stone-400 text-stone-800 font-bold text-sm uppercase tracking-wider rounded hover:bg-stone-200 transition"
                >
                  Lihat Studi Kasus
                </button>
              </div>
            </section>

            {/* Metrik Portofolio */}
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

        {/* TAB 2: TENTANG */}
        {activeTab === 'tentang' && (
          <section className="space-y-6 max-w-3xl">
            <h2 className="text-3xl font-bold border-b border-stone-300 pb-2">Tentang Saya</h2>
            <p className="text-stone-700 leading-relaxed text-base">
              Saya adalah seorang Senior Business Analyst dengan spesialisasi dalam re-engineering proses bisnis,
              integrasi sistem data, dan arsitektur aplikasi low-code untuk efisiensi operasional skala UMKM hingga Enterprise.
            </p>
          </section>
        )}

        {/* TAB 3: STUDI KASUS */}
        {activeTab === 'studi-kasus' && (
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Studi Kasus & Proyek</h2>
              <p className="text-stone-600 mt-1">Dokumentasi hasil analisis dan implementasi solusi operasional.</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 bg-stone-100 text-stone-800 text-xs font-mono rounded">
                      {cs.clientCategory}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{cs.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">{cs.title}</h3>
                  <p className="text-stone-700 text-sm">{cs.solutionSummary}</p>

                  <div className="grid grid-cols-3 gap-2 bg-stone-50 p-4 rounded border border-stone-100">
                    {cs.impactMetrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-xs text-stone-500">{m.label}</div>
                        <div className="text-lg font-bold text-stone-900">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cs.toolsUsed.map((tool, idx) => (
                      <span key={idx} className="text-[11px] font-mono bg-stone-200 px-2 py-0.5 rounded text-stone-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: ARTIKEL */}
        {activeTab === 'artikel' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Artikel & Wawasan</h2>
            <div className="space-y-6">
              {ARTICLES.map((art) => (
                <article key={art.id} className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm space-y-2">
                  <div className="text-xs text-stone-500 font-mono">{art.publishDate} • {art.readTime}</div>
                  <h3 className="text-xl font-bold text-stone-900">{art.title}</h3>
                  <p className="text-stone-600 text-sm">{art.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TAB 5: PRODUK & LAYANAN */}
        {activeTab === 'produk-layanan' && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Produk & Layanan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((srv) => (
                <div key={srv.id} className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase bg-stone-900 text-stone-100 px-2 py-1 rounded">
                      {srv.packageCode}
                    </span>
                    <h3 className="text-xl font-bold text-stone-900 mt-3">{srv.title}</h3>
                    <p className="text-xs text-stone-500 mt-1">Durasi: {srv.duration}</p>
                    <ul className="mt-4 space-y-2 text-sm text-stone-700 list-disc list-inside">
                      {srv.scope.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleWaRedirect(srv.waMessage)}
                    className="w-full py-2 bg-stone-900 text-white font-bold text-xs uppercase rounded hover:bg-stone-800 transition"
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
              <button
                onClick={() => setCvModalOpen(false)}
                className="w-full text-left p-3 border rounded hover:bg-stone-100 transition font-medium text-sm"
              >
                📄 Resume Eksekutif (PDF - 2 Halaman)
              </button>
              <button
                onClick={() => setCvModalOpen(false)}
                className="w-full text-left p-3 border rounded hover:bg-stone-100 transition font-medium text-sm"
              >
                📊 Portofolio Teknis Lengkap (PDF)
              </button>
            </div>
            <button
              onClick={() => setCvModalOpen(false)}
              className="w-full py-2 bg-stone-200 text-stone-800 text-xs font-bold uppercase rounded mt-4"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}