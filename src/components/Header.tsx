import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'studi-kasus', label: 'Studi Kasus' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'produk-layanan', label: 'Produk & Layanan' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-300">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo / Title */}
        <div onClick={() => handleNavClick('beranda')} className="cursor-pointer flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-stone-900 text-stone-100 font-extrabold flex items-center justify-center text-sm shadow-sm">
            AM
          </div>
          <div>
            <span className="font-bold block leading-none text-stone-900 text-base">
              {siteSettings.analystName.split(',')[0]}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 mt-1 block font-semibold">
              Senior Business Analyst
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-xs font-bold uppercase tracking-wider text-stone-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`py-1 transition-all ${
                activeTab === item.id
                  ? 'text-stone-900 font-extrabold border-b-2 border-stone-900'
                  : 'hover:text-stone-900 text-stone-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setCvModalOpen(true)}
            className="px-3.5 py-2 border border-stone-400 text-stone-800 text-xs font-mono font-semibold rounded hover:bg-stone-200 transition"
          >
            Download CV
          </button>
          <button
            onClick={() => handleWaRedirect()}
            className="px-4 py-2 bg-stone-900 text-stone-50 text-xs font-bold uppercase rounded shadow-sm hover:bg-stone-800 transition"
          >
            Konsultasi WA
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 font-bold text-sm border border-stone-300 rounded"
          >
            {mobileMenuOpen ? '✕ Tutup' : '☰ Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-stone-300 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-2 text-sm font-bold uppercase ${
                activeTab === item.id ? 'text-stone-900 underline' : 'text-stone-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => { setCvModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2 border border-stone-400 text-stone-800 text-xs font-mono font-semibold rounded"
            >
              Download CV
            </button>
            <button
              onClick={() => { handleWaRedirect(); setMobileMenuOpen(false); }}
              className="w-full py-2 bg-stone-900 text-stone-50 text-xs font-bold uppercase rounded"
            >
              Konsultasi WA
            </button>
          </div>
        </div>
      )}
    </header>
  );
};