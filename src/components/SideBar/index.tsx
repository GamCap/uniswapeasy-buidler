import { ReactNode, useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import styled from "styled-components";
import { Colors } from "uniswapeasy";
import useClickOutside from "./useClickOutside";
import { OriginalName } from "../../App";

//shadow on right side of sidebar
const SideBarContainer = styled.div<{ $isOpen: boolean }>`
  white-space: nowrap;
  z-index: 2;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  padding: ${({ $isOpen }) =>
    $isOpen ? "20px 0 20px 20px" : "20px 0 20px 0px"};
  box-sizing: border-box;
  align-items: start;
  justify-content: space-between;
  height: 100%;
  box-shadow: ${({ $isOpen, theme }) =>
    $isOpen ? `10px 0 10px 0 ${theme.shadow}` : "none"};
  width: ${({ $isOpen }) => ($isOpen ? "300px" : "0px")};
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.primaryText};
`;
const ScrollableArea = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  gap: 16px;
  padding-right: 20px;
  scrollbar-gutter: stable;
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
  padding: 0 0 8px 0;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
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

const TextInput = styled(HexColorInput)`
  width: 100%;
  padding: 4px 8px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 4px;
`;

const ColorInput = styled.div<{ $bgColor?: string }>`
  flex: 1 0 auto;
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
  box-sizing: border-box;
  position: relative;
  flex-direction: row;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

const ThemeEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const StyledSelect = styled.select`
  padding: 4px 8px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 4px;

  &:focus {
    outline: none;
  }
  option {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primaryText};
  }
`;
const ThemeSelector = ({
  theme,
  themeList,
  setTheme,
}: {
  theme: Colors;
  themeList: { name: string; theme: Colors; originalName: OriginalName }[];
  setTheme: (theme: Colors) => void;
}) => {
  const handleThemeChange = (newTheme: Colors) => {
    setTheme(newTheme);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <label
        style={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        Initial Theme
      </label>
      <StyledSelect
        onChange={(e) =>
          handleThemeChange(themeList[parseInt(e.target.value)].theme)
        }
      >
        {themeList.map((t, i) => (
          <option key={i} value={i}>
            {t.name}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

const SideBar = ({
  isOpen,
  openCodeBlock,
  themeList,
  theme,
  setTheme,
}: {
  isOpen: boolean;
  openCodeBlock: () => void;
  themeList: { name: string; theme: Colors; originalName: OriginalName }[];
  theme: Colors;
  setTheme: (theme: Colors) => void;
}) => {
  return (
    <SideBarContainer $isOpen={isOpen}>
      <ScrollableArea>
        <ThemeSelector
          theme={theme}
          themeList={themeList}
          setTheme={setTheme}
        />
        <ThemeEditor theme={theme} setTheme={setTheme} />
      </ScrollableArea>
      <div
        style={{
          display: "flex",
          boxSizing: "border-box",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "20px",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "transparent",
            border: "1px solid",
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
            cursor: "pointer",
          }}
          onClick={openCodeBlock}
        >
          Open Code Block
        </button>
      </div>
    </SideBarContainer>
  );
};

export default SideBar;
