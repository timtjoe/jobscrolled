import type { JobContract } from "./job.types";

export const Mappers = {
  mapArbeitNow: (item: any): JobContract => ({
    id: item.slug,
    title: item.title,
    company: item.company_name,
    location: item.location,
    description: item.description,
    url: item.url,
    type: item.job_types || [],
    postedAt: new Date(item.created_at * 1000).toISOString(),
    source: "ArbeitNow",
  }),

  mapRise: (item: any): JobContract => ({
    id: item._id,
    title: item.title,
    company: item.owner.companyName,
    location: item.locationAddress,
    description: item.descriptionBreakdown.oneSentenceJobSummary,
    url: item.url,
    salary: {
      min: item.descriptionBreakdown.salaryRangeMinYearly,
      max: item.descriptionBreakdown.salaryRangeMaxYearly,
      currency: "USD",
    },
    type: [item.type, item.descriptionBreakdown.employmentType],
    postedAt: item.createdAt,
    logo: item.owner.photo,
    source: "Rise",
  }),

  mapJobicy: (item: any): JobContract => ({
    id: String(item.id),
    title: item.jobTitle,
    company: item.companyName,
    location: item.jobGeo,
    description: item.jobDescription,
    url: item.url,
    type: item.jobType,
    postedAt: item.pubDate,
    logo: item.companyLogo,
    source: "Jobicy",
  }),

  mapRemoteOK: (item: any): JobContract => ({
    id: item.id,
    title: item.position,
    company: item.company,
    location: item.location || "Remote",
    description: item.description,
    url: item.url,
    salary: { min: item.salary_min, max: item.salary_max, currency: "USD" },
    type: item.tags,
    postedAt: item.date,
    logo: item.company_logo,
    source: "RemoteOK",
  }),
};
