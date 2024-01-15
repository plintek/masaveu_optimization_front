import ApiUtility from "@utils/Api.utility";
import { useState, useEffect } from "react";

const backendApiCache = new Map();

export default function useBackendApi<T>(
    path: string,
    initialData: T | null = null,
    update = false
): T | null {
    const [response, setResponse] = useState<T | null>(initialData);

    useEffect(() => {
        ApiUtility.request({ url: path, cache: false }).then((response) => {
            setResponse(response);
        });
    }, [update]);

    return response;
}
