import Container from "@components/basic/Container";
import { layoutBreakpoint } from "@styles/layout";
import { mediaMinWidth } from "@styles/media";
import React, { ReactElement } from "react";
import styled, { css } from "styled-components";
import SideBarMenu from "./components/SideBarMenu";
import { spaces } from "@styles/spaces";
import { useTheme } from "@mui/material";
import Profile from "./components/Profile";

interface SidebarProps {
    width?: string;
    showSidebar?: boolean;
}

const SidebarContainer = styled(Container)<SidebarProps>`
    transform: translateX(-100%);
    transition: transform 0.2s ease-out;

    ${(props) =>
        props.showSidebar &&
        css`
            transform: translateX(0);
        `}

    ${mediaMinWidth(layoutBreakpoint.desktop)} {
        transform: none;
        display: block;
        z-index: 6;
    }
`;

function SideBar({ width, showSidebar = true }: SidebarProps): ReactElement {
    const { palette } = useTheme();

    return (
        <>
            <SidebarContainer
                as="aside"
                width={width}
                height="100%"
                position="fixed"
                zIndex={2}
                backgroundColor="#F5F5F5"
                positionProperties={{ top: "0" }}
                showSidebar={showSidebar}
                border={{ right: `1px solid ${palette.grey[200]}` }}
            >
                <Container
                    height="100%"
                    flex={{ direction: "column" }}
                    padding={{ all: `0 ${spaces.m}` }}
                >
                    <Container
                        flex={{ justifyContent: "center" }}
                        margin={{ top: spaces.xl, bottom: spaces.mhalf }}
                    >
                        <Profile />
                    </Container>
                    <Container
                        flex={{ direction: "column", alignItems: "center" }}
                        margin={{ top: spaces.m }}
                        height="100%"
                    >
                        <SideBarMenu />
                    </Container>
                </Container>
            </SidebarContainer>
        </>
    );
}

export default SideBar;
