import Container from "@components/basic/Container";
import { BodyText } from "@components/basic/Text";
import { Breadcrumbs, useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";
import { Breadcrumb } from "@interfaces/basic/Breadcrumb.interface";
import { LinkContainer } from "../LinkContainer";

interface PageBreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
    actualPage: string;
}

function PageBreadcrumbs({ breadcrumbs, actualPage }: PageBreadcrumbsProps) {
    const { palette } = useTheme();
    return (
        <Container margin={{ bottom: spaces.l }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb) => (
                    <LinkContainer to={breadcrumb.path} key={breadcrumb.path}>
                        <BodyText margin={{ bottom: "1px" }} color={palette.grey[500]} regular>
                            {breadcrumb.label}
                        </BodyText>
                    </LinkContainer>
                ))}
                <BodyText margin={{ bottom: "1px" }} color={palette.text.primary} regular>
                    {actualPage}
                </BodyText>
            </Breadcrumbs>
        </Container>
    );
}

export default PageBreadcrumbs;
