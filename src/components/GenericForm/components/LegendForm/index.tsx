import Container from "@components/basic/Container";
import { BodyText } from "@components/basic/Text";
import { spaces } from "@styles/spaces";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ReadOnlySquare = styled(Container)`
    box-sizing: border-box;

    width: 63px;
    height: 23px;

    background: #fad8b8;
    border: 1px solid #000000;
    border-radius: 8px;
`;

function LegendForm() {
    const { t } = useTranslation();
    return (
        <Container flex={{ columnGap: spaces.m }} margin={{ top: spaces.l }}>
            <ReadOnlySquare />
            <BodyText bold>{t("Form.readOnly")}</BodyText>
        </Container>
    );
}

export default LegendForm;
