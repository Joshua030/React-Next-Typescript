import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

// interface Position {
//   x: number;
//   y: number;
// }

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: absolute;
  z-index: 9999;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${(p) => p.position.x}px;
  top: ${(p) => p.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContextType {
  open: (id: number) => void;
  close: () => void;
  openID: number | null;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function useMenus() {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("useMenus must be used within a <Menus /> provider");
  }
  return context;
}

function Menus({ children }: { children: React.ReactNode }) {
  const [openID, setOpenID] = useState<number | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const close = () => setOpenID(null);
  const open = setOpenID;

  return <MenusContext.Provider value={{ open, close, openID, position, setPosition }}>{children}</MenusContext.Provider>;
}

function Toggle({ id }: { id: number }) {
  const { open, close, openID, setPosition } = useMenus();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();

    // position below the button, aligned to its left
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 8,
    });

    openID === null || openID !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: { id: number; children: React.ReactNode }) {
  const { openID, position, close } = useMenus(); // destructured, guaranteed non-null
  const ref = useOutsideClick<HTMLUListElement>(close);
  if (openID !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { close } = useMenus();
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
