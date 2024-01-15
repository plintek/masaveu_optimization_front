import { AnyObject } from "./AnyObject.interface";

export interface Url {
    serviceName: string;
    controller: string;
    action: string;
    slashParams?: string[];
    params?: AnyObject;
}
