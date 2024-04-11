import styled from "styled-components";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { ReactNode, useState } from "react";
import {
  UniswapEasy,
  defaultTheme,
  orangeDark,
  Colors,
  orangeLight,
  tealDark,
  tealLight,
} from "uniswapeasy";
import { poolKeys, hookInfos, currencyIconMap } from "./constants";
import { useActiveProvider } from "./connectors";
import Modal from "./components/Modal";
import { CopyBlock, dracula } from "react-code-blocks";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const AppBody = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const WidgetContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SideBarHandle = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 0;
  width: 20px;
  height: 40px;
  background-color: transparent;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.lightBorder};
`;

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding: 20px;

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

export type OriginalName =
  | "orangeDark"
  | "orangeLight"
  | "tealDark"
  | "tealLight";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const provider = useActiveProvider();

  const [themeColors, setThemeColors] = useState<Colors>(orangeDark);
  const [initialTheme, setInitialTheme] = useState<OriginalName>("orangeDark");
  const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(false);
  const themes: { name: string; theme: Colors; originalName: OriginalName }[] =
    [
      { name: "Orange Dark", theme: orangeDark, originalName: "orangeDark" },
      { name: "Orange Light", theme: orangeLight, originalName: "orangeLight" },
      { name: "Teal Dark", theme: tealDark, originalName: "tealDark" },
      { name: "Teal Light", theme: tealLight, originalName: "tealLight" },
    ];
  const handleSetInitialTheme = (theme: Colors, originalName: OriginalName) => {
    setInitialTheme(originalName);
    setThemeColors(theme);
  };

  return (
    <AppContainer>
      <Modal
        isOpen={isCodeBlockOpen}
        onClose={() => setIsCodeBlockOpen(false)}
        breakpoints={[
          { breakpoint: "768px", width: "80%" },
          { breakpoint: "1024px", width: "60%" },
        ]}
      >
        <CopyBlock
          text={`
            import { UniswapEasy, defaultTheme, type Colors } from "uniswapeasy";
            import {poolKeys, hookInfos, currencyIconMap} from "./constants"; // Replace this with your own constants
            import {useActiveProvider} from "./connectors"; // Replace this with your own provider hook

            export default function App() {
              const myColors : Colors = ${JSON.stringify(themeColors, null, 2)
                .split("\n")
                .map((line, index) =>
                  index === 0 ? line : `               ${line}`
                )
                .join("\n")};
              const provider = useActiveProvider(); // Replace this with your own provider hook
              return (
                <UniswapEasy
                  theme={{
                    ...defaultTheme,
                    ...myColors,
                  }}
                  provider={provider}
                  poolInfos={poolKeys}
                  hookInfos={hookInfos}
                  currencyIconMap={currencyIconMap}
                />
              );

            `}
          language="tsx"
          theme={dracula}
        />
      </Modal>
      <NavBar />
      <AppBody>
        <SideBar
          isOpen={isOpen}
          openCodeBlock={() => setIsCodeBlockOpen(true)}
          theme={themeColors}
          themeList={themes}
          setInitialTheme={handleSetInitialTheme}
          setTheme={setThemeColors}
        />
        <WidgetContainer>
          <SideBarHandle onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "<" : ">"}
          </SideBarHandle>
          <WidgetWrapper>
            <UniswapEasy
              theme={{
                ...defaultTheme,
                ...themeColors,
              }}
              provider={provider}
              poolInfos={poolKeys}
              hookInfos={hookInfos}
              currencyIconMap={currencyIconMap}
            />
          </WidgetWrapper>
        </WidgetContainer>
      </AppBody>
    </AppContainer>
  );
}

export default App;
