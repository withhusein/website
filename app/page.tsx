import React, { useState, useEffect, useMemo } from 'react';

// Editorial Typography & Custom Styling Injection
const EditorialStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    
    .font-serif-editorial {
      font-family: 'Newsreader', Georgia, serif;
    }
    .font-sans-editorial {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .font-mono-code {
      font-family: 'JetBrains Mono', monospace;
    }
    
    @media print {
      body * {
        visibility: hidden;
      }
      #printable-cv, #printable-cv * {
        visibility: visible;
      }
      #printable-cv {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 20px;
        background: white !important;
        color: black !important;
      }
    }
  `}</style>
);

// SVG Icon Components
const IconArrowRight = ({ className = "w-4 h-4 ml-1.5 inline-block" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const IconWhatsApp = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const IconDownload = () => (
  <svg className="w-3.5 h-3.5 mr-1.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4 text-emerald-600 inline-block mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

const IconExternalLink = () => (
  <svg className="w-3.5 h-3.5 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const IconSearch = () => (
  <svg className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Initial Sanity CMS Default Settings Mock Data
const DEFAULT_SITE_SETTINGS = {
  analystName: "Alex Morgan, S.T., Lead BA",
  headlineTitle: "Mengubah Alur Kerja Kompleks Menjadi Sistem Operasional Berkelanjutan.",
  subHeadline: "Otomasi tanpa kejelasan proses hanya mempercepat kekacauan. Saya membantu UMKM & Enterprise menjembatani operasional bisnis dengan arsitektur data & low-code yang presisi.",
  waNumber: "6281234567890",
  showMetrics: true,
  showTestimonials: true,
  showBanner: true,
  bannerText: "• Terbuka untuk Konsultasi Operasional UMKM & Peluang Senior BA Enterprise"
};

const CASE_STUDIES = [
  {
    id: "cs-1",
    title: "Otomasi Pemrosesan Pesanan & Integrasi ERP Distribusi Logistik",
    clientCategory: "Logistik & Rantai Pasok",
    category: "Automation",
    readTime: "7 menit baca",
    date: "Agu 2026",
    problemStatement: "Pemrosesan pesanan manual membutuhkan waktu 48+ jam dengan tingkat kesalahan 12%, memicu penumpukan pengiriman saat kampanye promosi bulanan.",
    solutionSummary: "Merancang workflow otomatis dari penerimaan order hingga sync ERP menggunakan Make, AppSheet, dan PostgreSQL. Dilengkapi dashboard pemantauan pengecualian real-time.",
    toolsUsed: ["AppSheet", "Make (Integromat)", "Looker Studio", "PostgreSQL", "Miro"],
    impactMetrics: [
      { label: "Waktu Proses Order", value: "-78%" },
      { label: "Tingkat Error Order", value: "12% → 0.4%" },
      { label: "Penghematan Biaya/Bln", value: "Rp 28.5M" }
    ],
    scope: "Re-engineering proses bisnis, penyusunan spesifikasi teknis, integrasi webhook API, dokumentasi SOP pengguna, dan pelatihan tim operasional.",
    processSteps: [
      "Pemetaan Diagnostic & Identifikasi Bottleneck (Miro Swimlane)",
      "Perancangan Skema Database & Integrasi Webhook API ERP",
      "Pengembangan Low-Code App di AppSheet untuk Tim Lapangan",
      "Pembangunan Dashboard Control Tower di Looker Studio"
    ],
    featured: true
  },
  {
    id: "cs-2",
    title: "Control Tower KPI Keuangan & Operasional Eksekutif Multi-Cabang",
    clientCategory: "Jasa Keuangan & Ritel",
    category: "Dashboarding",
    readTime: "5 menit baca",
    date: "Jul 2026",
    problemStatement: "Direksi kehilangan visibilitas real-time dari 4 anak perusahaan regional. Tim Finance menghabiskan 5 hari kerja setiap bulan hanya untuk konsolidasi Excel secara manual.",
    solutionSummary: "Membangun data pipeline konsolidasi otomatis berbasis SQL & Power BI, dilengkapi pembersihan data otomatis dan visualisasi drill-down per divisi.",
    toolsUsed: ["Power BI", "SQL", "BigQuery", "Excel Power Query", "Visio"],
    impactMetrics: [
      { label: "Waktu Laporan Bulanan", value: "5 Hari → 10 Mnt" },
      { label: "Akurasi Rekonsiliasi", value: "99.9%" },
      { label: "Kecepatan Keputusan", value: "3x Lebih Cepat" }
    ],
    scope: "Normalisasi Bagian Akun (Chart of Accounts), perancangan data warehouse, tata kelola akses pengguna, dan penyusunan UI/UX dashboard eksekutif.",
    processSteps: [
      "Normalisasi Struktur Chart of Accounts Multi-Entitas",
      "Konfigurasi Automated SQL Data Pipeline di BigQuery",
      "Wireframing Wireframe Layout Dashboard Eksekutif",
      "Implementasi Role-Based Access Control (RBAC)"
    ],
    featured: true
  },
  {
    id: "cs-3",
    title: "Overhaul Standar Operasional Prosedur (SOP) Ritel Multi-Branch",
    clientCategory: "Ritel & FMCG",
    category: "SOP & Process Mapping",
    readTime: "6 menit baca",
    date: "Mei 2026",
    problemStatement: "Ketidakseragaman prosedur audit inventaris di 18 cabang ritel menyebabkan selisih stok (inventory shrinkage) melebihi Rp 1.8 Miliar per tahun.",
    solutionSummary: "Memetakan ulang 24 alur proses operasional, menyelaraskan standar audit lapangan, dan meluncurkan repositori SOP digital interaktif berbasis checklist.",
    toolsUsed: ["Miro", "Notion", "Google Workspace", "Lucidchart"],
    impactMetrics: [
      { label: "Pemotongan Selisih Stok", value: "65%" },
      { label: "Waktu Onboarding Staf", value: "+50% Cepat" },
      { label: "Kepatuhan Audit Cabang", value: "98%" }
    ],
    scope: "Wawancara diagnostic lapangan, pembuatan BPMN 2.0 flowcharts, penyusunan repositori Notion SOP interaktif, serta matriks tanggung jawab RACI.",
    processSteps: [
      "Wawancara Field Audit dengan Manager Cabang",
      "Penyusunan Flowchart Swimlane Standar BPMN 2.0",
      "Pembangunan Centralized SOP Portal di Notion",
      "Program Sertifikasi Kepatuhan Staf Lapangan"
    ],
    featured: false
  },
  {
    id: "cs-4",
    title: "Kustomisasi CRM & Lead Nurturing Pipeline Agensi B2B Tech",
    clientCategory: "Teknologi & Agensi B2B",
    category: "Mentorship & Systems",
    readTime: "4 menit baca",
    date: "Mar 2026",
    problemStatement: "Tim sales mengandalkan file Excel pribadi yang terfragmentasi, menyebabkan kebocoran prospek dan ketiadaan perkiraan (forecasting) penjualan.",
    solutionSummary: "Membimbing tim internal membuat kustom CRM efisien menggunakan Airtable & Looker Studio yang terintegrasi dengan alert otomatis Slack.",
    toolsUsed: ["Airtable", "Looker Studio", "Zapier", "Slack API"],
    impactMetrics: [
      { label: "Konversi Lead Pipelines", value: "+32%" },
      { label: "Respon Prospek Pertama", value: "< 15 Menit" },
      { label: "Akurasi Output Forecast", value: "94%" }
    ],
    scope: "Pelatihan 1-on-1 tim internal, arsitektur skema data Airtable, alur tahapan pipeline penjualan, dan otomasi pemicu notifikasi.",
    processSteps: [
      "Pemetaan Siklus Prospek Sales (Lifecycle Mapping)",
      "Perancangan Arsitektur Relasi Data Airtable",
      "Otomasi Trigger Notifikasi Slack via Zapier",
      "Dashboard Monitoring Performa Sales Mingguan"
    ],
    featured: false
  }
];

const ARTICLES = [
  {
    id: "art-1",
    title: "Mengapa Mayoritas Proyek Otomasi Bisnis UMKM Gagal (Dan Cara Memperbaikinya)",
    slug: "mengapa-otomasi-bisnis-gagal",
    category: "Process Engineering",
    readTime: "6 menit baca",
    publishDate: "28 Sep 2026",
    excerpt: "Mengotomatiskan proses yang berantakan hanya akan mempercepat kekacauan. Berikut 4 langkah protokol diagnostik sebelum Anda membeli perangkat lunak otomasi.",
    content: `Banyak organisasi terburu-buru membeli platform low-code yang mahal atau menyewa pengembang otomasi dengan asumsi bahwa teknologi saja dapat menyelesaikan kendala operasional. Namun, mengotomatiskan proses yang cacat justru akan mempercepat akumulasi kesalahan.

