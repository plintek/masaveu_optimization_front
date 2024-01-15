import React, { ReactElement } from "react";
import Container from "@components/basic/Container";

import { spaces } from "@styles/spaces";
import SideBar from "./components/SideBar";
import { useTheme } from "@mui/material";
import { Dimensions } from "@interfaces/styles/Layout.interface";
import { sidebarWidth } from "@styles/layout";
import Header from "./components/Header";
import Push from "@components/basic/Push";

interface DashboardPageProps {
    title?: string;
    children?: React.ReactNode;
    contentPadding?: Dimensions;
}

function MainContainer({
    title,
    children,
    contentPadding,
}: DashboardPageProps): ReactElement {
    const { palette } = useTheme();

    return (
        <Container backgroundColor={palette.background.default} flex>
            <SideBar width={sidebarWidth} />
            <Container width="100%" flexGrow={1} height="100vh" flex>
                <Push width={sidebarWidth} />
                <Container
                    padding={{
                        all: spaces.l,
                        top: spaces.mhalf,
                    }}
                    flexGrow={1}
                    flex={{ direction: "column" }}
                    width={`calc(100vw - ${sidebarWidth} - ${spaces.lhalf} * 2)`}
                    height={`calc(100vh - ${spaces.lhalf} * 2)`}
                >
                    <Header title={title} />
                    {children}
                </Container>
            </Container>
        </Container>
    );
}

export default MainContainer;
