class MathUtility {
    static truncateDecimals = (number: number, digits = 2): number => {
        const multiplier = Math.pow(10, digits),
            adjustedNum = number * multiplier,
            truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

        return truncatedNum / multiplier;
    };

    static addZeros = (number: number): string => {
        const value = Number(number);
        let result = value.toString();
        const splitted = result.split(".");

        if (splitted.length == 1 || splitted[1].length < 3) {
            result = value.toFixed(2);
        }

        return result;
    };

    static randomInteger = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    static getRandomColor = (): [number, number, number] => {
        const red = MathUtility.randomInteger(0, 200);
        const green = MathUtility.randomInteger(0, 200);
        const blue = MathUtility.randomInteger(0, 200);

        return [red, green, blue];
    };
}

export default MathUtility;
