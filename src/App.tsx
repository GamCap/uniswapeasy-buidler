import styled from "styled-components";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { ReactNode, useState } from "react";
import { UniswapEasy, defaultTheme, orangeDark, Colors } from "uniswapeasy";
import { poolKeys, hookInfos, currencyIconMap } from "./constants";
import { useActiveProvider } from "./connectors";

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

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const provider = useActiveProvider();

  const [themeColors, setThemeColors] = useState<Colors>(orangeDark);

  return (
    <AppContainer>
      <NavBar />
      <AppBody>
        <SideBar
          isOpen={isOpen}
          theme={themeColors}
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
