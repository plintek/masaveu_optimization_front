import { PaletteMode } from "@mui/material";
import { spaces } from "./spaces";

export const getTheme = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            main: "#00492C", // rgb(0, 73, 44)
            dark: "#111",
            light: "#27644b",
            contrastText: "#fff",
        },
        secondary: {
            main: "#E73636",
            dark: "#000",
            light: "#000",
            contrastText: "#fff",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "18px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "18px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    "&:hover": {
                        backgroundColor: "#27644b",
                    },
                    "&.Mui-disabled": {
                        color: "#fff",
                        backgroundColor: "#bfd1ca",
                    },
                },
                root: {
                    lineHeight: 1,
                    padding: `${spaces.shalf} ${spaces.shalf}`,
                    borderRadius: "18px",
                    fontWeight: 700,
                    letterSpacing: "0.15px",
                },
                endIcon: {
                    height: "17px",
                    transform: "translateY(-2px)",
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: "6px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",

                    "&::before": {
                        height: "0px",
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: `${spaces.shalf} ${spaces.l}`,
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    borderTop: "1px solid #E6E6E6",
                    margin: `${spaces.shalf} ${spaces.l}`,
                    marginTop: "0px",
                    padding: `${spaces.l} 0`,
                    paddingBottom: spaces.mhalf,
                    cursor: "default",
                },
            },
        },
    },
});
