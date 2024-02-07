import React, { useEffect, useState } from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridInputRowSelectionModel,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowSelectionModel,
    MuiEvent,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import ApiUtility from "@utils/Api.utility";
import { useTheme } from "@mui/material";
import Container from "../Container";
import Loader from "@components/Loader";
import EditToolbar from "./components/EditToolbar";
import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { useNavigate } from "react-router-dom";
import useBackendApi from "@hooks/useBackendApi.hook";

interface CrudDataGridProps<T> {
    entityName?: string;
    apiEndpoint?: string;
    columns: GridColDef[];
    initialRows?: (T & { id: number })[];
    selectedRowId?: number;
    addRowLink?: string;
    editRowLink?: string;
    editRowLinkFunction?: (row: T & { id: number }) => string;
    onStartAddingRow?: (id: number) => void;
    onStartEditingRow?: (id: number) => void;
    onSavingRow?: (
        row: T & { id: number },
        action: "create" | "update"
    ) => void;
    onCancelAddingRow?: (id: number) => void;
    onCancelEditingRow?: (id: number) => void;
    onSelectionModelChange?: (id: number) => void;
    onDeleteRow?: (id: number) => void;
    showAddButton?: boolean;
    showActionsColumn?: boolean;
    showActionsFirstColumn?: boolean;
    showEditButtonFunction?: (row: T & { id: number }) => boolean;
    loading?: boolean;
    showDeleteButton?: boolean;
    extraToolbarElements?: React.ReactNode;
    allData?: AnyObject;
    updateAllData?: (allData: AnyObject) => void;
}

