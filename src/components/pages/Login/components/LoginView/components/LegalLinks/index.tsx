import Container from "@components/basic/Container";
import { DefaultLink } from "@components/basic/DefaultLink";
import { CaptionText } from "@components/basic/Text";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

function LegalLinks(): ReactElement {
    const { t } = useTranslation();
    const { palette } = useTheme();
    const legalLinks = [
        {
            title: t("Legal.legal_notice"),
            link: "/legal-notice",
        },
        {
            title: t("Legal.privacy_policy"),
            link: "/privacy-policy",
        },
        {
            title: t("Legal.cookies_policy"),
            link: "/cookies-policy",
        },
    ];

    return (
        <Container width="100%" flex={{ justifyContent: "center" }}>
            {legalLinks.map((legalLink, index) => (
                <Container
                    key={`legalLink-${index}`}
                    padding={{ all: `0 ${spaces.s}` }}
                    border={{ right: index !== legalLinks.length - 1 ? `1px solid ${palette.text.primary}` : "" }}
                >
                    <DefaultLink to={legalLink.link}>
                        <CaptionText regular>{legalLink.title}</CaptionText>
                    </DefaultLink>
                </Container>
            ))}
        </Container>
    );
}

export default LegalLinks;
