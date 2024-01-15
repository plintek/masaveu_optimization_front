import { useAuthState } from "@context/Auth/Context";
import UserRolesUtility from "@utils/UserRoles.utility";
import { useState, useEffect } from "react";

export default function useHasAccessToEntity(
    entity: string,
    action: string
): boolean {
    const { user } = useAuthState();
    const [response, setResponse] = useState<boolean>(false);

    useEffect(() => {
        if (user.role && entity && action) {
            setResponse(
                UserRolesUtility.hasAccessToEntity(user.role, entity, action)
            );
        }
    }, [user.role, entity, action]);

    return response;
}
