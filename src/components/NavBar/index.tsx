import Web3Connectors from "../Web3Connector";
import styled from "styled-components";
import { useTheme } from "../../theme";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const NavBar: React.FC = () => {
  const { colorMode, setColorMode } = useTheme();
  return (
    <NavBarContainer>
      <LogoContainer>
        <Logo
          src="https://avatars.githubusercontent.com/u/99751077?s=200&v=4"
          alt="logo"
        />
        GamCap Labs
      </LogoContainer>

      <Web3Connectors />
      <button
        onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      >
        {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </NavBarContainer>
  );
};

export default NavBar;
