import { AnyType } from "@interfaces/basic/Any.interface";
import { MapLayerProperty } from "@interfaces/basic/MapLayer.interface";
import React, { Dispatch, ReactElement, useReducer } from "react";
import { ActionObject, MapReducer } from "../Reducer";

const MapStateContext = React.createContext({});
const MapDispatchContext = React.createContext({});

export function useMapState(): MapState {
    const context = React.useContext(MapStateContext) as MapState;
    if (context === undefined) {
        throw new Error("useMapState must be used within a MapProvider");
    }

    return context;
}

export function useMapDispatch(): Dispatch<ActionObject> {
    const context = React.useContext(MapDispatchContext) as React.Dispatch<ActionObject>;
    if (context === undefined) {
        throw new Error("useMapDispatch must be used within a MapProvider");
    }

    return context;
}

export interface ViewState {
    longitude?: number;
    latitude?: number;
    zoom?: number;
    bearing?: number;
    pitch?: number;
    transitionDuration?: number;
    transitionInterpolator?: AnyType;
}

export interface BoundariesMap {
    latMin: number;
    latMax: number;
    longMin: number;
    longMax: number;
}

export interface MapState {
    updatedMapSize: boolean;
    isLoading: boolean;
    viewState: ViewState;
    boundaries: BoundariesMap;
}

const initialState: MapState = {
    updatedMapSize: false,
    isLoading: false,
    viewState: {
        longitude: -0.857871,
        latitude: 41.654337,
        zoom: 12.5,
        bearing: 0,
        pitch: 0,
    },
    boundaries: {
        latMin:0,
        latMax:0,
        longMin:0,
        longMax:0
    }
};

export const MapProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
    const [mapData, dispatch] = useReducer(MapReducer, initialState);

    return (
        <MapStateContext.Provider value={mapData}>
            <MapDispatchContext.Provider value={dispatch}>{children}</MapDispatchContext.Provider>
        </MapStateContext.Provider>
    );
};
