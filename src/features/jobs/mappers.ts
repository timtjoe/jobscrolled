import type {
  JobContract,
  ArbeitNowItem,
  RiseItem,
  JobicyItem,
  RemoteOKItem,
  HNItem,
} from "@/types/jobs";

/**
 * Private helper to determine remote status based on available text
 */
const checkRemote = (location: string = "", text: string = ""): boolean => {
  const checkString = `${location} ${text}`.toLowerCase();
  return checkString.includes("remote") || checkString.includes("anywhere");
};

export const Mappers = {
  mapArbeitNow: (item: ArbeitNowItem): JobContract => ({
    id: item.slug,
    title: item.title,
    company: item.company_name,
    location: item.location,
    description: item.description,
    url: item.url,
    type: item.job_types,
    postedAt: new Date(item.created_at * 1000).toISOString(),
    source: "ArbeitNow",
    isRemote: checkRemote(item.location, item.description),
  }),

  mapRise: (item: RiseItem): JobContract => ({
    id: item._id,
    title: item.title,
    company: item.owner.companyName,
    location: item.locationAddress,
    description: item.descriptionBreakdown.oneSentenceJobSummary,
    url: item.url,
    salary: {
      min: item.descriptionBreakdown.salaryRangeMinYearly,
      max: item.descriptionBreakdown.salaryRangeMaxYearly,
      currency: "USD", // Explicitly added to match unified type
    },
    type: [item.type, item.descriptionBreakdown.employmentType],
    postedAt: item.createdAt, // Rise typically provides ISO
    logo: item.owner.photo,
    source: "Rise",
    isRemote: checkRemote(
      item.locationAddress,
      item.descriptionBreakdown.oneSentenceJobSummary,
    ),
  }),

  mapJobicy: (item: JobicyItem): JobContract => ({
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
    isRemote: checkRemote(item.jobGeo, item.jobDescription),
  }),

  mapRemoteOK: (item: RemoteOKItem): JobContract => ({
    id: item.id,
    title: item.position,
    company: item.company,
    location: item.location || "Remote",
    description: item.description,
    url: item.url,
    salary: item.salary_min
      ? {
          min: item.salary_min,
          max: item.salary_max,
          currency: "USD",
        }
      : undefined,
    type: item.tags,
    postedAt: item.date,
    logo: item.company_logo,
    source: "RemoteOK",
    isRemote: true,
  }),

  mapHackerNews: (item: HNItem): JobContract => {
    const { title: rawTitle = "", text: rawText = "", url, id, time } = item;

    // Split on common HN patterns: "Company (YC S21) Is hiring Position" or "Company: Position"
    const [company = "Hacker News", position = rawTitle] = rawTitle.split(
      / is hiring | is looking for |: /i,
    );

    const isRemote = /remote/i.test(rawText + rawTitle);

    return {
      id: `hn-${id}`,
      title: (position || rawTitle).replace(/<[^>]*>/g, "").trim(),
      company: company.trim() || "Hacker News",
      location: isRemote ? "Remote" : "See Description",
      description: rawText || "View on Hacker News for details",
      url: url ?? `https://news.ycombinator.com/item?id=${id}`,
      postedAt: new Date(time * 1000).toISOString(),
      source: "Hacker News",
      isRemote,
    };
  },
};
