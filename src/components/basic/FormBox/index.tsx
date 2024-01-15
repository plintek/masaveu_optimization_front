import React, { ReactElement } from "react";
import Container, { ElementContainer } from "../Container";

import { Dimensions } from "@interfaces/styles/Layout.interface";
import { useTheme } from "@mui/material";

interface FormBoxProps {
    children: React.ReactNode;
    width?: string;
    maxWidth?: string;

    margin?: Dimensions;
}

function FormBox({ children, width = "auto", margin, maxWidth }: FormBoxProps): ReactElement {
    const { palette } = useTheme();

    return (
        <ElementContainer
            flex={{ direction: "column", justifyContent: "center", alignItems: "center" }}
            backgroundColor={palette.background.default}
            width={width}
            margin={margin}
            maxWidth={maxWidth}
        >
            <Container width="100%">{children}</Container>
        </ElementContainer>
    );
}

export default FormBox;
