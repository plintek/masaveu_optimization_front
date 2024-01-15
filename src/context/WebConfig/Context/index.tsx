import React, { Dispatch, ReactElement, useReducer } from "react";
import { ActionObject, WebConfigReducer } from "../Reducer";

const WebConfigStateContext = React.createContext({});
const WebConfigDispatchContext = React.createContext({});

export function useWebConfigState(): WebConfigState {
    const context = React.useContext(WebConfigStateContext) as WebConfigState;
    if (context === undefined) {
        throw new Error(
            "useWebConfigState must be used within a WebConfigProvider"
        );
    }

    return context;
}

export function useWebConfigDispatch(): Dispatch<ActionObject> {
    const context = React.useContext(
        WebConfigDispatchContext
    ) as React.Dispatch<ActionObject>;
    if (context === undefined) {
        throw new Error(
            "useWebConfigDispatch must be used within a WebConfigProvider"
        );
    }

    return context;
}

export interface WebConfigState {}

const initialState: WebConfigState = {};

export const WebConfigProvider = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const [webConfigData, dispatch] = useReducer(
        WebConfigReducer,
        initialState
    );

    return (
        <WebConfigStateContext.Provider value={webConfigData}>
            <WebConfigDispatchContext.Provider value={dispatch}>
                {children}
            </WebConfigDispatchContext.Provider>
        </WebConfigStateContext.Provider>
    );
};
