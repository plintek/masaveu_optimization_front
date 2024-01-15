import Container from "@components/basic/Container";
import { ArrowBack, Print, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface HeaderFormProps {
    backLink?: string;
    showPrintButton?: boolean;
    showSaveButton?: boolean;
    loading?: boolean;
    handlePrintButtonClick?: () => void;
    dataModified?: boolean;
    handleSubmitButtonClick: (saveAndNew: boolean) => void;
}
function HeaderForm({
    backLink,
    showPrintButton,
    showSaveButton = true,
    loading,
    handlePrintButtonClick,
    dataModified = false,
    handleSubmitButtonClick,
}: HeaderFormProps) {
    const { t } = useTranslation();
    const { palette } = useTheme();
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        if (
            !dataModified ||
            window.confirm(t("confirmDiscardChanges") || "")
        ) {
            navigate(backLink || "/");
        }
    };

    return (
        <Container
            width="100%"
            flex
            padding={{ all: `${spaces.shalf} ${spaces.s}` }}
            border={{ bottom: `1px solid ${palette.divider}` }}
        >
            {backLink && (
                <Button
                    startIcon={<ArrowBack />}
                    sx={{ color: palette.text.primary }}
                    onClick={handleBackButtonClick}
                >
                    {t("back")}
                </Button>
            )}
            <Container flex={{ columnGap: spaces.m }} margin={{ left: "auto" }}>
                {showSaveButton && (
                    <LoadingButton
                        type="submit"
                        startIcon={<Save />}
                        sx={{ color: palette.text.primary }}
                        loading={loading}
                        onClick={() => handleSubmitButtonClick(false)}
                    >
                        {t("save")}
                    </LoadingButton>
                )}
                {showSaveButton && (
                    <LoadingButton
                        type="submit"
                        startIcon={<Save />}
                        sx={{ color: palette.text.primary }}
                        loading={loading}
                        onClick={() => handleSubmitButtonClick(true)}
                    >
                        {t("saveAndNew")}
                    </LoadingButton>
                )}
                {showPrintButton && (
                    <Button
                        startIcon={<Print />}
                        sx={{ color: palette.text.primary }}
                        onClick={handlePrintButtonClick}
                    >
                        {t("print")}
                    </Button>
                )}
            </Container>
        </Container>
    );
}

export default HeaderForm;
