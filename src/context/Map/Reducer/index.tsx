import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { MapState } from "../Context";
import { FlyToInterpolator } from "@deck.gl/core";

type Actions =
    | "UPDATED_MAP_SIZE"
    | "CHANGE_VIEW_STATE"
    | "CHANGE_ZOOM"
    | "FLY_TO_DESTINATION"
    | "CHANGE_LOADING"
    | "CHANGE_BOUNDARIES"
    | "CHANGE_FIT_BOUNDS";

export interface ActionObject {
    type: Actions;
    loading?: boolean;
    payload?: AnyObject;
    error?: AnyObject;
}

export const MapReducer = (
    initialState: MapState,
    action: ActionObject
): MapState => {
    switch (action.type) {
        case "UPDATED_MAP_SIZE":
            return {
                ...initialState,
                updatedMapSize: !initialState.updatedMapSize,
            };

        case "CHANGE_VIEW_STATE":
            return {
                ...initialState,
                viewState: {
                    ...initialState.viewState,
                    ...action.payload?.viewState,
                },
            };

        case "CHANGE_ZOOM":
            const zoom = initialState.viewState.zoom
                ? initialState.viewState.zoom
                : 12.5;
            return {
                ...initialState,
                viewState: {
                    ...initialState.viewState,
                    zoom: zoom + action.payload?.zoom,
                },
            };

        case "CHANGE_FIT_BOUNDS":
            return {
                ...initialState,
                fitBounds: action.payload?.fitBounds,
            };

        case "FLY_TO_DESTINATION":
            return {
                ...initialState,
                viewState: {
                    ...initialState.viewState,
                    ...action.payload?.destination,
                    transitionDuration: 1000,
                    transitionInterpolator: new FlyToInterpolator(),
                },
            };

        case "CHANGE_LOADING":
            return {
                ...initialState,
                isLoading: action.payload?.isLoading,
            };

        case "CHANGE_BOUNDARIES":
            return {
                ...initialState,
                boundaries: action.payload?.boundaries,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
