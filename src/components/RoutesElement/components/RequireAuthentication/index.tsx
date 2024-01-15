import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@context/Auth/Context";
import UserRolesUtility from "@utils/UserRoles.utility";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { config } from "@config/config";

interface RequireAuthenticationProps {
    path: string;
    accessRole: string[] | undefined;
    children: React.ReactNode;
}

function RequireAuthentication({
    path,
    accessRole,
    children,
}: RequireAuthenticationProps): ReactElement {
    const navigate = useNavigate();
    const authState = useAuthState();

    const [redirectPath, setRedirectPath] = useState<string>("");

    const getRedirectPath = () => {
        let redirectPath = "";
        if (!authState.isLogged) {
            if (config.env !== "development") {
                redirectPath = "/login";
            }
        } else {
            const userRole = authState.user.role;
            if (!userRole) {
                redirectPath = "/login";
            } else {
                const permission = UserRolesUtility.hasPermission(
                    userRole,
                    accessRole
                );
                if (!permission || path[0] !== "/") {
                    redirectPath = UserRolesUtility.getRoleMainPage(userRole);

                    if (redirectPath == "/" && path != "/") {
                        navigate(redirectPath);
                    }
                }
            }
        }

        return redirectPath;
    };

    useEffect(() => {
        if (authState.loading === false) {
            setRedirectPath(getRedirectPath());
        }
    }, [authState.loading, authState.isLogged, authState.user]);

    useEffect(() => {
        if (redirectPath !== "") {
            navigate(redirectPath);
        }
    }, [redirectPath]);

    return <>{children}</>;
}

export default RequireAuthentication;
