import Container from "@components/basic/Container";
import { Button } from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { spaces } from "@styles/spaces";
import React from "react";
import { useTranslation } from "react-i18next";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

interface CustomToolbarProps {
    children?: React.ReactNode;
    showPrintButton?: boolean;
    enablePrintButton?: boolean;
    showGoBackToDeliveryNotesButton?: boolean;
    showExportButton?: boolean;
    handlePrintButtonClick?: () => void;
}

function CustomToolbar({
    children,
    showPrintButton,
    enablePrintButton = false,
    showGoBackToDeliveryNotesButton,
    showExportButton = true,
    handlePrintButtonClick,
}: CustomToolbarProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <GridToolbarContainer>
            <Container width="100%" flex={{ justifyContent: "space-between" }}>
                <Container>{children}</Container>
                <Container flex={{ columnGap: spaces.m }}>
                    {showGoBackToDeliveryNotesButton ? (
                        <Button
                            color="primary"
                            startIcon={<ArrowBack />}
                            sx={{ color: "black" }}
                            onClick={() => navigate("/")}
                        >
                            {t("goToDeliveryNotesList")}
                        </Button>
                    ) : (
                        <>
                            {showExportButton && (
                                <GridToolbarExport
                                    csvOptions={{
                                        delimiter: ";",
                                        fileName: "export",
                                    }}
                                    printOptions={{
                                        disableToolbarButton: true,
                                    }}
                                    sx={{ color: "black" }}
                                />
                            )}

                            {showPrintButton && (
                                <Button
                                    color="primary"
                                    startIcon={<PrintIcon />}
                                    sx={{ color: "black" }}
                                    disabled={!enablePrintButton}
                                    onClick={handlePrintButtonClick}
                                >
                                    {t("print")}
                                </Button>
                            )}
                            <GridToolbarFilterButton sx={{ color: "black" }} />
                        </>
                    )}
                </Container>
            </Container>
        </GridToolbarContainer>
    );
}

export default CustomToolbar;
