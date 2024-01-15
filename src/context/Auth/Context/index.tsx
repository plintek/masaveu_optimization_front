import React, { Dispatch, ReactElement, useReducer } from "react";
import { ActionObject, AuthReducer } from "../Reducer";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";
import { checkLogin } from "../Actions";

const AuthStateContext = React.createContext({});
const AuthDispatchContext = React.createContext({});

export function useAuthState(): AuthState {
    const context = React.useContext(AuthStateContext) as AuthState;
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }

    return context;
}

export function useAuthDispatch(): Dispatch<ActionObject> {
    const context = React.useContext(
        AuthDispatchContext
    ) as React.Dispatch<ActionObject>;
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }

    return context;
}

export interface AuthState {
    isLogged: boolean;
    user: AnyObject;
    loading: boolean;
    errorMessage: AnyObject;
}

const initialState: AuthState = {
    isLogged: false,
    user: {},
    loading: false,
    errorMessage: {},
};

let initialCheckLogin = false;

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const [authData, dispatch] = useReducer(AuthReducer, initialState);

    if (!initialCheckLogin) {
        checkLogin(dispatch);
        initialCheckLogin = true;
    }

    return (
        <AuthStateContext.Provider value={authData}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
