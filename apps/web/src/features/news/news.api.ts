export class NewsApiClient {
  // Mock data - realistic job market news (Feb 2026)
  private mockJobspikrData = {
    insights: [
      {
        title: "Tech Hiring Slows 15% in Q1 2026",
        source: "JobsPikr Analytics",
        description: "Software engineering roles see sharp decline across US tech hubs amid economic uncertainty.",
        publishedAt: "2026-02-10T09:00:00Z",
        url: "https://jobspikr.com/insights/tech-hiring-2026",
      },
      {
        title: "AI/ML Roles Surge 40% YOY Despite Layoffs",
        source: "JobsPikr Analytics", 
        description: "Machine learning specialists remain in high demand as companies pivot to AI-first strategies.",
        publishedAt: "2026-02-12T14:30:00Z",
        url: "https://jobspikr.com/insights/ai-demand-2026",
      }
    ]
  };

  private mockLinkupData = {
    market_data: [
      {
        title: "Remote Work Jobs Up 25% in Healthcare",
        source: "LinkUp Market Intel",
        description: "Healthcare providers aggressively hiring remote nursing and admin roles nationwide.",
        publishedAt: "2026-02-14T08:15:00Z", 
        url: "https://linkup.com/market/healthcare-remote",
      },
      {
        title: "Finance Sector Sees 12% Hiring Recovery",
        source: "LinkUp Market Intel",
        description: "Wall Street firms ramp up hiring after 18-month slowdown in fintech and banking.",
        publishedAt: "2026-02-13T16:45:00Z",
        url: "https://linkup.com/market/finance-recovery",
      },
      {
        title: "Entry-Level Marketing Jobs Disappear 30%",
        source: "LinkUp Market Intel",
        description: "Junior marketing roles replaced by AI tools and senior hires with proven ROI.",
        publishedAt: "2026-02-11T11:20:00Z",
        url: "https://linkup.com/market/marketing-junior",
      }
    ]
  };

  private mockCustomData = {
    articles: [
      {
        title: "Trump's Tech Visa Policy Shakes H1B Market",
        source: "JobNews Daily",
        description: "New administration prioritizes American workers, causing uncertainty for 85K tech visas.",
        publishedAt: "2026-02-15T10:00:00Z",
        url: "https://jobnews.daily/trump-tech-visa",
        category: 'custom'
      },
      {
        title: "Big Tech Layoffs Hit 25K in January",
        source: "JobNews Daily",
        description: "Meta, Amazon, Google cut 25K roles as AI automation accelerates across Silicon Valley.",
        publishedAt: "2026-02-14T07:30:00Z", 
        url: "https://jobnews.daily/bigtech-layoffs",
      }
    ]
  };

  async fetchJobspikrNews(): Promise<any> {
    return this.mockJobspikrData;
  }

  async fetchLinkupNews(): Promise<any> {
    return this.mockLinkupData;
  }

  async fetchCustomNews(): Promise<any> {
    return this.mockCustomData;
  }

  async getAllNews(filters: { limit?: number } = {}): Promise<any> {
    const [jobspikr, linkup, custom] = await Promise.all([
      this.fetchJobspikrNews(),
      this.fetchLinkupNews(),
      this.fetchCustomNews()
    ]);

    return {
      jobspikr: jobspikr.insights,
      linkup: linkup.market_data,
      custom: custom.articles
    };
  }
}

export const newsApiClient = new NewsApiClient();
