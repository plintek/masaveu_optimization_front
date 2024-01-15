export type MapLayerType = "stops" | "navigation" | "nox" | "order" | "restrictions" | "parkings" | "co2" | "noise" | "depots" | "lockers";
export type MapLayerPropertyType = "efficiency" | "sostenibility" | "accesibility";
type LayerTypes = "line" | "polygon" | "point" | "heatmap";

export interface MapLayer {
    name: MapLayerType;
    fillColor?: [number, number, number, number];
    lineColor?: [number, number, number, number];
    type?: LayerTypes;
    active: boolean;
    pointType?: string;
}

export interface MapLayerProperty {
    name: MapLayerPropertyType;
    visible: boolean;
    active: boolean;
    layers: MapLayer[];
}
