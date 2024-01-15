import React from "react";
import Container from "@components/basic/Container";
import { spaces } from "@styles/spaces";
import {
    DisplayM,
    DisplayS,
    DisplayXS,
    Headline,
    Title,
} from "@components/basic/Text";
import { useAuthState } from "@context/Auth/Context";
import { useTranslation } from "react-i18next";

interface HomeHeaderProps {
    title?: string;
}

function Header({ title }: HomeHeaderProps) {
    const { user } = useAuthState();
    const { t } = useTranslation();

    return (
        <Container
            as="header"
            flex={{ justifyContent: "space-between", alignItems: "center" }}
            padding={{ bottom: spaces.mhalf }}
        >
            <Title>{title}</Title>
        </Container>
    );
}

export default Header;
