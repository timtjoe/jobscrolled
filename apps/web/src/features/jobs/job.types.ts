export interface JobContract {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary?: { min?: number; max?: number; currency: string };
  type: string[]; // e.g., ["Full-time", "Remote"]
  postedAt: string;
  logo?: string;
  source: 'ArbeitNow' | 'Rise' | 'Jobicy' | 'RemoteOK';
}

export interface JobFilters {
  search?: string;
  sortBy?: 'date' | 'title';
}

export const jobKeys = {
  all: ['jobs'] as const,
  list: () => [...jobKeys.all, 'list'] as const,
};

export interface JobCardProps {
  job: JobContract;
}
