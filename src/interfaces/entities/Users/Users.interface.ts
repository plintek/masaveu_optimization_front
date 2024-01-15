import Addresses from "./Addresses.inteface";
import Scopes from "./Scopes.interface";
import UserRoles from "./UserRoles.interface";

export default interface Users {
    id: number;
    name: string;
    surname?: string;

    email: string;
    emailVerifiedAt?: string;
    password?: string;

    nif?: string;
    phone?: string;
    birthDate?: string;

    role?: UserRoles;
    addresses?: Addresses[];
    allowedScopes?: Scopes[];
    forbiddenScopes?: Scopes[];
}
