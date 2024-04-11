import { useRef, useEffect } from "react";
import { styled } from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  breakpoints?: { breakpoint: string; width: string }[];
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 1, 3, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: center;
  }
  z-index: 999;
`;

const Content = styled.div<{
  $breakpoints?: { breakpoint: string; width: string }[];
}>`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.lightBorder};
  width: 100%;
  min-height: 300px;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 24px;
  z-index: 1000;

  ${({ $breakpoints: breakpoints }) =>
    breakpoints &&
    breakpoints.map(
      (bp) => `
    @media (min-width: ${bp.breakpoint}) {
    width: ${bp.width};
    }
    `
    )}
`;

const ScrollableArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.darkBorder};
    border-radius: 32px;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  breakpoints,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Backdrop>
      <Content ref={modalContentRef} $breakpoints={breakpoints}>
        <ScrollableArea>{children}</ScrollableArea>
      </Content>
    </Backdrop>
  );
};

export default Modal;