### 4 Langkah Protokol Diagnostik Sebelum Otomasi

1. **Memetakan Sebelum Mengotomatiskan:** Jangan pernah membuat alur kerja otomatis sebelum setiap gerbang keputusan (decision gateway) digambar secara jelas di Miro atau kertas.
2. **Standardisasi Format Input:** 80% kesalahan pipeline data berawal dari format input data pengguna yang tidak konsisten.
3. **Isolasi Pengecualian (Exceptions):** Identifikasi 5% kasus khusus (edge cases) yang tidak boleh diotomatiskan dan pertahankan dalam antrean peninjauan manual.
4. **Ukur ROI Sejak Dini:** Hitung penghematan jam kerja tim dibandingkan dengan biaya pemeliharaan platform.

> "Proses yang buruk ditambahkan otomasi tetap menjadi proses yang buruk—hanya saja ia rusak lebih cepat dalam skala besar."`
  },
  {
    id: "art-2",
    title: "Mendesain Dashboard Eksekutif yang Beneran Mendorong Tindakan Nyata",
    slug: "mendesain-dashboard-eksekutif-efektif",
    category: "Data Visualization",
    readTime: "8 menit baca",
    publishDate: "14 Agu 2026",
    excerpt: "Berhentilah membingungkan jajaran direksi dengan 30 grafik warna-warni. Ini cara menyusun Control Tower berdampak tinggi di Looker Studio & Power BI.",
    content: `Dashboard memprihatinkan adalah dashboard yang mencoba menjawab semua pertanyaan sekaligus. Dashboard eksekutif yang efektif harus mematuhi "Aturan 5 Detik"—dalam 5 detik pertama, pemangku kepentingan harus tahu apakah indikator kinerja utama (KPI) dalam kondisi sehat atau memerlukan intervensi segera.

### Prinsip Hirarki Visual Utama:
* **Baris Teratas (North Star Metrics):** Pendapatan, Margin Operasional, dan CSAT.
* **Baris Tengah (Analisis Tren):** Tren bulanan & perbandingan tolok ukur (benchmarks).
* **Baris Bawah (Detail Tindakan):** Tabel pencilan (outliers) dan pesanan tertunda yang butuh penanganan lanjut.

