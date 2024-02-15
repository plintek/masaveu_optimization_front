import AddIcon from "@mui/icons-material/Add";
import CustomToolbar from "@components/basic/DataGrid/components/CustomToolbar";
import { Button } from "@mui/material";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";

interface EditToolbarProps<T> {
    handleAddRowClick: () => void;
    entityName: string;
    showAddButton?: boolean;
    loading?: boolean;
    extraToolbarElements?: React.ReactNode;
    handleImportButtonClick?: () => void;
    columns: AnyObject[];
}

function EditToolbar<T>({
    handleAddRowClick,
    entityName,
    showAddButton = true,
    loading = false,
    extraToolbarElements,
    handleImportButtonClick,
    columns,
}: EditToolbarProps<T>) {
    return (
        <CustomToolbar
            handleImportButtonClick={handleImportButtonClick}
            columns={columns}
        >
            {extraToolbarElements}
            {showAddButton && (
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddRowClick}
                    disabled={loading}
                >
                    Add {entityName}
                </Button>
            )}
        </CustomToolbar>
    );
}

export default EditToolbar;
