import Container from "@components/basic/Container";
import { Button } from "@mui/material";
import {
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { spaces } from "@styles/spaces";
import React from "react";
import { useTranslation } from "react-i18next";
import PrintIcon from "@mui/icons-material/Print";
import PublishIcon from "@mui/icons-material/Publish";
import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
interface CustomToolbarProps {
    children?: React.ReactNode;
    showPrintButton?: boolean;
    enablePrintButton?: boolean;
    showImportButton?: boolean;
    showExportButton?: boolean;
    handlePrintButtonClick?: () => void;
    handleImportButtonClick?: () => void;
    columns?: AnyObject[];
}

function CustomToolbar({
    children,
    showPrintButton,
    enablePrintButton = false,
    showImportButton = true,
    showExportButton = true,
    handlePrintButtonClick,
    handleImportButtonClick,
    columns,
}: CustomToolbarProps) {
    const { t } = useTranslation();
    const exportableFields =
        (
            columns?.filter(
                (col) => typeof col.exportable === "undefined" || col.exportable
            ) as AnyType[]
        ).map((col) => col.field) || [];

    return (
        <GridToolbarContainer>
            <Container width="100%" flex={{ justifyContent: "space-between" }}>
                <Container>{children}</Container>
                <Container flex={{ columnGap: spaces.m }}>
                    {showImportButton && (
                        <Button
                            color="primary"
                            startIcon={<PublishIcon />}
                            sx={{ color: "black" }}
                            onClick={handleImportButtonClick}
                        >
                            {t("Import")}
                        </Button>
                    )}
                    {showExportButton && (
                        <GridToolbarExport
                            csvOptions={{
                                delimiter: ";",
                                fileName: "export",
                                utf8WithBom: true,
                                fields: exportableFields,
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
                </Container>
            </Container>
        </GridToolbarContainer>
    );
}

export default CustomToolbar;
