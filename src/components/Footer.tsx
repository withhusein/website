import React from 'react';
import { SiteSettings } from '../types';

interface FooterProps {
  siteSettings: SiteSettings;
  setActiveTab: (tab: string) => void;
  handleWaRedirect: (msg?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ siteSettings, setActiveTab, handleWaRedirect }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">{siteSettings.analystName}</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Menjembatani operasional bisnis dengan arsitektur data & low-code yang presisi.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setActiveTab('beranda')} className="hover:text-white">Beranda</button></li>
            <li><button onClick={() => setActiveTab('tentang')} className="hover:text-white">Tentang</button></li>
            <li><button onClick={() => setActiveTab('studi-kasus')} className="hover:text-white">Studi Kasus</button></li>
            <li><button onClick={() => setActiveTab('artikel')} className="hover:text-white">Artikel</button></li>
            <li><button onClick={() => setActiveTab('produk-layanan')} className="hover:text-white">Produk & Layanan</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Kontak & Diskusi</h4>
          <p className="text-sm text-stone-400 mb-4">Siap mendiskusikan kebutuhan arsitektur bisnis & otomasi Anda?</p>
          <button
            onClick={() => handleWaRedirect()}
            className="px-4 py-2 bg-stone-100 text-stone-900 font-bold text-xs uppercase rounded hover:bg-white"
          >
            Hubungi via WhatsApp
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 text-center">
        © {new Date().getFullYear()} {siteSettings.analystName}. All rights reserved.
      </div>
    </footer>
  );
};