import React, { ReactElement } from "react";
import Container from "@components/basic/Container";

import styled from "styled-components";
import { CircularProgress, useTheme } from "@mui/material";

type LoaderTypes = "circle";

export interface LoaderProps {
    size?: number;
    isLoading?: boolean;
    zIndex?: number;
    color?: string;
    type?: LoaderTypes;
    backgroundColor?: string;
}

const LoaderContainer = styled(Container)<LoaderProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};
    z-index: ${(props) => (props.zIndex ? props.zIndex : 5)};

    transition: opacity 0.2s ease-out;

    opacity: ${(props) => (props.isLoading ? 1 : 0)};
    pointer-events: none;
`;

function Loader({
    size = 2,
    isLoading = false,
    zIndex = 5,
    type = "circle",
    color,
    backgroundColor,
}: LoaderProps): ReactElement {
    const { palette } = useTheme();
    if (!color) {
        color = palette.primary.main;
    }
    if (!backgroundColor) {
        backgroundColor = palette.background.default;
    }

    return (
        <LoaderContainer
            size={size}
            isLoading={isLoading}
            zIndex={zIndex}
            flex={{ alignItems: "center", justifyContent: "center" }}
            backgroundColor={backgroundColor}
        >
            {type === "circle" && <CircularProgress />}
        </LoaderContainer>
    );
}

export default Loader;
