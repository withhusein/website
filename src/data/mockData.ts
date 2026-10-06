import { SiteSettings, CaseStudy, Article, Service } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  analystName: "Alex Morgan, S.T., Lead BA",
  headlineTitle: "Mengubah Alur Kerja Kompleks Menjadi Sistem Operasional Berkelanjutan.",
  subHeadline: "Otomasi tanpa kejelasan proses hanya mempercepat kekacauan. Saya membantu UMKM & Enterprise menjembatani operasional bisnis dengan arsitektur data & low-code yang presisi.",
  waNumber: "6281234567890",
  showMetrics: true,
  showTestimonials: true,
  showBanner: true,
  bannerText: "• Terbuka untuk Konsultasi Operasional UMKM & Peluang Senior BA Enterprise"
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Otomasi Pemrosesan Pesanan & Integrasi ERP Distribusi Logistik",
    clientCategory: "Logistik & Rantai Pasok",
    category: "Automation",
    readTime: "7 menit baca",
    date: "Agu 2026",
    problemStatement: "Pemrosesan pesanan manual membutuhkan waktu 48+ jam dengan tingkat kesalahan 12%, memicu penumpukan pengiriman saat kampanye promosi bulanan.",
    solutionSummary: "Merancang workflow otomatis dari penerimaan order hingga sync ERP menggunakan Make, AppSheet, dan PostgreSQL.",
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
    title: "Sistem Manajemen Inventaris & Forecasting Stok Ritel Multi-Cabang",
    clientCategory: "Ritel & FMCG",
    category: "Data Architecture",
    readTime: "5 menit baca",
    date: "Jun 2026",
    problemStatement: "Ketidakseimbangan stok antar cabang menyebabkan loss sales sebesar 15% setiap bulan akibat stockout item populer.",
    solutionSummary: "Membangun sistem pemantauan persediaan real-time terpusat dengan algoritma reorder point otomatis.",
    toolsUsed: ["Looker Studio", "Google BigQuery", "AppSheet", "Python"],
    impactMetrics: [
      { label: "Penurunan Stockout", value: "65%" },
      { label: "Akurasi Inventaris", value: "98.2%" },
      { label: "Loss Sales Terhindar", value: "Rp 45M/Bln" }
    ],
    scope: "Audit alur stok barang, pembersihan data terpusat, pembuatan model reorder otomatis, dan training kepala toko.",
    processSteps: [
      "Audit Pencatatan Stok di 12 Cabang",
      "Normalisasi Database Persediaan di BigQuery",
      "Pembuatan Dashboard Monitoring & Alerting Stok",
      "Uji Coba & Deployment Aplikasi Kasir/Gudang"
    ],
    featured: true
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Mengapa Mayoritas Proyek Otomasi Bisnis UMKM Gagal di Tengah Jalan",
    slug: "mengapa-otomasi-bisnis-gagal",
    category: "Process Engineering",
    readTime: "6 menit baca",
    publishDate: "28 Sep 2026",
    excerpt: "Mengotomatiskan proses yang berantakan hanya akan mempercepat kekacauan. Pelajari pentingnya pemetaan alur sebelum memilih alat low-code.",
    content: "Banyak organisasi terburu-buru membeli platform low-code mahal tanpa membereskan alur kerja manualnya terlebih dahulu..."
  },
  {
    id: "art-2",
    title: "Panduan Menyusun Requirement Traceability Matrix (RTM) untuk BA",
    slug: "panduan-rtm-business-analyst",
    category: "BA Frameworks",
    readTime: "8 menit baca",
    publishDate: "15 Agu 2026",
    excerpt: "Cara memastikan setiap kebutuhan bisnis terakomodasi dengan presisi hingga tahap eksekusi teknis.",
    content: "RTM adalah kompas utama Business Analyst saat berhadapan dengan tim engineering..."
  }
];

export const SERVICES: Service[] = [
  {
    id: "service-1",
    packageCode: "Paket 1",
    title: "Diagnostic & Audit Operasional",
    tier: "Entry Offer",
    duration: "1–2 Minggu",
    idealFor: "UMKM & Bisnis Berkembang yang mengalami kemacetan operasional.",
    scope: [
      "Wawancara diagnostic & alur kerja lapangan",
      "Pemetaan alur proses kasar & gap analysis",
      "Laporan audit format PDF & peta masalah",
      "1x Sesi diskusi de-brief strategi eksekutif (90 menit)"
    ],
    waMessage: "Halo Alex Morgan, saya tertarik dengan Paket 1: Diagnostic & Audit Operasional."
  },
  {
    id: "service-2",
    packageCode: "Paket 2",
    title: "Arsitektur Sistem & Spesifikasi Teknis (BRD/FSD)",
    tier: "Core Advisory",
    duration: "3–4 Minggu",
    idealFor: "Perusahaan yang ingin membangun/memilih vendor software.",
    scope: [
      "Penyusunan BRD (Business Requirement Document) & FSD lengkap",
      "Rancangan skema database & API Integration Blueprint",
      "Penyusunan wireframe/prototype aplikasi low-code",
      "Pendampingan pemilihan vendor / tim eksekutor"
    ],
    waMessage: "Halo Alex Morgan, saya tertarik dengan Paket 2: Arsitektur Sistem & Spesifikasi Teknis."
  }
];