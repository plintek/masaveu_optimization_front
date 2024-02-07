import { AnyObject } from "@interfaces/basic/AnyObject.interface";

class TextUtility {
    static formatCsvString = (str: string): string => {
        return `"${encodeURI(str).replaceAll("#", "%23")}"`;
    };

    static addZeros = (num: number, length: number): string => {
        return (num + Array(length).join("0")).slice(-length);
    };

    static zeroPad = (num: number, length = 2) => {
        return num.toString().padStart(length, "0");
    };

    static capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    static formatNumber = (num: number, decimalPlaces = 2): string => {
        return num !== null && num !== undefined
            ? num.toLocaleString("en-US", { maximumFractionDigits: decimalPlaces, minimumFractionDigits: 0 })
            : "-";
    };

    static formatNumbersOfObject = (obj: AnyObject): AnyObject => {
        for (const key in obj) {
            if (typeof obj[key] === "number") {
                obj[key] = TextUtility.formatNumber(obj[key]);
            }
        }
        return obj;
    };

    static formatDistanceKm = (distance: number): string => {
        return `${distance.toFixed(2)} km`;
    };

    static limitLengthIfNoSpaces = (str: string, maxLength: number): string => {
        if (str && str.length > maxLength && str.indexOf(" ") === -1 && str.indexOf("-") === -1) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };

    static toDashLowerCase = (str: string): string => {
        return str.toLowerCase().replaceAll(" ", "-");
    };

    static isNumeric = (str: string): boolean => {
        return !isNaN(Number(str));
    };
}

export default TextUtility;
