import styled from "styled-components";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useState } from "react";
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
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SideBarHandle = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: red;
`;

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <AppContainer>
      <NavBar />
      <AppBody>
        <SideBar isOpen={isOpen} />
        <WidgetContainer>
          <SideBarHandle onClick={() => setIsOpen(!isOpen)} />
          <h1>Widget 1</h1>
          <h1>Widget 2</h1>
        </WidgetContainer>
      </AppBody>
    </AppContainer>
  );
}

export default App;
