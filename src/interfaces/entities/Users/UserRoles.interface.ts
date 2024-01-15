import Scopes from "./Scopes.interface";
import Users from "./Users.interface";

export default interface UserRoles {
    id: number;
    name: string;
    users?: Users[];
    allowedScopes?: Scopes[];
}
