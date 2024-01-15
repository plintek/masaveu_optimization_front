import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { MapLayerProperty } from "@interfaces/basic/MapLayer.interface";
import { AirlineSeatReclineExtraOutlined } from "@mui/icons-material";

interface ShipmentsStatusesByActionStatus {
    delivered: number;
    failed: number;
    inDistribution: number;
}

export default class MapLayersUtility {
    static getTotalShipmentsMonitored = (mapLayers: AnyObject[]): number => {
        let totalShipmentsMonitored = 0;
        const alreadyCheckedShipmentsCodes: string[] = [];
        mapLayers.forEach((mapLayer) => {
            if (mapLayer.props.layerName === "stops") {
                mapLayer.props.layerData.features.forEach(
                    (feature: AnyObject) => {
                        feature.properties.deliveryActions.forEach(
                            (shipment: AnyObject) => {
                                if (
                                    !alreadyCheckedShipmentsCodes.includes(
                                        shipment.shipmentCode
                                    )
                                ) {
                                    alreadyCheckedShipmentsCodes.push(
                                        shipment.shipmentCode
                                    );
                                    totalShipmentsMonitored++;
                                }
                            }
                        );
                    }
                );
            }
        });

        return totalShipmentsMonitored;
    };

    static isLayerActive = (
        mapLayers: MapLayerProperty,
        layerName: string
    ): boolean => {
        const layer = mapLayers.layers.find(
            (mapLayer) => mapLayer.name === layerName
        );
        return layer ? layer.active : false;
    };

    static getShipmentsStatusesByActionStatus = (
        mapLayers: AnyObject[]
    ): ShipmentsStatusesByActionStatus => {
        const result: ShipmentsStatusesByActionStatus = {
            delivered: 0,
            failed: 0,
            inDistribution: 0,
        };

        mapLayers.forEach((mapLayer) => {
            if (mapLayer.props.layerName === "stops") {
                mapLayer.props.layerData.features.forEach(
                    (feature: AnyObject) => {
                        const lastDeliveryAction =
                            feature.properties.deliveryActions[
                                feature.properties.deliveryActions.length - 1
                            ];
                        if (lastDeliveryAction) {
                            const actionStatus =
                                lastDeliveryAction.actionStatus;
                            if (
                                actionStatus === "delivered" ||
                                actionStatus === "picked-up" ||
                                actionStatus === "to be delivered" ||
                                actionStatus === "delivered" ||
                                actionStatus === "unloaded"
                            ) {
                                result.delivered++;
                            }
                            if (
                                actionStatus === "pick-up failed" ||
                                actionStatus === "delivery failed" ||
                                actionStatus === "exchanged" ||
                                actionStatus === "exchange failed" ||
                                actionStatus === "load failed" ||
                                actionStatus === "unload failed"
                            ) {
                                result.failed++;
                            }

                            if (
                                actionStatus === "to be exchanged" ||
                                actionStatus === "to be unloaded" ||
                                actionStatus === "to be loaded" ||
                                actionStatus === "loaded" ||
                                actionStatus === "to be picked-up"
                            ) {
                                result.inDistribution++;
                            }
                        }
                    }
                );
            }
        });

        return result;
    };
}
