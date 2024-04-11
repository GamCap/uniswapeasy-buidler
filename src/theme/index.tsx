import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider as StyledProvider,
} from "styled-components";

type ColorMode = "light" | "dark";

const darkTheme = {
  background: "#121212",
  primaryText: "#E0E0E0",
  secondaryText: "#BDBDBD",
  accent: "#BB86FC",
  lightBorder: "#292929",
  darkBorder: "#1F1F1F",
  hoverBackground: "#1E1E1E",
  activeBackground: "#333333",
};

const lightTheme = {
  background: "#F5F5F5",
  primaryText: "#212121",
  secondaryText: "#757575",
  accent: "#6200EE",
  lightBorder: "#E0E0E0",
  darkBorder: "#BDBDBD",
  hoverBackground: "#EDEDED",
  activeBackground: "#E0E0E0",
};

type ThemeCtxType = {
  theme: DefaultTheme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
};

const ThemeCtx = createContext<ThemeCtxType>({
  theme: {},
  colorMode: "dark",
  setColorMode: () => null,
});

export function useTheme() {
  return useContext(ThemeCtx);
}

const GlobalStyle = createGlobalStyle`
* {
    font-family: 'Roboto', sans-serif;
}
`;

export function Provider({ children }: { children: React.ReactNode }) {
  const { theme: fallbackTheme, colorMode: fallbackColorMode } = useTheme();

  const theme = fallbackTheme || darkTheme;
  const [colorMode, setColorMode] = useState<"light" | "dark">(
    fallbackColorMode || "dark"
  );
  const resolvedTheme = useMemo(() => {
    const theme = colorMode === "dark" ? darkTheme : lightTheme;
    return theme;
  }, [colorMode, theme]);

  useEffect(() => {
    setColorMode(fallbackColorMode || "dark");
  }, [fallbackColorMode]);

  return (
    <ThemeCtx.Provider
      value={{
        theme: resolvedTheme,
        colorMode,
        setColorMode,
      }}
    >
      <StyledProvider theme={resolvedTheme}>
        <GlobalStyle />

        {children}
      </StyledProvider>
    </ThemeCtx.Provider>
  );
}
