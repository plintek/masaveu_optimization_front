import Container, { MotionContainer } from "@components/basic/Container";
import CsvIcon from "@components/basic/icons/CsvIcon";
import ExportIcon from "@components/basic/icons/ExportIcon";
import GeojsonIcon from "@components/basic/icons/GeojsonIcon";
import ShapefileIcon from "@components/basic/icons/ShapefileIcon";
import { IconButton, useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React, { useState } from "react";
import styled, { css } from "styled-components";

import parking from "@data/parking.json";

const IconButtonContainer = styled(Container)<{ isLast?: boolean }>`
    display: flex;
    align-items: center;
    column-gap: ${spaces.xs};
    padding: 0 ${spaces.m};
    height: 48px;

    transition: background-color 0.2s ease-out;
    cursor: pointer;

    ${(props) =>
        css`
            border-radius: ${props.isLast ? "0 50px 50px 0" : "0"};
        `}

    &:hover {
        background-color: ${(props) => props.theme.palette.grey[300]};
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

const containerVariants = {
    hidden: { x: "-100%", y: "-50%" },
    show: {
        x: "0",
        y: "-50%",
    },
};

function ExportMenuItem() {
    const { palette } = useTheme();
    const [isActiveExportTool, setIsActiveExportTool] = useState(false);

    const downloadGeojson = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(parking)], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "parking.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <Container
            padding={{ all: `${spaces.m} 0` }}
            position="relative"
            onMouseEnter={() => setIsActiveExportTool(true)}
            onMouseLeave={() => setIsActiveExportTool(false)}
        >
            <Container
                zIndex={3}
                position="relative"
                backgroundColor={isActiveExportTool ? palette.background.default : palette.grey[100]}
                border={{ radius: "50% 0 0 50%" }}
            >
                <IconButton size="large">{<ExportIcon />}</IconButton>
            </Container>
            <MotionContainer
                zIndex={1}
                position="absolute"
                positionProperties={{ top: "50%", left: "100%" }}
                backgroundColor={palette.background.default}
                border={{ radius: "0 50px 50px 0" }}
                initial="hidden"
                flex
                variants={containerVariants}
                animate={isActiveExportTool ? "show" : "hidden"}
                transition={{ bounce: 0, duration: 0.2 }}
            >
                <IconButtonContainer>
                    <CsvIcon /> CSV
                </IconButtonContainer>
                <IconButtonContainer onClick={downloadGeojson}>
                    <GeojsonIcon /> GEOJSON
                </IconButtonContainer>
                <IconButtonContainer isLast>
                    <ShapefileIcon /> SHAPEFILE
                </IconButtonContainer>
            </MotionContainer>
            <Container
                backgroundColor={palette.grey[100]}
                position="absolute"
                height="80px"
                zIndex={2}
                width="60px"
                positionProperties={{ left: "-70%", top: "0" }}
            />
        </Container>
    );
}

export default ExportMenuItem;
