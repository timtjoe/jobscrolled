// job.utils.ts
export const cleanAndExtractHashtags = (html: string): string[] => {
  let cleanText = html
    .replace(/Please mention the word.*$/i, '')
    .replace(/#\w+=/g, '')
    .replace(/RNDEuNTcuOTUuNjM=/g, '')
    .replace(/\u00e2|\u00f0/g, '')
    .replace(/style="[^"]*"/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const hashtags = cleanText.match(/#[\w]+/gi) || [];
  return [...new Set(hashtags)].slice(0, 3);
};

export const cleanFirstLine = (html: string): string => {
  const cleanText = html
    .replace(/Please mention the word.*$/i, '')
    .replace(/#\w+=/g, '')
    .replace(/\u00e2|\u00f0/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleanText.split('.')[0] + (cleanText.includes('.') ? '.' : '');
};


export const getLogoTheme = (name: string = "") => {
  // Your brand colors from RootStyles
  const palette = [
    "var(--bg-primary)",
    "var(--bg-navy)",
    "var(--text-lavender)",
    "var(--border-light)",
    "var(--bg-accent)",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash % palette.length);
  return palette[index];
};

export const formatCompactNumber = (number?: number) => {
  if (number === undefined || number === null) return "";
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
};