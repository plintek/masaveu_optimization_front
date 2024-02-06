import AddIcon from "@mui/icons-material/Add";
import CustomToolbar from "@components/basic/DataGrid/components/CustomToolbar";
import { Button } from "@mui/material";

interface EditToolbarProps<T> {
    handleAddRowClick: () => void;
    entityName: string;
    showAddButton?: boolean;
    loading?: boolean;
    extraToolbarElements?: React.ReactNode;
}

function EditToolbar<T>({
    handleAddRowClick,
    entityName,
    showAddButton = true,
    loading = false,
    extraToolbarElements,
}: EditToolbarProps<T>) {
    return (
        <CustomToolbar>
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
