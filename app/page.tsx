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
  const [activeCaseStudy, setActiveCaseStudy] = useState<any>(null);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Live Sanity Site Settings State
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleWaRedirect = (customText?: string) => {
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

        {/* TAB 1: BERANDA (HOME PAGE) */}
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
                      Konsultasi Langsung
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Case Studies */}
            <section className="py-16 border-b border-stone-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                      Studi Kasus Pilihan
                    </h2>
                    <p className="text-stone-600 text-sm mt-1">
                      Hasil nyata re-engineering proses dan arsitektur data.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('studi-kasus')} 
                    className="text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-stone-600"
                  >
                    Lihat Semua ({CASE_STUDIES.length}) &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {CASE_STUDIES.filter(cs => cs.featured).map(cs => (
                    <div key={cs.id} className="border border-stone-300 bg-white p-6 rounded flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-mono-code text-stone-500 mb-3">
                          <span>{cs.clientCategory}</span>
                          <span>{cs.date}</span>
                        </div>
                        <h3 className="font-serif-editorial text-xl font-bold mb-3 text-stone-900">
                          {cs.title}
                        </h3>
                        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                          {cs.solutionSummary}
                        </p>
                      </div>
                      <div>
                        <div className="grid grid-cols-3 gap-2 py-3 my-4 border-y border-stone-200 text-center bg-stone-50">
                          {cs.impactMetrics.map((m, i) => (
                            <div key={i}>
                              <div className="font-mono-code font-bold text-stone-900 text-sm">{m.value}</div>
                              <div className="text-[10px] text-stone-500">{m.label}</div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveCaseStudy(cs)}
                          className="w-full text-center py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 font-mono-code text-xs font-bold uppercase"
                        >
                          Baca Detail Studi Kasus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TENTANG (ABOUT PAGE) */}
        {activeTab === 'tentang' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h1 className="font-serif-editorial text-4xl font-bold text-stone-900 mb-6">Tentang Saya</h1>
            <div className="prose prose-stone font-serif-editorial text-lg leading-relaxed space-y-4 text-stone-800">
              <p>
                Saya Alex Morgan, S.T., seorang Lead / Senior Business Analyst yang berfokus pada optimasi alur kerja, otomasi low-code, dan visualisasi data performa bisnis.
              </p>
              <p>
                Dengan latar belakang teknik dan pengalaman menangani proyek dari efisiensi rantai pasok hingga dashboard eksekutif multi-cabang, saya percaya bahwa efisiensi sejati tidak berasal dari alat yang rumit, melainkan dari kejernihan proses awal.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: STUDI KASUS */}
        {activeTab === 'studi-kasus' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-serif-editorial text-3xl font-bold mb-8">Semua Studi Kasus</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCaseStudies.map(cs => (
                <div key={cs.id} className="border border-stone-300 bg-white p-6 rounded flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono-code text-stone-500 block mb-2">{cs.category}</span>
                    <h3 className="font-serif-editorial text-xl font-bold mb-3">{cs.title}</h3>
                    <p className="text-stone-600 text-sm mb-4">{cs.solutionSummary}</p>
                  </div>
                  <button
                    onClick={() => setActiveCaseStudy(cs)}
                    className="w-full py-2 bg-stone-900 text-stone-50 text-xs font-bold uppercase"
                  >
                    Lihat Rincian
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ARTIKEL */}
        {activeTab === 'artikel' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h1 className="font-serif-editorial text-3xl font-bold mb-6">Artikel & Publikasi</h1>
            <div className="relative mb-8">
              <IconSearch />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded bg-white text-sm"
              />
            </div>
            <div className="space-y-6">
              {filteredArticles.map(art => (
                <div key={art.id} className="border-b border-stone-200 pb-6">
                  <span className="text-xs font-mono-code text-stone-500">{art.publishDate} • {art.category}</span>
                  <h2 className="font-serif-editorial text-2xl font-bold my-2 text-stone-900 hover:text-stone-600 cursor-pointer" onClick={() => setActiveArticle(art)}>
                    {art.title}
                  </h2>
                  <p className="text-stone-600 text-sm mb-3">{art.excerpt}</p>
                  <button onClick={() => setActiveArticle(art)} className="text-xs font-bold uppercase text-stone-900">
                    Baca Selengkapnya &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PRODUK & LAYANAN */}
        {activeTab === 'produk-layanan' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="font-serif-editorial text-3xl font-bold mb-8">Paket Layanan Konsultasi</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {SERVICES.map(s => (
                <div key={s.id} className="border border-stone-300 bg-white p-6 rounded flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono-code text-stone-500 uppercase block">{s.packageCode} • {s.tier}</span>
                    <h2 className="font-serif-editorial text-xl font-bold my-2">{s.title}</h2>
                    <p className="text-xs font-mono-code text-stone-600 mb-4">Durasi: {s.duration}</p>
                    <ul className="space-y-2 mb-6">
                      {s.scope.map((item, idx) => (
                        <li key={idx} className="text-xs text-stone-700 flex items-start">
                          <IconCheck />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleWaRedirect(s.waMessage)}
                    className="w-full py-2.5 bg-stone-900 text-stone-50 text-xs font-bold uppercase tracking-wider flex items-center justify-center"
                  >
                    <IconWhatsApp className="mr-2 text-emerald-400" />
                    Pilih Paket Ini
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SANITY STUDIO CMS SCHEMA */}
        {activeTab === 'cms-schema' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h1 className="font-serif-editorial text-3xl font-bold mb-4">Sanity CMS Integration Schema</h1>
            <p className="text-stone-600 text-sm mb-6">
              Berikut adalah skema konfigurasi Sanity Studio yang digunakan untuk mengelola data dinamis pada situs editorial ini.
            </p>
            <pre className="bg-stone-900 text-stone-100 p-4 rounded font-mono-code text-xs overflow-x-auto">
{`export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'analystName', title: 'Analyst Name', type: 'string' },
    { name: 'headlineTitle', title: 'Headline Title', type: 'string' },
    { name: 'subHeadline', title: 'Sub-headline', type: 'text' },
    { name: 'waNumber', title: 'WhatsApp Number', type: 'string' },
    { name: 'showBanner', title: 'Show Banner', type: 'boolean' },
    { name: 'bannerText', title: 'Banner Text', type: 'string' },
  ]
}`}
            </pre>
          </div>
        )}

      </main>

      {/* Case Study Detail Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded shadow-xl relative">
            <button
              onClick={() => setActiveCaseStudy(null)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 font-bold text-sm"
            >
              ✕ Tutup
            </button>
            <span className="text-xs font-mono-code text-stone-500 uppercase">{activeCaseStudy.category}</span>
            <h2 className="font-serif-editorial text-2xl font-bold my-2">{activeCaseStudy.title}</h2>
            <div className="my-4 p-4 bg-stone-100 border-l-4 border-stone-900 text-stone-800 text-sm">
              <strong>Problem:</strong> {activeCaseStudy.problemStatement}
            </div>
            <div className="my-4 text-stone-700 text-sm leading-relaxed">
              <strong>Solusi:</strong> {activeCaseStudy.solutionSummary}
            </div>
            <h4 className="font-bold text-xs uppercase font-mono-code mt-4 mb-2">Tahapan Proses:</h4>
            <ul className="list-disc list-inside text-xs text-stone-700 space-y-1 mb-6">
              {activeCaseStudy.processSteps.map((step: string, idx: number) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
            <button
              onClick={() => handleWaRedirect(`Halo Alex, saya tertarik dengan Studi Kasus: ${activeCaseStudy.title}`)}
              className="w-full py-3 bg-stone-900 text-stone-50 text-xs font-bold uppercase"
            >
              Konsultasikan Proyek Serupa
            </button>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded shadow-xl relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 font-bold text-sm"
            >
              ✕ Tutup
            </button>
            <span className="text-xs font-mono-code text-stone-500">{activeArticle.publishDate}</span>
            <h2 className="font-serif-editorial text-2xl font-bold my-2">{activeArticle.title}</h2>
            <div className="prose prose-stone text-sm leading-relaxed mt-4 whitespace-pre-line text-stone-800">
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}

      {/* Download CV Modal */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded shadow-xl relative text-center">
            <button
              onClick={() => setCvModalOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 font-bold text-sm"
            >
              ✕
            </button>
            <h3 className="font-serif-editorial text-xl font-bold mb-2">Download Curriculum Vitae</h3>
            <p className="text-xs text-stone-600 mb-6">
              Pilih format Resume / CV yang sesuai dengan kebutuhan kualifikasi Anda.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Mengunduh ATS-Friendly Resume PDF...');
                  setCvModalOpen(false);
                }}
                className="w-full py-2.5 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs font-mono-code font-bold uppercase"
              >
                ATS Format CV (PDF)
              </button>
              <button
                onClick={() => {
                  alert('Mengunduh Portfolio Executive Ringkas...');
                  setCvModalOpen(false);
                }}
                className="w-full py-2.5 bg-stone-900 text-white text-xs font-mono-code font-bold uppercase"
              >
                Executive Portfolio Kit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="font-serif-editorial text-lg text-stone-200">
            {siteSettings.analystName}
          </div>
          <p>© 2026 Senior Business Analyst & Process Engineer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
