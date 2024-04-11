import { useState } from "react";
import styled from "styled-components";

const SideBarContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? "200px" : "0px")};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryText};
`;

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <SideBarContainer $isOpen={isOpen}>
      <h1>SideBar</h1>
    </SideBarContainer>
  );
};

export default SideBar;
