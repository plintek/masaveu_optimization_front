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
import Map from "@components/basic/Map";
import { GeoJsonLayer } from "@deck.gl/layers";
import { PopupProps } from "@components/basic/Map/components/Popup";
import DefaultPopupData from "@components/basic/Map/components/DefaultPopupContent";
import bbox from "@turf/bbox";
import { changeFitBounds } from "@context/Map/Actions";
import { useMapDispatch } from "@context/Map/Context";
import { PathStyleExtension } from "@deck.gl/extensions";

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
    const [layers, setLayers] = useState<AnyType[]>([]);
    const [popupProps, setPopupProps] = useState<PopupProps>();

    const mapDispatcher = useMapDispatch();

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

        let maxScore = resultData.vehicle_list.reduce(
            (max: number, vehicle: AnyObject) => {
                return vehicle.score > max ? vehicle.score : max;
            },
            0
        );
        const formattedVehicleList = resultData.vehicle_list.map(
            (vehicle: AnyObject, index: number) => {
                return {
                    ...vehicle,
                    id: vehicle.uid,
                    scoreRatio: vehicle.score / maxScore,
                };
            }
        );
        const sortedVehicles = formattedVehicleList.sort(
            (a: AnyObject, b: AnyObject) => {
                return a.score - b.score;
            }
        );

        setResult(sortedVehicles);
        setResultBest(resultData.best_vehicle);

        const vehiclesFeatures = formattedVehicleList.map(
            (vehicle: AnyObject) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            vehicle.geolocation_lon,
                            vehicle.geolocation_lat,
                        ],
                    },
                    properties: {
                        uid: vehicle.uid,
                        license_plate: vehicle.license_plate,
                        scoreRatio: vehicle.scoreRatio,
                        score: vehicle.score,
                        last_trimester_order_count:
                            vehicle.last_trimester_order_count,
                        last_trimester_mileage_count:
                            vehicle.last_trimester_mileage_count,
                    },
                };
            }
        );

        const orderGeojson = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            resultData.order.origin.lon,
                            resultData.order.origin.lat,
                        ],
                    },
                    properties: {
                        type: "origin",
                    },
                },
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            resultData.order.destination.lon,
                            resultData.order.destination.lat,
                        ],
                    },
                    properties: {
                        type: "destination",
                    },
                },
            ],
        };
        const vehiclesGeojson = {
            type: "FeatureCollection",
            features: vehiclesFeatures,
        };

        const linesBetweenVehiclesAndOrder = {
            type: "FeatureCollection",
            features: [
                ...vehiclesFeatures.map((vehicle: AnyObject) => {
                    return {
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: [
                                [
                                    vehicle.geometry.coordinates[0],
                                    vehicle.geometry.coordinates[1],
                                ],
                                [
                                    resultData.order.origin.lon,
                                    resultData.order.origin.lat,
                                ],
                            ],
                        },
                        properties: {
                            isBestVehicle:
                                vehicle.properties.uid ===
                                resultData.best_vehicle.uid,
                            type: "vehicle",
                        },
                    };
                }),
            ],
        };

        const lineBetweenDestinationAndOrigin = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: [
                            [
                                resultData.order.origin.lon,
                                resultData.order.origin.lat,
                            ],
                            [
                                resultData.order.destination.lon,
                                resultData.order.destination.lat,
                            ],
                        ],
                    },
                    properties: {
                        id: resultData.order.uid,
                        type: "order",
                    },
                },
            ],
        };

        const layers = [
            new GeoJsonLayer({
                id: "lines",
                data: linesBetweenVehiclesAndOrder,
                pickable: true,
                getLineWidth: (d: AnyType) => {
                    if (d.properties.isBestVehicle) {
                        return 80;
                    }
                    return 50;
                },
                lineWidthMinPixels: 2,
                lineWidthUnits: "meters",
                getLineColor: (d: AnyType) => {
                    if (d.properties.isBestVehicle) {
                        return [0, 255, 0, 255];
                    }
                    return [160, 160, 160, 255];
                },
                getDashArray: (d: AnyType) => {
                    if (d.properties.isBestVehicle) {
                        return [0, 0];
                    }
                    return [3, 2];
                },
                dashJustified: true,
                dashGapPickable: true,
                extensions: [new PathStyleExtension({ dash: true })],
            }),
            new GeoJsonLayer({
                id: "lines",
                data: lineBetweenDestinationAndOrigin,
                pickable: true,
                getLineWidth: 50,
                lineWidthMinPixels: 2,
                lineWidthUnits: "meters",
                getLineColor: (d: AnyType) => {
                    return [50, 50, 50, 255];
                },
            }),
            new GeoJsonLayer({
                id: "order",
                data: orderGeojson,
                pickable: true,
                stroked: true,
                filled: true,
                extruded: true,
                pointRadiusMinPixels: 5,
                getRadius: 100,
                getFillColor: [50, 50, 50, 255],
                onHover: (info: any) => {
                    if (info.object) {
                        const { x, y } = info;
                        let extraProps = info.object.properties;

                        setPopupProps({
                            position: { x, y },
                            visible: true,
                            content: (
                                <DefaultPopupData
                                    data={{
                                        entityName: "vehicles",
                                        extraProps,
                                    }}
                                />
                            ),
                        });
                    }
                },
            }),
            new GeoJsonLayer({
                id: "vehicles",
                data: vehiclesGeojson,
                pickable: true,
                stroked: true,
                filled: true,
                extruded: true,
                pointRadiusMinPixels: 5,
                getRadius: 100,
                getFillColor: (d: AnyType) => {
                    const scoreRatio = d.properties.scoreRatio;
                    if (scoreRatio < 0.3) {
                        return [0, 255, 0, 255];
                    } else if (scoreRatio < 0.7) {
                        return [255, 255, 0, 255];
                    }
                    return [255, 0, 0, 255];
                },
                onHover: (info: any) => {
                    if (info.object) {
                        const { x, y } = info;
                        let extraProps = info.object.properties;
                        delete extraProps.scoreRatio;

                        setPopupProps({
                            position: { x, y },
                            visible: true,
                            content: (
                                <DefaultPopupData
                                    data={{
                                        entityName: "vehicles",
                                        extraProps,
                                    }}
                                />
                            ),
                        });
                    }
                },
            }),
        ];

        setLayers(layers);

        const bboxCalculation = bbox(orderGeojson);

        setTimeout(() => {
            changeFitBounds(mapDispatcher, bboxCalculation);
        }, 1000);

        if (!resultData.best_vehicle) {
            setNoVehicles(true);
        } else {
            setNoVehicles(false);
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
            width: 200,
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
            width: 150,
            type: "number",
        },
        {
            field: "geolocation_lon",
            headerName: "Longitude",
            width: 150,
            type: "number",
        },
        {
            field: "last_trimester_order_count",
            headerName: "Last Trimester Order Count",
            type: "number",
            width: 200,
        },
        {
            field: "last_trimester_mileage_count",
            headerName: "Last Trimester Mileage Count",
            type: "number",
            width: 250,
        },
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
    ].map((column) => ({
        ...column,
        editable: true,
        type: vehiclesDateKeys.includes(column.field)
            ? "date"
            : column.type || "string",
        valueGetter: (params: AnyType) =>
            vehiclesDateKeys.includes(column.field)
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
            type: "number",
        },
    ];

    const ordersColumns = [
        { field: "uid", headerName: "UID", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "deadline_date",
            headerName: "Deadline Date",
            width: 200,
            type: "dateTime",
        },
        {
            field: "delivery_date",
            headerName: "Delivery Date",
            width: 200,
            type: "dateTime",
        },
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
        { field: "date", headerName: "Date", width: 200, type: "dateTime" },
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
            headerName: "PEX",
            width: 250,
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
            width: 250,
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
        valueGetter: (params: AnyType) =>
            ordersDateKeys.includes(column.field)
                ? new Date(params.row[column.field])
                : params.row[column.field],
        valueFormatter: (params: AnyType) =>
            column.valueFormatter
                ? column.valueFormatter(params)
                : ordersDateKeys.includes(column.field)
                  ? DateUtility.formatDatetime(new Date(params.value))
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
                        <Container width="100%" margin={{ top: spaces.mhalf }}>
                            <BodyText>
                                {resultBest.uid} - {resultBest.license_plate}
                            </BodyText>
                        </Container>
                    </Container>

                    <Container
                        width="100%"
                        minHeight="800px"
                        padding={{ bottom: spaces.xxl }}
                    >
                        <Map layers={layers} popupProps={popupProps} />
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
