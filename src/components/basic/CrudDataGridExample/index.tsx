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

    const handleImportButtonClick = () => {
        // Ask for file
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".csv";
        fileInput.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                file.text().then(async (text: AnyType) => {
                    const rows = text.split("\n");
                    const headers = rows[0].split(";");
                    const realFieldHeader: AnyObject[] = [];
                    headers.forEach((header: AnyType) => {
                        realFieldHeader.push(
                            columns.find(
                                (column) =>
                                    column.headerName ===
                                    header.replace(/\r/g, "")
                            ) || {}
                        );
                    });
                    const data = [];
                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i].split(";");
                        let index = -1;
                        for (let j = 0; j < realFieldHeader.length; j++) {
                            if (realFieldHeader[j].field === "uid") {
                                index = j;
                                break;
                            }
                        }
                        const obj: AnyObject = allData[entityName].find(
                            (row: AnyObject) => row.id === row[index]
                        );
                        for (let j = 0; j < row.length; j++) {
                            obj[realFieldHeader[j].field] = row[j].replace(
                                /\r/g,
                                ""
                            );
                            if (realFieldHeader[j].field === "uid") {
                                obj["id"] = obj[realFieldHeader[j].field];
                            }
                            if (
                                realFieldHeader[j].type === "date" ||
                                realFieldHeader[j].type === "dateTime"
                            ) {
                                if (row[j] === "" || row[j] === "-") {
                                    obj[realFieldHeader[j].field] = null;
                                    continue;
                                }
                                const date = row[j].split(" ");
                                const dateArray = date[0].split("/");
                                const timeArray = date[1]
                                    ? date[1].split(":")
                                    : [];
                                obj[realFieldHeader[j].field] = new Date(
                                    Number(dateArray[2]),
                                    Number(dateArray[1]) - 1,
                                    Number(dateArray[0]),
                                    Number(timeArray[0]) || 0,
                                    Number(timeArray[1]) || 0
                                );
                            } else if (realFieldHeader[j].type === "number") {
                                obj[realFieldHeader[j].field] = Number(
                                    obj[realFieldHeader[j].field].replace(
                                        ",",
                                        "."
                                    )
                                );
                            } else if (realFieldHeader[j].type === "boolean") {
                                obj[realFieldHeader[j].field] =
                                    obj[realFieldHeader[j].field] === "true";
                            }
                        }
                        data.push(obj);
                    }
                    allData[entityName] = data;
                    const update = await ApiUtility.request({
                        url: "utils/save-data/",
                        method: "POST",
                        data: allData,
                    });
                    updateAllData?.(allData);
                    setRows(allData[entityName]);
                });
            }
        };
        fileInput.click();
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
                    editMode={isAddingRow ? "row" : "cell"}
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
                            columns,
                            handleImportButtonClick,
                            handleAddRowClick,
                            entityName,
                            showAddButton,
                            loading,
                            extraToolbarElements,
                        },
                    }}
                    sx={{
                        backgroundColor: palette.background.default,
                        borderRadius: "10px",

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
