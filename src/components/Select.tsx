import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Icons } from "@/components/icons"; // Using your icon collection

interface Option {
  id: string | number;
  label: string;
}

interface IProps {
  data: Option[];
  placeholder?: string;
  onSelect: (selected: Option | null) => void;
  selected?: Option | null;
}

export const Select: React.FC<IProps> = ({
  data,
  placeholder = "Select",
  onSelect,
  selected = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    // If clicking the already selected item, we can toggle it off or just close
    onSelect(option.id === selected?.id ? null : option);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <Trigger onClick={() => setIsOpen(!isOpen)} $active={!!selected}>
        <Label>{selected ? selected.label : placeholder}</Label>
        <Caret $isOpen={isOpen}>
          <Icons.chevron_down size={12} />
        </Caret>
      </Trigger>

      {isOpen && (
        <Dropdown>
          <List>
            {data.map((item) => {
              const isSelected = selected?.id === item.id;
              return (
                <OptionItem
                  key={item.id}
                  onClick={() => handleOptionClick(item)}
                  $isSelected={isSelected}
                >
                  <OptionLabel>{item.label}</OptionLabel>
                  {isSelected && (
                    <Icons.check size={14} color="var(--bg-primary)" />
                  )}
                </OptionItem>
              );
            })}
          </List>
        </Dropdown>
      )}
    </Container>
  );
};

/* --- STYLES --- */

const Container = styled.div`
  position: relative;
  width: fit-content; /* Not full width anymore */
  min-width: 140px;
  font-size: var(--font-sm);
`;

const Trigger = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  padding: 8px 16px; /* Small button size */
  background: none;
  border-radius: var(--radius-lg); /* Rounded pill style */
  border: thin solid var(--border-dim);
  cursor: pointer;
  font-weight: 700; /* Bolder text */
  color: ${(p) => (p.$active ? "var(--text-white)" : "var(--text-sub)")};
`;

const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Caret = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform: rotate(${(p) => (p.$isOpen ? "180deg" : "0deg")});
  color: var(--text-muted);
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0);
  left: 0;
  min-width: 100%;
  background: var(--bg-black);
  border-radius: var(--radius-sm);
  box-shadow: 0 5px 24px rgba(68, 68, 68, 0.4);
  z-index: 100;
  overflow: hidden;
`;

const List = styled.div`
  max-height: 250px;
  overflow-y: auto;
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--spacing-sm);
  cursor: pointer;
`;

const OptionLabel = styled.span`
  color: var(--text-sub);
`;
