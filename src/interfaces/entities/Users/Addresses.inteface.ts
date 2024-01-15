import Users from "./Users.interface";

export default interface Addresses {
    id: number;
    name: string;
    address: string;
    zipCode: string;
    city: string;
    state?: string;
    country: string;

    user: Users;
}
