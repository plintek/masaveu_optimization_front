import AddIcon from "@mui/icons-material/Add";
import CustomToolbar from "@components/basic/DataGrid/components/CustomToolbar";
import { Button } from "@mui/material";
import Container from "@components/basic/Container";
import { spaces } from "@styles/spaces";
import { useTranslation } from "react-i18next";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptIcon from "@mui/icons-material/Receipt";
interface EditToolbarProps<T> {
    handleAddButtonClick: () => void;
    handleUpdateButtonClick: () => void;
    handleDeleteButtonClick: () => void;
    handleViewButtonClick: () => void;
    handlePrintButtonClick?: () => void;
    handleInvoiceButtonClick?: () => void;
    entityName: string;
    showAddButton?: boolean;
    showPrintButton?: boolean;
    isAddingRow?: boolean;
    loadingRows?: boolean;
    deleteButtonEnabled?: boolean;
    viewButtonEnabled?: boolean;
    showGoBackToDeliveryNotesButton?: boolean;
    showDeleteButton?: boolean;
    showViewButton?: boolean;
    showInvoiceButton?: boolean;
    showExportButton?: boolean;
}

function EditToolbar<T>({
    handleAddButtonClick,
    handleUpdateButtonClick,
    handleDeleteButtonClick,
    handleViewButtonClick,
    handlePrintButtonClick,
    handleInvoiceButtonClick,
    entityName,
    showAddButton = true,
    showPrintButton = false,
    isAddingRow = false,
    loadingRows = false,
    deleteButtonEnabled = false,
    viewButtonEnabled = false,
    showGoBackToDeliveryNotesButton = false,
    showDeleteButton = true,
    showViewButton = true,
    showInvoiceButton = false,
    showExportButton = true,
}: EditToolbarProps<T>) {
    const { t } = useTranslation();
    return (
        <CustomToolbar
            showPrintButton={showPrintButton}
            showExportButton={showExportButton}
            showGoBackToDeliveryNotesButton={showGoBackToDeliveryNotesButton}
            enablePrintButton={viewButtonEnabled}
            handlePrintButtonClick={handlePrintButtonClick}
        >
            <Container flex={{ columnGap: spaces.m }}>
                {showAddButton && (
                    <Button
                        startIcon={<AddIcon />}
                        onClick={handleAddButtonClick}
                        disabled={loadingRows || isAddingRow}
                        sx={{ color: "black" }}
                    >
                        {t("add")}
                    </Button>
                )}
                {showViewButton && (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={handleViewButtonClick}
                        disabled={loadingRows || !viewButtonEnabled}
                        sx={{ color: "black" }}
                    >
                        {t("view")}
                    </Button>
                )}
                <Button
                    startIcon={<UpdateIcon />}
                    onClick={handleUpdateButtonClick}
                    disabled={loadingRows}
                    sx={{ color: "black" }}
                >
                    {t("update")}
                </Button>
                {showDeleteButton && (
                    <Button
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteButtonClick}
                        disabled={loadingRows || !deleteButtonEnabled}
                        sx={{ color: "black" }}
                    >
                        {t("delete")}
                    </Button>
                )}

                {showInvoiceButton && (
                    <Button
                        startIcon={<ReceiptIcon />}
                        onClick={handleInvoiceButtonClick}
                        disabled={loadingRows || !deleteButtonEnabled}
                        sx={{ color: "black" }}
                    >
                        {t("bill")}
                    </Button>
                )}
            </Container>
        </CustomToolbar>
    );
}

export default EditToolbar;
