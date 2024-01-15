import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";
import Container from "../Container";
import { useTheme } from "@mui/material";

interface FormBoxProps {
    children: React.ReactNode;
}

function FullGrayPage({ children }: FormBoxProps): ReactElement {
    const { palette } = useTheme();

    return (
        <Container
            position="relative"
            flex={{ justifyContent: "center", alignItems: "center" }}
            minHeight="100vh"
            backgroundColor={palette.background.default}
            padding={{ all: `${spaces.l} 0` }}
        >
            {children}
        </Container>
    );
}

export default FullGrayPage;
