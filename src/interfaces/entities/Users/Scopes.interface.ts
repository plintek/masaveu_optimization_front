import UserRoles from "./UserRoles.interface";
import Users from "./Users.interface";

export default interface Scopes {
    id: number;
    name: string;
    description?: string;

    allowedUserRoles?: UserRoles[];

    allowedUsers?: Users[];
    forbiddenUsers?: Users[];
}
