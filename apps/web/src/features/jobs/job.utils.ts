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
