import Web3Connectors from "../Web3Connector";
import styled from "styled-components";
import { useTheme } from "../../theme";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const NavBar: React.FC = () => {
  const { colorMode, setColorMode } = useTheme();
  return (
    <NavBarContainer>
      <img src="/logo.png" alt="logo" />
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
