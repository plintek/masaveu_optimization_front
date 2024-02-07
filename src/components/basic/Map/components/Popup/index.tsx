import Container from "@components/basic/Container";
import { BodyText } from "@components/basic/Text";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { Point } from "@interfaces/basic/Point.interface";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";

export interface PopupProps {
    position: Point;
    visible: boolean;
    content: ReactElement;
}

function Popup({ position, visible = false, content }: PopupProps) {
    const { palette } = useTheme();

    return (
        <>
            {visible && (
                <Container
                    position="absolute"
                    zIndex={10}
                    pointerEvents="none"
                    positionProperties={{ left: `${position.x - 5}px`, top: `${position.y - 10}px` }}
                    width="200px"
                    backgroundColor={palette.background.default}
                    border={{ all: "1px solid #ddd", radius: "9px" }}
                    transform="translate(-50%, -100%)"
                    padding={{ all: spaces.m }}
                    flex={{ direction: "column", rowGap: spaces.s }}
                >
                    {content}
                </Container>
            )}
        </>
    );
}

export default Popup;
