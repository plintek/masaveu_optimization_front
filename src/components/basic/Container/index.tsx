import { Dimensions, Flex, Grid, Overflow, PointerEvents } from "@interfaces/styles/Layout.interface";
import {
    generateBorders,
    generateFlexLayout,
    generateGridLayout,
    generateMargins,
    generatePaddings,
    generatePositionProperties,
    layoutBreakpoint,
} from "@styles/layout";
import { deviceSizes, mediaMinWidth } from "@styles/media";
import { spaces } from "@styles/spaces";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface ContainerProps {
    as?: string | React.ElementType;
    children?: React.ReactNode;

    width?: string;
    height?: string;

    position?: string;

    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;

    flex?: Flex | boolean;
    grid?: Grid | boolean;

    flexGrow?: number;

    background?: string;
    backgroundColor?: string;

    margin?: Dimensions;
    padding?: Dimensions;

    zIndex?: number;

    border?: Dimensions;

    positionProperties?: Dimensions;

    gridRow?: string;
    gridColumn?: string;

    overflow?: Overflow;
    opacity?: number;

    cursor?: string;
    transform?: string;

    boxShadow?: string;
    pointerEvents?: PointerEvents;
}

const Container = styled.div<ContainerProps>`
    ${(props) => props.flex && generateFlexLayout(props.flex)}
    ${(props) => props.grid && !props.flex && generateGridLayout(props.grid)}
    ${(props) => props.margin && generateMargins(props.margin)}
    ${(props) => props.padding && generatePaddings(props.padding)}
    ${(props) => props.border && generateBorders(props.border)}
    ${(props) => props.positionProperties && generatePositionProperties(props.positionProperties)}
    ${(props) =>
        props.width &&
        css`
            width: ${props.width};
        `}
    ${(props) =>
        props.height &&
        css`
            height: ${props.height};
        `}
    ${(props) =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth};
        `}
    ${(props) =>
        props.maxHeight &&
        css`
            max-height: ${props.maxHeight};
        `}
    ${(props) =>
        props.minWidth &&
        css`
            min-width: ${props.minWidth};
        `}
    ${(props) =>
        props.minHeight &&
        css`
            min-height: ${props.minHeight};
        `}
    ${(props) =>
        props.position &&
        css`
            position: ${props.position};
        `}
    ${(props) =>
        props.background &&
        css`
            background: ${props.background};
        `}
    ${(props) =>
        props.backgroundColor &&
        css`
            background-color: ${props.backgroundColor};
        `}
    ${(props) =>
        props.zIndex &&
        css`
            z-index: ${props.zIndex};
        `}
    ${(props) =>
        props.flexGrow &&
        css`
            flex-grow: ${props.flexGrow};
        `}

    ${mediaMinWidth(deviceSizes.tablet)} {
        ${(props) =>
            props.gridColumn &&
            css`
                grid-column: ${props.gridColumn};
            `}
    }
    ${(props) =>
        props.gridRow &&
        css`
            grid-row: ${props.gridRow};
        `}

    ${(props) =>
        props.overflow &&
        props.overflow.all &&
        css`
            overflow: ${props.overflow.all};
        `}

    ${(props) =>
        props.overflow &&
        props.overflow.x &&
        css`
            overflow-x: ${props.overflow.x};
        `}

    ${(props) =>
        props.overflow &&
        props.overflow.y &&
        css`
            overflow-y: ${props.overflow.y};
        `}

    ${(props) =>
        props.opacity &&
        css`
            opacity: ${props.opacity};
        `}

    ${(props) =>
        props.cursor &&
        css`
            cursor: ${props.cursor};
        `}
    
    ${(props) =>
        props.transform &&
        css`
            transform: ${props.transform};
        `}

    ${(props) =>
        props.boxShadow &&
        css`
            box-shadow: ${props.boxShadow};
        `}

    ${(props) =>
        props.pointerEvents &&
        css`
            pointer-events: ${props.pointerEvents};
        `}
`;

export const ElementContainer = styled(Container)`
    ${mediaMinWidth(layoutBreakpoint.desktop)} {
        margin-inline-start: ${spaces.xl};
        margin-inline-end: ${spaces.xl};
    }
`;

export const CardContainer = styled(Container)`
    background-color: ${({ theme }) => theme.palette.background.default};
    padding: ${spaces.mhalf};
    border-radius: 6px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ClickableCardContainer = styled(CardContainer)`
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.palette.grey[200]};
    }
`;

export const MotionContainer = motion(Container);

export default Container;
