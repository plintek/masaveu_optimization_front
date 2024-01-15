import { RGBAColor } from "@deck.gl/core";
import { scaleThreshold } from "d3-scale";

class PaintUtility {
    static getColorStops = (actionStatus: string): RGBAColor => {
        if (
            actionStatus === "delivered" ||
            actionStatus === "picked-up" ||
            actionStatus === "to be delivered" ||
            actionStatus === "delivered" ||
            actionStatus === "unloaded"
        ) {
            return [160, 209, 155];
        } else if (actionStatus === "to be exchanged" || actionStatus === "to be unloaded") {
            return [245, 242, 157];
        } else if (actionStatus === "to be loaded" || actionStatus === "loaded" || actionStatus === "to be picked-up") {
            return [240, 212, 149];
        } else if (
            actionStatus === "pick-up failed" ||
            actionStatus === "delivery failed" ||
            actionStatus === "exchanged" ||
            actionStatus === "exchange failed" ||
            actionStatus === "load failed" ||
            actionStatus === "unload failed"
        ) {
            return [235, 152, 152];
        } else {
            return [249, 28, 97, 120];
        }
    };

    static getColorPollution = (typePollution: string, valuePollution: number): RGBAColor => {
        const COLOR_SCALE_CO2 = scaleThreshold<number, RGBAColor>()
            .domain([1, 5, 6, 7, 8, 9, 10])
            .range([
                [254, 246, 181, 170],
                [255, 221, 154, 170],
                [255, 194, 133, 170],
                [255, 166, 121, 170],
                [250, 138, 118, 170],
                [241, 109, 122, 170],
                [225, 83, 131, 170],
            ]);

        const COLOR_SCALE_NOX = scaleThreshold<number, RGBAColor>()
            .domain([1, 5, 6, 7, 8, 9, 10])
            .range([
                [249, 221, 218, 170],
                [242, 185, 196, 170],
                [229, 151, 185, 170],
                [206, 120, 179, 170],
                [173, 95, 173, 170],
                [131, 75, 160, 170],
                [87, 59, 136, 170],
            ]);

        const COLOR_SCALE_NOISE = scaleThreshold<number, RGBAColor>()
            .domain([1, 5, 6, 7, 8, 9, 10])
            .range([
                [209, 238, 234, 170],
                [168, 219, 217, 170],
                [133, 196, 201, 170],
                [104, 171, 184, 170],
                [79, 144, 166, 170],
                [59, 115, 143, 170],
                [42, 86, 116, 170],
            ]);

        return typePollution === "co2"
            ? COLOR_SCALE_CO2(valuePollution)
            : typePollution === "nox"
            ? COLOR_SCALE_NOX(valuePollution)
            : COLOR_SCALE_NOISE(valuePollution);
    };
}

export default PaintUtility;
