import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { AuthState } from "../Context";

type Actions = "LOGIN_LOADING" | "LOGIN_SUCCESS" | "LOGOUT" | "LOGIN_ERROR";

export interface ActionObject {
    type: Actions;
    loading?: boolean;
    payload?: AnyObject;
    error?: AnyObject;
}

export const AuthReducer = (
    initialState: AuthState,
    action: ActionObject
): AuthState => {
    switch (action.type) {
        case "LOGIN_LOADING":
            return {
                ...initialState,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                isLogged: true,
                user: action.payload?.user,
                loading: false,
            };
        case "LOGOUT":
            return {
                ...initialState,
                isLogged: false,
                user: {},
            };

        case "LOGIN_ERROR":
            return {
                ...initialState,
                isLogged: false,
                loading: false,
                errorMessage: action.error ? action.error : {},
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
