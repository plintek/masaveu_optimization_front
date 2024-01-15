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
            ? num.toLocaleString("en-US", {
                  maximumFractionDigits: decimalPlaces,
                  minimumFractionDigits: 0,
              })
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
}

export default TextUtility;
