import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import TextUtility from "@utils/Text.utility";

interface ShipmentsStatusesByActionStatus {
    delivered: number;
    failed: number;
    inDistribution: number;
}

const BANNED_POPUP_KEYS = {
    vehicles: ["route_to_origin"],
};

const ENTITY_RELATIONSHIPS = {};

export default class MapLayersUtility {
    static isFieldVisibleInPopup = (
        fieldKey: string,
        layerName: string
    ): boolean => {
        if ((BANNED_POPUP_KEYS as AnyObject)[layerName]) {
            return !(BANNED_POPUP_KEYS as AnyObject)[layerName].includes(
                fieldKey
            );
        }

        return true;
    };

    static getRelationField = async (
        layerName: string,
        key: string,
        value: number
    ): Promise<string> => {
        if (
            (ENTITY_RELATIONSHIPS as AnyObject)[layerName] &&
            (ENTITY_RELATIONSHIPS as AnyObject)[layerName][key]
        ) {
            return await (ENTITY_RELATIONSHIPS as AnyObject)[layerName][key](
                value
            );
        }

        return value ? value.toString() : "-";
    };
}
