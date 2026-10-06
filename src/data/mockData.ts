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
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Mengapa Mayoritas Proyek Otomasi Bisnis UMKM Gagal",
    slug: "mengapa-otomasi-bisnis-gagal",
    category: "Process Engineering",
    readTime: "6 menit baca",
    publishDate: "28 Sep 2026",
    excerpt: "Mengotomatiskan proses yang berantakan hanya akan mempercepat kekacauan.",
    content: "Banyak organisasi terburu-buru membeli platform low-code..."
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
      "Laporan audit format PDF",
      "1x Sesi diskusi de-brief strategi eksekutif (90 menit)"
    ],
    waMessage: "Halo Alex Morgan, saya tertarik dengan Paket 1: Diagnostic & Audit Operasional."
  }
];