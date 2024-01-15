import { AnyType } from "@interfaces/basic/Any.interface";

class FileUtility {
    static generateCsv = (rows: AnyType): string => {
        const headers = `data:text/csv;charset=utf-8,`;
        const data = rows.map((e: string[]) => e.join(",")).join("\n");

        return `${headers}${data}`;
    };
}

export default FileUtility;
