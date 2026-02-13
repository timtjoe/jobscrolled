// features/jobs/index.ts

// Export the Main UI Component
export { JobList } from "./components/JobList";

// Export the Hook for custom usage elsewhere
export { useJobs } from "./useJobs";

// Export Types so the rest of the app knows the Job shape
export type { JobContract, JobFilters } from "./job.types";
