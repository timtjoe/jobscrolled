import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { withJob } from "@/store/job.store";
import { Icons } from "@/components/icons";
import { Filters } from "./Filters";
import logo_lg from "/logo.svg";
import logo_sm from "/logo_sm.svg";
import { NavLink } from "react-router";

export const Sidebar: React.FC = () => {
  const [filters, setFilters] = useAtom(withJob.filters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  return (
    <Container>
      <HeaderGroup>
        <Logo>
          <NavLink to={"/"}>
            <img src={logo_sm} alt="Logo" className="mobile-logo" />
            <img src={logo_lg} alt="Company Logo" className="desktop-logo" />
          </NavLink>
        </Logo>

        <SearchBox>
          <Icons.search size={14} />
          <SearchInput
            placeholder="Search roles..."
            value={filters.search || ""}
            onChange={handleSearch}
          />
        </SearchBox>
      </HeaderGroup>

      <Filters />
    </Container>
  );
};

/* --- STYLES --- */

const Container = styled.aside`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md);
  height: fit-content;
  border-bottom: thin solid var(--border-dim);
  background: var(--bg-overlay);
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: var(--spacing-sm);
  }
`;

const HeaderGroup = styled.div`
  display: contents;
  padding: 0 var(--spacing-sm);
  padding-top: var(--spacing-sm);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-xs)
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  background: var(--bg-overlay);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);

  img {
    height: 100%;
    width: auto;
  }

  .mobile-logo {
    display: none;
  }
  .desktop-logo {
    display: block;
  }

  @media (max-width: 768px) {
    width: 58px;
    height: 58px;
    border-radius: var(--radius-lg);
    justify-content: center;
    padding: 6px;

    .mobile-logo {
      display: block;
      height: 100%;
    }
    .desktop-logo {
      display: none;
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-dark);
  padding: 0 var(--spacing-md);
  margin: 0 var(--spacing-xs);
  height: 48px;
  border-radius: var(--radius-lg);
  color: var(--text-muted);
  transition: background-color 0.2s ease;

  &:focus-within {
    background: var(--bg-accent);
    color: var(--text-white);
  }

  @media (max-width: 768px) {
    margin: 0;
    flex: 1;
    margin: 0;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-white);
  font-weight: 700;
  font-size: var(--font-sm);

  &::placeholder {
    color: var(--text-muted);
    font-weight: 500;
  }
`;
