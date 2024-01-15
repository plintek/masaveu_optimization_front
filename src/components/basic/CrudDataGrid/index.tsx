import React, { useEffect, useRef, useState } from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridFilterModel,
    GridInputRowSelectionModel,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowParams,
    GridRowSelectionModel,
    GridSortModel,
    MuiEvent,
    gridFilteredSortedRowEntriesSelector,
    useGridApiRef,
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
import useBackendApi from "@hooks/useBackendApi.hook";
import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { spaces } from "@styles/spaces";
import { useNavigate } from "react-router-dom";
import UserRolesUtility from "@utils/UserRoles.utility";
import { useAuthState } from "@context/Auth/Context";

interface CrudDataGridProps<T> {
    entityName?: string;
    apiEndpoint?: string;
    columns: GridColDef[];
    initialRows?: (T & { id: number })[];
    selectedRowId?: number;
    onStartAddingRow?: (id: number) => void;
    onSavingRow?: (
        row: T & { id: number },
        action: "create" | "update"
    ) => void;
    onSelectionModelChange?: (id: number) => void;
    onDeleteRows?: (ids: number[]) => void;
    onPrintButtonClick?: (data: T) => void;
    showAddButton?: boolean;
    showActionsColumn?: boolean;
    loading?: boolean;
    showPrintButton?: boolean;
    addLink?: string;
    viewLink?: string;
    showGoBackToDeliveryNotesButton?: boolean;
    includeRoles?: boolean;
    showInvoiceButton?: boolean;
    onInvoiceButtonClick?: (data: T[]) => void;
    showExportButton?: boolean;
    refresh?: boolean;
    children?: React.ReactNode;
    onFilteredRowsChange?: (data: T[]) => void;
    initialSortingModel?: GridSortModel;
    initialFilterModel?: GridFilterModel;
}

