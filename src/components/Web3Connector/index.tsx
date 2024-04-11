import styled from "styled-components";
import { connectors, getConnectorName, Web3Connector } from "../../connectors";
import { useCallback } from "react";

const ConnectorWrapper = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.lightBorder};
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.primaryText};
  border-radius: 12px;
  font-size: 20px;
`;

function Connector({ web3Connector }: { web3Connector: Web3Connector }) {
  const [connector, hooks] = web3Connector;
  const isActive = hooks.useIsActive();
  const onClick = useCallback(() => {
    if (isActive) {
      connector?.deactivate?.();
    } else {
      connectors.forEach(([connector]) => connector?.deactivate?.());
      connector.activate();
    }
  }, [connector, isActive]);

  return (
    <ConnectorWrapper
      onClick={onClick}
      title={isActive ? "Disconnect" : "Connect"}
      aria-label={isActive ? "Disconnect" : "Connect"}
    >
      <label>{getConnectorName(connector)}</label>
      <svg
        style={
          isActive
            ? {
                width: "16px",
                fill: "green",
              }
            : {
                width: "16px",
                fill: "red",
              }
        }
        viewBox="0 0 2 2"
      >
        <circle cx={1} cy={1} r={1} />
      </svg>
    </ConnectorWrapper>
  );
}

export default function Connectors() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {connectors.map((web3Connector, index) => (
        <Connector key={index} web3Connector={web3Connector} />
      ))}
    </div>
  );
}
