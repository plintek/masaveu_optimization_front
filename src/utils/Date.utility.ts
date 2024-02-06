import TextUtility from "./Text.utility";

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

        if (!date || isNaN(date.getTime()) || date.getFullYear() < 1980) {
            return "";
        }

        return `${day}-${month}-${year}`;
    };

    static formatDateToPdf = (date: Date): string => {
        const day = TextUtility.zeroPad(date.getDate());
        const month = TextUtility.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    static formatDatetime = (datetime: Date): string => {
        return `${DateUtility.formatDate(datetime)} ${DateUtility.formatTime(
            datetime
        )}`;
    };

    static formatDateToDatabase = (date: Date): string => {
        const day = TextUtility.zeroPad(date.getDate());
        const month = TextUtility.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    static formatTime = (date: Date): string => {
        return `${TextUtility.zeroPad(date.getHours())}:${TextUtility.zeroPad(
            date.getMinutes()
        )}`;
    };

    static timeToDate = (time: string): Date => {
        const [hours, minutes, seconds] = time.split(":");
        const date = new Date();

        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
        date.setSeconds(Number(seconds));

        return date;
    };
}

export default DateUtility;
