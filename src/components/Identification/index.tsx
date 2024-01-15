import { Title } from "@components/basic/Text";
import React from "react";
import UserRolesUtility from "@utils/UserRoles.utility";
import { useAuthState } from "@context/Auth/Context";

function Identification() {
    const { user } = useAuthState();
    const userRoleName = user.role || "superadmin";
    const userRoleTitle = UserRolesUtility.getRole(userRoleName).title;

    return <Title regular>Hola {userRoleTitle}</Title>;
}

export default Identification;
