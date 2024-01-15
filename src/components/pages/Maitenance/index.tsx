import { useTranslation } from "react-i18next";
import React, { ReactElement } from "react";
import Container from "@components/basic/Container";
import { DisplayL, Headline } from "@components/basic/Text";

import { spaces } from "@styles/spaces";
import { useTheme } from "@mui/material";

function Maitenance(): ReactElement {
    const { palette } = useTheme();
    const { t } = useTranslation();

    return (
        <Container
            height="55vh"
            margin={{ all: `${spaces.xxl} ${spaces.xl}` }}
            flex={{ direction: "column", justifyContent: "center" }}
        >
            <DisplayL
                margin={{ bottom: spaces.mhalf }}
                medium
                color={palette.text.primary}
                textAlign="center"
            >
                {t("Maitenance.mantenimiento")}
            </DisplayL>
            <Headline color={palette.text.primary} textAlign="center">
                {t("Maitenance.la_página_está_en")}
            </Headline>
            <Headline color={palette.text.primary} textAlign="center">
                {t("Maitenance.disculpa_las_molestias.")}
            </Headline>
        </Container>
    );
}
export default Maitenance;
