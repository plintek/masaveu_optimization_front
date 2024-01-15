import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import Container from "../Container";
import Lens from "../Lens";
import { useTheme } from "@mui/material";

interface PopupProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    isVisible?: boolean;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PopupContainerStyleProps {
    isVisible?: boolean;
}

const PopupContainerStyle = styled(Container)<PopupContainerStyleProps>`
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-out;

    ${(props) =>
        props.isVisible &&
        css`
            opacity: 1;
            pointer-events: all;
        `}
`;

const PopupStyle = styled(Container)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${spaces.lhalf};
    overflow-y: auto;
`;

function Popup({
    children,
    width = `calc(100% - ${spaces.xxxlhalf})`,
    height = `calc(100% - ${spaces.xxxlhalf})`,
    isVisible = false,
    setVisible,
}: PopupProps): ReactElement {
    const { palette } = useTheme();

    return (
        <PopupContainerStyle
            position="fixed"
            zIndex={7}
            width="100vw"
            height="100vh"
            positionProperties={{ top: "0", left: "0" }}
            isVisible={isVisible}
        >
            <Container onClick={() => setVisible && setVisible(false)}>
                <Lens />
            </Container>
            <PopupStyle width={width} height={height} backgroundColor={palette.background.default}>
                <Container>{children}</Container>
            </PopupStyle>
        </PopupContainerStyle>
    );
}

export default Popup;
