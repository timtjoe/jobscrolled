import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { jobFiltersAtom } from "@/features/jobs/job.stores";
import { ErrorBoundary, TechnicalError } from "@/components/errors";
import logo from "/logo.svg";

const FilterControls: React.FC = () => {
  const [filters, setFilters] = useAtom(jobFiltersAtom);

  const handleType = (type: typeof filters.type) =>
    setFilters((prev) => ({ ...prev, type, page: 1 }));

  // const forceerror = (undefined as any).crash()

  return (
    <FilterGroup>
      {(["all", "remote", "onsite"] as const).map((t) => (
        <FilterBtn
          key={t}
          $active={filters.type === t}
          onClick={() => handleType(t)}
        >
          {t}
        </FilterBtn>
      ))}
    </FilterGroup>
  );
};

export const AppBar: React.FC = () => {
  const [filters, setFilters] = useAtom(jobFiltersAtom);

  // Function to reset the atom state if a crash occurs
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <Header>
      <NavContainer>
        <LogoGroup>
          <Logo src={logo} alt="JobScrolled" />
        </LogoGroup>

        <SearchWrapper>
          <SearchInput
            placeholder="Search roles..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
        </SearchWrapper>

        <ErrorBoundary
          fallback={
            <InlineErrorWrapper>
              <TechnicalError
                message="Filter error"
                onRetry={handleReset}
                autoRetrySeconds={5}
              />
            </InlineErrorWrapper>
          }
        >
          <FilterControls />
        </ErrorBoundary>
      </NavContainer>
    </Header>
  );
};

// --- Styled Components ---

const Header = styled.header`
  position: sticky;
  top: 0;
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  width: 100%;
`;

const NavContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-lg);

  @media (max-width: 600px) {
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
  }
`;

const InlineErrorWrapper = styled.div`
  /* Overriding TechnicalError's default large container for the navbar */
  div {
    min-height: auto;
    padding: 0;
  }
  p {
    font-size: var(--font-xxs);
  }
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  @media (max-width: 600px) {
    order: 1;
  }
`;

const Logo = styled.img`
  height: 28px;
`;

const BrandName = styled.span`
  font-weight: 700;
  font-size: var(--font-md);
  color: var(--text-black);
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 350px;
  margin: 0 var(--spacing-xl);
  @media (max-width: 600px) {
    order: 2;
    width: 100%;
    margin: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: var(--spacing-sm) 0;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  background: transparent;
  font-size: var(--font-sm);
  &:focus {
    border-color: var(--text-black);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  @media (max-width: 600px) {
    order: 3;
    width: 100%;
    justify-content: center;
    border-top: 1px solid var(--border-light);
    padding-top: var(--spacing-md);
  }
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  font-size: var(--font-xxs);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${(p) => (p.$active ? "var(--text-black)" : "var(--text-grey)")};
  border-bottom: 2px solid
    ${(p) => (p.$active ? "var(--text-black)" : "transparent")};
  padding: var(--spacing-xs) 0;
`;
