import Container from "@components/basic/Container";
import { CircularProgress, useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React from "react";

function MapLoading() {
    const { palette } = useTheme();
    return (
        <Container
            position="absolute"
            positionProperties={{ left: "50%", top: spaces.l }}
            width="50px"
            height="50px"
            border={{ radius: "50%" }}
            backgroundColor={palette.common.white}
            flex={{ justifyContent: "center", alignItems: "center" }}
            transform="translateX(-50%)"
        >
            <CircularProgress size={25} />
        </Container>
    );
}

export default MapLoading;
