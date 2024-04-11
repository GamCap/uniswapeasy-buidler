import Web3Connectors from "../Web3Connector";
import styled from "styled-components";
import { useTheme } from "../../theme";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.primaryText};
  font-size: 24px;
  & > p {
    margin: 0;
  }
`;

//invert the colors of the toggle
const Logo = styled.img<{ $colorMode?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  filter: ${({ $colorMode }) =>
    $colorMode === "dark" ? "invert(1)" : "invert(0)"};
`;

const ButtonContainer = styled.label`
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  input {
    display: none;
  }

  input + div {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    position: relative;
    box-shadow: inset 14px -14px 0 0 var(--color-toggle-dark, #000);
    transform: scale(1) rotate(-2deg);
    transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;
  }

  input + div::before {
    content: "";
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    left: 0;
    top: 0;
    transition: background 0.3s ease;
  }

  input + div::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--color-toggle-light, #eee),
      0 23px 0 var(--color-toggle-light, #eee),
      23px 0 0 var(--color-toggle-light, #eee),
      -23px 0 0 var(--color-toggle-light, #eee),
      15px 15px 0 var(--color-toggle-light, #eee),
      -15px 15px 0 var(--color-toggle-light, #eee),
      15px -15px 0 var(--color-toggle-light, #eee),
      -15px -15px 0 var(--color-toggle-light, #eee);
    transform: scale(0);
    transition: all 0.3s ease;
  }

  input:checked + div {
    box-shadow: inset 32px -32px 0 0 #fff;
    transform: scale(0.5) rotate(0deg);
    transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;
  }

  input:checked + div::before {
    background: var(--color-toggle-light, #eee);
    transition: background 0.3s ease 0.1s;
  }

  input:checked + div::after {
    transform: scale(1.5);
    transition: transform 0.5s ease 0.15s;
  }
`;

const NavBar: React.FC = () => {
  const { colorMode, setColorMode } = useTheme();
  return (
    <NavBarContainer>
      <LogoContainer>
        <Logo
          src="https://avatars.githubusercontent.com/u/99751077?s=200&v=4"
          alt="logo"
          $colorMode={colorMode}
        />
        <p>GamCap Labs</p>
      </LogoContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Web3Connectors />
        <ButtonContainer
          title={
            colorMode === "dark" ? "Activate light mode" : "Activate dark mode"
          }
          aria-label={
            colorMode === "dark" ? "Activate light mode" : "Activate dark mode"
          }
        >
          <input
            type="checkbox"
            defaultChecked={colorMode === "dark" ? true : false}
            onChange={() =>
              setColorMode(colorMode === "dark" ? "light" : "dark")
            }
          />
          <div />
        </ButtonContainer>
      </div>
    </NavBarContainer>
  );
};

export default NavBar;
