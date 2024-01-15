import React, { ReactElement } from "react";
import Container from "@components/basic/Container";
import { DisplayL, DisplayS } from "@components/basic/Text";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { spaces } from "@styles/spaces";
import { Button, useTheme } from "@mui/material";
import { LinkContainer } from "@components/basic/LinkContainer";

function NotFound(): ReactElement {
    const { palette } = useTheme();

    return (
        <Container
            position="fixed"
            positionProperties={{ top: "0" }}
            height="100vh"
            width="100vw"
            backgroundColor={palette.background.default}
        >
            <Container
                height="70vh"
                margin={{ all: `${spaces.xxl} ${spaces.xl}` }}
                flex={{ direction: "column", justifyContent: "center", alignItems: "center" }}
            >
                <DisplayL margin={{ bottom: spaces.m }} medium color={palette.primary.main} textAlign="center">
                    404
                </DisplayL>
                <DisplayS color={palette.primary.main} textAlign="center">
                    The page was not found
                </DisplayS>
                <LinkContainer to="/">
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            marginTop: spaces.xl,
                        }}
                        startIcon={<ArrowBackIcon />}
                    >
                        Go to home
                    </Button>
                </LinkContainer>
            </Container>
        </Container>
    );
}
export default NotFound;
