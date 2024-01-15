import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { MapLayerType, MapLayerPropertyType } from "@interfaces/basic/MapLayer.interface";
import { Company } from "../Context";
import { ActionObject } from "../Reducer";

export function changeActiveMapLayers(
    dispatch: React.Dispatch<ActionObject>,
    mapLayerProperty: MapLayerPropertyType,
    mapLayer: MapLayerType,
    active?: boolean
): void {
    dispatch({ type: "CHANGE_ACTIVE_MAP_LAYERS", payload: { mapLayerProperty, mapLayer, active } });
}

export function changeVisibleMapLayerProperties(
    dispatch: React.Dispatch<ActionObject>,
    mapLayerProperty: MapLayerPropertyType,
    visible = true
): void {
    dispatch({ type: "CHANGE_VISIBLE_MAP_LAYER_PROPERTIES", payload: { mapLayerProperty, visible } });
}

export function changeDateSelected(dispatch: React.Dispatch<ActionObject>, dateSelected: Date): void {
    dispatch({ type: "CHANGE_DATE_SELECTED", payload: { dateSelected } });
}

export function changeFilters(dispatch: React.Dispatch<ActionObject>, filters: AnyObject[]): void {
    dispatch({ type: "CHANGE_FILTERS", payload: { filters } });
}

export function changeMapLayers(dispatch: React.Dispatch<ActionObject>, mapLayers: AnyObject[]): void {
    dispatch({ type: "CHANGE_MAP_LAYERS", payload: { mapLayers } });
}

export function changeActiveRouteTypes(dispatch: React.Dispatch<ActionObject>, activeRouteTypes: string[]): void {
    dispatch({ type: "CHANGE_ACTIVE_ROUTE_TYPES", payload: { activeRouteTypes } });
}

export function changeCompany(dispatch: React.Dispatch<ActionObject>, company: Company): void {
    dispatch({ type: "CHANGE_COMPANY", payload: { company } });
}

export function toggleShowTransportation(dispatch: React.Dispatch<ActionObject>): void {
    dispatch({ type: "TOGGLE_SHOW_TRANSPORTATION" });
}

export function changeListFilterStop(dispatch: React.Dispatch<ActionObject>, listFilterStops: string[]): void {
    dispatch({ type: "CHANGE_LIST_FILTER_STOPS", payload: { listFilterStops } });
}
