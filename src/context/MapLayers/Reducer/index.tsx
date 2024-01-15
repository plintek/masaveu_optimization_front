import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { MapLayersState } from "../Context";

type Actions =
    | "CHANGE_ACTIVE_MAP_LAYERS"
    | "CHANGE_VISIBLE_MAP_LAYER_PROPERTIES"
    | "CHANGE_FILTERS"
    | "CHANGE_DATE_SELECTED"
    | "CHANGE_MAP_LAYERS"
    | "CHANGE_ACTIVE_ROUTE_TYPES"
    | "CHANGE_COMPANY"
    | "TOGGLE_SHOW_TRANSPORTATION"
    | "CHANGE_LIST_FILTER_STOPS";

export interface ActionObject {
    type: Actions;
    loading?: boolean;
    payload?: AnyObject;
    error?: AnyObject;
}

export const MapLayersReducer = (initialState: MapLayersState, action: ActionObject): MapLayersState => {
    switch (action.type) {
        case "CHANGE_ACTIVE_MAP_LAYERS":
            if (action.payload?.mapLayerProperty && action.payload?.mapLayer) {
                const mapLayerProperty = action.payload.mapLayerProperty;
                const mapLayer = action.payload.mapLayer;

                const layerProperties = initialState.layerProperties.map((layerProperty) => {
                    if (layerProperty.name === mapLayerProperty) {
                        let active = false;
                        layerProperty.layers.forEach((layer) => {
                            if (layer.name === mapLayer) {
                                layer.active =
                                    action.payload?.active === undefined ? !layer.active : action.payload?.active;
                            }
                            if (layer.active) {
                                active = true;
                            }
                        });

                        layerProperty.active = active;
                    }

                    return layerProperty;
                });

                return {
                    ...initialState,
                    layerProperties,
                };
            }

            return initialState;

        case "CHANGE_VISIBLE_MAP_LAYER_PROPERTIES":
            if (action.payload && action.payload?.mapLayerProperty && typeof action.payload.visible !== "undefined") {
                const mapLayerProperty = action.payload.mapLayerProperty;

                const layerProperties = initialState.layerProperties.map((layerProperty) => {
                    if (layerProperty.name === mapLayerProperty) {
                        layerProperty.visible = action.payload?.visible;
                    } else {
                        layerProperty.visible = false;
                    }

                    return layerProperty;
                });

                return {
                    ...initialState,
                    layerProperties,
                };
            }

            return initialState;

        case "CHANGE_DATE_SELECTED":
            if (action.payload && action.payload?.dateSelected) {
                return {
                    ...initialState,
                    dateSelected: action.payload.dateSelected,
                };
            }
            return initialState;

        case "CHANGE_FILTERS":
            if (action && action.payload && action.payload?.filters) {
                initialState.filters.map((filter: AnyObject) => {
                    if (action.payload?.filters && filter.name === action.payload?.filters.name) {
                        return {
                            ...filter,
                            ...action.payload?.filter,
                        };
                    }
                });
            }
            return initialState;

        case "CHANGE_MAP_LAYERS":
            if (action.payload && action.payload?.mapLayers) {
                return {
                    ...initialState,
                    mapLayers: action.payload.mapLayers,
                };
            }
            return initialState;

        case "CHANGE_ACTIVE_ROUTE_TYPES":
            if (action.payload && action.payload?.activeRouteTypes) {
                return {
                    ...initialState,
                    activeRouteTypes: action.payload.activeRouteTypes,
                };
            }
            return initialState;

        case "CHANGE_COMPANY":
            if (action.payload && action.payload?.company) {
                return {
                    ...initialState,
                    company: action.payload.company,
                };
            }
            return initialState;

        case "TOGGLE_SHOW_TRANSPORTATION":
            return {
                ...initialState,
                showTransportation: !initialState.showTransportation,
            };

        case "CHANGE_LIST_FILTER_STOPS":
            return {
                ...initialState,
                filtersStop: action.payload?.listFilterStops,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
