import { ReactNode, useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import styled from "styled-components";
import { Colors } from "uniswapeasy";
import useClickOutside from "./useClickOutside";

//scrollbar styling
const SideBarContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: ${({ $isOpen }) => ($isOpen ? "20px" : "20px 0px")};
  box-sizing: border-box;
  align-items: start;
  justify-content: flex-start;
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? "300px" : "0px")};
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.primaryText};

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

const CollapsibleTitle = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 8px;
  gap: 8px
  box-sizing: border-box;
  background-color: transparent;
  appearance: none;
  border: none;
  color: ${({ theme }) => theme.primaryText};
  border: none;
  cursor: pointer;
`;

const CollapsibleChild = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

const CollapsibleSection = ({ title, children }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <CollapsibleTitle onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? "-" : "+"}
      </CollapsibleTitle>
      {isOpen && <CollapsibleChild>{children}</CollapsibleChild>}
    </div>
  );
};

const TextInput = styled(HexColorInput)`
  padding: 4px 8px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 4px;
`;

const ColorInput = styled.div<{ $bgColor?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.lightBorder};
  padding: 0;
  -webkit-appearance: none;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor};

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ThemeEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ColorInputDeferred = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popover = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(popover, close);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputWrapper>
        <TextInput color={color} onChange={onChange} />
        <ColorInput
          $bgColor={color}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </InputWrapper>
      {isOpen && (
        <div ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

const ThemeEditor = ({
  theme,
  setTheme,
}: {
  theme: Colors;
  setTheme: (theme: Colors) => void;
}) => {
  const handleColorChange = (path: string[], color: string) => {
    let newTheme: Colors = { ...theme };
    path.reduce((acc: any, part: string, index: number) => {
      if (index === path.length - 1) {
        acc[part] = color;
        return color;
      }
      return acc[part];
    }, newTheme);
    setTheme(newTheme);
  };

  const createInputComponents = (
    obj: any,
    path: string[] = []
  ): JSX.Element[] => {
    return Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <CollapsibleSection key={path.concat(key).join(".")} title={key}>
            {createInputComponents(obj[key], path.concat(key))}
          </CollapsibleSection>
        );
      }
      return (
        <InputContainer key={path.join(".") + "." + key}>
          <label>{key}</label>
          <ColorInputDeferred
            color={obj[key]}
            onChange={(color) => handleColorChange(path.concat(key), color)}
          />
        </InputContainer>
      );
    });
  };

  return (
    <ThemeEditorContainer>{createInputComponents(theme)}</ThemeEditorContainer>
  );
};

const SideBar = ({
  isOpen,
  theme,
  setTheme,
}: {
  isOpen: boolean;
  theme: Colors;
  setTheme: (theme: Colors) => void;
}) => {
  return (
    <SideBarContainer $isOpen={isOpen}>
      <ThemeEditor theme={theme} setTheme={setTheme} />
    </SideBarContainer>
  );
};

export default SideBar;
