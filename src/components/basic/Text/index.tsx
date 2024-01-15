import { Dimensions } from "@interfaces/styles/Layout.interface";
import { generateMargins, generatePaddings } from "@styles/layout";

import styled from "styled-components";

interface TextProps {
    size?: string;

    bold?: boolean;
    medium?: boolean;
    regular?: boolean;
    normal?: boolean;

    color?: string;

    textAlign?: "left" | "right" | "center";

    margin?: Dimensions;
    padding?: Dimensions;

    textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";

    whiteSpace?: "nowrap" | "pre" | "pre-line" | "pre-wrap";

    fontStyle?: "italic" | "normal";
}

export const Text = styled("p")<TextProps>`
    ${(props) => props.size && `font-size: ${props.size};`}
    ${(props) => props.bold && "font-weight: 700;"}
    ${(props) => props.medium && "font-weight: 500;"}
    ${(props) => props.regular && "font-weight: 400;"}
    ${(props) => props.normal && "font-weight: 300;"}
    color: ${(props) =>
        props.color ? props.color : props.theme.palette.foreground};

    ${(props) => props.textAlign && `text-align: ${props.textAlign};`}

    ${(props) => props.margin && generateMargins(props.margin)}
    ${(props) => props.padding && generatePaddings(props.padding)}

    ${(props) =>
        props.textTransform && `text-transform: ${props.textTransform};`}

    ${(props) => props.whiteSpace && `white-space: ${props.whiteSpace};`}

    ${(props) => props.fontStyle && `font-style: ${props.fontStyle};`}
`;

export const TextSpan = styled(Text).attrs({
    as: "span",
})``;

export const DisplayL = styled(Text)`
    font-size: 5rem;
    line-height: 5.5rem;
`;
export const DisplayM = styled(Text)`
    font-size: 3.1rem;
    line-height: 3.3rem;
`;
export const DisplayS = styled(Text)`
    font-size: 2.5rem;
    line-height: 2.8rem;
`;
export const DisplayXS = styled(Text)`
    font-size: 2.1rem;
    line-height: 2.3rem;
`;
export const Headline = styled(Text)`
    font-size: 1.8rem;
    line-height: 2rem;
`;
export const Title = styled(Text)`
    font-size: 1.4rem;
    line-height: 1.6rem;
`;
export const Subtitle = styled(Text)`
    font-size: 1.2rem;
    line-height: 1.4rem;
`;
export const BodyText = styled(Text)`
    font-size: 1rem;
    line-height: 1.3rem;
`;
export const CaptionText = styled(Text)`
    font-size: 0.9rem;
    line-height: 1rem;
`;
export const SmallText = styled(Text)`
    font-size: 0.7rem;
    line-height: 0.9rem;
`;
