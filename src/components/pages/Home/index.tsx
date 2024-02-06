import React, { ReactElement, useEffect, useState } from "react";

import MainContainer from "@components/MainContainer";
import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControlLabel } from "@mui/material";
import { spaces } from "@styles/spaces";
import { AnyType } from "@interfaces/basic/Any.interface";
import Container from "@components/basic/Container";
import { BodyText, Title } from "@components/basic/Text";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@components/basic/Select";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import CrudDataGridExample from "@components/basic/CrudDataGridExample";
import ApiUtility from "@utils/Api.utility";
import DateUtility from "@utils/Date.utility";

export interface HomeTab {
    id: string;
    label: string;
    pageTitle: string;
    component: AnyType;
    show: boolean;
}

const truckTypes = ["trailer", "cuba"];

const vehiclesDateKeys = [
    "card_expiration",
    "permission_expiration",
    "itv_expiration",
    "insurance_expiration",
    "extinguisher_expiration",
    "waste_expiration",
    "pressure_expiration",
    "compressor_expiration",
    "suspension_expiration",
    "tachograph_expiration",
];
const ordersDateKeys = ["deadline_date", "delivery_date", "date"];

const locationsColumns = [
    { field: "uid", headerName: "UID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "lat", headerName: "Latitude", width: 150, type: "number" },
    { field: "lon", headerName: "Longitude", width: 150, type: "number" },
    { field: "country", headerName: "Country", width: 150 },
    {
        field: "max_height",
        headerName: "Max Height",
        width: 150,
        type: "number",
    },
    {
        field: "load_type",
        headerName: "Load Type",
        width: 150,
        type: "singleSelect",
        valueOptions: truckTypes.map((truckType: string) => ({
            value: truckType,
            label: truckType,
        })),
    },
].map((column) => ({
    ...column,
    editable: true,
    type: column.type || "string",
}));

function Home(): ReactElement {
    const [allData, setAllData] = useState<AnyObject>({});

    const [selectedOrder, setSelectedOrder] = useState<string>("ORDER-TEST-1");
    const [forceClean, setForceClean] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AnyObject[]>([]);
    const [resultBest, setResultBest] = useState<AnyObject>();
    const [noVehicles, setNoVehicles] = useState<boolean>(false);

    const handleExecuteProcess = async () => {
        setLoading(true);
        const resultData = await ApiUtility.request({
            url: "utils/execute-algorithm/",
            method: "POST",
            data: {
                order_id: selectedOrder,
                force_clean: forceClean,
            },
        });

        setResult(resultData.vehicle_list);
        setResultBest(resultData.best_vehicle);
        if (!resultData.best_vehicle) {
            setNoVehicles(true);
        }
        setLoading(false);
    };

    const updateAllData = (allData: AnyObject) => {
        setAllData(allData);
    };

    useEffect(() => {
        (async () => {
            const data = await ApiUtility.request({
                url: "utils/load-data",
            });

            if (data.orders && data.vehicles) {
                const formattedOrders = data.orders.map((order: AnyObject) => {
                    return {
                        ...order,
                        id: order.uid,
                    };
                });
                const formattedVehicles = data.vehicles.map(
                    (vehicle: AnyObject) => {
                        return {
                            ...vehicle,
                            id: vehicle.uid,
                        };
                    }
                );
                const formattedPexs = data.pexs.map((pex: AnyObject) => {
                    return {
                        ...pex,
                        id: pex.uid,
                    };
                });
                const formattedDestinations = data.destinations.map(
                    (destination: AnyObject) => {
                        return {
                            ...destination,
                            id: destination.uid,
                        };
                    }
                );
                setAllData({
                    orders: formattedOrders,
                    vehicles: formattedVehicles,
                    pexs: formattedPexs,
                    destinations: formattedDestinations,
                });
            }
        })();
    }, []);

    const vehiclesColumns = [
        {
            field: "uid",
            headerName: "UID",
            width: 150,
        },
        { field: "vehicle_code", headerName: "Vehicle Code", width: 150 },
        { field: "license_plate", headerName: "License Plate", width: 150 },
        {
            field: "card_expiration",
            headerName: "Card Expiration",
            width: 150,
        },
        {
            field: "permission_expiration",
            headerName: "Permission Expiration",
            width: 150,
        },
        { field: "itv_expiration", headerName: "ITV Expiration", width: 150 },
        {
            field: "insurance_expiration",
            headerName: "Insurance Expiration",
            width: 150,
        },
        {
            field: "extinguisher_expiration",
            headerName: "Extinguisher Expiration",
            width: 150,
        },
        {
            field: "waste_expiration",
            headerName: "Waste Expiration",
            width: 150,
        },
        {
            field: "pressure_expiration",
            headerName: "Pressure Expiration",
            width: 150,
        },
        {
            field: "compressor_expiration",
            headerName: "Compressor Expiration",
            width: 150,
        },
        {
            field: "suspension_expiration",
            headerName: "Suspension Expiration",
            width: 150,
        },
        {
            field: "tachograph_expiration",
            headerName: "Tachograph Expiration",
            width: 150,
        },
        { field: "active", headerName: "Active", width: 150, type: "boolean" },
        {
            field: "can_go_international",
            headerName: "Can Go International",
            width: 200,
            type: "boolean",
        },
        { field: "mileage", headerName: "Mileage", width: 150, type: "number" },
        { field: "hours", headerName: "Hours", width: 150, type: "number" },
        {
            field: "gross_vehicle_weight",
            headerName: "Gross Vehicle Weight",
            width: 150,
        },
        {
            field: "tare_weight",
            headerName: "Tare Weight",
            width: 150,
            type: "number",
        },
        { field: "height", headerName: "Height", width: 150, type: "number" },
        {
            field: "truck_type_name",
            headerName: "Truck Type Name",
            width: 150,
            type: "singleSelect",
            valueOptions: truckTypes.map((truckType: string) => ({
                value: truckType,
                label: truckType,
            })),
        },
        {
            field: "assigned_pex",
            headerName: "Assigned Pex",
            width: 150,
            type: "singleSelect",
            valueOptions: allData.pexs
                ? allData.pexs.map((pex: AnyObject) => ({
                      value: pex.uid,
                      label: pex.name,
                  }))
                : [],
            valueFormatter: (params: AnyType) => {
                const pex = allData.pexs.find(
                    (pex: AnyObject) => pex.uid === params.value
                );
                return pex ? pex.name : "";
            },
        },
        {
            field: "geolocation_lat",
            headerName: "Latitude",
            width: 300,
            type: "number",
            valueGetter: (params: AnyType) =>
                params.row.geolocation?.lat || params.value,
        },
        {
            field: "geolocation_lon",
            headerName: "Longitude",
            width: 300,
            type: "number",
            valueGetter: (params: AnyType) =>
                params.row.geolocation?.lon || params.value,
        },
        {
            field: "last_trimester_order_count",
            headerName: "Last Trimester Order Count",
            type: "number",
            width: 150,
        },
        {
            field: "last_trimester_mileage_count",
            headerName: "Last Trimester Mileage Count",
            type: "number",
            width: 150,
        },
    ].map((column) => ({
        ...column,
        editable: true,
        type: vehiclesDateKeys.includes(column.field)
            ? "date"
            : column.type || "string",
        valueGetter: (params: AnyType) =>
            column.valueGetter
                ? column.valueGetter(params)
                : vehiclesDateKeys.includes(column.field)
                ? new Date(params.row[column.field])
                : params.row[column.field],
        valueFormatter: (params: AnyType) =>
            column.valueFormatter
                ? column.valueFormatter(params)
                : vehiclesDateKeys.includes(column.field)
                ? DateUtility.formatDate(new Date(params.value))
                : params.value,
    }));

    const resultVehiclesColumns = [
        ...vehiclesColumns,
        {
            field: "score",
            headerName: "Score",
            width: 150,
        },
    ];

    const ordersColumns = [
        { field: "uid", headerName: "UID", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "deadline_date", headerName: "Deadline Date", width: 150 },
        { field: "delivery_date", headerName: "Delivery Date", width: 150 },
        {
            field: "assigned_truck",
            headerName: "Assigned Truck",
            width: 150,
            type: "singleSelect",
            valueOptions: allData.vehicles
                ? allData.vehicles.map((vehicle: AnyObject) => ({
                      value: vehicle.license_plate,
                      label: vehicle.license_plate,
                  }))
                : [],
            valueFormatter: (params: AnyType) => {
                const vehicle = allData.vehicles.find(
                    (vehicle: AnyObject) =>
                        vehicle.license_plate === params.value
                );
                return vehicle ? vehicle.license_plate : "";
            },
        },
        { field: "date", headerName: "Date", width: 150 },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 150,
            type: "number",
        },
        {
            field: "truck_type",
            headerName: "Truck Type",
            width: 150,
            type: "singleSelect",
            valueOptions: truckTypes.map((truckType: string) => ({
                value: truckType,
                label: truckType,
            })),
        },
        { field: "material", headerName: "Material", width: 150 },
        {
            field: "origin",
            headerName: "Origin",
            width: 300,
            type: "singleSelect",
            valueOptions: allData.pexs
                ? allData.pexs.map((pex: AnyObject) => ({
                      value: pex.uid,
                      label: pex.name,
                  }))
                : [],
            valueFormatter: (params: AnyType) => {
                const pex = allData.pexs.find(
                    (pex: AnyObject) => pex.uid === params.value
                );
                return pex ? pex.name : "";
            },
        },
        {
            field: "destination",
            headerName: "Destination",
            width: 300,
            type: "singleSelect",
            valueOptions: allData.destinations
                ? allData.destinations.map((destination: AnyObject) => ({
                      value: destination.uid,
                      label: destination.name,
                  }))
                : [],
            valueFormatter: (params: AnyType) => {
                const destination = allData.destinations.find(
                    (destination: AnyObject) => destination.uid === params.value
                );
                return destination ? destination.name : "";
            },
        },
    ].map((column) => ({
        ...column,
        editable: true,
        type: ordersDateKeys.includes(column.field)
            ? "date"
            : column.type || "string",
        valueGetter: (params: AnyType) =>
            ordersDateKeys.includes(column.field)
                ? new Date(params.row[column.field])
                : params.row[column.field],
        valueFormatter: (params: AnyType) =>
            column.valueFormatter
                ? column.valueFormatter(params)
                : ordersDateKeys.includes(column.field)
                ? DateUtility.formatDate(new Date(params.value))
                : params.value,
    }));

    return (
        <MainContainer>
            <Container flex={{ columnGap: spaces.l }}>
                <Container width="49%">
                    <Title>PEX</Title>
                    <Container
                        width="100%"
                        height="500px"
                        margin={{ top: spaces.mhalf }}
                    >
                        <CrudDataGridExample<AnyType>
                            initialRows={allData.pexs}
                            columns={locationsColumns}
                            allData={allData}
                            showActionsColumn
                            showActionsFirstColumn
                            entityName="pexs"
                            updateAllData={updateAllData}
                        />
                    </Container>
                </Container>
                <Container width="49%">
                    <Title>Destinations</Title>
                    <Container
                        width="100%"
                        height="500px"
                        margin={{ top: spaces.mhalf }}
                    >
                        <CrudDataGridExample<AnyType>
                            initialRows={allData.destinations}
                            columns={locationsColumns}
                            allData={allData}
                            showActionsColumn
                            showActionsFirstColumn
                            entityName="destinations"
                            updateAllData={updateAllData}
                        />
                    </Container>
                </Container>
            </Container>
            <Container>
                <Title>Vehicles</Title>
                <Container
                    width="100%"
                    height="500px"
                    margin={{ top: spaces.mhalf }}
                >
                    <CrudDataGridExample<AnyType>
                        initialRows={allData.vehicles}
                        columns={vehiclesColumns}
                        allData={allData}
                        showActionsColumn
                        showActionsFirstColumn
                        entityName="vehicles"
                        updateAllData={updateAllData}
                    />
                </Container>
            </Container>
            <Container margin={{ top: spaces.lhalf }}>
                <Title>Orders</Title>
                <Container
                    width="100%"
                    height="500px"
                    margin={{ top: spaces.mhalf }}
                >
                    <CrudDataGridExample<AnyType>
                        initialRows={allData.orders}
                        columns={ordersColumns}
                        allData={allData}
                        showActionsColumn
                        showActionsFirstColumn
                        entityName="orders"
                        updateAllData={updateAllData}
                    />
                </Container>
            </Container>
            <Container
                margin={{ top: spaces.lhalf }}
                padding={{ bottom: spaces.lhalf }}
            >
                <Title>Input data</Title>
                <Container
                    width="100%"
                    margin={{ top: spaces.mhalf }}
                    flex={{ columnGap: spaces.l, alignItems: "flex-end" }}
                >
                    <Select
                        label="Select an order"
                        options={
                            allData.orders
                                ? allData.orders.map((order: AnyObject) => ({
                                      value: order.id,
                                      label: order.id,
                                  }))
                                : []
                        }
                        value={selectedOrder}
                        onChange={(value) => setSelectedOrder(value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={forceClean}
                                onChange={(e) =>
                                    setForceClean(e.target.checked)
                                }
                            />
                        }
                        label="Force Clean"
                    />
                </Container>
                <Container margin={{ top: spaces.mhalf }}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color="primary"
                        onClick={handleExecuteProcess}
                    >
                        Execute process
                    </LoadingButton>
                </Container>
            </Container>

            {resultBest && (
                <>
                    <Container
                        margin={{ top: spaces.lhalf }}
                        padding={{ bottom: spaces.lhalf }}
                    >
                        <Title>Result Table</Title>
                        <Container
                            width="100%"
                            height="500px"
                            margin={{ top: spaces.mhalf }}
                        >
                            <DataGrid
                                rows={result}
                                columns={resultVehiclesColumns}
                            />
                        </Container>
                    </Container>

                    <Container
                        margin={{ top: spaces.lhalf }}
                        padding={{ bottom: spaces.lhalf }}
                    >
                        <Title>Result Best</Title>
                        <Container
                            width="100%"
                            height="500px"
                            margin={{ top: spaces.mhalf }}
                        >
                            <BodyText>{resultBest.license_plate}</BodyText>
                        </Container>
                    </Container>
                </>
            )}

            {noVehicles && (
                <Container
                    margin={{ top: spaces.s }}
                    padding={{ bottom: spaces.xl }}
                >
                    <Title>No vehicles available</Title>
                </Container>
            )}
        </MainContainer>
    );
}

export default Home;
