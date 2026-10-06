export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  category: string;
  readTime: string;
  date: string;
  problemStatement: string;
  solutionSummary: string;
  toolsUsed: string[];
  impactMetrics: Metric[];
  scope: string;
  processSteps: string[];
  featured: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  content: string;
}

export interface Service {
  id: string;
  packageCode: string;
  title: string;
  tier: string;
  duration: string;
  idealFor: string;
  scope: string[];
  waMessage: string;
}

export interface SiteSettings {
  analystName: string;
  headlineTitle: string;
  subHeadline: string;
  waNumber: string;
  showMetrics: boolean;
  showTestimonials: boolean;
  showBanner: boolean;
  bannerText: string;
}