import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import UsersUtility from "@utils/entities/Users.utility";
import { ActionObject } from "../Reducer";

export async function checkLogin(
    dispatch: React.Dispatch<ActionObject>
): Promise<AnyObject> {
    dispatch({ type: "LOGIN_LOADING" });
    const response = await UsersUtility.isLogged();

    if (response && response.isLogged && response.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response });
        return response;
    }

    dispatch({ type: "LOGIN_ERROR", error: response });
    return response;
}

export async function loginUser(
    dispatch: React.Dispatch<ActionObject>,
    loginPayload: AnyObject
): Promise<AnyObject> {
    const response = await UsersUtility.login(loginPayload);
    if (response.isLogged && response.user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response });

        return response;
    }

    dispatch({ type: "LOGIN_ERROR", error: response });

    return response;
}

export async function logout(
    dispatch: React.Dispatch<ActionObject>
): Promise<AnyObject> {
    const response = await UsersUtility.logout();

    dispatch({ type: "LOGOUT" });

    return response;
}
