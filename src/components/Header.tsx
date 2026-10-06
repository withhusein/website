import React from 'react';
import { SiteSettings } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  siteSettings: SiteSettings;
  setCvModalOpen: (open: boolean) => void;
  handleWaRedirect: (msg?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  siteSettings,
  setCvModalOpen,
  handleWaRedirect,
}) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'studi-kasus', label: 'Studi Kasus' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'produk-layanan', label: 'Produk & Layanan' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div onClick={() => setActiveTab('beranda')} className="cursor-pointer flex items-center space-x-3">
          <div className="w-9 h-9 rounded bg-stone-900 text-stone-100 font-bold flex items-center justify-center">
            AM
          </div>
          <div>
            <span className="font-bold block leading-none text-stone-900">
              {siteSettings.analystName.split(',')[0]}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 mt-1 block">
              Senior Business Analyst
            </span>
          </div>
        </div>

        <nav className="hidden md:flex space-x-6 text-xs font-semibold uppercase text-stone-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`py-1 ${activeTab === item.id ? 'text-stone-900 font-bold border-b-2 border-stone-900' : 'hover:text-stone-900'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setCvModalOpen(true)}
            className="px-3 py-2 border border-stone-300 text-stone-800 text-xs font-mono rounded hover:bg-stone-200"
          >
            Download CV
          </button>
          <button
            onClick={() => handleWaRedirect()}
            className="px-4 py-2 bg-stone-900 text-stone-50 text-xs font-bold uppercase rounded shadow-sm hover:bg-stone-800"
          >
            Konsultasi WA
          </button>
        </div>
      </div>
    </header>
  );
};