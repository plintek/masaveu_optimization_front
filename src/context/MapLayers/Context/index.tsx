import { useAuthState } from "@context/Auth/Context";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { MapLayerProperty } from "@interfaces/basic/MapLayer.interface";
import React, { Dispatch, ReactElement, useReducer } from "react";
import { ActionObject, MapLayersReducer } from "../Reducer";

const MapLayersStateContext = React.createContext({});
const MapLayersDispatchContext = React.createContext({});

export function useMapLayersState(): MapLayersState {
    const context = React.useContext(MapLayersStateContext) as MapLayersState;
    if (context === undefined) {
        throw new Error(
            "useMapLayersState must be used within a MapLayersProvider"
        );
    }

    return context;
}

export function useMapLayersDispatch(): Dispatch<ActionObject> {
    const context = React.useContext(
        MapLayersDispatchContext
    ) as React.Dispatch<ActionObject>;
    if (context === undefined) {
        throw new Error(
            "useMapLayersDispatch must be used within a MapLayersProvider"
        );
    }

    return context;
}

export type RouteType = "planned" | "fixed" | "executed";
export interface Company {
    id?: string;
    name?: string;
}

export interface MapLayersState {
    layerProperties: MapLayerProperty[];
    filters: AnyObject[];
    dateSelected: Date;
    mapLayers: AnyObject[];
    activeRouteTypes: RouteType[];
    showTransportation: boolean;
    company: Company;
    filtersStop: string[];
}
const initialState: MapLayersState = {
    layerProperties: [
        {
            name: "sostenibility",
            visible: false,
            active: false,
            layers: [
                {
                    name: "nox",
                    type: "heatmap",
                    active: false,
                    fillColor: [249, 28, 97, 255],
                },
                {
                    name: "co2",
                    type: "heatmap",
                    active: false,
                    fillColor: [249, 28, 97, 255],
                },
                {
                    name: "noise",
                    type: "heatmap",
                    active: false,
                    fillColor: [249, 28, 97, 255],
                },
            ],
        },
        {
            name: "accesibility",
            visible: false,
            active: false,
            layers: [],
        },
        {
            name: "efficiency",
            visible: false,
            active: false,
            layers: [
                {
                    name: "navigation",
                    active: false,
                    lineColor: [249, 28, 97, 255],
                    type: "line",
                    pointType: "",
                },
                {
                    name: "stops",
                    active: false,
                    fillColor: [0, 0, 0, 255],
                    type: "point",
                    pointType: "circle",
                },
                {
                    name: "restrictions",
                    type: "polygon",
                    active: false,
                    fillColor: [249, 28, 97, 60],
                    lineColor: [249, 28, 97, 255],
                },
                {
                    name: "parkings",
                    type: "polygon",
                    active: false,
                    fillColor: [249, 28, 97, 255],
                },
                {
                    name: "depots",
                    type: "point",
                    active: false,
                    fillColor: [249, 28, 97, 60],
                    lineColor: [249, 28, 97, 255],
                },
                {
                    name: "lockers",
                    type: "point",
                    active: false,
                    fillColor: [249, 28, 97, 255],
                },
            ],
        },
    ],
    dateSelected: new Date(),
    filters: [
        {
            name: "capacity",
            layers: ["stops", "order"],
            value: 160,
            visible: true,
        },
    ],
    mapLayers: [],
    activeRouteTypes: ["planned"],
    showTransportation: false,
    company: { id: "all" },
    filtersStop: [],
};

export const MapLayersProvider = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const [mapLayersData, dispatch] = useReducer(
        MapLayersReducer,
        initialState
    );

    return (
        <MapLayersStateContext.Provider value={mapLayersData}>
            <MapLayersDispatchContext.Provider value={dispatch}>
                {children}
            </MapLayersDispatchContext.Provider>
        </MapLayersStateContext.Provider>
    );
};
