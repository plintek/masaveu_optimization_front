import Container from "@components/basic/Container";
import { BodyText, DisplayS } from "@components/basic/Text";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface TitleValuesStatisticContainerProps {
    borderColor?: string;
}

const TitleValuesStatisticContainer = styled(Container)<TitleValuesStatisticContainerProps>`
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 100%;
        border-radius: 9px 0 0 9px;

        background-color: ${(props) => props.borderColor};
    }
`;

interface TitleValueStatisticProps {
    title: string;
    value: string[] | { title: string; value: string }[];
    direction?: "column" | "column-reverse";
    borderColor?: string;
}

function TitleValueStatistic({ title, value, direction = "column", borderColor }: TitleValueStatisticProps) {
    const { palette } = useTheme();
    const { t } = useTranslation();

    return (
        <TitleValuesStatisticContainer
            width={`calc(100% - ${spaces.m} * 2)`}
            flex={{ direction, rowGap: spaces.m, alignItems: "center", justifyContent: "center" }}
            padding={{ all: `${spaces.mhalf} ${spaces.m}` }}
            border={{ radius: "9px" }}
            backgroundColor={palette.background.default}
            height={`calc(100% - ${spaces.xl})`}
            borderColor={borderColor || palette.common.black}
        >
            <Container>
                <BodyText regular textAlign="center">
                    {title}
                </BodyText>
            </Container>
            <Container
                flex={{
                    alignItems: "center",
                    columnGap: `${value[0] && typeof value[0] === "string" ? spaces.m : ""}`,
                }}
            >
                {value.map((item, index) => (
                    <Container key={`statistics-${index}`} flex={{ columnGap: spaces.m }}>
                        {typeof item === "string" ? (
                            <>
                                <DisplayS textAlign="center" medium>
                                    {item}
                                </DisplayS>
                                {index !== value.length - 1 && (
                                    <DisplayS textAlign="center" medium>
                                        -
                                    </DisplayS>
                                )}
                            </>
                        ) : (
                            <Container flex={{ direction: "column", rowGap: spaces.m, alignItems: "center" }}>
                                <Container
                                    padding={{ all: `0 ${spaces.l}` }}
                                    border={{
                                        right: index !== value.length - 1 ? `1px solid ${palette.grey[400]}` : "",
                                    }}
                                >
                                    <DisplayS textAlign="center" medium>
                                        {item.value}
                                    </DisplayS>
                                </Container>
                                <BodyText regular textAlign="center">
                                    {t(item.title)}
                                </BodyText>
                            </Container>
                        )}
                    </Container>
                ))}
            </Container>
        </TitleValuesStatisticContainer>
    );
}

export default TitleValueStatistic;
