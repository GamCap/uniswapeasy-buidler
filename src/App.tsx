import styled from "styled-components";
import NavBar from "./components/NavBar";
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

function App() {
  return (
    <AppContainer>
      <NavBar />
    </AppContainer>
  );
}

export default App;
