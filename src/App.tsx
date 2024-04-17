import styled from "styled-components";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useMemo, useState } from "react";
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
import Modal from "./components/Modal";
import { CopyBlock, dracula } from "react-code-blocks";

import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { Web3Provider } from "@ethersproject/providers";

// 1. Get projectId
const projectId = "c6c9bacd35afa3eb9e6cccf6d8464395";

// 2. Set chains
const sepolia = {
  chainId: 11155111,
  name: "Ethereum Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://sepolia.drpc.org",
};

// 3. Create a metadata object
const metadata = {
  name: "UniswapEasy",
  description: "UniswapEasy Widget Builder",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

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
  z-index: 3;
  box-shadow: ${({ theme }) => `0 0 10px 10px ${theme.shadow}`};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 0;
  width: 20px;
  height: 40px;
  background-color: ${({ theme }) => theme.background};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  color: ${({ theme }) => theme.secondaryText};
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

  const { walletProvider: provider } = useWeb3ModalProvider();
  const parsedProvider = useMemo(() => {
    if (provider) {
      return new Web3Provider(provider, "any");
    }
    return undefined;
  }, [provider]);

  const [themeColors, setThemeColors] = useState<Colors>(orangeDark);
  const [isCodeBlockOpen, setIsCodeBlockOpen] = useState(false);
  const themes: { name: string; theme: Colors; originalName: OriginalName }[] =
    [
      { name: "Orange Dark", theme: orangeDark, originalName: "orangeDark" },
      { name: "Orange Light", theme: orangeLight, originalName: "orangeLight" },
      { name: "Teal Dark", theme: tealDark, originalName: "tealDark" },
      { name: "Teal Light", theme: tealLight, originalName: "tealLight" },
    ];

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
              provider={parsedProvider}
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