function CrudDataGrid<T>({
    entityName = "row",
    apiEndpoint,
    columns,
    initialRows,
    selectedRowId,
    onStartAddingRow,
    onSavingRow,
    onSelectionModelChange,
    onDeleteRows,
    onPrintButtonClick,
    showAddButton = true,
    showActionsColumn = false,
    loading = false,
    showPrintButton = false,
    addLink,
    viewLink,
    showGoBackToDeliveryNotesButton = false,
    includeRoles = true,
    showInvoiceButton = false,
    showExportButton = true,
    onInvoiceButtonClick,
    refresh,
    children,
    onFilteredRowsChange,
    initialSortingModel,
    initialFilterModel,
}: CrudDataGridProps<T>) {
    type DataType = T & { id: number };

    const { user } = useAuthState();
    const [update, setUpdate] = useState<boolean>(false);
    const [loadingRows, setLoadingRows] = useState<boolean>(loading);

    const apiRef = useGridApiRef();

    const data =
        initialRows ||
        (apiEndpoint && useBackendApi<DataType[]>(apiEndpoint, null, update));
    const { palette } = useTheme();

    const [rows, setRows] = useState<(DataType & { isNew?: boolean })[]>();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [selectionModel, setSelectionModel] =
        useState<GridInputRowSelectionModel>([]);
    const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(false);
    const [viewButtonEnabled, setViewButtonEnabled] = useState(false);

    const [fieldToFocus, setFieldToFocus] = useState<string>();

    const [isAddingRow, setIsAddingRow] = useState<boolean>(false);

    const [formattedColumns, setFormattedColumns] = useState<GridColDef[]>([]);

    const [filterModel, setFilterModel] = useState<GridFilterModel>();

    const navigate = useNavigate();

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

    const deleteEntity = (ids: number | number[]) => {
        const formattedIds = Array.isArray(ids) ? ids : [ids];

        apiEndpoint &&
            ApiUtility.request({
                url: `${apiEndpoint}`,
                method: "DELETE",
                data: { ids },
            });

        setRows(
            (prevRows) =>
                prevRows &&
                prevRows.filter((row) => !formattedIds.includes(row.id))
        );
        onDeleteRows?.(formattedIds);
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        if (
            window.confirm(
                `Are you sure you want to delete ${entityName} ${id}?`
            )
        ) {
            deleteEntity(id as number);
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
            }
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const isNew = newRow.isNew !== false;

        if (isNew) {
            apiEndpoint &&
                ApiUtility.request({
                    url: apiEndpoint,
                    method: "POST",
                    data: newRow,
                });
        } else {
            const putRow = { ...newRow };
            delete putRow.isNew;
            delete putRow.id;

            apiEndpoint &&
                ApiUtility.request({
                    url: `${apiEndpoint}/${newRow.id}`,
                    method: "PUT",
                    data: putRow,
                });
        }

        const updatedRow: GridRowModel = { ...newRow, isNew: false };
        if (rows) {
            setRows(
                rows.map((row) =>
                    row.id === newRow.id ? updatedRow : row
                ) as (DataType & { isNew?: boolean })[]
            );
        }

        onSavingRow?.(
            updatedRow as DataType & { isNew?: boolean },
            isNew ? "create" : "update"
        );

        if (isNew) {
            setIsAddingRow(false);
        }

        return updatedRow;
    };

    const handleAddButtonClick = () => {
        if (addLink) {
            navigate(addLink);
        } else {
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

                setIsAddingRow(true);

                return [newRow, ...oldRows];
            });
        }
    };

    const handleUpdateButtonClick = () => {
        setLoadingRows(true);
        setUpdate((prev) => !prev);
    };

    const handleDeleteButtonClick = () => {
        if (
            window.confirm(`Are you sure you want to delete selected entities?`)
        ) {
            deleteEntity(selectionModel as number[]);
        }
    };

    const handleViewButtonClick = () => {
        if (viewLink) {
            navigate(`${viewLink}/${(selectionModel as number[])[0]}`);
        }
    };

    const handleSelectionModelChange = (
        selectionModel: GridRowSelectionModel
    ) => {
        onSelectionModelChange?.(selectionModel[0] as number);
        setSelectionModel(selectionModel);

        setDeleteButtonEnabled(selectionModel.length !== 0);
        setViewButtonEnabled(selectionModel.length === 1);
    };

    const handlePrintButtonClick = () => {
        if (selectionModel && (selectionModel as number[])[0]) {
            const item =
                Array.isArray(data) &&
                data?.find(
                    (item) => item.id === (selectionModel as number[])[0]
                );
            if (item) {
                onPrintButtonClick?.(item);
            }
        }
    };

    const handleInvoiceButtonClick = () => {
        if (selectionModel && (selectionModel as number[])[0]) {
            const items =
                Array.isArray(data) &&
                data?.filter((item) =>
                    (selectionModel as number[])?.includes(item.id as number)
                );
            if (items) {
                onInvoiceButtonClick?.(items);
            }
        }
    };

    const handleFilterModelChange = (model: GridFilterModel) => {
        setFilterModel(model);
        setTimeout(() => {
            const filteredRows = gridFilteredSortedRowEntriesSelector(apiRef);
            onFilteredRowsChange?.(filteredRows.map((row) => row.model as T));
        }, 200);
    };

    useEffect(() => {
        if (data) {
            setRows(data.map((item: AnyType) => ({ ...item, isNew: false })));
            setFieldToFocus(
                columns.find((column: AnyType) => column.field !== "id")
                    ?.field || ""
            );
            setLoadingRows(false);
        }
    }, [data]);

    useEffect(() => {
        setLoadingRows(loading);
    }, [loading]);

    useEffect(() => {
        if (selectedRowId) {
            setSelectionModel([selectedRowId]);
        }
    }, [selectedRowId]);

    useEffect(() => {
        setUpdate((prev) => !prev);
    }, [refresh]);

    useEffect(() => {
        rows && onFilteredRowsChange?.(rows);
    }, [rows]);

    useEffect(() => {
        initialFilterModel &&
            setTimeout(() => {
                setFilterModel(initialFilterModel);
            }, 1500);
    }, [initialFilterModel]);

    useEffect(() => {
        const formattedColumns: GridColDef[] = [...columns];
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

                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
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

        setFormattedColumns(formattedColumns);
    }, [columns, showActionsColumn, isAddingRow, rowModesModel]);

    return (
        <Container
            position="relative"
            height="100%"
            minHeight="200px"
            backgroundColor={palette.grey[100]}
            border={{ all: "none", radius: "18px" }}
            padding={{ all: spaces.m }}
            flex={{ direction: "column" }}
        >
            {rows ? (
                <DataGrid
                    rows={rows}
                    columns={formattedColumns}
                    editMode="row"
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowModesModel={rowModesModel}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    loading={loadingRows}
                    checkboxSelection
                    apiRef={apiRef}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    autoPageSize
                    initialState={{
                        sorting: {
                            sortModel: initialSortingModel,
                        },
                        filter: {
                            filterModel: initialFilterModel,
                        },
                    }}
                    rowHeight={40}
                    filterModel={filterModel}
                    onFilterModelChange={handleFilterModelChange}
                    hideFooterSelectedRowCount
                    slotProps={{
                        toolbar: {
                            handleAddButtonClick,
                            handleUpdateButtonClick,
                            handleDeleteButtonClick,
                            handleViewButtonClick,
                            handlePrintButtonClick,
                            handleInvoiceButtonClick,
                            entityName,
                            showAddButton:
                                showAddButton &&
                                (!includeRoles ||
                                    UserRolesUtility.hasAccessToEntity(
                                        user.role,
                                        entityName,
                                        "create"
                                    )),
                            loadingRows,
                            isAddingRow,
                            showPrintButton,
                            showDeleteButton:
                                !includeRoles ||
                                UserRolesUtility.hasAccessToEntity(
                                    user.role,
                                    entityName,
                                    "delete"
                                ),
                            deleteButtonEnabled,
                            showViewButton:
                                !includeRoles ||
                                UserRolesUtility.hasAccessToEntity(
                                    user.role,
                                    entityName,
                                    "read"
                                ),
                            viewButtonEnabled,
                            showGoBackToDeliveryNotesButton,
                            showInvoiceButton,
                            showExportButton,
                        },
                    }}
                    sx={{
                        border: 0,
                        "& .MuiDataGrid-main": {
                            backgroundColor: palette.background.default,
                            margin: `${spaces.m} 0 ${spaces.mhalf} 0`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            border: 0,
                        },
                        "& .MuiDataGrid-cell": {
                            border: 0,
                        },
                        "& .MuiDataGrid-row:hover": {
                            color: "primary.main",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            border: 0,
                        },
                    }}
                />
            ) : (
                <Loader isLoading />
            )}

            {rows && children}
        </Container>
    );
}

export default CrudDataGrid;
