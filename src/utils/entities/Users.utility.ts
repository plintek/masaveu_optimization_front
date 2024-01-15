import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import Users from "@interfaces/entities/Users/Users.interface";
import ApiUtility from "@utils/Api.utility";

class UsersUtility {
    static login = (data: AnyObject): Promise<AnyObject> => {
        return ApiUtility.request({
            url: "users/login",
            method: "POST",
            data,
        });
    };

    static isLogged = (): Promise<AnyObject> => {
        return ApiUtility.request({
            url: "users/checkLogin",
        });
    };

    static logout = (): Promise<AnyObject> => {
        return ApiUtility.request({
            url: "users/logout",
        });
    };

    static getById = (id: number): Promise<Users> => {
        return ApiUtility.request({
            url: `users/${id}`,
            method: "GET",
        });
    };
}

export default UsersUtility;
