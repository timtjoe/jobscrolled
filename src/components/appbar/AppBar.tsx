import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { jobFiltersAtom } from "@/features/jobs/job.stores";
import logo from "/logo.svg";
import { NavLink } from "react-router";

export const AppBar: React.FC = () => {
  const [filters, setFilters] = useAtom(jobFiltersAtom);

  return (
    <Header>
        <LogoGroup>
          <NavLink to={"/"}>
            <Logo src={logo} alt="JobScrolled" />
          </NavLink>
        </LogoGroup>

        <Search>
          <Input
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
        </Search>
    </Header>
  );
};

// === STYLED COMPONENTS

const Header = styled.header`
  position: sticky;
  top: 0;
  background: var(--bg-white);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
  height: auto;
  display: flex;
  align-items: center;
  gap: 0;
  border: solid red;
`;

const LogoGroup = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 48px;
`;

const Search = styled.form`
  flex: 1;
  height: 48px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 var(--spacing-md);
  border: 1px solid var(--border-subtle);
  border-radius: 0;
  background: var(--bg-grey);
  font-size: var(--font-md);
  color: var(--text-black);

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    outline: thin solid var(--border-subtle);
  }
`;
