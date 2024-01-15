import { config } from "@config/config";
import { AnyType } from "@interfaces/basic/Any.interface";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { Url } from "@interfaces/basic/Url.interface";
import axios from "axios";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class ApiUtility {
    static apiCache = new Map();

    static request = ({
        url,
        method = "GET",
        data,
        cache = false,
    }: {
        url: Url | string;
        method?: Method;
        data?: AnyObject | undefined;
        cache?: boolean;
    }): Promise<AnyType> => {
        if (cache && method === "GET" && ApiUtility.apiCache.has(url)) {
            return Promise.resolve(ApiUtility.apiCache.get(url));
        }

        if (typeof url === "object") {
            url = this.getUrlFromObject(url);
        }

        const axiosOptions = {
            url: `${config.endpoint_url}${url}`,
            method,
            data,
            withCredentials: true,
        };

        return axios(axiosOptions)
            .then((response) => {
                if (cache && method === "GET") {
                    ApiUtility.apiCache.set(url, response.data);
                }

                return response.data;
            })
            .catch((error) => error.response);
    };

    static requestFile = ({
        url,
        method = "GET",
        data,
    }: {
        url: Url | string;
        method?: Method;
        data?: AnyObject | undefined;
    }): Promise<AnyType> => {
        if (typeof url === "object") {
            url = this.getUrlFromObject(url);
        }

        const formData = new FormData();
        this.buildFormData(formData, data);

        const axiosOptions = {
            url: `${config.endpoint_url}${url}`,
            method,
            data: formData,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        return axios(axiosOptions)
            .then((response) => response.data)
            .catch((error) => error.response.data);
    };

    static buildFormData = (
        formData: FormData,
        data: AnyType,
        parentKey = ""
    ): void => {
        if (
            data &&
            typeof data === "object" &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach((key) => {
                this.buildFormData(
                    formData,
                    data[key],
                    parentKey ? `${parentKey}[${key}]` : key
                );
            });
        } else {
            const value = data == null ? "" : data;

            formData.append(parentKey, value);
        }
    };

    static getUrlFromObject = (url: Url): string => {
        let urlString = `${url.serviceName}/${url.controller}/${url.action}/`;

        if (url.slashParams) {
            urlString += url.slashParams.reduce(
                (accumulator: string, currentValue: string) =>
                    `${accumulator}${currentValue}/`
            );
        }
        if (url.params) {
            Object.keys(url.params).forEach((value, index) => {
                if (url.params && url.params[value]) {
                    urlString += index === 0 ? "?" : "&";
                    urlString += `${value}=${url.params[value]}`;
                }
            });
        }

        return urlString;
    };
}

export default ApiUtility;
