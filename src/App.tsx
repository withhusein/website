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
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        siteSettings={siteSettings}
        setCvModalOpen={setCvModalOpen}
        handleWaRedirect={handleWaRedirect}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'beranda' && (
          <section>
            <h1 className="text-4xl font-bold mb-4">{siteSettings.headlineTitle}</h1>
            <p className="text-lg text-stone-700 italic mb-8">{siteSettings.subHeadline}</p>
          </section>
        )}

        {activeTab === 'studi-kasus' && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Studi Kasus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.id} className="border p-6 rounded bg-white shadow-sm">
                  <h3 className="font-bold text-xl mb-2">{cs.title}</h3>
                  <p className="text-stone-600 text-sm mb-4">{cs.solutionSummary}</p>
                  <button
                    onClick={() => setActiveCaseStudy(cs)}
                    className="px-4 py-2 bg-stone-900 text-white text-xs font-bold uppercase rounded"
                  >
                    Detail
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}