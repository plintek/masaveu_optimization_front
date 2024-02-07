import TextUtility from "./Text.utility";
import MathUtility from "@utils/Math.utility";

class DateUtility {
    static formatDateFromString = (dateString: string): string => {
        const date = new Date(dateString);

        return DateUtility.formatDate(date);
    };

    static formatDatetimeFromString = (datetimeString: string): string => {
        const date = new Date(datetimeString);

        return DateUtility.formatDatetime(date);
    };

    static formatDate = (date: Date): string => {
        const day = TextUtility.zeroPad(date.getDate());
        const month = TextUtility.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        if (year <= 2000) return "-";

        return `${day}/${month}/${year}`;
    };

    static formatDatetime = (datetime: Date): string => {
        const date = DateUtility.formatDate(datetime);
        if (date === "-") return "-";
        return `${DateUtility.formatDate(datetime)} ${DateUtility.formatTime(datetime)}`;
    };

    static formatDateWith2DigitYear = (date: Date): string => {
        const day = TextUtility.zeroPad(date.getDate());
        const month = TextUtility.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear().toString().slice(-2);

        return `${day}/${month}/${year}`;
    };

    static formatDateToDatabase = (date: Date): string => {
        const day = TextUtility.zeroPad(date.getDate());
        const month = TextUtility.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    static formatDateToISOString = (datetime: Date): string => {
        return datetime.toISOString();
    };

    static formatTime = (date: Date): string => {
        return `${TextUtility.zeroPad(date.getHours())}:${TextUtility.zeroPad(date.getMinutes())}`;
    };

    static timeToDate = (time: string): Date => {
        const [hours, minutes] = time.split(":");
        const date = new Date();

        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));

        return date;
    };

    static getDifferenceBetweenDatesInMinutes = (date1: Date, date2: Date): number => {
        return Math.trunc((date1.getTime() - date2.getTime()) / 60000);
    };

    static getAbsoluteDifferenceBetweenDatesInMinutes = (date1: Date, date2: Date): number => {
        return Math.abs(DateUtility.getDifferenceBetweenDatesInMinutes(date1, date2));
    };

    static isDate = (date: string): boolean => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}.*$/;
        return dateRegex.test(date);
    };

    static isDateAndTime = (date: string): boolean => {
        const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}).*$/;
        return dateRegex.test(date);
    };

    static secondsToHours = (seconds: number): number => {
        return Math.abs(seconds / 3600);
    };

    static minutesToHoursAndMinutes = (minutes: number): string => {
        const hours = Math.abs(Math.floor(minutes / 60));
        const minutesLeft = MathUtility.zeroPad(Math.abs(minutes % 60));

        return `${minutes < 0 ? "-" : ""}${hours}h ${minutesLeft}m`;
    };
}

export default DateUtility;