function CrudDataGrid<T>({
    entityName = "row",
    apiEndpoint,
    columns,
    initialRows,
    selectedRowId,
    addRowLink,
    editRowLink,
    editRowLinkFunction,
    onStartAddingRow,
    onStartEditingRow,
    onSavingRow,
    onCancelAddingRow,
    onCancelEditingRow,
    onSelectionModelChange,
    onDeleteRow,
    showAddButton = true,
    showActionsColumn = true,
    showActionsFirstColumn = false,
    showEditButtonFunction,
    loading = false,
    showDeleteButton = true,
    extraToolbarElements,
    allData = {},
    updateAllData,
}: CrudDataGridProps<T>) {
    type DataType = T & { id: number };
    const data =
        initialRows ||
        (apiEndpoint && useBackendApi<DataType[]>(apiEndpoint, null));
    const { palette } = useTheme();

    const navigate = useNavigate();

    const [rows, setRows] = useState<(DataType & { isNew?: boolean })[]>();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [selectionModel, setSelectionModel] =
        useState<GridInputRowSelectionModel>([]);

    const [fieldToFocus, setFieldToFocus] = useState<string>();
    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setRows(data.map((item) => ({ ...item, isNew: false })));
            setFieldToFocus(
                columns.find((column: AnyType) => column.field !== "id")
                    ?.field || ""
            );
        }
    }, [data]);

    useEffect(() => {
        if (selectedRowId) {
            setSelectionModel([selectedRowId]);
        }
    }, [selectedRowId]);

    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        if (editRowLinkFunction) {
            const editRowLink = editRowLinkFunction(
                rows!.find((row) => row.id === id)!
            );
            if (editRowLink) {
                navigate(editRowLink);
            }
            return;
        }
        if (editRowLink) {
            navigate(`${editRowLink}/${id}`);
            return;
        }
        onStartEditingRow?.(id as number);
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        if (
            window.confirm(
                `Are you sure you want to delete ${entityName} ${id}?`
            )
        ) {
            const saveAllData = structuredClone(allData);
            saveAllData[entityName] = saveAllData[entityName].filter(
                (row: GridRowModel) => row.id !== id
            );

            const update = await ApiUtility.request({
                url: "utils/save-data/",
                method: "POST",
                data: saveAllData,
            });
            rows && setRows(rows.filter((row) => row.id !== id));
            onDeleteRow?.(id as number);
            updateAllData?.(saveAllData);
        }
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        if (rows) {
            const editedRow = rows.find((row) => row.id === id);
            if (editedRow!.isNew) {
                setRows(rows.filter((row) => row.id !== id));
                setIsAddingRow(false);
                onCancelAddingRow?.(id as number);
            } else {
                onCancelEditingRow?.(id as number);
            }
        }
    };

    const processRowUpdate = async (newRow: GridRowModel) => {
        const isNew = newRow.isNew !== false;
        const saveAllData = structuredClone(allData);

        if (isNew) {
            const copyNewRow = structuredClone(newRow);
            saveAllData[entityName].push(copyNewRow);
        } else {
            saveAllData[entityName] = saveAllData[entityName].map(
                (row: GridRowModel) => {
                    if (row.id === newRow.id) {
                        const copyNewRow = structuredClone(newRow);
                        return copyNewRow;
                    }
                    return row;
                }
            );
        }

        const update = await ApiUtility.request({
            url: "utils/save-data/",
            method: "POST",
            data: saveAllData,
        });

        const updatedRow: GridRowModel = { ...newRow, isNew: false };
        if (rows) {
            setRows(
                rows.map((row) =>
                    row.id === newRow.id ? updatedRow : row
                ) as (DataType & { isNew?: boolean })[]
            );
        }

        updateAllData?.(saveAllData);

        onSavingRow?.(
            updatedRow as DataType & { isNew?: boolean },
            isNew ? "create" : "update"
        );

        if (isNew) {
            setIsAddingRow(false);
        }

        return updatedRow;
    };

    const handleAddRowClick = () => {
        if (addRowLink) {
            navigate(addRowLink);
            return;
        }

        if (isAddingRow) return;

        setRows((oldRows: AnyType) => {
            const newRows = oldRows ? [...oldRows] : [];
            const sortedRows = newRows.sort((a, b) => {
                return a.id < b.id ? 1 : -1;
            });

            const id = (sortedRows.length > 0 ? sortedRows[0].id : 0) + 1;
            setRowModesModel((oldModel) => {
                return {
                    ...oldModel,
                    [id]: {
                        mode: GridRowModes.Edit,
                        fieldToFocus:
                            fieldToFocus !== "" ? fieldToFocus : undefined,
                    },
                };
            });

            setIsAddingRow(true);

            onStartAddingRow?.(id);

            const newRow: AnyObject = { id, isNew: true };
            columns.forEach((column) => {
                const anyColumn = column as AnyType;
                if (
                    column.type === "singleSelect" &&
                    anyColumn.valueOptions instanceof Array
                ) {
                    const firstOption = anyColumn.valueOptions[0];
                    newRow[column.field] =
                        firstOption &&
                        typeof firstOption !== "number" &&
                        typeof firstOption !== "string"
                            ? firstOption.value
                            : "";
                }
            });

            return [newRow, ...oldRows];
        });
    };

    const handleSelectionModelChange = (
        selectionModel: GridRowSelectionModel
    ) => {
        onSelectionModelChange?.(selectionModel[0] as number);
        setSelectionModel(selectionModel);
    };

    let formattedColumns: GridColDef[] = [];

    if (showActionsColumn) {
        formattedColumns.push({
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }: GridRowParams) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color="primary"
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                const actionColumns = [];
                if (
                    !showEditButtonFunction ||
                    showEditButtonFunction(rows!.find((row) => row.id === id)!)
                ) {
                    actionColumns.push(
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />
                    );
                }
                if (showDeleteButton) {
                    actionColumns.push(
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />
                    );
                }

                return actionColumns;
            },
        });
    } else if (isAddingRow) {
        formattedColumns.push({
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }: GridRowParams) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color="primary"
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [];
            },
        });
    }

    if (showActionsFirstColumn) {
        formattedColumns = [...formattedColumns, ...columns];
    } else {
        formattedColumns = [...columns, ...formattedColumns];
    }

    return (
        <Container
            position="relative"
            height="100%"
            backgroundColor={palette.background.default}
        >
            {rows ? (
                <DataGrid
                    rows={rows}
                    columns={formattedColumns}
                    editMode="cell"
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    loading={loading}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            handleAddRowClick,
                            entityName,
                            showAddButton,
                            loading,
                            extraToolbarElements,
                        },
                    }}
                    sx={{
                        border: 0,
                        backgroundColor: palette.background.default,
                        borderRadius: "18px",
                        "& .MuiDataGrid-columnHeaders": {
                            border: 0,
                        },
                        "& .MuiDataGrid-cell": {
                            border: 0,
                        },
                        "& .MuiDataGrid-row:hover": {
                            color: "primary.main",
                        },
                    }}
                    density="compact"
                />
            ) : (
                <Loader isLoading />
            )}
        </Container>
    );
}

export default CrudDataGrid;
