import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Option {
  id: string | number;
  label: string;
}

interface IProps {
  data: Option[];
  placeholder?: string;
  onApply: (selected: Option[]) => void;
  initialSelected?: Option[];
}

export const MultiSelect: React.FC<IProps> = ({
  data,
  placeholder = "Select items",
  onApply,
  initialSelected = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSelected, setPendingSelected] = useState<Option[]>(initialSelected);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: Option) => {
    setPendingSelected((prev) =>
      prev.find((o) => o.id === option.id)
        ? prev.filter((o) => o.id !== option.id)
        : [...prev, option]
    );
  };

  const handleReset = () => setPendingSelected([]);
  
  const handleApply = () => {
    onApply(pendingSelected);
    setIsOpen(false);
  };

  return (
    <Container ref={containerRef}>
      <Trigger onClick={() => setIsOpen(!isOpen)}>
        <Label>
          {initialSelected.length > 0 
            ? `${initialSelected.length} Selected` 
            : placeholder}
        </Label>
        <Caret $isOpen={isOpen}>▼</Caret>
      </Trigger>

      {isOpen && (
        <Dropdown>
          <List>
            {data.map((item) => (
              <OptionItem key={item.id} onClick={() => toggleOption(item)}>
                <Checkbox 
                  type="checkbox" 
                  readOnly 
                  checked={!!pendingSelected.find((o) => o.id === item.id)} 
                />
                <OptionLabel>{item.label}</OptionLabel>
              </OptionItem>
            ))}
          </List>
          
          <Footer>
            <ActionBtn $variant="secondary" onClick={handleReset}>Reset</ActionBtn>
            <ActionBtn $variant="primary" onClick={handleApply}>Apply</ActionBtn>
          </Footer>
        </Dropdown>
      )}
    </Container>
  );
};

/* --- STYLES --- */

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
  color: var(--text-main);
  font-size: 14px;
`;

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--bg-dark);
  border: 1px solid var(--border-main);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: var(--border-light); }
`;

const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Caret = styled.span<{ $isOpen: boolean }>`
  font-size: 10px;
  transition: transform 0.2s;
  transform: rotate(${p => p.$isOpen ? '180deg' : '0deg'});
  color: var(--text-muted);
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--bg-dark);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 100;
  overflow: hidden;
`;

const List = styled.div`
  max-height: 250px;
  overflow-y: auto;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  cursor: pointer;
  
  &:hover { background: var(--bg-accent); }
`;

const Checkbox = styled.input`
  margin-right: 12px;
  accent-color: var(--bg-primary);
  cursor: pointer;
`;

const OptionLabel = styled.span`
  color: var(--text-sub);
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--border-dim);
  background: var(--bg-black);
`;

const ActionBtn = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  
  background: ${p => p.$variant === 'primary' ? 'var(--bg-primary)' : 'transparent'};
  color: ${p => p.$variant === 'primary' ? 'var(--text-white)' : 'var(--text-muted)'};
  border: ${p => p.$variant === 'secondary' ? '1px solid var(--border-main)' : 'none'};

  &:hover { opacity: 0.9; }
`;