import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Image from "@components/basic/Image";
import styled, { css } from "styled-components";
import { mediaMinWidth } from "@styles/media";
import { layoutBreakpoint } from "@styles/layout";

import LogoImageFile from "@assets/logos/logo.svg";

interface LogoProps {
    height?: string;
    heightMobile?: string;
}

const LogoImage = styled(Image)<LogoProps>`
    ${(props) => css`
        height: ${props.heightMobile || "25px"};
        ${mediaMinWidth(layoutBreakpoint.desktop)} {
            height: ${props.height || "45px"};
        }
    `}
`;

function Logo({ height, heightMobile }: LogoProps): ReactElement {
    return (
        <Link to="/">
            <LogoImage
                src={LogoImageFile}
                height={height}
                heightMobile={heightMobile}
            />
        </Link>
    );
}

export default Logo;
