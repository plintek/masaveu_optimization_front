import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import Container from "../Container";

export interface PillProps {
    borderColor?: string;
    backgroundColor?: string;
    color?: string;
    children?: React.ReactNode;
}

const PillStyle = styled(Container)<PillProps>`
    border-radius: 40px;
    padding: ${spaces.xshalf} ${spaces.shalf};
    color: ${(props) => (props.color ? props.color : props.theme.palette.background)};

    ${(props) =>
        props.borderColor &&
        css`
            border: 1px solid ${props.borderColor};
        `}
`;

function Pill({ borderColor, backgroundColor, color, children }: PillProps): ReactElement {
    return (
        <PillStyle as="span" backgroundColor={backgroundColor} borderColor={borderColor} color={color}>
            {children}
        </PillStyle>
    );
}

export default Pill;
