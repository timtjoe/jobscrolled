// features/jobs/job.types.ts

// --- API Response Types ---
export interface ArbeitNowItem {
  slug: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  url: string;
  job_types?: string[];
  created_at: number;
}

export interface RiseItem {
  _id: string;
  title: string;
  owner: { companyName: string; photo: string };
  locationAddress: string;
  descriptionBreakdown: { oneSentenceJobSummary: string; salaryRangeMinYearly: number; salaryRangeMaxYearly: number; employmentType: string };
  url: string;
  type: string;
  createdAt: string;
}

export interface JobicyItem {
  id: number;
  jobTitle: string;
  companyName: string;
  jobGeo: string;
  jobDescription: string;
  url: string;
  jobType: string[];
  pubDate: string;
  companyLogo: string;
}

export interface RemoteOKItem {
  id: string;
  position: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary_min?: number;
  salary_max?: number;
  tags: string[];
  date: string;
  company_logo: string;
}

export interface HNItem {
  id: number;
  title: string;
  text?: string;
  url?: string;
  time: number;
}

// --- Internal App Types ---
export interface BaseJob {
  id: string;
  title: string;
  company: string;
  url: string;
  postedAt: string;
  source: string;
}

export type JobContract = BaseJob & {
  location: string;
  description: string;
  isRemote: boolean;
  logo?: string;
  salary?: { min?: number; max?: number; currency: string };
  type?: string | string[];
};

export interface JobFilters {
  search: string;
  sortBy: 'date' | 'title';
  type: 'all' | 'remote' | 'onsite';
  page: number;
  pageSize: number;
  source?: string; // Optional field for targeted feeds like HN
}
export const jobKeys = {
  all: ['jobs'] as const,
  list: () => [...jobKeys.all, 'list'] as const,
};