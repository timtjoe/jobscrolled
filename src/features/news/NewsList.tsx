import React from 'react';
import { useQueryClient } from "@tanstack/react-query"; // ✅ Native QueryClient
import { NewsCard } from './NewsCard';
import { useNews } from './news.hooks';
import type { NewsArticle } from './news.types';
import styled from 'styled-components';

export const NewsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useNews(); // ✅ Native TanStack Query

  const openArticle = (article: NewsArticle) => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  // ✅ TanStack Query handles caching + no re-fetching automatically
  if (isLoading || !data?.articles?.length) return null;
  if (error) return null;

  return (
    <Container>
      <Header>
        <Title>Job Market News</Title>
        <Count>{data.total} articles</Count>
      </Header>
      
      <Grid>
        {data.articles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            handlers={{ onArticleClick: openArticle }}
          />
        ))}
      </Grid>
    </Container>
  );
};



// Styles unchanged
const Container = styled.div` padding: var(--spacing-xl) 0; `;
const Grid = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: var(--spacing-md); 
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
`;
const Title = styled.h2`
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--text-black);
`;
const Count = styled.span`
  font-size: var(--font-xs);
  color: var(--text-grey);
`;
