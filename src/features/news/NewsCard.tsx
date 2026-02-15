import React from 'react';
import styled from 'styled-components';
import type { NewsArticle } from './news.types';

interface NewsCardProps {
  article: NewsArticle;
  handlers: {
    onArticleClick: (article: NewsArticle) => void;
  };
}

export const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  handlers 
}) => {
  const handleClick = () => handlers.onArticleClick(article);

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return 'Recent';
    
    const [, year, month, day, hour, minute] = match;
    const hour12 = parseInt(hour!, 10) % 12 || 12; // ✅ parseInt accepts string | undefined
    const ampm = parseInt(hour!, 10) >= 12 ? 'PM' : 'AM';
    
    return `${month}/${day}/${year} · ${hour12}:${minute} ${ampm}`;
  };

  return (
    <NewsItem onClick={handleClick}>
      <Title>{article.title}</Title>
      <Meta>
        <Source>{article.source}</Source>
        <Date>{formatDate(article.publishedAt)}</Date>
      </Meta>
      {article.description && <Description>{article.description}</Description>}
    </NewsItem>
  );
};

// Rest of styles unchanged...
const NewsItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  line-height: 1.4;
  color: #000;
`;

const Title = styled.a`
  display: block;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 4px;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #828282;
  margin-bottom: 4px;
`;

const Source = styled.span`
  margin-right: 12px;
`;

const Date = styled.span``;

const Description = styled.div`
  font-size: 12px;
  color: #36393d;
  margin-top: 4px;
  line-height: 1.4;
`;
