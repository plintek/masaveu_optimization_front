import Container from "@components/basic/Container";
import Select, { LabelValue } from "@components/basic/Select";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { Button, useTheme } from "@mui/material";
import { spaces } from "@styles/spaces";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GenericInput from "../GenericInput";

import AddIcon from "@mui/icons-material/Add";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowId,
    GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { AnyType } from "@interfaces/basic/Any.interface";

interface GenericSelectRelationProps {
    entityName: string;
    entityKeyName: string;
    entityLabel: string;
    entities: AnyObject[];
    selectedEntities: AnyObject;
    addEntity: (entities: AnyObject) => void;
    removeEntity: (entityId: number) => void;
    extraFieldName?: string;
    extraFieldOptions?: LabelValue[];
    readonly?: boolean;
}

function GenericSelectRelation({
    entityName,
    entityKeyName,
    entityLabel,
    entities,
    selectedEntities,
    addEntity,
    removeEntity,
    extraFieldName,
    extraFieldOptions,
    readonly = false,
}: GenericSelectRelationProps) {
    const { t } = useTranslation();
    const [selectedEntity, setSelectedEntity] = useState<string>();
    const [formattedEntities, setFormattedEntities] = useState<LabelValue[]>();
    const [extraFieldValue, setExtraFieldValue] = useState<string>("");

    const [columns, setColumns] = useState<GridColDef[]>();

    const { palette } = useTheme();

    const handleSelectedEntityChange = (value: string) => {
        setSelectedEntity(value);
    };

    const handleAddEntity = () => {
        const foundEntity: AnyObject | undefined = entities.find(
            (entity) => entity.id === selectedEntity
        );

        if (foundEntity) {
            const entity = foundEntity;
            if (extraFieldName) {
                entity[extraFieldName] = extraFieldValue;
            }
            setSelectedEntity(undefined);
            addEntity(entity);
        }
    };

    const handleRemoveEntity = (id: GridRowId) => () => {
        removeEntity(parseInt(id.toString()));
    };

    const handleExtraFieldValueChange = (value: string) => {
        setExtraFieldValue(value);
    };

    useEffect(() => {
        const selectedEntitiesIds = selectedEntities.map(
            (entity: AnyObject) => entity.id
        );

        const filteredEntities = entities.filter(
            (entity) => !selectedEntitiesIds.includes(entity.id)
        );

        const formattedEntities = filteredEntities.map((entity) => ({
            label: `${entity.id} - ${entity[entityKeyName]}`,
            value: entity.id,
        }));
        setFormattedEntities(formattedEntities);
    }, [entities, selectedEntities]);

    useEffect(() => {
        const columns: GridColDef[] = [
            {
                field: entityKeyName,
                headerName: t(`${entityKeyName}`) || "",
                flex: 1,
            },
        ];

        if (extraFieldName) {
            columns.push({
                field: extraFieldName,
                headerName: t(`${extraFieldName}`) || "",
                flex: 1,
            });
        }

        if (!readonly) {
            columns.push({
                field: "actions",
                headerName: t("actions") || "",
                type: "actions",
                width: 100,
                cellClassName: "actions",
                headerAlign: "center",
                align: "center",
                getActions: ({ id }: GridRowParams) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleRemoveEntity(id)}
                        color="inherit"
                    />,
                ],
            });
        }

        setColumns(columns);
    }, [entityKeyName, extraFieldName, readonly]);

    useEffect(() => {
        if (extraFieldName && extraFieldOptions) {
            setExtraFieldValue(extraFieldOptions[0].value);
        }
    }, [extraFieldName, extraFieldOptions]);

    return (
        <Container
            flex={{ direction: "column", rowGap: spaces.l }}
            width="100%"
        >
            <Container
                flex={{
                    wrap: "wrap",
                    columnGap: spaces.mhalf,
                    rowGap: spaces.m,
                    alignItems: "flex-end",
                }}
            >
                <Select
                    id={entityName}
                    label={entityLabel}
                    emptyOption={t("selectOne") || ""}
                    value={selectedEntity || ""}
                    onChange={handleSelectedEntityChange}
                    loading={!formattedEntities}
                    options={formattedEntities || []}
                    searchOnlyInValue
                    readonly={readonly}
                />
                {extraFieldName && !extraFieldOptions && (
                    <GenericInput
                        id={extraFieldName}
                        label={t(`${extraFieldName}`) || ""}
                        value={extraFieldValue}
                        onChange={handleExtraFieldValueChange}
                        readonly={readonly}
                    />
                )}
                {extraFieldName && extraFieldOptions && (
                    <Select
                        id={extraFieldName}
                        label={t(`${extraFieldName}`) || ""}
                        value={extraFieldValue}
                        onChange={handleExtraFieldValueChange}
                        options={extraFieldOptions}
                        width="200px"
                        readonly={readonly}
                    />
                )}
                <Button
                    onClick={handleAddEntity}
                    startIcon={<AddIcon />}
                    sx={{ height: "fit-content", marginBottom: spaces.s }}
                    disabled={!selectedEntity || readonly}
                >
                    {t("add")}
                </Button>
            </Container>
            <Container
                width="100%"
                maxWidth="100%"
                height="200px"
                backgroundColor={palette.background.paper}
                border={{ radius: "15px" }}
            >
                {columns && (
                    <DataGrid
                        rows={selectedEntities as any[]}
                        columns={columns}
                        editMode="row"
                        sx={{ borderRadius: "15px" }}
                        hideFooter
                    />
                )}
            </Container>
        </Container>
    );
}

export default GenericSelectRelation;
