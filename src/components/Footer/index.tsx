import React, { ReactElement } from "react";

import Container from "@components/basic/Container";
import { CaptionText } from "@components/basic/Text";
import { spaces } from "@styles/spaces";

import styled, { css } from "styled-components";
import { mediaMinWidth } from "@styles/media";
import { layoutBreakpoint } from "@styles/layout";
import { useTheme } from "@mui/material";

interface FooterContainerProps {
    sideBarWidth?: string;
}

const FooterContainer = styled(Container)<FooterContainerProps>`
    ${mediaMinWidth(layoutBreakpoint.desktop)} {
        ${(props) =>
            props.sideBarWidth &&
            css`
                padding-inline-start: calc(${spaces.mhalf} + ${props.sideBarWidth});
            `}
    }
`;

function Footer({ sideBarWidth }: FooterContainerProps): ReactElement {
    const { palette } = useTheme();

    return (
        <FooterContainer
            border={{ top: `1px solid ${palette.background.default}` }}
            margin={{ top: "auto" }}
            padding={{ all: `${spaces.mhalf}` }}
            as="footer"
            sideBarWidth={sideBarWidth}
        >
            <CaptionText color={palette.background.default}>React MUI ts template</CaptionText>
        </FooterContainer>
    );
}

export default Footer;
