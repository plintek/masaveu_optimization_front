import React from "react";
import {
    createTheme,
    PaletteMode,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { getTheme } from "@styles/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { config } from "@config/config";
import { enUS as coreEnUS } from "@mui/material/locale";
import { enUS as gridEnUS } from "@mui/x-data-grid";

interface ThemeProps {
    children: React.ReactNode;
}

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

function Theme({ children }: ThemeProps) {
    const [mode, setMode] = React.useState<PaletteMode>(config.theme);
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    // Update the theme only if the mode changes
    const actualTheme = React.useMemo(
        () => createTheme(getTheme(mode), coreEnUS, gridEnUS),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={actualTheme}>
                <StyledThemeProvider theme={actualTheme}>
                    {children}
                </StyledThemeProvider>
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Theme;
