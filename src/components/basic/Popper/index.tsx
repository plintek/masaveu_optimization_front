import { Dimensions } from "@interfaces/styles/Layout.interface";

import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import { CaptionText } from "../Text";
import { useTheme } from "@mui/material";

interface PopperProps {
    side?: string;
    position?: Dimensions;
    children?: React.ReactNode;

    transform?: string;
    visible?: boolean;
}

const PopperArrow = styled.div`
    position: absolute;
    left: 50%;
    bottom: 1px;
    width: 10px;
    height: 10px;
    transform: translate(-100%, 50%);

    ${(props) => css`
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: ${props.theme.palette.backgroundTone800};
            border-radius: 2px;
            transform: rotate(45deg);
            transform-origin: center;
        }
    `}
`;

const arrowDimensions = "7px";

const PopperStyle = styled.div<PopperProps>`
    position: absolute;
    width: fit-content;
    padding: ${spaces.s};
    text-align: center;
    border-radius: 6px;

    opacity: 0;
    pointer-events: none;

    transition: opacity 0.2s ease-out;

    ${(props) => css`
        background-color: ${props.theme.palette.backgroundTone800};
    `}

    ${(props) => {
        if (props.side === "top") {
            return css`
                top: 0;
                left: 50%;
                transform: translate(-50%, calc(-100% - ${arrowDimensions}));
            `;
        } else if (props.side === "bottom") {
            return css`
                bottom: 0;
                left: 50%;
                transform: translate(-50%, calc(100% + ${arrowDimensions}));
                ${PopperArrow} {
                    bottom: auto;
                    top: 1px;
                    transform: translate(-100%, -50%);
                }
            `;
        } else if (props.side === "left") {
            return css`
                left: 0;
                top: 50%;
                transform: translate(calc(-100% - ${arrowDimensions}), -50%);
                ${PopperArrow} {
                    right: 1px;
                    top: 50%;
                    left: auto;
                    bottom: auto;
                    transform: translate(0%, -50%);
                }
            `;
        } else if (props.side === "right") {
            return css`
                right: 0;
                top: 50%;
                transform: translate(calc(100% + ${arrowDimensions}), -50%);
                ${PopperArrow} {
                    left: 1px;
                    top: 50%;
                    bottom: auto;
                    transform: translate(-100%, -50%);
                }
            `;
        }
    }}

    ${(props) =>
        props.position?.top &&
        css`
            top: ${props.position?.top};
            bottom: auto;
        `}
    ${(props) =>
        props.position?.bottom &&
        css`
            bottom: ${props.position?.bottom};
            top: auto;
        `}
    ${(props) =>
        props.position?.left &&
        css`
            left: ${props.position?.left};
            right: auto;
        `}
    ${(props) =>
        props.position?.right &&
        css`
            right: ${props.position?.right};
            left: auto;
        `}
    
    ${(props) =>
        props.transform &&
        css`
            transform: ${props.transform};
        `}

    ${(props) =>
        props.visible &&
        css`
            opacity: 1;
        `}
`;

function Popper({ side = "top", ...props }: PopperProps): ReactElement {
    const { palette } = useTheme();

    return (
        <PopperStyle side={side} {...props}>
            <PopperArrow />
            <CaptionText color={palette.background.default}>{props.children}</CaptionText>
        </PopperStyle>
    );
}

export default Popper;
