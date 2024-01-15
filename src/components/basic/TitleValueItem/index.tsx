import Container from "@components/basic/Container";
import { BodyText, Title } from "@components/basic/Text";
import { useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React from "react";

interface TitleValueItemProps {
    title: string;
    value: string;
}

function TitleValueItem({ title, value }: TitleValueItemProps) {
    const { palette } = useTheme();
    return (
        <Container flex={{ direction: "column", rowGap: spaces.s }}>
            <BodyText regular color={palette.grey[500]}>
                {title}
            </BodyText>
            <Title regular>{value}</Title>
        </Container>
    );
}

export default TitleValueItem;