Dengan menyusun informasi secara logis, eksekutif dapat bertindak dari ringkasan tingkat tinggi langsung ke eksekusi taktis.`
  },
  {
    id: "art-3",
    title: "Panduan Praktis Business Analyst untuk Process Mapping Berstandar BPMN 2.0",
    slug: "panduan-business-analyst-process-mapping",
    category: "Methodology",
    readTime: "5 menit baca",
    publishDate: "02 Jul 2026",
    excerpt: "Sederhanakan standar BPMN 2.0 untuk tim operasional. Menggunakan Swimlane, Decision Gateways, dan alur kolaborasi lintas divisi.",
    content: `Diagram visual yang jelas dapat memangkas gesekan antar-departemen lebih cepat daripada dokumen teks puluhan halaman. Menggunakan simbol standar BPMN 2.0 memungkinkan tim lintas fungsi untuk langsung menyelaraskan serah terima operasional secara presisi.`
  }
];

const PRODUCTS = [
  {
    id: "prod-1",
    title: "Master Operating System & KPI Tracker Template",
    description: "Template Google Sheets & Notion siap pakai untuk bisnis & UMKM mengukur unit ekonomi, kapasitas tim, dan sprint mingguan.",
    price: "Rp 199.000 / $15",
    lynkUrl: "https://lynk.id/alexmorgan/master-kpi-template",
    badge: "Terlaris"
  },
  {
    id: "prod-2",
    title: "Business Process Audit Playbook & Kit Miro",
    description: "Kerangka kerja lengkap, draf skrip wawancara audit, dan kit shape swimlane Miro untuk Business Analyst & Konsultan.",
    price: "Rp 299.000 / $22",
    lynkUrl: "https://lynk.id/alexmorgan/ba-playbook-kit",
    badge: "Rekomendasi"
  }
];

const SERVICES = [
  {
    id: "service-1",
    packageCode: "Paket 1",
    title: "Diagnostic & Audit Operasional",
    tier: "Entry Offer",
    duration: "1–2 Minggu",
    idealFor: "UMKM & Bisnis Berkembang yang mengalami kemacetan operasional atau hambatan pemrosesan.",
    scope: [
      "Wawancara diagnostic & alur kerja lapangan bersama pemangku kepentingan",
      "Pemetaan alur proses kasar & identifikasi kesenjangan (gap analysis)",
      "Laporan audit format PDF berisi daftar rekomendasi Quick-Wins terpilih",
      "1x Sesi diskusi de-brief strategi eksekutif durasi 90 menit"
    ],
    waMessage: "Halo Alex Morgan, saya tertarik dengan Paket 1: Diagnostic & Audit Operasional untuk bisnis kami. Boleh diskusi mengenai jadwal ketersediaan?"
  },
  {
    id: "service-2",
    packageCode: "Paket 2",
    title: "SOP & Data Blueprint",
    tier: "Core Offer",
    duration: "3–4 Minggu",
    idealFor: "Perusahaan yang membutuhkan pembakuan SOP, tata kelola data rapi, dan laporan terstruktur.",
    scope: [
      "Pemetaan detail End-to-End SOP (Flowchart di Miro berstandar BPMN 2.0)",
      "Perancangan format input data terstandar & aturan validasi data",
      "Mockup interaktif Dashboard Operasional (Looker Studio / Power BI)",
      "Matriks pembagian peran & tanggung jawab tim (RACI Matrix)",
      "Dokumentasi lengkap SOP & serah terima (Handover) sistem"
    ],
    waMessage: "Halo Alex, saya berminat konsultasi untuk Paket 2: SOP & Data Blueprint. Bisa jadwalkan sesi pengenalan awal?"
  },
  {
    id: "service-3",
    packageCode: "Paket 3",
    title: "Full Orchestration & Implementasi",
    tier: "Enterprise Offer",
    duration: "2–3 Bulan",
    idealFor: "Perusahaan yang siap melakukan transformasi digital, otomasi low-code, & integrasi tools.",
    scope: [
      "Pengawalan penuh implementasi (Looker Studio, AppSheet, Make, SQL)",
      "Pengarahan teknis vendor / teknisi / freelancer pihak ketiga",
      "Pengujian alur kerja otomatis (QA testing & pipeline deployment)",
      "Sesi lokakarya (workshop) onboarding & pelatihan komprehensif tim",
      "Dukungan pendampingan pasca-Go-Live selama 30 hari"
    ],
    waMessage: "Halo Alex, perusahaan kami membutuhkan konsultasi Paket 3: Full Orchestration & Implementasi. Kapan ada waktu luang untuk requirement discovery call?"
  }
];

const TESTIMONIALS = [
  {
    quote: "Alex berhasil memangkas waktu pemrosesan pesanan kami dari 2 hari menjadi kurang dari 4 jam. Sistem AppSheet yang dibangun sangat intuitif untuk tim lapangan.",
    name: "Budi Santoso",
    role: "COO, PT Logistik Nusantara Utama"
  },
  {
    quote: "Control tower Power BI yang dirancang Alex memberikan kejernihan penuh pada cashflow multi-cabang kami. Sangat tajam dan metodologis.",
    name: "Siti Rahmawati",
    role: "VP Finance, Retail Growth Group"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articleSearch, setArticleSearch] = useState('');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [customWaModal, setCustomWaModal] = useState({ open: false, text: '', title: '' });
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live Sanity Site Settings State
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleWaRedirect = (customText) => {
    const defaultMsg = "Halo Alex Morgan, saya ingin berkonsultasi mengenai kebutuhan Business Analysis, SOP, dan Otomasi Proses Bisnis.";
    const encoded = encodeURIComponent(customText || defaultMsg);
    window.open(`https://wa.me/${siteSettings.waNumber}?text=${encoded}`, '_blank');
  };

  const filteredCaseStudies = useMemo(() => {
    if (selectedCategory === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter(item => item.category.includes(selectedCategory));
  }, [selectedCategory]);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(art => 
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.category.toLowerCase().includes(articleSearch.toLowerCase())
    );
  }, [articleSearch]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans-editorial antialiased selection:bg-stone-900 selection:text-amber-200">
      <EditorialStyles />

      {/* Top Dynamic Notification Banner */}
      {siteSettings.showBanner && (
        <div className="bg-stone-900 text-stone-200 text-[11px] font-mono-code py-2 px-4 text-center border-b border-stone-800 flex items-center justify-center space-x-2">
          <span>{siteSettings.bannerText}</span>
        </div>
      )}

      {/* Editorial Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('beranda')} 
            className="cursor-pointer group flex items-center space-x-3"
          >
            <div className="w-9 h-9 rounded bg-stone-900 text-stone-100 font-serif-editorial text-xl font-bold flex items-center justify-center shadow-sm">
              AM
            </div>
            <div>
              <span className="font-serif-editorial text-xl font-bold tracking-tight block leading-none text-stone-900 group-hover:text-stone-600 transition-colors">
                {siteSettings.analystName.split(',')[0]}
              </span>
              <span className="text-[10px] uppercase font-mono-code tracking-widest text-stone-500 mt-1 block">
                Senior Business Analyst
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-stone-700">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'tentang', label: 'Tentang' },
              { id: 'studi-kasus', label: 'Studi Kasus' },
              { id: 'artikel', label: 'Artikel' },
              { id: 'produk-layanan', label: 'Produk & Layanan' },
              { id: 'cms-schema', label: 'Sanity Studio CMS' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors relative py-1 ${
                  activeTab === item.id 
                    ? 'text-stone-900 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-stone-900' 
                    : 'hover:text-stone-900 text-stone-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Primary Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setCvModalOpen(true)}
              className="px-3 py-2 rounded border border-stone-300 text-stone-800 text-xs font-mono-code hover:bg-stone-200 transition-all flex items-center"
            >
              <IconDownload />
              Download CV
            </button>
            <button
              onClick={() => handleWaRedirect()}
              className="inline-flex items-center px-4 py-2 rounded bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all shadow-sm"
            >
              <IconWhatsApp className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Konsultasi WA
            </button>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setActiveTab(activeTab === 'mobile-menu' ? 'beranda' : 'mobile-menu')}
              className="p-2 text-stone-800 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {activeTab === 'mobile-menu' && (
          <div className="md:hidden bg-[#FAF9F6] border-b border-stone-200 px-6 py-6 space-y-4">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'tentang', label: 'Tentang' },
              { id: 'studi-kasus', label: 'Studi Kasus' },
              { id: 'artikel', label: 'Artikel' },
              { id: 'produk-layanan', label: 'Produk & Layanan' },
              { id: 'cms-schema', label: 'Sanity Studio CMS' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="block w-full text-left font-serif-editorial text-lg text-stone-900 hover:text-amber-800"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-stone-200 flex flex-col space-y-2">
              <button
                onClick={() => setCvModalOpen(true)}
                className="w-full text-center py-2.5 border border-stone-400 text-stone-900 text-xs font-mono-code uppercase"
              >
                Download ATS Resume (PDF)
              </button>
              <button
                onClick={() => handleWaRedirect()}
                className="w-full flex items-center justify-center py-3 bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-wider"
              >
                <IconWhatsApp className="w-4 h-4 mr-2 text-emerald-400" />
                Konsultasi via WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content Body */}
      <main className="min-h-[calc(100vh-20rem)]">

        {/* ========================================== */}
        {/* TAB 1: BERANDA (HOME PAGE)                 */}
        {/* ========================================== */}
        {}
        {activeTab === 'beranda' && (
          <div>
            {/* Hero Section */}
            <section className="py-16 md:py-24 border-b border-stone-200 bg-[#FAF9F6]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <div className="inline-block px-3 py-1 rounded bg-stone-200/80 text-stone-800 font-mono-code text-[11px] font-medium tracking-wider mb-6 uppercase">
                    • Optimalisasi Operasional UMKM & Enterprise Advisor
                  </div>
                  <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] mb-6">
                    {siteSettings.headlineTitle}
                  </h1>
                  <p className="text-stone-700 text-lg sm:text-xl leading-relaxed mb-8 font-serif-editorial italic">
                    "{siteSettings.subHeadline}"
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => setActiveTab('produk-layanan')}
                      className="px-6 py-3.5 bg-stone-900 text-stone-50 font-sans-editorial font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 transition-all rounded-sm shadow-sm inline-flex items-center justify-center"
                    >
                      Lihat Paket Layanan
                      <IconArrowRight />
                    </button>
                    <button
                      onClick={() => handleWaRedirect()}
                      className="px-6 py-3.5 bg-stone-100 border border-stone-300 text-stone-900 font-sans-editorial font-semibold text-xs uppercase tracking-wider hover:bg-stone-200 transition-all rounded-sm inline-flex items-center justify-center"
                    >
                      <IconWhatsApp className="w-4 h-4 mr-2 text-emerald-600" />
                      Diskusi via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Metrics Banner */}
            {siteSettings.showMetrics && (
              <section className="py-10 bg-stone-100/70 border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { number: "-78%", label: "Waktu Siklus Pemrosesan" },
                      { number: "35+", label: "Dashboard Control Tower" },
                      { number: "Rp 2.8M+", label: "Estimasi Hemat Biaya" },
                      { number: "18+", label: "Proyek Sistem Operasional" }
                    ].map((stat, i) => (
                      <div key={i} className="border-l border-stone-300 pl-4">
                        <div className="font-serif-editorial text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                          {stat.number}
                        </div>
                        <div className="text-[11px] font-mono-code uppercase tracking-wider text-stone-500 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 3 Main Services Overview */}
            <section className="py-20 border-b border-stone-200 bg-white">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-12">
                  <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-1">Skema Pendampingan</span>
                  <h2 className="font-serif-editorial text-3xl font-bold text-stone-900">3 Ringkasan Paket Solusi Operasional</h2>
                  <p className="text-stone-600 text-sm mt-2">
                    Metodologi terstruktur untuk membantu efisiensi bisnis, mulai dari audit awal hingga integrasi sistem penuh.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.map((srv) => (
                    <div key={srv.id} className="border border-stone-200 p-6 bg-[#FAF9F6] rounded-sm flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono-code text-amber-900 uppercase tracking-widest mb-1">{srv.packageCode} • {srv.tier}</div>
                        <h3 className="font-serif-editorial text-xl font-bold text-stone-900 mb-2">{srv.title}</h3>
                        <span className="text-xs font-mono-code bg-stone-200 text-stone-800 px-2 py-0.5 inline-block mb-4">
                          Durasi: {srv.duration}
                        </span>
                        <p className="text-xs text-stone-600 mb-6 italic">{srv.idealFor}</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('produk-layanan')}
                        className="w-full text-center py-2 border border-stone-900 text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-stone-50 transition-colors"
                      >
                        Detail Scope Paket
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Case Studies */}
            <section className="py-20 border-b border-stone-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-200">
                  <div>
                    <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-1">Portofolio Pilihan</span>
                    <h2 className="font-serif-editorial text-3xl font-bold text-stone-900">Studi Kasus Laporan Bisnis</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('studi-kasus')}
                    className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800 transition-colors inline-flex items-center"
                  >
                    Lihat Semua Laporan <IconArrowRight />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {CASE_STUDIES.slice(0, 2).map((cs) => (
                    <div 
                      key={cs.id}
                      className="bg-white border border-stone-200 p-8 rounded-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono-code text-stone-500 mb-3">
                          <span className="text-amber-900 font-semibold">{cs.clientCategory}</span>
                          <span>{cs.date}</span>
                        </div>
                        <h3 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-3 leading-snug">
                          {cs.title}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed mb-6">
                          {cs.problemStatement}
                        </p>
                      </div>

                      <div>
                        <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm grid grid-cols-3 gap-2 mb-6 text-center">
                          {cs.impactMetrics.map((m, idx) => (
                            <div key={idx}>
                              <div className="font-serif-editorial text-lg font-bold text-stone-900">{m.value}</div>
                              <div className="text-[10px] font-mono-code text-stone-500 uppercase truncate">{m.label}</div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveCaseStudy(cs)}
                          className="w-full text-center py-2.5 border border-stone-900 text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-stone-50 transition-colors"
                        >
                          Baca Laporan Bisnis
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            {siteSettings.showTestimonials && (
              <section className="py-16 bg-stone-100/60 border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-10">
                    <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-1">Testimoni Klien</span>
                    <h2 className="font-serif-editorial text-3xl font-bold text-stone-900">Apa Kata Pemimpin Operasional</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="bg-white p-8 border border-stone-200 rounded-sm">
                        <p className="font-serif-editorial italic text-stone-800 text-lg leading-relaxed mb-6">
                          "{t.quote}"
                        </p>
                        <div>
                          <div className="font-sans-editorial font-bold text-sm text-stone-900">{t.name}</div>
                          <div className="text-xs font-mono-code text-stone-500">{t.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Recruiter Callout Banner */}
            <section className="py-16 bg-stone-900 text-stone-100">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="text-xs font-mono-code uppercase tracking-widest text-amber-400 block mb-2">Corporate & Enterprise Recruiters</span>
                  <h3 className="font-serif-editorial text-3xl font-bold text-white mb-2">Mencari Senior Business Analyst Berpengalaman?</h3>
                  <p className="text-stone-300 text-sm max-w-xl leading-relaxed">
                    Terbuka untuk posisi full-time / kontrak strategis di perusahaan berskala besar. Unduh resume terstruktur ATS-friendly untuk melihat rekam jejak formal.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    onClick={() => setCvModalOpen(true)}
                    className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 font-sans-editorial font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
                  >
                    <IconDownload />
                    Lihat ATS Resume PDF
                  </button>
                  <button
                    onClick={() => setActiveTab('tentang')}
                    className="px-6 py-3 border border-stone-700 hover:bg-stone-800 text-stone-200 font-sans-editorial font-semibold text-xs uppercase tracking-wider"
                  >
                    Profil Lengkap
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: TENTANG (ABOUT PAGE)                */}
        {/* ========================================== */}
        {}
        {activeTab === 'tentang' && (
          <div className="py-16 bg-[#FAF9F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-12 pb-8 border-b border-stone-200">
                <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-2">Latar Belakang & Filosofi</span>
                <h1 className="font-serif-editorial text-4xl font-bold text-stone-900">{siteSettings.analystName}</h1>
                <p className="text-stone-600 text-lg font-serif-editorial italic mt-2">
                  Senior Business Analyst & Process Optimization Specialist berbasis di Jakarta, Indonesia.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setCvModalOpen(true)}
                    className="px-4 py-2.5 bg-stone-900 text-stone-50 font-mono-code text-xs font-bold uppercase tracking-wider inline-flex items-center rounded-sm hover:bg-stone-800"
                  >
                    <IconDownload />
                    Download ATS Resume (PDF)
                  </button>
                  <button
                    onClick={() => handleWaRedirect("Halo Alex, saya recruiter / pimpinan ingin mendiskusikan peluang karier / proyek Senior BA.")}
                    className="px-4 py-2.5 bg-stone-100 border border-stone-300 text-stone-900 font-mono-code text-xs uppercase tracking-wider hover:bg-stone-200"
                  >
                    <IconWhatsApp className="w-3.5 h-3.5 mr-1.5 text-emerald-600 inline" />
                    Kontak Langsung
                  </button>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="prose prose-stone max-w-none text-stone-800 text-base leading-relaxed space-y-6 mb-16 font-sans-editorial">
                <p>
                  Dengan pengalaman lebih dari 8 tahun di rantai pasok logistik, jasa keuangan, dan agensi teknologi B2B, saya mengkhususkan diri dalam mengidentifikasi hambatan struktural operasional dan mengubah workflow yang berantakan menjadi sistem yang terstandarisasi dan dapat diulang.
                </p>
                <p>
                  Filosofi utama saya dalam analisis bisnis sangat sederhana: <strong>Teknologi harus memperjelas proses, bukan menyembunyikan kekacauan.</strong> Sebelum mengimplementasikan otomasi low-code atau query database SQL, saya melakukan wawancara diagnostik mendalam dan pemetaan alur proses swimlane di Miro untuk membangun satu sumber kebenaran data (single source of truth).
                </p>
              </div>

              {/* Skillsets Matrix */}
              <div className="mb-16">
                <h2 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-6">Matriks Kompetensi Teknis</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="bg-white p-6 border border-stone-200 rounded-sm">
                    <div className="text-[11px] font-mono-code uppercase tracking-wider text-amber-900 mb-2">Domain 01</div>
                    <h3 className="font-serif-editorial text-xl font-bold text-stone-900 mb-3">Pemetaan Proses</h3>
                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">Diagram alur BPMN 2.0, arsitektur swimlane, matriks tanggung jawab RACI.</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Miro", "Lucidchart", "Visio", "Whimsical"].map(t => (
                        <span key={t} className="text-[11px] font-mono-code bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 border border-stone-200 rounded-sm">
                    <div className="text-[11px] font-mono-code uppercase tracking-wider text-amber-900 mb-2">Domain 02</div>
                    <h3 className="font-serif-editorial text-xl font-bold text-stone-900 mb-3">Otomasi & Low-Code</h3>
                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">Pengembangan aplikasi internal low-code, trigger webhook, pipeline API.</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["AppSheet", "Make (Integromat)", "Zapier", "Airtable", "Looker"].map(t => (
                        <span key={t} className="text-[11px] font-mono-code bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 border border-stone-200 rounded-sm">
                    <div className="text-[11px] font-mono-code uppercase tracking-wider text-amber-900 mb-2">Domain 03</div>
                    <h3 className="font-serif-editorial text-xl font-bold text-stone-900 mb-3">Data & Analisis</h3>
                    <p className="text-xs text-stone-600 mb-4 leading-relaxed">Pipeline ETL, dashboard BI eksekutif, perancangan skema relasi data.</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["SQL", "Power BI", "Excel Power Query", "BigQuery"].map(t => (
                        <span key={t} className="text-[11px] font-mono-code bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Career Timeline */}
              <div>
                <h2 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-8">Riwayat Karier Professional</h2>
                <div className="space-y-8 border-l border-stone-300 pl-6 ml-2">
                  {[
                    {
                      year: "2023 - Sekarang",
                      role: "Senior Business Analyst & Process Consultant (Independen)",
                      desc: "Mendampingi direksi UMKM & enterprise regional dalam overhaul SOP, integrasi low-code, dan dashboard BI eksekutif."
                    },
                    {
                      year: "2020 - 2023",
                      role: "Lead Systems & Process Analyst • PT LogiTech Solutions Asia",
                      desc: "Memimpin standarisasi SOP pengiriman di 3 hub distribusi utama; berhasil memangkas waktu proses order hingga 78%."
                    },
                    {
                      year: "2018 - 2020",
                      role: "Operations Business Analyst • FinVanguard Capital",
                      desc: "Merancang konsolidasi pelaporan keuangan berbasis Power BI dan PostgreSQL untuk tata kelola multi-subsidiary."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-stone-900"></div>
                      <span className="text-xs font-mono-code text-amber-900 uppercase tracking-widest block mb-1">{item.year}</span>
                      <h3 className="font-serif-editorial text-lg font-bold text-stone-900">{item.role}</h3>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: STUDI KASUS (PORTFOLIO PAGE)        */}
        {/* ========================================== */}
        {}
        {activeTab === 'studi-kasus' && (
          <div className="py-16 bg-[#FAF9F6]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-2">Laporan Portofolio</span>
                <h1 className="font-serif-editorial text-4xl font-bold text-stone-900">Studi Kasus Rekayasa Operasional</h1>
                <p className="text-stone-600 text-sm mt-2">
                  Analisis mendalam mengenai tantangan operasional, metodologi yang diterapkan, integrasi tools, dan dampak bisnis terukur.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-stone-200">
                {["All", "Automation", "Dashboarding", "SOP & Process Mapping", "Mentorship"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded transition-all ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-stone-50 font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List of Case Studies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCaseStudies.map((cs) => (
                  <div key={cs.id} className="bg-white border border-stone-200 p-8 rounded-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-code text-stone-500 mb-3">
                        <span className="text-amber-900 font-semibold">{cs.clientCategory}</span>
                        <span>{cs.readTime}</span>
                      </div>
                      <h3 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-3 leading-tight">
                        {cs.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-6">
                        {cs.problemStatement}
                      </p>
                    </div>

                    <div>
                      <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm grid grid-cols-3 gap-2 text-center mb-6">
                        {cs.impactMetrics.map((m, idx) => (
                          <div key={idx}>
                            <div className="font-serif-editorial text-lg font-bold text-stone-900">{m.value}</div>
                            <div className="text-[10px] font-mono-code text-stone-500 uppercase truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveCaseStudy(cs)}
                        className="w-full text-center py-2.5 border border-stone-900 text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-stone-50 transition-colors"
                      >
                        Lihat Laporan Lengkap
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: ARTIKEL (BLOG PAGE)                 */}
        {/* ========================================== */}
        {}
        {activeTab === 'artikel' && (
          <div className="py-16 bg-[#FAF9F6]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-12 pb-8 border-b border-stone-200 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-2">Pemikiran & Metodologi</span>
                  <h1 className="font-serif-editorial text-4xl font-bold text-stone-900">Artikel & Tulisan Analisis</h1>
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-64">
                  <IconSearch />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-stone-900 rounded-sm"
                  />
                </div>
              </div>

              {/* Substack/Medium Style Minimalist Reader List */}
              <div className="divide-y divide-stone-200">
                {filteredArticles.map((art) => (
                  <article key={art.id} className="py-10 first:pt-0 group">
                    <div className="flex items-center space-x-3 text-xs font-mono-code text-stone-500 mb-3">
                      <span className="font-semibold text-stone-900">{art.category}</span>
                      <span>•</span>
                      <span>{art.publishDate}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h2 
                      onClick={() => setActiveArticle(art)}
                      className="font-serif-editorial text-3xl font-bold text-stone-900 group-hover:text-amber-900 cursor-pointer transition-colors mb-3 leading-snug"
                    >
                      {art.title}
                    </h2>

                    <p className="text-stone-600 leading-relaxed text-base mb-4 font-serif-editorial">
                      {art.excerpt}
                    </p>

                    <button
                      onClick={() => setActiveArticle(art)}
                      className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-amber-900 inline-flex items-center"
                    >
                      Baca Tulisan Lengkap <IconArrowRight />
                    </button>
                  </article>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: PRODUK & LAYANAN (SERVICES & DIGITAL) */}
        {/* ========================================== */}
        {}
        {activeTab === 'produk-layanan' && (
          <div className="py-16 bg-[#FAF9F6]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="max-w-3xl mb-16">
                <span className="text-xs font-mono-code uppercase tracking-widest text-amber-900 block mb-2">Penawaran & Aset</span>
                <h1 className="font-serif-editorial text-4xl font-bold text-stone-900">Produk & Layanan Konsultasi</h1>
                <p className="text-stone-600 text-base mt-2">
                  Paket pendampingan operasional transparan, program pelatihan tim, serta template analisis digital siap pakai.
                </p>
              </div>

              {/* SECTION A: PROFESSIONAL SERVICES TABLE / CARDS */}
              <div className="mb-20">
                <h2 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-8 pb-3 border-b border-stone-200">
                  Paket Konsultasi Operasional Utama
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICES.map((srv) => (
                    <div 
                      key={srv.id}
                      className="bg-white border border-stone-200 p-8 rounded-sm shadow-sm flex flex-col justify-between relative"
                    >
                      {srv.packageCode === 'Paket 2' && (
                        <span className="absolute top-0 right-0 bg-stone-900 text-stone-100 font-mono-code text-[10px] uppercase tracking-wider px-3 py-1">
                          Paling Populer
                        </span>
                      )}

                      <div>
                        <div className="text-xs font-mono-code text-amber-900 uppercase tracking-widest mb-1">
                          {srv.packageCode} • {srv.tier}
                        </div>
                        <h3 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-2">{srv.title}</h3>
                        <div className="text-xs font-mono-code bg-stone-100 text-stone-700 px-2.5 py-1 inline-block mb-4">
                          Durasi: {srv.duration}
                        </div>

                        <p className="text-xs text-stone-500 italic mb-6 leading-relaxed">
                          Cocok Untuk: {srv.idealFor}
                        </p>

                        <div className="border-t border-stone-100 pt-4 mb-8">
                          <div className="text-[11px] font-mono-code text-stone-400 uppercase tracking-wider mb-3">Cakupan Kerja (Scope):</div>
                          <ul className="space-y-2.5 text-xs text-stone-700">
                            {srv.scope.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <IconCheck />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => setCustomWaModal({ open: true, text: srv.waMessage, title: srv.title })}
                        className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-sans-editorial text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
                      >
                        <IconWhatsApp className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                        Tanya via WhatsApp
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION B: MENTORSHIP & TRAINING */}
              <div className="mb-20 bg-stone-900 text-stone-100 p-8 md:p-12 rounded-sm shadow-md">
                <div className="max-w-3xl">
                  <span className="text-xs font-mono-code uppercase tracking-widest text-amber-300 block mb-2">Peningkatan Kapasitas Tim</span>
                  <h3 className="font-serif-editorial text-3xl font-bold mb-4">Mentorship 1-on-1 & Pelatihan Excel Organisasi</h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-8">
                    Program bimbingan khusus untuk Junior Business Analyst serta pelatihan in-house pengolahan data otomatis menggunakan Excel Power Query & Looker Studio untuk tim internal perusahaan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-stone-800 p-5 rounded-sm border border-stone-700">
                      <h4 className="font-serif-editorial font-bold text-white text-lg mb-2">Mentorship BA 1-on-1</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Sesi intensif mingguan tentang pemetaan BPMN, low-code app building, review portofolio studi kasus, serta perselisihan wawancara kerja.
                      </p>
                    </div>
                    <div className="bg-stone-800 p-5 rounded-sm border border-stone-700">
                      <h4 className="font-serif-editorial font-bold text-white text-lg mb-2">Pelatihan Excel Korporat</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Lokakarya praktis pelatihan staf internal dalam pembersihan data otomatis, pemodelan rumus tingkat lanjut, & dashboard konsolidasi.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWaRedirect("Halo Alex, saya berminat diskusi jadwal Mentorship / Pelatihan Excel untuk tim internal kami.")}
                    className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 font-sans-editorial font-bold text-xs uppercase tracking-wider inline-flex items-center"
                  >
                    <IconWhatsApp className="w-4 h-4 mr-2 text-emerald-600" />
                    Diskusi Jadwal Pelatihan
                  </button>
                </div>
              </div>

              {/* SECTION C: DIGITAL PRODUCTS (LYNK.ID INTEGRATION) */}
              <div>
                <h2 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-8 pb-3 border-b border-stone-200">
                  Produk Digital Siap Unduh (Lynk.id)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PRODUCTS.map((prod) => (
                    <div key={prod.id} className="bg-white border border-stone-200 p-8 rounded-sm shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-800 font-mono-code text-[10px] uppercase tracking-wider font-semibold">
                            {prod.badge}
                          </span>
                          <span className="font-serif-editorial text-lg font-bold text-stone-900">{prod.price}</span>
                        </div>
                        <h3 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-2">{prod.title}</h3>
                        <p className="text-stone-600 text-xs leading-relaxed mb-6">{prod.description}</p>
                      </div>

                      <a
                        href={prod.lynkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-sans-editorial text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center"
                      >
                        Beli / Unduh via Lynk.id
                        <IconExternalLink />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 6: SANITY CMS STUDIO & SITE SETTINGS   */}
        {/* ========================================== */}
        {}
        {activeTab === 'cms-schema' && (
          <div className="py-16 bg-stone-900 text-stone-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8 pb-6 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono-code uppercase tracking-widest text-amber-400 block mb-2">Headless Sanity.io Studio Integration</span>
                  <h1 className="font-serif-editorial text-3xl font-bold text-white">Sanity CMS Schemas & Site Settings</h1>
                  <p className="text-stone-400 text-xs font-mono-code mt-1">
                    Kontrol konfigurasi situs dan skema TypeScript untuk Post, Case Study, Product, Service, dan Site Settings.
                  </p>
                </div>
              </div>

              {/* LIVE CMS CONTROLLER DEMO */}
              <div className="bg-stone-800 border border-stone-700 p-6 rounded-sm mb-12">
                <h2 className="text-sm font-mono-code uppercase text-amber-400 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                  Live Sanity `siteSettings` Configurator (Uji Coba Tampilan Interaktif)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono-code">
                  <div>
                    <label className="block text-stone-400 mb-1">Judul Headline Hero (`headlineTitle`):</label>
                    <input
                      type="text"
                      value={siteSettings.headlineTitle}
                      onChange={(e) => setSiteSettings({...siteSettings, headlineTitle: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-700 text-white p-2 rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-400 mb-1">Nomor WhatsApp Aktif (`waNumber`):</label>
                    <input
                      type="text"
                      value={siteSettings.waNumber}
                      onChange={(e) => setSiteSettings({...siteSettings, waNumber: e.target.value})}
                      className="w-full bg-stone-900 border border-stone-700 text-white p-2 rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center space-x-6 pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteSettings.showMetrics}
                        onChange={(e) => setSiteSettings({...siteSettings, showMetrics: e.target.checked})}
                        className="mr-2"
                      />
                      <span>Tampilkan Metrics Banner</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteSettings.showTestimonials}
                        onChange={(e) => setSiteSettings({...siteSettings, showTestimonials: e.target.checked})}
                        className="mr-2"
                      />
                      <span>Tampilkan Testimoni</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={siteSettings.showBanner}
                        onChange={(e) => setSiteSettings({...siteSettings, showBanner: e.target.checked})}
                        className="mr-2"
                      />
                      <span>Tampilkan Top Banner</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sanity Schema Code Blocks */}
              <div className="bg-stone-950 rounded border border-stone-800 overflow-hidden">
                <div className="bg-stone-900 px-6 py-3 border-b border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-stone-400">sanity/schemas/schemaDefinitions.ts</span>
                  <button
                    onClick={() => {
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="text-xs font-mono-code bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1 rounded transition-colors"
                  >
                    {copiedCode ? '✓ Copied' : 'Copy Schemas'}
                  </button>
                </div>

                <div className="p-6 font-mono-code text-xs text-emerald-400 leading-relaxed overflow-x-auto max-h-[600px]">
                  <pre>{`// 1. siteSettings schema (Global Site Configuration)
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Pengaturan Situs',
  type: 'document',
  fields: [
    { name: 'analystName', title: 'Nama Analyst & Gelar', type: 'string' },
    { name: 'headlineTitle', title: 'Judul Headline Utama', type: 'string' },
    { name: 'subHeadline', title: 'Deskripsi Sub-Headline', type: 'text' },
    { name: 'waNumber', title: 'Nomor WhatsApp (e.g. 6281234567890)', type: 'string' },
    { name: 'showMetrics', title: 'Tampilkan Banner Angka Impact', type: 'boolean' },
    { name: 'showTestimonials', title: 'Tampilkan Seksi Testimoni', type: 'boolean' },
    { name: 'showBanner', title: 'Tampilkan Top Bar Announcement', type: 'boolean' },
    { name: 'bannerText', title: 'Teks Top Bar Announcement', type: 'string' }
  ]
};

// 2. post schema (Articles & Blog)
export const postSchema = {
  name: 'post',
  title: 'Artikel / Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Judul Artikel', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishDate', title: 'Tanggal Rilis', type: 'date' },
    { name: 'category', title: 'Kategori Artikel', type: 'string' },
    { name: 'readTime', title: 'Estimasi Waktu Baca', type: 'string' },
    { name: 'excerpt', title: 'Ringkasan Pendek (Excerpt)', type: 'text', rows: 3 },
    { name: 'content', title: 'Konten Lengkap (Portable Text)', type: 'array', of: [{ type: 'block' }] }
  ]
};

// 3. caseStudy schema (Portfolio Reports)
export const caseStudySchema = {
  name: 'caseStudy',
  title: 'Studi Kasus Bisnis',
  type: 'document',
  fields: [
    { name: 'title', title: 'Judul Proyek Laporan', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
    { name: 'clientCategory', title: 'Kategori Industri Klien', type: 'string' },
    { name: 'problemStatement', title: 'Pernyataan Masalah (Problem Statement)', type: 'text' },
    { name: 'solutionSummary', title: 'Ringkasan Solusi', type: 'text' },
    { name: 'impactMetrics', title: 'Metrik Dampak Bisnis', type: 'array', of: [
      {
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label Metrik' },
          { name: 'value', type: 'string', title: 'Nilai Terukur' }
        ]
      }
    ]},
    { name: 'toolsUsed', title: 'Perangkat Lunak / Tools', type: 'array', of: [{ type: 'string' }] }
  ]
};

// 4. product schema (Digital Templates)
export const productSchema = {
  name: 'product',
  title: 'Produk Digital',
  type: 'document',
  fields: [
    { name: 'title', title: 'Judul Produk Template', type: 'string' },
    { name: 'description', title: 'Deskripsi Produk', type: 'text' },
    { name: 'priceText', title: 'Format Harga (IDR / USD)', type: 'string' },
    { name: 'lynkUrl', title: 'Tautan Pembelian Lynk.id', type: 'url' }
  ]
};

// 5. service schema (Consulting Offerings)
export const serviceSchema = {
  name: 'service',
  title: 'Paket Layanan Konsultasi',
  type: 'document',
  fields: [
    { name: 'packageCode', title: 'Kode Paket (e.g. Paket 1)', type: 'string' },
    { name: 'title', title: 'Nama Paket Layanan', type: 'string' },
    { name: 'duration', title: 'Estimasi Durasi Pengerjaan', type: 'string' },
    { name: 'scopePoints', title: 'Daftar Scope Kerja', type: 'array', of: [{ type: 'string' }] },
    { name: 'waMessageTemplate', title: 'Teks Pesan Otomatis WhatsApp', type: 'text' }
  ]
};`}</pre>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* MODAL 1: ATS RESUME PREVIEW & DOWNLOAD     */}
      {/* ========================================== */}
      {}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-stone-900 rounded-sm max-w-3xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto my-8 border border-stone-300">
            <button
              onClick={() => setCvModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-stone-500 hover:text-stone-900 transition-colors font-mono-code"
            >
              ✕ TUTUP
            </button>

            {/* Printable ATS Content */}
            <div id="printable-cv" className="font-sans-editorial">
              <div className="border-b-2 border-stone-900 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-tight text-stone-900">{siteSettings.analystName}</h1>
                <p className="text-sm font-semibold text-stone-700 mt-1">Senior Business Analyst & Process Engineer</p>
                <div className="text-xs font-mono-code text-stone-600 mt-2 flex flex-wrap gap-4">
                  <span>Jakarta, Indonesia</span>
                  <span>•</span>
                  <span>Email: alex.morgan.ba@domain.id</span>
                  <span>•</span>
                  <span>WA: +{siteSettings.waNumber}</span>
                </div>
              </div>

              <div className="space-y-6 text-xs text-stone-800 leading-relaxed">
                <div>
                  <h2 className="text-sm font-bold uppercase border-b border-stone-300 pb-1 mb-2 font-mono-code">Ringkasan Profesional</h2>
                  <p>
                    Business Analyst Senior dengan 8+ tahun pengalaman merancang ulang alur kerja operasional, audit SOP, dan integrasi otomasi low-code (AppSheet, Make, SQL, Looker Studio). Terbukti memangkas waktu proses hingga 78% dan menghemat biaya operasional perusahaan logistik & ritel.
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase border-b border-stone-300 pb-1 mb-2 font-mono-code">Keahlian Utama (Core Skills)</h2>
                  <div className="grid grid-cols-2 gap-2 font-mono-code">
                    <div>• Process Mapping: BPMN 2.0, Swimlanes, Miro</div>
                    <div>• Data Analytics: SQL, Power BI, Looker Studio</div>
                    <div>• Otomasi: AppSheet, Make, Webhooks API</div>
                    <div>• Dokumentasi: SOP, RACI Matrix, BRD & FSD</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase border-b border-stone-300 pb-1 mb-2 font-mono-code">Pengalaman Kerja</h2>
                  
                  <div className="mb-4">
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>Senior Business Analyst & Consultant — Independen</span>
                      <span>2023 – Sekarang</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 mt-1 text-stone-700">
                      <li>Mendampingi 15+ bisnis UMKM & menengah dalam standarisasi SOP dan integrasi dashboard real-time.</li>
                      <li>Mengembangkan sistem dispatch otomatis berbasis AppSheet & Make dengan efisiensi error mencapai 0.4%.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>Lead Systems & Process Analyst — PT LogiTech Solutions Asia</span>
                      <span>2020 – 2023</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 mt-1 text-stone-700">
                      <li>Memimpin tim re-engineering alur kerja 3 hub distribusi utama di Jawa & Sumatra.</li>
                      <li>Mengurangi pemrosesan pesanan dari 48 jam menjadi 4 jam dengan integrasi webhook ERP.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase border-b border-stone-300 pb-1 mb-2 font-mono-code">Pendidikan & Sertifikasi</h2>
                  <div className="flex justify-between">
                    <span><strong>S1 Teknik Industri</strong> — Universitas Indonesia</span>
                    <span>2014 – 2018</span>
                  </div>
                  <p className="text-stone-600 mt-1 font-mono-code">• Certified Business Analysis Professional (CBAP) • Certified Scrum Master (CSM)</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-center">
              <span className="text-xs font-mono-code text-stone-500">Format ATS-Friendly siap cetak / PDF</span>
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 font-mono-code text-xs font-bold uppercase tracking-wider inline-flex items-center"
              >
                <IconDownload />
                Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 2: CASE STUDY DETAIL REPORT          */}
      {/* ========================================== */}
      {}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF9F6] rounded-sm max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto my-8 border border-stone-300">
            <button
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-6 right-6 p-2 text-stone-500 hover:text-stone-900 transition-colors font-mono-code"
            >
              ✕ TUTUP
            </button>

            <div className="text-xs font-mono-code text-amber-900 uppercase tracking-widest mb-2">
              Laporan Studi Kasus • {activeCaseStudy.clientCategory}
            </div>

            <h2 className="font-serif-editorial text-3xl font-bold text-stone-900 mb-2">
              {activeCaseStudy.title}
            </h2>

            {/* Impact Banner */}
            <div className="bg-white border border-stone-200 p-4 rounded-sm mb-6 grid grid-cols-3 gap-2 text-center my-6">
              {activeCaseStudy.impactMetrics.map((m, i) => (
                <div key={i}>
                  <div className="font-serif-editorial text-xl font-bold text-stone-900">{m.value}</div>
                  <div className="text-[10px] font-mono-code text-stone-500 uppercase">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Structured Business Report Sections */}
            <div className="space-y-6 text-sm text-stone-800 leading-relaxed font-sans-editorial">
              <div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg mb-1">1. Pernyataan Masalah (Problem Statement)</h3>
                <p className="bg-white p-4 border border-stone-200 text-stone-700">{activeCaseStudy.problemStatement}</p>
              </div>

              <div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg mb-1">2. Tools & Stack Perangkat Lunak</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeCaseStudy.toolsUsed.map((t, idx) => (
                    <span key={idx} className="font-mono-code text-xs bg-stone-200 text-stone-800 px-3 py-1 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg mb-1">3. Tahapan Eksekusi & Process Flowchart</h3>
                <ul className="space-y-2 pl-4 list-disc text-xs text-stone-700">
                  {activeCaseStudy.processSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-lg mb-1">4. Ringkasan Solusi Akhir</h3>
                <p className="bg-white p-4 border border-stone-200 text-stone-700">{activeCaseStudy.solutionSummary}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => {
                  const msg = `Halo Alex, saya telah membaca Studi Kasus: "${activeCaseStudy.title}". Saya berminat mendiskusikan implementasi serupa untuk bisnis kami.`;
                  setActiveCaseStudy(null);
                  handleWaRedirect(msg);
                }}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-sans-editorial font-bold text-xs uppercase tracking-wider inline-flex items-center"
              >
                <IconWhatsApp className="w-4 h-4 mr-2 text-emerald-400" />
                Diskusi Solusi Ini via WA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 3: ARTICLE READER                    */}
      {/* ========================================== */}
      {}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF9F6] rounded-sm max-w-3xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto my-8 border border-stone-300">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 text-stone-500 hover:text-stone-900 transition-colors font-mono-code"
            >
              ✕ TUTUP
            </button>

            <div className="flex items-center space-x-3 text-xs font-mono-code text-stone-500 mb-4">
              <span className="font-semibold text-amber-900">{activeArticle.category}</span>
              <span>•</span>
              <span>{activeArticle.publishDate}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              {activeArticle.title}
            </h1>

            <div className="prose prose-stone max-w-none text-stone-800 font-serif-editorial text-base leading-relaxed space-y-4 border-t border-stone-200 pt-6">
              {activeArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="font-serif-editorial text-2xl font-bold text-stone-900 mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('> ')) {
                  return <blockquote key={idx} className="border-l-2 border-stone-900 pl-4 italic text-stone-700 my-4">{paragraph.replace('> ', '')}</blockquote>;
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            <div className="mt-10 pt-6 border-t border-stone-200 flex justify-between items-center text-xs font-mono-code text-stone-500">
              <span>Penulis: {siteSettings.analystName.split(',')[0]}</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-stone-900 text-stone-50 font-bold uppercase tracking-wider"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 4: WHATSAPP CUSTOM INQUIRY           */}
      {/* ========================================== */}
      {}
      {customWaModal.open && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] rounded-sm max-w-lg w-full p-6 shadow-2xl border border-stone-300 relative">
            <h3 className="font-serif-editorial text-2xl font-bold text-stone-900 mb-2">Konsultasi via WhatsApp</h3>
            <p className="text-xs font-mono-code text-stone-500 mb-4">
              Paket: <strong className="text-stone-900">{customWaModal.title}</strong>
            </p>

            <div className="mb-4">
              <label className="block text-xs font-mono-code text-stone-700 uppercase tracking-wider mb-2">
                Draf Pesan Otomatis (Dapat Diubah):
              </label>
              <textarea
                rows={4}
                value={customWaModal.text}
                onChange={(e) => setCustomWaModal({ ...customWaModal, text: e.target.value })}
                className="w-full p-3 bg-white border border-stone-300 rounded-sm text-xs font-mono-code text-stone-800 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCustomWaModal({ open: false, text: '', title: '' })}
                className="px-4 py-2 bg-stone-200 text-stone-800 text-xs font-mono-code uppercase tracking-wider"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const txt = customWaModal.text;
                  setCustomWaModal({ open: false, text: '', title: '' });
                  handleWaRedirect(txt);
                }}
                className="px-5 py-2 bg-stone-900 text-stone-50 text-xs font-mono-code font-bold uppercase tracking-wider flex items-center"
              >
                <IconWhatsApp className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editorial Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 rounded bg-stone-100 text-stone-900 font-serif-editorial font-bold text-xs flex items-center justify-center">
                  AM
                </div>
                <span className="font-serif-editorial text-lg font-bold text-white">{siteSettings.analystName.split(',')[0]}</span>
              </div>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed mb-4">
                Senior Business Analyst & Process Optimization Advisor. Mengubah kompleksitas operasional menjadi sistem low-code terukur dan control tower akurat.
              </p>
              <div className="text-[11px] font-mono-code text-stone-500">
                © {new Date().getFullYear()} {siteSettings.analystName.split(',')[0]}. Hak Cipta Dilindungi.
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-stone-200 mb-4">Navigasi Halaman</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActiveTab('beranda')} className="hover:text-amber-300">Beranda</button></li>
                <li><button onClick={() => setActiveTab('tentang')} className="hover:text-amber-300">Tentang & Keahlian</button></li>
                <li><button onClick={() => setActiveTab('studi-kasus')} className="hover:text-amber-300">Studi Kasus</button></li>
                <li><button onClick={() => setActiveTab('produk-layanan')} className="hover:text-amber-300">Produk & Layanan</button></li>
                <li><button onClick={() => setActiveTab('cms-schema')} className="hover:text-amber-300">Sanity Studio CMS</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-stone-200 mb-4">Saluran Profesional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-amber-300">LinkedIn Profil</a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-300">GitHub Repository</a></li>
                <li><a href="https://medium.com" target="_blank" rel="noreferrer" className="hover:text-amber-300">Medium Blog</a></li>
                <li><a href="https://lynk.id" target="_blank" rel="noreferrer" className="hover:text-amber-300">Lynk.id Toko Digital</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleWaRedirect()}
          className="flex items-center justify-center p-3.5 rounded-full bg-stone-900 text-stone-50 shadow-2xl hover:bg-stone-800 transition-all transform hover:scale-105 active:scale-95 border border-stone-700"
          title="Konsultasi WhatsApp Langsung"
        >
          <IconWhatsApp className="w-6 h-6 text-emerald-400" />
        </button>
      </div>

    </div>
  );
}
